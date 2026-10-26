import React from 'react';
import {
  ArrowLeft,
  CheckCheck,
  MessageCircle,
  Send,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import { LanguageCode, ProcessedPhoneEvent, RiskLevel } from '../../types';
import {
  formatEventTime,
  renderTextWithHighlights,
} from '../../utils/phoneFormatting';

interface WhatsAppAppProps {
  language: LanguageCode;
  events: ProcessedPhoneEvent[];
  focusedEventId: string | null;
  userReplies: Record<string, string[]>;
  onSelectEvent: (eventId: string | null) => void;
  onMarkRead: (eventId: string) => void;
  onSendQuickReply: (eventId: string, replyText: string) => void;
  onReopenScamAlert: (eventId: string) => void;
  onBackToHome: () => void;
}

export const WhatsAppApp: React.FC<WhatsAppAppProps> = ({
  language,
  events,
  focusedEventId,
  userReplies,
  onSelectEvent,
  onMarkRead,
  onSendQuickReply,
  onReopenScamAlert,
  onBackToHome,
}) => {
  const t = getTranslation(language);
  const waEvents = [...events]
    .filter((e) => e.channel === 'whatsapp')
    .reverse();

  const selectedEvent = focusedEventId
    ? waEvents.find((e) => e.instanceId === focusedEventId) || null
    : null;

  if (selectedEvent) {
    const isFlagged =
      selectedEvent.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
    const isHighRisk =
      selectedEvent.classification.riskLevel === RiskLevel.HIGH_RISK;
    const replies = userReplies[selectedEvent.instanceId] || [];

    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-[#ECE5DD] text-slate-900">
        {/* WhatsApp Green Chat Header */}
        <header className="flex shrink-0 items-center gap-2.5 bg-[#075E54] px-3 py-3 text-white shadow-sm">
          <button
            type="button"
            aria-label={t.navBack}
            onClick={() => onSelectEvent(null)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-200 font-bold text-emerald-950">
            {selectedEvent.senderName.slice(0, 1).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold text-white">
              {selectedEvent.senderName}
            </h1>
            <p className="font-mono-tabular truncate text-[0.7rem] text-emerald-100">
              {selectedEvent.phoneNumber}
            </p>
          </div>
        </header>

        {/* Chat Wallpaper Body */}
        <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-3.5 py-4">
          {/* Incoming Chat Bubble */}
          <div className="max-w-[92%] rounded-2xl rounded-tl-none bg-white p-3.5 shadow-xs">
            <p className="url-wrap text-[0.95rem] leading-relaxed text-slate-900">
              {renderTextWithHighlights(
                selectedEvent.content,
                selectedEvent.classification.matchedPhrases,
                'bg-amber-200 text-slate-950 font-bold px-1 rounded'
              )}
            </p>
            <div className="mt-1.5 text-right text-[0.68rem] text-slate-500 tabular-nums">
              {formatEventTime(selectedEvent.receivedAtIso, language)}
            </div>
          </div>

          {/* ElderShield WhatsApp Scam Banner */}
          {isFlagged ? (
            <div
              className={`rounded-2xl border p-3.5 shadow-xs ${
                isHighRisk
                  ? 'border-red-300 bg-red-50 text-red-950'
                  : 'border-amber-300 bg-amber-50 text-amber-950'
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <ShieldAlert
                  className={`h-4 w-4 shrink-0 ${
                    isHighRisk ? 'text-red-700' : 'text-amber-700'
                  }`}
                />
                <span className="text-xs font-extrabold">
                  {isHighRisk ? t.riskHigh : t.riskSuspicious}
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {selectedEvent.classification.reasonText}
              </p>
              <p className="mt-1.5 text-xs font-semibold leading-relaxed">
                {selectedEvent.classification.safetyAdvice}
              </p>
              <button
                type="button"
                onClick={() => onReopenScamAlert(selectedEvent.instanceId)}
                className={`mt-2.5 flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white transition-colors ${
                  isHighRisk
                    ? 'bg-red-700 hover:bg-red-800'
                    : 'bg-amber-700 hover:bg-amber-800'
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                <span>{t.viewScamWarningBtn}</span>
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-200 bg-white/90 p-3 text-slate-800">
              <div className="mb-0.5 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                <span>{t.riskNoObvious}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                {t.ordinaryMessageNote}
              </p>
            </div>
          )}

          {/* User Sent WhatsApp Bubbles */}
          {replies.map((reply, idx) => (
            <div key={idx} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#DCF8C6] px-3.5 py-2.5 text-slate-900 shadow-xs">
                <p className="text-sm leading-relaxed">{reply}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[0.65rem] text-slate-500">
                  <span>{t.youSenderLabel}</span>
                  <CheckCheck className="h-3.5 w-3.5 text-sky-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safe Preset Quick Replies */}
        <div className="border-t border-black/10 bg-[#F0F2F5] px-3 py-2.5">
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSendQuickReply(selectedEvent.instanceId, t.quickReplyVerify)
              }
              className="flex min-h-[42px] items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2 text-left text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50"
            >
              <span className="line-clamp-1">{t.quickReplyVerify}</span>
              <Send className="h-3.5 w-3.5 shrink-0 text-[#075E54]" />
            </button>
            {!isFlagged && (
              <button
                type="button"
                onClick={() =>
                  onSendQuickReply(selectedEvent.instanceId, t.quickReplyThanks)
                }
                className="flex min-h-[42px] items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2 text-left text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50"
              >
                <span className="line-clamp-1">{t.quickReplyThanks}</span>
                <Send className="h-3.5 w-3.5 shrink-0 text-[#075E54]" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white text-slate-900">
      {/* WhatsApp Top Header */}
      <header className="flex shrink-0 items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white shadow-xs">
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onBackToHome}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold leading-tight text-white">
            {t.appWhatsApp}
          </h1>
          <p className="truncate text-[0.7rem] text-emerald-100">
            {t.whatsappSimSubtitle}
          </p>
        </div>
      </header>

      {/* Chat List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {waEvents.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center text-slate-500">
            <MessageCircle className="mb-3 h-10 w-10 text-emerald-300" />
            <p className="text-sm leading-relaxed">{t.whatsappEmpty}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {waEvents.map((evt) => {
              const isFlagged =
                evt.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
              const isHighRisk =
                evt.classification.riskLevel === RiskLevel.HIGH_RISK;

              return (
                <button
                  key={evt.instanceId}
                  type="button"
                  onClick={() => {
                    onMarkRead(evt.instanceId);
                    onSelectEvent(evt.instanceId);
                  }}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
                >
                  <div
                    className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${
                      isHighRisk
                        ? 'bg-red-100 text-red-700'
                        : isFlagged
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isFlagged ? (
                      <ShieldAlert className="h-5 w-5" />
                    ) : (
                      evt.senderName.slice(0, 1).toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-sm ${
                          !evt.read
                            ? 'font-extrabold text-slate-950'
                            : 'font-semibold text-slate-800'
                        }`}
                      >
                        {evt.senderName}
                      </span>
                      <span
                        className={`tabular-nums shrink-0 text-xs ${
                          !evt.read
                            ? 'font-bold text-emerald-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {formatEventTime(evt.receivedAtIso, language)}
                      </span>
                    </div>

                    <p className="url-wrap mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                      {evt.content}
                    </p>

                    {isFlagged && (
                      <span
                        className={`mt-1.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.68rem] font-bold ${
                          isHighRisk
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        <ShieldAlert className="h-3 w-3" />
                        {isHighRisk ? t.riskHigh : t.riskSuspicious}
                      </span>
                    )}
                  </div>

                  {!evt.read && (
                    <span className="mt-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[0.68rem] font-bold text-white">
                      1
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
