import React, { useEffect, useMemo, useRef } from 'react';
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

interface WhatsAppContactThread {
  threadKey: string;
  senderName: string;
  phoneNumber: string;
  messagesChronological: ProcessedPhoneEvent[];
  latestEvent: ProcessedPhoneEvent;
  unreadCount: number;
  highestRisk: RiskLevel;
}

function getContactThreadKey(evt: ProcessedPhoneEvent): string {
  return `${evt.senderName.trim().toLowerCase()}__${evt.phoneNumber.trim().toLowerCase()}`;
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
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Chronological list of all WhatsApp events (oldest -> newest)
  const waChronological = useMemo(
    () => events.filter((e) => e.channel === 'whatsapp'),
    [events]
  );

  // Group into WhatsApp threads by sender identity so multi-message chats stay together
  const threads: WhatsAppContactThread[] = useMemo(() => {
    const map = new Map<string, ProcessedPhoneEvent[]>();
    for (const evt of waChronological) {
      const key = getContactThreadKey(evt);
      const existing = map.get(key);
      if (existing) {
        existing.push(evt);
      } else {
        map.set(key, [evt]);
      }
    }

    const built: WhatsAppContactThread[] = [];
    for (const [threadKey, msgs] of map.entries()) {
      const latestEvent = msgs[msgs.length - 1];
      let unreadCount = 0;
      let highestRisk: RiskLevel = RiskLevel.NO_OBVIOUS_SIGNS;

      for (const m of msgs) {
        if (!m.read) unreadCount += 1;
        if (m.classification.riskLevel === RiskLevel.HIGH_RISK) {
          highestRisk = RiskLevel.HIGH_RISK;
        } else if (
          m.classification.riskLevel === RiskLevel.SUSPICIOUS &&
          highestRisk !== RiskLevel.HIGH_RISK
        ) {
          highestRisk = RiskLevel.SUSPICIOUS;
        }
      }

      built.push({
        threadKey,
        senderName: latestEvent.senderName,
        phoneNumber: latestEvent.phoneNumber,
        messagesChronological: msgs,
        latestEvent,
        unreadCount,
        highestRisk,
      });
    }

    // Most recently active WhatsApp conversation at the top
    return built.sort(
      (a, b) =>
        new Date(b.latestEvent.receivedAtIso).getTime() -
        new Date(a.latestEvent.receivedAtIso).getTime()
    );
  }, [waChronological]);

  const selectedEvent = focusedEventId
    ? waChronological.find((e) => e.instanceId === focusedEventId) || null
    : null;

  const activeThread = useMemo(() => {
    if (!selectedEvent) return null;
    const key = getContactThreadKey(selectedEvent);
    return threads.find((th) => th.threadKey === key) || null;
  }, [selectedEvent, threads]);

  // Mark any newly arrived messages in the open thread as read & scroll to bottom
  useEffect(() => {
    if (!activeThread) return;
    for (const msg of activeThread.messagesChronological) {
      if (!msg.read) {
        onMarkRead(msg.instanceId);
      }
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeThread, userReplies, onMarkRead]);

  if (selectedEvent && activeThread) {
    const threadMessages = activeThread.messagesChronological;
    const latestThreadMessage = activeThread.latestEvent;
    const threadHasAnyFlagged =
      activeThread.highestRisk !== RiskLevel.NO_OBVIOUS_SIGNS;

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
            {activeThread.senderName.slice(0, 1).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold text-white">
              {activeThread.senderName}
            </h1>
            <p className="font-mono-tabular truncate text-[0.7rem] text-emerald-100">
              {activeThread.phoneNumber}
            </p>
          </div>
        </header>

        {/* Chat Wallpaper Body */}
        <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-3.5 py-4">
          {threadMessages.map((msg) => {
            const isFlagged =
              msg.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
            const isHighRisk =
              msg.classification.riskLevel === RiskLevel.HIGH_RISK;
            const replies = userReplies[msg.instanceId] || [];

            return (
              <div key={msg.instanceId} className="space-y-2.5">
                {/* Incoming WhatsApp Bubble */}
                <div className="max-w-[92%] rounded-2xl rounded-tl-none bg-white p-3.5 shadow-xs">
                  <p className="url-wrap text-[0.95rem] leading-relaxed text-slate-900">
                    {renderTextWithHighlights(
                      msg.content,
                      msg.classification.matchedPhrases,
                      'bg-amber-200 text-slate-950 font-bold px-1 rounded'
                    )}
                  </p>
                  <div className="mt-1.5 text-right text-[0.68rem] text-slate-500 tabular-nums">
                    {formatEventTime(msg.receivedAtIso, language)}
                  </div>
                </div>

                {/* ElderShield Scam Warning Card for Suspicious Message */}
                {isFlagged && (
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
                      {msg.classification.reasonText}
                    </p>
                    <p className="mt-1.5 text-xs font-semibold leading-relaxed">
                      {msg.classification.safetyAdvice}
                    </p>
                    <button
                      type="button"
                      onClick={() => onReopenScamAlert(msg.instanceId)}
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
                )}

                {/* User Sent WhatsApp Reply Bubbles */}
                {replies.map((reply, idx) => (
                  <div key={`${msg.instanceId}-reply-${idx}`} className="flex justify-end">
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
            );
          })}

          {/* Calm note when conversation has no scam signs */}
          {!threadHasAnyFlagged && (
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

          <div ref={chatEndRef} />
        </div>

        {/* Safe Preset Quick Replies */}
        <div className="border-t border-black/10 bg-[#F0F2F5] px-3 py-2.5">
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSendQuickReply(
                  latestThreadMessage.instanceId,
                  t.quickReplyVerify
                )
              }
              className="flex min-h-[42px] items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2 text-left text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50"
            >
              <span className="line-clamp-1">{t.quickReplyVerify}</span>
              <Send className="h-3.5 w-3.5 shrink-0 text-[#075E54]" />
            </button>
            {!threadHasAnyFlagged && (
              <button
                type="button"
                onClick={() =>
                  onSendQuickReply(
                    latestThreadMessage.instanceId,
                    t.quickReplyThanks
                  )
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
        {threads.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center text-slate-500">
            <MessageCircle className="mb-3 h-10 w-10 text-emerald-300" />
            <p className="text-sm leading-relaxed">{t.whatsappEmpty}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {threads.map((thread) => {
              const isFlagged =
                thread.highestRisk !== RiskLevel.NO_OBVIOUS_SIGNS;
              const isHighRisk = thread.highestRisk === RiskLevel.HIGH_RISK;
              const hasUnread = thread.unreadCount > 0;

              return (
                <button
                  key={thread.threadKey}
                  type="button"
                  onClick={() => {
                    for (const m of thread.messagesChronological) {
                      if (!m.read) onMarkRead(m.instanceId);
                    }
                    onSelectEvent(thread.latestEvent.instanceId);
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
                      thread.senderName.slice(0, 1).toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-sm ${
                          hasUnread
                            ? 'font-extrabold text-slate-950'
                            : 'font-semibold text-slate-800'
                        }`}
                      >
                        {thread.senderName}
                      </span>
                      <span
                        className={`tabular-nums shrink-0 text-xs ${
                          hasUnread
                            ? 'font-bold text-emerald-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {formatEventTime(
                          thread.latestEvent.receivedAtIso,
                          language
                        )}
                      </span>
                    </div>

                    <p className="url-wrap mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                      {thread.latestEvent.content}
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

                  {hasUnread && (
                    <span className="tabular-nums mt-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[0.68rem] font-bold text-white">
                      {thread.unreadCount}
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
