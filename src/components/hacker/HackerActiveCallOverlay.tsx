import React from 'react';
import { PhoneCall, PhoneOff, Radio, User } from 'lucide-react';
import { ELDER_GUARDIAN_TARGET } from '../../data/hackerScenarioLibrary';
import { RiskLevel, SharedCallSession } from '../../types';
import { formatDurationMmSs } from '../../utils/phoneFormatting';

interface HackerActiveCallOverlayProps {
  session: SharedCallSession;
  onEndCall: () => void;
  onDismissTerminal: () => void;
}

export const HackerActiveCallOverlay: React.FC<
  HackerActiveCallOverlayProps
> = ({ session, onEndCall, onDismissTerminal }) => {
  const isRinging = session.status === 'ringing';
  const isConnected = session.status === 'connected';
  const isDeclined = session.status === 'declined';
  const isMissed = session.status === 'missed';

  const statusHeadline = isRinging
    ? 'Calling ElderGuardian…'
    : isConnected
    ? `Active Call · ${formatDurationMmSs(session.durationSeconds)}`
    : isDeclined
    ? 'Call Declined'
    : isMissed
    ? 'No Answer'
    : 'Call Ended';

  return (
    <div className="absolute inset-0 z-40 flex min-h-0 flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-[#172036] to-slate-950 px-4 pt-4 pb-5 text-white">
      {/* Top Synchronized Call State */}
      <div className="flex shrink-0 items-center justify-between gap-2 text-xs">
        <span className="font-bold text-slate-200">{statusHeadline}</span>
        <span className="font-mono-tabular text-[0.7rem] text-slate-400">
          {session.detectedRisk === RiskLevel.NO_OBVIOUS_SIGNS
            ? 'Ordinary Call'
            : 'Scam Test Call'}
        </span>
      </div>

      {/* Center Outgoing / Active Call Details */}
      <div className="min-h-0 flex-1 overflow-y-auto py-3">
        <div className="flex min-h-full flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center">
            {isRinging && (
              <span
                aria-hidden="true"
                className="absolute h-24 w-24 animate-ping rounded-full bg-amber-400 opacity-20"
              />
            )}
            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-xl ${
                isDeclined
                  ? 'border-red-400/60 bg-red-950/70 text-red-200'
                  : isConnected
                  ? 'border-emerald-400/70 bg-emerald-950/60 text-emerald-200'
                  : 'border-amber-400/60 bg-slate-900 text-amber-200'
              }`}
            >
              {isConnected ? (
                <Radio className="h-9 w-9" />
              ) : isDeclined ? (
                <PhoneOff className="h-9 w-9" />
              ) : (
                <User className="h-9 w-9" />
              )}
            </div>
          </div>

          <div className="mt-3.5 text-xs font-medium text-slate-400">
            Dialing {ELDER_GUARDIAN_TARGET.name}
          </div>
          <h2 className="wrap-safe mt-1 text-xl font-bold leading-snug text-white">
            As “{session.callerName}”
          </h2>
          <p className="font-mono-tabular mt-0.5 text-sm text-slate-300">
            {session.phoneNumber}
          </p>

          {/* Synchronized Call Info Box */}
          <div className="mt-4 w-full rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 text-left">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold text-white">
                {isRinging
                  ? 'Ringing on ElderGuardian…'
                  : isConnected
                  ? 'Connected with ElderGuardian'
                  : isDeclined
                  ? 'Call Declined on ElderGuardian'
                  : 'Simulated Session Closed'}
              </span>
              {isConnected && (
                <span className="font-mono-tabular font-bold text-emerald-300">
                  {formatDurationMmSs(session.durationSeconds)}
                </span>
              )}
            </div>
            <p className="url-wrap text-xs leading-relaxed text-slate-200">
              {session.content}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Synchronized Call Action */}
      {isRinging || isConnected ? (
        <div className="shrink-0 pt-2.5">
          <button
            type="button"
            onClick={onEndCall}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-red-500 active:bg-red-700"
          >
            <PhoneOff className="h-5 w-5 shrink-0" />
            <span>End Call</span>
          </button>
        </div>
      ) : (
        <div className="shrink-0 pt-2.5">
          <button
            type="button"
            onClick={onDismissTerminal}
            className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            <PhoneCall className="h-4 w-4 shrink-0" />
            <span>Return to Simulator</span>
          </button>
        </div>
      )}
    </div>
  );
};
