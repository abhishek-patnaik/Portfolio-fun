/**
 * Broad-phase spatial hash and narrow-phase circle tests for the driving physics.
 * The car is approximated by a few circles along its length; the world is made of
 * axis-aligned boxes and circles.
 */
import type { Collider } from "@/types/world";

export interface Contact {
  /** Unit normal pointing from the obstacle towards the circle centre. */
  nx: number;
  nz: number;
  depth: number;
}

export class ColliderIndex {
  private readonly cells = new Map<number, Collider[]>();
  readonly size: number;
  readonly count: number;

  constructor(colliders: readonly Collider[], cellSize = 32) {
    this.size = cellSize;
    this.count = colliders.length;
    for (const c of colliders) {
      const x0 = c.type === "box" ? c.x0 : c.x - c.r;
      const x1 = c.type === "box" ? c.x1 : c.x + c.r;
      const z0 = c.type === "box" ? c.z0 : c.z - c.r;
      const z1 = c.type === "box" ? c.z1 : c.z + c.r;
      const i0 = Math.floor(x0 / cellSize);
      const i1 = Math.floor(x1 / cellSize);
      const j0 = Math.floor(z0 / cellSize);
      const j1 = Math.floor(z1 / cellSize);
      for (let i = i0; i <= i1; i++) {
        for (let j = j0; j <= j1; j++) {
          const key = this.key(i, j);
          const list = this.cells.get(key);
          if (list) list.push(c);
          else this.cells.set(key, [c]);
        }
      }
    }
  }

  private key(i: number, j: number): number {
    return (i + 512) * 4096 + (j + 512);
  }

  /** Calls `visit` for every collider whose cell overlaps the query circle. */
  query(x: number, z: number, r: number, visit: (c: Collider) => void): void {
    const i0 = Math.floor((x - r) / this.size);
    const i1 = Math.floor((x + r) / this.size);
    const j0 = Math.floor((z - r) / this.size);
    const j1 = Math.floor((z + r) / this.size);
    for (let i = i0; i <= i1; i++) {
      for (let j = j0; j <= j1; j++) {
        const list = this.cells.get(this.key(i, j));
        if (!list) continue;
        for (const c of list) visit(c);
      }
    }
  }
}

/** Returns the contact between a circle and a collider, or null when apart. */
export function circleContact(x: number, z: number, r: number, c: Collider): Contact | null {
  if (c.type === "circle") {
    const dx = x - c.x;
    const dz = z - c.z;
    const dist = Math.hypot(dx, dz);
    const depth = r + c.r - dist;
    if (depth <= 0) return null;
    if (dist < 1e-6) return { nx: 1, nz: 0, depth };
    return { nx: dx / dist, nz: dz / dist, depth };
  }
  const px = Math.min(c.x1, Math.max(c.x0, x));
  const pz = Math.min(c.z1, Math.max(c.z0, z));
  const dx = x - px;
  const dz = z - pz;
  const distSq = dx * dx + dz * dz;
  if (distSq > r * r) return null;
  if (distSq > 1e-10) {
    const dist = Math.sqrt(distSq);
    return { nx: dx / dist, nz: dz / dist, depth: r - dist };
  }
  // Centre is inside the box: push out through the nearest face.
  const left = x - c.x0;
  const right = c.x1 - x;
  const top = z - c.z0;
  const bottom = c.z1 - z;
  const m = Math.min(left, right, top, bottom);
  if (m === left) return { nx: -1, nz: 0, depth: left + r };
  if (m === right) return { nx: 1, nz: 0, depth: right + r };
  if (m === top) return { nx: 0, nz: -1, depth: top + r };
  return { nx: 0, nz: 1, depth: bottom + r };
}

export function pointBlocked(index: ColliderIndex, x: number, z: number, r: number): boolean {
  let hit = false;
  index.query(x, z, r, (c) => {
    if (!hit && circleContact(x, z, r, c)) hit = true;
  });
  return hit;
}
