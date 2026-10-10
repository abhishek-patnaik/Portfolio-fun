/**
 * Small repeated objects (street lights, trees, palms, cranes, boats) and the
 * decorative backdrop (hills, wind turbines, radio mast). Each is one merged
 * geometry with vertex colours so it can be drawn as a single instanced mesh.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { PropPoint } from "@/types/world";
import { createRng } from "@/lib/game/rng";
import { ISLAND } from "@/lib/world/layout";
import { mat4 } from "@/lib/three/merge";

function colored(geometry: THREE.BufferGeometry, color: THREE.ColorRepresentation, matrix?: THREE.Matrix4): THREE.BufferGeometry {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  if (geometry.index) geometry.dispose();
  if (matrix) g.applyMatrix4(matrix);
  const c = new THREE.Color(color);
  const count = g.getAttribute("position").count;
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) colors.set([c.r, c.g, c.b], i * 3);
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  if (!g.getAttribute("uv")) g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(count * 2), 2));
  return g;
}

function merge(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const g = mergeGeometries(parts, false) ?? new THREE.BufferGeometry();
  parts.forEach((p) => p.dispose());
  return g;
}

export const LAMP_HEIGHT = 8.4;
export const LAMP_REACH = 2.3;

export function lampPoleGeometry(): THREE.BufferGeometry {
  return merge([
    colored(new THREE.CylinderGeometry(0.07, 0.11, LAMP_HEIGHT, 8), "#2a2d33", mat4([0, LAMP_HEIGHT / 2, 0])),
    colored(new THREE.BoxGeometry(LAMP_REACH + 0.3, 0.1, 0.14), "#2a2d33", mat4([LAMP_REACH / 2, LAMP_HEIGHT - 0.05, 0])),
    colored(new THREE.BoxGeometry(0.9, 0.12, 0.34), "#3a3e45", mat4([LAMP_REACH, LAMP_HEIGHT - 0.1, 0])),
  ]);
}

export function lampHeadGeometry(): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(0.8, 0.06, 0.28);
  g.translate(LAMP_REACH, LAMP_HEIGHT - 0.19, 0);
  return g;
}

export function treeGeometry(): THREE.BufferGeometry {
  const canopy = (r: number, x: number, y: number, z: number, color: string) => {
    const g = new THREE.IcosahedronGeometry(r, 1);
    return colored(g, color, mat4([x, y, z], [0, 0, 0], [1, 0.82, 1]));
  };
  return merge([
    colored(new THREE.CylinderGeometry(0.14, 0.22, 3, 6), "#4b3a2c", mat4([0, 1.5, 0])),
    canopy(2.1, 0, 4.3, 0, "#3e7d48"),
    canopy(1.5, 1.0, 3.7, 0.5, "#346e40"),
    canopy(1.4, -0.9, 3.9, -0.6, "#4a8d52"),
  ]);
}

export function palmGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const height = 9.5;
  // A gently leaning trunk built from short tapered sections.
  const sections = 6;
  for (let i = 0; i < sections; i++) {
    const t = i / sections;
    const lean = Math.sin(t * 1.2) * 0.5;
    parts.push(
      colored(
        new THREE.CylinderGeometry(0.2 - t * 0.07, 0.24 - t * 0.07, height / sections + 0.05, 7),
        i % 2 === 0 ? "#6b5a45" : "#5d4e3c",
        mat4([lean, (t + 0.5 / sections) * height, 0], [0, 0, -0.06]),
      ),
    );
  }
  const top = new THREE.Vector3(Math.sin(1.2) * 0.5, height, 0);
  // Fronds arch up and out of the crown, then droop under their own weight.
  const fronds = 11;
  for (let i = 0; i < fronds; i++) {
    const a = (i / fronds) * Math.PI * 2;
    const length = 4.4 + (i % 3) * 0.5;
    const lift = i % 2 === 0 ? 1.5 : 0.8;
    const frond = new THREE.PlaneGeometry(1.1, 1, 2, 7);
    const pos = frond.getAttribute("position");
    for (let v = 0; v < pos.count; v++) {
      const t = pos.getY(v) + 0.5; // 0 at the crown, 1 at the tip
      const across = pos.getX(v);
      const width = Math.sin(Math.min(1, t * 1.15) * Math.PI) * 0.9 + 0.12;
      pos.setXYZ(v, across * width, lift * Math.sin(t * 2.4) - 2.6 * t * t - Math.abs(across) * 0.35, t * length);
    }
    frond.computeVertexNormals();
    parts.push(colored(frond, i % 2 === 0 ? "#3f8a4a" : "#2f7340", new THREE.Matrix4().makeTranslation(top.x, top.y, top.z).multiply(new THREE.Matrix4().makeRotationY(a))));
  }
  parts.push(colored(new THREE.SphereGeometry(0.42, 8, 6), "#4d4032", mat4([top.x, top.y - 0.1, top.z])));
  return merge(parts);
}

/** Ship-to-shore gantry crane. The boom reaches out over local -Z (the water). */
export function craneGeometry(): THREE.BufferGeometry {
  const red = "#c0392b";
  const parts: THREE.BufferGeometry[] = [];
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, color = red) =>
    parts.push(colored(new THREE.BoxGeometry(w, h, d), color, mat4([x, y, z])));
  for (const x of [-11, 11]) {
    for (const z of [-6, 6]) box(1.2, 30, 1.2, x, 15, z);
    box(1.4, 1.4, 13.4, x, 30, 0);
    box(1.4, 1.2, 13.4, x, 12, 0);
    box(2.4, 1.6, 14, x, 0.8, 0, "#30343a");
  }
  box(23.4, 1.6, 1.4, 0, 30, -6);
  box(23.4, 1.6, 1.4, 0, 30, 6);
  // Boom and back reach.
  box(2.4, 1.8, 62, 0, 32, -14);
  box(1, 12, 1, 0, 38, 4);
  box(0.4, 0.4, 26, 0, 39, -9, "#e8e8e8");
  // Machinery house and trolley.
  box(6, 4.5, 9, 0, 35, 9, "#e6e6e3");
  box(3.2, 1.6, 4, 0, 30.4, -20, "#f1c40f");
  box(0.25, 14, 0.25, 0, 23, -20, "#2c3038");
  return merge(parts);
}

export function boatGeometry(): THREE.BufferGeometry {
  const hull = new THREE.BoxGeometry(4.6, 1.6, 15, 1, 1, 4);
  const pos = hull.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i);
    const t = Math.max(0, (z - 2) / 5.5);
    pos.setX(i, pos.getX(i) * (1 - t * t * 0.95) * (pos.getY(i) < 0 ? 0.72 : 1));
    if (z > 2) pos.setY(i, pos.getY(i) + t * 0.5);
  }
  hull.computeVertexNormals();
  return merge([
    colored(hull, "#f2f4f6", mat4([0, 0.5, 0])),
    colored(new THREE.BoxGeometry(3.6, 1.3, 6.5), "#e3e7eb", mat4([0, 1.9, -1.5])),
    colored(new THREE.BoxGeometry(3.7, 0.5, 6.6), "#1d2a3a", mat4([0, 2.0, -1.5])),
    colored(new THREE.BoxGeometry(2.8, 0.9, 3.6), "#eef0f2", mat4([0, 3, -2.2])),
    colored(new THREE.BoxGeometry(4.7, 0.16, 15.1), "#16365a", mat4([0, 0.1, 0])),
  ]);
}

/** Covered pedestrian bridge between pylons, spanning local X. */
export function skybridgeGeometry(span: number, height: number): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  parts.push(colored(new THREE.BoxGeometry(span + 3, 0.5, 4.2), "#d9dde2", mat4([0, height, 0])));
  parts.push(colored(new THREE.BoxGeometry(span + 3, 0.35, 4.6), "#eef1f4", mat4([0, height + 3.4, 0])));
  for (const z of [-2, 2]) parts.push(colored(new THREE.BoxGeometry(span + 3, 2.7, 0.12), "#6d9cc4", mat4([0, height + 1.85, z])));
  for (let x = -span / 2; x <= span / 2 + 0.01; x += span / 8) {
    for (const z of [-2.05, 2.05]) parts.push(colored(new THREE.BoxGeometry(0.22, 3.2, 0.22), "#f3f5f7", mat4([x, height + 1.85, z])));
  }
  for (const side of [-1, 1]) {
    parts.push(colored(new THREE.CylinderGeometry(0.9, 1.15, height, 12), "#c9ced5", mat4([(side * span) / 2, height / 2, 0])));
    parts.push(colored(new THREE.BoxGeometry(3.4, 0.6, 5), "#c9ced5", mat4([(side * span) / 2, height - 0.5, 0])));
  }
  return merge(parts);
}

export function skybridgeGlowGeometry(span: number, height: number): THREE.BufferGeometry {
  const strips = [-2.32, 2.32].map((z) => {
    const g = new THREE.BoxGeometry(span + 3, 0.14, 0.08);
    g.translate(0, height - 0.1, z);
    return g;
  });
  return merge(strips.map((g) => colored(g, "#ffffff")));
}

/** Hills along the north shore: a displaced grid that rises away from the city. */
export function hillsGeometry(): { geometry: THREE.BufferGeometry; heightAt: (x: number, z: number) => number } {
  const x0 = ISLAND.x0 - 60;
  const x1 = ISLAND.x1 + 60;
  const z1 = ISLAND.z0 - 0.5;
  const z0 = z1 - 260;
  const nx = 96;
  const nz = 36;
  const rng = createRng(4242);
  const bumps = Array.from({ length: 16 }, () => ({
    x: rng.range(x0 + 40, x1 - 40),
    z: rng.range(z0 + 30, z1 - 70),
    r: rng.range(50, 130),
    h: rng.range(18, 62),
  }));
  // The tallest ground is in the north-west, as in the reference.
  bumps.push({ x: -300, z: z1 - 150, r: 150, h: 92 }, { x: -120, z: z1 - 120, r: 110, h: 60 }, { x: 180, z: z1 - 140, r: 130, h: 46 });
  const smooth = (t: number) => {
    const c = Math.min(1, Math.max(0, t));
    return c * c * (3 - 2 * c);
  };
  const heightAt = (x: number, z: number) => {
    let h = 6;
    for (const b of bumps) {
      const d = Math.hypot(x - b.x, z - b.z) / b.r;
      if (d < 1) h += b.h * (1 - d * d) * (1 - d * d);
    }
    // Level with the pavement where the hills meet the city, sinking below the
    // water on the seaward sides.
    const landward = smooth((z1 - z) / 55);
    const seaward = smooth((z - z0) / 60) * smooth((x - x0) / 80) * smooth((x1 - x) / 80);
    return (0.5 + (h - 0.5) * landward) * seaward - 4 * (1 - seaward);
  };
  const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0, nx, nz);
  g.rotateX(-Math.PI / 2);
  g.translate((x0 + x1) / 2, 0, (z0 + z1) / 2);
  const pos = g.getAttribute("position");
  const colors = new Float32Array(pos.count * 3);
  const low = new THREE.Color("#4e8a55");
  const high = new THREE.Color("#7d8f6e");
  const rock = new THREE.Color("#8a8778");
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const h = heightAt(pos.getX(i), pos.getZ(i));
    pos.setY(i, h);
    c.copy(low).lerp(high, Math.min(1, h / 55));
    if (h > 62) c.lerp(rock, Math.min(1, (h - 62) / 30));
    colors.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return { geometry: g, heightAt };
}

export function hillTreePoints(heightAt: (x: number, z: number) => number, count: number): PropPoint[] {
  const rng = createRng(8118);
  const pts: PropPoint[] = [];
  let guard = 0;
  while (pts.length < count && guard++ < count * 20) {
    const x = rng.range(ISLAND.x0 - 40, ISLAND.x1 + 40);
    const z = rng.range(ISLAND.z0 - 240, ISLAND.z0 - 6);
    const y = heightAt(x, z);
    if (y < 1.5 || y > 70) continue;
    pts.push({ x, z, y: y - 0.3, rot: rng.range(0, 6.28), scale: rng.range(1.1, 2.4) });
  }
  return pts;
}

export function pineGeometry(): THREE.BufferGeometry {
  return merge([
    colored(new THREE.CylinderGeometry(0.12, 0.18, 1.4, 5), "#4b3a2c", mat4([0, 0.7, 0])),
    colored(new THREE.ConeGeometry(1.5, 3.2, 6), "#2f6b3e", mat4([0, 2.6, 0])),
    colored(new THREE.ConeGeometry(1.1, 2.6, 6), "#357545", mat4([0, 4.2, 0])),
  ]);
}

export function radioMastGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const levels = 7;
  const total = 64;
  for (let i = 0; i < levels; i++) {
    const h = total / levels;
    const r0 = 5.5 * (1 - i / levels) + 0.5;
    const r1 = 5.5 * (1 - (i + 1) / levels) + 0.5;
    parts.push(colored(new THREE.CylinderGeometry(r1, r0, h, 4, 1, true), i % 2 === 0 ? "#d8392b" : "#f0f0ee", mat4([0, h * (i + 0.5), 0], [0, Math.PI / 4, 0])));
  }
  parts.push(colored(new THREE.CylinderGeometry(0.15, 0.3, 14, 5), "#f0f0ee", mat4([0, total + 7, 0])));
  parts.push(colored(new THREE.CylinderGeometry(3.6, 3.6, 2.4, 10), "#e9e9e6", mat4([0, total * 0.62, 0])));
  return merge(parts);
}

export function turbineTowerGeometry(): THREE.BufferGeometry {
  return merge([
    colored(new THREE.CylinderGeometry(0.5, 1.1, 38, 10), "#f2f4f5", mat4([0, 19, 0])),
    colored(new THREE.BoxGeometry(1.4, 1.5, 3.6), "#f2f4f5", mat4([0, 38.4, 0.4])),
  ]);
}

export function turbineRotorGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [colored(new THREE.SphereGeometry(0.9, 10, 8), "#f2f4f5")];
  for (let i = 0; i < 3; i++) {
    const blade = new THREE.BoxGeometry(0.9, 15, 0.16);
    const pos = blade.getAttribute("position");
    for (let v = 0; v < pos.count; v++) {
      const t = (pos.getY(v) + 7.5) / 15;
      pos.setX(v, pos.getX(v) * (1 - t * 0.75));
    }
    blade.translate(0, 8, 0);
    parts.push(colored(blade, "#f7f8f9", new THREE.Matrix4().makeRotationZ((i / 3) * Math.PI * 2)));
  }
  return merge(parts);
}

export function pagodaGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  let y = 0;
  for (let i = 0; i < 4; i++) {
    const w = 9 - i * 1.6;
    parts.push(colored(new THREE.BoxGeometry(w, 3.4, w), "#b04a2f", mat4([0, y + 1.7, 0])));
    parts.push(colored(new THREE.ConeGeometry(w * 0.95, 1.8, 4), "#3a4a52", mat4([0, y + 4.3, 0], [0, Math.PI / 4, 0])));
    y += 4.6;
  }
  parts.push(colored(new THREE.CylinderGeometry(0.1, 0.2, 5, 5), "#d9b44a", mat4([0, y + 2.5, 0])));
  return merge(parts);
}

/** Fills an instanced mesh from prop points. */
export function setInstances(mesh: THREE.InstancedMesh, points: readonly PropPoint[], scaleY = 1): void {
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const p = new THREE.Vector3();
  const s = new THREE.Vector3();
  points.forEach((pt, i) => {
    q.setFromAxisAngle(up, pt.rot);
    p.set(pt.x, pt.y, pt.z);
    s.set(pt.scale, pt.scale * scaleY, pt.scale);
    m.compose(p, q, s);
    mesh.setMatrixAt(i, m);
  });
  mesh.count = points.length;
  mesh.instanceMatrix.needsUpdate = true;
  mesh.computeBoundingSphere();
}
