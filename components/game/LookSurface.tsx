"use client";

import { useRef } from "react";
import { input } from "@/lib/game/input";
import { runtime } from "@/lib/game/runtime";

/**
 * A transparent layer under the HUD that turns pointer drags into free look.
 * Touches that begin on a control never reach it, so steering and looking
 * around do not fight over the same gesture.
 */
export default function LookSurface() {
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  return (
    <div
      className="absolute inset-0 z-10 cursor-grab touch-none active:cursor-grabbing"
      aria-hidden="true"
      data-testid="look-surface"
      onPointerDown={(e) => {
        if (e.pointerType === "touch") input.noteTouch();
        drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // Capture is a convenience; dragging still works without it.
        }
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        const sensitivity = e.pointerType === "touch" ? 0.006 : 0.004;
        // Grab-style: dragging the view to the right turns the camera to the left.
        runtime.look.yaw += (e.clientX - d.x) * sensitivity;
        runtime.look.pitch += (e.clientY - d.y) * sensitivity * 0.6;
        runtime.look.yaw = Math.max(-3, Math.min(3, runtime.look.yaw));
        runtime.look.pitch = Math.max(-0.6, Math.min(0.6, runtime.look.pitch));
        runtime.look.idle = 0;
        d.x = e.clientX;
        d.y = e.clientY;
      }}
      onPointerUp={(e) => {
        if (drag.current?.id === e.pointerId) drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    />
  );
}
