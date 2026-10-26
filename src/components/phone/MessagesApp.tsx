import React from 'react';
import {
  ArrowLeft,
  MessageSquare,
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

interface MessagesAppProps {
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

export const MessagesApp: React.FC<MessagesAppProps> = ({
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
  const smsEvents = [...events]
    .filter((e) => e.channel === 'sms')
    .reverse();

  const selectedEvent = focusedEventId
    ? smsEvents.find((e) => e.instanceId === focusedEventId) || null
    : null;

  if (selectedEvent) {
    const isFlagged =
      selectedEvent.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
    const isHighRisk =
      selectedEvent.classification.riskLevel === RiskLevel.HIGH_RISK;
    const replies = userReplies[selectedEvent.instanceId] || [];

    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-slate-50 text-slate-900">
        {/* SMS Thread Header */}
        <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-xs">
          <button
            type="button"
            aria-label={t.navBack}
            onClick={() => onSelectEvent(null)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-slate-900">
              {selectedEvent.senderName}
            </h1>
            <p className="font-mono-tabular truncate text-xs text-slate-500">
              {selectedEvent.phoneNumber}
            </p>
          </div>
        </header>

        {/* Conversation Body */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {/* Incoming SMS Bubble */}
          <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 shadow-xs">
            <p className="url-wrap text-[0.95rem] leading-relaxed text-slate-900">
              {renderTextWithHighlights(
                selectedEvent.content,
                selectedEvent.classification.matchedPhrases,
                'bg-amber-200 text-slate-950 font-bold px-1 rounded'
              )}
            </p>
            <div className="mt-2 text-right text-[0.72rem] text-slate-500 tabular-nums">
              {formatEventTime(selectedEvent.receivedAtIso, language)}
            </div>
          </div>

          {/* ElderShield Inline Assessment Card */}
          {isFlagged ? (
            <div
              className={`rounded-2xl border p-4 ${
                isHighRisk
                  ? 'border-red-300 bg-red-50 text-red-950'
                  : 'border-amber-300 bg-amber-50 text-amber-950'
              }`}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <ShieldAlert
                  className={`h-5 w-5 shrink-0 ${
                    isHighRisk ? 'text-red-700' : 'text-amber-700'
                  }`}
                />
                <span className="text-sm font-extrabold">
                  {isHighRisk ? t.riskHigh : t.riskSuspicious}
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                {selectedEvent.classification.reasonText}
              </p>
              <p className="mt-2 text-xs font-semibold leading-relaxed">
                {selectedEvent.classification.safetyAdvice}
              </p>
              <button
                type="button"
                onClick={() => onReopenScamAlert(selectedEvent.instanceId)}
                className={`mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-xs transition-colors ${
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-emerald-950">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                <span>{t.riskNoObvious}</span>
              </div>
              <p className="text-xs leading-relaxed text-emerald-900">
                {t.ordinaryMessageNote}
              </p>
            </div>
          )}

          {/* User Sent Quick Replies */}
          {replies.map((reply, idx) => (
            <div key={idx} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-white shadow-xs">
                <div className="mb-0.5 text-[0.68rem] font-semibold text-blue-100">
                  {t.youSenderLabel}
                </div>
                <p className="text-sm leading-relaxed">{reply}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Safe Quick Reply Bar */}
        <div className="border-t border-slate-200 bg-white px-3 py-2.5">
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSendQuickReply(selectedEvent.instanceId, t.quickReplyVerify)
              }
              className="flex min-h-[42px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-800 hover:bg-slate-100"
            >
              <span className="line-clamp-1">{t.quickReplyVerify}</span>
              <Send className="h-3.5 w-3.5 shrink-0 text-blue-600" />
            </button>
            {!isFlagged && (
              <button
                type="button"
                onClick={() =>
                  onSendQuickReply(selectedEvent.instanceId, t.quickReplyThanks)
                }
                className="flex min-h-[42px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-800 hover:bg-slate-100"
              >
                <span className="line-clamp-1">{t.quickReplyThanks}</span>
                <Send className="h-3.5 w-3.5 shrink-0 text-blue-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white text-slate-900">
      {/* SMS App Top Bar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3.5">
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onBackToHome}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <MessageSquare className="h-5 w-5 shrink-0 text-blue-600" />
          <h1 className="truncate text-lg font-bold text-slate-900">{t.appMessages}</h1>
        </div>
      </header>

      {/* SMS Inbox List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {smsEvents.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center text-slate-500">
            <MessageSquare className="mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm leading-relaxed">{t.messagesEmpty}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {smsEvents.map((evt) => {
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
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${
                      isHighRisk
                        ? 'bg-red-100 text-red-700'
                        : isFlagged
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-700'
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
                      <span className="tabular-nums shrink-0 text-xs text-slate-500">
                        {formatEventTime(evt.receivedAtIso, language)}
                      </span>
                    </div>

                    <p
                      className={`url-wrap mt-0.5 line-clamp-2 text-xs leading-relaxed ${
                        !evt.read
                          ? 'font-semibold text-slate-900'
                          : 'text-slate-600'
                      }`}
                    >
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
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
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
