/**
 * Fully synthesised audio: engine, tyres, wind, city ambience, impacts and UI
 * blips are generated with the Web Audio API, so there are no audio files to
 * load or to go missing. The context is created on the first user gesture, as
 * browsers require.
 */
import type { VehicleState } from "@/types/vehicle";

function noiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    // Slightly pink noise sounds less harsh than white noise.
    const white = Math.random() * 2 - 1;
    last = (last + 0.04 * white) / 1.04;
    data[i] = white * 0.35 + last * 9;
  }
  return buffer;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private oscA: OscillatorNode | null = null;
  private oscB: OscillatorNode | null = null;
  private oscC: OscillatorNode | null = null;
  private tyreGain: GainNode | null = null;
  private tyreFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private ambienceGain: GainNode | null = null;
  private volume = 0.7;
  private muted = false;
  private lastImpact = 0;
  available = true;

  /** Must be called from a user gesture (click, key press, touch). */
  async start(): Promise<void> {
    if (this.ctx) {
      if (this.ctx.state === "suspended") await this.ctx.resume().catch(() => undefined);
      return;
    }
    const Ctor: typeof AudioContext | undefined =
      typeof window === "undefined"
        ? undefined
        : (window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);
    if (!Ctor) {
      this.available = false;
      return;
    }
    try {
      const ctx = new Ctor();
      this.ctx = ctx;
      const master = ctx.createGain();
      master.gain.value = this.muted ? 0 : this.volume;
      const limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -10;
      limiter.ratio.value = 8;
      master.connect(limiter).connect(ctx.destination);
      this.master = master;

      // Engine: three detuned oscillators through a low-pass that opens with revs.
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 300;
      filter.Q.value = 1.2;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      const mk = (type: OscillatorType, level: number) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = 40;
        const g = ctx.createGain();
        g.gain.value = level;
        osc.connect(g).connect(filter);
        osc.start();
        return osc;
      };
      this.oscA = mk("sawtooth", 0.5);
      this.oscB = mk("square", 0.22);
      this.oscC = mk("triangle", 0.6);
      filter.connect(gain).connect(master);
      this.engineFilter = filter;
      this.engineGain = gain;

      const noise = noiseBuffer(ctx, 2);
      const loop = (filterType: BiquadFilterType, freq: number, q: number) => {
        const src = ctx.createBufferSource();
        src.buffer = noise;
        src.loop = true;
        const f = ctx.createBiquadFilter();
        f.type = filterType;
        f.frequency.value = freq;
        f.Q.value = q;
        const g = ctx.createGain();
        g.gain.value = 0;
        src.connect(f).connect(g).connect(master);
        src.start();
        return { f, g };
      };
      const tyre = loop("bandpass", 1900, 2.2);
      this.tyreGain = tyre.g;
      this.tyreFilter = tyre.f;
      const wind = loop("lowpass", 500, 0.4);
      this.windGain = wind.g;
      this.windFilter = wind.f;
      const ambience = loop("lowpass", 220, 0.3);
      this.ambienceGain = ambience.g;
      ambience.g.gain.value = 0.05;
    } catch {
      this.available = false;
      this.ctx = null;
    }
  }

  setVolume(volume: number): void {
    this.volume = volume;
    this.applyMaster();
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.applyMaster();
  }

  private applyMaster(): void {
    if (!this.ctx || !this.master) return;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.05);
  }

  suspend(): void {
    if (this.ctx && this.ctx.state === "running") void this.ctx.suspend().catch(() => undefined);
  }

  resume(): void {
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume().catch(() => undefined);
  }

  /** Called every frame while driving. */
  update(s: VehicleState, throttle: number, braking: boolean): void {
    const ctx = this.ctx;
    if (!ctx || !this.engineGain || !this.engineFilter) return;
    const t = ctx.currentTime;
    const rpm = s.engineOn ? s.rpm : 0;
    const base = 34 + rpm * 150;
    this.oscA?.frequency.setTargetAtTime(base, t, 0.03);
    this.oscB?.frequency.setTargetAtTime(base * 0.5, t, 0.03);
    this.oscC?.frequency.setTargetAtTime(base * 1.5 + 2, t, 0.03);
    this.engineFilter.frequency.setTargetAtTime(240 + rpm * 1700 + throttle * 900, t, 0.05);
    const level = s.engineOn ? 0.07 + rpm * 0.08 + throttle * 0.07 + (s.boosting ? 0.04 : 0) : 0;
    this.engineGain.gain.setTargetAtTime(level, t, 0.06);

    const speed = Math.abs(s.speed);
    const lock = braking && speed > 14 ? 0.25 : 0;
    this.tyreGain?.gain.setTargetAtTime(Math.min(0.26, s.tyreSlip * 0.26 + lock * 0.12), t, 0.05);
    // The squeal rises with speed and with how far sideways the car is.
    this.tyreFilter?.frequency.setTargetAtTime(1500 + speed * 16 + Math.abs(s.slipAngle) * 700, t, 0.08);
    this.windGain?.gain.setTargetAtTime(Math.min(0.2, (speed / 60) * 0.2), t, 0.1);
    this.windFilter?.frequency.setTargetAtTime(350 + speed * 22, t, 0.1);

    if (s.impact > 2.5 && s.sinceCollision < 0.05 && t - this.lastImpact > 0.25) {
      this.lastImpact = t;
      this.thud(Math.min(1, s.impact / 18));
    }
  }

  private thud(strength: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5 * strength + 0.1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  /** Short interface sound. `kind` picks the pitch contour. */
  blip(kind: "open" | "close" | "select" | "arrive" = "select"): void {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const [f0, f1] = kind === "open" ? [520, 880] : kind === "close" ? [700, 420] : kind === "arrive" ? [660, 1320] : [760, 760];
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (kind === "arrive" ? 0.4 : 0.14));
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  /** Starter motor followed by the engine catching. */
  ignition(): void {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(70, t);
    osc.frequency.linearRampToValueAtTime(120, t + 0.45);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 17;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.06;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    lfo.connect(lfoGain).connect(g.gain);
    osc.connect(g).connect(this.master);
    osc.start(t);
    lfo.start(t);
    osc.stop(t + 0.6);
    lfo.stop(t + 0.6);
  }

  dispose(): void {
    void this.ctx?.close().catch(() => undefined);
    this.ctx = null;
  }
}

export const audio = new AudioEngine();
