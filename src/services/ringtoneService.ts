class PhoneRingtoneService {
  private audioCtx: AudioContext | null = null;
  private loopTimer: number | null = null;
  private unlocked = false;

  public unlock(): void {
    this.unlocked = true;
    if (typeof window === 'undefined') return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctx && !this.audioCtx) {
        this.audioCtx = new Ctx();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        void this.audioCtx.resume();
      }
    } catch {
      // Ignore Web Audio restrictions
    }
  }

  private playChimePair(): void {
    if (!this.unlocked || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        void this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25]; // Gentle C5 -> E5 phone chime
      notes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.22);

        gain.gain.setValueAtTime(0.001, now + idx * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.06, now + idx * 0.22 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.22 + 0.36);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.22);
        osc.stop(now + idx * 0.22 + 0.38);
      });
    } catch {
      // Safe fallback if audio context is unavailable
    }
  }

  public startRinging(enabled: boolean): void {
    this.stopRinging();
    if (!enabled || !this.unlocked) return;
    this.playChimePair();
    this.loopTimer = window.setInterval(() => {
      this.playChimePair();
    }, 2400);
  }

  public stopRinging(): void {
    if (this.loopTimer !== null) {
      window.clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
  }
}

export const ringtoneService = new PhoneRingtoneService();
