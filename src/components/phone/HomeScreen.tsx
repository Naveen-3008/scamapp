import React, { useState } from 'react';
import {
  Camera,
  ChevronRight,
  Image as ImageIcon,
  MessageCircle,
  MessageSquare,
  Phone,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import { LanguageCode, PhoneScreenId, WallpaperId } from '../../types';
import {
  formatPhoneClockTime,
  formatPhoneLockDate,
} from '../../utils/phoneFormatting';
import { WallpaperBackground } from './WallpaperBackground';

interface HomeScreenProps {
  now: Date;
  language: LanguageCode;
  wallpaper: WallpaperId;
  isPaused: boolean;
  unreadCounts: {
    sms: number;
    whatsapp: number;
    calls: number;
    flagged: number;
    totalUnread: number;
  };
  onOpenApp: (screen: PhoneScreenId) => void;
}

interface AppLauncherItem {
  id: PhoneScreenId;
  label: string;
  icon: React.ReactNode;
  bgClass: string;
  badgeCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  now,
  language,
  wallpaper,
  isPaused,
  unreadCounts,
  onOpenApp,
}) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const t = getTranslation(language);

  const gridApps: AppLauncherItem[] = [
    {
      id: 'contacts',
      label: t.appContacts,
      icon: <Users className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-indigo-500 to-blue-700',
    },
    {
      id: 'camera',
      label: t.appCamera,
      icon: <Camera className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-slate-700 to-slate-900',
    },
    {
      id: 'gallery',
      label: t.appGallery,
      icon: <ImageIcon className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-amber-500 to-rose-600',
    },
    {
      id: 'eldershield',
      label: t.appElderShield,
      icon: <ShieldCheck className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-teal-500 to-emerald-700',
      badgeCount: unreadCounts.flagged > 0 ? unreadCounts.flagged : undefined,
    },
    {
      id: 'messages',
      label: t.appMessages,
      icon: <MessageSquare className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-sky-500 to-blue-600',
      badgeCount: unreadCounts.sms > 0 ? unreadCounts.sms : undefined,
    },
    {
      id: 'whatsapp',
      label: t.appWhatsApp,
      icon: <MessageCircle className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-emerald-500 to-green-700',
      badgeCount: unreadCounts.whatsapp > 0 ? unreadCounts.whatsapp : undefined,
    },
    {
      id: 'settings',
      label: t.appSettings,
      icon: <Settings className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-slate-600 to-slate-800',
    },
  ];

  const dockApps: AppLauncherItem[] = [
    {
      id: 'phone',
      label: t.appPhone,
      icon: <Phone className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-emerald-500 to-teal-700',
      badgeCount: unreadCounts.calls > 0 ? unreadCounts.calls : undefined,
    },
    {
      id: 'messages',
      label: t.appMessages,
      icon: <MessageSquare className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-sky-500 to-blue-600',
      badgeCount: unreadCounts.sms > 0 ? unreadCounts.sms : undefined,
    },
    {
      id: 'whatsapp',
      label: t.appWhatsApp,
      icon: <MessageCircle className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-green-500 to-emerald-700',
      badgeCount: unreadCounts.whatsapp > 0 ? unreadCounts.whatsapp : undefined,
    },
    {
      id: 'settings',
      label: t.appSettings,
      icon: <Settings className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-slate-600 to-slate-800',
    },
  ];

  const folderApps: AppLauncherItem[] = [
    {
      id: 'eldershield',
      label: t.appElderShield,
      icon: <ShieldCheck className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-teal-500 to-emerald-700',
      badgeCount: unreadCounts.flagged > 0 ? unreadCounts.flagged : undefined,
    },
    {
      id: 'contacts',
      label: t.appContacts,
      icon: <Users className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-indigo-500 to-blue-700',
    },
    {
      id: 'gallery',
      label: t.appGallery,
      icon: <ImageIcon className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-amber-500 to-rose-600',
    },
    {
      id: 'settings',
      label: t.appSettings,
      icon: <Settings className="h-[22px] w-[22px] shrink-0 text-white" />,
      bgClass: 'bg-gradient-to-br from-slate-600 to-slate-800',
    },
  ];

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden text-white select-none">
      <WallpaperBackground wallpaper={wallpaper} />

      {/* Single Vertical Scroll Container with Consistent 14px–16px Horizontal Padding */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between gap-4 overflow-y-auto overflow-x-hidden px-3.5 pt-3 pb-3 [@container(min-width:355px)]:px-4">
        {/* Top Section: Top-Left Clock/Date + ElderShield Card + 4-Column App Grid */}
        <div className="flex w-full min-w-0 flex-col gap-3.5">
          {/* Consistently Top-Left Aligned Clock & Date */}
          <div className="flex w-full min-w-0 flex-col items-start text-left">
            <div className="font-mono-tabular text-[2rem] leading-none font-semibold tracking-tight text-white drop-shadow-xs [@container(min-width:355px)]:text-[2.25rem]">
              {formatPhoneClockTime(now, language)}
            </div>
            <div className="mt-1 w-full truncate text-xs font-medium text-slate-100/95 [@container(min-width:355px)]:text-sm">
              {formatPhoneLockDate(now, language)}
            </div>
          </div>

          {/* ElderShield Protection Card (Strictly 100% Width Bounded) */}
          <button
            type="button"
            onClick={() => onOpenApp('eldershield')}
            className="flex w-full min-w-0 items-center justify-between gap-2.5 rounded-2xl border border-white/20 bg-slate-950/60 px-3 py-2.5 text-left shadow-lg backdrop-blur-md transition-colors hover:bg-slate-950/75"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  isPaused
                    ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/40'
                    : 'bg-teal-500/25 text-teal-300 ring-1 ring-teal-400/40'
                }`}
              >
                <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.82rem] font-bold leading-snug text-white [@container(min-width:355px)]:text-sm">
                  {isPaused ? t.shieldWidgetPaused : t.shieldWidgetActive}
                </div>
                <div className="line-clamp-1 text-[0.7rem] leading-snug text-slate-200/90 [@container(min-width:355px)]:text-xs">
                  {t.shieldWidgetSubtitle}
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
          </button>

          {/* Uniform 4-Column App Icon Grid (repeat(4, minmax(0, 1fr))) */}
          <div className="home-icon-grid gap-x-1.5 gap-y-3 pt-0.5 [@container(min-width:355px)]:gap-x-2 [@container(min-width:355px)]:gap-y-3.5">
            {gridApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpenApp(app.id)}
                className="group flex min-w-0 flex-col items-center justify-start pt-1.5 text-center"
              >
                <div className="relative inline-flex shrink-0">
                  <div
                    className={`home-app-icon flex items-center justify-center shadow-md ring-1 ring-white/20 transition-transform group-hover:scale-105 group-active:scale-95 ${app.bgClass}`}
                  >
                    {app.icon}
                  </div>
                  {app.badgeCount !== undefined && app.badgeCount > 0 && (
                    <span className="tabular-nums pointer-events-none absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] leading-none font-bold text-white shadow-xs ring-2 ring-slate-950">
                      {app.badgeCount > 9 ? '9+' : app.badgeCount}
                    </span>
                  )}
                </div>
                <span className="home-app-label mt-1.5 w-full text-center font-medium text-white drop-shadow-xs">
                  {app.label}
                </span>
              </button>
            ))}

            {/* Safety & Tools Folder (Identical Outer Icon Dimensions) */}
            <button
              type="button"
              onClick={() => setIsFolderOpen(true)}
              className="group flex min-w-0 flex-col items-center justify-start pt-1.5 text-center"
            >
              <div className="relative inline-flex shrink-0">
                <div className="home-app-icon grid grid-cols-2 gap-1 border border-white/25 bg-slate-900/65 p-1.5 shadow-md backdrop-blur-md transition-transform group-hover:scale-105 group-active:scale-95">
                  <span className="flex items-center justify-center rounded-[5px] bg-teal-600">
                    <ShieldCheck className="h-3 w-3 shrink-0 text-white" />
                  </span>
                  <span className="flex items-center justify-center rounded-[5px] bg-indigo-600">
                    <Users className="h-3 w-3 shrink-0 text-white" />
                  </span>
                  <span className="flex items-center justify-center rounded-[5px] bg-rose-600">
                    <ImageIcon className="h-3 w-3 shrink-0 text-white" />
                  </span>
                  <span className="flex items-center justify-center rounded-[5px] bg-slate-700">
                    <Settings className="h-3 w-3 shrink-0 text-white" />
                  </span>
                </div>
              </div>
              <span className="home-app-label mt-1.5 w-full text-center font-medium text-white drop-shadow-xs">
                {t.folderSafetyTools}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Section: Simulation Notice + Uniform 4-Icon App Dock */}
        <div className="flex w-full min-w-0 flex-col gap-2.5">
          <p className="wrap-safe w-full rounded-xl border border-white/15 bg-slate-950/50 px-3 py-1.5 text-center text-[0.66rem] leading-snug text-slate-200 backdrop-blur-xs">
            {t.demoDisclaimer}
          </p>

          <div className="home-icon-grid gap-x-1.5 rounded-[1.5rem] border border-white/20 bg-slate-950/55 px-2.5 pt-2.5 pb-2 shadow-xl backdrop-blur-md">
            {dockApps.map((app) => (
              <button
                key={`dock-${app.id}`}
                type="button"
                aria-label={app.label}
                onClick={() => onOpenApp(app.id)}
                className="group flex min-w-0 flex-col items-center justify-center pt-1"
              >
                <div className="relative inline-flex shrink-0">
                  <div
                    className={`home-app-icon flex items-center justify-center shadow-md ring-1 ring-white/20 transition-transform group-hover:scale-105 group-active:scale-95 ${app.bgClass}`}
                  >
                    {app.icon}
                  </div>
                  {app.badgeCount !== undefined && app.badgeCount > 0 && (
                    <span className="tabular-nums pointer-events-none absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] leading-none font-bold text-white shadow-xs ring-2 ring-slate-950">
                      {app.badgeCount > 9 ? '9+' : app.badgeCount}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Folder Modal Overlay */}
      {isFolderOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.folderSafetyTools}
          onClick={() => setIsFolderOpen(false)}
          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-full rounded-3xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl"
          >
            <div className="mb-3.5 flex items-center justify-between gap-2">
              <h2 className="min-w-0 truncate text-base font-bold text-white">
                {t.folderSafetyTools}
              </h2>
              <button
                type="button"
                aria-label={t.cancelBtn}
                onClick={() => setIsFolderOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {folderApps.map((app) => (
                <button
                  key={`folder-${app.id}`}
                  type="button"
                  onClick={() => {
                    setIsFolderOpen(false);
                    onOpenApp(app.id);
                  }}
                  className="flex min-w-0 flex-col items-center gap-2 rounded-2xl bg-white/[0.04] p-3 transition-colors hover:bg-white/10"
                >
                  <div className="relative inline-flex shrink-0 pt-1">
                    <div
                      className={`home-app-icon flex items-center justify-center shadow ${app.bgClass}`}
                    >
                      {app.icon}
                    </div>
                    {app.badgeCount !== undefined && app.badgeCount > 0 && (
                      <span className="tabular-nums pointer-events-none absolute -top-0.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] leading-none font-bold text-white ring-2 ring-slate-900">
                        {app.badgeCount}
                      </span>
                    )}
                  </div>
                  <span className="home-app-label w-full text-center font-semibold text-slate-100">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
