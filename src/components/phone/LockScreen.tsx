import React from 'react';
import {
  Camera,
  LockOpen,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import {
  LanguageCode,
  PhoneScreenId,
  ProcessedPhoneEvent,
  RiskLevel,
  WallpaperId,
} from '../../types';
import {
  formatEventTime,
  formatPhoneClockTime,
  formatPhoneLockDate,
} from '../../utils/phoneFormatting';
import { WallpaperBackground } from './WallpaperBackground';

interface LockScreenProps {
  now: Date;
  language: LanguageCode;
  wallpaper: WallpaperId;
  events: ProcessedPhoneEvent[];
  onUnlock: () => void;
  onOpenApp: (screen: PhoneScreenId, eventId?: string | null) => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  now,
  language,
  wallpaper,
  events,
  onUnlock,
  onOpenApp,
}) => {
  const t = getTranslation(language);
  const recentEvents = [...events].reverse().slice(0, 4);

  const handleOpenNotification = (evt: ProcessedPhoneEvent) => {
    onUnlock();
    if (evt.channel === 'whatsapp') {
      onOpenApp('whatsapp', evt.instanceId);
    } else if (evt.channel === 'call') {
      onOpenApp('phone', evt.instanceId);
    } else {
      onOpenApp('messages', evt.instanceId);
    }
  };

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col text-white select-none">
      <WallpaperBackground wallpaper={wallpaper} dimmed />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-3.5 pt-4 pb-4 [@container(min-width:355px)]:px-4">
        {/* Lock Screen Large Clock & Localized Date */}
        <div className="flex flex-col items-center text-center">
          <div className="font-mono-tabular text-[3.1rem] font-semibold leading-none tracking-tight text-white drop-shadow [@container(min-width:345px)]:text-[3.75rem]">
            {formatPhoneClockTime(now, language)}
          </div>
          <div className="mt-2 text-base font-medium text-slate-100">
            {formatPhoneLockDate(now, language)}
          </div>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-teal-300/30 bg-slate-900/55 px-3 py-1 text-xs font-semibold text-teal-200 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
            <span>{t.lockScreenStatus}</span>
          </div>
        </div>

        {/* Notification Preview Cards */}
        <div className="mt-6 flex flex-1 flex-col gap-2.5">
          {recentEvents.length === 0 ? (
            <div className="my-auto rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-4 text-center text-sm leading-relaxed text-slate-200 backdrop-blur-md">
              {t.noNewNotifications}
            </div>
          ) : (
            recentEvents.map((evt) => {
              const isFlagged =
                evt.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
              const appLabel =
                evt.channel === 'whatsapp'
                  ? t.appWhatsApp
                  : evt.channel === 'call'
                  ? t.appPhone
                  : t.appMessages;

              return (
                <button
                  key={evt.instanceId}
                  type="button"
                  onClick={() => handleOpenNotification(evt)}
                  className={`flex w-full flex-col gap-1 rounded-2xl border px-3.5 py-3 text-left shadow-md backdrop-blur-md transition-colors ${
                    isFlagged
                      ? 'border-red-400/50 bg-red-950/75 hover:bg-red-950/85'
                      : 'border-white/15 bg-slate-900/70 hover:bg-slate-900/85'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold">
                      {evt.channel === 'whatsapp' ? (
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      ) : evt.channel === 'call' ? (
                        <Phone className="h-3.5 w-3.5 text-sky-400" />
                      ) : (
                        <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                      )}
                      <span>{appLabel}</span>
                      {isFlagged && (
                        <ShieldAlert
                          className="h-3.5 w-3.5 text-red-300"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span className="tabular-nums text-[0.72rem] text-slate-300">
                      {formatEventTime(evt.receivedAtIso, language)}
                    </span>
                  </div>

                  <div className="truncate text-sm font-bold text-white">
                    {evt.senderName}
                  </div>
                  <p className="url-wrap line-clamp-2 text-xs leading-relaxed text-slate-200">
                    {evt.content}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Lock Screen Controls & Shortcuts */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label={t.appPhone}
              onClick={() => {
                onUnlock();
                onOpenApp('phone');
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-900/65 text-white backdrop-blur-md transition-colors hover:bg-slate-800"
            >
              <Phone className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onUnlock}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25"
            >
              <LockOpen className="h-4 w-4 text-teal-200" />
              <span>{t.tapToUnlock}</span>
            </button>

            <button
              type="button"
              aria-label={t.appCamera}
              onClick={() => {
                onUnlock();
                onOpenApp('camera');
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-900/65 text-white backdrop-blur-md transition-colors hover:bg-slate-800"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-3 text-center text-[0.7rem] leading-snug text-slate-300/90">
            {t.demoDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
