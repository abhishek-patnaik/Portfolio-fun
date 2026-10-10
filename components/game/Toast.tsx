"use client";

import { useEffect } from "react";
import { useGameStore } from "@/lib/game/store";

export default function Toast() {
  const toast = useGameStore((s) => s.toast);
  const clearToast = useGameStore((s) => s.clearToast);
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => clearToast(toast.id), 2600);
    return () => window.clearTimeout(id);
  }, [toast, clearToast]);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--hud-pad)+10rem)] z-30 flex justify-center px-4 portrait:top-[36%]" role="status" aria-live="polite">
      {toast ? (
        <p key={toast.id} className="glass animate-rise rounded-xl px-4 py-2.5 text-sm text-fg" data-testid="toast">
          {toast.text}
        </p>
      ) : null}
    </div>
  );
}
