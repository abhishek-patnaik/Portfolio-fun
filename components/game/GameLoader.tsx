"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/data/portfolio";

/** Shown while the 3D bundle downloads; matches the first loading stage. */
function Shell() {
  // On a slow or failing connection, offer the classic site instead of an endless wait.
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setSlow(true), 9000);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink px-6" role="status">
      <div className="w-full max-w-md">
        <p className="hud-label text-sky">{site.disciplines.join(" · ")}</p>
        <p className="display mt-3 text-4xl font-semibold tracking-[0.12em] text-fg sm:text-5xl">{site.shortName}</p>
        <p className="mt-2 text-sm text-muted">The interactive portfolio world</p>
        <div className="relative mt-10 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="animate-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden />
        </div>
        <p className="mt-3 text-sm text-fg">Initializing application…</p>
        {slow ? (
          <p className="mt-5 text-sm text-muted" data-testid="slow-load">
            This is taking longer than usual.{" "}
            <Link href="/about" className="text-sky underline underline-offset-4">
              Open the classic portfolio
            </Link>{" "}
            while the city loads.
          </p>
        ) : null}
      </div>
    </div>
  );
}

const GameRoot = dynamic(() => import("./GameRoot"), { ssr: false, loading: Shell });

/**
 * Loads the 3D world on the client only. three.js and the game code live in
 * their own chunk, so the conventional pages never download them.
 */
export default function GameLoader() {
  return <GameRoot />;
}
