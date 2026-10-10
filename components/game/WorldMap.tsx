"use client";

import { memo, useMemo, useRef, useState } from "react";
import type { Destination } from "@/types/world";
import { destinations } from "@/lib/data/landmarks";
import { fastTravelTo, openDestination, setRouteTo, clearRoute } from "@/lib/game/actions";
import { formatDistance } from "@/lib/game/navigation";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { BLOCKS, BRIDGES, CHANNEL, DISTRICTS, ISLAND, ROAD_LINES, ROUNDABOUT, getDistrict } from "@/lib/world/layout";
import { buttonClass } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { useFrameLoop, usePolled } from "./useHud";

const VIEW = { x: ISLAND.x0 - 40, y: ISLAND.z0 - 110, w: ISLAND.x1 - ISLAND.x0 + 80, h: ISLAND.z1 - ISLAND.z0 + 150 };

/** Static cartography: sea, land, districts, blocks, roads and bridges. */
export const MapBase = memo(function MapBase({ labels }: { labels: boolean }) {
  return (
    <g>
      <rect x={VIEW.x - 400} y={VIEW.y - 400} width={VIEW.w + 800} height={VIEW.h + 800} fill="#081220" />
      {/* Hills north of the city. */}
      <path
        d={`M${ISLAND.x0} ${ISLAND.z0} C ${ISLAND.x0 + 60} ${ISLAND.z0 - 120}, ${ISLAND.x0 + 380} ${ISLAND.z0 - 130}, ${ISLAND.x0 + 520} ${ISLAND.z0 - 60} S ${ISLAND.x1 - 80} ${ISLAND.z0 - 110}, ${ISLAND.x1} ${ISLAND.z0} Z`}
        fill="#16302a"
      />
      <rect x={ISLAND.x0} y={ISLAND.z0} width={ISLAND.x1 - ISLAND.x0} height={ISLAND.z1 - ISLAND.z0} rx={10} fill="#1a2230" />
      {DISTRICTS.map((d) =>
        d.rects.map((r, i) => (
          <rect key={`${d.id}-${i}`} x={r.x0} y={r.z0} width={r.x1 - r.x0} height={r.z1 - r.z0} fill={d.color} opacity={0.1} />
        )),
      )}
      {ROAD_LINES.filter((l) => l.kind !== "bridge").map((l) =>
        l.axis === "x" ? (
          <rect key={l.id} x={l.at - l.halfWidth} y={l.from - 9} width={l.halfWidth * 2} height={l.to - l.from + 18} fill="#39455a" />
        ) : (
          <rect key={l.id} x={l.from - 9} y={l.at - l.halfWidth} width={l.to - l.from + 18} height={l.halfWidth * 2} fill="#39455a" />
        ),
      )}
      {BLOCKS.map((b) => (
        <rect
          key={b.id}
          x={b.rect.x0}
          y={b.rect.z0}
          width={b.rect.x1 - b.rect.x0}
          height={b.rect.z1 - b.rect.z0}
          rx={b.cornerRadius}
          fill={b.kind === "harbor" ? "#232b38" : b.kind === "quay" ? "#2c3442" : "#202a3a"}
        />
      ))}
      <rect x={ISLAND.x0 - 400} y={CHANNEL.z0} width={ISLAND.x1 - ISLAND.x0 + 800} height={CHANNEL.z1 - CHANNEL.z0} fill="#0c2740" />
      {BRIDGES.map((b) => (
        <rect key={b.id} x={b.x - b.halfWidth} y={b.z0} width={b.halfWidth * 2} height={b.z1 - b.z0} fill="#56657d" />
      ))}
      <circle cx={ROUNDABOUT.x} cy={ROUNDABOUT.z} r={ROUNDABOUT.rOuter} fill="#39455a" />
      <circle cx={ROUNDABOUT.x} cy={ROUNDABOUT.z} r={ROUNDABOUT.rInner} fill="#202a3a" />
      {labels
        ? DISTRICTS.map((d) => (
            <text
              key={d.id}
              x={d.labelAt[0]}
              y={d.labelAt[1]}
              textAnchor="middle"
              fontSize={17}
              fill={d.color}
              opacity={0.85}
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              {d.name.replace(" District", "").replace(" & Community", "").replace(" & Leisure", "")}
            </text>
          ))
        : null}
    </g>
  );
});

function carRotation(heading: number): number {
  return 180 - (heading * 180) / Math.PI;
}

function CarMarker({ scale = 1 }: { scale?: number }) {
  const ref = useRef<SVGGElement>(null);
  useFrameLoop(() => {
    const v = runtime.vehicle;
    ref.current?.setAttribute("transform", `translate(${v.x.toFixed(1)} ${v.z.toFixed(1)}) rotate(${carRotation(v.heading).toFixed(1)}) scale(${scale})`);
  });
  return (
    <g ref={ref} data-testid="map-car">
      <circle r={17} fill="#7cc4ff" opacity={0.18} />
      <path d="M0 -15 L10 11 L0 5 L-10 11 Z" fill="#ffffff" stroke="#0b1220" strokeWidth={2} />
    </g>
  );
}

function RouteLine() {
  const version = usePolled(() => runtime.routeVersion, 300);
  const points = useMemo(() => {
    void version;
    return runtime.route ? runtime.route.points.map(([x, z]) => `${x.toFixed(1)},${z.toFixed(1)}`).join(" ") : "";
  }, [version]);
  if (!points) return null;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={points} stroke="#7cc4ff" strokeWidth={11} opacity={0.25} />
      <polyline points={points} stroke="#bfe6ff" strokeWidth={4} strokeDasharray="2 10" />
    </g>
  );
}

/** Small always-on map in the HUD that follows the car. */
export function MiniMap() {
  const svg = useRef<SVGSVGElement>(null);
  const routeTargetId = useGameStore((s) => s.routeTargetId);
  useFrameLoop(() => {
    const v = runtime.vehicle;
    svg.current?.setAttribute("viewBox", `${(v.x - 150).toFixed(0)} ${(v.z - 150).toFixed(0)} 300 300`);
  });
  return (
    <div className="glass h-36 w-36 overflow-hidden rounded-2xl p-0" aria-hidden="true" data-testid="minimap">
      <svg ref={svg} viewBox="-150 150 300 300" className="h-full w-full">
        <MapBase labels={false} />
        <RouteLine />
        {destinations
          .filter((d) => d.kind === "section" || d.id === routeTargetId)
          .map((d) => (
            <circle key={d.id} cx={d.position[0]} cy={d.position[1]} r={d.id === routeTargetId ? 13 : 9} fill={d.color} stroke="#0b1220" strokeWidth={2} />
          ))}
        <CarMarker scale={1.1} />
      </svg>
    </div>
  );
}

function Marker({ d, selected, known, onSelect }: { d: Destination; selected: boolean; known: boolean; onSelect: (id: string) => void }) {
  const r = d.kind === "section" ? 15 : 9;
  const label = known || d.kind !== "easter-egg" ? `${d.name}, ${d.category}` : "Undiscovered location";
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={selected}
      transform={`translate(${d.position[0]} ${d.position[1]})`}
      onClick={() => onSelect(d.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(d.id);
        }
      }}
      className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:opacity-100"
      data-testid={`map-marker-${d.id}`}
    >
      <circle r={r + 9} fill="none" stroke="#ffffff" strokeWidth={2.5} opacity={selected ? 1 : 0} />
      {d.kind === "easter-egg" ? (
        <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={3} transform="rotate(45)" fill={known ? d.color : "#5b6678"} stroke="#0b1220" strokeWidth={2.5} />
      ) : (
        <circle r={r} fill={d.color} stroke="#0b1220" strokeWidth={2.5} />
      )}
      {d.kind === "section" ? <circle r={5} fill="#0b1220" /> : null}
      {d.kind === "easter-egg" && !known ? (
        <text y={5} textAnchor="middle" fontSize={15} fill="#0b1220" fontWeight={700}>
          ?
        </text>
      ) : null}
    </g>
  );
}

/** Full-screen city map: pick a landmark, then open it, route to it or jump there. */
export default function WorldMap({ onClose }: { onClose: () => void }) {
  const discovered = useGameStore((s) => s.discovered);
  const routeTargetId = useGameStore((s) => s.routeTargetId);
  const nearbyId = useGameStore((s) => s.nearbyId);
  const [selectedId, setSelectedId] = useState<string>(routeTargetId ?? nearbyId ?? "home");
  const selected = destinations.find((d) => d.id === selectedId) ?? destinations[0];
  const known = (d: Destination) => d.kind !== "easter-egg" || discovered.includes(d.id);
  const distance = usePolled(() => Math.hypot(runtime.vehicle.x - selected.access.x, runtime.vehicle.z - selected.access.z), 500);
  const grouped = useMemo(
    () =>
      DISTRICTS.map((district) => ({
        district,
        items: destinations.filter((d) => d.district === district.id),
      })).filter((g) => g.items.length > 0),
    [],
  );

  return (
    <Modal title="City Map" kicker="Navigation" onClose={onClose} size="full" fill testId="world-map" bodyClassName="!p-0 !overflow-hidden">
      <div className="grid h-full min-h-0 grid-rows-[minmax(0,1.1fr)_minmax(0,1fr)] lg:grid-cols-[1fr_22rem] lg:grid-rows-1">
        <div className="relative min-h-0 bg-[#081220]">
          <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 h-full w-full" role="group" aria-label="Map of the city with portfolio destinations">
            <MapBase labels />
            <RouteLine />
            {destinations.map((d) => (
              <Marker key={d.id} d={d} selected={d.id === selected.id} known={known(d)} onSelect={setSelectedId} />
            ))}
            <CarMarker scale={1.5} />
          </svg>
          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-x-4 gap-y-1 rounded-lg bg-ink/70 px-3 py-2 text-[0.6875rem] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky ring-2 ring-ink" /> Section
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted" /> Item
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rotate-45 bg-muted" /> Discovery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-fg">▲</span> You
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-col border-t border-line lg:border-l lg:border-t-0">
          <div className="shrink-0 border-b border-line p-4" data-testid="map-selection">
            <p className="hud-label" style={{ color: selected.color }}>
              {getDistrict(selected.district).name}
            </p>
            <h3 className="display mt-1 text-xl font-semibold leading-snug text-fg">{known(selected) ? selected.name : "Undiscovered location"}</h3>
            <p className="mt-0.5 text-sm text-muted">{known(selected) ? selected.category : "Drive there to find out what it is."}</p>
            {known(selected) ? <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{selected.description}</p> : null}
            <p className="mt-2 font-mono text-xs text-dim">{formatDistance(distance)} away</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {known(selected) ? (
                <button type="button" className={buttonClass("primary", "sm", "col-span-2")} onClick={() => openDestination(selected.id)} data-testid="map-open">
                  <Icon name="arrowRight" size={16} /> Open
                </button>
              ) : null}
              {routeTargetId === selected.id ? (
                <button type="button" className={buttonClass("outline", "sm")} onClick={clearRoute}>
                  <Icon name="close" size={16} /> Clear route
                </button>
              ) : (
                <button type="button" className={buttonClass("outline", "sm")} onClick={() => setRouteTo(selected.id)} data-testid="map-route">
                  <Icon name="flag" size={16} /> Set route
                </button>
              )}
              <button type="button" className={buttonClass("outline", "sm")} onClick={() => fastTravelTo(selected.id)} data-testid="map-travel">
                <Icon name="pin" size={16} /> Go there
              </button>
            </div>
          </div>
          <nav aria-label="Destinations" className="thin-scroll min-h-0 flex-1 overflow-y-auto p-2">
            {grouped.map(({ district, items }) => (
              <div key={district.id} className="mb-2">
                <p className="hud-label px-2 py-1.5" style={{ color: district.color }}>
                  {district.name}
                </p>
                <ul>
                  {items.map((d) => (
                    <li key={d.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(d.id)}
                        aria-current={d.id === selected.id}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm transition ${
                          d.id === selected.id ? "bg-white/10 text-fg" : "text-muted hover:bg-white/5 hover:text-fg"
                        }`}
                      >
                        <span className={`h-2 w-2 shrink-0 ${d.kind === "easter-egg" ? "rotate-45" : "rounded-full"}`} style={{ background: known(d) ? d.color : "#5b6678" }} />
                        <span className="min-w-0 flex-1 truncate">{known(d) ? d.name : "Undiscovered location"}</span>
                        {discovered.includes(d.id) ? <Icon name="check" size={14} className="shrink-0 text-mint" /> : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </Modal>
  );
}
