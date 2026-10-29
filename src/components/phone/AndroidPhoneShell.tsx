import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Layers,
  MessageCircle,
  MessageSquare,
  Phone,
  Volume2,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { usePhoneSimulator } from '../../hooks/usePhoneSimulator';
import { getTranslation } from '../../i18n/translations';
import { PhoneScreenId, RiskLevel } from '../../types';
import { formatPhoneClockTime } from '../../utils/phoneFormatting';
import { FullScreenScamAlert } from './FullScreenScamAlert';
import { HomeScreen } from './HomeScreen';
import { IncomingCallOverlay } from './IncomingCallOverlay';
import { InitialLanguageSetup } from './InitialLanguageSetup';
import { LockScreen } from './LockScreen';
import { MessagesApp } from './MessagesApp';
import { NotificationShade } from './NotificationShade';
import { PhoneDialerApp } from './PhoneDialerApp';
import { PhoneSettingsApp } from './PhoneSettingsApp';
import {
  CameraApp,
  ContactsApp,
  ElderShieldCenterApp,
  GalleryApp,
} from './UtilityApps';
import { WhatsAppApp } from './WhatsAppApp';

type SimulatorState = ReturnType<typeof usePhoneSimulator>;

interface AndroidPhoneShellProps {
  sim: SimulatorState;
}

const LIGHT_STATUS_BAR_SCREENS: ReadonlySet<PhoneScreenId> = new Set([
  'messages',
  'phone',
  'contacts',
  'gallery',
  'eldershield',
  'settings',
]);

export const AndroidPhoneShell: React.FC<AndroidPhoneShellProps> = ({ sim }) => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const {
    preferences,
    processedEvents,
    currentScreen,
    recentApps,
    isRecentsOpen,
    setIsRecentsOpen,
    isShadeOpen,
    setIsShadeOpen,
    wifiEnabled,
    setWifiEnabled,
    focusedEventId,
    setFocusedEventId,
    isPaused,
    headsUpEvent,
    setHeadsUpEventId,
    activeAlertEvent,
    activeCallEvent,
    callStage,
    sharedCallElapsedSeconds,
    speechSnapshot,
    unreadCounts,
    userReplies,
    galleryPhotos,
  } = sim;

  const t = getTranslation(preferences.language);

  const getAppTitle = (screenId: PhoneScreenId): string => {
    switch (screenId) {
      case 'phone':
        return t.appPhone;
      case 'messages':
        return t.appMessages;
      case 'whatsapp':
        return t.appWhatsApp;
      case 'contacts':
        return t.appContacts;
      case 'camera':
        return t.appCamera;
      case 'gallery':
        return t.appGallery;
      case 'settings':
        return t.appSettings;
      case 'eldershield':
        return t.appElderShield;
      default:
        return t.navHome;
    }
  };

  const handleMarkEventRead = (eventId: string) => {
    sim.openApp(currentScreen, eventId);
  };

  // Adaptive iOS-style status bar theme so Dynamic Island & status icons stay legible on every screen
  const getStatusBarClasses = (): { barClass: string; isLightSurface: boolean } => {
    if (!preferences.setupCompleted) {
      return { barClass: 'bg-slate-950 text-white', isLightSurface: false };
    }
    if (activeAlertEvent) {
      return activeAlertEvent.classification.riskLevel === RiskLevel.HIGH_RISK
        ? { barClass: 'bg-[#7F1D1D] text-white', isLightSurface: false }
        : { barClass: 'bg-[#92400E] text-white', isLightSurface: false };
    }
    if (isShadeOpen || isRecentsOpen || (activeCallEvent && callStage)) {
      return { barClass: 'bg-slate-950 text-white', isLightSurface: false };
    }
    if (currentScreen === 'whatsapp') {
      return { barClass: 'bg-[#075E54] text-white', isLightSurface: false };
    }
    if (LIGHT_STATUS_BAR_SCREENS.has(currentScreen)) {
      return { barClass: 'bg-white text-slate-950', isLightSurface: true };
    }
    return { barClass: 'bg-slate-950 text-white', isLightSurface: false };
  };

  const { barClass, isLightSurface } = getStatusBarClasses();

  return (
    <div className="iphone16-shell">
      {/* Realistic iPhone 16 Satin Titanium Side Buttons (Desktop / Tablet Framed Mode) */}
      <div aria-hidden="true" className="iphone16-hardware-buttons pointer-events-none">
        {/* Left side: Action Button + Volume Up + Volume Down */}
        <div className="absolute top-[14%] -left-[3.5px] h-6 w-[2.5px] rounded-l bg-zinc-500/90" />
        <div className="absolute top-[21%] -left-[3.5px] h-11 w-[2.5px] rounded-l bg-zinc-500/90" />
        <div className="absolute top-[29%] -left-[3.5px] h-11 w-[2.5px] rounded-l bg-zinc-500/90" />
        {/* Right side: Side Power Button + Camera Control */}
        <div className="absolute top-[23%] -right-[3.5px] h-16 w-[2.5px] rounded-r bg-zinc-500/90" />
        <div className="absolute top-[60%] -right-[3px] h-10 w-[2px] rounded-r bg-zinc-600/80" />
      </div>

      {/* Inner Proportional iPhone 16 Screen */}
      <div className="iphone16-screen relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-slate-950">
        {/* Top Status Bar with Dynamic Island Cutout (Never overlapped by screen content) */}
        <div
          role={preferences.setupCompleted ? 'button' : undefined}
          tabIndex={preferences.setupCompleted ? 0 : -1}
          onClick={() => {
            if (preferences.setupCompleted && !activeAlertEvent) {
              setIsShadeOpen((prev) => !prev);
            }
          }}
          onKeyDown={(e) => {
            if (
              preferences.setupCompleted &&
              !activeAlertEvent &&
              (e.key === 'Enter' || e.key === ' ')
            ) {
              e.preventDefault();
              setIsShadeOpen((prev) => !prev);
            }
          }}
          className={`relative z-30 grid h-[46px] shrink-0 grid-cols-[1fr_auto_1fr] items-center px-4 transition-colors duration-200 select-none [@container(min-width:350px)]:px-5 ${barClass}`}
        >
          {/* Left of Dynamic Island: Time */}
          <div className="flex min-w-0 items-center justify-start pl-0.5">
            <span className="tabular-nums truncate text-[13px] font-bold tracking-tight">
              {formatPhoneClockTime(now, preferences.language)}
            </span>
          </div>

          {/* Center: Realistic iPhone 16 Dynamic Island */}
          <div
            aria-hidden="true"
            className="flex h-[27px] w-[92px] items-center justify-between rounded-full bg-black px-2.5 shadow-xs ring-1 ring-white/10 [@container(min-width:350px)]:w-[106px]"
          >
            {/* Subtle real activity indicator inside Dynamic Island during active call or voice speech */}
            <div className="flex items-center gap-1">
              {speechSnapshot.state === 'speaking' ? (
                <Volume2 className="h-3 w-3 text-teal-400" />
              ) : callStage === 'connected' ? (
                <Phone className="h-3 w-3 text-emerald-400" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-[#111116]" />
              )}
            </div>

            {/* Front TrueDepth Camera Lens */}
            <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0d1629] ring-1 ring-indigo-400/25">
              <span className="h-1 w-1 rounded-full bg-sky-300/35" />
            </div>
          </div>

          {/* Right of Dynamic Island: Cellular Signal, Wi-Fi, Battery */}
          <div className="flex items-center justify-end gap-1.5 pr-0.5">
            {/* 4-Bar Cellular Signal */}
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

            {/* Wi-Fi */}
            {wifiEnabled ? (
              <Wifi className="h-3.5 w-3.5 stroke-[2.4]" aria-hidden="true" />
            ) : (
              <WifiOff
                className="h-3.5 w-3.5 opacity-45"
                aria-hidden="true"
              />
            )}

            {/* iOS Battery Capsule */}
            <div
              aria-hidden="true"
              className="flex items-center gap-[1.5px]"
            >
              <div
                className={`flex h-[11px] w-[21px] items-center rounded-[3.5px] border p-[1.5px] ${
                  isLightSurface ? 'border-slate-900/45' : 'border-white/50'
                }`}
              >
                <div
                  className={`h-full w-[86%] rounded-[1.5px] ${
                    isLightSurface ? 'bg-slate-900' : 'bg-white'
                  }`}
                />
              </div>
              <div
                className={`h-[4px] w-[1.5px] rounded-r-xs ${
                  isLightSurface ? 'bg-slate-900/45' : 'bg-white/50'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bounded Interactive Phone Screen Area (All apps & alerts fit cleanly inside) */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {!preferences.setupCompleted ? (
            <InitialLanguageSetup
              initialLanguage={preferences.language}
              onStart={sim.completeSetup}
              onSelectLanguageChange={sim.setPendingSetupLanguage}
            />
          ) : (
            <>
              {/* Active Screen Router */}
              <div
                key={currentScreen}
                className="flex h-full min-h-0 w-full flex-col overflow-hidden animate-fadeIn"
              >
                {currentScreen === 'lock' && (
                  <LockScreen
                    now={now}
                    language={preferences.language}
                    wallpaper={preferences.wallpaper}
                    events={processedEvents}
                    onUnlock={sim.unlockPhone}
                    onOpenApp={sim.openApp}
                  />
                )}

                {currentScreen === 'home' && (
                  <HomeScreen
                    now={now}
                    language={preferences.language}
                    wallpaper={preferences.wallpaper}
                    isPaused={isPaused}
                    unreadCounts={unreadCounts}
                    onOpenApp={(screen) => sim.openApp(screen)}
                  />
                )}

                {currentScreen === 'messages' && (
                  <MessagesApp
                    language={preferences.language}
                    events={processedEvents}
                    focusedEventId={focusedEventId}
                    userReplies={userReplies}
                    onSelectEvent={setFocusedEventId}
                    onMarkRead={handleMarkEventRead}
                    onSendQuickReply={sim.sendQuickReply}
                    onReopenScamAlert={sim.reopenScamAlertForEvent}
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'whatsapp' && (
                  <WhatsAppApp
                    language={preferences.language}
                    events={processedEvents}
                    focusedEventId={focusedEventId}
                    userReplies={userReplies}
                    onSelectEvent={setFocusedEventId}
                    onMarkRead={handleMarkEventRead}
                    onSendQuickReply={sim.sendQuickReply}
                    onReopenScamAlert={sim.reopenScamAlertForEvent}
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'phone' && (
                  <PhoneDialerApp
                    language={preferences.language}
                    events={processedEvents}
                    focusedEventId={focusedEventId}
                    onSelectEvent={setFocusedEventId}
                    onReopenScamAlert={sim.reopenScamAlertForEvent}
                    onStartOutboundCall={sim.startSimulatedOutboundCall}
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'contacts' && (
                  <ContactsApp
                    language={preferences.language}
                    onStartOutboundCall={sim.startSimulatedOutboundCall}
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'camera' && (
                  <CameraApp
                    language={preferences.language}
                    onCaptureSnapshot={sim.captureCameraSnapshot}
                    onOpenGallery={() => sim.openApp('gallery')}
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'gallery' && (
                  <GalleryApp
                    language={preferences.language}
                    photos={galleryPhotos}
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'eldershield' && (
                  <ElderShieldCenterApp
                    language={preferences.language}
                    events={processedEvents}
                    onReopenScamAlert={sim.reopenScamAlertForEvent}
                    onOpenChannelApp={(screen, evtId) =>
                      sim.openApp(screen, evtId)
                    }
                    onBackToHome={sim.navigateHome}
                  />
                )}

                {currentScreen === 'settings' && (
                  <PhoneSettingsApp
                    preferences={preferences}
                    isPaused={isPaused}
                    speechSnapshot={speechSnapshot}
                    onChangeLanguage={sim.changeLanguage}
                    onTogglePause={sim.togglePauseSimulation}
                    onSendNextEvent={sim.triggerNextEventNow}
                    onRestartSimulation={sim.restartSimulation}
                    onToggleVoice={sim.toggleVoice}
                    onSetSpeechRate={sim.setSpeechRate}
                    onTestVoice={sim.testVoiceSample}
                    onToggleRingtone={sim.toggleRingtone}
                    onToggleLargeText={sim.toggleLargeText}
                    onSetWallpaper={sim.setWallpaper}
                    onResetSetup={sim.resetSetup}
                    onBackToHome={sim.navigateHome}
                  />
                )}
              </div>

              {/* Incoming Notification Banner */}
              {headsUpEvent && !activeAlertEvent && !isShadeOpen && (
                <div className="absolute inset-x-3 top-2 z-30">
                  <div className="flex items-start gap-2.5 rounded-2xl border border-white/20 bg-slate-900/95 p-3 text-white shadow-2xl backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => {
                        const target: PhoneScreenId =
                          headsUpEvent.channel === 'whatsapp'
                            ? 'whatsapp'
                            : 'messages';
                        setHeadsUpEventId(null);
                        sim.openApp(target, headsUpEvent.instanceId);
                      }}
                      className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
                    >
                      <span
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          headsUpEvent.channel === 'whatsapp'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {headsUpEvent.channel === 'whatsapp' ? (
                          <MessageCircle className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2 text-xs text-slate-300">
                          <span className="truncate font-bold text-white">
                            {headsUpEvent.senderName}
                          </span>
                          <span className="shrink-0 text-[0.68rem]">
                            {t.nowTimestamp}
                          </span>
                        </span>
                        <span className="url-wrap mt-0.5 line-clamp-2 block text-xs leading-snug text-slate-200">
                          {headsUpEvent.content}
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      aria-label={t.btnDismissAlert}
                      onClick={() => setHeadsUpEventId(null)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Pull-down Notification & Quick Settings Center */}
              {isShadeOpen && (
                <NotificationShade
                  now={now}
                  language={preferences.language}
                  wifiEnabled={wifiEnabled}
                  isPaused={isPaused}
                  voiceEnabled={preferences.voiceEnabled}
                  ringtoneEnabled={preferences.ringtoneEnabled}
                  isLargeText={preferences.textSize === 'large'}
                  events={processedEvents}
                  onClose={() => setIsShadeOpen(false)}
                  onToggleWifi={() => setWifiEnabled((v) => !v)}
                  onTogglePause={sim.togglePauseSimulation}
                  onToggleVoice={sim.toggleVoice}
                  onToggleRingtone={sim.toggleRingtone}
                  onToggleLargeText={sim.toggleLargeText}
                  onLockPhone={sim.toggleLockScreen}
                  onClearNotifications={sim.clearNotifications}
                  onOpenEvent={(screen, eventId) => sim.openApp(screen, eventId)}
                />
              )}

              {/* Recent Apps Switcher Overlay */}
              {isRecentsOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label={t.navRecents}
                  onClick={() => setIsRecentsOpen(false)}
                  className="absolute inset-0 z-30 flex flex-col justify-between bg-slate-950/88 p-5 text-white backdrop-blur-lg"
                >
                  <div className="text-sm font-bold text-slate-200">
                    {t.navRecents}
                  </div>

                  {recentApps.length === 0 ? (
                    <div className="my-auto text-center text-sm text-slate-300">
                      {t.recentsEmpty}
                    </div>
                  ) : (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="my-auto min-h-0 space-y-2.5 overflow-y-auto py-2"
                    >
                      {recentApps.map((appId) => (
                        <button
                          key={appId}
                          type="button"
                          onClick={() => sim.openApp(appId)}
                          className="flex min-h-[52px] w-full items-center justify-between rounded-2xl border border-white/15 bg-slate-900/95 px-4 py-3 text-left font-bold text-white shadow-lg hover:bg-slate-800"
                        >
                          <span className="truncate">{getAppTitle(appId)}</span>
                          <ChevronLeft className="h-4 w-4 shrink-0 rotate-180 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsRecentsOpen(false);
                      sim.navigateHome();
                    }}
                    className="min-h-[44px] w-full shrink-0 rounded-2xl bg-white/15 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/25"
                  >
                    {t.closeAllAppsBtn}
                  </button>
                </div>
              )}

              {/* Simulated Incoming / Active Phone Call Screen */}
              {activeCallEvent && callStage && (
                <IncomingCallOverlay
                  event={activeCallEvent}
                  callStage={callStage}
                  language={preferences.language}
                  ringtoneEnabled={preferences.ringtoneEnabled}
                  sharedElapsedSeconds={sharedCallElapsedSeconds}
                  onAnswer={sim.answerActiveCall}
                  onDeclineOrEnd={sim.endOrDeclineActiveCall}
                  onToggleRingtone={sim.toggleRingtone}
                  onReopenScamAlert={sim.reopenScamAlertForEvent}
                />
              )}

              {/* Full-Screen ElderShield Scam Alert Overlay */}
              {activeAlertEvent && (
                <FullScreenScamAlert
                  event={activeAlertEvent}
                  language={preferences.language}
                  voiceEnabled={preferences.voiceEnabled}
                  speechSnapshot={speechSnapshot}
                  onUnderstand={sim.dismissActiveAlert}
                  onViewDetails={sim.viewAlertDetails}
                  onDismiss={sim.dismissActiveAlert}
                  onReplayVoice={sim.replayActiveAlertVoice}
                  onToggleVoice={sim.toggleVoice}
                  onEnableVoiceAndNarrate={sim.enableVoiceAndNarrate}
                />
              )}
            </>
          )}
        </div>

        {/* Bottom Navigation & iPhone Home Indicator Area (Never overlapped by screen content) */}
        {preferences.setupCompleted ? (
          <nav
            aria-label={`${t.navBack} • ${t.navHome} • ${t.navRecents}`}
            className="relative z-30 grid h-[44px] shrink-0 grid-cols-[44px_1fr_44px] items-center border-t border-white/10 bg-slate-950 px-4 text-slate-300"
          >
            <button
              type="button"
              aria-label={t.navBack}
              onClick={() => {
                if (activeAlertEvent) {
                  sim.dismissActiveAlert();
                } else {
                  sim.navigateBack();
                }
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Center iPhone Home Indicator Bar (Tapping returns Home) */}
            <button
              type="button"
              aria-label={t.navHome}
              onClick={() => {
                if (activeAlertEvent) {
                  sim.dismissActiveAlert();
                }
                sim.navigateHome();
              }}
              className="group flex h-10 w-full items-center justify-center"
            >
              <span className="h-[5px] w-28 rounded-full bg-white/75 transition-all group-hover:w-32 group-hover:bg-white" />
            </button>

            <button
              type="button"
              aria-label={t.navRecents}
              onClick={() => {
                if (!activeAlertEvent && currentScreen !== 'lock') {
                  setIsShadeOpen(false);
                  setIsRecentsOpen((prev) => !prev);
                }
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10 hover:text-white"
            >
              <Layers className="h-4 w-4" />
            </button>
          </nav>
        ) : (
          <div className="flex h-5 shrink-0 items-center justify-center bg-slate-950">
            <span className="h-[4px] w-28 rounded-full bg-white/45" />
          </div>
        )}
      </div>
    </div>
  );
};
