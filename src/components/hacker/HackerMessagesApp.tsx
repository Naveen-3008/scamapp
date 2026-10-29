import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import {
  ELDER_GUARDIAN_TARGET,
  HACKER_SMS_TEMPLATES,
} from '../../data/hackerScenarioLibrary';
import { RiskLevel } from '../../types';
import { formatEventTime } from '../../utils/phoneFormatting';

export const HackerMessagesApp: React.FC = () => {
  const {
    smsDraft,
    updateSmsDraft,
    applySmsTemplateById,
    sendSmsFromHacker,
    sentMessages,
    navigateHackerHome,
    focusCustomSmsCounter,
  } = useDualPhoneSimulation();

  const [justSentNotice, setJustSentNotice] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (focusCustomSmsCounter > 0 && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [focusCustomSmsCounter]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = sendSmsFromHacker();
    if (ok) {
      setJustSentNotice(true);
      window.setTimeout(() => setJustSentNotice(false), 2000);
    }
  };

  const getRiskText = (risk: RiskLevel): string => {
    if (risk === RiskLevel.HIGH_RISK) return 'Flagged: High Risk';
    if (risk === RiskLevel.SUSPICIOUS) return 'Flagged: Suspicious';
    return 'Passed: Ordinary Message';
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-950 text-slate-100">
      {/* App Header */}
      <header className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-slate-900 px-4 py-3">
        <button
          type="button"
          aria-label="Back to Hacker Home"
          onClick={navigateHackerHome}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-200 hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <MessageSquare className="h-5 w-5 shrink-0 text-amber-400" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white">
              SMS Simulator
            </h1>
            <p className="truncate text-[0.68rem] text-slate-400">
              Send fictional test SMS to ElderGuardian
            </p>
          </div>
        </div>
      </header>

      {/* Scrollable Composer & Sent History */}
      <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-3.5 py-3.5 [@container(min-width:355px)]:px-4">
        <form onSubmit={handleSend} className="space-y-3">
          {/* Recipient Selector */}
          <div>
            <label
              htmlFor="hacker-sms-recipient"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Recipient Phone
            </label>
            <select
              id="hacker-sms-recipient"
              value={ELDER_GUARDIAN_TARGET.id}
              onChange={() => {}}
              className="min-h-[42px] w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
            >
              <option value={ELDER_GUARDIAN_TARGET.id}>
                {ELDER_GUARDIAN_TARGET.name} ({ELDER_GUARDIAN_TARGET.phoneNumber})
              </option>
            </select>
          </div>

          {/* Preset Scam & Ordinary Template Selector */}
          <div>
            <label
              htmlFor="hacker-sms-template"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Preset Scenario Template
            </label>
            <select
              id="hacker-sms-template"
              value={smsDraft.selectedTemplateId}
              onChange={(e) => applySmsTemplateById(e.target.value)}
              className="min-h-[42px] w-full rounded-xl border border-amber-400/35 bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
            >
              <optgroup label="Scam & Phishing Templates">
                {HACKER_SMS_TEMPLATES.filter(
                  (t) => t.category === 'sms_scams'
                ).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.templateLabel}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Ordinary Legitimate Messages (Comparison)">
                {HACKER_SMS_TEMPLATES.filter(
                  (t) => t.category === 'safe_messages'
                ).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.templateLabel}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom">
                <option value="custom">Custom fictional message…</option>
              </optgroup>
            </select>
          </div>

          {/* Fictional Sender Identity Row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <label
                htmlFor="hacker-sender-name"
                className="mb-1 block text-[0.7rem] font-semibold text-slate-400"
              >
                Sender Name / Header
              </label>
              <input
                id="hacker-sender-name"
                type="text"
                value={smsDraft.senderName}
                onChange={(e) =>
                  updateSmsDraft({
                    senderName: e.target.value,
                    selectedTemplateId: 'custom',
                  })
                }
                placeholder="e.g. VM-NTBANK"
                className="min-h-[38px] w-full rounded-xl border border-white/15 bg-slate-900 px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="hacker-sender-number"
                className="mb-1 block text-[0.7rem] font-semibold text-slate-400"
              >
                Sender Number / Code
              </label>
              <input
                id="hacker-sender-number"
                type="text"
                value={smsDraft.senderNumber}
                onChange={(e) =>
                  updateSmsDraft({
                    senderNumber: e.target.value,
                    selectedTemplateId: 'custom',
                  })
                }
                placeholder="+91 90000 00105"
                className="font-mono-tabular min-h-[38px] w-full rounded-xl border border-white/15 bg-slate-900 px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Message Body Textarea */}
          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <label
                htmlFor="hacker-sms-body"
                className="text-xs font-semibold text-slate-300"
              >
                Message Text
              </label>
              { smsDraft.content.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    updateSmsDraft({
                      content: '',
                      selectedTemplateId: 'custom',
                    })
                  }
                  className="text-[0.68rem] font-semibold text-slate-400 hover:text-white"
                >
                  Clear text
                </button>
              )}
            </div>
            <textarea
              ref={textareaRef}
              id="hacker-sms-body"
              rows={4}
              value={smsDraft.content}
              onChange={(e) =>
                updateSmsDraft({ content: e.target.value })
              }
              placeholder="Type a custom fictional scam or ordinary message to test how ElderGuardian responds…"
              className="w-full resize-none rounded-2xl border border-white/15 bg-slate-900 p-3 text-xs leading-relaxed text-white placeholder:text-slate-500"
            />
          </div>

          {/* Send Message Button */}
          <button
            type="submit"
            disabled={smsDraft.content.trim().length === 0}
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md transition-colors hover:bg-amber-400 active:bg-amber-300 disabled:opacity-45"
          >
            <Send className="h-4 w-4 shrink-0" />
            <span>Send Message</span>
          </button>

          {justSentNotice && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>Delivered to ElderGuardian — Receiver</span>
            </div>
          )}
        </form>

        {/* Sent SMS Log */}
        <div className="border-t border-white/10 pt-3">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Sent to ElderGuardian ({sentMessages.length})
            </span>
            <span>Simulated Local Delivery</span>
          </div>

          {sentMessages.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-slate-900/50 p-3 text-center text-xs text-slate-400">
              No test messages sent in this session yet.
            </p>
          ) : (
            <div className="space-y-2">
              {sentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-3"
                >
                  <div className="flex items-center justify-between gap-2 text-[0.7rem] text-slate-400">
                    <span className="truncate font-semibold text-slate-200">
                      As {msg.senderName}
                    </span>
                    <span className="tabular-nums shrink-0">
                      {formatEventTime(msg.sentAtIso, 'en')}
                    </span>
                  </div>
                  <p className="url-wrap mt-1 text-xs leading-relaxed text-slate-200">
                    {msg.content}
                  </p>
                  <div className="mt-1.5 text-[0.68rem] font-medium text-slate-400">
                    <span
                      className={
                        msg.detectedRisk === RiskLevel.NO_OBVIOUS_SIGNS
                          ? 'text-emerald-300'
                          : 'text-amber-300'
                      }
                    >
                      {getRiskText(msg.detectedRisk)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
