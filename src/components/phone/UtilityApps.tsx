import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
  X,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import {
  CapturedPhoto,
  LanguageCode,
  PhoneScreenId,
  ProcessedPhoneEvent,
  RiskLevel,
} from '../../types';
import { formatEventTime } from '../../utils/phoneFormatting';

/* ============================================================================
 * 1. CONTACTS APP
 * ========================================================================== */
interface ContactsAppProps {
  language: LanguageCode;
  onStartOutboundCall: (
    name: string,
    phoneNumber: string,
    safeSummary: string
  ) => void;
  onBackToHome: () => void;
}

export const ContactsApp: React.FC<ContactsAppProps> = ({
  language,
  onStartOutboundCall,
  onBackToHome,
}) => {
  const t = getTranslation(language);

  const contacts = [
    { id: 'son', name: t.contactRoleSon, phone: '+91 90000 10101' },
    { id: 'daughter', name: t.contactRoleDaughter, phone: '+91 90000 10202' },
    { id: 'doctor', name: t.contactRoleDoctor, phone: '+91 90000 10303' },
    {
      id: 'bank',
      name: t.contactRoleBankHelpline,
      phone: '1800 000 000',
    },
    {
      id: 'cyber',
      name: t.contactRoleCyberHelpline,
      phone: '1930',
    },
  ];

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white text-slate-900">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3.5">
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onBackToHome}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <Users className="h-5 w-5 shrink-0 text-indigo-600" />
          <h1 className="truncate text-lg font-bold text-slate-900">{t.appContacts}</h1>
        </div>
      </header>

      <div className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-3 px-4 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-slate-900">
                  {c.name}
                </div>
                <div className="font-mono-tabular text-xs text-slate-500">
                  {c.phone}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onStartOutboundCall(c.name, c.phone, t.callConnectedLabel)
              }
              className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
            >
              <Phone className="h-4 w-4" />
              <span>{t.callActionBtn}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. SIMULATED CAMERA APP (Zero Browser Permission Prompts)
 * ========================================================================== */
interface CameraAppProps {
  language: LanguageCode;
  onCaptureSnapshot: () => void;
  onOpenGallery: () => void;
  onBackToHome: () => void;
}

export const CameraApp: React.FC<CameraAppProps> = ({
  language,
  onCaptureSnapshot,
  onOpenGallery,
  onBackToHome,
}) => {
  const t = getTranslation(language);
  const [flashActive, setFlashActive] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleShutter = () => {
    setFlashActive(true);
    onCaptureSnapshot();
    setShowSavedToast(true);
    window.setTimeout(() => setFlashActive(false), 180);
    window.setTimeout(() => setShowSavedToast(false), 2200);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-slate-950 text-white">
      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 py-3">
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onBackToHome}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold text-white">{t.appCamera}</span>
        <span className="w-10" />
      </header>

      {/* Simulated Viewfinder */}
      <div className="relative mx-3 flex-1 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-sky-800 via-teal-800 to-emerald-950">
        {/* Scenic Vector Subject in Lens */}
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <circle cx="290" cy="95" r="38" fill="#FDE68A" opacity="0.75" />
          <path
            d="M0,260 C95,210 175,270 280,220 C335,195 375,220 400,210 L400,400 L0,400 Z"
            fill="#0F4C5C"
          />
          <path
            d="M0,310 C110,285 215,330 330,290 C365,278 385,288 400,285 L400,400 L0,400 Z"
            fill="#062925"
          />
        </svg>

        {/* Rule of Thirds Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3"
        >
          {Array.from({ length: 9 }).map((_, idx) => (
            <div key={idx} className="border border-white/15" />
          ))}
        </div>

        {/* Simulated Privacy Notice */}
        <div className="absolute inset-x-3 top-3 rounded-xl bg-black/55 px-3 py-2 text-center text-xs leading-snug text-slate-100 backdrop-blur-sm">
          {t.cameraSimulatedNote}
        </div>

        {/* Saved Toast */}
        {showSavedToast && (
          <div className="absolute inset-x-6 bottom-5 rounded-xl bg-emerald-600/95 px-4 py-2 text-center text-xs font-bold text-white shadow-lg">
            {t.cameraSavedToast}
          </div>
        )}

        {/* Shutter Flash */}
        {flashActive && <div className="absolute inset-0 bg-white/85" />}
      </div>

      {/* Bottom Shutter & Gallery Controls */}
      <div className="flex items-center justify-around px-6 py-5">
        <button
          type="button"
          aria-label={t.appGallery}
          onClick={onOpenGallery}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white hover:bg-white/20"
        >
          <ImageIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label={t.cameraCaptureBtn}
          onClick={handleShutter}
          className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-white bg-white/20 p-1.5 transition-transform active:scale-95"
        >
          <span className="block h-full w-full rounded-full bg-white" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-slate-400">
          <Camera className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. GALLERY APP
 * ========================================================================== */
interface GalleryAppProps {
  language: LanguageCode;
  photos: CapturedPhoto[];
  onBackToHome: () => void;
}

export const GalleryApp: React.FC<GalleryAppProps> = ({
  language,
  photos,
  onBackToHome,
}) => {
  const t = getTranslation(language);
  const [selectedPhoto, setSelectedPhoto] = useState<CapturedPhoto | null>(
    null
  );
  const [brokenIds, setBrokenIds] = useState<Record<string, boolean>>({});

  const getTitleForPhoto = (p: CapturedPhoto): string => {
    if (p.titleKey === 'tea') return t.galleryPhotoTea;
    if (p.titleKey === 'garden') return t.galleryPhotoGarden;
    if (p.titleKey === 'park') return t.galleryPhotoPark;
    return t.galleryPhotoSnapshot;
  };

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-white text-slate-900">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3.5">
        <button
          type="button"
          aria-label={t.navBack}
          onClick={onBackToHome}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <ImageIcon className="h-5 w-5 shrink-0 text-rose-600" />
          <h1 className="truncate text-lg font-bold text-slate-900">{t.appGallery}</h1>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-3 overflow-y-auto p-4">
        {photos.map((photo) => {
          const title = getTitleForPhoto(photo);
          const showImage = Boolean(photo.imageUrl && !brokenIds[photo.id]);

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left shadow-2xs transition-transform hover:scale-[1.01]"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gradient-to-br from-teal-700 via-sky-800 to-slate-900">
                {showImage ? (
                  <img
                    src={photo.imageUrl}
                    alt={title}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenIds((prev) => ({ ...prev, [photo.id]: true }))
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/80">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="px-3 py-2">
                <div className="truncate text-xs font-bold text-slate-800">
                  {title}
                </div>
                <div className="tabular-nums text-[0.68rem] text-slate-500">
                  {formatEventTime(photo.capturedAtIso, language)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Full-Screen Photo Lightbox inside Phone */}
      {selectedPhoto && (
        <div className="absolute inset-0 z-30 flex flex-col bg-slate-950 text-white">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="truncate text-sm font-bold">
              {getTitleForPhoto(selectedPhoto)}
            </span>
            <button
              type="button"
              aria-label={t.cancelBtn}
              onClick={() => setSelectedPhoto(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center p-4">
            {selectedPhoto.imageUrl && !brokenIds[selectedPhoto.id] ? (
              <img
                src={selectedPhoto.imageUrl}
                alt={getTitleForPhoto(selectedPhoto)}
                referrerPolicy="no-referrer"
                className="max-h-full w-full rounded-2xl object-contain"
              />
            ) : (
              <div className="flex aspect-4/3 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 via-sky-800 to-slate-900">
                <ImageIcon className="h-14 w-14 text-white/80" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 4. ELDERSHIELD SAFETY CENTER APP (Inside Phone)
 * ========================================================================== */
interface ElderShieldCenterAppProps {
  language: LanguageCode;
  events: ProcessedPhoneEvent[];
  onReopenScamAlert: (eventId: string) => void;
  onOpenChannelApp: (screen: PhoneScreenId, eventId: string) => void;
  onBackToHome: () => void;
}

export const ElderShieldCenterApp: React.FC<ElderShieldCenterAppProps> = ({
  language,
  events,
  onReopenScamAlert,
  onOpenChannelApp,
  onBackToHome,
}) => {
  const t = getTranslation(language);
  const reversed = [...events].reverse();
  const flagged = reversed.filter(
    (e) => e.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-50 text-slate-900">
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
          <ShieldCheck className="h-5 w-5 shrink-0 text-teal-600" />
          <h1 className="truncate text-lg font-bold text-slate-900">
            {t.appElderShield}
          </h1>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-teal-950">
          <p className="text-sm font-medium leading-relaxed">
            {t.elderShieldCenterDesc}
          </p>
        </div>

        {/* Flagged Scam Warnings */}
        <div>
          <h2 className="mb-2 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
            {t.flaggedEventsHeader} ({flagged.length})
          </h2>

          {flagged.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              {t.noNewNotifications}
            </div>
          ) : (
            <div className="space-y-2.5">
              {flagged.map((evt) => {
                const isHigh =
                  evt.classification.riskLevel === RiskLevel.HIGH_RISK;
                return (
                  <div
                    key={evt.instanceId}
                    className={`rounded-2xl border p-3.5 ${
                      isHigh
                        ? 'border-red-200 bg-white'
                        : 'border-amber-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1.5 text-xs font-bold text-slate-700">
                        {evt.channel === 'whatsapp' ? (
                          <MessageCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        ) : evt.channel === 'call' ? (
                          <Phone className="h-3.5 w-3.5 shrink-0 text-sky-600" />
                        ) : (
                          <MessageSquare className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                        )}
                        <span className="truncate">{evt.senderName}</span>
                      </span>
                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 text-[0.68rem] font-bold ${
                          isHigh
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {isHigh ? t.riskHigh : t.riskSuspicious}
                      </span>
                    </div>

                    <p className="url-wrap mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-700">
                      {evt.content}
                    </p>

                    <button
                      type="button"
                      onClick={() => onReopenScamAlert(evt.instanceId)}
                      className="mt-2.5 flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-red-700 px-3 py-2 text-xs font-bold text-white hover:bg-red-800"
                    >
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>{t.viewScamWarningBtn}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Recent Events */}
        {reversed.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-extrabold tracking-wider text-slate-500 uppercase">
              {t.allEventsHeader}
            </h2>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
              {reversed.slice(0, 12).map((evt) => {
                const targetScreen: PhoneScreenId =
                  evt.channel === 'whatsapp'
                    ? 'whatsapp'
                    : evt.channel === 'call'
                    ? 'phone'
                    : 'messages';
                return (
                  <button
                    key={`all-${evt.instanceId}`}
                    type="button"
                    onClick={() => onOpenChannelApp(targetScreen, evt.instanceId)}
                    className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left hover:bg-slate-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-bold text-slate-900">
                        {evt.senderName}
                      </div>
                      <div className="truncate text-[0.72rem] text-slate-500">
                        {evt.content}
                      </div>
                    </div>
                    <span className="tabular-nums shrink-0 text-[0.68rem] text-slate-400">
                      {formatEventTime(evt.receivedAtIso, language)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
