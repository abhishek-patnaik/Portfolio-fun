"use client";

import { getDestination } from "@/lib/data/landmarks";
import { openDestination } from "@/lib/game/actions";
import { useGameStore } from "@/lib/game/store";

const VERB: Record<string, string> = {
  section: "to enter",
  item: "to open",
  "easter-egg": "to look",
};

/**
 * One compact prompt for the nearest landmark. It is a real button, so it also
 * works by tap or click, and its hint follows the input device in use.
 */
export default function InteractionPrompt({ touch = false }: { touch?: boolean }) {
  const nearbyId = useGameStore((s) => s.nearbyId);
  const inputMode = useGameStore((s) => s.inputMode);
  const dest = nearbyId ? getDestination(nearbyId) : undefined;
  if (!dest) return null;
  const key = inputMode === "gamepad" ? "A" : inputMode === "touch" ? "Tap" : "E";
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-20 flex justify-center px-4 ${
        touch ? "portrait:bottom-[15.5rem] landscape:bottom-[var(--hud-pad)]" : "top-[calc(var(--hud-pad)+4.25rem)]"
      }`}
    >
      <button
        key={dest.id}
        type="button"
        onClick={() => openDestination(dest.id)}
        className={`glass animate-rise pointer-events-auto flex items-center gap-4 rounded-2xl py-3 pl-4 pr-3 text-left transition hover:bg-white/10 ${touch ? "max-w-[min(22rem,100%)] landscape:max-w-[19rem]" : "max-w-md"}`}
        data-testid="interaction-prompt"
        data-destination={dest.id}
      >
        <span className="h-10 w-1 shrink-0 rounded-full" style={{ background: dest.color }} aria-hidden />
        <span className="min-w-0">
          <span className="hud-label block truncate" style={{ color: dest.color }}>
            {dest.category}
          </span>
          <span className="display block truncate text-lg font-semibold leading-tight text-fg">{dest.name}</span>
          {touch ? null : <span className="block truncate text-xs text-muted">{dest.description}</span>}
        </span>
        <span className="flex shrink-0 flex-col items-center gap-1">
          <kbd className="display animate-pulse-ring flex h-10 min-w-10 items-center justify-center rounded-xl border border-sky/60 bg-sky/15 px-2 text-sm font-semibold text-fg">{key}</kbd>
          <span className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">{VERB[dest.kind]}</span>
        </span>
      </button>
    </div>
  );
}
