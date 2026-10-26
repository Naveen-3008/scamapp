import React from 'react';
import {
  CheckCircle2,
  Eye,
  MessageCircle,
  MessageSquare,
  Phone,
  RotateCcw,
  ShieldAlert,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import { SpeechStatusSnapshot } from '../../services/speechService';
import { LanguageCode, ProcessedPhoneEvent, RiskLevel } from '../../types';
import { renderTextWithHighlights } from '../../utils/phoneFormatting';

interface FullScreenScamAlertProps {
  event: ProcessedPhoneEvent;
  language: LanguageCode;
  voiceEnabled: boolean;
  speechSnapshot: SpeechStatusSnapshot;
  onUnderstand: () => void;
  onViewDetails: () => void;
  onDismiss: () => void;
  onReplayVoice: () => void;
  onToggleVoice: () => void;
  onEnableVoiceAndNarrate: () => void;
}

export const FullScreenScamAlert: React.FC<FullScreenScamAlertProps> = ({
  event,
  language,
  voiceEnabled,
  speechSnapshot,
  onUnderstand,
  onViewDetails,
  onDismiss,
  onReplayVoice,
  onToggleVoice,
  onEnableVoiceAndNarrate,
}) => {
  const t = getTranslation(language);
  const { classification } = event;
  const isHighRisk = classification.riskLevel === RiskLevel.HIGH_RISK;

  const channelLabel =
    event.channel === 'whatsapp'
      ? t.appWhatsApp
      : event.channel === 'call'
      ? t.appPhone
      : t.appMessages;

  const getVoiceStatusMessage = (): string => {
    if (!voiceEnabled || speechSnapshot.state === 'muted') {
      return t.voiceMutedStatus;
    }
    if (speechSnapshot.state === 'speaking') {
      return t.voicePlayingStatus;
    }
    if (speechSnapshot.state === 'blocked_autoplay') {
      return t.voiceAutoplayPrompt;
    }
    if (speechSnapshot.state === 'voice_unavailable') {
      return t.voiceUnavailableStatus;
    }
    if (speechSnapshot.state === 'unsupported_browser') {
      return t.voiceUnsupportedStatus;
    }
    return t.voiceReadyStatus;
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="eldershield-alert-title"
      className={`absolute inset-0 z-50 flex min-h-0 flex-col overflow-hidden text-white ${
        isHighRisk
          ? 'bg-gradient-to-b from-[#7F1D1D] via-[#5C1111] to-[#260707]'
          : 'bg-gradient-to-b from-[#92400E] via-[#6B2B08] to-[#290F03]'
      }`}
    >
      {/* Top Security Warning Header (Compact & proportional so body scrolls comfortably) */}
      <div className="flex shrink-0 flex-col items-center border-b border-white/15 px-4 pt-3 pb-3 text-center">
        <div
          className={`mb-2 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ring-2 [@container(min-height:680px)]:h-14 [@container(min-height:680px)]:w-14 ${
            isHighRisk
              ? 'bg-red-500/25 text-red-100 ring-red-300/60'
              : 'bg-amber-400/25 text-amber-100 ring-amber-300/60'
          }`}
        >
          <ShieldAlert
            className="h-7 w-7 [@container(min-height:680px)]:h-8 [@container(min-height:680px)]:w-8"
            aria-hidden="true"
          />
        </div>

        <h1
          id="eldershield-alert-title"
          className="wrap-safe text-lg font-extrabold tracking-wide text-white [@container(min-width:345px)]:text-xl"
        >
          {isHighRisk ? t.scamWarningTitle : t.suspiciousNoticeTitle}
        </h1>

        <p className="wrap-safe mt-1 text-sm font-semibold leading-snug text-amber-100 [@container(min-width:345px)]:text-[0.95rem]">
          {classification.leadWarning}
        </p>

        {/* Sender & Channel Context Line */}
        <div className="mt-2 flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 rounded-xl border border-white/20 bg-black/30 px-2.5 py-1 text-[0.72rem] font-semibold text-white">
          {event.channel === 'whatsapp' ? (
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
          ) : event.channel === 'call' ? (
            <Phone className="h-3.5 w-3.5 shrink-0 text-sky-300" />
          ) : (
            <MessageSquare className="h-3.5 w-3.5 shrink-0 text-blue-300" />
          )}
          <span className="text-white/85">{channelLabel}:</span>
          <span className="max-w-[180px] truncate font-bold text-white">
            {event.senderName}
          </span>
          <span className="font-mono-tabular text-white/75">
            ({event.phoneNumber})
          </span>
        </div>
      </div>

      {/* Scrollable Explanation Body (Long native-language text scrolls cleanly here) */}
      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-3.5 py-3 [@container(min-width:355px)]:px-4">
        {/* Voice Narration Status & Accessible Controls */}
        <div className="rounded-2xl border border-white/20 bg-black/35 p-3">
          <div className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                speechSnapshot.state === 'speaking'
                  ? 'bg-teal-400 text-slate-950'
                  : 'bg-white/15 text-white'
              }`}
            >
              {voiceEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </span>
            <p className="wrap-safe min-w-0 flex-1 text-xs font-medium leading-relaxed text-slate-100">
              {getVoiceStatusMessage()}
            </p>
          </div>

          {speechSnapshot.state === 'blocked_autoplay' && voiceEnabled ? (
            <button
              type="button"
              onClick={onEnableVoiceAndNarrate}
              className="mt-2.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-3 py-2 text-xs font-bold text-slate-950 shadow transition-colors hover:bg-amber-200"
            >
              <Volume2 className="h-4 w-4 shrink-0" />
              <span className="wrap-safe">{t.enableVoiceTapBtn}</span>
            </button>
          ) : (
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onReplayVoice}
                className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                <span className="wrap-safe text-center leading-tight">
                  {t.replayVoiceBtn}
                </span>
              </button>
              <button
                type="button"
                onClick={onToggleVoice}
                className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
              >
                {voiceEnabled ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 shrink-0" />
                    <span className="wrap-safe text-center leading-tight">
                      {t.muteVoiceBtn}
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="wrap-safe text-center leading-tight">
                      {t.unmuteVoiceBtn}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Reason Card */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-3">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5 text-xs">
            <span className="font-extrabold text-amber-200">
              {t.reasonPrefix}
            </span>
            <span className="text-[0.72rem] font-semibold text-white/90">
              {t.categories[classification.category]}
            </span>
          </div>
          <p className="wrap-safe text-sm font-medium leading-relaxed text-white">
            {classification.reasonText}
          </p>
        </div>

        {/* Highlighted Suspicious Phrase / Request Card */}
        <div className="rounded-2xl border border-amber-300/40 bg-black/40 p-3">
          <div className="mb-1 text-xs font-extrabold text-amber-200">
            {t.suspiciousRequestLabel}
          </div>
          <p className="url-wrap text-sm leading-relaxed text-slate-100">
            {renderTextWithHighlights(
              event.content,
              classification.matchedPhrases,
              'bg-amber-300 text-slate-950 font-bold px-1 rounded'
            )}
          </p>

          {classification.matchedPhrases.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {classification.matchedPhrases.map((phrase, idx) => (
                <span
                  key={`${phrase}-${idx}`}
                  className="url-wrap rounded-md border border-amber-300/60 bg-amber-300/20 px-2 py-0.5 text-xs font-bold text-amber-100"
                >
                  “{phrase}”
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Safe Action Card */}
        <div className="rounded-2xl border border-emerald-300/40 bg-emerald-950/60 p-3">
          <div className="mb-1 text-xs font-extrabold text-emerald-200">
            {t.safetyAdvicePrefix}
          </div>
          <p className="wrap-safe text-sm font-semibold leading-relaxed text-white">
            {classification.safetyAdvice}
          </p>
        </div>

        {/* Honest Assessment Note */}
        <p className="wrap-safe px-1 text-center text-[0.7rem] leading-relaxed text-white/80">
          {classification.cautionNote}
        </p>
      </div>

      {/* Bottom Large Accessible Action Buttons (Pinned cleanly above bottom navigation) */}
      <div className="shrink-0 space-y-2 border-t border-white/15 bg-black/45 px-3.5 pt-2.5 pb-3 [@container(min-width:355px)]:px-4">
        <button
          type="button"
          onClick={onUnderstand}
          className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 shadow-lg transition-colors hover:bg-slate-100 active:bg-slate-200 [@container(min-width:345px)]:text-base"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
          <span className="wrap-safe text-center leading-snug">
            {t.btnIUnderstand}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onViewDetails}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
          >
            <Eye className="h-4 w-4 shrink-0" />
            <span className="wrap-safe text-center leading-tight">
              {event.channel === 'call'
                ? t.btnViewCallDetails
                : t.btnViewMessageDetails}
            </span>
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4 shrink-0" />
            <span className="wrap-safe text-center leading-tight">
              {t.btnDismissAlert}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
