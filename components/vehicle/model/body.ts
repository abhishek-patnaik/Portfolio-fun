/**
 * Procedural body shell for the JDM coupe.
 *
 * Only reference images were supplied for the car (no mesh), so the body is
 * reconstructed here: cross-sections are defined at stations along the car and
 * lofted into one smooth surface. Faces are then sorted into material groups
 * (paint, glass, trim, lights…) by where they sit on the body, and the wheel
 * arches are cut by snapping vertices onto the arch circles.
 *
 * Car space: +Z forward, +Y up. Because the system is right-handed the
 * driver's right-hand side is -X.
 */
import * as THREE from "three";

export const CAR = {
  length: 4.52,
  halfLength: 2.26,
  width: 1.81,
  wheelBase: 2.55,
  frontAxleZ: 1.33,
  rearAxleZ: -1.22,
  trackHalf: 0.765,
  wheelRadius: 0.33,
  archRadius: 0.405,
} as const;

/** z, wB, yB, wM, yM, wS, yS, wT, yT, yC */
type Station = readonly [number, number, number, number, number, number, number, number, number, number];

const STATIONS: Station[] = [
  [-2.26, 0.6, 0.37, 0.74, 0.58, 0.7, 0.79, 0.54, 0.85, 0.865],
  [-2.2, 0.7, 0.31, 0.83, 0.56, 0.785, 0.835, 0.6, 0.895, 0.912],
  [-2.05, 0.77, 0.26, 0.885, 0.57, 0.835, 0.88, 0.645, 0.938, 0.955],
  [-1.8, 0.8, 0.22, 0.9, 0.59, 0.85, 0.92, 0.66, 0.972, 0.987],
  [-1.5, 0.82, 0.19, 0.905, 0.61, 0.845, 0.945, 0.655, 1.0, 1.012],
  [-1.22, 0.82, 0.18, 0.905, 0.62, 0.825, 0.95, 0.63, 1.075, 1.1],
  [-0.9, 0.82, 0.17, 0.895, 0.62, 0.8, 0.94, 0.61, 1.165, 1.195],
  [-0.55, 0.82, 0.17, 0.885, 0.61, 0.79, 0.93, 0.6, 1.222, 1.255],
  [-0.15, 0.82, 0.17, 0.88, 0.6, 0.79, 0.925, 0.595, 1.243, 1.275],
  [0.2, 0.82, 0.17, 0.88, 0.6, 0.79, 0.918, 0.6, 1.215, 1.245],
  [0.5, 0.82, 0.17, 0.882, 0.6, 0.8, 0.91, 0.655, 1.085, 1.115],
  [0.85, 0.82, 0.17, 0.885, 0.6, 0.825, 0.9, 0.71, 0.925, 0.945],
  [1.1, 0.815, 0.175, 0.89, 0.6, 0.84, 0.885, 0.67, 0.905, 0.925],
  [1.33, 0.81, 0.18, 0.895, 0.6, 0.845, 0.86, 0.645, 0.875, 0.895],
  [1.65, 0.8, 0.19, 0.885, 0.56, 0.83, 0.8, 0.62, 0.812, 0.835],
  [1.95, 0.78, 0.2, 0.862, 0.52, 0.8, 0.705, 0.59, 0.722, 0.75],
  [2.12, 0.73, 0.21, 0.81, 0.48, 0.735, 0.635, 0.53, 0.652, 0.678],
  [2.22, 0.64, 0.235, 0.72, 0.44, 0.64, 0.57, 0.45, 0.588, 0.61],
  [2.26, 0.54, 0.27, 0.61, 0.42, 0.53, 0.52, 0.36, 0.54, 0.556],
];

/** Subdivisions of each ring span (c0→c1 … c6→c7). Denser where the arches are cut. */
const SPAN_DIVS = [3, 3, 10, 8, 6, 4, 4] as const;
const HALF = SPAN_DIVS.reduce((a, b) => a + b, 0);
const RING = HALF * 2;

export type BodyMaterialKey = "paint" | "glass" | "tint" | "trim" | "well" | "under";

export const BODY_MATERIAL_ORDER: BodyMaterialKey[] = ["paint", "glass", "tint", "trim", "well", "under"];

/** Monotone cubic (Fritsch–Carlson) interpolation: smooth, with no overshoot. */
function pchip(xs: number[], ys: number[]): (x: number) => number {
  const n = xs.length;
  const h: number[] = [];
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    h.push(xs[i + 1] - xs[i]);
    d.push((ys[i + 1] - ys[i]) / h[i]);
  }
  const m = new Array<number>(n).fill(0);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) m[i] = 0;
    else {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
  }
  return (x: number) => {
    let i = 0;
    while (i < n - 2 && x > xs[i + 1]) i++;
    const t = Math.min(1, Math.max(0, (x - xs[i]) / h[i]));
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      (2 * t3 - 3 * t2 + 1) * ys[i] +
      (t3 - 2 * t2 + t) * h[i] * m[i] +
      (-2 * t3 + 3 * t2) * ys[i + 1] +
      (t3 - t2) * h[i] * m[i + 1]
    );
  };
}

const zs = STATIONS.map((s) => s[0]);
const PARAMS = Array.from({ length: 9 }, (_, k) =>
  pchip(
    zs,
    STATIONS.map((s) => s[k + 1]),
  ),
);

function catmull(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

/** Right-hand half of the cross-section at z, from bottom centre up to top centre. */
export function halfSection(z: number): { x: number; y: number }[] {
  const [wB, yB, wM, yM, wS, yS, wT, yT, yC] = PARAMS.map((f) => f(z));
  const c = [
    { x: 0, y: yB },
    { x: wB * 0.55, y: yB },
    { x: wB, y: yB + 0.03 },
    { x: wM, y: yM },
    { x: wS, y: yS },
    { x: wT, y: yT },
    { x: wT * 0.5, y: yT + (yC - yT) * 0.8 },
    { x: 0, y: yC },
  ];
  const ghostStart = { x: -c[1].x, y: c[1].y };
  const ghostEnd = { x: -c[6].x, y: c[6].y };
  const pts: { x: number; y: number }[] = [];
  for (let s = 0; s < 7; s++) {
    const p0 = s === 0 ? ghostStart : c[s - 1];
    const p1 = c[s];
    const p2 = c[s + 1];
    const p3 = s === 6 ? ghostEnd : c[s + 2];
    const div = SPAN_DIVS[s];
    for (let k = 0; k < div; k++) {
      const t = k / div;
      pts.push({ x: Math.max(0, catmull(p0.x, p1.x, p2.x, p3.x, t)), y: catmull(p0.y, p1.y, p2.y, p3.y, t) });
    }
  }
  pts.push({ x: 0, y: c[7].y });
  pts[0].x = 0;
  return pts;
}

/** Which span and subdivision a half-ring segment index belongs to. */
function spanOf(seg: number): { span: number; sub: number; div: number } {
  let acc = 0;
  for (let s = 0; s < SPAN_DIVS.length; s++) {
    if (seg < acc + SPAN_DIVS[s]) return { span: s, sub: seg - acc, div: SPAN_DIVS[s] };
    acc += SPAN_DIVS[s];
  }
  return { span: 6, sub: SPAN_DIVS[6] - 1, div: SPAN_DIVS[6] };
}

interface RingSpec {
  /** Station the cross-section is sampled at. */
  base: number;
  /** Actual z of the ring. */
  z: number;
  /** Scale towards the section centre; below 1 only on the rounded end closures. */
  scale: number;
}

function ringStations(): RingSpec[] {
  const out: RingSpec[] = [];
  const step = 0.035;
  const n = Math.round(CAR.length / step);
  // Rounded closures: a few shrinking rings beyond each end instead of a flat cap.
  const closure: [number, number][] = [
    [0.5, 0.05],
    [0.76, 0.04],
    [0.9, 0.026],
    [0.97, 0.012],
  ];
  for (const [scale, dz] of closure) out.push({ base: -CAR.halfLength, z: -CAR.halfLength - dz, scale });
  for (let i = 0; i <= n; i++) {
    const z = -CAR.halfLength + (CAR.length * i) / n;
    out.push({ base: z, z, scale: 1 });
  }
  for (const [scale, dz] of [...closure].reverse()) out.push({ base: CAR.halfLength, z: CAR.halfLength + dz, scale });
  return out;
}

export interface CarBody {
  /** Exterior shell with one geometry group per entry of BODY_MATERIAL_ORDER. */
  geometry: THREE.BufferGeometry;
  /** Same vertices, cabin faces only, drawn back-face for the interior lining. */
  interior: THREE.BufferGeometry;
  /** Finds the point on the shell hit by a ray, for placing lights and trim. */
  project: (origin: THREE.Vector3, direction: THREE.Vector3) => { point: THREE.Vector3; normal: THREE.Vector3 } | null;
  /** Bottom outline of the front bumper, used to build the splitter. */
  noseOutline: THREE.Vector3[];
}

export function buildCarBody(): CarBody {
  const rings = ringStations();
  const nr = rings.length;
  // The vertex set is stored twice. Wheel-well faces use the second copy so the
  // arch lips keep a crisp edge instead of sharing smoothed normals with the wings.
  const vertexCount = nr * RING + 2;
  const positions = new Float32Array(vertexCount * 2 * 3);
  // 0 = normal, 1 = arch lip, 2 = inside a wheel well.
  const flag = new Uint8Array(nr * RING);
  const wheels = [CAR.frontAxleZ, CAR.rearAxleZ];
  const sideStart = SPAN_DIVS[0] + 1;
  const sideEnd = SPAN_DIVS[0] + SPAN_DIVS[1] + SPAN_DIVS[2] + SPAN_DIVS[3];

  // Undistorted copy of the surface, used only to derive clean shading normals.
  const smooth = new Float32Array(vertexCount * 3);
  const sectionAt = (spec: RingSpec) => {
    const half = halfSection(spec.base);
    if (spec.scale === 1) return half;
    const mid = (half[0].y + half[HALF].y) / 2;
    return half.map((p) => ({ x: p.x * spec.scale, y: mid + (p.y - mid) * spec.scale }));
  };

  for (let i = 0; i < nr; i++) {
    const z = rings[i].z;
    const half = sectionAt(rings[i]);
    const wellX = Math.max(...half.map((p) => p.x)) - 0.35;
    for (let j = 0; j < RING; j++) {
      const mirrored = j > HALF;
      const h = mirrored ? RING - j : j;
      const p = half[h];
      let x = p.x;
      let y = p.y;
      let pz = z;
      smooth.set([mirrored ? -p.x : p.x, p.y, z], (i * RING + j) * 3);
      if (h >= sideStart && h <= sideEnd) {
        for (const wz of wheels) {
          const dz = z - wz;
          const dy = y - CAR.wheelRadius;
          const d = Math.hypot(dz, dy);
          if (d < CAR.archRadius - 0.05) {
            x = Math.min(x, wellX);
            flag[i * RING + j] = 2;
          } else if (d < CAR.archRadius + 0.022) {
            const k = CAR.archRadius / (d || 1);
            pz = wz + dz * k;
            y = CAR.wheelRadius + dy * k;
            x += 0.012;
            flag[i * RING + j] = 1;
          }
        }
      }
      const o = (i * RING + j) * 3;
      positions[o] = mirrored ? -x : x;
      positions[o + 1] = y;
      positions[o + 2] = pz;
    }
  }

  // End caps.
  const rearCentre = nr * RING;
  const frontCentre = rearCentre + 1;
  const capY = (ring: number) => {
    const half = sectionAt(rings[ring]);
    return (half[0].y + half[HALF].y) / 2;
  };
  positions.set([0, capY(0), rings[0].z - 0.008], rearCentre * 3);
  positions.set([0, capY(nr - 1), rings[nr - 1].z + 0.008], frontCentre * 3);
  smooth.set([0, capY(0), rings[0].z - 0.008], rearCentre * 3);
  smooth.set([0, capY(nr - 1), rings[nr - 1].z + 0.008], frontCentre * 3);

  positions.copyWithin(vertexCount * 3, 0, vertexCount * 3);

  const buckets: Record<BodyMaterialKey, number[]> = { paint: [], glass: [], tint: [], trim: [], well: [], under: [] };
  const interiorIndex: number[] = [];
  const va = new THREE.Vector3();
  const vb = new THREE.Vector3();
  const vc = new THREE.Vector3();
  const vd = new THREE.Vector3();
  const e1 = new THREE.Vector3();
  const e2 = new THREE.Vector3();
  const nrm = new THREE.Vector3();
  const read = (v: THREE.Vector3, idx: number) => v.fromArray(positions, idx * 3);

  const classify = (seg: number, y: number, z: number, n: THREE.Vector3, well: boolean): BodyMaterialKey => {
    const { span, sub, div } = spanOf(seg);
    if (well) return "well";
    if (span === 4) {
      if (z > -0.98 && z < 0.66 && sub < div - 1) return z > -0.37 && z < -0.3 ? "trim" : "tint";
      return "paint";
    }
    if (span >= 5) {
      const edge = span === 5 && sub === 0;
      if (z > 0.22 && z < 0.83) return edge ? "paint" : "glass";
      if (z >= 0.83 && z < 0.9) return "trim";
      if (z > -1.4 && z < -0.58) return edge ? "paint" : "tint";
      return "paint";
    }
    if (y < 0.215) return "under";
    if (n.z > 0.45 && z > 1.85 && y < 0.25) return "under";
    return "paint";
  };

  for (let i = 0; i < nr - 1; i++) {
    for (let j = 0; j < RING; j++) {
      const j1 = (j + 1) % RING;
      const a = i * RING + j;
      const b = i * RING + j1;
      const c = (i + 1) * RING + j1;
      const d = (i + 1) * RING + j;
      read(va, a);
      read(vb, b);
      read(vc, c);
      read(vd, d);
      const cy = (va.y + vb.y + vc.y + vd.y) / 4;
      const cz = (va.z + vb.z + vc.z + vd.z) / 4;
      e1.subVectors(vb, va);
      e2.subVectors(vd, va);
      nrm.crossVectors(e1, e2).normalize();
      const seg = j < HALF ? j : RING - 1 - j;
      const well = flag[a] > 0 && flag[b] > 0 && flag[c] > 0 && flag[d] > 0 && (flag[a] | flag[b] | flag[c] | flag[d]) >= 2;
      const key = classify(seg, cy, cz, nrm, well);
      const o = key === "well" ? vertexCount : 0;
      buckets[key].push(a + o, b + o, d + o, b + o, c + o, d + o);
      if (key !== "glass" && key !== "tint") interiorIndex.push(a, b, d, b, c, d);
    }
  }
  for (let j = 0; j < RING; j++) {
    const j1 = (j + 1) % RING;
    buckets.paint.push(rearCentre, j1, j);
    buckets.paint.push(frontCentre, (nr - 1) * RING + j, (nr - 1) * RING + j1);
  }

  const geometry = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(positions, 3);
  geometry.setAttribute("position", posAttr);
  const index: number[] = [];
  BODY_MATERIAL_ORDER.forEach((key, materialIndex) => {
    const list = buckets[key];
    geometry.addGroup(index.length, list.length, materialIndex);
    for (const v of list) index.push(v);
  });
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  // Replace the normals of the painted surface with those of the undistorted
  // loft, so cutting the arches does not leave ripples in the reflections.
  const clean = new THREE.BufferGeometry();
  clean.setAttribute("position", new THREE.BufferAttribute(smooth, 3));
  clean.setIndex(index.map((v) => (v >= vertexCount ? v - vertexCount : v)));
  clean.computeVertexNormals();
  const normals = geometry.getAttribute("normal") as THREE.BufferAttribute;
  (normals.array as Float32Array).set((clean.getAttribute("normal").array as Float32Array).subarray(0, vertexCount * 3), 0);
  normals.needsUpdate = true;
  clean.dispose();
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  const interior = new THREE.BufferGeometry();
  interior.setAttribute("position", posAttr);
  interior.setAttribute("normal", geometry.getAttribute("normal"));
  interior.setIndex(interiorIndex);
  interior.computeBoundingSphere();

  const probe = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  const raycaster = new THREE.Raycaster();
  const project: CarBody["project"] = (origin, direction) => {
    raycaster.set(origin, direction.clone().normalize());
    const hit = raycaster.intersectObject(probe, false)[0];
    if (!hit || !hit.face) return null;
    const normal = hit.face.normal.clone();
    if (normal.dot(direction) > 0) normal.negate();
    return { point: hit.point.clone(), normal };
  };

  const noseOutline: THREE.Vector3[] = [];
  for (let i = 0; i < nr; i++) {
    if (rings[i].z < 1.5 || rings[i].scale < 1) continue;
    const half = halfSection(rings[i].base);
    const corner = half[SPAN_DIVS[0] + SPAN_DIVS[1]];
    noseOutline.push(new THREE.Vector3(corner.x, corner.y, rings[i].z));
  }

  return { geometry, interior, project, noseOutline };
}
