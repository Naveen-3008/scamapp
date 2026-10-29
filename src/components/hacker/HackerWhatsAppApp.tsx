import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  MessageCircle,
  Send,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import {
  ELDER_GUARDIAN_TARGET,
  HACKER_WHATSAPP_TEMPLATES,
} from '../../data/hackerScenarioLibrary';
import { RiskLevel } from '../../types';
import { formatEventTime } from '../../utils/phoneFormatting';

const QUICK_PERSONA_CHATS = [
  {
    id: 'persona-bank',
    senderName: 'National Bank Care',
    senderNumber: '+91 90000 00311',
    subtitle: 'Fake bank support persona',
    templateId: 'lib-wa-bank-support',
  },
  {
    id: 'persona-family',
    senderName: 'Rohan (New Number)',
    senderNumber: '+91 90000 44210',
    subtitle: 'Family-member impersonation persona',
    templateId: 'lib-wa-family-impersonation',
  },
  {
    id: 'persona-upi',
    senderName: 'Gas Subsidy Helpdesk',
    senderNumber: '+91 90000 00325',
    subtitle: 'Suspicious UPI collect persona',
    templateId: 'lib-wa-upi-payment',
  },
  {
    id: 'persona-safe-daughter',
    senderName: 'Priya (Daughter)',
    senderNumber: '+91 90000 10202',
    subtitle: 'Ordinary harmless family chat',
    templateId: 'lib-wa-safe-daughter',
  },
];

export const HackerWhatsAppApp: React.FC = () => {
  const {
    receiverSim,
    whatsAppDraft,
    updateWhatsAppDraft,
    applyWhatsAppTemplateById,
    whatsAppView,
    setWhatsAppView,
    sendWhatsAppFromHacker,
    navigateHackerHome,
  } = useDualPhoneSimulation();

  const [isControlsExpanded, setIsControlsExpanded] = useState<boolean>(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Shared live WhatsApp messages from ElderGuardian's state (oldest -> newest)
  const sharedWhatsAppEvents = useMemo(
    () => receiverSim.processedEvents.filter((e) => e.channel === 'whatsapp'),
    [receiverSim.processedEvents]
  );

  const latestSharedEvent =
    sharedWhatsAppEvents.length > 0
      ? sharedWhatsAppEvents[sharedWhatsAppEvents.length - 1]
      : null;

  useEffect(() => {
    if (whatsAppView === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [whatsAppView, sharedWhatsAppEvents.length, receiverSim.userReplies]);

  const handleSelectScenario = (templateId: string) => {
    applyWhatsAppTemplateById(templateId);
    setWhatsAppView('chat');
    if (templateId === 'custom') {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsAppDraft.content.trim()) return;
    sendWhatsAppFromHacker();
  };

  const formatRiskText = (risk: RiskLevel): string => {
    if (risk === RiskLevel.HIGH_RISK) return 'High Risk Alert';
    if (risk === RiskLevel.SUSPICIOUS) return 'Suspicious Alert';
    return 'Ordinary';
  };

  // ==================== 1. WHATSAPP CHAT LIST VIEW ====================
  if (whatsAppView === 'list') {
    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-white text-slate-900">
        {/* Authentic WhatsApp Deep Green Top Header */}
        <header className="flex shrink-0 items-center justify-between gap-2 bg-[#075E54] px-3.5 py-3 text-white shadow-xs">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Back to Hacker Home"
              onClick={navigateHackerHome}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold leading-tight text-white">
                WhatsApp
              </h1>
              <p className="truncate text-[0.68rem] text-emerald-100">
                Simulator · Linked to ElderGuardian
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setWhatsAppView('chat')}
            className="shrink-0 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/25"
          >
            Open Chat
          </button>
        </header>

        {/* Scenario Selector Bar for Fast Suspicious & Ordinary Testing */}
        <div className="shrink-0 border-b border-slate-200 bg-[#F0F2F5] px-3.5 py-2.5">
          <label
            htmlFor="wa-list-scenario-select"
            className="block text-[0.7rem] font-bold text-slate-700"
          >
            Scenario Selector (Suspicious & Ordinary)
          </label>
          <select
            id="wa-list-scenario-select"
            value={whatsAppDraft.selectedTemplateId}
            onChange={(e) => handleSelectScenario(e.target.value)}
            className="mt-1 min-h-[40px] w-full rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-[#075E54]"
          >
            <optgroup label="Suspicious WhatsApp Scenarios">
              {HACKER_WHATSAPP_TEMPLATES.filter((s) => s.markedSuspicious).map(
                (scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.templateLabel}
                  </option>
                )
              )}
            </optgroup>
            <optgroup label="Ordinary Harmless Messages">
              {HACKER_WHATSAPP_TEMPLATES.filter((s) => !s.markedSuspicious).map(
                (scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.templateLabel}
                  </option>
                )
              )}
            </optgroup>
            <optgroup label="Custom">
              <option value="custom">Write custom WhatsApp message…</option>
            </optgroup>
          </select>
        </div>

        {/* Chat List */}
        <div className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto">
          {/* Primary Selectable Recipient Thread: ElderGuardian — Receiver */}
          <button
            type="button"
            onClick={() => setWhatsAppView('chat')}
            className="flex w-full items-start gap-3 bg-emerald-50/55 px-4 py-3.5 text-left transition-colors hover:bg-emerald-50"
          >
            <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#075E54] text-white shadow-2xs">
              <Shield className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-extrabold text-slate-950">
                  {ELDER_GUARDIAN_TARGET.name}
                </span>
                <span className="tabular-nums shrink-0 text-xs font-semibold text-[#075E54]">
                  {latestSharedEvent
                    ? formatEventTime(latestSharedEvent.receivedAtIso, 'en')
                    : 'Online'}
                </span>
              </div>

              <div className="font-mono-tabular text-[0.68rem] text-slate-500">
                Recipient · {ELDER_GUARDIAN_TARGET.phoneNumber}
              </div>

              {latestSharedEvent ? (
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                  <CheckCheck
                    className={`h-3.5 w-3.5 shrink-0 ${
                      latestSharedEvent.read
                        ? 'text-sky-500'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="url-wrap line-clamp-1">
                    {latestSharedEvent.content}
                  </span>
                </div>
              ) : (
                <p className="mt-1 line-clamp-1 text-xs text-slate-600">
                  Tap to open conversation and send simulated WhatsApp messages
                </p>
              )}
            </div>

            <div className="mt-2 flex shrink-0 items-center gap-1">
              {sharedWhatsAppEvents.length > 0 && (
                <span className="tabular-nums flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#25D366] px-1.5 text-[0.68rem] font-bold text-slate-950">
                  {sharedWhatsAppEvents.length}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </button>

          {/* Preset Sender Persona Shortcuts */}
          <div className="bg-slate-50 px-4 py-2 text-[0.68rem] font-bold text-slate-500">
            Quick Sender Identities → Message ElderGuardian
          </div>

          {QUICK_PERSONA_CHATS.map((persona) => {
            const personaMsgs = sharedWhatsAppEvents.filter(
              (m) =>
                m.senderName.toLowerCase() === persona.senderName.toLowerCase()
            );
            const lastMsg =
              personaMsgs.length > 0
                ? personaMsgs[personaMsgs.length - 1]
                : null;

            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => handleSelectScenario(persona.templateId)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900">
                  {persona.senderName.slice(0, 1).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold text-slate-900">
                      {persona.senderName}
                    </span>
                    <span className="tabular-nums shrink-0 text-[0.7rem] text-slate-500">
                      {lastMsg
                        ? formatEventTime(lastMsg.receivedAtIso, 'en')
                        : 'Preset'}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500">
                    {lastMsg ? lastMsg.content : persona.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ==================== 2. WHATSAPP CONVERSATION VIEW ====================
  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#ECE5DD] text-slate-900">
      {/* WhatsApp Green Conversation Header */}
      <header className="flex shrink-0 items-center justify-between gap-2 bg-[#075E54] px-3 py-2.5 text-white shadow-xs">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            aria-label="Back to WhatsApp Chats"
            onClick={() => setWhatsAppView('list')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-200 font-bold text-emerald-950">
            <Shield className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold text-white">
              {whatsAppDraft.recipientName}
            </h1>
            <p className="font-mono-tabular truncate text-[0.68rem] text-emerald-100">
              {whatsAppDraft.recipientNumber} · Live Sync
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsControlsExpanded((v) => !v)}
          aria-expanded={isControlsExpanded}
          className="flex min-h-[36px] shrink-0 items-center gap-1 rounded-xl bg-white/15 px-2.5 py-1.5 text-[0.7rem] font-bold text-white transition-colors hover:bg-white/25"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" />
          <span>Scenario</span>
          {isControlsExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 shrink-0" />
          )}
        </button>
      </header>

      {/* Collapsible Scenario & Spoofed Sender Bar */}
      {isControlsExpanded && (
        <div className="shrink-0 space-y-2 border-b border-black/10 bg-[#F0F2F5] px-3 py-2.5">
          <div>
            <label
              htmlFor="wa-chat-scenario-select"
              className="block text-[0.68rem] font-bold text-slate-700"
            >
              Test Scenario Preset
            </label>
            <select
              id="wa-chat-scenario-select"
              value={whatsAppDraft.selectedTemplateId}
              onChange={(e) => applyWhatsAppTemplateById(e.target.value)}
              className="mt-0.5 min-h-[38px] w-full rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-[#075E54]"
            >
              <optgroup label="Suspicious WhatsApp Scenarios">
                {HACKER_WHATSAPP_TEMPLATES.filter((s) => s.markedSuspicious).map(
                  (scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.templateLabel}
                    </option>
                  )
                )}
              </optgroup>
              <optgroup label="Ordinary Harmless Messages">
                {HACKER_WHATSAPP_TEMPLATES.filter(
                  (s) => !s.markedSuspicious
                ).map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.templateLabel}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom">
                <option value="custom">Custom WhatsApp message</option>
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="wa-sender-name"
                className="block text-[0.66rem] font-semibold text-slate-600"
              >
                Sending As (Name)
              </label>
              <input
                id="wa-sender-name"
                type="text"
                value={whatsAppDraft.senderName}
                onChange={(e) =>
                  updateWhatsAppDraft({ senderName: e.target.value })
                }
                placeholder="Sender Name"
                className="mt-0.5 min-h-[34px] w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="wa-sender-number"
                className="block text-[0.66rem] font-semibold text-slate-600"
              >
                Sender Number
              </label>
              <input
                id="wa-sender-number"
                type="text"
                value={whatsAppDraft.senderNumber}
                onChange={(e) =>
                  updateWhatsAppDraft({ senderNumber: e.target.value })
                }
                placeholder="+91 90000 00311"
                className="font-mono-tabular mt-0.5 min-h-[34px] w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900"
              />
            </div>
          </div>

          {whatsAppDraft.selectedTemplateId === 'custom' && (
            <label className="flex items-center gap-2 pt-0.5 text-[0.7rem] font-medium text-slate-700">
              <input
                type="checkbox"
                checked={whatsAppDraft.markedSuspicious}
                onChange={(e) =>
                  updateWhatsAppDraft({ markedSuspicious: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 accent-[#075E54]"
              />
              <span>
                Flag custom message as suspicious even without scam keywords
              </span>
            </label>
          )}
        </div>
      )}

      {/* Shared WhatsApp Conversation Stream */}
      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
        {/* Simulation Encryption / Sandbox Note */}
        <div className="mx-auto max-w-[92%] rounded-xl bg-[#FFF5C4] px-3 py-1.5 text-center text-[0.68rem] leading-snug text-slate-800 shadow-2xs">
          Fictional local simulation. Messages sent here appear immediately in{' '}
          <span className="font-bold">ElderGuardian’s WhatsApp</span>.
        </div>

        {sharedWhatsAppEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-slate-600">
            <MessageCircle className="mb-2 h-8 w-8 text-[#075E54]/45" />
            <p className="max-w-[230px] text-xs leading-relaxed">
              Pick a preset scenario above or type a message below and press{' '}
              <span className="font-bold">Send</span>.
            </p>
          </div>
        ) : (
          sharedWhatsAppEvents.map((msg) => {
            const replies = receiverSim.userReplies[msg.instanceId] || [];
            const isFlagged =
              msg.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;

            return (
              <div key={msg.instanceId} className="space-y-2">
                {/* Outgoing Green WhatsApp Bubble on Hacker Phone */}
                <div className="flex justify-end">
                  <div className="max-w-[90%] rounded-2xl rounded-tr-none bg-[#DCF8C6] px-3 py-2 text-slate-900 shadow-xs">
                    <div className="mb-0.5 flex items-center justify-between gap-2 text-[0.65rem] font-bold text-[#075E54]">
                      <span className="truncate">{msg.senderName}</span>
                      <span className="font-mono-tabular shrink-0 font-normal text-slate-500">
                        {msg.phoneNumber}
                      </span>
                    </div>

                    <p className="url-wrap text-xs leading-relaxed text-slate-900">
                      {msg.content}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center justify-end gap-1.5 text-[0.64rem] text-slate-600">
                      <span
                        className={
                          isFlagged
                            ? 'font-bold text-red-700'
                            : 'font-semibold text-emerald-800'
                        }
                      >
                        {formatRiskText(msg.classification.riskLevel)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {formatEventTime(msg.receivedAtIso, 'en')}
                      </span>
                      <CheckCheck
                        aria-label={msg.read ? 'Read' : 'Delivered'}
                        className={`h-3.5 w-3.5 shrink-0 ${
                          msg.read ? 'text-sky-500' : 'text-slate-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Incoming Reply Bubbles if ElderGuardian Replied */}
                {replies.map((replyText, idx) => (
                  <div
                    key={`${msg.instanceId}-rx-reply-${idx}`}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-white px-3 py-2 text-slate-900 shadow-xs">
                      <div className="mb-0.5 text-[0.65rem] font-bold text-teal-800">
                        {ELDER_GUARDIAN_TARGET.name}
                      </div>
                      <p className="text-xs leading-relaxed text-slate-900">
                        {replyText}
                      </p>
                      <div className="mt-0.5 text-right text-[0.62rem] text-slate-400">
                        Reply received
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Bottom WhatsApp Message Input & Send Button */}
      <form
        onSubmit={handleSend}
        className="flex shrink-0 items-end gap-2 border-t border-black/10 bg-[#F0F2F5] px-2.5 py-2"
      >
        <textarea
          ref={inputRef}
          rows={2}
          value={whatsAppDraft.content}
          onChange={(e) => updateWhatsAppDraft({ content: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (whatsAppDraft.content.trim()) {
                sendWhatsAppFromHacker();
              }
            }
          }}
          placeholder="Type a WhatsApp message…"
          aria-label="WhatsApp message input"
          className="min-h-[42px] max-h-24 min-w-0 flex-1 resize-none rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs leading-snug text-slate-900 placeholder:text-slate-400 focus:border-[#075E54] focus:outline-none"
        />

        <button
          type="submit"
          aria-label="Send WhatsApp message"
          disabled={!whatsAppDraft.content.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#075E54] text-white shadow-sm transition-colors hover:bg-[#064e46] disabled:opacity-45"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
