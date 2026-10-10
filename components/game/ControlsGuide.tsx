"use client";

import { useGameStore } from "@/lib/game/store";
import Modal from "@/components/ui/Modal";

const KEYBOARD: [string, string][] = [
  ["W / ↑", "Accelerate"],
  ["S / ↓", "Brake, then reverse once stopped"],
  ["A D / ← →", "Steer"],
  ["Space", "Handbrake; hold while steering to start a drift"],
  ["Shift", "Boost; at full lock it kicks the tail out"],
  ["E", "Interact with the nearby landmark"],
  ["C", "Cycle cameras"],
  ["V", "Cockpit / chase camera"],
  ["M", "World map"],
  ["R", "Recover to the last safe road position"],
  ["I", "Start or stop the engine"],
  ["N", "Mute sound"],
  ["H", "Show or hide this guide"],
  ["Esc", "Close the open interface, or pause"],
  ["Drag", "Look around"],
];

const TOUCH: [string, string][] = [
  ["Steering pad", "Drag left or right; release to centre"],
  ["Gas", "Hold to accelerate"],
  ["Brake", "Hold to brake, then reverse"],
  ["Hand / Boost", "Hold for the handbrake or a burst of speed"],
  ["Drift", "Hold Hand while steering, then keep on the gas"],
  ["Arrow button", "Appears near a landmark; tap to open it"],
  ["Drag the view", "Look around"],
];

const GAMEPAD: [string, string][] = [
  ["Left stick", "Steer"],
  ["RT / LT", "Accelerate / brake and reverse"],
  ["A", "Interact"],
  ["B / X", "Handbrake (drift) / boost"],
  ["Y", "Cycle cameras"],
  ["RB", "Recover"],
  ["Back / Start", "Map / pause"],
];

function Table({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <section>
      <h3 className="hud-label text-sky">{title}</h3>
      <dl className="mt-2 divide-y divide-line rounded-xl border border-line bg-white/3">
        {rows.map(([key, action]) => (
          <div key={key} className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <dt>
              <kbd className="whitespace-nowrap rounded-md border border-line-strong bg-white/6 px-2 py-1 font-mono text-xs text-fg">{key}</kbd>
            </dt>
            <dd className="text-right text-sm text-muted">{action}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ControlsGuide({ onClose }: { onClose: () => void }) {
  const inputMode = useGameStore((s) => s.inputMode);
  const order =
    inputMode === "touch"
      ? [<Table key="t" title="Touch" rows={TOUCH} />, <Table key="k" title="Keyboard" rows={KEYBOARD} />, <Table key="g" title="Gamepad" rows={GAMEPAD} />]
      : inputMode === "gamepad"
        ? [<Table key="g" title="Gamepad" rows={GAMEPAD} />, <Table key="k" title="Keyboard" rows={KEYBOARD} />, <Table key="t" title="Touch" rows={TOUCH} />]
        : [<Table key="k" title="Keyboard" rows={KEYBOARD} />, <Table key="g" title="Gamepad" rows={GAMEPAD} />, <Table key="t" title="Touch" rows={TOUCH} />];
  return (
    <Modal title="Controls" kicker="How to drive" onClose={onClose} size="lg" testId="controls-guide">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">{order[0]}</div>
        <div className="space-y-6">
          {order[1]}
          {order[2]}
        </div>
      </div>
      <section className="mt-6 rounded-xl border border-line bg-white/3 p-4" aria-labelledby="drift-help" data-testid="drift-help">
        <h3 id="drift-help" className="hud-label text-amber">
          Drifting
        </h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>Build some speed, turn in and tap the handbrake to break the rear loose.</li>
          <li>Stay on the throttle and keep steering to hold the slide. More lock means more angle.</li>
          <li>Steer the other way to swing into the opposite drift; ease off the throttle and steering to straighten up.</li>
          <li>Angle, speed and time build the score, and long drifts raise the multiplier. Touching anything loses the run.</li>
        </ol>
      </section>
      <p className="mt-6 text-sm text-muted">Prefer not to drive? Every section is one click away in the Portfolio menu, and the map can take you straight to any landmark.</p>
    </Modal>
  );
}
