/**
 * Deterministic procedural city generation.
 *
 * Produces plain data (boxes, prop points and colliders) from the layout. The
 * renderer turns it into instanced meshes; the physics uses the colliders.
 * Nothing here touches three.js, so it runs in unit tests as well.
 */
import type {
  Billboard,
  Block,
  BuildingBox,
  CityData,
  Collider,
  Destination,
  DistrictId,
  PropPoint,
  Rect,
  Skybridge,
} from "@/types/world";
import { createRng, type Rng } from "@/lib/game/rng";
import {
  BLOCKS,
  BRIDGES,
  CHANNEL,
  CURB,
  GANTRIES,
  ISLAND,
  ROAD_LINES,
  ROUNDABOUT,
  bridgeHeight,
  getDistrict,
  pavementDistance,
  rectsOverlap,
} from "./layout";
import { landmarkColliders, landmarkReserve } from "./footprints";

type RGB = readonly [number, number, number];

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const GLASS_TINTS: RGB[] = [
  [0.26, 0.38, 0.54],
  [0.16, 0.22, 0.32],
  [0.34, 0.48, 0.6],
  [0.14, 0.2, 0.28],
  [0.44, 0.54, 0.64],
  [0.2, 0.36, 0.44],
  [0.3, 0.32, 0.46],
];
const STONE_TINTS: RGB[] = [
  [0.62, 0.57, 0.5],
  [0.5, 0.48, 0.46],
  [0.7, 0.66, 0.6],
  [0.4, 0.38, 0.38],
  [0.6, 0.5, 0.42],
  [0.46, 0.5, 0.56],
];
const CREATIVE_TINTS: RGB[] = [
  [0.7, 0.36, 0.46],
  [0.38, 0.32, 0.58],
  [0.78, 0.58, 0.34],
  [0.26, 0.5, 0.54],
  [0.72, 0.7, 0.68],
  [0.24, 0.26, 0.36],
];
const CONTAINER_TINTS: RGB[] = [
  [0.72, 0.16, 0.12],
  [0.12, 0.32, 0.55],
  [0.85, 0.52, 0.1],
  [0.16, 0.45, 0.32],
  [0.75, 0.75, 0.72],
  [0.3, 0.32, 0.36],
];

interface DistrictProfile {
  minH: number;
  maxH: number;
  styles: number[];
  tints: RGB[];
  maxLot: number;
  park: number;
  lit: [number, number];
}

const PROFILES: Record<DistrictId, DistrictProfile> = {
  central: { minH: 80, maxH: 215, styles: [0, 0, 3, 1], tints: GLASS_TINTS, maxLot: 48, park: 0.06, lit: [0.35, 0.7] },
  career: { minH: 55, maxH: 165, styles: [1, 0, 0, 3], tints: [...GLASS_TINTS, ...STONE_TINTS.slice(0, 3)], maxLot: 46, park: 0.05, lit: [0.3, 0.65] },
  projects: { minH: 24, maxH: 100, styles: [4, 1, 0, 3], tints: [...GLASS_TINTS, [0.7, 0.72, 0.76]], maxLot: 46, park: 0.08, lit: [0.2, 0.5] },
  creative: { minH: 20, maxH: 86, styles: [2, 1, 3, 0], tints: CREATIVE_TINTS, maxLot: 40, park: 0.1, lit: [0.3, 0.6] },
  knowledge: { minH: 16, maxH: 56, styles: [2, 1, 1], tints: STONE_TINTS, maxLot: 40, park: 0.16, lit: [0.25, 0.5] },
  media: { minH: 34, maxH: 125, styles: [0, 3, 1], tints: GLASS_TINTS, maxLot: 44, park: 0.06, lit: [0.35, 0.7] },
  contact: { minH: 18, maxH: 66, styles: [2, 1, 0], tints: [...STONE_TINTS, ...GLASS_TINTS], maxLot: 40, park: 0.14, lit: [0.3, 0.6] },
  waterfront: { minH: 14, maxH: 50, styles: [2, 2, 1, 0], tints: [...STONE_TINTS, ...GLASS_TINTS.slice(0, 2)], maxLot: 40, park: 0.18, lit: [0.35, 0.65] },
};

function splitLots(rect: Rect, maxLot: number, rng: Rng, out: Rect[]): void {
  const w = rect.x1 - rect.x0;
  const d = rect.z1 - rect.z0;
  if (w <= maxLot && d <= maxLot) {
    out.push(rect);
    return;
  }
  const alongX = w === d ? rng.chance(0.5) : w > d;
  const t = rng.range(0.42, 0.58);
  if (alongX) {
    const m = rect.x0 + w * t;
    splitLots({ ...rect, x1: m }, maxLot, rng, out);
    splitLots({ ...rect, x0: m }, maxLot, rng, out);
  } else {
    const m = rect.z0 + d * t;
    splitLots({ ...rect, z1: m }, maxLot, rng, out);
    splitLots({ ...rect, z0: m }, maxLot, rng, out);
  }
}

function distToRect(r: Rect, x: number, z: number): number {
  const dx = Math.max(r.x0 - x, 0, x - r.x1);
  const dz = Math.max(r.z0 - z, 0, z - r.z1);
  return Math.hypot(dx, dz);
}

function inset(r: Rect, m: number): Rect {
  return { x0: r.x0 + m, z0: r.z0 + m, x1: r.x1 - m, z1: r.z1 - m };
}

interface Ctx {
  rng: Rng;
  buildings: BuildingBox[];
  roofProps: BuildingBox[];
  trees: PropPoint[];
  colliders: Collider[];
  parks: Rect[];
  billboards: Billboard[];
}

function addPark(ctx: Ctx, lot: Rect): void {
  const { rng } = ctx;
  const area = inset(lot, 3);
  ctx.parks.push(area);
  const count = Math.round(((area.x1 - area.x0) * (area.z1 - area.z0)) / 150);
  for (let i = 0; i < count; i++) {
    const x = rng.range(area.x0 + 2, area.x1 - 2);
    const z = rng.range(area.z0 + 2, area.z1 - 2);
    ctx.trees.push({ x, z, y: CURB, rot: rng.range(0, Math.PI * 2), scale: rng.range(0.8, 1.5) });
    ctx.colliders.push({ type: "circle", x, z, r: 0.45 });
  }
}

function addBuilding(ctx: Ctx, lot: Rect, district: DistrictId, heightScale: number): void {
  const { rng } = ctx;
  const p = PROFILES[district];
  const gap = rng.range(2.5, 5);
  const f = inset(lot, gap);
  const fw = f.x1 - f.x0;
  const fd = f.z1 - f.z0;
  if (fw < 12 || fd < 12) return;
  const cx = (f.x0 + f.x1) / 2;
  const cz = (f.z0 + f.z1) / 2;
  const dCenter = Math.hypot(cx - ROUNDABOUT.x, cz - ROUNDABOUT.z);
  const falloff = Math.min(1, Math.max(0.35, 1.15 - dCenter / 560));
  const h = Math.round((p.minH + (p.maxH - p.minH) * Math.pow(rng.next(), 1.6)) * falloff * heightScale);
  const style = rng.pick(p.styles);
  const tint = rng.pick(p.tints);
  const accent = hexToRgb(getDistrict(district).color);
  const lit = rng.range(p.lit[0], p.lit[1]);
  const seed = rng.int(1, 999);
  const hasAccent = rng.chance(style === 3 || style === 4 ? 0.9 : 0.4);
  const acc: RGB = hasAccent ? accent : [0, 0, 0];
  const base = CURB;

  ctx.colliders.push({ type: "box", x0: f.x0, x1: f.x1, z0: f.z0, z1: f.z1 });

  if (h < 36) {
    ctx.buildings.push({ x: cx, z: cz, y: base, w: fw, d: fd, h, style, seed, tint, accent: acc, lit });
    if (rng.chance(0.6)) {
      ctx.roofProps.push({
        x: cx + rng.range(-fw * 0.2, fw * 0.2),
        z: cz + rng.range(-fd * 0.2, fd * 0.2),
        y: base + h,
        w: rng.range(4, 8),
        d: rng.range(4, 8),
        h: rng.range(2, 4),
        style: 6,
        seed,
        tint: [0.3, 0.31, 0.33],
        accent: [0, 0, 0],
        lit: 0,
      });
    }
    return;
  }

  // Podium with a lit ground floor, then a tower that steps in once or twice.
  const podiumH = rng.range(8, 14);
  ctx.buildings.push({ x: cx, z: cz, y: base, w: fw, d: fd, h: podiumH, style: 5, seed, tint, accent: [0, 0, 0], lit: 0.9 });
  const tw = fw * rng.range(0.62, 0.86);
  const td = fd * rng.range(0.62, 0.86);
  const tx = cx + rng.range(-1, 1) * (fw - tw) * 0.4;
  const tz = cz + rng.range(-1, 1) * (fd - td) * 0.4;
  const stepped = h > 95 && rng.chance(0.7);
  const lowerH = stepped ? h * rng.range(0.62, 0.78) : h;
  ctx.buildings.push({ x: tx, z: tz, y: base + podiumH, w: tw, d: td, h: lowerH - podiumH, style, seed, tint, accent: acc, lit });
  let topW = tw;
  let topD = td;
  let topY = base + lowerH;
  if (stepped) {
    topW = tw * rng.range(0.6, 0.8);
    topD = td * rng.range(0.6, 0.8);
    ctx.buildings.push({ x: tx, z: tz, y: topY, w: topW, d: topD, h: h - lowerH, style, seed: seed + 3, tint, accent: acc, lit });
    topY = base + h;
  }
  // Roof plant and, on the tallest towers, a spire with an aviation light.
  ctx.roofProps.push({
    x: tx,
    z: tz,
    y: topY,
    w: topW * 0.55,
    d: topD * 0.55,
    h: rng.range(3, 6),
    style: 6,
    seed,
    tint: [0.26, 0.27, 0.3],
    accent: [0, 0, 0],
    lit: 0,
  });
  if (h > 120 && rng.chance(0.7)) {
    ctx.roofProps.push({
      x: tx,
      z: tz,
      y: topY + 4,
      w: 1.2,
      d: 1.2,
      h: rng.range(16, 34),
      style: 7,
      seed,
      tint: [0.6, 0.62, 0.66],
      accent,
      lit: 1,
    });
  }

  // Large LED screens on towers that face a main road.
  if (h > 60 && (district === "central" || district === "media" || district === "creative") && rng.chance(0.45)) {
    const faces: { x: number; z: number; rot: number; width: number; dist: number }[] = [
      { x: tx + tw / 2 + 0.5, z: tz, rot: Math.PI / 2, width: td, dist: 0 },
      { x: tx - tw / 2 - 0.5, z: tz, rot: -Math.PI / 2, width: td, dist: 0 },
      { x: tx, z: tz + td / 2 + 0.5, rot: 0, width: tw, dist: 0 },
      { x: tx, z: tz - td / 2 - 0.5, rot: Math.PI, width: tw, dist: 0 },
    ];
    for (const face of faces) face.dist = Math.max(0, pavementDistance(face.x, face.z) * -1);
    faces.sort((a, b) => a.dist - b.dist);
    const face = faces[0];
    const bw = Math.min(face.width * 0.7, 15);
    const bh = bw * rng.range(1.2, 1.7);
    const by = base + podiumH + rng.range(8, Math.max(9, Math.min(34, lowerH - podiumH - bh - 6))) + bh / 2;
    ctx.billboards.push({ x: face.x, y: by, z: face.z, rot: face.rot, w: bw, h: bh, variant: ctx.billboards.length });
  }
}

function generateBlock(ctx: Ctx, block: Block, reserves: Rect[]): void {
  const { rng } = ctx;
  const profile = PROFILES[block.district];
  const inner = inset(block.rect, 8);
  const lots: Rect[] = [];
  splitLots(inner, profile.maxLot, rng, lots);
  for (const lot of lots) {
    if (reserves.some((r) => rectsOverlap(lot, r, 2))) continue;
    if (distToRect(lot, ROUNDABOUT.x, ROUNDABOUT.z) < ROUNDABOUT.rOuter + 10) {
      continue;
    }
    if (rng.chance(profile.park)) addPark(ctx, lot);
    else addBuilding(ctx, lot, block.district, 1);
  }
}

function generatePerimeter(ctx: Ctx, block: Block, reserves: Rect[]): void {
  const { rng } = ctx;
  const r = inset(block.rect, 6);
  const horizontal = r.x1 - r.x0 > r.z1 - r.z0;
  const length = horizontal ? r.x1 - r.x0 : r.z1 - r.z0;
  let pos = 0;
  while (pos < length - 14) {
    const size = rng.range(18, 40);
    const end = Math.min(length, pos + size);
    const lot: Rect = horizontal
      ? { x0: r.x0 + pos, x1: r.x0 + end, z0: r.z0, z1: r.z1 }
      : { x0: r.x0, x1: r.x1, z0: r.z0 + pos, z1: r.z0 + end };
    pos = end + rng.range(4, 16);
    if (reserves.some((res) => rectsOverlap(lot, res, 3))) continue;
    if (rng.chance(0.35)) {
      addPark(ctx, lot);
      continue;
    }
    const f = inset(lot, 2);
    if (f.x1 - f.x0 < 10 || f.z1 - f.z0 < 10) continue;
    const h = rng.range(7, 20);
    const tint = rng.pick([...STONE_TINTS, ...CREATIVE_TINTS.slice(3)]);
    ctx.buildings.push({
      x: (f.x0 + f.x1) / 2,
      z: (f.z0 + f.z1) / 2,
      y: CURB,
      w: f.x1 - f.x0,
      d: f.z1 - f.z0,
      h,
      style: rng.pick([2, 1, 5]),
      seed: rng.int(1, 999),
      tint,
      accent: [0, 0, 0],
      lit: rng.range(0.3, 0.6),
    });
    ctx.colliders.push({ type: "box", ...f });
  }
}

function generateHarbor(
  ctx: Ctx,
  block: Block,
  reserves: Rect[],
  containers: BuildingBox[],
  cranes: PropPoint[],
): void {
  const { rng } = ctx;
  const r = block.rect;
  const north = block.id === "harbor-n";
  // Container yard near the channel mouth, warehouses further away.
  const yard: Rect = north
    ? { x0: r.x0 + 34, x1: r.x1 - 6, z0: -110, z1: r.z1 - 22 }
    : { x0: r.x0 + 34, x1: r.x1 - 6, z0: r.z0 + 22, z1: r.z1 - 60 };
  const cw = 2.6;
  const cl = 12.2;
  const ch = 2.7;
  let col = 0;
  for (let x = yard.x0; x + cw < yard.x1; x += cw + 0.5, col++) {
    if (col % 5 === 4) {
      x += 6;
      continue;
    }
    let row = 0;
    for (let z = yard.z0; z + cl < yard.z1; z += cl + 1.2, row++) {
      if (row % 3 === 2) {
        z += 7;
      }
      const cell: Rect = { x0: x, x1: x + cw, z0: z, z1: z + cl };
      if (reserves.some((res) => rectsOverlap(cell, res, 6))) continue;
      const stack = rng.chance(0.18) ? 0 : rng.int(1, 4);
      for (let k = 0; k < stack; k++) {
        containers.push({
          x: x + cw / 2,
          z: z + cl / 2,
          y: CURB + k * ch,
          w: cw,
          d: cl,
          h: ch - 0.08,
          style: 0,
          seed: rng.next(),
          tint: rng.pick(CONTAINER_TINTS),
          accent: [0, 0, 0],
          lit: 0,
        });
      }
      if (stack > 0) ctx.colliders.push({ type: "box", ...cell });
    }
  }
  // Gantry cranes on the quay edge.
  const craneZ = north ? r.z1 + 4 : r.z0 - 4;
  for (const cx of [r.x0 + 30, r.x0 + 76]) {
    cranes.push({ x: cx, z: craneZ, y: CURB, rot: north ? 0 : Math.PI, scale: 1 });
    for (const sx of [-11, 11]) {
      ctx.colliders.push({ type: "box", x0: cx + sx - 1.2, x1: cx + sx + 1.2, z0: craneZ - 7, z1: craneZ + 7 });
    }
  }
  // Warehouses.
  const sheds: Rect[] = north
    ? [
        { x0: r.x0 + 14, x1: r.x1 - 10, z0: r.z0 + 10, z1: r.z0 + 70 },
        { x0: r.x0 + 14, x1: r.x1 - 10, z0: r.z0 + 86, z1: r.z0 + 150 },
        { x0: r.x0 + 14, x1: r.x1 - 10, z0: r.z0 + 166, z1: -124 },
      ]
    : [{ x0: r.x0 + 14, x1: r.x1 - 10, z0: r.z1 - 50, z1: r.z1 - 8 }];
  for (const shed of sheds) {
    if (reserves.some((res) => rectsOverlap(shed, res, 3))) continue;
    ctx.buildings.push({
      x: (shed.x0 + shed.x1) / 2,
      z: (shed.z0 + shed.z1) / 2,
      y: CURB,
      w: shed.x1 - shed.x0,
      d: shed.z1 - shed.z0,
      h: rng.range(11, 17),
      style: 4,
      seed: rng.int(1, 999),
      tint: rng.pick([
        [0.62, 0.64, 0.66],
        [0.34, 0.38, 0.44],
        [0.7, 0.66, 0.6],
      ] as RGB[]),
      accent: hexToRgb("#5ee6ff"),
      lit: 0.2,
    });
    ctx.colliders.push({ type: "box", ...shed });
  }
}

function streetFurniture(
  ctx: Ctx,
  lamps: PropPoint[],
  palms: PropPoint[],
  reserveColliders: Collider[],
): void {
  const blocked = (x: number, z: number, margin: number) => {
    for (const c of reserveColliders) {
      if (c.type === "circle") {
        if (Math.hypot(x - c.x, z - c.z) < c.r + margin) return true;
      } else if (x > c.x0 - margin && x < c.x1 + margin && z > c.z0 - margin && z < c.z1 + margin) return true;
    }
    return false;
  };
  const onPavement = (x: number, z: number) =>
    x > ISLAND.x0 + 2 && x < ISLAND.x1 - 2 && z > ISLAND.z0 + 2 && z < ISLAND.z1 - 2 && pavementDistance(x, z) < -1.2;

  for (const line of ROAD_LINES) {
    if (line.kind === "bridge") continue;
    const avenue = line.kind === "avenue";
    const spacing = 40;
    const length = line.to - line.from;
    for (const side of [-1, 1] as const) {
      const lampOff = line.halfWidth + 2;
      const treeOff = line.halfWidth + 3.4;
      for (let s = side === 1 ? 10 : 30; s < length; s += spacing) {
        const along = line.from + s;
        const lx = line.axis === "x" ? line.at + side * lampOff : along;
        const lz = line.axis === "x" ? along : line.at + side * lampOff;
        if (onPavement(lx, lz) && !blocked(lx, lz, 1)) {
          const rot = line.axis === "x" ? (side === 1 ? Math.PI : 0) : side === 1 ? Math.PI / 2 : -Math.PI / 2;
          lamps.push({ x: lx, z: lz, y: CURB, rot, scale: 1 });
          ctx.colliders.push({ type: "circle", x: lx, z: lz, r: 0.28 });
        }
        for (const extra of avenue ? [13, 27] : [20]) {
          const a2 = along + extra;
          if (a2 > line.to - 4) continue;
          const tx = line.axis === "x" ? line.at + side * treeOff : a2;
          const tz = line.axis === "x" ? a2 : line.at + side * treeOff;
          if (!onPavement(tx, tz) || blocked(tx, tz, 1.5)) continue;
          const point: PropPoint = {
            x: tx,
            z: tz,
            y: CURB,
            rot: ctx.rng.range(0, Math.PI * 2),
            scale: ctx.rng.range(0.85, 1.2),
          };
          if (avenue) palms.push(point);
          else ctx.trees.push(point);
          ctx.colliders.push({ type: "circle", x: tx, z: tz, r: 0.4 });
        }
      }
    }
  }

  // A ring of lamps on the roundabout island and palms around its outer edge.
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.26;
    const x = ROUNDABOUT.x + Math.cos(a) * (ROUNDABOUT.rInner - 2.6);
    const z = ROUNDABOUT.z + Math.sin(a) * (ROUNDABOUT.rInner - 2.6);
    lamps.push({ x, z, y: CURB, rot: -a, scale: 0.9 });
    ctx.colliders.push({ type: "circle", x, z, r: 0.28 });
  }
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const x = ROUNDABOUT.x + Math.cos(a) * (ROUNDABOUT.rOuter + 4.5);
    const z = ROUNDABOUT.z + Math.sin(a) * (ROUNDABOUT.rOuter + 4.5);
    if (!onPavement(x, z) || blocked(x, z, 1.5)) continue;
    palms.push({ x, z, y: CURB, rot: ctx.rng.range(0, Math.PI * 2), scale: ctx.rng.range(0.9, 1.25) });
    ctx.colliders.push({ type: "circle", x, z, r: 0.4 });
  }

  // Promenade lamps on both quays and lamps along the bridge parapets.
  for (const z of [CHANNEL.z0 - 2.6, CHANNEL.z1 + 2.6]) {
    for (let x = ISLAND.x0 + 14; x < ISLAND.x1 - 10; x += 32) {
      if (!onPavement(x, z) || blocked(x, z, 1)) continue;
      lamps.push({ x, z, y: CURB, rot: z < CHANNEL.z0 ? -Math.PI / 2 : Math.PI / 2, scale: 0.8 });
      ctx.colliders.push({ type: "circle", x, z, r: 0.28 });
    }
  }
  for (const b of BRIDGES) {
    for (let z = b.z0 + 9; z < b.z1 - 4; z += 17) {
      for (const side of [-1, 1] as const) {
        lamps.push({
          x: b.x + side * (b.halfWidth + 0.65),
          z,
          y: bridgeHeight(b, z),
          rot: side === 1 ? Math.PI : 0,
          scale: 0.85,
        });
      }
    }
  }
}

function makeSkybridges(colliders: Collider[]): Skybridge[] {
  const list: Skybridge[] = [
    { x: 0, z: 80, axis: "x", span: 33, height: 11 },
    { x: 0, z: -132, axis: "x", span: 33, height: 12.5 },
    { x: -134, z: -20, axis: "z", span: 33, height: 11.5 },
    { x: 134, z: -20, axis: "z", span: 33, height: 11.5 },
  ];
  for (const s of list) {
    for (const side of [-1, 1]) {
      const x = s.axis === "x" ? s.x + (side * s.span) / 2 : s.x;
      const z = s.axis === "x" ? s.z : s.z + (side * s.span) / 2;
      colliders.push({ type: "circle", x, z, r: 1.4 });
    }
  }
  return list;
}

export function generateCity(destinations: readonly Destination[], seed = 20261009): CityData {
  const rng = createRng(seed);
  const ctx: Ctx = { rng, buildings: [], roofProps: [], trees: [], colliders: [], parks: [], billboards: [] };
  const lamps: PropPoint[] = [];
  const palms: PropPoint[] = [];
  const containers: BuildingBox[] = [];
  const cranes: PropPoint[] = [];

  const reserves = destinations.map(landmarkReserve).filter((r) => r.x1 - r.x0 > 0);
  const landmarkShapes = destinations.flatMap(landmarkColliders);
  ctx.colliders.push(...landmarkShapes);
  const skybridges = makeSkybridges(ctx.colliders);
  for (const g of GANTRIES) {
    for (const side of [-1, 1]) {
      const off = side * (g.halfWidth + 1.7);
      ctx.colliders.push({ type: "circle", x: g.axis === "x" ? g.x + off : g.x, z: g.axis === "x" ? g.z : g.z + off, r: 0.45 });
    }
  }
  const skybridgePylons = ctx.colliders.slice(landmarkShapes.length);

  for (const block of BLOCKS) {
    if (block.kind === "city") generateBlock(ctx, block, reserves);
    else if (block.kind === "perimeter") generatePerimeter(ctx, block, reserves);
    else if (block.kind === "harbor") generateHarbor(ctx, block, reserves, containers, cranes);
  }

  streetFurniture(ctx, lamps, palms, [...landmarkShapes, ...skybridgePylons]);

  return {
    buildings: ctx.buildings,
    roofProps: ctx.roofProps,
    containers,
    cranes,
    trees: ctx.trees,
    palms,
    lamps,
    billboards: ctx.billboards,
    skybridges,
    parks: ctx.parks,
    colliders: ctx.colliders,
  };
}
