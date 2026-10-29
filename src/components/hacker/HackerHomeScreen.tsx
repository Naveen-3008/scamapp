import React, { useMemo } from 'react';
import {
  BookOpen,
  FlaskConical,
  MessageCircle,
  MessageSquare,
  PenSquare,
  Phone,
  PhoneCall,
  PhoneOutgoing,
  RotateCcw,
  Send,
  Users,
} from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import { HackerScreenId } from '../../types';
import {
  formatEventTime,
  formatPhoneClockTime,
  formatPhoneLockDate,
} from '../../utils/phoneFormatting';

interface HackerHomeScreenProps {
  now: Date;
}

interface LauncherApp {
  id: HackerScreenId;
  label: string;
  icon: React.ReactNode;
  bgClass: string;
  badgeCount?: number;
}

export const HackerHomeScreen: React.FC<HackerHomeScreenProps> = ({ now }) => {
  const {
    receiverSim,
    openHackerScreen,
    sentMessages,
    callHistory,
    eventBusLog,
    isCallInProgress,
    triggerPresetScamSmsQuick,
    triggerPresetWhatsAppScamQuick,
    openCustomSmsQuick,
    triggerSuspiciousCallQuick,
    triggerOrdinaryCallQuick,
    resetCurrentScenario,
  } = useDualPhoneSimulation();

  const whatsAppMessageCount = useMemo(
    () =>
      receiverSim.processedEvents.filter((e) => e.channel === 'whatsapp').length,
    [receiverSim.processedEvents]
  );

  const gridApps: LauncherApp[] = [
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-amber-500 to-orange-700',
      badgeCount: sentMessages.length > 0 ? sentMessages.length : undefined,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-emerald-500 to-green-700',
      badgeCount: whatsAppMessageCount > 0 ? whatsAppMessageCount : undefined,
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: <Phone className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-rose-500 to-red-700',
      badgeCount: callHistory.length > 0 ? callHistory.length : undefined,
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: <Users className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-indigo-500 to-slate-800',
    },
    {
      id: 'scenarios',
      label: 'Scenario Library',
      icon: <BookOpen className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-cyan-600 to-blue-800',
    },
  ];

  const dockApps: LauncherApp[] = [
    gridApps[2], // Phone
    gridApps[0], // Messages
    gridApps[1], // WhatsApp
    gridApps[4], // Scenario Library
  ];

  const latestBusEvent = eventBusLog[0] || null;

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-gradient-to-b from-[#131826] via-[#0F172A] to-[#090D16] text-white select-none">
      {/* Subtle ambient background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-amber-500/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl"
      />

      {/* Single Scrollable Home Container with 14px–16px Horizontal Padding */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between gap-3.5 overflow-y-auto overflow-x-hidden px-3.5 pt-3 pb-3 [@container(min-width:355px)]:px-4">
        {/* Top Section: Clock/Date + Sandbox Header + 4-Column App Grid */}
        <div className="flex w-full min-w-0 flex-col gap-3">
          {/* Top-Left Clock & Date */}
          <div className="flex w-full min-w-0 flex-col items-start text-left">
            <div className="font-mono-tabular text-[2rem] leading-none font-semibold tracking-tight text-white [@container(min-width:355px)]:text-[2.25rem]">
              {formatPhoneClockTime(now, 'en')}
            </div>
            <div className="mt-1 w-full truncate text-xs font-medium text-slate-300 [@container(min-width:355px)]:text-sm">
              {formatPhoneLockDate(now, 'en')}
            </div>
          </div>

          {/* Simulator Sandbox Card */}
          <button
            type="button"
            onClick={() => openHackerScreen('scenarios')}
            className="flex w-full min-w-0 items-center justify-between gap-2.5 rounded-2xl border border-amber-400/25 bg-slate-900/80 px-3 py-2.5 text-left shadow-md backdrop-blur-md transition-colors hover:bg-slate-900"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/35">
                <FlaskConical className="h-5 w-5 shrink-0" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.82rem] font-bold leading-snug text-white [@container(min-width:355px)]:text-sm">
                  Security Testing Simulator
                </div>
                <div className="line-clamp-1 text-[0.7rem] leading-snug text-slate-300 [@container(min-width:355px)]:text-xs">
                  Sends simulated SMS, WhatsApp & calls to ElderGuardian
                </div>
              </div>
            </div>
          </button>

          {/* Uniform 4-Column App Launcher Grid */}
          <div className="home-icon-grid gap-x-1.5 gap-y-2.5 pt-0.5 [@container(min-width:355px)]:gap-x-2">
            {gridApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => openHackerScreen(app.id)}
                className="group flex min-w-0 flex-col items-center justify-start pt-1 text-center"
              >
                <div className="relative inline-flex shrink-0">
                  <div
                    className={`home-app-icon flex items-center justify-center shadow-md ring-1 ring-white/20 transition-transform group-hover:scale-105 group-active:scale-95 ${app.bgClass}`}
                  >
                    {app.icon}
                  </div>
                  {app.badgeCount !== undefined && app.badgeCount > 0 && (
                    <span className="tabular-nums pointer-events-none absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] leading-none font-bold text-slate-950 shadow-xs ring-2 ring-slate-950">
                      {app.badgeCount > 9 ? '9+' : app.badgeCount}
                    </span>
                  )}
                </div>
                <span className="home-app-label mt-1.5 w-full text-center font-medium text-white drop-shadow-xs">
                  {app.label}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Testing Controls Section */}
          <section
            aria-label="Quick Testing Controls"
            className="w-full min-w-0 rounded-2xl border border-white/15 bg-slate-900/75 p-3 backdrop-blur-md"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-xs font-bold text-slate-100">
                Quick Testing Controls
              </h2>
              <span className="text-[0.68rem] text-slate-400">
                Live Dual-Phone Link
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={triggerPresetScamSmsQuick}
                  className="flex min-h-[40px] min-w-0 items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-2.5 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-400 active:bg-amber-300"
                >
                  <Send className="h-3.5 w-3.5 shrink-0" />
                  <span className="wrap-safe text-center leading-tight">
                    Send Preset Scam SMS
                  </span>
                </button>

                <button
                  type="button"
                  onClick={openCustomSmsQuick}
                  className="flex min-h-[40px] min-w-0 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <PenSquare className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                  <span className="wrap-safe text-center leading-tight">
                    Send Custom SMS
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={triggerPresetWhatsAppScamQuick}
                className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Send Preset WhatsApp Scam</span>
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  disabled={isCallInProgress}
                  onClick={triggerSuspiciousCallQuick}
                  className="flex min-h-[40px] min-w-0 items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-rose-500 disabled:opacity-45"
                >
                  <PhoneOutgoing className="h-3.5 w-3.5 shrink-0" />
                  <span className="wrap-safe text-center leading-tight">
                    Initiate Suspicious Call
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isCallInProgress}
                  onClick={triggerOrdinaryCallQuick}
                  className="flex min-h-[40px] min-w-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500 disabled:opacity-45"
                >
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" />
                  <span className="wrap-safe text-center leading-tight">
                    Initiate Ordinary Call
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={resetCurrentScenario}
                className="flex min-h-[36px] w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
              >
                <RotateCcw className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                <span>Reset Current Scenario</span>
              </button>
            </div>

            {latestBusEvent && (
              <div className="mt-2 border-t border-white/10 pt-2 text-[0.68rem] leading-snug text-slate-300">
                <div className="flex items-center justify-between gap-2 text-slate-400">
                  <span className="font-mono-tabular truncate font-semibold text-amber-300">
                    {latestBusEvent.type}
                  </span>
                  <span className="tabular-nums shrink-0">
                    {formatEventTime(latestBusEvent.timestampIso, 'en')}
                  </span>
                </div>
                <p className="wrap-safe mt-0.5 line-clamp-1 text-slate-200">
                  {latestBusEvent.summary}
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Bottom Sandbox Disclaimer + Uniform 4-Icon App Dock */}
        <div className="flex w-full min-w-0 flex-col gap-2">
          <p className="wrap-safe w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-1.5 text-center text-[0.66rem] leading-snug text-slate-300">
            Local web simulation only. Never sends real SMS, WhatsApp, or calls.
          </p>

          <div className="home-icon-grid gap-x-1.5 rounded-[1.5rem] border border-white/15 bg-slate-950/65 px-2.5 pt-2.5 pb-2 shadow-xl backdrop-blur-md">
            {dockApps.map((app) => (
              <button
                key={`hacker-dock-${app.id}`}
                type="button"
                aria-label={app.label}
                onClick={() => openHackerScreen(app.id)}
                className="group flex min-w-0 flex-col items-center justify-center pt-1"
              >
                <div className="relative inline-flex shrink-0">
                  <div
                    className={`home-app-icon flex items-center justify-center shadow-md ring-1 ring-white/20 transition-transform group-hover:scale-105 group-active:scale-95 ${app.bgClass}`}
                  >
                    {app.icon}
                  </div>
                  {app.badgeCount !== undefined && app.badgeCount > 0 && (
                    <span className="tabular-nums pointer-events-none absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] leading-none font-bold text-slate-950 shadow-xs ring-2 ring-slate-950">
                      {app.badgeCount > 9 ? '9+' : app.badgeCount}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
