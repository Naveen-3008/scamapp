import { getLanguageOption } from '../i18n/translations';
import { LanguageCode, VoicePlaybackState } from '../types';

export interface SpeechStatusSnapshot {
  state: VoicePlaybackState;
  matchedVoiceName: string | null;
  availableVoicesCount: number;
}

type SpeechListener = (snapshot: SpeechStatusSnapshot) => void;

class SpeechNarrationService {
  private listeners = new Set<SpeechListener>();
  private voicesLoaded = false;
  private voices: SpeechSynthesisVoice[] = [];
  private activeUtteranceId = 0;
  private startWatchdog: number | null = null;
  private currentLanguage: LanguageCode = 'en';
  private userGestureUnlocked = false;
  private snapshot: SpeechStatusSnapshot = {
    state: 'idle',
    matchedVoiceName: null,
    availableVoicesCount: 0,
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupInteractionTracking();
      this.initVoices();
    }
  }

  private setupInteractionTracking(): void {
    const markUnlocked = () => {
      this.userGestureUnlocked = true;
    };
    window.addEventListener('pointerdown', markUnlocked, { passive: true });
    window.addEventListener('keydown', markUnlocked, { passive: true });
  }

  private initVoices(): void {
    if (!this.isSupported()) {
      this.updateSnapshot({
        state: 'unsupported_browser',
        matchedVoiceName: null,
        availableVoicesCount: 0,
      });
      return;
    }

    const load = () => {
      const list = window.speechSynthesis.getVoices();
      if (list && list.length > 0) {
        this.voices = list;
        this.voicesLoaded = true;
        this.refreshVoiceAvailability(this.currentLanguage);
      }
    };

    load();
    if (typeof window.speechSynthesis.addEventListener === 'function') {
      window.speechSynthesis.addEventListener('voiceschanged', load);
    } else {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.snapshot);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateSnapshot(partial: Partial<SpeechStatusSnapshot>): void {
    this.snapshot = { ...this.snapshot, ...partial };
    for (const listener of this.listeners) {
      listener(this.snapshot);
    }
  }

  public async ensureVoicesLoaded(timeoutMs = 900): Promise<SpeechSynthesisVoice[]> {
    if (!this.isSupported()) return [];
    const immediate = window.speechSynthesis.getVoices();
    if (immediate.length > 0) {
      this.voices = immediate;
      this.voicesLoaded = true;
      return immediate;
    }
    if (this.voicesLoaded && this.voices.length > 0) {
      return this.voices;
    }

    return new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        const latest = window.speechSynthesis.getVoices();
        this.voices = latest;
        this.voicesLoaded = true;
        resolve(latest);
      };

      const timer = window.setTimeout(finish, timeoutMs);
      const onVoicesChanged = () => {
        window.clearTimeout(timer);
        if (typeof window.speechSynthesis.removeEventListener === 'function') {
          window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        }
        finish();
      };

      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      }
    });
  }

  public findBestVoice(language: LanguageCode): SpeechSynthesisVoice | null {
    const voices =
      this.voices.length > 0
        ? this.voices
        : this.isSupported()
          ? window.speechSynthesis.getVoices()
          : [];

    if (voices.length === 0) return null;

    const option = getLanguageOption(language);

    // 1. Exact or normalized BCP-47 candidate match (e.g., ta-IN, hi-IN, en-IN)
    for (const candidate of option.bcp47Candidates) {
      const normalizedCandidate = candidate.toLowerCase().replace('_', '-');
      const exactMatches = voices.filter(
        (v) => v.lang.toLowerCase().replace('_', '-') === normalizedCandidate
      );
      if (exactMatches.length > 0) {
        return this.rankQualityVoice(exactMatches);
      }
    }

    // 2. Primary language prefix match (e.g., ta-*, hi-*, bn-*)
    const prefix = language.toLowerCase();
    const prefixMatches = voices.filter((v) => {
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vLang === prefix || vLang.startsWith(`${prefix}-`);
    });
    if (prefixMatches.length > 0) {
      return this.rankQualityVoice(prefixMatches);
    }

    // 3. Voice name keyword match
    const nameMatches = voices.filter((v) => {
      const lowerName = v.name.toLowerCase();
      return option.voiceKeywords.some((kw) => lowerName.includes(kw.toLowerCase()));
    });
    if (nameMatches.length > 0) {
      return this.rankQualityVoice(nameMatches);
    }

    return null;
  }

  private rankQualityVoice(candidates: SpeechSynthesisVoice[]): SpeechSynthesisVoice {
    const preferred = candidates.find((v) =>
      /google|microsoft|natural|neural|siri|india/i.test(v.name)
    );
    return preferred || candidates[0];
  }

  public refreshVoiceAvailability(language: LanguageCode, voiceEnabled = true): void {
    this.currentLanguage = language;
    if (!this.isSupported()) {
      this.updateSnapshot({
        state: 'unsupported_browser',
        matchedVoiceName: null,
        availableVoicesCount: 0,
      });
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.voices = voices;
    }

    const matched = this.findBestVoice(language);
    if (!voiceEnabled) {
      this.updateSnapshot({
        state: 'muted',
        matchedVoiceName: matched ? `${matched.name} (${matched.lang})` : null,
        availableVoicesCount: this.voices.length,
      });
      return;
    }

    if (this.voices.length > 0 && !matched && language !== 'en') {
      this.updateSnapshot({
        state: 'voice_unavailable',
        matchedVoiceName: null,
        availableVoicesCount: this.voices.length,
      });
      return;
    }

    if (this.snapshot.state !== 'speaking' && this.snapshot.state !== 'blocked_autoplay') {
      this.updateSnapshot({
        state: 'idle',
        matchedVoiceName: matched ? `${matched.name} (${matched.lang})` : null,
        availableVoicesCount: this.voices.length,
      });
    } else {
      this.updateSnapshot({
        matchedVoiceName: matched ? `${matched.name} (${matched.lang})` : null,
        availableVoicesCount: this.voices.length,
      });
    }
  }

  /**
   * Called directly inside a user click handler (Start Protection / Enable Voice)
   * so browsers unlock speechSynthesis for subsequent automatic announcements.
   */
  public unlockFromUserGesture(): void {
    this.userGestureUnlocked = true;
    if (!this.isSupported()) return;
    try {
      window.speechSynthesis.cancel();
      const warmup = new SpeechSynthesisUtterance('');
      warmup.volume = 0;
      window.speechSynthesis.speak(warmup);
      window.speechSynthesis.cancel();
    } catch {
      // Safe no-op if browser rejects empty warmup
    }
  }

  public cancel(): void {
    this.activeUtteranceId++;
    this.clearWatchdog();
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore browser cancel errors
      }
    }
    if (this.snapshot.state === 'speaking') {
      this.updateSnapshot({ state: 'idle' });
    }
  }

  private clearWatchdog(): void {
    if (this.startWatchdog !== null) {
      window.clearTimeout(this.startWatchdog);
      this.startWatchdog = null;
    }
  }

  public async speak(
    text: string,
    language: LanguageCode,
    rate = 0.9,
    voiceEnabled = true
  ): Promise<void> {
    this.currentLanguage = language;

    if (!this.isSupported()) {
      this.updateSnapshot({ state: 'unsupported_browser', matchedVoiceName: null });
      return;
    }

    if (!voiceEnabled) {
      this.cancel();
      this.updateSnapshot({ state: 'muted' });
      return;
    }

    const cleanText = text.trim();
    if (!cleanText) return;

    // Cancel any ongoing speech first so explanations never overlap
    this.activeUtteranceId++;
    const utteranceId = this.activeUtteranceId;
    this.clearWatchdog();
    window.speechSynthesis.cancel();

    const voices = await this.ensureVoicesLoaded();
    if (utteranceId !== this.activeUtteranceId) {
      return;
    }

    const matchedVoice = this.findBestVoice(language);

    // If voices loaded and there is no matching voice for a regional script, report honestly
    if (voices.length > 0 && !matchedVoice && language !== 'en') {
      this.updateSnapshot({
        state: 'voice_unavailable',
        matchedVoiceName: null,
        availableVoicesCount: voices.length,
      });
      return;
    }

    const option = getLanguageOption(language);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = Math.min(1.15, Math.max(0.75, rate));
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = matchedVoice?.lang || option.bcp47Candidates[0] || 'en-IN';
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    let didStart = false;

    utterance.onstart = () => {
      if (utteranceId !== this.activeUtteranceId) return;
      didStart = true;
      this.userGestureUnlocked = true;
      this.clearWatchdog();
      // Only announce 'speaking' once browser confirms synthesis actually started
      this.updateSnapshot({
        state: 'speaking',
        matchedVoiceName: matchedVoice ? `${matchedVoice.name} (${matchedVoice.lang})` : utterance.lang,
        availableVoicesCount: voices.length,
      });
    };

    utterance.onend = () => {
      if (utteranceId !== this.activeUtteranceId) return;
      this.clearWatchdog();
      this.updateSnapshot({ state: 'idle' });
    };

    utterance.onerror = (event) => {
      if (utteranceId !== this.activeUtteranceId) return;
      this.clearWatchdog();
      const errCode = event?.error || '';
      if (errCode === 'canceled' || errCode === 'interrupted') {
        this.updateSnapshot({ state: 'idle' });
        return;
      }
      if (errCode === 'not-allowed' || (!this.userGestureUnlocked && !didStart)) {
        this.updateSnapshot({ state: 'blocked_autoplay' });
        return;
      }
      if (errCode === 'language-unavailable' || errCode === 'voice-unavailable') {
        this.updateSnapshot({ state: 'voice_unavailable' });
        return;
      }
      this.updateSnapshot({ state: 'error' });
    };

    // Watchdog in case browser silently blocks autoplay without firing onstart or onerror
    this.startWatchdog = window.setTimeout(() => {
      if (utteranceId !== this.activeUtteranceId || didStart) return;
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
      if (!this.userGestureUnlocked) {
        this.updateSnapshot({ state: 'blocked_autoplay' });
      } else if (!matchedVoice) {
        this.updateSnapshot({ state: 'voice_unavailable' });
      } else {
        this.updateSnapshot({ state: 'idle' });
      }
    }, 1800);

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      this.clearWatchdog();
      this.updateSnapshot({
        state: this.userGestureUnlocked ? 'error' : 'blocked_autoplay',
      });
    }
  }
}

export const speechService = new SpeechNarrationService();
