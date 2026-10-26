import React, { useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { getTranslation, LANGUAGE_OPTIONS } from '../../i18n/translations';
import { LanguageCode } from '../../types';

interface InitialLanguageSetupProps {
  initialLanguage: LanguageCode;
  onStart: (selectedLanguage: LanguageCode) => void;
}

export const InitialLanguageSetup: React.FC<InitialLanguageSetupProps> = ({
  initialLanguage,
  onStart,
}) => {
  const [selected, setSelected] = useState<LanguageCode>(initialLanguage);
  const t = getTranslation(selected);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-slate-950 text-white">
      {/* Subtle calming top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-teal-900/50 via-slate-950/60 to-transparent"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-3.5 pt-3 pb-4 [@container(min-width:355px)]:px-4">
        {/* Shield emblem & translated header */}
        <div className="mb-4 flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500/20 ring-1 ring-teal-400/40">
            <ShieldCheck className="h-7 w-7 text-teal-300" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-snug tracking-tight text-white">
              {t.setupTitle}
            </h1>
            <p className="mt-0.5 text-sm leading-snug text-slate-300">
              {t.setupChooseLanguage}
            </p>
          </div>
        </div>

        <p className="mb-4 text-[0.95rem] leading-relaxed text-slate-200">
          {t.setupSubtitle}
        </p>

        {/* 7 Language Selection Cards */}
        <div
          role="radiogroup"
          aria-label={t.setupChooseLanguage}
          className="flex flex-col gap-2"
        >
          {LANGUAGE_OPTIONS.map((opt) => {
            const isActive = opt.code === selected;
            return (
              <button
                key={opt.code}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setSelected(opt.code)}
                className={`flex min-h-[50px] w-full items-center justify-between rounded-2xl border px-4 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'border-teal-400 bg-teal-500/20 text-white shadow-sm'
                    : 'border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]'
                }`}
              >
                <span className="text-[1.05rem] font-semibold leading-snug">
                  {opt.setupLabel}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isActive
                      ? 'border-teal-300 bg-teal-400 text-slate-950'
                      : 'border-slate-500 bg-transparent'
                  }`}
                >
                  {isActive && <Check className="h-4 w-4 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sticky / Bottom Action & Simulation Disclaimer */}
        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => onStart(selected)}
            className="flex min-h-[54px] w-full items-center justify-center rounded-2xl bg-teal-500 px-5 py-3 text-lg font-bold text-slate-950 shadow-lg shadow-teal-950/50 transition-colors hover:bg-teal-400 active:bg-teal-300"
          >
            {t.setupStartBtn}
          </button>

          <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-xs leading-relaxed text-slate-300">
            {t.demoDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
