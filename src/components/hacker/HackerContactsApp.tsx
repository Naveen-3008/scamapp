import React from 'react';
import { ArrowLeft, MessageSquare, Phone, Shield, User, Users } from 'lucide-react';
import { useDualPhoneSimulation } from '../../context/DualPhoneSimulationContext';
import { HACKER_CONTACTS } from '../../data/hackerScenarioLibrary';

export const HackerContactsApp: React.FC = () => {
  const {
    loadContactIntoMessages,
    loadContactIntoPhone,
    navigateHackerHome,
  } = useDualPhoneSimulation();

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-950 text-slate-100">
      <header className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-slate-900 px-4 py-3">
        <button
          type="button"
          aria-label="Back to Hacker Home"
          onClick={navigateHackerHome}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-200 hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <Users className="h-5 w-5 shrink-0 text-indigo-400" />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white">
              Contacts & Personas
            </h1>
            <p className="truncate text-[0.68rem] text-slate-400">
              Fictional receiver & test caller identities
            </p>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 divide-y divide-white/10 overflow-y-auto px-3.5 py-2 [@container(min-width:355px)]:px-4">
        {HACKER_CONTACTS.map((contact) => (
          <div key={contact.id} className="py-3.5">
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  contact.isReceiverTarget
                    ? 'bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/40'
                    : contact.markedSuspicious
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}
              >
                {contact.isReceiverTarget ? (
                  <Shield className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-white">
                  {contact.name}
                </div>
                <div className="font-mono-tabular text-xs text-slate-400">
                  {contact.phoneNumber}
                </div>
                <p className="wrap-safe mt-0.5 text-xs text-slate-300">
                  {contact.roleDescription}
                </p>

                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loadContactIntoMessages(contact)}
                    className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/15"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                    <span>Compose SMS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => loadContactIntoPhone(contact)}
                    className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/15"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                    <span>Prepare Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
