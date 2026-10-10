"use client";

import { site } from "@/lib/data/portfolio";
import { LOADING_STAGES, useGameStore } from "@/lib/game/store";

/**
 * Loading progress. The bar advances only when a stage has really finished
 * (see useWorldAssets), so the number is never invented.
 */
export default function LoadingScreen() {
  const stages = useGameStore((s) => s.stages);
  const done = LOADING_STAGES.filter((s) => stages[s.id] === "done").length;
  const active = LOADING_STAGES.find((s) => stages[s.id] === "active") ?? LOADING_STAGES[LOADING_STAGES.length - 1];
  const percent = Math.round((done / LOADING_STAGES.length) * 100);
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-ink px-6" role="status" aria-live="polite">
      <div className="w-full max-w-md">
        <p className="hud-label text-sky">{site.disciplines.join(" · ")}</p>
        <h1 className="display mt-3 text-4xl font-semibold tracking-[0.12em] text-fg sm:text-5xl">{site.shortName}</h1>
        <p className="mt-2 text-sm text-muted">The interactive portfolio world</p>

        <div
          className="relative mt-10 h-[3px] w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Loading progress"
        >
          <div className="h-full rounded-full bg-sky transition-[width] duration-300 ease-out" style={{ width: `${percent}%` }} />
          <div className="animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden />
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <p className="text-sm text-fg" data-testid="loading-stage">
            {active.label}…
          </p>
          <p className="font-mono text-xs tabular-nums text-muted">
            {done}/{LOADING_STAGES.length}
          </p>
        </div>
        <ol className="mt-6 space-y-1.5">
          {LOADING_STAGES.map((s) => (
            <li key={s.id} className="flex items-center gap-2.5 text-xs">
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full ${
                  stages[s.id] === "done" ? "bg-mint" : stages[s.id] === "active" ? "animate-pulse bg-sky" : "bg-white/15"
                }`}
              />
              <span className={stages[s.id] === "pending" ? "text-dim" : "text-muted"}>{s.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
