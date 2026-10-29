import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, PhoneOutgoing, Wifi } from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import { formatPhoneClockTime } from '../../utils/phoneFormatting';
import { HackerActiveCallOverlay } from './HackerActiveCallOverlay';
import { HackerContactsApp } from './HackerContactsApp';
import { HackerHomeScreen } from './HackerHomeScreen';
import { HackerMessagesApp } from './HackerMessagesApp';
import { HackerPhoneApp } from './HackerPhoneApp';
import { HackerScenarioLibraryApp } from './HackerScenarioLibraryApp';

export const HackerPhoneShell: React.FC = () => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const {
    hackerScreen,
    openHackerScreen,
    navigateHackerBack,
    navigateHackerHome,
    sharedCallSession,
    endCallFromHacker,
    dismissTerminalCallBanner,
  } = useDualPhoneSimulation();

  return (
    <div className="iphone16-shell">
      {/* Realistic iPhone 16 Side Hardware Buttons */}
      <div
        aria-hidden="true"
        className="iphone16-hardware-buttons pointer-events-none"
      >
        <div className="absolute top-[14%] -left-[3.5px] h-6 w-[2.5px] rounded-l bg-zinc-500/90" />
        <div className="absolute top-[21%] -left-[3.5px] h-11 w-[2.5px] rounded-l bg-zinc-500/90" />
        <div className="absolute top-[29%] -left-[3.5px] h-11 w-[2.5px] rounded-l bg-zinc-500/90" />
        <div className="absolute top-[23%] -right-[3.5px] h-16 w-[2.5px] rounded-r bg-zinc-500/90" />
        <div className="absolute top-[60%] -right-[3px] h-10 w-[2px] rounded-r bg-zinc-600/80" />
      </div>

      {/* Inner Proportional iPhone 16 Screen */}
      <div className="iphone16-screen relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-slate-950">
        {/* Top Status Bar with Dynamic Island */}
        <div className="relative z-30 grid h-[46px] shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-slate-950 px-4 text-white select-none [@container(min-width:350px)]:px-5">
          {/* Left: Clock */}
          <div className="flex min-w-0 items-center justify-start pl-0.5">
            <span className="tabular-nums truncate text-[13px] font-bold tracking-tight">
              {formatPhoneClockTime(now, 'en')}
            </span>
          </div>

          {/* Center: Dynamic Island */}
          <div
            aria-hidden="true"
            className="flex h-[27px] w-[92px] items-center justify-between rounded-full bg-black px-2.5 shadow-xs ring-1 ring-white/10 [@container(min-width:350px)]:w-[106px]"
          >
            <div className="flex items-center gap-1">
              {sharedCallSession &&
              (sharedCallSession.status === 'ringing' ||
                sharedCallSession.status === 'connected') ? (
                <PhoneOutgoing className="h-3 w-3 text-amber-400" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-[#111116]" />
              )}
            </div>
            <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0d1629] ring-1 ring-indigo-400/25">
              <span className="h-1 w-1 rounded-full bg-sky-300/35" />
            </div>
          </div>

          {/* Right: Signal, Wi-Fi, Battery */}
          <div className="flex items-center justify-end gap-1.5 pr-0.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 16 12"
              className="h-3 w-3.5 fill-current"
            >
              <rect x="1" y="8" width="2.2" height="3.5" rx="0.7" />
              <rect x="4.6" y="6" width="2.2" height="5.5" rx="0.7" />
              <rect x="8.2" y="3.5" width="2.2" height="8" rx="0.7" />
              <rect x="11.8" y="1" width="2.2" height="10.5" rx="0.7" />
            </svg>
            <Wifi className="h-3.5 w-3.5 stroke-[2.4]" aria-hidden="true" />
            <div aria-hidden="true" className="flex items-center gap-[1.5px]">
              <div className="flex h-[11px] w-[21px] items-center rounded-[3.5px] border border-white/50 p-[1.5px]">
                <div className="h-full w-[92%] rounded-[1.5px] bg-amber-400" />
              </div>
              <div className="h-[4px] w-[1.5px] rounded-r-xs bg-white/50" />
            </div>
          </div>
        </div>

        {/* Bounded Interactive Hacker Phone Screen Router */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            key={hackerScreen}
            className="flex h-full min-h-0 w-full flex-col overflow-hidden animate-fadeIn"
          >
            {hackerScreen === 'home' && <HackerHomeScreen now={now} />}
            {hackerScreen === 'messages' && <HackerMessagesApp />}
            {hackerScreen === 'phone' && <HackerPhoneApp />}
            {hackerScreen === 'contacts' && <HackerContactsApp />}
            {hackerScreen === 'scenarios' && <HackerScenarioLibraryApp />}
          </div>

          {/* Outgoing / Active / Declined Call Screen Overlay */}
          {sharedCallSession && (
            <HackerActiveCallOverlay
              session={sharedCallSession}
              onEndCall={endCallFromHacker}
              onDismissTerminal={dismissTerminalCallBanner}
            />
          )}
        </div>

        {/* Fixed Bottom Navigation & Home Indicator Bar */}
        <nav
          aria-label="Hacker Phone Navigation"
          className="relative z-30 grid h-[44px] shrink-0 grid-cols-[44px_1fr_44px] items-center border-t border-white/10 bg-slate-950 px-4 text-slate-300"
        >
          <button
            type="button"
            aria-label="Back"
            onClick={() => {
              if (
                sharedCallSession &&
                sharedCallSession.status !== 'ringing' &&
                sharedCallSession.status !== 'connected'
              ) {
                dismissTerminalCallBanner();
              } else {
                navigateHackerBack();
              }
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Hacker Phone Home"
            onClick={() => {
              if (
                sharedCallSession &&
                sharedCallSession.status !== 'ringing' &&
                sharedCallSession.status !== 'connected'
              ) {
                dismissTerminalCallBanner();
              }
              navigateHackerHome();
            }}
            className="group flex h-10 w-full items-center justify-center"
          >
            <span className="h-[5px] w-28 rounded-full bg-white/75 transition-all group-hover:w-32 group-hover:bg-white" />
          </button>

          <button
            type="button"
            aria-label="Open Scenario Library"
            onClick={() => openHackerScreen('scenarios')}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10 hover:text-white"
          >
            <BookOpen className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};
