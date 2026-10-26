import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gardenFlowersImg from '../assets/images/gallery_garden_flowers_1793010397467.jpg';
import morningTeaImg from '../assets/images/gallery_morning_tea_1793010396628.jpg';
import parkWalkwayImg from '../assets/images/gallery_park_walkway_1793010397509.jpg';
import { getTranslation } from '../i18n/translations';
import { buildScenarioDeck, getNextEventDelayMs } from '../services/messageSimulator';
import { ringtoneService } from '../services/ringtoneService';
import { getScamClassifier } from '../services/scamClassifier';
import { SpeechStatusSnapshot, speechService } from '../services/speechService';
import {
  CapturedPhoto,
  LanguageCode,
  PhoneScreenId,
  ProcessedPhoneEvent,
  RiskLevel,
  SamplePhoneScenario,
  StoredPhoneEvent,
  UserPreferences,
  WallpaperId,
} from '../types';
import { useLocalStorage } from './useLocalStorage';

const PREFS_KEY = 'eldershield_phone_prefs_v2';
const EVENTS_KEY = 'eldershield_phone_events_v2';
const MAX_STORED_EVENTS = 60;

const DEFAULT_PREFS: UserPreferences = {
  setupCompleted: false,
  language: 'en',
  voiceEnabled: true,
  ringtoneEnabled: true,
  speechRate: 0.9,
  textSize: 'normal',
  wallpaper: 'misty_dawn',
};

const INITIAL_GALLERY_PHOTOS: CapturedPhoto[] = [
  {
    id: 'photo-tea',
    titleKey: 'tea',
    imageUrl: morningTeaImg,
    capturedAtIso: '2026-10-25T08:15:00.000Z',
  },
  {
    id: 'photo-garden',
    titleKey: 'garden',
    imageUrl: gardenFlowersImg,
    capturedAtIso: '2026-10-24T07:40:00.000Z',
  },
  {
    id: 'photo-park',
    titleKey: 'park',
    imageUrl: parkWalkwayImg,
    capturedAtIso: '2026-10-23T06:50:00.000Z',
  },
];

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function usePhoneSimulator() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    PREFS_KEY,
    DEFAULT_PREFS
  );
  const [storedEvents, setStoredEvents] = useLocalStorage<StoredPhoneEvent[]>(
    EVENTS_KEY,
    []
  );

  // Android OS UI state
  const [currentScreen, setCurrentScreen] = useState<PhoneScreenId>('home');
  const [screenHistory, setScreenHistory] = useState<PhoneScreenId[]>([]);
  const [recentApps, setRecentApps] = useState<PhoneScreenId[]>([]);
  const [isRecentsOpen, setIsRecentsOpen] = useState<boolean>(false);
  const [isShadeOpen, setIsShadeOpen] = useState<boolean>(false);
  const [wifiEnabled, setWifiEnabled] = useState<boolean>(true);
  const [focusedEventId, setFocusedEventId] = useState<string | null>(null);

  // Simulation & Alert Overlay state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [simulationTick, setSimulationTick] = useState<number>(0);
  const [headsUpEventId, setHeadsUpEventId] = useState<string | null>(null);
  const [alertQueue, setAlertQueue] = useState<string[]>([]);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [callStage, setCallStage] = useState<'ringing' | 'connected' | null>(null);
  const [userReplies, setUserReplies] = useState<Record<string, string[]>>({});
  const [galleryPhotos, setGalleryPhotos] = useState<CapturedPhoto[]>(
    INITIAL_GALLERY_PHOTOS
  );

  const [speechSnapshot, setSpeechSnapshot] = useState<SpeechStatusSnapshot>({
    state: 'idle',
    matchedVoiceName: null,
    availableVoicesCount: 0,
  });

  // Refs for clean non-duplicating timers & alert tracking
  const arrivalTimerRef = useRef<number | null>(null);
  const alertRevealTimerRef = useRef<number | null>(null);
  const headsUpTimerRef = useRef<number | null>(null);
  const missedCallTimerRef = useRef<number | null>(null);
  const deckRef = useRef<SamplePhoneScenario[]>([]);
  const recentScenarioIdsRef = useRef<string[]>([]);
  const alertedInstanceIdsRef = useRef<Set<string>>(new Set());
  const narratedAlertIdsRef = useRef<Set<string>>(new Set());
  const sessionEventCountRef = useRef<number>(0);
  const prefsRef = useRef<UserPreferences>(preferences);

  prefsRef.current = preferences;

  const classifier = getScamClassifier();

  // Clean up any leftover 'ringing' call status from previous browser session on mount
  useEffect(() => {
    setStoredEvents((prev) =>
      prev.some((e) => e.callOutcome === 'ringing')
        ? prev.map((e) =>
            e.callOutcome === 'ringing' ? { ...e, callOutcome: 'missed' } : e
          )
        : prev
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync HTML attributes for language & text scaling
  useEffect(() => {
    const root = document.documentElement;
    root.lang = preferences.language;
    root.dataset.textSize = preferences.textSize === 'large' ? 'large' : 'normal';
  }, [preferences.language, preferences.textSize]);

  // Subscribe to browser speech synthesis status
  useEffect(() => {
    const unsub = speechService.subscribe((snap) => {
      setSpeechSnapshot(snap);
    });
    speechService.refreshVoiceAvailability(
      preferences.language,
      preferences.voiceEnabled
    );
    return () => unsub();
  }, [preferences.language, preferences.voiceEnabled]);

  // Dynamically classify all events in the currently selected language
  const processedEvents: ProcessedPhoneEvent[] = useMemo(() => {
    return storedEvents.map((evt) => ({
      ...evt,
      classification: classifier.classifySync({
        channel: evt.channel,
        senderName: evt.senderName,
        phoneNumber: evt.phoneNumber,
        content: evt.content,
        targetLanguage: preferences.language,
      }),
    }));
  }, [storedEvents, preferences.language, classifier]);

  // Active full-screen scam alert is the head of the safe FIFO alertQueue
  const activeAlertId: string | null = alertQueue.length > 0 ? alertQueue[0] : null;

  const activeAlertEvent: ProcessedPhoneEvent | null = useMemo(() => {
    if (!activeAlertId) return null;
    return processedEvents.find((e) => e.instanceId === activeAlertId) || null;
  }, [activeAlertId, processedEvents]);

  const activeCallEvent: ProcessedPhoneEvent | null = useMemo(() => {
    if (!activeCallId) return null;
    return processedEvents.find((e) => e.instanceId === activeCallId) || null;
  }, [activeCallId, processedEvents]);

  const headsUpEvent: ProcessedPhoneEvent | null = useMemo(() => {
    if (!headsUpEventId) return null;
    return processedEvents.find((e) => e.instanceId === headsUpEventId) || null;
  }, [headsUpEventId, processedEvents]);

  // Automatically narrate whenever a new active Full-Screen Scam Alert opens
  useEffect(() => {
    if (!activeAlertEvent) return;
    // Stop any call ringtone immediately so spoken warning has zero audio competition
    ringtoneService.stopRinging();

    if (narratedAlertIdsRef.current.has(activeAlertEvent.instanceId)) {
      return;
    }
    narratedAlertIdsRef.current.add(activeAlertEvent.instanceId);

    if (prefsRef.current.voiceEnabled) {
      void speechService.speak(
        activeAlertEvent.classification.spokenScript,
        prefsRef.current.language,
        prefsRef.current.speechRate,
        prefsRef.current.voiceEnabled
      );
    }
  }, [activeAlertEvent]);

  // Manage ringtone for ordinary incoming calls (or when alert is dismissed while still ringing)
  useEffect(() => {
    if (
      activeCallEvent &&
      callStage === 'ringing' &&
      !activeAlertEvent &&
      preferences.ringtoneEnabled
    ) {
      ringtoneService.startRinging(true);
    } else {
      ringtoneService.stopRinging();
    }
    return () => {
      ringtoneService.stopRinging();
    };
  }, [activeCallEvent, callStage, activeAlertEvent, preferences.ringtoneEnabled]);

  const clearTimers = useCallback(() => {
    if (arrivalTimerRef.current !== null) {
      window.clearTimeout(arrivalTimerRef.current);
      arrivalTimerRef.current = null;
    }
    if (alertRevealTimerRef.current !== null) {
      window.clearTimeout(alertRevealTimerRef.current);
      alertRevealTimerRef.current = null;
    }
    if (headsUpTimerRef.current !== null) {
      window.clearTimeout(headsUpTimerRef.current);
      headsUpTimerRef.current = null;
    }
    if (missedCallTimerRef.current !== null) {
      window.clearTimeout(missedCallTimerRef.current);
      missedCallTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
      speechService.cancel();
      ringtoneService.stopRinging();
    };
  }, [clearTimers]);

  // Core helper to process and dispatch one simulated scenario
  const dispatchScenario = useCallback(
    (scenario: SamplePhoneScenario) => {
      const instanceId = generateId();
      const nowIso = new Date().toISOString();
      const currentPrefs = prefsRef.current;

      const classification = classifier.classifySync({
        channel: scenario.channel,
        senderName: scenario.senderName,
        phoneNumber: scenario.phoneNumber,
        content: scenario.content,
        targetLanguage: currentPrefs.language,
      });

      const isSuspicious =
        classification.riskLevel === RiskLevel.HIGH_RISK ||
        classification.riskLevel === RiskLevel.SUSPICIOUS;

      const newEvent: StoredPhoneEvent = {
        instanceId,
        scenarioId: scenario.id,
        channel: scenario.channel,
        senderName: scenario.senderName,
        phoneNumber: scenario.phoneNumber,
        content: scenario.content,
        receivedAtIso: nowIso,
        read: false,
        callOutcome: scenario.channel === 'call' ? 'ringing' : undefined,
      };

      setStoredEvents((prev) => [...prev, newEvent].slice(-MAX_STORED_EVENTS));
      sessionEventCountRef.current += 1;
      setSimulationTick((t) => t + 1);

      if (scenario.channel === 'call') {
        setHeadsUpEventId(null);
        setActiveCallId(instanceId);
        setCallStage('ringing');

        // Auto-timeout unanswered ringing call after 22s so simulation never stalls
        if (missedCallTimerRef.current !== null) {
          window.clearTimeout(missedCallTimerRef.current);
        }
        missedCallTimerRef.current = window.setTimeout(() => {
          setStoredEvents((prev) =>
            prev.map((e) =>
              e.instanceId === instanceId && e.callOutcome === 'ringing'
                ? { ...e, callOutcome: 'missed' }
                : e
            )
          );
          setActiveCallId((curr) => (curr === instanceId ? null : curr));
          setCallStage((curr) => (curr === 'ringing' ? null : curr));
        }, 22000);

        if (isSuspicious && !alertedInstanceIdsRef.current.has(instanceId)) {
          alertedInstanceIdsRef.current.add(instanceId);
          // Let the Incoming Call Screen visibly ring for 2.2s first so user sees the call arriving
          if (alertRevealTimerRef.current !== null) {
            window.clearTimeout(alertRevealTimerRef.current);
          }
          alertRevealTimerRef.current = window.setTimeout(() => {
            setAlertQueue((prev) =>
              prev.includes(instanceId) ? prev : [...prev, instanceId]
            );
          }, 2200);
        }
        return;
      }

      // SMS or WhatsApp arrival: show realistic Android Heads-Up Notification first
      setHeadsUpEventId(instanceId);
      if (headsUpTimerRef.current !== null) {
        window.clearTimeout(headsUpTimerRef.current);
      }

      if (isSuspicious && !alertedInstanceIdsRef.current.has(instanceId)) {
        alertedInstanceIdsRef.current.add(instanceId);
        // Brief 750ms beat so user sees the incoming notification banner before full-screen shield alert opens
        alertRevealTimerRef.current = window.setTimeout(() => {
          setHeadsUpEventId(null);
          setAlertQueue((prev) =>
            prev.includes(instanceId) ? prev : [...prev, instanceId]
          );
        }, 750);
      } else {
        // Ordinary harmless message: show normal notification for 4.2s, no scam alert
        headsUpTimerRef.current = window.setTimeout(() => {
          setHeadsUpEventId((curr) => (curr === instanceId ? null : curr));
        }, 4200);
      }
    },
    [classifier, setStoredEvents]
  );

  const pullNextScenario = useCallback((): SamplePhoneScenario => {
    if (deckRef.current.length === 0) {
      deckRef.current = buildScenarioDeck(
        prefsRef.current.language,
        recentScenarioIdsRef.current.slice(-12)
      );
    }
    const next = deckRef.current.shift()!;
    recentScenarioIdsRef.current = [
      ...recentScenarioIdsRef.current.slice(-24),
      next.id,
    ];
    return next;
  }, []);

  // Automatic phone simulation loop: waits cleanly while any full-screen alert or call is active
  const isBlockingOverlayActive = activeAlertId !== null || activeCallId !== null;

  useEffect(() => {
    if (!preferences.setupCompleted || isPaused || isBlockingOverlayActive) {
      if (arrivalTimerRef.current !== null) {
        window.clearTimeout(arrivalTimerRef.current);
        arrivalTimerRef.current = null;
      }
      return;
    }

    const delay = getNextEventDelayMs(sessionEventCountRef.current === 0);
    arrivalTimerRef.current = window.setTimeout(() => {
      const scenario = pullNextScenario();
      dispatchScenario(scenario);
    }, delay);

    return () => {
      if (arrivalTimerRef.current !== null) {
        window.clearTimeout(arrivalTimerRef.current);
        arrivalTimerRef.current = null;
      }
    };
  }, [
    preferences.setupCompleted,
    isPaused,
    isBlockingOverlayActive,
    simulationTick,
    pullNextScenario,
    dispatchScenario,
  ]);

  // Navigation Actions
  const openApp = useCallback(
    (target: PhoneScreenId, eventIdToFocus: string | null = null) => {
      setIsShadeOpen(false);
      setIsRecentsOpen(false);
      if (eventIdToFocus) {
        setFocusedEventId(eventIdToFocus);
        setStoredEvents((prev) =>
          prev.map((e) =>
            e.instanceId === eventIdToFocus ? { ...e, read: true } : e
          )
        );
      } else {
        setFocusedEventId(null);
      }

      setCurrentScreen((prev) => {
        if (prev !== target && prev !== 'lock') {
          setScreenHistory((hist) => [...hist.slice(-10), prev]);
        }
        return target;
      });

      if (target !== 'home' && target !== 'lock') {
        setRecentApps((prev) => [
          target,
          ...prev.filter((app) => app !== target),
        ].slice(0, 6));
      }
    },
    [setStoredEvents]
  );

  const navigateBack = useCallback(() => {
    if (isShadeOpen) {
      setIsShadeOpen(false);
      return;
    }
    if (isRecentsOpen) {
      setIsRecentsOpen(false);
      return;
    }
    if (focusedEventId !== null) {
      setFocusedEventId(null);
      return;
    }
    if (currentScreen === 'lock' || currentScreen === 'home') {
      return;
    }
    setScreenHistory((hist) => {
      if (hist.length === 0) {
        setCurrentScreen('home');
        return [];
      }
      const nextHist = [...hist];
      const previous = nextHist.pop()!;
      setCurrentScreen(previous);
      return nextHist;
    });
  }, [isShadeOpen, isRecentsOpen, focusedEventId, currentScreen]);

  const navigateHome = useCallback(() => {
    setIsShadeOpen(false);
    setIsRecentsOpen(false);
    setFocusedEventId(null);
    if (currentScreen !== 'lock') {
      setScreenHistory([]);
      setCurrentScreen('home');
    } else {
      setCurrentScreen('home');
    }
  }, [currentScreen]);

  const toggleLockScreen = useCallback(() => {
    setIsShadeOpen(false);
    setIsRecentsOpen(false);
    setCurrentScreen((prev) => (prev === 'lock' ? 'home' : 'lock'));
  }, []);

  const unlockPhone = useCallback(() => {
    speechService.unlockFromUserGesture();
    ringtoneService.unlock();
    setCurrentScreen('home');
  }, []);

  // Full-Screen Scam Alert Actions
  const dismissActiveAlert = useCallback(() => {
    speechService.cancel();
    setAlertQueue((prev) => prev.slice(1));
  }, []);

  const viewAlertDetails = useCallback(() => {
    if (!activeAlertEvent) return;
    speechService.cancel();
    const evt = activeAlertEvent;
    setAlertQueue((prev) => prev.slice(1));

    if (evt.channel === 'call') {
      // If call is still ringing on screen, user returns directly to the call screen;
      // otherwise open the Phone app Recents tab focused on this call
      if (activeCallId !== evt.instanceId) {
        openApp('phone', evt.instanceId);
      }
    } else if (evt.channel === 'whatsapp') {
      openApp('whatsapp', evt.instanceId);
    } else {
      openApp('messages', evt.instanceId);
    }
  }, [activeAlertEvent, activeCallId, openApp]);

  const reopenScamAlertForEvent = useCallback((instanceId: string) => {
    speechService.unlockFromUserGesture();
    narratedAlertIdsRef.current.delete(instanceId);
    setAlertQueue((prev) =>
      prev.includes(instanceId) ? prev : [instanceId, ...prev]
    );
  }, []);

  // Call Actions
  const answerActiveCall = useCallback(() => {
    if (!activeCallId) return;
    if (missedCallTimerRef.current !== null) {
      window.clearTimeout(missedCallTimerRef.current);
      missedCallTimerRef.current = null;
    }
    ringtoneService.stopRinging();
    setCallStage('connected');
    setStoredEvents((prev) =>
      prev.map((e) =>
        e.instanceId === activeCallId
          ? { ...e, read: true, callOutcome: 'answered' }
          : e
      )
    );
  }, [activeCallId, setStoredEvents]);

  const endOrDeclineActiveCall = useCallback(() => {
    if (!activeCallId) return;
    if (missedCallTimerRef.current !== null) {
      window.clearTimeout(missedCallTimerRef.current);
      missedCallTimerRef.current = null;
    }
    if (alertRevealTimerRef.current !== null) {
      window.clearTimeout(alertRevealTimerRef.current);
      alertRevealTimerRef.current = null;
    }
    ringtoneService.stopRinging();
    const outcome = callStage === 'connected' ? 'answered' : 'declined';
    const closingId = activeCallId;
    setStoredEvents((prev) =>
      prev.map((e) =>
        e.instanceId === closingId
          ? { ...e, read: true, callOutcome: outcome }
          : e
      )
    );
    setActiveCallId(null);
    setCallStage(null);
  }, [activeCallId, callStage, setStoredEvents]);

  const startSimulatedOutboundCall = useCallback(
    (name: string, phoneNumber: string, safeSummary: string) => {
      ringtoneService.unlock();
      const instanceId = generateId();
      const evt: StoredPhoneEvent = {
        instanceId,
        scenarioId: 'manual-call',
        channel: 'call',
        senderName: name,
        phoneNumber,
        content: safeSummary,
        receivedAtIso: new Date().toISOString(),
        read: true,
        callOutcome: 'answered',
      };
      setStoredEvents((prev) => [...prev, evt].slice(-MAX_STORED_EVENTS));
      setActiveCallId(instanceId);
      setCallStage('connected');
    },
    [setStoredEvents]
  );

  // Setup, Language, Voice & Settings Actions
  const completeSetup = useCallback(
    (language: LanguageCode) => {
      speechService.unlockFromUserGesture();
      ringtoneService.unlock();
      deckRef.current = buildScenarioDeck(language);
      setIsPaused(false);
      setCurrentScreen('home');
      setPreferences((prev) => ({
        ...prev,
        language,
        setupCompleted: true,
      }));
    },
    [setPreferences]
  );

  const changeLanguage = useCallback(
    (language: LanguageCode) => {
      speechService.cancel();
      deckRef.current = buildScenarioDeck(
        language,
        recentScenarioIdsRef.current.slice(-10)
      );
      setPreferences((prev) => ({ ...prev, language }));
      speechService.refreshVoiceAvailability(
        language,
        prefsRef.current.voiceEnabled
      );
    },
    [setPreferences]
  );

  const toggleVoice = useCallback(() => {
    setPreferences((prev) => {
      const next = !prev.voiceEnabled;
      if (next) {
        speechService.unlockFromUserGesture();
      } else {
        speechService.cancel();
      }
      speechService.refreshVoiceAvailability(prev.language, next);
      return { ...prev, voiceEnabled: next };
    });
  }, [setPreferences]);

  const enableVoiceAndNarrate = useCallback(() => {
    speechService.unlockFromUserGesture();
    ringtoneService.unlock();
    setPreferences((prev) => ({ ...prev, voiceEnabled: true }));
    if (activeAlertEvent) {
      void speechService.speak(
        activeAlertEvent.classification.spokenScript,
        prefsRef.current.language,
        prefsRef.current.speechRate,
        true
      );
    }
  }, [activeAlertEvent, setPreferences]);

  const replayActiveAlertVoice = useCallback(() => {
    if (!activeAlertEvent) return;
    speechService.unlockFromUserGesture();
    if (!prefsRef.current.voiceEnabled) {
      setPreferences((prev) => ({ ...prev, voiceEnabled: true }));
    }
    void speechService.speak(
      activeAlertEvent.classification.spokenScript,
      prefsRef.current.language,
      prefsRef.current.speechRate,
      true
    );
  }, [activeAlertEvent, setPreferences]);

  const testVoiceSample = useCallback(() => {
    speechService.unlockFromUserGesture();
    const t = getTranslation(prefsRef.current.language);
    void speechService.speak(
      t.testVoiceSample,
      prefsRef.current.language,
      prefsRef.current.speechRate,
      true
    );
  }, []);

  const setSpeechRate = useCallback(
    (rate: number) => {
      setPreferences((prev) => ({ ...prev, speechRate: rate }));
    },
    [setPreferences]
  );

  const toggleRingtone = useCallback(() => {
    ringtoneService.unlock();
    setPreferences((prev) => {
      const next = !prev.ringtoneEnabled;
      if (!next) ringtoneService.stopRinging();
      return { ...prev, ringtoneEnabled: next };
    });
  }, [setPreferences]);

  const toggleLargeText = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      textSize: prev.textSize === 'large' ? 'normal' : 'large',
    }));
  }, [setPreferences]);

  const setWallpaper = useCallback(
    (wallpaper: WallpaperId) => {
      setPreferences((prev) => ({ ...prev, wallpaper }));
    },
    [setPreferences]
  );

  const togglePauseSimulation = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      if (next) {
        speechService.cancel();
        ringtoneService.stopRinging();
      }
      return next;
    });
  }, []);

  const triggerNextEventNow = useCallback(() => {
    speechService.unlockFromUserGesture();
    ringtoneService.unlock();
    const scenario = pullNextScenario();
    dispatchScenario(scenario);
  }, [pullNextScenario, dispatchScenario]);

  const restartSimulation = useCallback(() => {
    clearTimers();
    speechService.cancel();
    ringtoneService.stopRinging();
    alertedInstanceIdsRef.current.clear();
    narratedAlertIdsRef.current.clear();
    recentScenarioIdsRef.current = [];
    deckRef.current = buildScenarioDeck(prefsRef.current.language);
    setAlertQueue([]);
    setActiveCallId(null);
    setCallStage(null);
    setHeadsUpEventId(null);
    setFocusedEventId(null);
    setStoredEvents([]);
    setIsPaused(false);
    setCurrentScreen('home');
  }, [clearTimers, setStoredEvents]);

  const clearNotifications = useCallback(() => {
    setHeadsUpEventId(null);
    setStoredEvents((prev) => prev.map((e) => ({ ...e, read: true })));
  }, [setStoredEvents]);

  const clearAllHistory = useCallback(() => {
    setHeadsUpEventId(null);
    setFocusedEventId(null);
    setStoredEvents([]);
  }, [setStoredEvents]);

  const resetSetup = useCallback(() => {
    clearTimers();
    speechService.cancel();
    ringtoneService.stopRinging();
    alertedInstanceIdsRef.current.clear();
    narratedAlertIdsRef.current.clear();
    setAlertQueue([]);
    setActiveCallId(null);
    setCallStage(null);
    setHeadsUpEventId(null);
    setFocusedEventId(null);
    setStoredEvents([]);
    setPreferences(DEFAULT_PREFS);
  }, [clearTimers, setStoredEvents, setPreferences]);

  const sendQuickReply = useCallback((instanceId: string, replyText: string) => {
    setUserReplies((prev) => ({
      ...prev,
      [instanceId]: [...(prev[instanceId] || []), replyText],
    }));
  }, []);

  const captureCameraSnapshot = useCallback(() => {
    const newPhoto: CapturedPhoto = {
      id: `snap-${Date.now()}`,
      titleKey: 'snapshot',
      capturedAtIso: new Date().toISOString(),
    };
    setGalleryPhotos((prev) => [newPhoto, ...prev]);
  }, []);

  // Unread badge counts per app
  const unreadCounts = useMemo(() => {
    let sms = 0;
    let whatsapp = 0;
    let calls = 0;
    let flagged = 0;
    for (const evt of processedEvents) {
      if (!evt.read) {
        if (evt.channel === 'sms') sms++;
        if (evt.channel === 'whatsapp') whatsapp++;
        if (evt.channel === 'call') calls++;
      }
      if (evt.classification.riskLevel !== RiskLevel.NO_OBVIOUS_SIGNS) {
        flagged++;
      }
    }
    return { sms, whatsapp, calls, flagged, totalUnread: sms + whatsapp + calls };
  }, [processedEvents]);

  return {
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
    speechSnapshot,
    unreadCounts,
    userReplies,
    galleryPhotos,
    completeSetup,
    openApp,
    navigateBack,
    navigateHome,
    toggleLockScreen,
    unlockPhone,
    dismissActiveAlert,
    viewAlertDetails,
    reopenScamAlertForEvent,
    answerActiveCall,
    endOrDeclineActiveCall,
    startSimulatedOutboundCall,
    changeLanguage,
    toggleVoice,
    enableVoiceAndNarrate,
    replayActiveAlertVoice,
    testVoiceSample,
    setSpeechRate,
    toggleRingtone,
    toggleLargeText,
    setWallpaper,
    togglePauseSimulation,
    triggerNextEventNow,
    restartSimulation,
    clearNotifications,
    clearAllHistory,
    resetSetup,
    sendQuickReply,
    captureCameraSnapshot,
  };
}
