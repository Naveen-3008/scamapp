import { SAMPLE_PHONE_SCENARIOS } from '../data/sampleMessages';
import { LanguageCode, RiskLevel, SamplePhoneScenario } from '../types';
import { getScamClassifier } from './scamClassifier';

type BucketSlot = 'normalMsg' | 'spamMsg' | 'normalCall' | 'spamCall';

/**
 *Repeating 8-step cadence that strictly interleaves normal messages & normal calls
 * in between suspicious/spam messages & calls so back-to-back spam never dominates:
 *   1. Normal SMS/WhatsApp
 *   2. Suspicious SMS/WhatsApp
 *   3. Normal Incoming Call
 *   4. Normal SMS/WhatsApp
 *   5. Suspicious Incoming Call
 *   6. Normal SMS/WhatsApp
 *   7. Suspicious SMS/WhatsApp
 *   8. Normal Incoming Call
 */
const BALANCED_EVENT_CADENCE: readonly BucketSlot[] = [
  'normalMsg',
  'spamMsg',
  'normalCall',
  'normalMsg',
  'spamCall',
  'normalMsg',
  'spamMsg',
  'normalCall',
];

function shuffle<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds a balanced queue of simulated phone scenarios (SMS, WhatsApp, Incoming Calls)
 * with normal everyday family/clinic/pharmacy messages and calls interleaved between
 * suspicious scam messages and calls.
 */
export function buildScenarioDeck(
  preferredLanguage: LanguageCode,
  excludeRecentIds: string[] = []
): SamplePhoneScenario[] {
  const classifier = getScamClassifier();
  const recentSet = new Set(excludeRecentIds);

  const available = SAMPLE_PHONE_SCENARIOS.filter((s) => !recentSet.has(s.id));
  const pool = available.length >= 12 ? available : SAMPLE_PHONE_SCENARIOS;

  const isSuspiciousScenario = (s: SamplePhoneScenario): boolean => {
    const result = classifier.classifySync({
      channel: s.channel,
      senderName: s.senderName,
      phoneNumber: s.phoneNumber,
      content: s.content,
      targetLanguage: preferredLanguage,
    });
    return result.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
  };

  const nativePool = pool.filter((s) => s.scenarioLanguage === preferredLanguage);
  const otherPool = pool.filter((s) => s.scenarioLanguage !== preferredLanguage);

  const normalMsgs = [
    ...shuffle(
      nativePool.filter((s) => s.channel !== 'call' && !isSuspiciousScenario(s))
    ),
    ...shuffle(
      otherPool.filter((s) => s.channel !== 'call' && !isSuspiciousScenario(s))
    ),
  ];

  const spamMsgs = [
    ...shuffle(
      nativePool.filter((s) => s.channel !== 'call' && isSuspiciousScenario(s))
    ),
    ...shuffle(
      otherPool.filter((s) => s.channel !== 'call' && isSuspiciousScenario(s))
    ),
  ];

  const normalCalls = [
    ...shuffle(
      nativePool.filter((s) => s.channel === 'call' && !isSuspiciousScenario(s))
    ),
    ...shuffle(
      otherPool.filter((s) => s.channel === 'call' && !isSuspiciousScenario(s))
    ),
  ];

  const spamCalls = [
    ...shuffle(
      nativePool.filter((s) => s.channel === 'call' && isSuspiciousScenario(s))
    ),
    ...shuffle(
      otherPool.filter((s) => s.channel === 'call' && isSuspiciousScenario(s))
    ),
  ];

  const buckets: Record<BucketSlot, SamplePhoneScenario[]> = {
    normalMsg: normalMsgs,
    spamMsg: spamMsgs,
    normalCall: normalCalls,
    spamCall: spamCalls,
  };

  // Fallback priority per slot so normal slots prefer normal items and never accidentally stack spam if avoidable
  const fallbackOrder: Record<BucketSlot, BucketSlot[]> = {
    normalMsg: ['normalMsg', 'normalCall', 'spamMsg', 'spamCall'],
    normalCall: ['normalCall', 'normalMsg', 'spamCall', 'spamMsg'],
    spamMsg: ['spamMsg', 'normalMsg', 'spamCall', 'normalCall'],
    spamCall: ['spamCall', 'normalCall', 'spamMsg', 'normalMsg'],
  };

  const deck: SamplePhoneScenario[] = [];
  let step = 0;

  while (
    buckets.normalMsg.length > 0 ||
    buckets.spamMsg.length > 0 ||
    buckets.normalCall.length > 0 ||
    buckets.spamCall.length > 0
  ) {
    const desiredSlot =
      BALANCED_EVENT_CADENCE[step % BALANCED_EVENT_CADENCE.length];
    step += 1;

    for (const candidateSlot of fallbackOrder[desiredSlot]) {
      if (buckets[candidateSlot].length > 0) {
        deck.push(buckets[candidateSlot].shift()!);
        break;
      }
    }
  }

  return deck.length > 0 ? deck : shuffle(SAMPLE_PHONE_SCENARIOS);
}

/**
 * Delay before next simulated notification or call arrives when phone screen is idle.
 */
export function getNextEventDelayMs(isFirstSessionEvent: boolean): number {
  if (isFirstSessionEvent) {
    return 2000;
  }
  return Math.floor(5400 + Math.random() * 2200);
}
