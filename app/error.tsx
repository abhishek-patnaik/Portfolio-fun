"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex min-h-dvh items-center justify-center bg-deep p-6">
      <div className="max-w-md" role="alert">
        <p className="hud-label text-amber">Something went wrong</p>
        <h1 className="display mt-2 text-3xl font-semibold text-fg">This page hit an unexpected error</h1>
        <p className="mt-3 text-muted">You can try again, or continue to the rest of the portfolio.</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <button type="button" onClick={reset} className={buttonClass("primary")}>
            Try again
          </button>
          <Link href="/about" className={buttonClass("outline")}>
            Open the portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
