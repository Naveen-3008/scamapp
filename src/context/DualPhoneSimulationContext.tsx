import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ELDER_GUARDIAN_TARGET,
  HACKER_CALL_PRESETS,
  HACKER_SCENARIO_LIBRARY,
  HACKER_SMS_TEMPLATES,
} from '../data/hackerScenarioLibrary';
import { usePhoneSimulator } from '../hooks/usePhoneSimulator';
import {
  DualPhoneBusEvent,
  DualPhoneEventType,
  HackerContactPersona,
  HackerLibraryScenario,
  HackerScreenId,
  HackerSentMessage,
  ProcessedPhoneEvent,
  RiskLevel,
  SharedCallSession,
} from '../types';

export interface SmsComposerDraft {
  recipientName: string;
  recipientNumber: string;
  senderName: string;
  senderNumber: string;
  content: string;
  selectedTemplateId: string;
  markedSuspicious: boolean;
}

export interface CallComposerDraft {
  recipientName: string;
  recipientNumber: string;
  callerName: string;
  callerNumber: string;
  content: string;
  selectedPresetId: string;
  markedSuspicious: boolean;
}

export interface HackerCallHistoryItem {
  id: string;
  callerName: string;
  phoneNumber: string;
  content: string;
  status: 'answered' | 'declined' | 'ended' | 'missed';
  durationSeconds: number;
  startedAtIso: string;
  detectedRisk: RiskLevel;
}

type ReceiverSimulator = ReturnType<typeof usePhoneSimulator>;

export interface DualPhoneSimulationContextValue {
  receiverSim: ReceiverSimulator;
  hackerScreen: HackerScreenId;
  openHackerScreen: (screen: HackerScreenId) => void;
  navigateHackerBack: () => void;
  navigateHackerHome: () => void;
  smsDraft: SmsComposerDraft;
  updateSmsDraft: (patch: Partial<SmsComposerDraft>) => void;
  applySmsTemplateById: (templateId: string) => void;
  callDraft: CallComposerDraft;
  updateCallDraft: (patch: Partial<CallComposerDraft>) => void;
  applyCallPresetById: (presetId: string) => void;
  sentMessages: HackerSentMessage[];
  callHistory: HackerCallHistoryItem[];
  sharedCallSession: SharedCallSession | null;
  dismissTerminalCallBanner: () => void;
  eventBusLog: DualPhoneBusEvent[];
  isCallInProgress: boolean;
  focusCustomSmsCounter: number;
  // Shared actions
  sendSmsFromHacker: () => boolean;
  startCallFromHacker: () => boolean;
  endCallFromHacker: () => void;
  loadScenarioIntoHackerApp: (scenario: HackerLibraryScenario) => void;
  loadContactIntoMessages: (contact: HackerContactPersona) => void;
  loadContactIntoPhone: (contact: HackerContactPersona) => void;
  // Quick Testing Controls (Requirement 8)
  triggerPresetScamSmsQuick: () => void;
  openCustomSmsQuick: () => void;
  triggerSuspiciousCallQuick: () => void;
  triggerOrdinaryCallQuick: () => void;
  resetCurrentScenario: () => void;
}

const DualPhoneSimulationContext =
  createContext<DualPhoneSimulationContextValue | null>(null);

function createBusId(): string {
  return `bus-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const INITIAL_SMS_TEMPLATE = HACKER_SMS_TEMPLATES[0];
const INITIAL_CALL_PRESET = HACKER_CALL_PRESETS[0];

const DEFAULT_SMS_DRAFT: SmsComposerDraft = {
  recipientName: ELDER_GUARDIAN_TARGET.name,
  recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
  senderName: INITIAL_SMS_TEMPLATE.senderName,
  senderNumber: INITIAL_SMS_TEMPLATE.phoneNumber,
  content: INITIAL_SMS_TEMPLATE.content,
  selectedTemplateId: INITIAL_SMS_TEMPLATE.id,
  markedSuspicious: false,
};

const DEFAULT_CALL_DRAFT: CallComposerDraft = {
  recipientName: ELDER_GUARDIAN_TARGET.name,
  recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
  callerName: INITIAL_CALL_PRESET.senderName,
  callerNumber: INITIAL_CALL_PRESET.phoneNumber,
  content: INITIAL_CALL_PRESET.content,
  selectedPresetId: INITIAL_CALL_PRESET.id,
  markedSuspicious: INITIAL_CALL_PRESET.markedSuspicious,
};

export const DualPhoneSimulationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [hackerScreen, setHackerScreen] = useState<HackerScreenId>('home');
  const [hackerHistory, setHackerHistory] = useState<HackerScreenId[]>([]);
  const [smsDraft, setSmsDraft] = useState<SmsComposerDraft>(DEFAULT_SMS_DRAFT);
  const [callDraft, setCallDraft] =
    useState<CallComposerDraft>(DEFAULT_CALL_DRAFT);
  const [sentMessages, setSentMessages] = useState<HackerSentMessage[]>([]);
  const [callHistory, setCallHistory] = useState<HackerCallHistoryItem[]>([]);
  const [sharedCallSession, setSharedCallSession] =
    useState<SharedCallSession | null>(null);
  const [eventBusLog, setEventBusLog] = useState<DualPhoneBusEvent[]>([]);
  const [focusCustomSmsCounter, setFocusCustomSmsCounter] = useState<number>(0);

  const sharedCallRef = useRef<SharedCallSession | null>(null);
  const callDurationTimerRef = useRef<number | null>(null);
  const terminalCallClearTimerRef = useRef<number | null>(null);
  const quickScamSmsIndexRef = useRef<number>(0);
  const quickSuspiciousCallIndexRef = useRef<number>(0);
  const quickOrdinaryCallIndexRef = useRef<number>(0);

  sharedCallRef.current = sharedCallSession;

  const emitBusEvent = useCallback(
    (type: DualPhoneEventType, summary: string, riskLevel?: RiskLevel) => {
      const evt: DualPhoneBusEvent = {
        id: createBusId(),
        type,
        timestampIso: new Date().toISOString(),
        summary,
        riskLevel,
      };
      setEventBusLog((prev) => [evt, ...prev].slice(0, 30));
    },
    []
  );

  const clearSharedCallTimers = useCallback(() => {
    if (callDurationTimerRef.current !== null) {
      window.clearInterval(callDurationTimerRef.current);
      callDurationTimerRef.current = null;
    }
    if (terminalCallClearTimerRef.current !== null) {
      window.clearTimeout(terminalCallClearTimerRef.current);
      terminalCallClearTimerRef.current = null;
    }
  }, []);

  const recordCompletedHackerCall = useCallback(
    (
      session: SharedCallSession,
      finalStatus: 'answered' | 'declined' | 'ended' | 'missed'
    ) => {
      setCallHistory((prev) =>
        [
          {
            id: session.callId,
            callerName: session.callerName,
            phoneNumber: session.phoneNumber,
            content: session.content,
            status: finalStatus,
            durationSeconds: session.durationSeconds,
            startedAtIso: session.startedAtIso,
            detectedRisk: session.detectedRisk,
          },
          ...prev,
        ].slice(0, 25)
      );
    },
    []
  );

  const scheduleTerminalBannerDismiss = useCallback((delayMs: number) => {
    if (terminalCallClearTimerRef.current !== null) {
      window.clearTimeout(terminalCallClearTimerRef.current);
    }
    terminalCallClearTimerRef.current = window.setTimeout(() => {
      setSharedCallSession((curr) =>
        curr &&
        (curr.status === 'declined' ||
          curr.status === 'ended' ||
          curr.status === 'missed')
          ? null
          : curr
      );
    }, delayMs);
  }, []);

  // Connect ElderGuardian simulator callbacks so Receiver actions immediately update Hacker Phone
  const handleReceiverCallAnswered = useCallback(
    (instanceId: string) => {
      const current = sharedCallRef.current;
      if (!current || current.elderInstanceId !== instanceId) return;

      const updated: SharedCallSession = {
        ...current,
        status: 'connected',
        durationSeconds: 0,
      };
      sharedCallRef.current = updated;
      setSharedCallSession(updated);
      emitBusEvent(
        'CALL_ANSWERED',
        `ElderGuardian answered call from ${current.callerName}`
      );
    },
    [emitBusEvent]
  );

  const handleReceiverCallDeclined = useCallback(
    (instanceId: string) => {
      const current = sharedCallRef.current;
      if (!current || current.elderInstanceId !== instanceId) return;

      clearSharedCallTimers();
      const updated: SharedCallSession = {
        ...current,
        status: 'declined',
      };
      sharedCallRef.current = updated;
      setSharedCallSession(updated);
      recordCompletedHackerCall(updated, 'declined');
      emitBusEvent(
        'CALL_DECLINED',
        `ElderGuardian declined call from ${current.callerName}`
      );
      scheduleTerminalBannerDismiss(2600);
    },
    [
      clearSharedCallTimers,
      emitBusEvent,
      recordCompletedHackerCall,
      scheduleTerminalBannerDismiss,
    ]
  );

  const handleReceiverCallEnded = useCallback(
    (instanceId: string) => {
      const current = sharedCallRef.current;
      if (!current || current.elderInstanceId !== instanceId) return;

      clearSharedCallTimers();
      const updated: SharedCallSession = {
        ...current,
        status: 'ended',
      };
      sharedCallRef.current = updated;
      setSharedCallSession(updated);
      recordCompletedHackerCall(updated, 'ended');
      emitBusEvent(
        'CALL_ENDED',
        `Call with ${current.callerName} ended (${current.durationSeconds}s)`
      );
      scheduleTerminalBannerDismiss(1800);
    },
    [
      clearSharedCallTimers,
      emitBusEvent,
      recordCompletedHackerCall,
      scheduleTerminalBannerDismiss,
    ]
  );

  const handleReceiverCallMissed = useCallback(
    (instanceId: string) => {
      const current = sharedCallRef.current;
      if (!current || current.elderInstanceId !== instanceId) return;

      clearSharedCallTimers();
      const updated: SharedCallSession = {
        ...current,
        status: 'missed',
      };
      sharedCallRef.current = updated;
      setSharedCallSession(updated);
      recordCompletedHackerCall(updated, 'missed');
      emitBusEvent(
        'CALL_ENDED',
        `Unanswered call from ${current.callerName} timed out`
      );
      scheduleTerminalBannerDismiss(2000);
    },
    [
      clearSharedCallTimers,
      emitBusEvent,
      recordCompletedHackerCall,
      scheduleTerminalBannerDismiss,
    ]
  );

  const handleReceiverScamDetected = useCallback(
    (event: ProcessedPhoneEvent) => {
      emitBusEvent(
        'SCAM_DETECTED',
        `ElderGuardian flagged ${event.channel.toUpperCase()} from ${event.senderName} (${event.classification.riskLevel})`,
        event.classification.riskLevel
      );
    },
    [emitBusEvent]
  );

  const receiverSim = usePhoneSimulator({
    onCallAnswered: handleReceiverCallAnswered,
    onCallDeclined: handleReceiverCallDeclined,
    onCallEnded: handleReceiverCallEnded,
    onCallMissed: handleReceiverCallMissed,
    onScamDetected: handleReceiverScamDetected,
  });

  const { setSharedCallElapsedSeconds } = receiverSim;

  // Single synchronized 1-second call duration timer shared by BOTH phones
  useEffect(() => {
    if (sharedCallSession?.status !== 'connected') {
      if (callDurationTimerRef.current !== null) {
        window.clearInterval(callDurationTimerRef.current);
        callDurationTimerRef.current = null;
      }
      setSharedCallElapsedSeconds(undefined);
      return;
    }

    setSharedCallElapsedSeconds(sharedCallSession.durationSeconds);

    callDurationTimerRef.current = window.setInterval(() => {
      setSharedCallSession((prev) => {
        if (!prev || prev.status !== 'connected') return prev;
        const nextSeconds = prev.durationSeconds + 1;
        setSharedCallElapsedSeconds(nextSeconds);
        return { ...prev, durationSeconds: nextSeconds };
      });
    }, 1000);

    return () => {
      if (callDurationTimerRef.current !== null) {
        window.clearInterval(callDurationTimerRef.current);
        callDurationTimerRef.current = null;
      }
    };
  }, [sharedCallSession?.status, sharedCallSession?.callId, setSharedCallElapsedSeconds]);

  useEffect(() => {
    return () => {
      clearSharedCallTimers();
    };
  }, [clearSharedCallTimers]);

  // Hacker Phone Navigation
  const openHackerScreen = useCallback((target: HackerScreenId) => {
    setHackerScreen((prev) => {
      if (prev !== target) {
        setHackerHistory((hist) => [...hist.slice(-8), prev]);
      }
      return target;
    });
  }, []);

  const navigateHackerBack = useCallback(() => {
    setHackerHistory((hist) => {
      if (hist.length === 0) {
        setHackerScreen('home');
        return [];
      }
      const next = [...hist];
      const previous = next.pop()!;
      setHackerScreen(previous);
      return next;
    });
  }, []);

  const navigateHackerHome = useCallback(() => {
    setHackerHistory([]);
    setHackerScreen('home');
  }, []);

  // Draft Updaters
  const updateSmsDraft = useCallback((patch: Partial<SmsComposerDraft>) => {
    setSmsDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const applySmsTemplateById = useCallback((templateId: string) => {
    if (templateId === 'custom') {
      setSmsDraft((prev) => ({
        ...prev,
        selectedTemplateId: 'custom',
        senderName: 'Custom Test Sender',
        senderNumber: '+91 90000 00105',
        content: '',
        markedSuspicious: false,
      }));
      return;
    }
    const found = HACKER_SMS_TEMPLATES.find((t) => t.id === templateId);
    if (!found) return;
    setSmsDraft((prev) => ({
      ...prev,
      selectedTemplateId: found.id,
      senderName: found.senderName,
      senderNumber: found.phoneNumber,
      content: found.content,
      markedSuspicious: false,
    }));
  }, []);

  const updateCallDraft = useCallback((patch: Partial<CallComposerDraft>) => {
    setCallDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const applyCallPresetById = useCallback((presetId: string) => {
    const found = HACKER_CALL_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    setCallDraft((prev) => ({
      ...prev,
      selectedPresetId: found.id,
      callerName: found.senderName,
      callerNumber: found.phoneNumber,
      content: found.content,
      markedSuspicious: found.markedSuspicious,
    }));
  }, []);

  const isCallInProgress =
    sharedCallSession?.status === 'ringing' ||
    sharedCallSession?.status === 'connected' ||
    receiverSim.callStage !== null;

  // Core SMS Send Handler (Hacker Phone -> ElderGuardian)
  const executeSmsDelivery = useCallback(
    (payload: {
      senderName: string;
      senderNumber: string;
      content: string;
      markedSuspicious?: boolean;
    }): boolean => {
      const trimmed = payload.content.trim();
      if (!trimmed) return false;

      emitBusEvent('SMS_SENT', `SMS sent from ${payload.senderName}`);

      const { classification } = receiverSim.receiveExternalSms({
        senderName: payload.senderName,
        phoneNumber: payload.senderNumber,
        content: trimmed,
        markedSuspicious: payload.markedSuspicious,
      });

      emitBusEvent(
        'SMS_RECEIVED',
        `ElderGuardian received SMS from ${payload.senderName}`,
        classification.riskLevel
      );

      const sentRecord: HackerSentMessage = {
        id: createBusId(),
        recipientName: ELDER_GUARDIAN_TARGET.name,
        recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
        senderName: payload.senderName,
        senderNumber: payload.senderNumber,
        content: trimmed,
        sentAtIso: new Date().toISOString(),
        detectedRisk: classification.riskLevel,
      };
      setSentMessages((prev) => [sentRecord, ...prev].slice(0, 30));
      return true;
    },
    [emitBusEvent, receiverSim]
  );

  const sendSmsFromHacker = useCallback((): boolean => {
    return executeSmsDelivery({
      senderName: smsDraft.senderName,
      senderNumber: smsDraft.senderNumber,
      content: smsDraft.content,
      markedSuspicious: smsDraft.markedSuspicious,
    });
  }, [executeSmsDelivery, smsDraft]);

  // Core Call Initiation Handler (Hacker Phone -> ElderGuardian)
  const executeCallInitiation = useCallback(
    (payload: {
      callerName: string;
      callerNumber: string;
      content: string;
      markedSuspicious: boolean;
    }): boolean => {
      if (
        sharedCallRef.current?.status === 'ringing' ||
        sharedCallRef.current?.status === 'connected'
      ) {
        return false;
      }

      clearSharedCallTimers();

      const callResult = receiverSim.receiveExternalCall({
        callerName: payload.callerName,
        phoneNumber: payload.callerNumber,
        content:
          payload.content.trim() ||
          'Simulated call initiated from Hacker Phone testing simulator.',
        markedSuspicious: payload.markedSuspicious,
      });

      if (!callResult) {
        return false;
      }

      const newSession: SharedCallSession = {
        callId: createBusId(),
        elderInstanceId: callResult.instanceId,
        callerName: payload.callerName.trim() || 'Unknown Caller',
        phoneNumber: payload.callerNumber.trim() || '+91 90000 88410',
        content:
          payload.content.trim() ||
          'Simulated call initiated from Hacker Phone testing simulator.',
        markedSuspicious: payload.markedSuspicious,
        detectedRisk: callResult.classification.riskLevel,
        status: 'ringing',
        startedAtIso: new Date().toISOString(),
        durationSeconds: 0,
      };

      sharedCallRef.current = newSession;
      setSharedCallSession(newSession);

      emitBusEvent(
        'CALL_STARTED',
        `Outgoing call started as ${newSession.callerName} (${newSession.phoneNumber})`,
        callResult.classification.riskLevel
      );

      return true;
    },
    [clearSharedCallTimers, emitBusEvent, receiverSim]
  );

  const startCallFromHacker = useCallback((): boolean => {
    return executeCallInitiation({
      callerName: callDraft.callerName,
      callerNumber: callDraft.callerNumber,
      content: callDraft.content,
      markedSuspicious: callDraft.markedSuspicious,
    });
  }, [callDraft, executeCallInitiation]);

  const endCallFromHacker = useCallback(() => {
    const current = sharedCallRef.current;
    if (!current) return;

    clearSharedCallTimers();
    receiverSim.terminateExternalCallFromRemote();

    const updated: SharedCallSession = {
      ...current,
      status: 'ended',
    };
    sharedCallRef.current = updated;
    setSharedCallSession(updated);
    recordCompletedHackerCall(updated, 'ended');
    emitBusEvent(
      'CALL_ENDED',
      `Hacker Phone ended call (${current.callerName})`
    );
    scheduleTerminalBannerDismiss(1500);
  }, [
    clearSharedCallTimers,
    emitBusEvent,
    receiverSim,
    recordCompletedHackerCall,
    scheduleTerminalBannerDismiss,
  ]);

  const dismissTerminalCallBanner = useCallback(() => {
    if (
      sharedCallRef.current &&
      sharedCallRef.current.status !== 'ringing' &&
      sharedCallRef.current.status !== 'connected'
    ) {
      clearSharedCallTimers();
      sharedCallRef.current = null;
      setSharedCallSession(null);
    }
  }, [clearSharedCallTimers]);

  // Populate Messages or Phone app from Scenario Library
  const loadScenarioIntoHackerApp = useCallback(
    (scenario: HackerLibraryScenario) => {
      if (scenario.channel === 'sms') {
        setSmsDraft({
          recipientName: ELDER_GUARDIAN_TARGET.name,
          recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
          senderName: scenario.senderName,
          senderNumber: scenario.phoneNumber,
          content: scenario.content,
          selectedTemplateId: scenario.id,
          markedSuspicious: false,
        });
        openHackerScreen('messages');
      } else {
        setCallDraft({
          recipientName: ELDER_GUARDIAN_TARGET.name,
          recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
          callerName: scenario.senderName,
          callerNumber: scenario.phoneNumber,
          content: scenario.content,
          selectedPresetId: scenario.id,
          markedSuspicious: scenario.markedSuspicious,
        });
        openHackerScreen('phone');
      }
    },
    [openHackerScreen]
  );

  const loadContactIntoMessages = useCallback(
    (contact: HackerContactPersona) => {
      const senderName = contact.isReceiverTarget
        ? 'Bank Support'
        : contact.name;
      const senderNumber = contact.isReceiverTarget
        ? '+91 90000 00299'
        : contact.phoneNumber;
      setSmsDraft((prev) => ({
        ...prev,
        senderName,
        senderNumber,
        content: contact.defaultSmsText || prev.content,
        selectedTemplateId: 'custom',
        markedSuspicious: false,
      }));
      openHackerScreen('messages');
    },
    [openHackerScreen]
  );

  const loadContactIntoPhone = useCallback(
    (contact: HackerContactPersona) => {
      const callerName = contact.isReceiverTarget
        ? 'Bank Support'
        : contact.name;
      const callerNumber = contact.isReceiverTarget
        ? '+91 90000 00299'
        : contact.phoneNumber;
      setCallDraft((prev) => ({
        ...prev,
        callerName,
        callerNumber,
        content: contact.defaultCallPitch || prev.content,
        selectedPresetId: 'custom',
        markedSuspicious: contact.markedSuspicious,
      }));
      openHackerScreen('phone');
    },
    [openHackerScreen]
  );

  // Quick Testing Controls (Requirement 8)
  const triggerPresetScamSmsQuick = useCallback(() => {
    const scamTemplates = HACKER_SCENARIO_LIBRARY.filter(
      (s) => s.category === 'sms_scams'
    );
    const chosen =
      scamTemplates[quickScamSmsIndexRef.current % scamTemplates.length];
    quickScamSmsIndexRef.current += 1;

    setSmsDraft({
      recipientName: ELDER_GUARDIAN_TARGET.name,
      recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
      senderName: chosen.senderName,
      senderNumber: chosen.phoneNumber,
      content: chosen.content,
      selectedTemplateId: chosen.id,
      markedSuspicious: false,
    });

    executeSmsDelivery({
      senderName: chosen.senderName,
      senderNumber: chosen.phoneNumber,
      content: chosen.content,
      markedSuspicious: false,
    });
  }, [executeSmsDelivery]);

  const openCustomSmsQuick = useCallback(() => {
    setSmsDraft((prev) => ({
      ...prev,
      selectedTemplateId: 'custom',
      senderName:
        prev.selectedTemplateId === 'custom'
          ? prev.senderName
          : 'Custom Test Sender',
      senderNumber: '+91 90000 00105',
      content:
        prev.selectedTemplateId === 'custom' && prev.content.trim().length > 0
          ? prev.content
          : '',
      markedSuspicious: false,
    }));
    setFocusCustomSmsCounter((c) => c + 1);
    openHackerScreen('messages');
  }, [openHackerScreen]);

  const triggerSuspiciousCallQuick = useCallback(() => {
    if (isCallInProgress) return;
    const suspiciousCalls = HACKER_SCENARIO_LIBRARY.filter(
      (s) => s.category === 'suspicious_calls'
    );
    const chosen =
      suspiciousCalls[
        quickSuspiciousCallIndexRef.current % suspiciousCalls.length
      ];
    quickSuspiciousCallIndexRef.current += 1;

    setCallDraft({
      recipientName: ELDER_GUARDIAN_TARGET.name,
      recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
      callerName: chosen.senderName,
      callerNumber: chosen.phoneNumber,
      content: chosen.content,
      selectedPresetId: chosen.id,
      markedSuspicious: true,
    });

    executeCallInitiation({
      callerName: chosen.senderName,
      callerNumber: chosen.phoneNumber,
      content: chosen.content,
      markedSuspicious: true,
    });
  }, [executeCallInitiation, isCallInProgress]);

  const triggerOrdinaryCallQuick = useCallback(() => {
    if (isCallInProgress) return;
    const safeCalls = HACKER_SCENARIO_LIBRARY.filter(
      (s) => s.category === 'safe_calls'
    );
    const chosen =
      safeCalls[quickOrdinaryCallIndexRef.current % safeCalls.length];
    quickOrdinaryCallIndexRef.current += 1;

    setCallDraft({
      recipientName: ELDER_GUARDIAN_TARGET.name,
      recipientNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
      callerName: chosen.senderName,
      callerNumber: chosen.phoneNumber,
      content: chosen.content,
      selectedPresetId: chosen.id,
      markedSuspicious: false,
    });

    executeCallInitiation({
      callerName: chosen.senderName,
      callerNumber: chosen.phoneNumber,
      content: chosen.content,
      markedSuspicious: false,
    });
  }, [executeCallInitiation, isCallInProgress]);

  const resetCurrentScenario = useCallback(() => {
    clearSharedCallTimers();
    sharedCallRef.current = null;
    setSharedCallSession(null);
    receiverSim.resetCurrentScenarioOnReceiver();
    setSmsDraft(DEFAULT_SMS_DRAFT);
    setCallDraft(DEFAULT_CALL_DRAFT);
    setHackerHistory([]);
    setHackerScreen('home');
    emitBusEvent(
      'SCENARIO_RESET',
      'Reset active call, scam alerts, and simulator drafts'
    );
  }, [clearSharedCallTimers, emitBusEvent, receiverSim]);

  const contextValue = useMemo<DualPhoneSimulationContextValue>(
    () => ({
      receiverSim,
      hackerScreen,
      openHackerScreen,
      navigateHackerBack,
      navigateHackerHome,
      smsDraft,
      updateSmsDraft,
      applySmsTemplateById,
      callDraft,
      updateCallDraft,
      applyCallPresetById,
      sentMessages,
      callHistory,
      sharedCallSession,
      dismissTerminalCallBanner,
      eventBusLog,
      isCallInProgress,
      focusCustomSmsCounter,
      sendSmsFromHacker,
      startCallFromHacker,
      endCallFromHacker,
      loadScenarioIntoHackerApp,
      loadContactIntoMessages,
      loadContactIntoPhone,
      triggerPresetScamSmsQuick,
      openCustomSmsQuick,
      triggerSuspiciousCallQuick,
      triggerOrdinaryCallQuick,
      resetCurrentScenario,
    }),
    [
      receiverSim,
      hackerScreen,
      openHackerScreen,
      navigateHackerBack,
      navigateHackerHome,
      smsDraft,
      updateSmsDraft,
      applySmsTemplateById,
      callDraft,
      updateCallDraft,
      applyCallPresetById,
      sentMessages,
      callHistory,
      sharedCallSession,
      dismissTerminalCallBanner,
      eventBusLog,
      isCallInProgress,
      focusCustomSmsCounter,
      sendSmsFromHacker,
      startCallFromHacker,
      endCallFromHacker,
      loadScenarioIntoHackerApp,
      loadContactIntoMessages,
      loadContactIntoPhone,
      triggerPresetScamSmsQuick,
      openCustomSmsQuick,
      triggerSuspiciousCallQuick,
      triggerOrdinaryCallQuick,
      resetCurrentScenario,
    ]
  );

  return (
    <DualPhoneSimulationContext.Provider value={contextValue}>
      {children}
    </DualPhoneSimulationContext.Provider>
  );
};

export function useDualPhoneSimulation(): DualPhoneSimulationContextValue {
  const ctx = useContext(DualPhoneSimulationContext);
  if (!ctx) {
    throw new Error(
      'useDualPhoneSimulation must be used inside DualPhoneSimulationProvider'
    );
  }
  return ctx;
}
