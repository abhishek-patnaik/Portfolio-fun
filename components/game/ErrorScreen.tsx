"use client";

import Link from "next/link";
import { navigation, site } from "@/lib/data/portfolio";
import { useGameStore } from "@/lib/game/store";
import { buttonClass } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/** Shown when the 3D world cannot start. The whole portfolio stays reachable. */
export default function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  const error = useGameStore((s) => s.error);
  return (
    <div className="selectable absolute inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink p-6" role="alert" data-testid="error-screen">
      <div className="w-full max-w-lg">
        <Icon name="alert" size={30} className="text-amber" />
        <h1 className="display mt-4 text-3xl font-semibold text-fg">The 3D city could not start</h1>
        <p className="mt-2 text-muted">{error ?? "Something went wrong while preparing the world."}</p>
        <p className="mt-2 text-sm text-muted">
          Nothing is lost: all of {site.name.split(" ")[0]}&apos;s work is available as normal pages.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button type="button" onClick={onRetry} className={buttonClass("primary")} data-testid="error-retry">
            <Icon name="recover" /> Try again
          </button>
          <Link href="/about" className={buttonClass("outline")}>
            <Icon name="layers" /> Open the classic site
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
          {navigation
            .filter((n) => n.section !== "home")
            .map((n) => (
              <li key={n.section}>
                <Link href={n.href} className="text-sky underline-offset-4 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
