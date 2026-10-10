/**
 * Ground geometry built from the layout: pavement slabs, the road surface,
 * retaining walls, bridges and painted road markings.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { Block, Rect, Vec2 } from "@/types/world";
import {
  BLOCKS,
  BRIDGES,
  CHANNEL,
  CURB,
  ISLAND,
  ROADS_X,
  ROADS_Z,
  ROAD_LINES,
  ROUNDABOUT,
  bridgeHeight,
} from "@/lib/world/layout";

function roundedRect(r: Rect, radius: number): Vec2[] {
  const pts: Vec2[] = [];
  if (radius <= 0) {
    return [
      [r.x0, r.z0],
      [r.x1, r.z0],
      [r.x1, r.z1],
      [r.x0, r.z1],
    ];
  }
  const corners: [number, number, number][] = [
    [r.x1 - radius, r.z0 + radius, -Math.PI / 2],
    [r.x1 - radius, r.z1 - radius, 0],
    [r.x0 + radius, r.z1 - radius, Math.PI / 2],
    [r.x0 + radius, r.z0 + radius, Math.PI],
  ];
  for (const [cx, cz, start] of corners) {
    for (let i = 0; i <= 5; i++) {
      const a = start + (i / 5) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * radius, cz + Math.sin(a) * radius]);
    }
  }
  return pts;
}

/** Removes the part of a polygon inside a circle and closes it with an arc. */
function carveCircle(polygon: Vec2[], cx: number, cz: number, radius: number): Vec2[] {
  // Densify so that the entry and exit points are found accurately.
  const dense: Vec2[] = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2));
    for (let s = 0; s < steps; s++) dense.push([a[0] + ((b[0] - a[0]) * s) / steps, a[1] + ((b[1] - a[1]) * s) / steps]);
  }
  const inside = dense.map(([x, z]) => Math.hypot(x - cx, z - cz) < radius);
  if (!inside.some(Boolean)) return polygon;
  const n = dense.length;
  let start = -1;
  for (let i = 0; i < n; i++) {
    if (inside[i] && !inside[(i - 1 + n) % n]) {
      start = i;
      break;
    }
  }
  if (start < 0) return polygon;
  let end = start;
  while (inside[(end + 1) % n]) end = (end + 1) % n;
  const cross = (out: Vec2, inn: Vec2): Vec2 => {
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 24; k++) {
      const mid = (lo + hi) / 2;
      const x = out[0] + (inn[0] - out[0]) * mid;
      const z = out[1] + (inn[1] - out[1]) * mid;
      if (Math.hypot(x - cx, z - cz) < radius) hi = mid;
      else lo = mid;
    }
    return [out[0] + (inn[0] - out[0]) * lo, out[1] + (inn[1] - out[1]) * lo];
  };
  const entry = cross(dense[(start - 1 + n) % n], dense[start]);
  const exit = cross(dense[(end + 1) % n], dense[end]);
  const a0 = Math.atan2(entry[1] - cz, entry[0] - cx);
  let delta = Math.atan2(exit[1] - cz, exit[0] - cx) - a0;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  const out: Vec2[] = [];
  for (let i = (end + 1) % n; i !== start; i = (i + 1) % n) out.push(dense[i]);
  const arcSteps = Math.max(4, Math.ceil((Math.abs(delta) * radius) / 3));
  for (let s = 0; s <= arcSteps; s++) {
    const a = a0 + (delta * s) / arcSteps;
    out.push([cx + Math.cos(a) * radius, cz + Math.sin(a) * radius]);
  }
  return out;
}

function slab(points: Vec2[], height: number): THREE.BufferGeometry {
  // Shape lives in XY; rotating by -90° about X maps shape Y to world -Z.
  const shape = new THREE.Shape(points.map(([x, z]) => new THREE.Vector2(x, -z)));
  const g = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 1 });
  g.rotateX(-Math.PI / 2);
  return g;
}

export interface GroundGeometry {
  pavement: THREE.BufferGeometry;
  plaza: THREE.BufferGeometry;
  harbor: THREE.BufferGeometry;
  road: THREE.BufferGeometry;
  walls: THREE.BufferGeometry;
}

function blockOutline(block: Block): Vec2[] {
  const base = roundedRect(block.rect, block.cornerRadius);
  return carveCircle(base, ROUNDABOUT.x, ROUNDABOUT.z, ROUNDABOUT.rOuter);
}

/** Merges geometries after normalising them to non-indexed position/normal/uv. */
function merged(list: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const normalised = list.map((source) => {
    const g = source.index ? source.toNonIndexed() : source;
    if (g !== source) source.dispose();
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    if (!g.getAttribute("uv")) {
      g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(g.getAttribute("position").count * 2), 2));
    }
    for (const name of Object.keys(g.attributes)) {
      if (name !== "position" && name !== "normal" && name !== "uv") g.deleteAttribute(name);
    }
    g.clearGroups();
    return g;
  });
  const out = mergeGeometries(normalised, false) ?? new THREE.BufferGeometry();
  normalised.forEach((x) => x.dispose());
  return out;
}

function box(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
  g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  return g;
}

export function buildGround(): GroundGeometry {
  const pavement: THREE.BufferGeometry[] = [];
  const plaza: THREE.BufferGeometry[] = [];
  const harbor: THREE.BufferGeometry[] = [];
  for (const block of BLOCKS) {
    const g = slab(blockOutline(block), CURB);
    if (block.kind === "quay") plaza.push(g);
    else if (block.kind === "harbor") harbor.push(g);
    else pavement.push(g);
  }
  const island = new THREE.CylinderGeometry(ROUNDABOUT.rInner, ROUNDABOUT.rInner, CURB, 64);
  island.translate(ROUNDABOUT.x, CURB / 2, ROUNDABOUT.z);
  // Give the island top the same world-space UVs as the extruded slabs.
  const uv = island.getAttribute("uv");
  const pos = island.getAttribute("position");
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i), -pos.getZ(i));
  plaza.push(island);

  const roadPlane = (z0: number, z1: number) => {
    const g = new THREE.PlaneGeometry(ISLAND.x1 - ISLAND.x0, z1 - z0);
    g.rotateX(-Math.PI / 2);
    g.translate((ISLAND.x0 + ISLAND.x1) / 2, 0, (z0 + z1) / 2);
    const u = g.getAttribute("uv");
    const p = g.getAttribute("position");
    for (let i = 0; i < u.count; i++) u.setXY(i, p.getX(i) / 12, p.getZ(i) / 12);
    return g;
  };
  const road = merged([roadPlane(ISLAND.z0, CHANNEL.z0), roadPlane(CHANNEL.z1, ISLAND.z1)]);

  // Retaining walls: the island edge and both channel banks, with a low parapet.
  const walls: THREE.BufferGeometry[] = [];
  const depth = -4;
  const parapet = CURB + 0.85;
  const t = 0.7;
  walls.push(box(ISLAND.x0 - t, ISLAND.x1 + t, depth, parapet, ISLAND.z0 - t, ISLAND.z0));
  walls.push(box(ISLAND.x0 - t, ISLAND.x1 + t, depth, parapet, ISLAND.z1, ISLAND.z1 + t));
  walls.push(box(ISLAND.x0 - t, ISLAND.x0, depth, parapet, ISLAND.z0, CHANNEL.z0));
  walls.push(box(ISLAND.x0 - t, ISLAND.x0, depth, parapet, CHANNEL.z1, ISLAND.z1));
  walls.push(box(ISLAND.x1, ISLAND.x1 + t, depth, parapet, ISLAND.z0, CHANNEL.z0));
  walls.push(box(ISLAND.x1, ISLAND.x1 + t, depth, parapet, CHANNEL.z1, ISLAND.z1));
  // Channel banks below deck level run the full width; the parapet stops at bridges.
  walls.push(box(ISLAND.x0, ISLAND.x1, depth, 0, CHANNEL.z0 - 0.1, CHANNEL.z0 + t));
  walls.push(box(ISLAND.x0, ISLAND.x1, depth, 0, CHANNEL.z1 - t, CHANNEL.z1 + 0.1));
  let start = ISLAND.x0;
  const spans: [number, number][] = [];
  for (const b of BRIDGES) {
    spans.push([start, b.x - b.halfWidth - 1.2]);
    start = b.x + b.halfWidth + 1.2;
  }
  spans.push([start, ISLAND.x1]);
  for (const [x0, x1] of spans) {
    walls.push(box(x0, x1, 0, parapet, CHANNEL.z0 - 0.1, CHANNEL.z0 + 0.5));
    walls.push(box(x0, x1, 0, parapet, CHANNEL.z1 - 0.5, CHANNEL.z1 + 0.1));
  }

  return { pavement: merged(pavement), plaza: merged(plaza), harbor: merged(harbor), road, walls: merged(walls) };
}

export interface BridgeGeometry {
  deck: THREE.BufferGeometry;
  structure: THREE.BufferGeometry;
  cables: THREE.BufferGeometry;
}

export function buildBridges(): BridgeGeometry {
  const decks: THREE.BufferGeometry[] = [];
  const structure: THREE.BufferGeometry[] = [];
  const cablePoints: number[] = [];
  const segs = 48;

  for (const b of BRIDGES) {
    const half = b.halfWidth + 1.3;
    const length = b.z1 - b.z0;
    // Deck top.
    const deck = new THREE.PlaneGeometry(half * 2, length, 1, segs);
    deck.rotateX(-Math.PI / 2);
    deck.translate(b.x, 0, (b.z0 + b.z1) / 2);
    const p = deck.getAttribute("position");
    const u = deck.getAttribute("uv");
    for (let i = 0; i < p.count; i++) {
      p.setY(i, bridgeHeight(b, p.getZ(i)) + 0.001);
      u.setXY(i, p.getX(i) / 12, p.getZ(i) / 12);
    }
    deck.computeVertexNormals();
    decks.push(deck);

    // Girder below the deck and parapets along both edges, following the arch.
    const strip = (xa: number, xb: number, below: number, above: number) => {
      const pos: number[] = [];
      const idx: number[] = [];
      for (let i = 0; i <= segs; i++) {
        const z = b.z0 + (length * i) / segs;
        const y = bridgeHeight(b, z);
        // Four corners of the cross-section at this station.
        pos.push(xa, y + below, z, xb, y + below, z, xb, y + above, z, xa, y + above, z);
      }
      for (let i = 0; i < segs; i++) {
        const o = i * 4;
        const n = o + 4;
        for (const [a, c] of [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 0],
        ]) {
          idx.push(o + a, n + a, o + c, o + c, n + a, n + c);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      const flat = g.toNonIndexed();
      g.dispose();
      flat.computeVertexNormals();
      flat.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(flat.getAttribute("position").count * 2), 2));
      return flat;
    };
    structure.push(strip(b.x - half, b.x + half, -1.1, -0.02));
    structure.push(strip(b.x - half, b.x - half + 0.35, 0, 1.0));
    structure.push(strip(b.x + half - 0.35, b.x + half, 0, 1.0));

    // Piers in the water.
    for (const f of [0.3, 0.7]) {
      const z = b.z0 + length * f;
      const y = bridgeHeight(b, z);
      structure.push(box(b.x - half + 1, b.x + half - 1, -4, y - 1, z - 1.6, z + 1.6));
    }

    // The boulevard bridge is a suspension bridge; the others carry simple arches.
    const main = b.halfWidth > 10;
    const towerH = main ? 30 : 0;
    for (const side of [-1, 1]) {
      const x = b.x + side * (half + 0.5);
      if (main) {
        const zA = b.z0 + length * 0.3;
        const zB = b.z0 + length * 0.7;
        for (const z of [zA, zB]) {
          const base = bridgeHeight(b, z);
          structure.push(box(x - 0.9, x + 0.9, -4, base + towerH, z - 1.2, z + 1.2));
        }
        const top = (z: number) => bridgeHeight(b, z) + towerH - 0.5;
        const sag = (z0: number, y0: number, z1: number, y1: number, drop: number) => {
          const n = 16;
          for (let i = 0; i < n; i++) {
            const t0 = i / n;
            const t1 = (i + 1) / n;
            const y = (tt: number) => y0 + (y1 - y0) * tt - drop * 4 * tt * (1 - tt);
            cablePoints.push(x, y(t0), z0 + (z1 - z0) * t0, x, y(t1), z0 + (z1 - z0) * t1);
            if (i > 0) {
              const zz = z0 + (z1 - z0) * t0;
              cablePoints.push(x, y(t0), zz, x, bridgeHeight(b, zz) + 1, zz);
            }
          }
        };
        sag(b.z0 + 1, 1.2, zA, top(zA), 2);
        sag(zA, top(zA), zB, top(zB), towerH * 0.62);
        sag(zB, top(zB), b.z1 - 1, 1.2, 2);
      } else {
        // A tied arch on each side.
        const n = 24;
        const rise = 11;
        const pos: number[] = [];
        const idx: number[] = [];
        for (let i = 0; i <= n; i++) {
          const tt = i / n;
          const z = b.z0 + 6 + (length - 12) * tt;
          const y = bridgeHeight(b, z) + 0.6 + rise * 4 * tt * (1 - tt);
          pos.push(x - 0.3, y - 0.35, z, x + 0.3, y - 0.35, z, x + 0.3, y + 0.35, z, x - 0.3, y + 0.35, z);
          if (i > 0 && i < n && i % 2 === 0) cablePoints.push(x, y, z, x, bridgeHeight(b, z) + 1, z);
        }
        for (let i = 0; i < n; i++) {
          const o = i * 4;
          const m = o + 4;
          for (const [a, c] of [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
          ]) {
            idx.push(o + a, m + a, o + c, o + c, m + a, m + c);
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        g.setIndex(idx);
        const flat = g.toNonIndexed();
        g.dispose();
        flat.computeVertexNormals();
        flat.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(flat.getAttribute("position").count * 2), 2));
        structure.push(flat);
      }
    }
    if (main) {
      // Cross beams tying each pair of towers together.
      for (const f of [0.3, 0.7]) {
        const z = b.z0 + length * f;
        const y = bridgeHeight(b, z) + towerH;
        structure.push(box(b.x - half - 1.4, b.x + half + 1.4, y - 2.2, y - 0.6, z - 0.9, z + 0.9));
        structure.push(box(b.x - half - 1.4, b.x + half + 1.4, y - 12, y - 11, z - 0.7, z + 0.7));
      }
    }
  }
  const cables = new THREE.BufferGeometry();
  cables.setAttribute("position", new THREE.Float32BufferAttribute(cablePoints, 3));
  return { deck: merged(decks), structure: merged(structure), cables };
}

export interface Marking {
  x: number;
  y: number;
  z: number;
  /** Size across and along the direction of travel. */
  width: number;
  length: number;
  rot: number;
  pitch: number;
  color: number;
}

const WHITE = 0xe9edf2;
const YELLOW = 0xf0c04a;

/** Painted lines: centre lines, lane dashes, edge lines, crossings and the roundabout. */
export function buildMarkings(): Marking[] {
  const out: Marking[] = [];
  const y = 0.02;
  const inRing = (x: number, z: number, margin: number) =>
    Math.hypot(x - ROUNDABOUT.x, z - ROUNDABOUT.z) < ROUNDABOUT.rOuter + margin;

  for (const line of ROAD_LINES) {
    const isX = line.axis === "x";
    const rot = isX ? 0 : Math.PI / 2;
    const bridge = line.kind === "bridge" ? BRIDGES.find((b) => b.id === line.id) : undefined;
    const crossings = (isX ? ROADS_Z.map((r) => ({ at: r.z, hw: r.hw })) : ROADS_X.map((r) => ({ at: r.x, hw: r.hw }))).filter(
      (c) => c.at >= line.from - 1 && c.at <= line.to + 1,
    );
    // Clear stretches between junction boxes.
    const gaps: [number, number][] = [];
    let cursor = line.from;
    for (const c of crossings) {
      const a = c.at - c.hw - 6.5;
      const b = c.at + c.hw + 6.5;
      if (a > cursor) gaps.push([cursor, a]);
      cursor = Math.max(cursor, b);
    }
    if (cursor < line.to) gaps.push([cursor, line.to]);

    const place = (along: number, offset: number, width: number, length: number, color: number) => {
      const x = isX ? line.at + offset : along;
      const z = isX ? along : line.at + offset;
      if (inRing(x, z, 5)) return;
      let py = y;
      let pitch = 0;
      if (bridge) {
        py = bridgeHeight(bridge, z) + y;
        pitch = Math.atan2(bridgeHeight(bridge, z + 0.5) - bridgeHeight(bridge, z - 0.5), 1);
      }
      out.push({ x, y: py, z, width, length, rot, pitch, color });
    };

    for (const [a, b] of gaps) {
      const len = b - a;
      if (len < 4) continue;
      const pieces = bridge ? Math.ceil(len / 4) : 1;
      for (let k = 0; k < pieces; k++) {
        const mid = a + (len * (k + 0.5)) / pieces;
        const l = len / pieces;
        // Double yellow centre line and solid white edge lines.
        place(mid, -0.22, 0.16, l, YELLOW);
        place(mid, 0.22, 0.16, l, YELLOW);
        place(mid, -(line.halfWidth - 0.45), 0.14, l, WHITE);
        place(mid, line.halfWidth - 0.45, 0.14, l, WHITE);
      }
      // Lane dashes.
      for (let s = a + 3; s < b - 3; s += 9) {
        place(s + 1.5, -line.halfWidth / 2, 0.14, 3, WHITE);
        place(s + 1.5, line.halfWidth / 2, 0.14, 3, WHITE);
      }
      // Zebra crossings and stop lines at each end that meets a junction.
      for (const end of [a, b]) {
        const atJunction = crossings.some((c) => Math.abs(Math.abs(end - c.at) - c.hw - 6.5) < 0.01);
        if (!atJunction) continue;
        const dir = end === a ? -1 : 1;
        const zebraAt = end + dir * 3.2;
        for (let o = -line.halfWidth + 1; o <= line.halfWidth - 1; o += 1.1) place(zebraAt, o, 0.55, 3.4, WHITE);
        // Left-hand traffic: the approaching lane is on the left of its direction of travel.
        const laneSide = isX ? dir : -dir;
        place(end - dir * 0.6, (laneSide * line.halfWidth) / 2, line.halfWidth - 0.9, 0.4, WHITE);
      }
    }
  }

  // Roundabout: dashed lane divider on the mid radius.
  const dashes = 44;
  for (let i = 0; i < dashes; i++) {
    const a = (i / dashes) * Math.PI * 2;
    out.push({
      x: ROUNDABOUT.x + Math.cos(a) * ROUNDABOUT.rMid,
      y,
      z: ROUNDABOUT.z + Math.sin(a) * ROUNDABOUT.rMid,
      width: 0.16,
      length: 3.6,
      rot: -a,
      pitch: 0,
      color: WHITE,
    });
  }
  return out;
}

/** Thin solid rings marking the inner and outer edge of the roundabout. */
export function buildRoundaboutRings(): THREE.BufferGeometry {
  const rings = [ROUNDABOUT.rInner + 0.7, ROUNDABOUT.rOuter - 0.7].map((r) => {
    const g = new THREE.RingGeometry(r, r + 0.16, 96, 1);
    g.rotateX(-Math.PI / 2);
    g.translate(ROUNDABOUT.x, 0.02, ROUNDABOUT.z);
    return g;
  });
  return merged(rings);
}

export function markingsToMesh(markings: Marking[], material: THREE.Material): THREE.InstancedMesh {
  const geometry = new THREE.PlaneGeometry(1, 1);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.InstancedMesh(geometry, material, markings.length);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler(0, 0, 0, "YXZ");
  const p = new THREE.Vector3();
  const s = new THREE.Vector3();
  const c = new THREE.Color();
  markings.forEach((mk, i) => {
    e.set(-mk.pitch, mk.rot, 0);
    q.setFromEuler(e);
    p.set(mk.x, mk.y, mk.z);
    s.set(mk.width, 1, mk.length);
    m.compose(p, q, s);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, c.setHex(mk.color));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.frustumCulled = false;
  return mesh;
}
