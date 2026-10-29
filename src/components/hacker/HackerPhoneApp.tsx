import React from 'react';
import { ArrowLeft, Phone, PhoneCall, PhoneOutgoing } from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import {
  ELDER_GUARDIAN_TARGET,
  HACKER_CALL_PRESETS,
} from '../../data/hackerScenarioLibrary';
import {
  formatDurationMmSs,
  formatEventTime,
} from '../../utils/phoneFormatting';

export const HackerPhoneApp: React.FC = () => {
  const {
    callDraft,
    updateCallDraft,
    applyCallPresetById,
    startCallFromHacker,
    callHistory,
    isCallInProgress,
    navigateHackerHome,
  } = useDualPhoneSimulation();

  const handlePlaceCall = (e: React.FormEvent) => {
    e.preventDefault();
    startCallFromHacker();
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-950 text-slate-100">
      {/* Header */}
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
          <Phone className="h-5 w-5 shrink-0 text-rose-400" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white">
              Call Simulator
            </h1>
            <p className="truncate text-[0.68rem] text-slate-400">
              Place simulated calls to ElderGuardian
            </p>
          </div>
        </div>
      </header>

      {/* Scrollable Call Setup & Outgoing Call History */}
      <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-3.5 py-3.5 [@container(min-width:355px)]:px-4">
        <form onSubmit={handlePlaceCall} className="space-y-3">
          {/* Target Receiver */}
          <div>
            <label
              htmlFor="hacker-call-target"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Recipient Phone
            </label>
            <select
              id="hacker-call-target"
              value={ELDER_GUARDIAN_TARGET.id}
              onChange={() => {}}
              className="min-h-[42px] w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
            >
              <option value={ELDER_GUARDIAN_TARGET.id}>
                {ELDER_GUARDIAN_TARGET.name} ({ELDER_GUARDIAN_TARGET.phoneNumber})
              </option>
            </select>
          </div>

          {/* Preset Caller Identity Selector */}
          <div>
            <label
              htmlFor="hacker-caller-preset"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Preset Caller Identity
            </label>
            <select
              id="hacker-caller-preset"
              value={callDraft.selectedPresetId}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  updateCallDraft({ selectedPresetId: 'custom' });
                } else {
                  applyCallPresetById(e.target.value);
                }
              }}
              className="min-h-[42px] w-full rounded-xl border border-rose-400/35 bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
            >
              <optgroup label="Suspicious Caller Presets">
                {HACKER_CALL_PRESETS.filter(
                  (c) => c.category === 'suspicious_calls'
                ).map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.templateLabel}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Ordinary / Safe Caller Presets">
                {HACKER_CALL_PRESETS.filter(
                  (c) => c.category === 'safe_calls'
                ).map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.templateLabel}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom">
                <option value="custom">Custom Caller Identity…</option>
              </optgroup>
            </select>
          </div>

          {/* Caller Name & Fictional Number */}
          <div className="grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <label
                htmlFor="hacker-caller-name"
                className="mb-1 block text-[0.7rem] font-semibold text-slate-400"
              >
                Caller Name
              </label>
              <input
                id="hacker-caller-name"
                type="text"
                value={callDraft.callerName}
                onChange={(e) =>
                  updateCallDraft({
                    callerName: e.target.value,
                    selectedPresetId: 'custom',
                  })
                }
                placeholder="e.g. Bank Support"
                className="min-h-[38px] w-full rounded-xl border border-white/15 bg-slate-900 px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="hacker-caller-number"
                className="mb-1 block text-[0.7rem] font-semibold text-slate-400"
              >
                Fictional Number
              </label>
              <input
                id="hacker-caller-number"
                type="text"
                value={callDraft.callerNumber}
                onChange={(e) =>
                  updateCallDraft({
                    callerNumber: e.target.value,
                    selectedPresetId: 'custom',
                  })
                }
                placeholder="+91 90000 00299"
                className="font-mono-tabular min-h-[38px] w-full rounded-xl border border-white/15 bg-slate-900 px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Simulated Spoken Call Pitch */}
          <div>
            <label
              htmlFor="hacker-caller-pitch"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Simulated Caller Script / Context
            </label>
            <textarea
              id="hacker-caller-pitch"
              rows={3}
              value={callDraft.content}
              onChange={(e) =>
                updateCallDraft({
                  content: e.target.value,
                  selectedPresetId: 'custom',
                })
              }
              placeholder="Describe what the simulated caller says during the call…"
              className="w-full resize-none rounded-2xl border border-white/15 bg-slate-900 p-3 text-xs leading-relaxed text-white placeholder:text-slate-500"
            />
          </div>

          {/* Suspicious Scenario Toggle */}
          <label className="flex min-h-[42px] items-center justify-between gap-2.5 rounded-xl border border-white/15 bg-slate-900/90 px-3 py-2 text-xs">
            <span className="min-w-0 flex-1 font-medium text-slate-200">
              Mark caller scenario as suspicious
            </span>
            <input
              type="checkbox"
              checked={callDraft.markedSuspicious}
              onChange={(e) =>
                updateCallDraft({ markedSuspicious: e.target.checked })
              }
              className="h-4 w-4 shrink-0 accent-rose-500"
            />
          </label>

          {/* Call ElderGuardian Button */}
          <button
            type="submit"
            disabled={isCallInProgress}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-45"
          >
            <PhoneCall className="h-4 w-4 shrink-0" />
            <span>
              {isCallInProgress ? 'Call Currently Active…' : 'Call ElderGuardian'}
            </span>
          </button>
        </form>

        {/* Outgoing Call Log */}
        <div className="border-t border-white/10 pt-3">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Recent Simulated Calls ({callHistory.length})
            </span>
            <span>Synchronized State</span>
          </div>

          {callHistory.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-slate-900/50 p-3 text-center text-xs text-slate-400">
              No simulated calls placed yet.
            </p>
          ) : (
            <div className="space-y-2">
              {callHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-2.5 rounded-2xl border border-white/10 bg-slate-900/80 p-3"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-2.5">
                    <PhoneOutgoing className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-bold text-white">
                        {item.callerName}
                      </div>
                      <div className="font-mono-tabular text-[0.68rem] text-slate-400">
                        {item.phoneNumber}
                      </div>
                      <div className="mt-1 text-[0.68rem] text-slate-300">
                        {item.status === 'declined'
                          ? 'Call Declined by ElderGuardian'
                          : item.status === 'missed'
                          ? 'No Answer'
                          : `Ended · Duration ${formatDurationMmSs(item.durationSeconds)}`}
                      </div>
                    </div>
                  </div>
                  <span className="tabular-nums shrink-0 text-[0.68rem] text-slate-400">
                    {formatEventTime(item.startedAtIso, 'en')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
