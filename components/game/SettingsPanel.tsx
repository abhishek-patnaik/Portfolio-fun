"use client";

import type { CameraMode } from "@/types/vehicle";
import { recoverVehicle, toggleEngine } from "@/lib/game/actions";
import { runtime } from "@/lib/game/runtime";
import { useGameStore, type TimeOfDay } from "@/lib/game/store";
import { QUALITY, QUALITY_LEVELS } from "@/lib/utils/performance";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { SKY_PRESETS } from "@/components/world/sky";
import { usePolled } from "./useHud";

function Segmented<T extends string>({ label, options, value, onChange, testId }: { label: string; options: { value: T; label: string; hint?: string }[]; value: T; onChange: (v: T) => void; testId?: string }) {
  return (
    <fieldset data-testid={testId}>
      <legend className="hud-label">{label}</legend>
      <div className="mt-2 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => (
          <label
            key={o.value}
            className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sky ${
              o.value === value ? "border-sky/60 bg-sky/15" : "border-line hover:border-line-strong"
            }`}
          >
            <input type="radio" name={label} value={o.value} checked={o.value === value} onChange={() => onChange(o.value)} className="sr-only" />
            <span className="display block text-sm font-semibold uppercase tracking-[0.12em] text-fg">{o.label}</span>
            {o.hint ? <span className="mt-0.5 block text-[0.6875rem] leading-tight text-muted">{o.hint}</span> : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Pause and settings. Every control here changes real behaviour. */
export default function SettingsPanel({ onClose }: { onClose: () => void }) {
  const s = useGameStore();
  const stats = usePolled(() => ({ ...runtime.stats }), 1000);
  const driving = s.phase === "driving";
  return (
    <Modal title={driving ? "Paused" : "Settings"} kicker="Settings" onClose={onClose} size="lg" testId="settings-panel">
      <div className="space-y-6">
        {driving ? (
          <div className="flex flex-wrap gap-2.5">
            <Button variant="primary" onClick={onClose} data-testid="settings-resume">
              <Icon name="play" /> Resume driving
            </Button>
            <Button
              onClick={() => {
                recoverVehicle();
                onClose();
              }}
            >
              <Icon name="recover" /> Reset vehicle position
            </Button>
            <Button onClick={toggleEngine}>
              <Icon name="power" /> {s.engineOn ? "Stop engine" : "Start engine"}
            </Button>
            <Button onClick={() => s.openOverlay("controls")}>
              <Icon name="help" /> Controls
            </Button>
            <Button variant="ghost" onClick={s.returnToIntro} data-testid="settings-intro">
              <Icon name="home" /> Return to the introduction
            </Button>
          </div>
        ) : null}

        <Segmented<CameraMode>
          label="Camera"
          testId="settings-camera"
          value={s.cameraMode}
          onChange={s.setCameraMode}
          options={[
            { value: "cockpit", label: "Cockpit", hint: "Driver's seat" },
            { value: "chase", label: "Chase", hint: "Behind the car" },
            { value: "cinematic", label: "Cinematic", hint: "Slow orbit" },
          ]}
        />

        <Segmented
          label="Graphics quality"
          testId="settings-quality"
          value={s.quality}
          onChange={(q) => s.setQuality(q, false)}
          options={QUALITY_LEVELS.map((q) => ({ value: q, label: QUALITY[q].label, hint: QUALITY[q].description }))}
        />
        <p className="-mt-3 font-mono text-xs text-dim" data-testid="settings-stats">
          {stats.fps > 0 ? `${stats.fps} fps · ${stats.calls} draw calls · ${Math.round(stats.triangles / 1000)}k triangles` : "Measuring performance…"}
          {s.qualityAuto ? " · chosen automatically for this device" : ""}
        </p>

        <Segmented<TimeOfDay>
          label="Time of day"
          testId="settings-time"
          value={s.timeOfDay}
          onChange={s.setTimeOfDay}
          options={(Object.keys(SKY_PRESETS) as TimeOfDay[]).map((t) => ({ value: t, label: SKY_PRESETS[t].label }))}
        />

        <fieldset>
          <legend className="hud-label">Sound</legend>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-line px-3.5 py-3">
            <button
              type="button"
              onClick={() => s.setMuted(!s.muted)}
              aria-pressed={s.muted}
              aria-label={s.muted ? "Unmute sound" : "Mute sound"}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${s.muted ? "border-amber/50 text-amber" : "border-line text-fg hover:bg-white/8"}`}
              data-testid="settings-mute"
            >
              <Icon name={s.muted ? "mute" : "volume"} />
            </button>
            <label className="flex flex-1 items-center gap-3 text-sm text-muted">
              <span className="shrink-0">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={s.volume}
                onChange={(e) => s.setVolume(Number(e.target.value))}
                disabled={s.muted}
                className="h-1.5 w-full cursor-pointer accent-sky disabled:opacity-40"
                data-testid="settings-volume"
              />
              <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-fg">{Math.round(s.volume * 100)}</span>
            </label>
          </div>
        </fieldset>

        {s.reducedMotion ? (
          <p className="rounded-xl border border-line bg-white/3 px-3.5 py-3 text-sm text-muted">
            Your device asks for reduced motion, so camera fly-ins, the cinematic orbit and decorative animation are held still.
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
