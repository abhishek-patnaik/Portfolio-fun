/**
 * World layout: the single source of truth for where everything in the city is.
 *
 * This module is pure TypeScript (no three.js) so the same data drives rendering,
 * vehicle physics, the map, route finding and the unit tests.
 *
 * Coordinate system: metres, +X east, +Z south, +Y up. A heading `h` points
 * along (sin h, cos h), so north is h = π and east is h = π/2.
 */
import type {
  Block,
  Bridge,
  Collider,
  District,
  DistrictId,
  Rect,
  RoadEdge,
  RoadLine,
  RoadNode,
  Vec2,
} from "@/types/world";

export const ISLAND: Rect = { x0: -480, z0: -410, x1: 540, z1: 430 };
export const CHANNEL = { z0: 130, z1: 210 } as const;
export const QUAY_DEPTH = 11;
export const CURB = 0.14;
export const LANE_OFFSET = 4.5;

export const ROADS_X = [
  { x: -420, hw: 9, name: "West Shore Drive" },
  { x: -210, hw: 9, name: "Studio Street" },
  { x: 0, hw: 12, name: "Innovation Boulevard" },
  { x: 210, hw: 9, name: "Foundry Street" },
  { x: 420, hw: 9, name: "Harbor Drive" },
] as const;

export const ROADS_Z = [
  { z: -360, hw: 9, name: "Hillside Road" },
  { z: -190, hw: 9, name: "Campus Way" },
  { z: -20, hw: 12, name: "Central Avenue" },
  { z: 110, hw: 9, name: "North Quay" },
  { z: 230, hw: 9, name: "South Quay" },
  { z: 370, hw: 9, name: "Marina Road" },
] as const;

export const ROUNDABOUT = { x: 0, z: -20, rInner: 44, rOuter: 70, rMid: 57 } as const;

const BRIDGE_COLUMNS = [1, 2, 3] as const;
const BRIDGE_NAMES = ["Studio Bridge", "Gateway Bridge", "Foundry Bridge"];

export const BRIDGES: Bridge[] = BRIDGE_COLUMNS.map((col, i) => ({
  id: `bridge-${i}`,
  x: ROADS_X[col].x,
  halfWidth: ROADS_X[col].hw,
  z0: ROADS_Z[3].z + ROADS_Z[3].hw,
  z1: ROADS_Z[4].z - ROADS_Z[4].hw,
  height: col === 2 ? 4.2 : 3.4,
  name: BRIDGE_NAMES[i],
}));

/** Where the visitor starts: northbound on the boulevard, facing the central tower. */
export const SPAWN = { x: -LANE_OFFSET - 1, z: 318, heading: Math.PI } as const;

/* ------------------------------------------------------------------ */
/* Districts                                                           */
/* ------------------------------------------------------------------ */

export const DISTRICTS: District[] = [
  {
    id: "central",
    name: "Central Innovation District",
    purpose: "Introduction and professional identity",
    color: "#7cc4ff",
    rects: [{ x0: -210, z0: -190, x1: 210, z1: 120 }],
    labelAt: [0, -110],
  },
  {
    id: "career",
    name: "Career District",
    purpose: "Work experience and professional journey",
    color: "#ffb86b",
    rects: [{ x0: 0, z0: -410, x1: 540, z1: -190 }],
    labelAt: [250, -330],
  },
  {
    id: "knowledge",
    name: "Knowledge District",
    purpose: "Education and in-depth case studies",
    color: "#8be9c0",
    rects: [{ x0: -480, z0: -410, x1: 0, z1: -190 }],
    labelAt: [-250, -330],
  },
  {
    id: "projects",
    name: "Project District",
    purpose: "Technical projects and engineering work",
    color: "#5ee6ff",
    rects: [{ x0: 210, z0: -190, x1: 540, z1: 120 }],
    labelAt: [330, -150],
  },
  {
    id: "creative",
    name: "Creative District",
    purpose: "Design, branding and creative work",
    color: "#ff7ad9",
    rects: [{ x0: -480, z0: -190, x1: -210, z1: 120 }],
    labelAt: [-330, -150],
  },
  {
    id: "media",
    name: "Media District",
    purpose: "Articles, technical writing and insights",
    color: "#b79bff",
    rects: [{ x0: 210, z0: 220, x1: 540, z1: 430 }],
    labelAt: [330, 400],
  },
  {
    id: "contact",
    name: "Contact & Community District",
    purpose: "Contact, profiles and collaboration",
    color: "#ffd166",
    rects: [{ x0: -480, z0: 220, x1: -210, z1: 430 }],
    labelAt: [-330, 400],
  },
  {
    id: "waterfront",
    name: "Waterfront & Leisure District",
    purpose: "Promenades, marina and scenic drives",
    color: "#6fd3c7",
    rects: [
      { x0: -480, z0: 120, x1: 540, z1: 220 },
      { x0: -210, z0: 220, x1: 210, z1: 430 },
    ],
    labelAt: [0, 400],
  },
];

const DISTRICT_BY_ID = new Map(DISTRICTS.map((d) => [d.id, d]));

export function getDistrict(id: DistrictId): District {
  const d = DISTRICT_BY_ID.get(id);
  if (!d) throw new Error(`Unknown district ${id}`);
  return d;
}

export function inRect(r: Rect, x: number, z: number): boolean {
  return x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1;
}

export function districtAt(x: number, z: number): DistrictId {
  for (const d of DISTRICTS) {
    for (const r of d.rects) if (inRect(r, x, z)) return d.id;
  }
  return "waterfront";
}

/* ------------------------------------------------------------------ */
/* Blocks (raised pavement slabs between the roads)                    */
/* ------------------------------------------------------------------ */

function makeBlocks(): Block[] {
  const blocks: Block[] = [];
  const push = (id: string, kind: Block["kind"], rect: Rect, cornerRadius: number) => {
    const cx = (rect.x0 + rect.x1) / 2;
    const cz = (rect.z0 + rect.z1) / 2;
    blocks.push({ id, kind, rect, cornerRadius, district: districtAt(cx, cz) });
  };

  for (let i = 0; i < ROADS_X.length - 1; i++) {
    for (const j of [0, 1, 2, 4]) {
      push(
        `block-${i}-${j}`,
        "city",
        {
          x0: ROADS_X[i].x + ROADS_X[i].hw,
          x1: ROADS_X[i + 1].x - ROADS_X[i + 1].hw,
          z0: ROADS_Z[j].z + ROADS_Z[j].hw,
          z1: ROADS_Z[j + 1].z - ROADS_Z[j + 1].hw,
        },
        6,
      );
    }
  }

  // Quays on both banks of the channel, interrupted by the bridge approaches.
  const northQuay = { z0: CHANNEL.z0 - QUAY_DEPTH, z1: CHANNEL.z0 };
  const southQuay = { z0: CHANNEL.z1, z1: CHANNEL.z1 + QUAY_DEPTH };
  const cuts = BRIDGES.map((b) => [b.x - b.halfWidth, b.x + b.halfWidth] as const);
  let start = ISLAND.x0;
  const spans: [number, number][] = [];
  for (const [a, b] of cuts) {
    spans.push([start, a]);
    start = b;
  }
  spans.push([start, ISLAND.x1]);
  spans.forEach(([x0, x1], i) => {
    push(`quay-n-${i}`, "quay", { x0, x1, ...northQuay }, 0);
    push(`quay-s-${i}`, "quay", { x0, x1, ...southQuay }, 0);
  });

  const west = ROADS_X[0].x - ROADS_X[0].hw;
  const east = ROADS_X[4].x + ROADS_X[4].hw;
  const north = ROADS_Z[0].z - ROADS_Z[0].hw;
  const south = ROADS_Z[5].z + ROADS_Z[5].hw;
  push("perimeter-n", "perimeter", { x0: ISLAND.x0, x1: ISLAND.x1, z0: ISLAND.z0, z1: north }, 0);
  push("perimeter-s", "perimeter", { x0: ISLAND.x0, x1: ISLAND.x1, z0: south, z1: ISLAND.z1 }, 0);
  push("perimeter-wn", "perimeter", { x0: ISLAND.x0, x1: west, z0: north, z1: northQuay.z0 }, 0);
  push("perimeter-ws", "perimeter", { x0: ISLAND.x0, x1: west, z0: southQuay.z1, z1: south }, 0);
  push("harbor-n", "harbor", { x0: east, x1: ISLAND.x1, z0: north, z1: northQuay.z0 }, 0);
  push("harbor-s", "harbor", { x0: east, x1: ISLAND.x1, z0: southQuay.z1, z1: south }, 0);
  return blocks;
}

export const BLOCKS: Block[] = makeBlocks();

/** Signed distance to a rounded rectangle. Negative inside. */
export function sdRoundRect(px: number, pz: number, r: Rect, radius: number): number {
  const cx = (r.x0 + r.x1) / 2;
  const cz = (r.z0 + r.z1) / 2;
  const hx = (r.x1 - r.x0) / 2 - radius;
  const hz = (r.z1 - r.z0) / 2 - radius;
  const dx = Math.abs(px - cx) - hx;
  const dz = Math.abs(pz - cz) - hz;
  return Math.hypot(Math.max(dx, 0), Math.max(dz, 0)) + Math.min(Math.max(dx, dz), 0) - radius;
}

function smoothstep(e0: number, e1: number, v: number): number {
  const t = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export function bridgeAt(x: number, z: number): Bridge | null {
  for (const b of BRIDGES) {
    if (z >= b.z0 && z <= b.z1 && Math.abs(x - b.x) <= b.halfWidth + 1.3) return b;
  }
  return null;
}

/** Height of a bridge deck at z. Zero gradient at both ends so the car eases on. */
export function bridgeHeight(b: Bridge, z: number): number {
  const t = Math.min(1, Math.max(0, (z - b.z0) / (b.z1 - b.z0)));
  return (b.height * (1 - Math.cos(2 * Math.PI * t))) / 2;
}

/**
 * Signed distance to the nearest raised pavement (negative = on pavement).
 * The roundabout is carved out of the blocks around it.
 */
export function pavementDistance(x: number, z: number): number {
  const dRing = Math.hypot(x - ROUNDABOUT.x, z - ROUNDABOUT.z);
  let best = dRing - ROUNDABOUT.rInner;
  const carve = ROUNDABOUT.rOuter - dRing;
  for (const b of BLOCKS) {
    const r = b.rect;
    // Cheap reject: more than 2 m outside the rectangle.
    if (x < r.x0 - 2 || x > r.x1 + 2 || z < r.z0 - 2 || z > r.z1 + 2) continue;
    const sd = Math.max(sdRoundRect(x, z, r, b.cornerRadius), carve);
    if (sd < best) best = sd;
  }
  return best;
}

export type Surface = "road" | "pavement" | "bridge" | "water" | "outside";

export function surfaceAt(x: number, z: number): Surface {
  if (!inRect(ISLAND, x, z)) return "outside";
  if (bridgeAt(x, z)) return "bridge";
  if (z > CHANNEL.z0 && z < CHANNEL.z1) return "water";
  return pavementDistance(x, z) < 0 ? "pavement" : "road";
}

/** Ground height under a point. Roads are 0, pavements are a curb higher, bridges arch. */
export function groundHeight(x: number, z: number): number {
  const b = bridgeAt(x, z);
  if (b) return bridgeHeight(b, z);
  return CURB * smoothstep(0, 0.35, -pavementDistance(x, z));
}

export function isOnRoad(x: number, z: number): boolean {
  const s = surfaceAt(x, z);
  return s === "road" || s === "bridge";
}

/* ------------------------------------------------------------------ */
/* Roads                                                               */
/* ------------------------------------------------------------------ */

function makeRoadLines(): RoadLine[] {
  const lines: RoadLine[] = [];
  const zNorthEnd = ROADS_Z[0].z;
  const zQuayN = ROADS_Z[3].z;
  const zQuayS = ROADS_Z[4].z;
  const zSouthEnd = ROADS_Z[5].z;
  ROADS_X.forEach((r, i) => {
    const kind = r.hw > 10 ? "avenue" : "street";
    lines.push({ id: `x${i}-n`, axis: "x", at: r.x, from: zNorthEnd, to: zQuayN, halfWidth: r.hw, kind, name: r.name });
    lines.push({ id: `x${i}-s`, axis: "x", at: r.x, from: zQuayS, to: zSouthEnd, halfWidth: r.hw, kind, name: r.name });
  });
  BRIDGES.forEach((b) => {
    lines.push({ id: b.id, axis: "x", at: b.x, from: zQuayN, to: zQuayS, halfWidth: b.halfWidth, kind: "bridge", name: b.name });
  });
  ROADS_Z.forEach((r, j) => {
    lines.push({
      id: `z${j}`,
      axis: "z",
      at: r.z,
      from: ROADS_X[0].x,
      to: ROADS_X[4].x,
      halfWidth: r.hw,
      kind: r.hw > 10 ? "avenue" : "street",
      name: r.name,
    });
  });
  return lines;
}

export const ROAD_LINES: RoadLine[] = makeRoadLines();

function nodeId(i: number, j: number): string {
  return `n-${i}-${j}`;
}

function makeGraph(): { nodes: RoadNode[]; edges: RoadEdge[] } {
  const nodes: RoadNode[] = [];
  const edges: RoadEdge[] = [];
  for (let i = 0; i < ROADS_X.length; i++) {
    for (let j = 0; j < ROADS_Z.length; j++) {
      if (i === 2 && j === 2) continue; // replaced by the roundabout
      nodes.push({ id: nodeId(i, j), x: ROADS_X[i].x, z: ROADS_Z[j].z });
    }
  }
  const { x: cx, z: cz, rMid } = ROUNDABOUT;
  const ring: Record<string, RoadNode> = {
    n: { id: "ring-n", x: cx, z: cz - rMid },
    e: { id: "ring-e", x: cx + rMid, z: cz },
    s: { id: "ring-s", x: cx, z: cz + rMid },
    w: { id: "ring-w", x: cx - rMid, z: cz },
  };
  nodes.push(ring.n, ring.e, ring.s, ring.w);
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const straight = (a: string, b: string) => {
    const na = byId.get(a);
    const nb = byId.get(b);
    if (!na || !nb) throw new Error(`Missing node for edge ${a}-${b}`);
    edges.push({
      id: `${a}|${b}`,
      a,
      b,
      length: Math.hypot(nb.x - na.x, nb.z - na.z),
      points: [
        [na.x, na.z],
        [nb.x, nb.z],
      ],
    });
  };

  const bridgeCols = new Set<number>(BRIDGE_COLUMNS);
  for (let i = 0; i < ROADS_X.length; i++) {
    for (let j = 0; j < ROADS_Z.length - 1; j++) {
      if (j === 3 && !bridgeCols.has(i)) continue; // no bridge on the outer roads
      if (i === 2 && j === 1) straight(nodeId(2, 1), "ring-n");
      else if (i === 2 && j === 2) straight("ring-s", nodeId(2, 3));
      else straight(nodeId(i, j), nodeId(i, j + 1));
    }
  }
  for (let j = 0; j < ROADS_Z.length; j++) {
    for (let i = 0; i < ROADS_X.length - 1; i++) {
      if (j === 2 && i === 1) straight(nodeId(1, 2), "ring-w");
      else if (j === 2 && i === 2) straight("ring-e", nodeId(3, 2));
      else straight(nodeId(i, j), nodeId(i + 1, j));
    }
  }

  const arc = (from: RoadNode, to: RoadNode, a0: number, a1: number) => {
    const points: Vec2[] = [];
    const steps = 10;
    for (let s = 0; s <= steps; s++) {
      const a = a0 + ((a1 - a0) * s) / steps;
      points.push([cx + Math.cos(a) * rMid, cz + Math.sin(a) * rMid]);
    }
    edges.push({ id: `${from.id}|${to.id}`, a: from.id, b: to.id, length: (Math.PI / 2) * rMid, points });
  };
  // Angles measured from +X towards +Z.
  arc(ring.e, ring.s, 0, Math.PI / 2);
  arc(ring.s, ring.w, Math.PI / 2, Math.PI);
  arc(ring.w, ring.n, Math.PI, Math.PI * 1.5);
  arc(ring.n, ring.e, Math.PI * 1.5, Math.PI * 2);
  return { nodes, edges };
}

const GRAPH = makeGraph();
export const ROAD_NODES: RoadNode[] = GRAPH.nodes;
export const ROAD_EDGES: RoadEdge[] = GRAPH.edges;

/* ------------------------------------------------------------------ */
/* Static colliders: sea walls, channel walls and bridge parapets      */
/* ------------------------------------------------------------------ */

function makeStaticColliders(): Collider[] {
  const c: Collider[] = [];
  const t = 8;
  c.push({ type: "box", x0: ISLAND.x0 - t, x1: ISLAND.x1 + t, z0: ISLAND.z0 - t, z1: ISLAND.z0 + 1 });
  c.push({ type: "box", x0: ISLAND.x0 - t, x1: ISLAND.x1 + t, z0: ISLAND.z1 - 1, z1: ISLAND.z1 + t });
  c.push({ type: "box", x0: ISLAND.x0 - t, x1: ISLAND.x0 + 1, z0: ISLAND.z0 - t, z1: ISLAND.z1 + t });
  c.push({ type: "box", x0: ISLAND.x1 - 1, x1: ISLAND.x1 + t, z0: ISLAND.z0 - t, z1: ISLAND.z1 + t });

  const rail = 1.2;
  let start = ISLAND.x0 - t;
  const gaps = BRIDGES.map((b) => [b.x - b.halfWidth - rail, b.x + b.halfWidth + rail] as const);
  const spans: [number, number][] = [];
  for (const [a, b] of gaps) {
    spans.push([start, a]);
    start = b;
  }
  spans.push([start, ISLAND.x1 + t]);
  for (const [x0, x1] of spans) {
    c.push({ type: "box", x0, x1, z0: CHANNEL.z0 - 1, z1: CHANNEL.z0 + 1.5 });
    c.push({ type: "box", x0, x1, z0: CHANNEL.z1 - 1.5, z1: CHANNEL.z1 + 1 });
  }
  for (const b of BRIDGES) {
    const z0 = CHANNEL.z0 - 1;
    const z1 = CHANNEL.z1 + 1;
    c.push({ type: "box", x0: b.x - b.halfWidth - rail, x1: b.x - b.halfWidth - 0.1, z0, z1 });
    c.push({ type: "box", x0: b.x + b.halfWidth + 0.1, x1: b.x + b.halfWidth + rail, z0, z1 });
  }
  return c;
}

export const STATIC_COLLIDERS: Collider[] = makeStaticColliders();

/* ------------------------------------------------------------------ */
/* Helpers shared by the renderer, the physics and the map             */
/* ------------------------------------------------------------------ */

export function headingToVector(h: number): Vec2 {
  return [Math.sin(h), Math.cos(h)];
}

export function vectorToHeading(x: number, z: number): number {
  return Math.atan2(x, z);
}

export function wrapAngle(a: number): number {
  let r = a % (Math.PI * 2);
  if (r > Math.PI) r -= Math.PI * 2;
  if (r < -Math.PI) r += Math.PI * 2;
  return r;
}

export function rectCenter(r: Rect): Vec2 {
  return [(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2];
}

export function rectsOverlap(a: Rect, b: Rect, margin = 0): boolean {
  return a.x0 < b.x1 + margin && a.x1 > b.x0 - margin && a.z0 < b.z1 + margin && a.z1 > b.z0 - margin;
}

export interface Gantry {
  id: string;
  x: number;
  z: number;
  /** Axis of the road the gantry spans. */
  axis: "x" | "z";
  /** Heading of the traffic that reads the sign. */
  facing: number;
  halfWidth: number;
  entries: { label: string; arrow: "up" | "left" | "right" }[];
}

/** Overhead direction signs on the main approaches. */
export const GANTRIES: Gantry[] = [
  {
    id: "gantry-gateway",
    x: 0,
    z: 262,
    axis: "x",
    facing: Math.PI,
    halfWidth: 12,
    entries: [
      { label: "Contact Plaza", arrow: "left" },
      { label: "Central District", arrow: "up" },
      { label: "Media District", arrow: "right" },
    ],
  },
  {
    id: "gantry-avenue-east",
    x: 150,
    z: -20,
    axis: "z",
    facing: Math.PI / 2,
    halfWidth: 12,
    entries: [
      { label: "Career District", arrow: "left" },
      { label: "Project District", arrow: "up" },
      { label: "Harbor", arrow: "up" },
    ],
  },
  {
    id: "gantry-avenue-west",
    x: -150,
    z: -20,
    axis: "z",
    facing: -Math.PI / 2,
    halfWidth: 12,
    entries: [
      { label: "Creative District", arrow: "up" },
      { label: "Knowledge District", arrow: "right" },
      { label: "Waterfront", arrow: "left" },
    ],
  },
  {
    id: "gantry-north",
    x: 0,
    z: -156,
    axis: "x",
    facing: 0,
    halfWidth: 12,
    entries: [
      { label: "Knowledge District", arrow: "right" },
      { label: "Central District", arrow: "up" },
      { label: "Career District", arrow: "left" },
    ],
  },
];

export const WORLD_BOUNDS: Rect = {
  x0: ISLAND.x0 - 40,
  z0: ISLAND.z0 - 40,
  x1: ISLAND.x1 + 40,
  z1: ISLAND.z1 + 40,
};
