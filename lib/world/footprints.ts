/**
 * Ground footprints of the landmark buildings: the area they reserve in a block
 * (so generic buildings are not generated there) and their collision shapes.
 * Landmark rotations are always quarter turns, so boxes stay axis-aligned.
 */
import type { Collider, Destination, LandmarkType, Rect, Vec2 } from "@/types/world";

type LocalShape =
  | { type: "box"; cx: number; cz: number; w: number; d: number }
  | { type: "circle"; cx: number; cz: number; r: number };

interface Footprint {
  /** Width (local x) and depth (local z) of the reserved lot. */
  reserve: readonly [number, number];
  shapes: readonly LocalShape[];
}

/** Planters ringing the contact plaza, in landmark-local coordinates. */
export function contactPlanters(): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + 0.3;
    const z = 4 + Math.sin(a) * 30;
    if (z < -14) continue;
    out.push({ x: Math.cos(a) * 30, z });
  }
  return out;
}

export const FOOTPRINTS: Record<LandmarkType, Footprint> = {
  centralTower: { reserve: [0, 0], shapes: [{ type: "circle", cx: 0, cz: 0, r: 23 }] },
  gatewayPavilion: { reserve: [64, 64], shapes: [{ type: "box", cx: 0, cz: -6, w: 34, d: 26 }] },
  corporateTwin: {
    reserve: [124, 92],
    shapes: [
      { type: "box", cx: -30, cz: -8, w: 30, d: 30 },
      { type: "box", cx: 30, cz: -8, w: 30, d: 30 },
    ],
  },
  officeTower: { reserve: [46, 46], shapes: [{ type: "box", cx: 0, cz: -4, w: 28, d: 28 }] },
  university: {
    reserve: [144, 104],
    shapes: [
      { type: "box", cx: 0, cz: -24, w: 80, d: 28 },
      { type: "box", cx: -48, cz: 4, w: 20, d: 44 },
      { type: "box", cx: 48, cz: 4, w: 20, d: 44 },
    ],
  },
  library: { reserve: [70, 56], shapes: [{ type: "box", cx: 0, cz: -6, w: 44, d: 28 }] },
  researchLab: {
    reserve: [134, 94],
    shapes: [
      { type: "circle", cx: -30, cz: -4, r: 22 },
      { type: "box", cx: 32, cz: -10, w: 26, d: 26 },
    ],
  },
  projectPod: { reserve: [42, 42], shapes: [{ type: "box", cx: 0, cz: -4, w: 22, d: 22 }] },
  creativeStudio: { reserve: [110, 90], shapes: [{ type: "box", cx: 0, cz: -8, w: 44, d: 44 }] },
  galleryPavilion: { reserve: [42, 42], shapes: [{ type: "box", cx: 0, cz: -4, w: 24, d: 20 }] },
  mediaTower: { reserve: [114, 94], shapes: [{ type: "circle", cx: 0, cz: -6, r: 19 }] },
  kiosk: { reserve: [14, 14], shapes: [{ type: "circle", cx: 0, cz: 0, r: 2.2 }] },
  contactPavilion: {
    reserve: [134, 104],
    shapes: [
      { type: "circle", cx: 0, cz: 6, r: 10 },
      { type: "box", cx: 0, cz: -32, w: 52, d: 18 },
      ...contactPlanters().map((p): LocalShape => ({ type: "circle", cx: p.x, cz: p.z, r: 2.3 })),
    ],
  },
  stadium: { reserve: [126, 122], shapes: [{ type: "circle", cx: 0, cz: 0, r: 54 }] },
  terminal: { reserve: [18, 18], shapes: [{ type: "circle", cx: 0, cz: 0, r: 2.4 }] },
  lookout: { reserve: [16, 10], shapes: [{ type: "circle", cx: 0, cz: 0, r: 1.6 }] },
  garage: { reserve: [44, 34], shapes: [{ type: "box", cx: 0, cz: -5, w: 32, d: 16 }] },
};

/** Rotate a local (x, z) offset by the landmark rotation and move it to world space. */
export function localToWorld(position: Vec2, rotation: number, lx: number, lz: number): Vec2 {
  const c = Math.cos(rotation);
  const s = Math.sin(rotation);
  return [position[0] + lx * c + lz * s, position[1] - lx * s + lz * c];
}

function rotatedBox(position: Vec2, rotation: number, cx: number, cz: number, w: number, d: number): Rect {
  const a = localToWorld(position, rotation, cx - w / 2, cz - d / 2);
  const b = localToWorld(position, rotation, cx + w / 2, cz + d / 2);
  return {
    x0: Math.min(a[0], b[0]),
    x1: Math.max(a[0], b[0]),
    z0: Math.min(a[1], b[1]),
    z1: Math.max(a[1], b[1]),
  };
}

export function landmarkReserve(dest: Destination): Rect {
  const [w, d] = FOOTPRINTS[dest.landmark].reserve;
  return rotatedBox(dest.position, dest.rotation, 0, 0, w, d);
}

export function landmarkColliders(dest: Destination): Collider[] {
  return FOOTPRINTS[dest.landmark].shapes.map((shape): Collider => {
    if (shape.type === "circle") {
      const [x, z] = localToWorld(dest.position, dest.rotation, shape.cx, shape.cz);
      return { type: "circle", x, z, r: shape.r };
    }
    return { type: "box", ...rotatedBox(dest.position, dest.rotation, shape.cx, shape.cz, shape.w, shape.d) };
  });
}
