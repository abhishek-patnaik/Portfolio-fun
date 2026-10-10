"use client";

import { useRef } from "react";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { useFrameLoop } from "./useHud";

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Drift readout: live points, multiplier and angle while sliding, then the
 * banked score (or a lost run) for a moment afterwards. Written straight to the
 * DOM every frame, like the speedometer, so it never re-renders React.
 */
export default function DriftMeter() {
  const best = useGameStore((s) => s.bestDrift);
  const root = useRef<HTMLDivElement>(null);
  const points = useRef<HTMLSpanElement>(null);
  const detail = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLParagraphElement>(null);
  const last = useRef({ state: "idle", points: -1, detail: "", version: -1 });

  useFrameLoop(() => {
    const run = runtime.drift;
    const l = last.current;
    const state = run.active ? "active" : run.sinceEnd < 2.4 && run.lastPoints > 0 ? (run.lastLost ? "lost" : "banked") : "idle";
    if (state !== l.state && root.current) {
      l.state = state;
      root.current.dataset.state = state;
    }
    if (state === "idle") return;
    const shown = state === "active" ? Math.round(run.points) : run.lastPoints;
    if (shown !== l.points && points.current) {
      l.points = shown;
      points.current.textContent = state === "banked" ? `+${format(shown)}` : format(shown);
    }
    const text = state === "active" ? `×${run.multiplier.toFixed(1)} · ${Math.round(run.angle)}°` : state === "banked" ? "Banked" : "Lost on contact";
    if (text !== l.detail && detail.current) {
      l.detail = text;
      detail.current.textContent = text;
    }
    // Announce finished runs once, not every frame.
    if (run.version !== l.version && live.current) {
      l.version = run.version;
      if (run.version > 0) live.current.textContent = run.lastLost ? "Drift lost" : `Drift banked: ${format(run.lastPoints)} points`;
    }
  });

  return (
    <div
      ref={root}
      data-state="idle"
      data-testid="drift-meter"
      className="group pointer-events-none mx-auto mb-2 flex w-max items-center gap-3 rounded-2xl border border-amber/40 bg-ink/65 px-4 py-2 opacity-0 backdrop-blur-md transition-opacity duration-200 data-[state=active]:opacity-100 data-[state=banked]:border-mint/50 data-[state=banked]:opacity-100 data-[state=lost]:border-danger/50 data-[state=lost]:opacity-100"
    >
      <span className="display text-xs font-semibold uppercase tracking-[0.2em] text-amber group-data-[state=banked]:text-mint group-data-[state=lost]:text-danger">Drift</span>
      <span ref={points} className="display min-w-[3ch] text-right text-2xl font-semibold tabular-nums text-fg group-data-[state=lost]:line-through group-data-[state=lost]:opacity-60">
        0
      </span>
      <span className="flex flex-col text-[0.6875rem] leading-tight text-muted">
        <span ref={detail} className="font-mono tabular-nums text-fg/90" />
        <span>Best {format(best)}</span>
      </span>
      <p ref={live} className="sr-only" role="status" aria-live="polite" />
    </div>
  );
}
