"use client";

import { getDestination } from "@/lib/data/landmarks";
import { site } from "@/lib/data/portfolio";
import { clearRoute, recoverVehicle } from "@/lib/game/actions";
import { formatDistance, type Guidance } from "@/lib/game/navigation";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { getDistrict } from "@/lib/world/layout";
import Icon, { type IconName } from "@/components/ui/Icon";
import DriftMeter from "./DriftMeter";
import Speedometer from "./Speedometer";
import { MiniMap } from "./WorldMap";
import { usePolled } from "./useHud";

const CAMERA_LABEL = { cockpit: "Cockpit", chase: "Chase", cinematic: "Cinematic" } as const;

function HudButton({ icon, label, onClick, active, testId }: { icon: IconName; label: string; onClick: () => void; active?: boolean; testId?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      data-testid={testId}
      className={`glass flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/12 ${active ? "text-sky" : "text-fg"}`}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}

const TURN_ICON: Record<Guidance["instruction"], IconName> = {
  straight: "arrowUp",
  left: "turnLeft",
  right: "turnRight",
  "u-turn": "uTurn",
  arrive: "flag",
};

function instructionText(g: Guidance): string {
  switch (g.instruction) {
    case "left":
      return `Turn left in ${formatDistance(g.distanceToTurn)}`;
    case "right":
      return `Turn right in ${formatDistance(g.distanceToTurn)}`;
    case "u-turn":
      return "Turn around when you can";
    case "arrive":
      return "Destination ahead";
    default:
      return `Continue for ${formatDistance(g.distanceToTurn)}`;
  }
}

/** Turn-by-turn guidance for the selected destination. */
function GuidanceCard() {
  const routeTargetId = useGameStore((s) => s.routeTargetId);
  const g = usePolled(() => runtime.guidance, 250);
  const target = routeTargetId ? getDestination(routeTargetId) : undefined;
  if (!target) return null;
  return (
    <div className="glass flex items-center gap-3 rounded-2xl py-2.5 pl-3 pr-2" data-testid="guidance">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky/15 text-sky">
        <Icon name={g ? TURN_ICON[g.instruction] : "flag"} size={24} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-fg">{g ? instructionText(g) : "Calculating route…"}</p>
        <p className="truncate text-xs text-muted">
          {target.name}
          {g ? ` · ${formatDistance(g.remaining)}` : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={clearRoute}
        aria-label="Cancel route"
        title="Cancel route"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-fg"
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

/**
 * The driving interface. Deliberately sparse: identity, four system buttons,
 * where you are, how fast you are going and three driving aids.
 */
export default function GameHUD({ touch }: { touch: boolean }) {
  const district = useGameStore((s) => s.district);
  const muted = useGameStore((s) => s.muted);
  const cameraMode = useGameStore((s) => s.cameraMode);
  const stuck = useGameStore((s) => s.stuck);
  const engineOn = useGameStore((s) => s.engineOn);
  const setMuted = useGameStore((s) => s.setMuted);
  const openOverlay = useGameStore((s) => s.openOverlay);
  const cycleCamera = useGameStore((s) => s.cycleCamera);
  const d = getDistrict(district);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-[var(--hud-pad)]" data-testid="hud">
      {/* Top left: identity. */}
      <div className="absolute left-[var(--hud-pad)] top-[var(--hud-pad)]">
        <p className="display text-lg font-semibold tracking-[0.2em] text-fg drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">{site.shortName}</p>
        {touch ? null : <p className="hud-label hidden drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:block">{site.disciplines.join(" · ")}</p>}
      </div>

      {/* Top right: system controls. */}
      <nav aria-label="Game controls" className="pointer-events-auto absolute right-[var(--hud-pad)] top-[var(--hud-pad)] flex gap-2">
        <HudButton icon="map" label="World map (M)" onClick={() => openOverlay("map")} testId="hud-map" />
        <HudButton icon={muted ? "mute" : "volume"} label={muted ? "Unmute sound (N)" : "Mute sound (N)"} onClick={() => setMuted(!muted)} active={muted} testId="hud-mute" />
        <HudButton icon="settings" label="Pause and settings (Esc)" onClick={() => openOverlay("settings")} testId="hud-settings" />
        <button
          type="button"
          onClick={() => openOverlay("menu")}
          className="glass display flex h-11 items-center gap-2 rounded-xl px-3.5 text-xs uppercase tracking-[0.16em] text-fg transition hover:bg-white/12"
          data-testid="hud-menu"
        >
          <Icon name="menu" size={20} /> <span className="hidden sm:inline">Portfolio</span>
          <span className="sr-only sm:hidden">Portfolio menu</span>
        </button>
      </nav>

      {/* Bottom left: where you are and where you are going. */}
      <div className={`pointer-events-auto absolute left-[var(--hud-pad)] flex max-w-[min(22rem,calc(100vw-2*var(--hud-pad)))] flex-col gap-2 ${
          touch ? "portrait:top-[calc(var(--hud-pad)+8.25rem)] landscape:top-[calc(var(--hud-pad)+3.75rem)]" : "bottom-[var(--hud-pad)]"
        }`}
      >
        <GuidanceCard />
        <div className="flex items-end gap-2">
          {touch ? null : (
            <div className="hidden lg:block">
              <MiniMap />
            </div>
          )}
          <div className={`glass rounded-2xl ${touch ? "px-3 py-1.5" : "px-4 py-2.5"}`} data-testid="district" data-district={district}>
            <p className={touch ? "sr-only" : "hud-label"}>Current district</p>
            <p className="display mt-0.5 flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} aria-hidden />
              {d.name}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom centre: speed. */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${
          touch ? "origin-top scale-[0.78] portrait:top-[calc(var(--hud-pad)+3.5rem)] landscape:top-[calc(var(--hud-pad)-0.25rem)]" : "bottom-[var(--hud-pad)]"
        }`}
      >
        {touch ? null : <DriftMeter />}
        <Speedometer />
        {touch ? (
          <div className="mt-2">
            <DriftMeter />
          </div>
        ) : null}
        {!engineOn ? <p className="mt-2 text-center text-xs text-amber drop-shadow">Engine off{touch ? "" : " · press I to start"}</p> : null}
      </div>

      {/* Bottom right: driving aids. */}
      {touch ? null : (
        <div className="pointer-events-auto absolute bottom-[var(--hud-pad)] right-[var(--hud-pad)] flex items-end gap-2">
          {stuck ? (
            <button
              type="button"
              onClick={recoverVehicle}
              className="glass animate-rise display flex h-11 items-center gap-2 rounded-xl border-amber/50 px-3 text-xs uppercase tracking-[0.14em] text-amber"
            >
              <Icon name="recover" /> Stuck? Recover (R)
            </button>
          ) : null}
          <button
            type="button"
            onClick={cycleCamera}
            className="glass display flex h-11 items-center gap-2 rounded-xl px-3 text-xs uppercase tracking-[0.14em] text-fg transition hover:bg-white/12"
            aria-label={`Camera: ${CAMERA_LABEL[cameraMode]}. Switch camera (C)`}
            title="Switch camera (C)"
            data-testid="hud-camera"
          >
            <Icon name="camera" size={20} /> <span className="hidden md:inline">{CAMERA_LABEL[cameraMode]}</span>
          </button>
          <HudButton icon="recover" label="Recover to road (R)" onClick={recoverVehicle} testId="hud-recover" />
          <HudButton icon="help" label="Controls (H)" onClick={() => openOverlay("controls")} testId="hud-help" />
        </div>
      )}
    </div>
  );
}
