class GameAudio {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getCtx(): AudioContext | null {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch { return null; }
    }
    return this.ctx;
  }

  setMuted(m: boolean) { this.muted = m; }
  isMuted() { return this.muted; }

  private play(freq: number, duration: number, type: OscillatorType = 'square', vol = 0.08) {
    if (this.muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  flap() { this.play(440, 0.08, 'sine', 0.06); }
  score() { this.play(660, 0.12, 'sine', 0.07); }
  combo(level: number) {
    const freq = 500 + level * 100;
    this.play(freq, 0.15, 'sine', 0.08);
    setTimeout(() => this.play(freq * 1.25, 0.1, 'sine', 0.06), 60);
  }
  bonus() {
    this.play(880, 0.1, 'sine', 0.07);
    setTimeout(() => this.play(1100, 0.1, 'sine', 0.06), 50);
    setTimeout(() => this.play(1320, 0.12, 'sine', 0.05), 100);
  }
  hit() { this.play(150, 0.25, 'sawtooth', 0.1); }
}

export const gameAudio = new GameAudio();
