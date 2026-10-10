/**
 * Assembles the complete car: body shell, wheels, lights, hoop spoiler, mirrors
 * and a right-hand-drive cockpit. Everything is generated geometry; see
 * body.ts for why. Static parts that share a material are merged so the whole
 * car costs only a few dozen draw calls.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Merger, mat4 } from "@/lib/three/merge";
import { BODY_MATERIAL_ORDER, CAR, buildCarBody, type BodyMaterialKey, type CarBody } from "./body";

export interface CarOptions {
  /** Use clear-coated physical materials (medium and high quality). */
  physical: boolean;
  plateText: string;
  fontFamily: string;
  paintColor?: string;
}

export interface CarWheel {
  /** Steers (front wheels only). */
  pivot: THREE.Group;
  /** Spins with road speed. */
  spinner: THREE.Group;
  front: boolean;
  side: 1 | -1;
}

export interface CarModel {
  root: THREE.Group;
  /** Sprung mass: everything except the wheels. Tilted for suspension motion. */
  body: THREE.Group;
  wheels: CarWheel[];
  steeringWheel: THREE.Group;
  /** Body paint, exposed so quality settings can toggle the clear coat. */
  paint: THREE.MeshStandardMaterial;
  tachNeedle: THREE.Object3D;
  speedNeedle: THREE.Object3D;
  lamps: {
    head: THREE.MeshStandardMaterial;
    tail: THREE.MeshStandardMaterial;
    brake: THREE.MeshStandardMaterial;
    reverse: THREE.MeshStandardMaterial;
    dash: THREE.MeshBasicMaterial;
  };
  /** Driver eye point in car space. */
  eye: THREE.Vector3;
  /** Headlamp positions in car space, for the beam lights. */
  headlampPositions: THREE.Vector3[];
  dispose: () => void;
}

const DRIVER_X = -0.37;

function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createMaterials(options: CarOptions) {
  const paintColor = options.paintColor ?? "#b3b9c1";
  const paint = options.physical
    ? new THREE.MeshPhysicalMaterial({
        color: paintColor,
        metalness: 0.88,
        roughness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.2,
      })
    : new THREE.MeshStandardMaterial({ color: paintColor, metalness: 0.8, roughness: 0.34, envMapIntensity: 1.1 });
  const std = (params: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(params);
  const emissive = (color: string, intensity: number) =>
    std({ color: "#111111", emissive: color, emissiveIntensity: intensity, roughness: 0.4 });

  const plate = canvasTexture(512, 128, (ctx) => {
    ctx.fillStyle = "#0a0b0d";
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = "#8d949c";
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, 500, 116);
    ctx.fillStyle = "#f2f4f6";
    ctx.font = `600 70px ${options.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(options.plateText.toUpperCase().slice(0, 9), 256, 68, 460);
  });

  const gauges = canvasTexture(768, 256, (ctx) => {
    ctx.fillStyle = "#050506";
    ctx.fillRect(0, 0, 768, 256);
    const dial = (cx: number, cy: number, r: number, max: number, step: number, label: string, redFrom: number) => {
      ctx.strokeStyle = "#2a2d33";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      for (let v = 0; v <= max; v += step) {
        const a = Math.PI * 0.75 + (v / max) * Math.PI * 1.5;
        const major = Math.round(v / step) % 2 === 0;
        ctx.strokeStyle = v >= redFrom ? "#ff3b30" : "#e9edf2";
        ctx.lineWidth = major ? 4 : 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * (r - 6), cy + Math.sin(a) * (r - 6));
        ctx.lineTo(cx + Math.cos(a) * (r - (major ? 22 : 14)), cy + Math.sin(a) * (r - (major ? 22 : 14)));
        ctx.stroke();
        if (major && r > 70) {
          ctx.fillStyle = v >= redFrom ? "#ff6a5f" : "#cfd5dc";
          ctx.font = `600 ${Math.round(r * 0.17)}px ${options.fontFamily}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(v), cx + Math.cos(a) * (r - 38), cy + Math.sin(a) * (r - 38));
        }
      }
      ctx.fillStyle = "#7f8791";
      ctx.font = `500 ${Math.round(r * 0.13)}px ${options.fontFamily}`;
      ctx.textAlign = "center";
      ctx.fillText(label, cx, cy + r * 0.52);
    };
    dial(384, 128, 118, 9, 0.5, "x1000 r/min", 7);
    dial(630, 138, 96, 280, 20, "km/h", 999);
    dial(138, 138, 96, 8, 1, "BOOST", 7);
  });

  const screen = canvasTexture(256, 160, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 256, 160);
    g.addColorStop(0, "#07131f");
    g.addColorStop(1, "#151033");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 160);
    ctx.strokeStyle = "rgba(124,196,255,0.5)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(20 + i * 42, 150);
      ctx.lineTo(128 + (i - 2.5) * 8, 70);
      ctx.stroke();
    }
    ctx.fillStyle = "#7cc4ff";
    ctx.font = `600 22px ${options.fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillText(options.plateText.toUpperCase(), 128, 34);
    ctx.fillStyle = "#b79bff";
    ctx.font = `500 13px ${options.fontFamily}`;
    ctx.fillText("PORTFOLIO NAVIGATION", 128, 54);
  });

  const body: Record<BodyMaterialKey, THREE.Material> = {
    paint,
    glass: std({
      color: "#0a1016",
      metalness: 0.3,
      roughness: 0.04,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      envMapIntensity: 1.8,
    }),
    tint: std({
      color: "#05070a",
      metalness: 0.4,
      roughness: 0.05,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      envMapIntensity: 1.8,
    }),
    trim: std({ color: "#0c0d0f", roughness: 0.5, metalness: 0.25 }),
    well: std({ color: "#040405", roughness: 1 }),
    under: std({ color: "#0b0b0c", roughness: 0.85, metalness: 0.1 }),
  };

  const gaugeMaterial = new THREE.MeshBasicMaterial({ map: gauges, toneMapped: false });
  gaugeMaterial.color.setScalar(1.7);
  return {
    body,
    paint,
    trim: body.trim,
    well: body.well,
    grille: std({ color: "#050607", roughness: 0.6, metalness: 0.4 }),
    headlight: std({ color: "#191c21", roughness: 0.1, metalness: 1, envMapIntensity: 1.7 }),
    taillight: std({ color: "#240408", roughness: 0.16, metalness: 0.5, envMapIntensity: 1.5 }),
    interior: std({ color: "#0f1013", roughness: 0.92, side: THREE.BackSide }),
    dash: std({ color: "#121316", roughness: 0.78 }),
    dashSoft: std({ color: "#191a1e", roughness: 0.9 }),
    seat: std({ color: "#15161a", roughness: 0.86 }),
    seatAccent: std({ color: "#6d0d13", roughness: 0.8 }),
    rubber: std({ color: "#0a0a0b", roughness: 0.93 }),
    rim: std({ color: "#2b2d31", roughness: 0.36, metalness: 0.9, envMapIntensity: 1.2 }),
    rimBarrel: std({ color: "#1c1d20", roughness: 0.5, metalness: 0.8, side: THREE.DoubleSide }),
    chrome: std({ color: "#dcdfe3", roughness: 0.1, metalness: 1, envMapIntensity: 1.5 }),
    disc: std({ color: "#73767a", roughness: 0.42, metalness: 0.9 }),
    caliper: std({ color: "#c1121f", roughness: 0.45, metalness: 0.2 }),
    mirror: std({ color: "#10151b", roughness: 0.2, metalness: 1, envMapIntensity: 0.7 }),
    head: emissive("#fff1d0", 2.2),
    tail: emissive("#ff1420", 1.1),
    brake: emissive("#ff1420", 0.9),
    amber: emissive("#ff8a00", 0.7),
    reverse: emissive("#ffffff", 0),
    needle: new THREE.MeshBasicMaterial({ color: "#ff5a36", toneMapped: false }),
    plate: new THREE.MeshBasicMaterial({ map: plate }),
    gauges: gaugeMaterial,
    screen: new THREE.MeshBasicMaterial({ map: screen, toneMapped: false }),
    seam: new THREE.LineBasicMaterial({ color: "#1b1d20", transparent: true, opacity: 0.75 }),
    textures: [plate, gauges, screen],
  };
}

type Materials = ReturnType<typeof createMaterials>;

/** Sweeps a rectangular section along a curve lying roughly in the XY plane. */
function sweepBlade(points: THREE.Vector3[], chord: (t: number) => number, thickness: number, samples = 48): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
  const pos: number[] = [];
  const sections: THREE.Vector3[][] = [];
  const zAxis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const p = curve.getPoint(t);
    const tangent = curve.getTangent(t);
    const side = new THREE.Vector3().crossVectors(tangent, zAxis).normalize();
    const c = chord(t) / 2;
    const h = thickness / 2;
    sections.push([
      p.clone().addScaledVector(zAxis, c).addScaledVector(side, h),
      p.clone().addScaledVector(zAxis, c * 0.2).addScaledVector(side, h * 1.5),
      p.clone().addScaledVector(zAxis, -c).addScaledVector(side, h * 0.5),
      p.clone().addScaledVector(zAxis, -c).addScaledVector(side, -h * 0.5),
      p.clone().addScaledVector(zAxis, c * 0.2).addScaledVector(side, -h * 1.5),
      p.clone().addScaledVector(zAxis, c).addScaledVector(side, -h),
    ]);
  }
  const n = sections[0].length;
  const quad = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, d: THREE.Vector3) => {
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z, d.x, d.y, d.z, b.x, b.y, b.z, c.x, c.y, c.z, d.x, d.y, d.z);
  };
  for (let i = 0; i < samples; i++) {
    for (let k = 0; k < n; k++) {
      const k1 = (k + 1) % n;
      quad(sections[i][k], sections[i][k1], sections[i + 1][k1], sections[i + 1][k]);
    }
  }
  const flat = new THREE.BufferGeometry();
  flat.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  const g = mergeVertices(flat, 1e-5);
  flat.dispose();
  g.computeVertexNormals();
  return g;
}

interface PatchOptions {
  /** Centre of the patch on the projection plane. */
  origin: THREE.Vector3;
  /** In-plane axes of the projection plane. */
  u: THREE.Vector3;
  v: THREE.Vector3;
  /** Projection direction, towards the body. */
  dir: THREE.Vector3;
  halfU: number;
  halfV: number;
  /** Superellipse exponent: 2 is an ellipse, larger values approach a rectangle. */
  exponent: number;
  offset: number;
  grid?: [number, number];
}

/**
 * A patch that hugs the body: a rounded shape is projected onto the shell point
 * by point, so lamp housings and intakes follow the curvature exactly.
 */
function projectedPatch(body: CarBody, o: PatchOptions): THREE.BufferGeometry | null {
  const [nu, nv] = o.grid ?? [14, 8];
  const pos = new Float32Array((nu + 1) * (nv + 1) * 3);
  const ok = new Uint8Array((nu + 1) * (nv + 1));
  const origin = new THREE.Vector3();
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      const s = (i / nu) * 2 - 1;
      const t = (j / nv) * 2 - 1;
      const m = Math.max(Math.abs(s), Math.abs(t));
      const r = Math.pow(Math.pow(Math.abs(s), o.exponent) + Math.pow(Math.abs(t), o.exponent), 1 / o.exponent) || 1;
      const k = m / r;
      origin.copy(o.origin).addScaledVector(o.u, s * k * o.halfU).addScaledVector(o.v, t * k * o.halfV);
      const hit = body.project(origin, o.dir);
      const idx = j * (nu + 1) + i;
      if (!hit) continue;
      ok[idx] = 1;
      hit.point.addScaledVector(hit.normal, o.offset).toArray(pos, idx * 3);
    }
  }
  const index: number[] = [];
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i;
      const b = a + 1;
      const c = a + nu + 1;
      const d = c + 1;
      if (ok[a] && ok[b] && ok[c] && ok[d]) index.push(a, b, c, b, d, c);
    }
  }
  if (index.length === 0) return null;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setIndex(index);
  g.computeVertexNormals();
  // Make sure the patch faces the projector, whatever the axis handedness.
  const n = g.getAttribute("normal");
  let facing = 0;
  for (let i = 0; i < n.count; i++) facing += n.getX(i) * o.dir.x + n.getY(i) * o.dir.y + n.getZ(i) * o.dir.z;
  if (facing > 0) {
    for (let i = 0; i < index.length; i += 3) {
      const tmp = index[i + 1];
      index[i + 1] = index[i + 2];
      index[i + 2] = tmp;
    }
    g.setIndex(index);
    g.computeVertexNormals();
  }
  return g;
}

function buildWheel(m: Materials, side: 1 | -1, front: boolean): { wheel: CarWheel; group: THREE.Group } {
  const group = new THREE.Group();
  const pivot = new THREE.Group();
  const spinner = new THREE.Group();
  const oriented = new THREE.Group();
  group.add(pivot);
  pivot.add(spinner);
  spinner.add(oriented);
  if (side === -1) oriented.rotation.y = Math.PI;

  const r = CAR.wheelRadius;
  const rimR = 0.218;
  const halfW = 0.128;
  // Lathe profiles are (radius, axial position); the axis is then turned onto X.
  const toAxisX = new THREE.Matrix4().makeRotationZ(-Math.PI / 2);
  const tyreProfile = [
    [rimR, -halfW + 0.012],
    [0.265, -halfW],
    [0.312, -halfW + 0.006],
    [r, -halfW + 0.034],
    [r, halfW - 0.034],
    [0.312, halfW - 0.006],
    [0.265, halfW],
    [rimR, halfW - 0.012],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const merger = new Merger();
  merger.add(new THREE.LatheGeometry(tyreProfile, 36), m.rubber, toAxisX);

  const barrelProfile = [
    [rimR + 0.004, -halfW + 0.012],
    [rimR - 0.012, -halfW + 0.03],
    [rimR - 0.02, 0],
    [rimR - 0.012, halfW - 0.03],
    [rimR + 0.004, halfW - 0.012],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  merger.add(new THREE.LatheGeometry(barrelProfile, 36), m.rimBarrel, toAxisX);
  merger.add(new THREE.TorusGeometry(rimR - 0.004, 0.011, 8, 40), m.rim, mat4([halfW - 0.014, 0, 0], [0, Math.PI / 2, 0]));

  // Five twin-edged spokes, dished slightly towards the hub.
  const spokes = 5;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const len = rimR - 0.05;
    const spoke = new THREE.BoxGeometry(0.03, len, 0.05);
    const pos = spoke.getAttribute("position");
    for (let v = 0; v < pos.count; v++) {
      const y = pos.getY(v);
      const t = y / len + 0.5;
      pos.setZ(v, pos.getZ(v) * (1.25 - t * 0.55));
      pos.setX(v, pos.getX(v) + (1 - t) * -0.028);
    }
    spoke.computeVertexNormals();
    const mtx = new THREE.Matrix4()
      .makeRotationX(a)
      .multiply(mat4([halfW - 0.035, 0.045 + len / 2, 0]));
    merger.add(spoke, m.rim, mtx);
  }
  merger.add(new THREE.CylinderGeometry(0.06, 0.07, 0.05, 20), m.rim, mat4([halfW - 0.07, 0, 0], [0, 0, -Math.PI / 2]));
  merger.add(new THREE.CylinderGeometry(0.028, 0.028, 0.012, 16), m.chrome, mat4([halfW - 0.04, 0, 0], [0, 0, -Math.PI / 2]));
  merger.build(oriented, { castShadow: true });

  // Brake disc and caliper stay with the hub: they steer but do not spin.
  const brake = new THREE.Group();
  if (side === -1) brake.rotation.y = Math.PI;
  pivot.add(brake);
  const brakeMerger = new Merger();
  brakeMerger.add(new THREE.CylinderGeometry(0.168, 0.168, 0.022, 28), m.disc, mat4([0.03, 0, 0], [0, 0, -Math.PI / 2]));
  const caliper = new RoundedBoxGeometry(0.07, 0.085, 0.15, 2, 0.015);
  brakeMerger.add(caliper, m.caliper, mat4([0.035, 0.105, front ? -0.1 : 0.1], [front ? 0.75 : -0.75, 0, 0]));
  brakeMerger.build(brake);

  return { wheel: { pivot, spinner, front, side }, group };
}

function addExteriorDetails(body: CarBody, m: Materials, merger: Merger, parent: THREE.Group, headlamps: THREE.Vector3[]): void {
  const up = new THREE.Vector3(0, 1, 0);
  const disc = (radius: number, depth: number, material: THREE.Material, hit: { point: THREE.Vector3; normal: THREE.Vector3 }, proud = 0.004) => {
    const q = new THREE.Quaternion().setFromUnitVectors(up, hit.normal);
    const p = hit.point.clone().addScaledVector(hit.normal, proud);
    merger.add(new THREE.CylinderGeometry(radius, radius * 0.92, depth, 20), material, new THREE.Matrix4().compose(p, q, new THREE.Vector3(1, 1, 1)));
  };

  for (const side of [1, -1] as const) {
    // Tail lamps: four round units per side in a dark housing.
    const back = new THREE.Vector3(0, 0, 1);
    const housing = projectedPatch(body, {
      origin: new THREE.Vector3(side * 0.54, 0.748, -3),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 1, 0),
      dir: back,
      halfU: 0.275,
      halfV: 0.078,
      exponent: 3.2,
      offset: 0.004,
      grid: [18, 8],
    });
    if (housing) merger.add(housing, m.taillight);
    const tailX = [0.345, 0.475, 0.605, 0.73];
    const tailMat = [m.reverse, m.brake, m.tail, m.amber];
    tailX.forEach((x, i) => {
      const hit = body.project(new THREE.Vector3(side * x, 0.748, -3), back);
      if (!hit) return;
      const facing = hit.normal.clone().lerp(new THREE.Vector3(0, 0, -1), 0.5).normalize();
      disc(0.05, 0.028, tailMat[i], { point: hit.point, normal: facing }, 0.012);
      const q = new THREE.Quaternion().setFromUnitVectors(up, facing);
      const ring = new THREE.TorusGeometry(0.054, 0.006, 6, 24);
      ring.rotateX(Math.PI / 2);
      merger.add(ring, m.chrome, new THREE.Matrix4().compose(hit.point.clone().addScaledVector(facing, 0.018), q, new THREE.Vector3(1, 1, 1)));
    });

    // Headlamps: three projectors under a smoked lens on each front corner.
    const lampDir = new THREE.Vector3(0, -0.62, -0.785).normalize();
    const lampU = new THREE.Vector3(1, 0, 0);
    const lampV = new THREE.Vector3(0, 0.785, -0.62).normalize();
    const lampOrigin = new THREE.Vector3(side * 0.6, 0.69, 1.93).addScaledVector(lampDir, -2);
    const lens = projectedPatch(body, {
      origin: lampOrigin,
      u: lampU,
      v: lampV,
      dir: lampDir,
      halfU: 0.215,
      halfV: 0.095,
      exponent: 2.5,
      offset: 0.005,
      grid: [18, 10],
    });
    if (lens) merger.add(lens, m.headlight);
    [-0.128, 0, 0.128].forEach((du, i) => {
      const hit = body.project(lampOrigin.clone().addScaledVector(lampU, side * du), lampDir);
      if (!hit) return;
      const facing = hit.normal.clone().lerp(new THREE.Vector3(0, 0.2, 1), 0.6).normalize();
      disc(i === 1 ? 0.05 : 0.043, 0.02, m.head, { point: hit.point, normal: facing }, 0.012);
      if (i === 1) headlamps.push(hit.point.clone().add(new THREE.Vector3(0, 0.02, 0.06)));
    });

    // Outer intake with the indicator inside it.
    const front = new THREE.Vector3(0, 0, -1);
    const intake = projectedPatch(body, {
      origin: new THREE.Vector3(side * 0.63, 0.355, 3.2),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 1, 0),
      dir: front,
      halfU: 0.125,
      halfV: 0.062,
      exponent: 3.5,
      offset: 0.004,
      grid: [10, 6],
    });
    if (intake) merger.add(intake, m.grille);
    const indicator = projectedPatch(body, {
      origin: new THREE.Vector3(side * 0.65, 0.375, 3.2),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 1, 0),
      dir: front,
      halfU: 0.075,
      halfV: 0.022,
      exponent: 4,
      offset: 0.009,
      grid: [8, 3],
    });
    if (indicator) merger.add(indicator, m.amber);

    const marker = body.project(new THREE.Vector3(side * 2, 0.62, 1.86), new THREE.Vector3(-side, 0, 0));
    if (marker) {
      merger.add(new RoundedBoxGeometry(0.012, 0.03, 0.09, 2, 0.005), m.amber, mat4([marker.point.x, marker.point.y, marker.point.z]));
    }
    const rearMarker = body.project(new THREE.Vector3(side * 2, 0.6, -1.95), new THREE.Vector3(-side, 0, 0));
    if (rearMarker) {
      merger.add(new RoundedBoxGeometry(0.012, 0.03, 0.08, 2, 0.005), m.tail, mat4([rearMarker.point.x, rearMarker.point.y, rearMarker.point.z]));
    }

    // Door handle.
    const handle = body.project(new THREE.Vector3(side * 2, 0.8, -0.3), new THREE.Vector3(-side, 0, 0));
    if (handle) {
      merger.add(new RoundedBoxGeometry(0.02, 0.028, 0.15, 2, 0.008), m.paint, mat4([handle.point.x + side * 0.004, handle.point.y, handle.point.z]));
    }

    // Wing mirror on a short stalk.
    const mirrorBase = body.project(new THREE.Vector3(side * 2, 0.945, 0.6), new THREE.Vector3(-side, 0, 0));
    const mx = (mirrorBase?.point.x ?? side * 0.8) + side * 0.1;
    const shell = new THREE.SphereGeometry(1, 20, 14);
    merger.add(shell, m.paint, mat4([mx, 0.99, 0.61], [0, side * 0.2, 0], [0.105, 0.062, 0.04]));
    merger.add(new THREE.BoxGeometry(0.12, 0.022, 0.05), m.trim, mat4([mx - side * 0.08, 0.95, 0.61], [0, 0, side * -0.35]));
    merger.add(new THREE.CircleGeometry(1, 20), m.mirror, mat4([mx, 0.99, 0.578], [0, Math.PI + side * 0.2, 0], [0.085, 0.048, 1]));

    // Door shut lines and the bonnet edge, traced on the surface.
    const trace = (points: THREE.Vector3[]) => {
      if (points.length < 2) return;
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), m.seam);
      parent.add(line);
    };
    for (const z of [0.73, -0.44]) {
      const pts: THREE.Vector3[] = [];
      for (let y = 0.27; y <= 0.9; y += 0.045) {
        const hit = body.project(new THREE.Vector3(side * 2, y, z + (z > 0 ? (0.9 - y) * -0.04 : 0)), new THREE.Vector3(-side, 0, 0));
        if (hit) pts.push(hit.point.addScaledVector(hit.normal, 0.003));
      }
      trace(pts);
    }
    const bonnet: THREE.Vector3[] = [];
    for (let z = 0.9; z <= 1.72; z += 0.06) {
      const hit = body.project(new THREE.Vector3(side * (0.69 - (z - 0.9) * 0.05), 2, z), new THREE.Vector3(0, -1, 0));
      if (hit) bonnet.push(hit.point.addScaledVector(hit.normal, 0.003));
    }
    trace(bonnet);
  }

  // High-level brake light, number plate, exhaust.
  const third = body.project(new THREE.Vector3(0, 2, -1.47), new THREE.Vector3(0, -1, 0));
  if (third) merger.add(new RoundedBoxGeometry(0.42, 0.016, 0.03, 2, 0.006), m.brake, mat4([0, third.point.y + 0.006, third.point.z]));
  const plate = body.project(new THREE.Vector3(0, 0.52, -3), new THREE.Vector3(0, 0, 1));
  if (plate) {
    merger.add(new THREE.BoxGeometry(0.56, 0.17, 0.012), m.trim, mat4([0, plate.point.y, plate.point.z - 0.004]));
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.125), m.plate);
    face.position.set(0, plate.point.y, plate.point.z - 0.012);
    face.rotation.y = Math.PI;
    parent.add(face);
  }
  const diffuser = projectedPatch(body, {
    origin: new THREE.Vector3(0, 0.335, -3),
    u: new THREE.Vector3(1, 0, 0),
    v: new THREE.Vector3(0, 1, 0),
    dir: new THREE.Vector3(0, 0, 1),
    halfU: 0.6,
    halfV: 0.07,
    exponent: 5,
    offset: 0.004,
    grid: [22, 5],
  });
  if (diffuser) merger.add(diffuser, m.grille);
  merger.add(new THREE.CylinderGeometry(0.058, 0.058, 0.24, 20, 1, true), m.chrome, mat4([0.43, 0.3, -2.17], [Math.PI / 2, 0, 0]));
  merger.add(new THREE.CircleGeometry(0.056, 20), m.well, mat4([0.43, 0.3, -2.2], [0, Math.PI, 0]));

  // Hoop spoiler: one continuous blade rising from the rear wings.
  const hoop = [
    new THREE.Vector3(-0.73, 0.92, -1.93),
    new THREE.Vector3(-0.79, 1.06, -1.98),
    new THREE.Vector3(-0.8, 1.2, -2.04),
    new THREE.Vector3(-0.7, 1.305, -2.08),
    new THREE.Vector3(-0.35, 1.335, -2.1),
    new THREE.Vector3(0, 1.342, -2.1),
    new THREE.Vector3(0.35, 1.335, -2.1),
    new THREE.Vector3(0.7, 1.305, -2.08),
    new THREE.Vector3(0.8, 1.2, -2.04),
    new THREE.Vector3(0.79, 1.06, -1.98),
    new THREE.Vector3(0.73, 0.92, -1.93),
  ];
  merger.add(
    sweepBlade(hoop, (t) => 0.15 + Math.pow(Math.abs(t - 0.5) * 2, 2) * 0.09, 0.024, 72),
    m.paint,
  );

  // Front splitter following the nose.
  const outline = body.noseOutline;
  const lip: number[] = [];
  const ring = [...outline.map((p) => new THREE.Vector3(p.x, p.y, p.z)), ...[...outline].reverse().map((p) => new THREE.Vector3(-p.x, p.y, p.z))];
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i];
    const b = ring[i + 1];
    const out = (p: THREE.Vector3) => new THREE.Vector3(p.x * 1.035, 0.165, p.z + 0.03 * Math.max(0, 1 - Math.abs(p.x) / 0.9));
    const inn = (p: THREE.Vector3) => new THREE.Vector3(p.x * 0.8, 0.165, p.z - 0.12);
    const ao = out(a);
    const bo = out(b);
    const ai = inn(a);
    const bi = inn(b);
    // Top face, bottom face and the outer edge.
    lip.push(ao.x, ao.y, ao.z, ai.x, ai.y, ai.z, bo.x, bo.y, bo.z, bo.x, bo.y, bo.z, ai.x, ai.y, ai.z, bi.x, bi.y, bi.z);
    lip.push(ao.x, 0.14, ao.z, bo.x, 0.14, bo.z, ai.x, 0.14, ai.z, bo.x, 0.14, bo.z, bi.x, 0.14, bi.z, ai.x, 0.14, ai.z);
    lip.push(ao.x, 0.14, ao.z, ao.x, 0.165, ao.z, bo.x, 0.14, bo.z, bo.x, 0.14, bo.z, ao.x, 0.165, ao.z, bo.x, 0.165, bo.z);
  }
  const lipGeo = new THREE.BufferGeometry();
  lipGeo.setAttribute("position", new THREE.Float32BufferAttribute(lip, 3));
  lipGeo.computeVertexNormals();
  const lipMesh = new THREE.Mesh(lipGeo, new THREE.MeshStandardMaterial({ color: "#0a0a0b", roughness: 0.6, side: THREE.DoubleSide }));
  lipMesh.castShadow = false;
  parent.add(lipMesh);

  // Centre intake with slats.
  const mouth = projectedPatch(body, {
    origin: new THREE.Vector3(0, 0.335, 3.2),
    u: new THREE.Vector3(1, 0, 0),
    v: new THREE.Vector3(0, 1, 0),
    dir: new THREE.Vector3(0, 0, -1),
    halfU: 0.4,
    halfV: 0.088,
    exponent: 4,
    offset: 0.004,
    grid: [20, 6],
  });
  if (mouth) merger.add(mouth, m.grille);
  for (let i = 0; i < 3; i++) {
    const y = 0.29 + i * 0.045;
    const hit = body.project(new THREE.Vector3(0, y, 3.2), new THREE.Vector3(0, 0, -1));
    if (hit) merger.add(new THREE.BoxGeometry(0.7, 0.01, 0.012), m.trim, mat4([0, y, hit.point.z + 0.008]));
  }
}

function addCockpit(m: Materials, merger: Merger, parent: THREE.Group) {
  // Dashboard: a profile in the ZY plane extruded across the cabin.
  const profile = new THREE.Shape();
  const pts: [number, number][] = [
    [0.97, 0.56],
    [0.97, 0.905],
    [0.74, 0.895],
    [0.6, 0.865],
    [0.545, 0.8],
    [0.555, 0.66],
    [0.61, 0.56],
  ];
  profile.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) profile.lineTo(pts[i][0], pts[i][1]);
  profile.closePath();
  const dashWidth = 1.5;
  const dash = new THREE.ExtrudeGeometry(profile, { depth: dashWidth, bevelEnabled: false });
  merger.add(dash, m.dash, new THREE.Matrix4().makeTranslation(dashWidth / 2, 0, 0).multiply(new THREE.Matrix4().makeRotationY(-Math.PI / 2)));

  // Instrument binnacle in front of the driver.
  const hood = new THREE.CylinderGeometry(0.176, 0.176, 0.22, 24, 1, true, 0, Math.PI);
  merger.add(hood, m.dashSoft, mat4([DRIVER_X, 0.79, 0.63], [Math.PI / 2, Math.PI / 2, 0]));
  merger.add(new THREE.CircleGeometry(0.174, 24, 0, Math.PI), m.dash, mat4([DRIVER_X, 0.79, 0.6], [0, Math.PI, 0]));
  const gaugeFace = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.1), m.gauges);
  gaugeFace.position.set(DRIVER_X, 0.882, 0.556);
  gaugeFace.rotation.set(0.2, Math.PI, 0);
  parent.add(gaugeFace);

  // Needles pivot around the dial centres on the gauge texture.
  const makeNeedle = (offsetX: number, length: number) => {
    const pivot = new THREE.Group();
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.0035, length, 0.002), m.needle);
    needle.position.y = length / 2 - 0.004;
    pivot.add(needle);
    const holder = new THREE.Group();
    holder.position.copy(gaugeFace.position);
    holder.rotation.copy(gaugeFace.rotation);
    pivot.position.set(offsetX, 0, 0.003);
    holder.add(pivot);
    parent.add(holder);
    return pivot;
  };
  const tachNeedle = makeNeedle(0, 0.041);
  // The gauge plane faces the driver, so its local +X points to car -X.
  const speedNeedle = makeNeedle(0.096, 0.033);

  // Steering wheel and column.
  const steering = new THREE.Group();
  steering.position.set(DRIVER_X, 0.795, 0.4);
  steering.rotation.x = -0.36;
  const wheel = new THREE.Group();
  steering.add(wheel);
  const wheelMerger = new Merger();
  wheelMerger.add(new THREE.TorusGeometry(0.172, 0.0165, 10, 40), m.dashSoft);
  wheelMerger.add(new THREE.CylinderGeometry(0.05, 0.055, 0.04, 18), m.dash, mat4([0, 0, 0.01], [Math.PI / 2, 0, 0]));
  for (const a of [Math.PI / 2 + 1.25, Math.PI / 2 - 1.25, -Math.PI / 2]) {
    wheelMerger.add(new THREE.BoxGeometry(0.125, 0.03, 0.014), m.dash, new THREE.Matrix4().makeRotationZ(a).multiply(mat4([0.105, 0, 0.004])));
  }
  wheelMerger.add(new THREE.CircleGeometry(0.022, 16), m.chrome, mat4([0, 0, -0.012], [0, Math.PI, 0]));
  wheelMerger.build(wheel);
  parent.add(steering);
  merger.add(new THREE.CylinderGeometry(0.028, 0.034, 0.3, 12), m.dash, mat4([DRIVER_X, 0.74, 0.545], [Math.PI / 2 - 0.36, 0, 0]));

  // Centre stack with a small display, transmission tunnel and gear lever.
  merger.add(new RoundedBoxGeometry(0.3, 0.34, 0.2, 2, 0.02), m.dashSoft, mat4([0, 0.7, 0.5], [-0.25, 0, 0]));
  const display = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.12), m.screen);
  display.position.set(0, 0.765, 0.385);
  display.rotation.set(0.25, Math.PI, 0);
  parent.add(display);
  merger.add(new RoundedBoxGeometry(0.26, 0.24, 1.25, 2, 0.03), m.dash, mat4([0, 0.31, -0.12]));
  merger.add(new THREE.CylinderGeometry(0.009, 0.012, 0.16, 8), m.chrome, mat4([0, 0.5, 0.1], [0.15, 0, 0]));
  merger.add(new THREE.SphereGeometry(0.027, 14, 10), m.dashSoft, mat4([0, 0.585, 0.112]));
  merger.add(new RoundedBoxGeometry(0.05, 0.1, 0.2, 2, 0.015), m.dashSoft, mat4([0, 0.46, -0.28], [0.25, 0, 0]));

  // Bucket seats.
  for (const x of [DRIVER_X, -DRIVER_X]) {
    merger.add(new RoundedBoxGeometry(0.5, 0.14, 0.5, 3, 0.045), m.seat, mat4([x, 0.3, -0.22], [0.06, 0, 0]));
    merger.add(new RoundedBoxGeometry(0.48, 0.64, 0.13, 3, 0.05), m.seat, mat4([x, 0.66, -0.56], [-0.2, 0, 0]));
    merger.add(new RoundedBoxGeometry(0.24, 0.17, 0.1, 3, 0.04), m.seat, mat4([x, 1.03, -0.66], [-0.2, 0, 0]));
    for (const s of [-1, 1]) {
      merger.add(new RoundedBoxGeometry(0.07, 0.5, 0.16, 2, 0.03), m.seat, mat4([x + s * 0.235, 0.62, -0.52], [-0.2, 0, 0]));
      merger.add(new RoundedBoxGeometry(0.07, 0.1, 0.44, 2, 0.03), m.seat, mat4([x + s * 0.235, 0.345, -0.22], [0.06, 0, 0]));
    }
    merger.add(new RoundedBoxGeometry(0.2, 0.5, 0.012, 2, 0.005), m.seatAccent, mat4([x, 0.68, -0.492], [-0.2, 0, 0]));
  }
  // Rear bench and parcel shelf.
  merger.add(new RoundedBoxGeometry(1.2, 0.3, 0.4, 2, 0.05), m.seat, mat4([0, 0.36, -1.0]));
  merger.add(new RoundedBoxGeometry(1.2, 0.36, 0.12, 2, 0.04), m.seat, mat4([0, 0.6, -1.2], [-0.3, 0, 0]));
  merger.add(new THREE.BoxGeometry(1.4, 0.02, 0.5), m.dash, mat4([0, 0.86, -1.42], [0.12, 0, 0]));
  // Firewall, so nothing shows through beneath the dashboard.
  merger.add(new THREE.BoxGeometry(1.56, 0.5, 0.02), m.dash, mat4([0, 0.42, 0.97]));
  // Interior mirror.
  merger.add(new RoundedBoxGeometry(0.2, 0.055, 0.02, 2, 0.008), m.dash, mat4([0, 1.165, 0.3], [0.1, 0, 0]));
  merger.add(new THREE.PlaneGeometry(0.185, 0.042), m.mirror, mat4([0, 1.165, 0.288], [0.1 + Math.PI, 0, Math.PI]));
  merger.add(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 6), m.dash, mat4([0, 1.2, 0.31]));

  return { steeringWheel: wheel, tachNeedle, speedNeedle };
}

export function buildCar(options: CarOptions): CarModel {
  const m = createMaterials(options);
  const shell = buildCarBody();
  const root = new THREE.Group();
  root.name = "jdm-coupe";
  const body = new THREE.Group();
  root.add(body);

  const shellMesh = new THREE.Mesh(
    shell.geometry,
    BODY_MATERIAL_ORDER.map((key) => m.body[key]),
  );
  shellMesh.castShadow = true;
  shellMesh.receiveShadow = false;
  body.add(shellMesh);

  const lining = new THREE.Mesh(shell.interior, m.interior);
  body.add(lining);

  const merger = new Merger();
  const headlampPositions: THREE.Vector3[] = [];
  addExteriorDetails(shell, m, merger, body, headlampPositions);
  merger.build(body, { castShadow: true });

  const cockpitMerger = new Merger();
  const cockpit = addCockpit(m, cockpitMerger, body);
  cockpitMerger.build(body);

  const wheels: CarWheel[] = [];
  for (const front of [true, false]) {
    for (const side of [1, -1] as const) {
      const { wheel, group } = buildWheel(m, side, front);
      group.position.set(side * CAR.trackHalf, CAR.wheelRadius, front ? CAR.frontAxleZ : CAR.rearAxleZ);
      root.add(group);
      wheels.push(wheel);
    }
  }

  const dispose = () => {
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
    });
    const seen = new Set<THREE.Material>();
    root.traverse((obj) => {
      const material = (obj as THREE.Mesh).material;
      const list = Array.isArray(material) ? material : material ? [material] : [];
      for (const mm of list) seen.add(mm);
    });
    seen.forEach((mm) => mm.dispose());
    m.textures.forEach((t) => t.dispose());
  };

  return {
    root,
    body,
    wheels,
    steeringWheel: cockpit.steeringWheel,
    paint: m.paint,
    tachNeedle: cockpit.tachNeedle,
    speedNeedle: cockpit.speedNeedle,
    lamps: { head: m.head, tail: m.tail, brake: m.brake, reverse: m.reverse, dash: m.gauges },
    eye: new THREE.Vector3(DRIVER_X, 1.095, -0.16),
    headlampPositions,
    dispose,
  };
}
