/**
 * Landmark buildings. Each portfolio destination gets a distinct silhouette so
 * it can be recognised from a distance. Footprints match lib/world/footprints.ts,
 * which is what the physics collides with.
 *
 * Local space for every landmark: origin on the pavement at the destination
 * position, +Z towards its access road (the "front").
 */
import * as THREE from "three";
import type { BuildingBox, Destination } from "@/types/world";
import { contactPlanters, localToWorld } from "@/lib/world/footprints";
import { CURB } from "@/lib/world/layout";
import { Merger, mat4 } from "@/lib/three/merge";
import { makeGlassGridTexture, makeLabelTexture } from "../textures";

export interface LandmarkContext {
  fontFamily: string;
  billboards: THREE.Texture[];
  /** Words for the central tower: name and disciplines. */
  ownerName: string;
  disciplines: string[];
}

export interface LandmarkSpinner {
  object: THREE.Object3D;
  /** Radians per second around Y. */
  speed: number;
  bob?: number;
  baseY?: number;
}

export interface LandmarkBuild {
  group: THREE.Group;
  spinners: LandmarkSpinner[];
  /** Box volumes drawn with the shared window shader, in world space. */
  facades: BuildingBox[];
}

type RGB = readonly [number, number, number];
const GLASS_BLUE: RGB = [0.3, 0.44, 0.6];
const GLASS_DEEP: RGB = [0.16, 0.22, 0.32];
const GLASS_PALE: RGB = [0.5, 0.6, 0.7];
const STONE: RGB = [0.7, 0.64, 0.56];
const WHITE: RGB = [0.82, 0.84, 0.86];

function rgb(hex: string): RGB {
  const c = new THREE.Color(hex);
  return [c.r, c.g, c.b];
}

function palette() {
  const std = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
  const grid = (seed: number, base: string) => {
    const map = makeGlassGridTexture(seed, base, "#ffd9a0");
    return std({ color: "#ffffff", map, emissive: "#ffffff", emissiveMap: map, emissiveIntensity: 0.55, metalness: 0.75, roughness: 0.16, envMapIntensity: 1.2 });
  };
  return {
    gridDark: grid(11, "#12233a"),
    gridBlue: grid(29, "#1d4168"),
    glassDark: std({ color: "#3a5676", metalness: 0.85, roughness: 0.1, envMapIntensity: 1.3 }),
    glassBlue: std({ color: "#5d86ad", metalness: 0.9, roughness: 0.1, envMapIntensity: 1.3 }),
    glassClear: std({ color: "#9cc4e4", metalness: 0.6, roughness: 0.08, transparent: true, opacity: 0.42, envMapIntensity: 1.5 }),
    white: std({ color: "#e8ecef", roughness: 0.55 }),
    concrete: std({ color: "#b9b3a8", roughness: 0.88 }),
    stone: std({ color: "#c9bfae", roughness: 0.9 }),
    steel: std({ color: "#8d949c", metalness: 0.85, roughness: 0.32 }),
    dark: std({ color: "#1a1d23", roughness: 0.6, metalness: 0.4 }),
    grass: std({ color: "#3f7a45", roughness: 1 }),
    water: std({ color: "#2b6f8f", roughness: 0.05, metalness: 0.7 }),
    warm: new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffd39a").multiplyScalar(1.5), toneMapped: false }),
    red: std({ color: "#b3261e", roughness: 0.6 }),
  };
}

type Palette = ReturnType<typeof palette>;

class Builder {
  readonly group = new THREE.Group();
  readonly merger = new Merger();
  readonly spinners: LandmarkSpinner[] = [];
  readonly facades: BuildingBox[] = [];
  private readonly accents = new Map<string, THREE.MeshBasicMaterial>();

  constructor(
    readonly dest: Destination,
    readonly ctx: LandmarkContext,
    readonly p: Palette,
  ) {}

  /** Bright unlit material for neon strips; picked up by the bloom pass. */
  accent(color: string = this.dest.color, intensity = 1.7): THREE.MeshBasicMaterial {
    const key = `${color}:${intensity}`;
    let m = this.accents.get(key);
    if (!m) {
      m = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), toneMapped: false });
      this.accents.set(key, m);
    }
    return m;
  }

  box(material: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number, rotY = 0): void {
    this.merger.box(material, w, h, d, x, y, z, rotY);
  }

  cyl(material: THREE.Material, rTop: number, rBottom: number, h: number, x: number, y: number, z: number, sides = 24): void {
    this.merger.add(new THREE.CylinderGeometry(rTop, rBottom, h, sides), material, mat4([x, y + h / 2, z]));
  }

  /** A round tower clad in the tiling glass-grid texture. */
  gridCyl(material: THREE.Material, rTop: number, rBottom: number, h: number, x: number, y: number, z: number, sides = 24): void {
    const g = new THREE.CylinderGeometry(rTop, rBottom, h, sides, 1, true);
    const uv = g.getAttribute("uv");
    const around = Math.max(1, Math.round((Math.PI * (rTop + rBottom)) / 34));
    const up = Math.max(1, Math.round(h / 58));
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * around, uv.getY(i) * up);
    this.merger.add(g, material, mat4([x, y + h / 2, z]));
  }

  /**
   * A box volume with procedural windows. It is drawn by the instanced facade
   * shader together with the rest of the skyline, so it is added in world space.
   */
  facade(style: number, w: number, h: number, d: number, x: number, y: number, z: number, tint: RGB, options: { accent?: boolean; lit?: number } = {}): void {
    const [wx, wz] = localToWorld(this.dest.position, this.dest.rotation, x, z);
    const turned = Math.abs(Math.sin(this.dest.rotation)) > 0.5;
    this.facades.push({
      x: wx,
      z: wz,
      y: CURB + y,
      w: turned ? d : w,
      d: turned ? w : d,
      h,
      style,
      seed: 1 + ((this.facades.length * 37 + Math.round(Math.abs(wx) + Math.abs(wz))) % 997),
      tint,
      accent: options.accent ? rgb(this.dest.color) : [0, 0, 0],
      lit: options.lit ?? 0.5,
    });
  }

  sign(title: string, subtitle: string, w: number, h: number, x: number, y: number, z: number, rotY = 0, color = this.dest.color): void {
    const texture = makeLabelTexture(this.ctx.fontFamily, title, subtitle, color, {
      width: 1024,
      height: Math.max(128, Math.round((1024 * h) / w / 32) * 32),
      background: "rgba(6,9,16,0.86)",
    });
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false }),
    );
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    this.group.add(mesh);
  }

  screen(variant: number, w: number, h: number, x: number, y: number, z: number, rotY = 0): void {
    const map = this.ctx.billboards[variant % this.ctx.billboards.length];
    const material = new THREE.MeshBasicMaterial({ map, toneMapped: false });
    material.color.multiplyScalar(1.25);
    material.userData.sharedMap = true;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    this.group.add(mesh);
  }

  spinner(object: THREE.Object3D, speed: number, bob = 0): void {
    this.group.add(object);
    this.spinners.push({ object, speed, bob, baseY: object.position.y });
  }

  finish(): LandmarkBuild {
    this.merger.build(this.group, { castShadow: true, receiveShadow: true });
    this.group.position.set(this.dest.position[0], CURB, this.dest.position[1]);
    this.group.rotation.y = this.dest.rotation;
    this.group.name = `landmark-${this.dest.id}`;
    return { group: this.group, spinners: this.spinners, facades: this.facades };
  }
}

function centralTower(b: Builder): void {
  const { p } = b;
  const cyan = b.accent("#7cc4ff", 1.8);
  const violet = b.accent("#b79bff", 1.8);
  // Stepped plaza and podium.
  b.cyl(p.concrete, 30, 31, 0.6, 0, 0, 0, 48);
  b.gridCyl(p.gridBlue, 21, 23, 11, 0, 0.6, 0, 32);
  b.cyl(p.white, 24.5, 24.5, 0.7, 0, 11.6, 0, 48);
  b.cyl(cyan, 24.7, 24.7, 0.18, 0, 11.3, 0, 48);
  // Shaft: three tapering tiers.
  b.gridCyl(p.gridBlue, 13.5, 16.5, 78, 0, 12.3, 0, 8);
  b.gridCyl(p.gridDark, 11, 13, 64, 0, 90.3, 0, 8);
  b.gridCyl(p.gridBlue, 7.5, 10.5, 48, 0, 154.3, 0, 8);
  b.cyl(p.white, 14.2, 14.2, 1.2, 0, 89.4, 0, 8);
  b.cyl(p.white, 11.6, 11.6, 1.2, 0, 153.4, 0, 8);
  // Crown and spire.
  b.cyl(p.steel, 3, 7.5, 16, 0, 202.3, 0, 8);
  b.cyl(p.steel, 0.25, 1.1, 46, 0, 218.3, 0, 8);
  b.cyl(b.accent("#ff7ad9", 2.2), 0.7, 0.7, 1.4, 0, 264, 0, 8);
  // Vertical light fins up the four faces.
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const fin = new THREE.BoxGeometry(0.5, 188, 0.9);
    const tilt = Math.atan2(16.2 - 7.8, 188);
    const m = new THREE.Matrix4()
      .makeRotationY(-a)
      .multiply(mat4([12.4, 12.3 + 94, 0], [0, 0, tilt]));
    b.merger.add(fin, i % 2 === 0 ? cyan : violet, m);
  }
  // Halo rings.
  for (const [y, r, mat] of [
    [70, 19, cyan],
    [140, 15.5, violet],
  ] as const) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.32, 8, 72), mat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    b.spinner(ring, 0);
  }
  // Name signs on all four sides, readable from every approach.
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const x = Math.sin(a) * 23.6;
    const z = Math.cos(a) * 23.6;
    b.sign(b.ctx.ownerName, b.ctx.disciplines.join("  ·  "), 30, 7.5, x, 6.6, z, a, "#7cc4ff");
  }
}

function gatewayPavilion(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  b.box(p.concrete, 44, 0.5, 40, 0, 0, 2);
  b.facade(5, 34, 11, 26, 0, 0.5, -6, GLASS_PALE, { lit: 0.8 });
  b.box(p.white, 40, 0.9, 34, 0, 11.5, -4);
  b.box(acc, 40.2, 0.2, 34.2, 0, 11.2, -4);
  for (const x of [-17, 17]) b.box(p.white, 1, 11, 1, x, 0.5, 9);
  // Tall pylon carrying the name.
  b.box(p.dark, 5, 26, 1.4, -19, 0.5, 14);
  b.box(acc, 0.3, 26, 1.5, -21.6, 0.5, 14);
  b.sign(dest.name, dest.category, 16, 4, 0, 8.2, 7.2);
  b.sign(dest.category, "", 12, 2.6, -19, 22, 14.75, 0);
  const holo = new THREE.Mesh(
    dest.variant === 1 ? new THREE.OctahedronGeometry(2.4) : new THREE.IcosahedronGeometry(2.3, 0),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(dest.color).multiplyScalar(1.4), wireframe: true, toneMapped: false }),
  );
  holo.position.set(0, 17, -4);
  b.spinner(holo, 0.5, 0.5);
}

function corporateTwin(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  b.box(p.concrete, 112, 0.5, 78, 0, 0, -2);
  b.facade(5, 100, 9, 36, 0, 0.5, -8, GLASS_DEEP, { lit: 0.9 });
  b.box(p.white, 104, 0.8, 40, 0, 9.5, -8);
  for (const [x, h] of [
    [-30, 148],
    [30, 126],
  ] as const) {
    b.facade(0, 28, h, 28, x, 10.3, -8, x < 0 ? GLASS_BLUE : GLASS_DEEP, { lit: 0.6 });
    b.box(p.white, 30, 1.5, 30, x, 10.3 + h, -8);
    b.box(p.glassDark, 18, 12, 18, x, 11.8 + h, -8);
    for (const fx of [-14.3, 14.3]) b.box(p.white, 0.6, h, 1.2, x + fx, 10.3, 6.2);
    b.box(acc, 28.4, 0.5, 28.4, x, 10.3 + h - 4, -8);
    b.cyl(p.steel, 0.2, 0.5, 22, x, 23.8 + h, -8, 6);
  }
  // Skybridge between the towers.
  b.box(p.glassBlue, 32, 6, 9, 0, 72, -8);
  b.box(acc, 32, 0.3, 9.2, 0, 71.6, -8);
  b.sign(dest.name, dest.category, 34, 7, 0, 5.4, 10.2);
}

function officeTower(b: Builder): void {
  const { p, dest } = b;
  const v = dest.variant ?? 0;
  const h = 58 + v * 16;
  const acc = b.accent();
  b.box(p.concrete, 40, 0.4, 40, 0, 0, 0);
  b.facade(5, 28, 8, 28, 0, 0.4, -4, GLASS_DEEP, { lit: 0.9 });
  b.facade([0, 3, 1][v % 3], 24, h, 24, 0, 8.4, -4, v % 2 === 0 ? GLASS_BLUE : GLASS_DEEP, { lit: 0.6 });
  for (let y = 16; y < h; y += 12) b.box(p.white, 24.6, 0.5, 24.6, 0, 8.4 + y, -4);
  b.box(p.white, 26, 1.2, 26, 0, 8.4 + h, -4);
  b.box(acc, 0.4, h, 0.4, 12.2, 8.4, 8.2);
  b.box(acc, 0.4, h, 0.4, -12.2, 8.4, 8.2);
  b.sign(dest.name, dest.category, 24, 5, 0, 5, 10.2);
  b.sign(dest.name, "", 20, 3.6, 0, 8.4 + h - 5, 8.2);
}

function university(b: Builder): void {
  const { p, dest } = b;
  b.box(p.grass, 60, 0.12, 34, 0, 0, 14);
  b.box(p.concrete, 8, 0.16, 40, 0, 0, 16);
  // Main hall with a colonnade and pediment.
  b.facade(2, 80, 18, 28, 0, 0, -24, STONE, { lit: 0.55 });
  b.box(p.white, 84, 1.4, 32, 0, 18, -24);
  for (let i = 0; i < 10; i++) b.cyl(p.white, 1, 1.15, 15, -31.5 + i * 7, 1.5, -8.2, 12);
  b.box(p.stone, 70, 1.5, 6, 0, 0, -8.6);
  b.box(p.white, 70, 1.6, 6, 0, 16.5, -8.6);
  const gable = new THREE.Shape([new THREE.Vector2(-36, 0), new THREE.Vector2(36, 0), new THREE.Vector2(0, 7)]);
  b.merger.add(new THREE.ExtrudeGeometry(gable, { depth: 6, bevelEnabled: false }), p.stone, mat4([0, 18.1, -11.6]));
  // Dome.
  b.cyl(p.white, 11.5, 11.5, 5, 0, 19.4, -24, 24);
  b.merger.add(new THREE.SphereGeometry(11, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), p.glassBlue, mat4([0, 24.4, -24]));
  b.cyl(b.accent("#ffe2a8", 1.6), 1.2, 1.2, 3, 0, 35.2, -24, 10);
  // Wings and clock tower.
  for (const x of [-48, 48]) {
    b.facade(2, 20, 14, 44, x, 0, 4, STONE, { lit: 0.5 });
    b.box(p.white, 22, 1, 46, x, 14, 4);
  }
  b.box(p.stone, 9, 44, 9, -48, 0, -24);
  b.merger.add(new THREE.ConeGeometry(7.2, 12, 4), p.dark, mat4([-48, 50, -24], [0, Math.PI / 4, 0]));
  for (const rot of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    const face = new THREE.CircleGeometry(3, 24);
    b.merger.add(face, b.accent("#fff1cf", 1.3), mat4([-48 + Math.sin(rot) * 4.56, 36, -24 + Math.cos(rot) * 4.56], [0, rot, 0]));
  }
  b.sign(dest.name, dest.category, 30, 6, 0, 12.4, -5.4);
}

function library(b: Builder): void {
  const { p, dest } = b;
  b.box(p.concrete, 60, 0.4, 46, 0, 0, 0);
  b.facade(1, 44, 15, 28, 0, 0.4, -6, STONE, { lit: 0.6 });
  b.box(p.white, 47, 1.2, 31, 0, 15.4, -6);
  b.box(p.glassBlue, 30, 5, 16, 0, 16.6, -6);
  // Tall lit window bays, like book spines.
  for (let i = 0; i < 9; i++) b.box(i % 3 === 1 ? b.accent("#ffd39a", 1.25) : p.glassDark, 2.6, 10.5, 0.3, -17.6 + i * 4.4, 3, 8.1);
  b.sign(dest.name, dest.category, 26, 5.2, 0, 19, 2.2);
}

function researchLab(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  b.box(p.concrete, 122, 0.4, 84, 0, 0, 0);
  // Geodesic dome with a glowing core.
  const dome = new THREE.Mesh(
    new THREE.IcosahedronGeometry(22, 2),
    new THREE.MeshStandardMaterial({ color: "#8fd3ff", metalness: 0.7, roughness: 0.1, transparent: true, opacity: 0.5, flatShading: true, envMapIntensity: 1.6 }),
  );
  dome.position.set(-30, 0, -4);
  b.group.add(dome);
  const frame = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(22.1, 2)), new THREE.LineBasicMaterial({ color: "#e9f6ff", transparent: true, opacity: 0.5 }));
  frame.position.copy(dome.position);
  b.group.add(frame);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(5.5, 1), new THREE.MeshBasicMaterial({ color: new THREE.Color(dest.color).multiplyScalar(1.5), wireframe: true, toneMapped: false }));
  core.position.set(-30, 9, -4);
  b.spinner(core, 0.35, 0.8);
  b.cyl(p.dark, 24, 24.5, 1.2, -30, 0.4, -4, 40);
  // Research tower with a dish and a ring gantry.
  b.facade(3, 26, 66, 26, 32, 0.4, -10, GLASS_BLUE, { accent: true, lit: 0.55 });
  b.box(p.white, 28, 1.2, 28, 32, 66.4, -10);
  b.box(p.glassBlue, 16, 14, 16, 32, 67.6, -10);
  b.cyl(p.steel, 0.2, 0.6, 26, 32, 81.6, -10, 6);
  b.merger.add(new THREE.SphereGeometry(4.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), p.white, mat4([40, 70.5, -4], [Math.PI * 0.82, 0.5, 0]));
  // Covered walkway joining the two.
  b.box(p.glassClear, 30, 4, 5, 2, 5, -6);
  b.box(p.white, 30, 0.4, 5.4, 2, 9, -6);
  // Low data hall.
  b.facade(4, 30, 7, 14, 32, 0.4, 24, GLASS_DEEP, { accent: true, lit: 0.3 });
  for (let i = 0; i < 6; i++) b.box(acc, 0.3, 5, 0.2, 20 + i * 4.8, 1.4, 31.1);
  b.sign(dest.name, dest.category, 28, 5.6, -30, 5, 20.2);
}

function projectPod(b: Builder): void {
  const { p, dest } = b;
  const v = dest.variant ?? 0;
  const h = 9 + (v % 3) * 3;
  const acc = b.accent();
  b.box(p.concrete, 34, 0.3, 34, 0, 0, 0);
  b.facade(v % 2 === 0 ? 0 : 4, 22, h, 22, 0, 0.3, -4, v % 2 === 0 ? GLASS_DEEP : WHITE, { lit: 0.7 });
  b.box(p.dark, 24, 0.8, 24, 0, 0.3 + h, -4);
  b.box(acc, 24.2, 0.25, 24.2, 0, h - 0.2, -4);
  b.box(p.glassBlue, 12, h * 0.55, 0.4, 0, 0.3, 7.1);
  const shapes = [new THREE.BoxGeometry(4, 4, 4), new THREE.OctahedronGeometry(3), new THREE.TorusGeometry(2.6, 0.5, 8, 24), new THREE.TetrahedronGeometry(3.4), new THREE.DodecahedronGeometry(2.8)];
  const holo = new THREE.Mesh(shapes[v % shapes.length], new THREE.MeshBasicMaterial({ color: new THREE.Color(dest.color).multiplyScalar(1.5), wireframe: true, toneMapped: false }));
  holo.position.set(0, h + 7, -4);
  b.spinner(holo, 0.6, 0.6);
  b.cyl(acc, 0.12, 0.12, 4.5, 0, h + 1, -4, 6);
  b.sign(dest.name, dest.category, 20, 4.2, 0, h * 0.5 + 3.4, 7.4);
}

function creativeStudio(b: Builder): void {
  const { p, dest } = b;
  const colors = ["#ff7ad9", "#b79bff", "#ffb86b", "#5ee6ff"];
  b.box(p.concrete, 98, 0.4, 80, 0, 0, 0);
  // Twisting stack of studio floors.
  let y = 0.4;
  for (let i = 0; i < 5; i++) {
    const size = 44 - i * 4;
    const h = 13;
    const rot = i * 0.21;
    b.box(i % 2 === 0 ? p.white : p.glassDark, size, h, size, 0, y, -8, rot);
    b.box(b.accent(colors[i % colors.length], 1.6), size + 0.5, 0.45, size + 0.5, 0, y + h - 0.6, -8, rot);
    y += h;
  }
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(5, 1.1, 96, 12), new THREE.MeshStandardMaterial({ color: dest.color, metalness: 0.9, roughness: 0.15, emissive: dest.color, emissiveIntensity: 0.35 }));
  knot.position.set(0, y + 9, -8);
  b.spinner(knot, 0.3, 0.6);
  // Street-facing LED wall and freestanding colour frames.
  b.screen(2, 20, 30, -34, 17, 14.2);
  b.box(p.dark, 21, 31.5, 1, -34, 1.2, 13.4);
  for (let i = 0; i < 3; i++) {
    const m = b.accent(colors[i], 1.5);
    const x = 22 + i * 9;
    b.box(m, 0.5, 9 + i * 2, 0.5, x - 3, 0.4, 24);
    b.box(m, 0.5, 9 + i * 2, 0.5, x + 3, 0.4, 24);
    b.box(m, 6.5, 0.5, 0.5, x, 9.4 + i * 2, 24);
  }
  b.sign(dest.name, dest.category, 30, 6, 0, 6, 14.6);
}

function galleryPavilion(b: Builder): void {
  const { p, dest } = b;
  const v = dest.variant ?? 0;
  b.box(p.concrete, 34, 0.3, 34, 0, 0, 0);
  b.box(p.white, 24, 10, 20, 0, 0.3, -4);
  b.box(p.dark, 26, 0.6, 22, 0, 10.3, -4);
  b.box(b.accent(), 26.2, 0.2, 22.2, 0, 10.1, -4);
  b.screen(v + 3, 9, 7.2, -5.5, 5.4, 6.12);
  b.box(p.glassBlue, 7, 7.5, 0.3, 6.5, 0.3, 6.05);
  b.sign(dest.name, dest.category, 20, 4, 0, 13.4, 6.2);
}

function mediaTower(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  b.cyl(p.concrete, 40, 40, 0.4, 0, 0, -2, 48);
  b.gridCyl(p.gridDark, 19, 19, 12, 0, 0.4, -6, 36);
  b.cyl(p.white, 21, 21, 0.9, 0, 12.4, -6, 36);
  b.gridCyl(p.gridBlue, 12.5, 13.5, 92, 0, 13.3, -6, 28);
  // Wrap-around LED bands.
  for (const y of [34, 58, 82]) {
    b.cyl(acc, 14.2, 14.2, 2.2, 0, y, -6, 36);
    b.cyl(p.dark, 14, 14, 3.4, 0, y - 0.6, -6, 36);
  }
  b.cyl(p.white, 15.5, 12.5, 6, 0, 105.3, -6, 28);
  b.cyl(p.steel, 0.3, 1.2, 44, 0, 111.3, -6, 8);
  for (const [a, y] of [
    [0.4, 122],
    [2.5, 128],
    [4.4, 134],
  ]) {
    b.merger.add(new THREE.SphereGeometry(2.6, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), p.white, mat4([Math.cos(a) * 2.6, y, -6 + Math.sin(a) * 2.6], [Math.PI / 2, 0, a - Math.PI / 2]));
  }
  b.cyl(b.accent("#ff5a5a", 2), 0.6, 0.6, 1.2, 0, 155.3, -6, 8);
  b.screen(1, 22, 14, 0, 22, 14.4);
  b.box(p.dark, 23.5, 15.5, 0.8, 0, 14.2, 13.8);
  for (const x of [-9, 9]) b.box(p.steel, 0.8, 14, 0.8, x, 0.4, 13.6);
  b.sign(dest.name, dest.category, 24, 4.8, 0, 7.6, 14.6);
}

function kiosk(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  b.cyl(p.dark, 2.6, 2.8, 0.3, 0, 0, 0, 20);
  b.cyl(p.steel, 0.35, 0.5, 2.2, 0, 0.3, 0, 10);
  b.box(p.dark, 4.6, 3, 0.3, 0, 2.2, 0);
  b.cyl(acc, 2.7, 2.7, 0.08, 0, 0.32, 0, 24);
  b.sign(dest.name, dest.category, 4.3, 2.7, 0, 3.7, 0.17);
  b.sign(dest.name, dest.category, 4.3, 2.7, 0, 3.7, -0.17, Math.PI);
  b.box(p.white, 5.4, 0.2, 2.4, 0, 5.6, 0);
}

function contactPavilion(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  b.cyl(p.concrete, 48, 48, 0.3, 0, 0, 2, 56);
  // Fountain basin and the ring sculpture.
  b.cyl(p.white, 10, 10.6, 0.9, 0, 0.3, 6, 40);
  b.cyl(p.water, 9.3, 9.3, 0.1, 0, 1.15, 6, 40);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(8.6, 1.05, 16, 64), p.steel);
  ring.position.set(0, 10.4, 6);
  ring.rotation.y = Math.PI / 5;
  ring.castShadow = true;
  b.group.add(ring);
  const inner = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.16, 8, 64), acc);
  inner.position.copy(ring.position);
  inner.rotation.copy(ring.rotation);
  b.group.add(inner);
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), new THREE.MeshBasicMaterial({ color: new THREE.Color(dest.color).multiplyScalar(1.6), wireframe: true, toneMapped: false }));
  orb.position.set(0, 10.4, 6);
  b.spinner(orb, 0.7, 0.4);
  // Pavilion at the back.
  b.facade(5, 52, 9, 18, 0, 0.3, -32, GLASS_PALE, { lit: 0.85 });
  b.box(p.white, 60, 0.8, 26, 0, 9.3, -30);
  b.box(acc, 60.2, 0.2, 26.2, 0, 9.05, -30);
  for (const x of [-27, -9, 9, 27]) b.box(p.white, 0.8, 9, 0.8, x, 0.3, -19);
  for (let i = 0; i < 5; i++) {
    b.cyl(p.steel, 0.12, 0.12, 13, -28 + i * 14, 0.3, 34, 6);
    b.box(i % 2 === 0 ? acc : p.white, 3.2, 1.9, 0.08, -26.3 + i * 14, 11, 34);
  }
  // Planters around the plaza.
  for (const { x, z } of contactPlanters()) {
    b.cyl(p.white, 2.2, 1.9, 0.9, x, 0.3, z, 12);
    b.merger.add(new THREE.IcosahedronGeometry(2.3, 1), p.grass, mat4([x, 3.4, z], [0, 0, 0], [1, 0.85, 1]));
    b.cyl(p.dark, 0.16, 0.2, 2, x, 1.2, z, 6);
  }
  b.sign(dest.name, dest.category, 30, 6, 0, 13.6, -17.8);
}

function stadium(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent();
  const profile = [
    [34, 0],
    [36, 2],
    [50, 20],
    [54, 22],
    [54.5, 16],
    [53, 0],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  b.merger.add(new THREE.LatheGeometry(profile, 56), p.white, mat4([0, 0, 0], [0, 0, 0], [1, 1, 0.92]));
  b.merger.add(new THREE.CylinderGeometry(34, 34, 0.3, 48), p.grass, mat4([0, 0.3, 0], [0, 0, 0], [1, 1, 0.92]));
  const roof = new THREE.TorusGeometry(45, 5.5, 10, 64);
  b.merger.add(roof, p.steel, mat4([0, 24.5, 0], [Math.PI / 2, 0, 0], [1, 0.92, 0.32]));
  const rim = new THREE.TorusGeometry(51.5, 0.4, 6, 72);
  b.merger.add(rim, acc, mat4([0, 23, 0], [Math.PI / 2, 0, 0], [1, 0.92, 1]));
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    b.cyl(p.steel, 0.5, 0.9, 40, Math.cos(a) * 56, 0, Math.sin(a) * 52, 8);
    b.box(b.accent("#fff3d6", 2), 6, 3, 1, Math.cos(a) * 56, 40, Math.sin(a) * 52, -a + Math.PI / 2);
  }
  b.screen(0, 16, 10, 0, 30, 49.9);
  b.sign(dest.name, dest.category, 28, 5.6, 0, 8, 50.6);
}

function terminal(b: Builder): void {
  const { p, dest } = b;
  b.cyl(p.dark, 2.4, 2.6, 0.4, 0, 0, 0, 16);
  b.box(p.dark, 2.2, 2.4, 1.2, 0, 0.4, 0);
  b.box(p.dark, 3.4, 2.4, 0.3, 0, 2.9, 0.1);
  b.sign("> build.log", "press to read", 3.1, 2.1, 0, 4.1, 0.27, 0, dest.color);
  b.cyl(p.steel, 0.05, 0.05, 5, 1.4, 2.9, -0.3, 6);
  b.cyl(b.accent(dest.color, 2), 0.18, 0.18, 0.25, 1.4, 7.9, -0.3, 8);
}

function lookout(b: Builder): void {
  const { p, dest } = b;
  b.cyl(p.white, 5, 5, 0.25, 0, 0, 0, 6);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    b.cyl(p.white, 0.14, 0.14, 3.6, Math.cos(a) * 4.3, 0.25, Math.sin(a) * 4.3, 8);
  }
  b.merger.add(new THREE.ConeGeometry(5.6, 2.2, 6), p.red, mat4([0, 4.95, 0]));
  b.cyl(b.accent(dest.color, 1.8), 0.2, 0.2, 0.5, 0, 6.1, 0, 8);
  b.cyl(p.steel, 0.1, 0.14, 1.3, 0, 0.25, 0, 8);
  b.box(p.steel, 0.5, 0.3, 0.9, 0, 1.55, 0);
}

function garage(b: Builder): void {
  const { p, dest } = b;
  const acc = b.accent("#ff5a36", 1.8);
  b.box(p.concrete, 40, 0.2, 26, 0, 0, 2);
  b.box(p.dark, 32, 8, 16, 0, 0.2, -5);
  b.box(p.white, 33, 0.6, 17, 0, 8.2, -5);
  for (const x of [-10.4, 0, 10.4]) {
    b.box(p.steel, 8.4, 5.2, 0.3, x, 0.2, 3.05);
    for (let k = 1; k < 6; k++) b.box(p.dark, 8.4, 0.06, 0.34, x, 0.2 + k * 0.86, 3.05);
  }
  b.box(acc, 32.2, 0.2, 0.3, 0, 6, 3.1);
  b.sign(dest.name, "JDM · code-built", 16, 3.4, 0, 11, 3.2, 0, "#ff8a6a");
}

const BUILDERS: Record<Destination["landmark"], (b: Builder) => void> = {
  centralTower,
  gatewayPavilion,
  corporateTwin,
  officeTower,
  university,
  library,
  researchLab,
  projectPod,
  creativeStudio,
  galleryPavilion,
  mediaTower,
  kiosk,
  contactPavilion,
  stadium,
  terminal,
  lookout,
  garage,
};

export function buildLandmarks(destinations: readonly Destination[], ctx: LandmarkContext): LandmarkBuild {
  const root = new THREE.Group();
  root.name = "landmarks";
  const spinners: LandmarkSpinner[] = [];
  const facades: BuildingBox[] = [];
  const p = palette();
  for (const dest of destinations) {
    const builder = new Builder(dest, ctx, p);
    BUILDERS[dest.landmark](builder);
    const built = builder.finish();
    root.add(built.group);
    spinners.push(...built.spinners);
    facades.push(...built.facades);
  }
  return { group: root, spinners, facades };
}
