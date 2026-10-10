"use client";

import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { handleAction, recoverVehicle } from "@/lib/game/actions";
import { input } from "@/lib/game/input";
import { useGameStore } from "@/lib/game/store";
import Icon, { type IconName } from "@/components/ui/Icon";

/** Pointer capture keeps a hold alive when the thumb slides off; it is optional. */
function capture(el: Element, pointerId: number): void {
  try {
    el.setPointerCapture(pointerId);
  } catch {
    // The pointer is already gone or cannot be captured; the hold still works.
  }
}

/** A button that stays active for as long as it is held. */
function HoldButton({
  label,
  onChange,
  className,
  children,
  testId,
}: {
  label: string;
  onChange: (held: boolean) => void;
  className: string;
  children: ReactNode;
  testId?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const set = (held: boolean, e: ReactPointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (held) {
      input.noteTouch();
      capture(e.currentTarget, e.pointerId);
    }
    if (ref.current) ref.current.dataset.held = String(held);
    onChange(held);
  };
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      data-testid={testId}
      data-held="false"
      onPointerDown={(e) => set(true, e)}
      onPointerUp={(e) => set(false, e)}
      onPointerCancel={(e) => set(false, e)}
      onLostPointerCapture={() => {
        if (ref.current) ref.current.dataset.held = "false";
        onChange(false);
      }}
      onContextMenu={(e) => e.preventDefault()}
      className={`glass pointer-events-auto touch-none select-none transition data-[held=true]:scale-95 data-[held=true]:border-sky/70 data-[held=true]:bg-sky/25 ${className}`}
    >
      {children}
    </button>
  );
}

/** Horizontal steering pad: drag left or right, release to centre. */
function SteeringPad() {
  const knob = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const active = useRef<number | null>(null);
  const update = (clientX: number) => {
    const el = pad.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const half = rect.width / 2;
    const raw = (clientX - (rect.left + half)) / (half * 0.72);
    const value = Math.max(-1, Math.min(1, raw));
    input.touch.steer = value;
    if (knob.current) knob.current.style.transform = `translateX(${value * half * 0.62}px)`;
  };
  const release = () => {
    active.current = null;
    input.touch.steer = 0;
    if (knob.current) knob.current.style.transform = "translateX(0px)";
    if (pad.current) pad.current.dataset.held = "false";
  };
  return (
    <div
      ref={pad}
      role="slider"
      aria-label="Steering"
      aria-valuemin={-1}
      aria-valuemax={1}
      aria-valuenow={0}
      tabIndex={-1}
      data-testid="touch-steer"
      data-held="false"
      onPointerDown={(e) => {
        e.preventDefault();
        input.noteTouch();
        active.current = e.pointerId;
        capture(e.currentTarget, e.pointerId);
        e.currentTarget.dataset.held = "true";
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (active.current === e.pointerId) update(e.clientX);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      className="glass pointer-events-auto relative flex h-20 w-[min(46vw,15rem)] touch-none select-none items-center justify-center rounded-full data-[held=true]:border-sky/60"
    >
      <Icon name="arrowLeft" size={18} className="absolute left-4 text-dim" />
      <Icon name="arrowRight" size={18} className="absolute right-4 text-dim" />
      <div ref={knob} className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-white/15 text-fg transition-transform duration-75">
        <Icon name="wheel" size={26} />
      </div>
    </div>
  );
}

function TapButton({ icon, label, onClick, testId, accent }: { icon: IconName; label: string; onClick: () => void; testId?: string; accent?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-testid={testId}
      onClick={() => {
        input.noteTouch();
        onClick();
      }}
      className={`glass pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl active:scale-95 ${accent ? "border-sky/60 bg-sky/20 text-fg" : "text-fg"}`}
    >
      <Icon name={icon} size={22} />
    </button>
  );
}

/**
 * On-screen driving controls for touch devices: steering under the left thumb,
 * pedals under the right, with camera, recovery and handbrake above them.
 * Pedals are hold buttons, so the car keeps moving without repeated taps.
 */
export default function TouchControls() {
  const nearbyId = useGameStore((s) => s.nearbyId);
  const openOverlay = useGameStore((s) => s.openOverlay);
  const cycleCamera = useGameStore((s) => s.cycleCamera);
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 px-[var(--hud-pad)] pb-[calc(var(--hud-pad)+env(safe-area-inset-bottom,0px))]"
      data-testid="touch-controls"
    >
      <div className="flex flex-col items-start gap-2.5">
        <div className="flex gap-2">
          <TapButton icon="camera" label="Switch camera" onClick={cycleCamera} testId="touch-camera" />
          <TapButton icon="recover" label="Recover to road" onClick={recoverVehicle} testId="touch-recover" />
          <TapButton icon="help" label="Controls" onClick={() => openOverlay("controls")} />
        </div>
        <SteeringPad />
      </div>
      <div className="flex flex-col items-end gap-2.5">
        <div className="flex gap-2">
          {nearbyId ? <TapButton icon="arrowRight" label="Interact with nearby landmark" onClick={() => handleAction("interact")} testId="touch-interact" accent /> : null}
          <HoldButton label="Handbrake" onChange={(held) => (input.touch.handbrake = held)} className="display flex h-12 w-12 items-center justify-center rounded-2xl text-[0.625rem] uppercase tracking-[0.1em] text-fg" testId="touch-handbrake">
            Hand
          </HoldButton>
          <HoldButton label="Boost" onChange={(held) => (input.touch.boost = held)} className="display flex h-12 w-12 items-center justify-center rounded-2xl text-[0.625rem] uppercase tracking-[0.1em] text-amber" testId="touch-boost">
            Boost
          </HoldButton>
        </div>
        <div className="flex items-end gap-2.5">
          <HoldButton label="Brake and reverse" onChange={(held) => (input.touch.brake = held ? 1 : 0)} className="display flex h-20 w-[4.5rem] flex-col items-center justify-center rounded-3xl text-xs uppercase tracking-[0.12em] text-fg" testId="touch-brake">
            <Icon name="arrowUp" size={20} className="rotate-180" />
            Brake
          </HoldButton>
          <HoldButton label="Accelerate" onChange={(held) => (input.touch.throttle = held ? 1 : 0)} className="display flex h-28 w-[4.5rem] flex-col items-center justify-center rounded-3xl text-xs uppercase tracking-[0.12em] text-sky" testId="touch-gas">
            <Icon name="arrowUp" size={24} />
            Gas
          </HoldButton>
        </div>
      </div>
    </div>
  );
}
