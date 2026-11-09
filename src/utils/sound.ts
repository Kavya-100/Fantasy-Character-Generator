/**
 * Web Audio API synthesizer for tabletop dice rolls and character generation chimes.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Sound of rolling polyhedral dice clattering
   */
  public playDiceRoll() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // 3 short rhythmic noise/clicks mimicking dice clatter
      const clicks = [0, 0.06, 0.12, 0.18];
      clicks.forEach((offset, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        // Random pitch variation
        osc.frequency.setValueAtTime(140 + idx * 40 + Math.random() * 60, now + offset);
        osc.frequency.exponentialRampToValueAtTime(70, now + offset + 0.05);

        gain.gain.setValueAtTime(0.08, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.05);
      });

      // Subtle warm resonant chime at the end
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(523.25, now + 0.22); // C5
      chime.frequency.exponentialRampToValueAtTime(659.25, now + 0.35); // E5

      chimeGain.gain.setValueAtTime(0.04, now + 0.22);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);

      chime.start(now + 0.22);
      chime.stop(now + 0.45);
    } catch {
      // AudioContext might be blocked or unavailable; fail silently
    }
  }

  /**
   * Quick pleasant click for UI actions
   */
  public playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio blocked or unavailable
    }
  }
}

export const soundEngine = new SoundEngine();
