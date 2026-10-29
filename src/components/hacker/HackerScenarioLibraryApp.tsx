import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import { HACKER_SCENARIO_LIBRARY } from '../../data/hackerScenarioLibrary';
import { HackerScenarioCategory } from '../../types';

const CATEGORY_TABS: { id: HackerScenarioCategory; label: string }[] = [
  { id: 'sms_scams', label: 'SMS Scams' },
  { id: 'suspicious_calls', label: 'Suspicious Calls' },
  { id: 'safe_messages', label: 'Safe Messages' },
  { id: 'safe_calls', label: 'Safe Calls' },
];

export const HackerScenarioLibraryApp: React.FC = () => {
  const { loadScenarioIntoHackerApp, navigateHackerHome } =
    useDualPhoneSimulation();
  const [activeCategory, setActiveCategory] =
    useState<HackerScenarioCategory>('sms_scams');

  const filteredScenarios = HACKER_SCENARIO_LIBRARY.filter(
    (s) => s.category === activeCategory
  );

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
          <BookOpen className="h-5 w-5 shrink-0 text-cyan-400" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white">
              Scenario Library
            </h1>
            <p className="truncate text-[0.68rem] text-slate-400">
              Select a scenario to populate Messages or Phone
            </p>
          </div>
        </div>
      </header>

      {/* 4 Category Filter Tabs */}
      <div className="grid shrink-0 grid-cols-2 gap-1 border-b border-white/10 bg-slate-900/70 p-2">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`min-h-[36px] rounded-xl px-2.5 py-1.5 text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-2xs'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Scenario Cards List */}
      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3.5 py-3.5 [@container(min-width:355px)]:px-4">
        {filteredScenarios.map((scenario) => {
          const isSafe = scenario.expectedRiskLabel === 'Safe / Ordinary';
          return (
            <div
              key={scenario.id}
              className="rounded-2xl border border-white/12 bg-slate-900/85 p-3.5"
            >
              {/* Clean Unboxed Metadata Kicker */}
              <div className="flex items-center gap-1.5 text-[0.68rem] font-semibold">
                <span className="inline-flex items-center gap-1 text-slate-300">
                  {scenario.channel === 'sms' ? (
                    <MessageSquare className="h-3 w-3 shrink-0 text-amber-400" />
                  ) : (
                    <Phone className="h-3 w-3 shrink-0 text-rose-400" />
                  )}
                  {scenario.channel === 'sms' ? 'SMS Scenario' : 'Call Scenario'}
                </span>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span
                  className={
                    isSafe ? 'text-emerald-300' : 'text-amber-300'
                  }
                >
                  Expected: {scenario.expectedRiskLabel}
                </span>
              </div>

              <h2 className="wrap-safe mt-1 text-sm font-bold text-white">
                {scenario.name}
              </h2>

              <div className="mt-1 text-[0.7rem] text-slate-400">
                Identity:{' '}
                <span className="font-semibold text-slate-200">
                  {scenario.senderName}
                </span>{' '}
                <span className="font-mono-tabular">
                  ({scenario.phoneNumber})
                </span>
              </div>

              <p className="url-wrap mt-2 rounded-xl bg-slate-950/80 p-2.5 text-xs leading-relaxed text-slate-200">
                {scenario.content}
              </p>

              <p className="wrap-safe mt-2 text-[0.7rem] leading-relaxed text-slate-400">
                {scenario.testingDescription}
              </p>

              <button
                type="button"
                onClick={() => loadScenarioIntoHackerApp(scenario)}
                className="mt-3 flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-cyan-500/20 px-3 py-2 text-xs font-bold text-cyan-200 ring-1 ring-cyan-400/40 transition-colors hover:bg-cyan-500/30"
              >
                <span>
                  {scenario.channel === 'sms'
                    ? 'Open in Messages to Send'
                    : 'Open in Phone to Call'}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
