import React, { useState } from 'react';
import {
  ArrowLeft,
  BellOff,
  BellRing,
  Check,
  FastForward,
  Globe,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Type,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { getTranslation, LANGUAGE_OPTIONS } from '../../i18n/translations';
import { SpeechStatusSnapshot } from '../../services/speechService';
import { LanguageCode, UserPreferences, WallpaperId } from '../../types';

interface PhoneSettingsAppProps {
  preferences: UserPreferences;
  isPaused: boolean;
  speechSnapshot: SpeechStatusSnapshot;
  onChangeLanguage: (language: LanguageCode) => void;
  onTogglePause: () => void;
  onSendNextEvent: () => void;
  onRestartSimulation: () => void;
  onToggleVoice: () => void;
  onSetSpeechRate: (rate: number) => void;
  onTestVoice: () => void;
  onToggleRingtone: () => void;
  onToggleLargeText: () => void;
  onSetWallpaper: (wallpaper: WallpaperId) => void;
  onResetSetup: () => void;
  onBackToHome: () => void;
}

export const PhoneSettingsApp: React.FC<PhoneSettingsAppProps> = ({
  preferences,
  isPaused,
  speechSnapshot,
  onChangeLanguage,
  onTogglePause,
  onSendNextEvent,
  onRestartSimulation,
  onToggleVoice,
  onSetSpeechRate,
  onTestVoice,
  onToggleRingtone,
  onToggleLargeText,
  onSetWallpaper,
  onResetSetup,
  onBackToHome,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const t = getTranslation(preferences.language);

  const speedOptions = [
    { rate: 0.8, label: t.speedSlow },
    { rate: 0.9, label: t.speedCalm },
    { rate: 1.0, label: t.speedNormal },
  ];

  const wallpapers: { id: WallpaperId; label: string; swatch: string }[] = [
    {
      id: 'misty_dawn',
      label: t.wallpaperDawn,
      swatch: 'from-[#0B1F33] to-[#1D6A73]',
    },
    {
      id: 'deep_ocean',
      label: t.wallpaperOcean,
      swatch: 'from-[#061826] to-[#135D78]',
    },
    {
      id: 'warm_twilight',
      label: t.wallpaperTwilight,
      swatch: 'from-[#1D1836] to-[#7A3E58]',
    },
  ];

  const getVoiceSubstatus = (): string => {
    if (!preferences.voiceEnabled) return t.voiceMutedStatus;
    if (speechSnapshot.state === 'speaking') return t.voicePlayingStatus;
    if (speechSnapshot.state === 'voice_unavailable')
      return t.voiceUnavailableStatus;
    if (speechSnapshot.state === 'unsupported_browser')
      return t.voiceUnsupportedStatus;
    return t.voiceReadyStatus;
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-50 text-slate-900">
      {/* Top Bar */}
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3.5">
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onBackToHome}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <Settings className="h-5 w-5 shrink-0 text-slate-700" />
          <h1 className="truncate text-lg font-bold text-slate-900">{t.appSettings}</h1>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {/* 1. Language Selection Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-teal-700" />
            <h2 className="text-sm font-extrabold text-slate-900">
              {t.settingsLanguageSection}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = opt.code === preferences.language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => onChangeLanguage(opt.code)}
                  className={`flex min-h-[46px] items-center justify-between rounded-xl border px-3.5 py-2 text-left text-sm font-bold transition-colors ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 text-teal-950'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.nativeName}</span>
                  {isSelected && <Check className="h-4 w-4 text-teal-700" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Simulation Controls Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <h2 className="mb-1 text-sm font-extrabold text-slate-900">
            {t.settingsSimulationSection}
          </h2>
          <p className="mb-3 text-xs leading-relaxed text-slate-600">
            {t.settingsAutoSimDesc}
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onTogglePause}
              className={`flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors ${
                isPaused
                  ? 'bg-teal-700 text-white hover:bg-teal-800'
                  : 'border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4" />
                  <span>{t.resumeSimBtn}</span>
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  <span>{t.pauseSimBtn}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onSendNextEvent}
              className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-bold text-teal-900 hover:bg-teal-100"
            >
              <FastForward className="h-4 w-4" />
              <span>{t.sendNextEventBtn}</span>
            </button>

            <button
              type="button"
              onClick={onRestartSimulation}
              className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{t.restartSimBtn}</span>
            </button>
          </div>
        </section>

        {/* 3. Voice Narration & Call Ringtone Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <h2 className="mb-1.5 text-sm font-extrabold text-slate-900">
            {t.settingsVoiceSection}
          </h2>
          <p className="mb-3 text-xs leading-relaxed text-slate-600">
            {getVoiceSubstatus()}
          </p>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onToggleVoice}
                className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold ${
                  preferences.voiceEnabled
                    ? 'border-teal-600 bg-teal-50 text-teal-950'
                    : 'border-slate-300 bg-slate-100 text-slate-700'
                }`}
              >
                {preferences.voiceEnabled ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>{t.muteVoiceBtn}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span>{t.unmuteVoiceBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onTestVoice}
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                <Volume2 className="h-4 w-4 text-teal-700" />
                <span>{t.testVoiceBtn}</span>
              </button>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-bold text-slate-700">
                {t.speechSpeedLabel}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {speedOptions.map((opt) => {
                  const active = Math.abs(preferences.speechRate - opt.rate) < 0.03;
                  return (
                    <button
                      key={opt.rate}
                      type="button"
                      onClick={() => onSetSpeechRate(opt.rate)}
                      className={`min-h-[40px] rounded-xl border px-2 py-1.5 text-xs font-bold ${
                        active
                          ? 'border-teal-600 bg-teal-700 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleRingtone}
              className="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <span className="flex items-center gap-2">
                {preferences.ringtoneEnabled ? (
                  <BellRing className="h-4 w-4 text-teal-700" />
                ) : (
                  <BellOff className="h-4 w-4 text-slate-500" />
                )}
                <span>
                  {preferences.ringtoneEnabled
                    ? t.ringtoneOnLabel
                    : t.ringtoneMutedLabel}
                </span>
              </span>
              <span className="text-teal-700">
                {preferences.ringtoneEnabled ? t.stateOn : t.stateOff}
              </span>
            </button>
          </div>
        </section>

        {/* 4. Display & Wallpaper Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <h2 className="mb-3 text-sm font-extrabold text-slate-900">
            {t.settingsDisplaySection}
          </h2>

          <button
            type="button"
            onClick={onToggleLargeText}
            className="mb-3 flex min-h-[46px] w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
          >
            <span className="flex items-center gap-2">
              <Type className="h-4 w-4 text-teal-700" />
              <span>{t.largeTextToggleLabel}</span>
            </span>
            <span className="text-teal-700">
              {preferences.textSize === 'large' ? t.stateOn : t.stateOff}
            </span>
          </button>

          <div className="mb-1.5 text-xs font-bold text-slate-700">
            {t.wallpaperLabel}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {wallpapers.map((wp) => {
              const active = preferences.wallpaper === wp.id;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => onSetWallpaper(wp.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 ${
                    active
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span
                    className={`h-9 w-full rounded-lg bg-gradient-to-br ${wp.swatch}`}
                  />
                  <span className="line-clamp-1 text-[0.7rem] font-bold text-slate-800">
                    {wp.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 5. Reset Language Setup & Simulation Disclaimer */}
        <section className="space-y-3 pb-2">
          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="flex min-h-[46px] w-full items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-800 hover:bg-red-100"
            >
              {t.resetSetupBtn}
            </button>
          ) : (
            <div className="rounded-2xl border border-red-300 bg-red-50 p-4">
              <p className="mb-3 text-xs font-semibold leading-relaxed text-red-950">
                {t.confirmResetPrompt}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmingReset(false)}
                  className="min-h-[42px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmingReset(false);
                    onResetSetup();
                  }}
                  className="min-h-[42px] rounded-xl bg-red-700 px-3 py-2 text-xs font-bold text-white"
                >
                  {t.confirmYesBtn}
                </button>
              </div>
            </div>
          )}

          <p className="rounded-2xl border border-slate-200 bg-white p-3.5 text-center text-xs leading-relaxed text-slate-600">
            {t.demoDisclaimer}
          </p>
        </section>
      </div>
    </div>
  );
};
