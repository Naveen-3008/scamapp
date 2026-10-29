/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HackerPhoneShell } from './components/hacker/HackerPhoneShell';
import { AndroidPhoneShell } from './components/phone/AndroidPhoneShell';
import {
  DualPhoneSimulationProvider,
  useDualPhoneSimulation,
} from './context/DualPhoneSimulationContext';
import { LANGUAGE_OPTIONS } from './i18n/translations';

const DualPhoneStage: React.FC = () => {
  const { receiverSim } = useDualPhoneSimulation();
  const activeLanguage =
    LANGUAGE_OPTIONS.find(
      (opt) => opt.code === receiverSim.preferences.language
    ) ?? LANGUAGE_OPTIONS[0];

  const scrollToPhone = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main className="dual-phone-stage relative flex w-full flex-col items-center justify-center bg-[#0B111E] px-3.5 py-5 min-[900px]:flex-row min-[900px]:gap-10 min-[900px]:px-6 min-[900px]:py-3.5 xl:gap-14">
      {/* Subtle ambient studio lighting behind the two portrait phones */}
      <div aria-hidden="true" className="pointer-events-none hidden sm:block">
        <div className="absolute -top-36 left-1/4 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-teal-600/12 blur-3xl" />
        <div className="absolute -bottom-36 right-1/4 h-[460px] w-[460px] translate-x-1/2 rounded-full bg-amber-600/10 blur-3xl" />
      </div>

      {/* Left Phone — ElderGuardian — Receiver */}
      <section
        id="elderguardian-phone"
        aria-label="ElderGuardian — Receiver"
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <div className="flex w-full items-baseline justify-between gap-2 px-1.5">
          <div className="flex min-w-0 items-baseline gap-2">
            <h1 className="truncate text-[13px] font-semibold tracking-tight text-slate-100">
              ElderGuardian — Receiver
            </h1>
            <span className="truncate text-[11px] font-medium text-teal-400/90">
              {activeLanguage.nativeName}
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollToPhone('hacker-phone')}
            className="shrink-0 text-[11px] font-semibold text-slate-400 transition-colors hover:text-white min-[900px]:hidden"
          >
            Simulator ↓
          </button>
        </div>

        <AndroidPhoneShell sim={receiverSim} />
      </section>

      {/* Mobile vertical spacing between stacked phones */}
      <div aria-hidden="true" className="h-7 shrink-0 min-[900px]:hidden" />

      {/* Right Phone — Hacker Phone — Simulator */}
      <section
        id="hacker-phone"
        aria-label="Hacker Phone — Simulator"
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <div className="flex w-full items-baseline justify-between gap-2 px-1.5">
          <div className="flex min-w-0 items-baseline gap-2">
            <h2 className="truncate text-[13px] font-semibold tracking-tight text-slate-100">
              Hacker Phone — Simulator
            </h2>
            <span className="truncate text-[11px] font-medium text-amber-400/85">
              Test Controller
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollToPhone('elderguardian-phone')}
            className="shrink-0 text-[11px] font-semibold text-slate-400 transition-colors hover:text-white min-[900px]:hidden"
          >
            Receiver ↑
          </button>
        </div>

        <HackerPhoneShell />
      </section>
    </main>
  );
};

export default function App() {
  return (
    <DualPhoneSimulationProvider>
      <DualPhoneStage />
    </DualPhoneSimulationProvider>
  );
}
