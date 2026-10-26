import { SAMPLE_PHONE_SCENARIOS } from '../data/sampleMessages';
import { LanguageCode, SamplePhoneScenario } from '../types';

/**
 * Builds a balanced queue of simulated phone scenarios (SMS, WhatsApp, Incoming Calls).
 * Guarantees that native-language SMS/WhatsApp AND Incoming Phone Calls arrive early
 * and interleave regularly (~1 call every 3 events) without repeating recent items.
 */
export function buildScenarioDeck(
  preferredLanguage: LanguageCode,
  excludeRecentIds: string[] = []
): SamplePhoneScenario[] {
  const recentSet = new Set(excludeRecentIds);

  const shuffle = <T>(list: T[]): T[] => {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const available = SAMPLE_PHONE_SCENARIOS.filter((s) => !recentSet.has(s.id));
  const pool = available.length >= 8 ? available : SAMPLE_PHONE_SCENARIOS;

  const nativeMsgs = shuffle(
    pool.filter(
      (s) => s.scenarioLanguage === preferredLanguage && s.channel !== 'call'
    )
  );
  const nativeCalls = shuffle(
    pool.filter(
      (s) => s.scenarioLanguage === preferredLanguage && s.channel === 'call'
    )
  );

  // Ensure the starter message is a clear suspicious SMS/WhatsApp in the selected language
  if (nativeMsgs.length > 1) {
    const starterIdx = nativeMsgs.findIndex((s) => /01|04/.test(s.id));
    if (starterIdx > 0) {
      const [starter] = nativeMsgs.splice(starterIdx, 1);
      nativeMsgs.unshift(starter);
    }
  }

  // Ensure the first incoming call is a suspicious call so ElderShield call protection is demonstrated early,
  // followed by harmless/other calls
  if (nativeCalls.length > 1) {
    const scamCallIdx = nativeCalls.findIndex((s) => !s.id.includes('safe'));
    if (scamCallIdx > 0) {
      const [scamCall] = nativeCalls.splice(scamCallIdx, 1);
      nativeCalls.unshift(scamCall);
    }
  }

  const otherCalls = shuffle(
    pool.filter(
      (s) => s.scenarioLanguage !== preferredLanguage && s.channel === 'call'
    )
  );
  const otherMsgs = shuffle(
    pool.filter(
      (s) => s.scenarioLanguage !== preferredLanguage && s.channel !== 'call'
    )
  );

  const allMsgs = [...nativeMsgs, ...otherMsgs];
  const allCalls = [...nativeCalls, ...otherCalls];

  // Interleave pattern: [Msg 1, Call 1, Msg 2, Msg 3, Call 2, Msg 4, Msg 5, Call 3, ...]
  const deck: SamplePhoneScenario[] = [];
  if (allMsgs.length > 0) {
    deck.push(allMsgs.shift()!);
  }
  if (allCalls.length > 0) {
    deck.push(allCalls.shift()!);
  }

  let msgSinceLastCall = 0;
  while (allMsgs.length > 0 || allCalls.length > 0) {
    if (msgSinceLastCall >= 2 && allCalls.length > 0) {
      deck.push(allCalls.shift()!);
      msgSinceLastCall = 0;
    } else if (allMsgs.length > 0) {
      deck.push(allMsgs.shift()!);
      msgSinceLastCall++;
    } else if (allCalls.length > 0) {
      deck.push(allCalls.shift()!);
      msgSinceLastCall = 0;
    }
  }

  return deck.length > 0 ? deck : shuffle(SAMPLE_PHONE_SCENARIOS);
}

/**
 * Delay before next simulated notification or call arrives when phone screen is idle.
 */
export function getNextEventDelayMs(isFirstSessionEvent: boolean): number {
  if (isFirstSessionEvent) {
    return 2200;
  }
  return Math.floor(6200 + Math.random() * 2600);
}
