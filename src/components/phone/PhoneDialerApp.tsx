import React, { useState } from 'react';
import {
  ArrowLeft,
  Delete,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  ShieldAlert,
  ShieldCheck,
  User,
} from 'lucide-react';
import { getTranslation } from '../../i18n/translations';
import { LanguageCode, ProcessedPhoneEvent, RiskLevel } from '../../types';
import {
  formatEventTime,
  renderTextWithHighlights,
} from '../../utils/phoneFormatting';

interface PhoneDialerAppProps {
  language: LanguageCode;
  events: ProcessedPhoneEvent[];
  focusedEventId: string | null;
  onSelectEvent: (eventId: string | null) => void;
  onReopenScamAlert: (eventId: string) => void;
  onStartOutboundCall: (
    name: string,
    phoneNumber: string,
    safeSummary: string
  ) => void;
  onBackToHome: () => void;
}

const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export const PhoneDialerApp: React.FC<PhoneDialerAppProps> = ({
  language,
  events,
  focusedEventId,
  onSelectEvent,
  onReopenScamAlert,
  onStartOutboundCall,
  onBackToHome,
}) => {
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState<'recents' | 'contacts' | 'keypad'>(
    'recents'
  );
  const [dialedDigits, setDialedDigits] = useState<string>('');

  const callEvents = [...events]
    .filter((e) => e.channel === 'call')
    .reverse();

  const selectedCall = focusedEventId
    ? callEvents.find((e) => e.instanceId === focusedEventId) || null
    : null;

  const trustedContacts = [
    {
      id: 'c-son',
      name: t.contactRoleSon,
      phone: '+91 90000 10101',
    },
    {
      id: 'c-daughter',
      name: t.contactRoleDaughter,
      phone: '+91 90000 10202',
    },
    {
      id: 'c-doctor',
      name: t.contactRoleDoctor,
      phone: '+91 90000 10303',
    },
    {
      id: 'c-bank',
      name: t.contactRoleBankHelpline,
      phone: '1800 000 000',
    },
    {
      id: 'c-cyber',
      name: t.contactRoleCyberHelpline,
      phone: '1930',
    },
  ];

  // Detailed Call Inspection Screen when a specific call log item is opened
  if (selectedCall) {
    const isFlagged =
      selectedCall.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
    const isHighRisk =
      selectedCall.classification.riskLevel === RiskLevel.HIGH_RISK;

    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-slate-50 text-slate-900">
        <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3.5">
          <button
            type="button"
            aria-label={t.navBack}
            onClick={() => onSelectEvent(null)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-slate-900">
              {selectedCall.senderName}
            </h1>
            <p className="font-mono-tabular truncate text-xs text-slate-500">
              {selectedCall.phoneNumber}
            </p>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
              <span>{t.appPhone}</span>
              <span className="tabular-nums">
                {formatEventTime(selectedCall.receivedAtIso, language)}
              </span>
            </div>
            <p className="url-wrap text-[0.95rem] leading-relaxed text-slate-900">
              {renderTextWithHighlights(
                selectedCall.content,
                selectedCall.classification.matchedPhrases,
                'bg-amber-200 text-slate-950 font-bold px-1 rounded'
              )}
            </p>
          </div>

          {isFlagged ? (
            <div
              className={`rounded-2xl border p-4 ${
                isHighRisk
                  ? 'border-red-300 bg-red-50 text-red-950'
                  : 'border-amber-300 bg-amber-50 text-amber-950'
              }`}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <ShieldAlert
                  className={`h-5 w-5 shrink-0 ${
                    isHighRisk ? 'text-red-700' : 'text-amber-700'
                  }`}
                />
                <span className="text-sm font-extrabold">
                  {isHighRisk ? t.riskHigh : t.riskSuspicious}
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                {selectedCall.classification.reasonText}
              </p>
              <p className="mt-2 text-xs font-semibold leading-relaxed">
                {selectedCall.classification.safetyAdvice}
              </p>
              <button
                type="button"
                onClick={() => onReopenScamAlert(selectedCall.instanceId)}
                className={`mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-white transition-colors ${
                  isHighRisk
                    ? 'bg-red-700 hover:bg-red-800'
                    : 'bg-amber-700 hover:bg-amber-800'
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                <span>{t.viewScamWarningBtn}</span>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                <span>{t.riskNoObvious}</span>
              </div>
              <p className="text-xs leading-relaxed text-emerald-900">
                {t.ordinaryCallNeutralNote}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white text-slate-900">
      {/* Top Bar */}
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
          <Phone className="h-5 w-5 shrink-0 text-emerald-600" />
          <h1 className="truncate text-lg font-bold text-slate-900">{t.appPhone}</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="grid shrink-0 grid-cols-3 border-b border-slate-200 bg-slate-50 p-1">
        {(
          [
            { id: 'recents', label: t.tabRecents },
            { id: 'contacts', label: t.tabContacts },
            { id: 'keypad', label: t.tabKeypad },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-[40px] rounded-xl px-2 py-1.5 text-xs font-bold transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeTab === 'recents' &&
          (callEvents.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center text-slate-500">
              <Phone className="mb-3 h-10 w-10 text-slate-300" />
              <p className="text-sm leading-relaxed">{t.noRecentCalls}</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {callEvents.map((evt) => {
                const isFlagged =
                  evt.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS;
                const isHighRisk =
                  evt.classification.riskLevel === RiskLevel.HIGH_RISK;

                return (
                  <button
                    key={evt.instanceId}
                    type="button"
                    onClick={() => onSelectEvent(evt.instanceId)}
                    className="flex w-full items-start gap-3 px-4 py-3.5 text-left hover:bg-slate-50"
                  >
                    <div
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        isHighRisk
                          ? 'bg-red-100 text-red-700'
                          : isFlagged
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {evt.callOutcome === 'missed' ||
                      evt.callOutcome === 'declined' ? (
                        <PhoneMissed className="h-5 w-5" />
                      ) : (
                        <PhoneIncoming className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold text-slate-900">
                          {evt.senderName}
                        </span>
                        <span className="tabular-nums shrink-0 text-xs text-slate-500">
                          {formatEventTime(evt.receivedAtIso, language)}
                        </span>
                      </div>
                      <p className="font-mono-tabular text-xs text-slate-500">
                        {evt.phoneNumber}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-600">
                        {evt.content}
                      </p>
                      {isFlagged && (
                        <span
                          className={`mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.68rem] font-bold ${
                            isHighRisk
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          <ShieldAlert className="h-3 w-3" />
                          {isHighRisk ? t.riskHigh : t.riskSuspicious}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

        {activeTab === 'contacts' && (
          <div className="divide-y divide-slate-100">
            {trustedContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between gap-3 px-4 py-3.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-slate-900">
                      {contact.name}
                    </div>
                    <div className="font-mono-tabular text-xs text-slate-500">
                      {contact.phone}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onStartOutboundCall(
                      contact.name,
                      contact.phone,
                      t.callConnectedLabel
                    )
                  }
                  className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{t.callActionBtn}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'keypad' && (
          <div className="flex min-h-full flex-col justify-between p-3.5 [@container(min-width:345px)]:p-4">
            {/* Dialed Number Display */}
            <div className="flex min-h-[50px] items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
              <span className="font-mono-tabular truncate text-xl font-bold tracking-wider text-slate-900 [@container(min-width:345px)]:text-2xl">
                {dialedDigits || '—'}
              </span>
              {dialedDigits.length > 0 && (
                <button
                  type="button"
                  aria-label={t.cancelBtn}
                  onClick={() => setDialedDigits((d) => d.slice(0, -1))}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200"
                >
                  <Delete className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* 3x4 Numeric Keypad */}
            <div className="my-2.5 grid grid-cols-3 gap-2">
              {KEYPAD_KEYS.map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() =>
                    setDialedDigits((prev) =>
                      prev.length < 15 ? prev + digit : prev
                    )
                  }
                  className="font-mono-tabular flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-100 active:bg-slate-200 [@container(min-height:660px)]:min-h-[52px] [@container(min-height:660px)]:text-xl"
                >
                  {digit}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={dialedDigits.trim().length === 0}
              onClick={() => {
                if (!dialedDigits.trim()) return;
                onStartOutboundCall(
                  dialedDigits,
                  dialedDigits,
                  t.callConnectedLabel
                );
                setDialedDigits('');
              }}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-base font-bold text-white shadow-md transition-colors hover:bg-emerald-700 disabled:opacity-45"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="wrap-safe">{t.dialBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
