import React from 'react';
import {
  BellRing,
  ChevronUp,
  Lock,
  MessageCircle,
  MessageSquare,
  Phone,
  Play,
  ShieldAlert,
  Type,
  Volume2,
  VolumeX,
  Wifi,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import {
  LanguageCode,
  PhoneScreenId,
  ProcessedPhoneEvent,
  RiskLevel,
} from '../../types';
import {
  formatEventTime,
  formatPhoneClockTime,
  formatPhoneLockDate,
} from '../../utils/phoneFormatting';

interface NotificationShadeProps {
  now: Date;
  language: LanguageCode;
  wifiEnabled: boolean;
  isPaused: boolean;
  voiceEnabled: boolean;
  ringtoneEnabled: boolean;
  isLargeText: boolean;
  events: ProcessedPhoneEvent[];
  onClose: () => void;
  onToggleWifi: () => void;
  onTogglePause: () => void;
  onToggleVoice: () => void;
  onToggleRingtone: () => void;
  onToggleLargeText: () => void;
  onLockPhone: () => void;
  onClearNotifications: () => void;
  onOpenEvent: (screen: PhoneScreenId, eventId: string) => void;
}

export const NotificationShade: React.FC<NotificationShadeProps> = ({
  now,
  language,
  wifiEnabled,
  isPaused,
  voiceEnabled,
  ringtoneEnabled,
  isLargeText,
  events,
  onClose,
  onToggleWifi,
  onTogglePause,
  onToggleVoice,
  onToggleRingtone,
  onToggleLargeText,
  onLockPhone,
  onClearNotifications,
  onOpenEvent,
}) => {
  const t = getTranslation(language);
  const unreadOrRecent = [...events].reverse().slice(0, 12);

  const tiles = [
    {
      key: 'wifi',
      label: t.tileWifi,
      sub: wifiEnabled ? t.stateOn : t.stateOff,
      active: wifiEnabled,
      icon: <Wifi className="h-5 w-5" />,
      onClick: onToggleWifi,
    },
    {
      key: 'sim',
      label: t.tileAutoSim,
      sub: isPaused ? t.statePaused : t.stateActive,
      active: !isPaused,
      icon: <Play className="h-5 w-5" />,
      onClick: onTogglePause,
    },
    {
      key: 'voice',
      label: t.tileVoice,
      sub: voiceEnabled ? t.stateOn : t.stateOff,
      active: voiceEnabled,
      icon: voiceEnabled ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      ),
      onClick: onToggleVoice,
    },
    {
      key: 'ringtone',
      label: t.tileRingtone,
      sub: ringtoneEnabled ? t.stateOn : t.stateOff,
      active: ringtoneEnabled,
      icon: <BellRing className="h-5 w-5" />,
      onClick: onToggleRingtone,
    },
    {
      key: 'text',
      label: t.tileLargeText,
      sub: isLargeText ? t.stateOn : t.stateOff,
      active: isLargeText,
      icon: <Type className="h-5 w-5" />,
      onClick: onToggleLargeText,
    },
    {
      key: 'lock',
      label: t.tileLockPhone,
      sub: '',
      active: false,
      icon: <Lock className="h-5 w-5" />,
      onClick: onLockPhone,
    },
  ];

  return (
    <div className="absolute inset-0 z-40 flex min-h-0 flex-col bg-slate-950/95 text-white backdrop-blur-xl">
      {/* Top Clock & Date Row */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 pt-3.5 pb-3">
        <div>
          <div className="font-mono-tabular text-2xl font-bold text-white">
            {formatPhoneClockTime(now, language)}
          </div>
          <div className="text-xs text-slate-300">
            {formatPhoneLockDate(now, language)}
          </div>
        </div>
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3.5">
        {/* Quick Settings Grid */}
        <div className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
          {t.quickSettingsTitle}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {tiles.map((tile) => (
            <button
              key={tile.key}
              type="button"
              onClick={tile.onClick}
              className={`flex min-h-[56px] items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition-colors ${
                tile.active
                  ? 'border-teal-400/50 bg-teal-500/25 text-white'
                  : 'border-white/10 bg-white/[0.06] text-slate-200 hover:bg-white/10'
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  tile.active
                    ? 'bg-teal-400 text-slate-950'
                    : 'bg-white/10 text-slate-200'
                }`}
              >
                {tile.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-bold">
                  {tile.label}
                </span>
                {tile.sub && (
                  <span className="block truncate text-[0.7rem] text-slate-300">
                    {tile.sub}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="mt-5 mb-2.5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            {t.notificationsHeader}
          </span>
          {unreadOrRecent.length > 0 && (
            <button
              type="button"
              onClick={onClearNotifications}
              className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
            >
              {t.clearNotificationsBtn}
            </button>
          )}
        </div>

        {unreadOrRecent.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center text-sm text-slate-300">
            {t.noNewNotifications}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {unreadOrRecent.map((evt) => {
              const isFlagged =
                evt.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
              const targetApp: PhoneScreenId =
                evt.channel === 'whatsapp'
                  ? 'whatsapp'
                  : evt.channel === 'call'
                  ? 'phone'
                  : 'messages';
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
                  onClick={() => onOpenEvent(targetApp, evt.instanceId)}
                  className={`flex w-full flex-col gap-1 rounded-2xl border p-3.5 text-left transition-colors ${
                    isFlagged
                      ? 'border-red-400/40 bg-red-950/50 hover:bg-red-950/70'
                      : 'border-white/10 bg-white/[0.06] hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 font-semibold">
                      {evt.channel === 'whatsapp' ? (
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      ) : evt.channel === 'call' ? (
                        <Phone className="h-3.5 w-3.5 text-sky-400" />
                      ) : (
                        <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                      )}
                      <span>{appLabel}</span>
                      {!evt.read && (
                        <span className="h-2 w-2 rounded-full bg-teal-400" />
                      )}
                    </span>
                    <span className="tabular-nums text-[0.7rem]">
                      {formatEventTime(evt.receivedAtIso, language)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold text-white">
                      {evt.senderName}
                    </span>
                    {isFlagged && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-red-500/25 px-2 py-0.5 text-[0.68rem] font-bold text-red-200">
                        <ShieldAlert className="h-3 w-3" />
                        {evt.classification.riskLevel === RiskLevel.HIGH_RISK
                          ? t.riskHigh
                          : t.riskSuspicious}
                      </span>
                    )}
                  </div>

                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-200">
                    {evt.content}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Handle */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center py-2.5 text-slate-400 hover:text-white"
      >
        <span className="h-1.5 w-14 rounded-full bg-white/30" />
      </button>
    </div>
  );
};
