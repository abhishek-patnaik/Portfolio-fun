import * as THREE from "three";
import type { TimeOfDay } from "@/lib/game/store";

export interface SkyPreset {
  label: string;
  sunDirection: [number, number, number];
  sunColor: string;
  sunIntensity: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  zenith: string;
  mid: string;
  horizon: string;
  fog: string;
  /** Fog start and end as a fraction of the draw distance. */
  fogRange: [number, number];
  /** Share of windows that are lit (multiplies each building's own value). */
  windowLit: number;
  /** Brightness of lit windows, signage and other emissive detail. */
  emissive: number;
  /** Strength of street-light pools on the ground. */
  lampGlow: number;
  envIntensity: number;
  exposure: number;
  stars: number;
  clouds: number;
  bloom: number;
  headlights: number;
}

/** Three lighting moods. "Golden hour" matches the street-level reference image. */
export const SKY_PRESETS: Record<TimeOfDay, SkyPreset> = {
  golden: {
    label: "Golden hour",
    sunDirection: [-0.62, 0.3, 0.72],
    sunColor: "#ffd0a0",
    sunIntensity: 3.0,
    hemiSky: "#9db8f5",
    hemiGround: "#4c4046",
    hemiIntensity: 0.8,
    zenith: "#2f66c4",
    mid: "#8fb6ea",
    horizon: "#ffc9a0",
    fog: "#b3b4d2",
    fogRange: [0.42, 1.1],
    windowLit: 0.34,
    emissive: 0.8,
    lampGlow: 0.45,
    envIntensity: 1.0,
    exposure: 0.92,
    stars: 0,
    clouds: 0.75,
    bloom: 0.55,
    headlights: 0.5,
  },
  day: {
    label: "Day",
    sunDirection: [-0.4, 0.78, 0.48],
    sunColor: "#fff6e6",
    sunIntensity: 3.4,
    hemiSky: "#bcd8ff",
    hemiGround: "#63605a",
    hemiIntensity: 1.1,
    zenith: "#2b6fd6",
    mid: "#7fb3ee",
    horizon: "#d7ebff",
    fog: "#bcd3ee",
    fogRange: [0.45, 1.1],
    windowLit: 0.07,
    emissive: 0.4,
    lampGlow: 0,
    envIntensity: 1.05,
    exposure: 0.88,
    stars: 0,
    clouds: 0.9,
    bloom: 0.3,
    headlights: 0,
  },
  night: {
    label: "Night",
    sunDirection: [0.35, 0.62, -0.5],
    sunColor: "#9db8ff",
    sunIntensity: 0.55,
    hemiSky: "#3a4c8f",
    hemiGround: "#14131f",
    hemiIntensity: 0.7,
    zenith: "#050814",
    mid: "#101a44",
    horizon: "#3a2a6a",
    fog: "#141a3c",
    fogRange: [0.3, 1.05],
    windowLit: 0.8,
    emissive: 1.25,
    lampGlow: 1,
    envIntensity: 0.55,
    exposure: 1.05,
    stars: 1,
    clouds: 0.3,
    bloom: 0.95,
    headlights: 1,
  },
};

const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w; // always at the far plane
}`;

const FRAG = /* glsl */ `
precision highp float;
varying vec3 vDir;
uniform vec3 uZenith;
uniform vec3 uMid;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uStars;
uniform float uClouds;
uniform float uTime;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += noise(p) * a;
    p = p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = clamp(dir.y, -0.2, 1.0);
  vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.22, h));
  col = mix(col, uZenith, smoothstep(0.18, 0.75, h));
  // Below the horizon fade to a hazy ground colour.
  col = mix(col, uHorizon * 0.55, smoothstep(0.0, -0.18, dir.y));

  float sun = max(dot(dir, normalize(uSunDir)), 0.0);
  col += uSunColor * pow(sun, 6.0) * 0.22;
  col += uSunColor * pow(sun, 60.0) * 0.5;
  col += uSunColor * smoothstep(0.99955, 0.9998, sun) * 6.0;

  if (dir.y > 0.02 && uClouds > 0.0) {
    vec2 uv = dir.xz / (dir.y + 0.18) * 1.6 + uTime * 0.004;
    float c = smoothstep(0.52, 0.86, fbm(uv));
    float lit = 0.75 + 0.5 * pow(sun, 3.0);
    vec3 cloudCol = mix(uHorizon, vec3(1.0), 0.55) * lit;
    col = mix(col, cloudCol, c * uClouds * smoothstep(0.02, 0.2, dir.y) * 0.8);
  }

  if (uStars > 0.0 && dir.y > 0.0) {
    vec2 sp = dir.xz / (dir.y + 0.4) * 260.0;
    vec2 cell = floor(sp);
    float present = step(0.985, hash(cell));
    // A soft dot inside the cell rather than the whole cell.
    vec2 offset = fract(sp) - 0.5 - (vec2(hash(cell + 3.1), hash(cell + 7.7)) - 0.5) * 0.6;
    float dot_ = smoothstep(0.16, 0.02, length(offset));
    col += vec3(0.85, 0.9, 1.0) * present * dot_ * (0.4 + 0.6 * hash(cell + 1.3)) * uStars * smoothstep(0.05, 0.4, dir.y);
  }
  gl_FragColor = vec4(col, 1.0);
}`;

export function createSkyMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: true,
    fog: false,
    toneMapped: false,
    uniforms: {
      uZenith: { value: new THREE.Color() },
      uMid: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uSunColor: { value: new THREE.Color() },
      uStars: { value: 0 },
      uClouds: { value: 0 },
      uTime: { value: 0 },
    },
  });
}

export function applySkyPreset(material: THREE.ShaderMaterial, preset: SkyPreset): void {
  const u = material.uniforms;
  (u.uZenith.value as THREE.Color).set(preset.zenith);
  (u.uMid.value as THREE.Color).set(preset.mid);
  (u.uHorizon.value as THREE.Color).set(preset.horizon);
  (u.uSunDir.value as THREE.Vector3).set(...preset.sunDirection).normalize();
  (u.uSunColor.value as THREE.Color).set(preset.sunColor);
  u.uStars.value = preset.stars;
  u.uClouds.value = preset.clouds;
}

/**
 * Bakes the sky into a prefiltered environment map for reflections on glass,
 * water and the car. A few emissive panels stand in for the lit city so that
 * reflections are not empty at night.
 */
export function bakeEnvironment(renderer: THREE.WebGLRenderer, preset: SkyPreset): THREE.WebGLRenderTarget {
  const scene = new THREE.Scene();
  const material = createSkyMaterial();
  applySkyPreset(material, preset);
  material.uniforms.uClouds.value = preset.clouds * 0.6;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), material);
  scene.add(dome);
  const panelGeo = new THREE.PlaneGeometry(1, 1);
  const colors = ["#ffd9a8", "#8fd0ff", "#c9a8ff", "#ffb0de"];
  const panels: THREE.Material[] = [];
  for (let i = 0; i < 14; i++) {
    const m = new THREE.MeshBasicMaterial({ color: colors[i % colors.length] });
    m.color.multiplyScalar(0.5 + preset.emissive * 0.9);
    panels.push(m);
    const mesh = new THREE.Mesh(panelGeo, m);
    const a = (i / 14) * Math.PI * 2;
    mesh.position.set(Math.cos(a) * 30, 3 + (i % 3) * 4, Math.sin(a) * 30);
    mesh.scale.set(5, 3 + (i % 4) * 3, 1);
    mesh.lookAt(0, 4, 0);
    scene.add(mesh);
  }
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(60, 24),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(preset.hemiGround).multiplyScalar(0.6) }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.02, 0.1, 200);
  pmrem.dispose();
  dome.geometry.dispose();
  material.dispose();
  panelGeo.dispose();
  panels.forEach((m) => m.dispose());
  ground.geometry.dispose();
  (ground.material as THREE.Material).dispose();
  return target;
}
