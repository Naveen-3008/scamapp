import React, { useEffect, useState } from 'react';
import {
  BellOff,
  BellRing,
  Phone,
  PhoneOff,
  ShieldAlert,
  ShieldCheck,
  User,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import { LanguageCode, ProcessedPhoneEvent, RiskLevel } from '../../types';
import {
  formatDurationMmSs,
  renderTextWithHighlights,
} from '../../utils/phoneFormatting';

interface IncomingCallOverlayProps {
  event: ProcessedPhoneEvent;
  callStage: 'ringing' | 'connected';
  language: LanguageCode;
  ringtoneEnabled: boolean;
  sharedElapsedSeconds?: number;
  onAnswer: () => void;
  onDeclineOrEnd: () => void;
  onToggleRingtone: () => void;
  onReopenScamAlert: (instanceId: string) => void;
}

export const IncomingCallOverlay: React.FC<IncomingCallOverlayProps> = ({
  event,
  callStage,
  language,
  ringtoneEnabled,
  sharedElapsedSeconds,
  onAnswer,
  onDeclineOrEnd,
  onToggleRingtone,
  onReopenScamAlert,
}) => {
  const t = getTranslation(language);
  const [localElapsedSeconds, setLocalElapsedSeconds] = useState(0);

  useEffect(() => {
    if (callStage !== 'connected' || sharedElapsedSeconds !== undefined) {
      setLocalElapsedSeconds(0);
      return;
    }
    const timer = window.setInterval(() => {
      setLocalElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [callStage, event.instanceId, sharedElapsedSeconds]);

  const displayedSeconds =
    sharedElapsedSeconds !== undefined ? sharedElapsedSeconds : localElapsedSeconds;

  const isSuspicious =
    event.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;

  return (
    <div
      className={`absolute inset-0 z-40 flex min-h-0 flex-col justify-between overflow-hidden px-4 pt-4 pb-5 text-white ${
        isSuspicious
          ? 'bg-gradient-to-b from-slate-950 via-[#3B0D11] to-slate-950'
          : 'bg-gradient-to-b from-slate-950 via-[#0E2A38] to-slate-950'
      }`}
    >
      {/* Top Status & Ringtone Mute Button */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-200">
          {callStage === 'ringing'
            ? t.incomingCallLabel
            : `${t.callConnectedLabel} · ${formatDurationMmSs(displayedSeconds)}`}
        </span>

        {callStage === 'ringing' && (
          <button
            type="button"
            onClick={onToggleRingtone}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-100 hover:bg-white/20"
          >
            {ringtoneEnabled ? (
              <>
                <BellRing className="h-3.5 w-3.5 shrink-0 text-teal-300" />
                <span>{t.ringtoneOnLabel}</span>
              </>
            ) : (
              <>
                <BellOff className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span>{t.ringtoneMutedLabel}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Scrollable Caller Identity & ElderShield Assessment */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
        <div className="flex min-h-full flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            {callStage === 'ringing' && (
              <span
                aria-hidden="true"
                className={`absolute h-24 w-24 animate-ping rounded-full opacity-20 ${
                  isSuspicious ? 'bg-red-500' : 'bg-teal-400'
                }`}
              />
            )}
            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-xl ${
                isSuspicious
                  ? 'border-red-400/70 bg-red-950 text-red-200'
                  : 'border-teal-400/60 bg-slate-800 text-teal-200'
              }`}
            >
              {isSuspicious ? (
                <ShieldAlert className="h-9 w-9" />
              ) : (
                <User className="h-9 w-9" />
              )}
            </div>
          </div>

          <h2 className="wrap-safe mt-3.5 text-xl font-bold leading-snug text-white [@container(min-width:345px)]:text-2xl">
            {event.senderName}
          </h2>
          <p className="font-mono-tabular mt-1 text-sm font-medium text-slate-300">
            {event.phoneNumber}
          </p>

          {/* ElderShield Call Assessment Banner */}
          <div
            className={`mt-4 w-full rounded-2xl border p-3.5 text-left ${
              isSuspicious
                ? 'border-red-400/50 bg-red-950/75'
                : 'border-white/15 bg-white/[0.07]'
            }`}
          >
            <div className="mb-1.5 flex items-center gap-2">
              {isSuspicious ? (
                <>
                  <ShieldAlert className="h-4 w-4 shrink-0 text-red-300" />
                  <span className="wrap-safe text-xs font-extrabold text-red-200">
                    {t.suspiciousCallBannerTitle}
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 shrink-0 text-teal-300" />
                  <span className="wrap-safe text-xs font-bold text-teal-200">
                    {t.riskNoObvious}
                  </span>
                </>
              )}
            </div>

            <p className="url-wrap text-sm leading-relaxed text-slate-100">
              {renderTextWithHighlights(
                event.content,
                event.classification.matchedPhrases,
                'bg-amber-300 text-slate-950 font-bold px-1 rounded'
              )}
            </p>

            {isSuspicious ? (
              <div className="mt-3 space-y-2 border-t border-white/15 pt-2.5">
                <p className="wrap-safe text-xs font-medium leading-relaxed text-amber-100">
                  {event.classification.safetyAdvice}
                </p>
                <button
                  type="button"
                  onClick={() => onReopenScamAlert(event.instanceId)}
                  className="flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-xl bg-red-500/30 px-3 py-2 text-xs font-bold text-white ring-1 ring-red-300/50 transition-colors hover:bg-red-500/45"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span className="wrap-safe">{t.openFullWarningBtn}</span>
                </button>
              </div>
            ) : (
              <p className="wrap-safe mt-2 text-xs leading-relaxed text-slate-300">
                {t.ordinaryCallNeutralNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Answer / Decline / End Call Buttons (Always reachable) */}
      {callStage === 'ringing' ? (
        <div className="grid shrink-0 grid-cols-2 gap-3 pt-2.5">
          <button
            type="button"
            onClick={onDeclineOrEnd}
            className="flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-2xl bg-red-600 px-3 py-2.5 font-bold text-white shadow-lg transition-colors hover:bg-red-500 active:bg-red-700"
          >
            <PhoneOff className="h-5 w-5" />
            <span className="wrap-safe text-center text-xs leading-tight [@container(min-width:345px)]:text-sm">
              {t.declineCallBtn}
            </span>
          </button>

          <button
            type="button"
            onClick={onAnswer}
            className="flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-600 px-3 py-2.5 font-bold text-white shadow-lg transition-colors hover:bg-emerald-500 active:bg-emerald-700"
          >
            <Phone className="h-5 w-5" />
            <span className="wrap-safe text-center text-xs leading-tight [@container(min-width:345px)]:text-sm">
              {t.answerCallBtn}
            </span>
          </button>
        </div>
      ) : (
        <div className="shrink-0 pt-2.5">
          <button
            type="button"
            onClick={onDeclineOrEnd}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-red-500 active:bg-red-700"
          >
            <PhoneOff className="h-5 w-5 shrink-0" />
            <span className="wrap-safe">{t.endCallBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
