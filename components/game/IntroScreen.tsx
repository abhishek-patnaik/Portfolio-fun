"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/data/portfolio";
import { startExperience } from "@/lib/game/actions";
import { useGameStore } from "@/lib/game/store";
import { buttonClass } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/**
 * Start screen over the idle showcase shot. Starting the engine is the user
 * gesture that unlocks audio. Everything in the portfolio is also reachable
 * from here without driving.
 */
export default function IntroScreen() {
  const introSeen = useGameStore((s) => s.introSeen);
  const touchDevice = useGameStore((s) => s.touchDevice);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const openPanel = useGameStore((s) => s.openPanel);
  const openOverlay = useGameStore((s) => s.openOverlay);
  const start = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    start.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex items-end bg-gradient-to-t from-ink via-ink/80 to-ink/10 sm:items-center sm:bg-gradient-to-r sm:via-ink/55 sm:to-transparent" data-testid="intro-screen">
      <div className="animate-rise selectable w-full max-w-xl p-6 sm:p-12">
        <p className="hud-label text-sky">{site.disciplines.join(" · ")}</p>
        <h1 className="display mt-3 text-5xl font-semibold leading-none tracking-[0.06em] text-fg sm:text-6xl">{site.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-fg/90">{site.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {introSeen
            ? "Welcome back. The car is where you left the keys."
            : "This portfolio is a city. Each district is part of my work, and every landmark opens the details."}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button ref={start} type="button" onClick={startExperience} className={buttonClass("primary", "lg")} data-testid="start-driving">
            <Icon name="power" /> {introSeen ? "Continue driving" : "Start the engine"}
          </button>
          <button type="button" onClick={() => openPanel("home")} className={buttonClass("outline", "lg")} data-testid="view-portfolio">
            <Icon name="layers" /> View portfolio without driving
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <button type="button" onClick={() => openPanel("resume")} className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline">
            <Icon name="file" size={15} /> Resume
          </button>
          <button type="button" onClick={() => openPanel("projects")} className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline">
            <Icon name="code" size={15} /> Projects
          </button>
          <button type="button" onClick={() => openPanel("contact")} className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline">
            <Icon name="mail" size={15} /> Contact
          </button>
          <button type="button" onClick={() => openOverlay("settings")} className="inline-flex items-center gap-1.5 text-muted underline-offset-4 hover:text-fg hover:underline">
            <Icon name="settings" size={15} /> Settings
          </button>
        </div>

        <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-dim">
          {touchDevice ? (
            <span>On-screen wheel and pedals · Hand + steer to drift · drag to look around</span>
          ) : (
            <>
              <span>
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-muted">W A S D</kbd> drive
              </span>
              <span>
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-muted">Space</kbd> + turn to drift
              </span>
              <span>
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-muted">E</kbd> interact
              </span>
              <span>
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-muted">M</kbd> map
              </span>
              <span>
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-muted">C</kbd> camera
              </span>
            </>
          )}
          {reducedMotion ? <span>Reduced motion is on: camera fly-ins are skipped.</span> : null}
        </p>
      </div>
    </div>
  );
}
