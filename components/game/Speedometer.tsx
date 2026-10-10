"use client";

import { useRef } from "react";
import { gearLabel, speedKmh } from "@/lib/game/physics";
import { runtime } from "@/lib/game/runtime";
import { useFrameLoop } from "./useHud";

/**
 * Digital speedometer. Values come straight from the simulated vehicle and are
 * written to the DOM directly, so the readout updates every frame without
 * re-rendering React.
 */
export default function Speedometer() {
  const speed = useRef<HTMLSpanElement>(null);
  const gear = useRef<HTMLSpanElement>(null);
  const rpm = useRef<HTMLDivElement>(null);
  const boost = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const last = useRef({ speed: -1, gear: "", rpm: -1, boost: -1, boosting: false });

  useFrameLoop(() => {
    const v = runtime.vehicle;
    const l = last.current;
    const kmh = Math.round(speedKmh(v));
    if (kmh !== l.speed && speed.current) {
      l.speed = kmh;
      speed.current.textContent = String(kmh);
    }
    const g = gearLabel(v);
    if (g !== l.gear && gear.current) {
      l.gear = g;
      gear.current.textContent = g;
    }
    const r = Math.round(v.rpm * 100);
    if (r !== l.rpm && rpm.current) {
      l.rpm = r;
      rpm.current.style.transform = `scaleX(${Math.min(1, v.rpm)})`;
      rpm.current.style.backgroundColor = v.rpm > 0.86 ? "#ff6b6b" : "#7cc4ff";
    }
    const b = Math.round(v.boost * 100);
    if (b !== l.boost && boost.current) {
      l.boost = b;
      boost.current.style.transform = `scaleX(${v.boost})`;
    }
    if (v.boosting !== l.boosting && root.current) {
      l.boosting = v.boosting;
      root.current.dataset.boosting = String(v.boosting);
    }
  });

  return (
    <div ref={root} className="glass group flex items-end gap-4 rounded-2xl px-5 py-3" data-testid="speedometer" data-boosting="false">
      <div className="text-center">
        <p className="hud-label">Gear</p>
        <span ref={gear} className="display block text-2xl font-semibold leading-none text-fg" data-testid="gear">
          P
        </span>
      </div>
      <div className="min-w-[7.5rem]">
        <div className="flex items-baseline justify-center gap-1.5">
          <span ref={speed} className="font-mono text-5xl font-medium leading-none tabular-nums text-fg" data-testid="speed">
            0
          </span>
          <span className="hud-label">km/h</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div ref={rpm} className="h-full origin-left rounded-full bg-sky transition-colors" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
      <div className="w-12">
        <p className="hud-label group-data-[boosting=true]:text-amber">Boost</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div ref={boost} className="h-full origin-left rounded-full bg-amber" style={{ transform: "scaleX(1)" }} />
        </div>
      </div>
    </div>
  );
}
