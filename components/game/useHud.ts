"use client";

import { useEffect, useRef, useState } from "react";

/** Runs `callback` every animation frame while mounted, without re-rendering. */
export function useFrameLoop(callback: () => void): void {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  }, [callback]);
  useEffect(() => {
    let id = 0;
    const tick = () => {
      ref.current();
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);
}

/** Polls a value a few times a second; for slow-changing HUD text. */
export function usePolled<T>(read: () => T, intervalMs = 250): T {
  const [value, setValue] = useState<T>(read);
  const ref = useRef(read);
  useEffect(() => {
    ref.current = read;
  }, [read]);
  useEffect(() => {
    const id = window.setInterval(() => setValue(ref.current()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return value;
}
