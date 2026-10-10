"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { runtime } from "@/lib/game/runtime";
import { isDrivingActive, useGameStore } from "@/lib/game/store";
import { QUALITY } from "@/lib/utils/performance";
import { CAR } from "./model/body";

/** Quads kept in the skid-mark ribbon before the oldest are overwritten. */
const MAX_MARKS = 1600;
const MARK_HALF_WIDTH = 0.125;
const MARK_STEP = 0.3;
const MARK_LIFT = 0.035;

interface Track {
  active: boolean;
  /** Previous contact point and the ribbon edge laid there. */
  x: number;
  z: number;
  lx: number;
  ly: number;
  lz: number;
  rx: number;
  ry: number;
  rz: number;
  alpha: number;
}

const newTrack = (): Track => ({ active: false, x: 0, z: 0, lx: 0, ly: 0, lz: 0, rx: 0, ry: 0, rz: 0, alpha: 0 });

const SMOKE_VERTEX = /* glsl */ `
  attribute vec3 aState; // x: age 0..1, y: size in metres, z: opacity
  uniform float uScale;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min(aState.y * uScale / max(0.1, -mv.z), uScale * 0.45);
    float life = clamp(aState.x, 0.0, 1.0);
    // Fade in, fade out, and thin out right in front of the lens so smoke
    // never fills the screen in the chase view.
    vAlpha = aState.z * smoothstep(0.0, 0.08, life) * pow(1.0 - life, 1.6) * smoothstep(1.2, 7.0, -mv.z);
  }
`;

const SMOKE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.15, d) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

/**
 * Tyre smoke and skid marks for the rear wheels. Both are driven by
 * `vehicle.tyreSlip`, the same value the physics derives for the tyre sound.
 *
 * The marks are one ribbon mesh used as a ring buffer and the smoke is one
 * point cloud, so the whole effect costs two draw calls.
 */
export default function DriftEffects() {
  const quality = useGameStore((s) => s.quality);
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const profile = QUALITY[quality];
  const smokeCount = quality === "low" ? 70 : quality === "medium" ? 150 : 240;
  const size = useThree((s) => s.size);
  const camera = useThree((s) => s.camera);

  const marks = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(new Float32Array(MAX_MARKS * 4 * 3), 3);
    const color = new THREE.BufferAttribute(new Float32Array(MAX_MARKS * 4 * 4), 4);
    position.setUsage(THREE.DynamicDrawUsage);
    color.setUsage(THREE.DynamicDrawUsage);
    const index = new Uint16Array(MAX_MARKS * 6);
    for (let i = 0; i < MAX_MARKS; i++) {
      const v = i * 4;
      index.set([v, v + 1, v + 2, v + 2, v + 1, v + 3], i * 6);
    }
    geometry.setAttribute("position", position);
    geometry.setAttribute("color", color);
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
    geometry.setDrawRange(0, 0);
    const material = new THREE.MeshBasicMaterial({
      color: "#ffffff",
      vertexColors: true,
      transparent: true,
      // The ribbon's winding follows the direction of travel, so draw both faces.
      side: THREE.DoubleSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      fog: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 1;
    mesh.name = "skid-marks";
    return { mesh, geometry, material, position, color };
  }, []);

  const smoke = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(new Float32Array(smokeCount * 3), 3);
    const state = new THREE.BufferAttribute(new Float32Array(smokeCount * 3), 3);
    position.setUsage(THREE.DynamicDrawUsage);
    state.setUsage(THREE.DynamicDrawUsage);
    // Start every particle dead (age 1) so nothing is drawn until it is spawned.
    for (let i = 0; i < smokeCount; i++) state.setXYZ(i, 1, 0, 0);
    geometry.setAttribute("position", position);
    geometry.setAttribute("aState", state);
    const material = new THREE.ShaderMaterial({
      vertexShader: SMOKE_VERTEX,
      fragmentShader: SMOKE_FRAGMENT,
      uniforms: { uScale: { value: 600 }, uColor: { value: new THREE.Color("#c9ced4") } },
      transparent: true,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.renderOrder = 3;
    points.name = "tyre-smoke";
    return {
      points,
      geometry,
      material,
      position,
      state,
      velocity: new Float32Array(smokeCount * 3),
      life: new Float32Array(smokeCount).fill(1),
      grow: new Float32Array(smokeCount),
      count: smokeCount,
    };
  }, [smokeCount]);

  useEffect(
    () => () => {
      marks.geometry.dispose();
      marks.material.dispose();
    },
    [marks],
  );
  useEffect(
    () => () => {
      smoke.geometry.dispose();
      smoke.material.dispose();
    },
    [smoke],
  );
  useEffect(() => {
    smoke.material.uniforms.uColor.value.set(timeOfDay === "night" ? "#6f7785" : timeOfDay === "golden" ? "#cdbfb6" : "#c9ced4");
  }, [smoke, timeOfDay]);

  const st = useRef({ tracks: [newTrack(), newTrack()], cursor: 0, used: 0, next: 0, emit: 0, alive: 0 });

  useFrame((_, frameDt) => {
    const world = runtime.world;
    if (!world) return;
    const s = st.current;
    const v = runtime.vehicle;
    const dt = Math.min(frameDt, 0.05);
    const active = isDrivingActive(useGameStore.getState());
    const slip = active ? v.tyreSlip : 0;
    const fx = Math.sin(v.heading);
    const fz = Math.cos(v.heading);

    // Skid marks: extend each rear wheel's ribbon while the tyre is scrubbing.
    let marksDirty = false;
    for (let side = 0; side < 2; side++) {
      const track = s.tracks[side];
      const lateral = side === 0 ? CAR.trackHalf : -CAR.trackHalf;
      const wx = v.x + fx * CAR.rearAxleZ - fz * lateral;
      const wz = v.z + fz * CAR.rearAxleZ + fx * lateral;
      if (slip < 0.22) {
        track.active = false;
        continue;
      }
      const alpha = Math.min(0.78, 0.25 + slip * 0.55);
      if (!track.active) {
        track.active = true;
        track.x = wx;
        track.z = wz;
        track.alpha = 0;
        // Zero-width start; the first quad fans out from this point.
        const y = world.groundHeight(wx, wz) + MARK_LIFT;
        track.lx = track.rx = wx;
        track.ly = track.ry = y;
        track.lz = track.rz = wz;
        continue;
      }
      const dx = wx - track.x;
      const dz = wz - track.z;
      const dist = Math.hypot(dx, dz);
      if (dist < MARK_STEP) continue;
      if (dist > 4) {
        // Teleport or recovery: never draw a streak across the map.
        track.active = false;
        continue;
      }
      const nx = (-dz / dist) * MARK_HALF_WIDTH;
      const nz = (dx / dist) * MARK_HALF_WIDTH;
      const y = world.groundHeight(wx, wz) + MARK_LIFT;
      const base = s.cursor * 4;
      marks.position.setXYZ(base, track.lx, track.ly, track.lz);
      marks.position.setXYZ(base + 1, track.rx, track.ry, track.rz);
      marks.position.setXYZ(base + 2, wx + nx, y, wz + nz);
      marks.position.setXYZ(base + 3, wx - nx, y, wz - nz);
      marks.color.setXYZW(base, 0.03, 0.03, 0.035, track.alpha);
      marks.color.setXYZW(base + 1, 0.03, 0.03, 0.035, track.alpha);
      marks.color.setXYZW(base + 2, 0.03, 0.03, 0.035, alpha);
      marks.color.setXYZW(base + 3, 0.03, 0.03, 0.035, alpha);
      track.x = wx;
      track.z = wz;
      track.lx = wx + nx;
      track.ly = y;
      track.lz = wz + nz;
      track.rx = wx - nx;
      track.ry = y;
      track.rz = wz - nz;
      track.alpha = alpha;
      s.cursor = (s.cursor + 1) % MAX_MARKS;
      s.used = Math.min(MAX_MARKS, s.used + 1);
      marksDirty = true;
    }
    if (marksDirty) {
      marks.position.needsUpdate = true;
      marks.color.needsUpdate = true;
      marks.geometry.setDrawRange(0, s.used * 6);
      runtime.stats.skidMarks = s.used;
    }

    // Smoke: spawn at the rear contact patches, then drift, rise and fade.
    const rate = slip > 0.3 ? (profile.richMaterials ? 70 : 34) * slip : 0;
    s.emit += rate * dt;
    while (s.emit >= 1) {
      s.emit -= 1;
      const i = s.next;
      s.next = (s.next + 1) % smoke.count;
      const lateral = (Math.random() < 0.5 ? 1 : -1) * CAR.trackHalf;
      const back = CAR.rearAxleZ - 0.25 - Math.random() * 0.3;
      const px = v.x + fx * back - fz * lateral;
      const pz = v.z + fz * back + fx * lateral;
      smoke.position.setXYZ(i, px + (Math.random() - 0.5) * 0.3, world.groundHeight(px, pz) + 0.18, pz + (Math.random() - 0.5) * 0.3);
      smoke.velocity[i * 3] = v.vx * 0.22 + (Math.random() - 0.5) * 1.6;
      smoke.velocity[i * 3 + 1] = 0.5 + Math.random() * 0.9;
      smoke.velocity[i * 3 + 2] = v.vz * 0.22 + (Math.random() - 0.5) * 1.6;
      smoke.life[i] = 1.1 + Math.random() * 0.9;
      smoke.grow[i] = 1.4 + Math.random() * 1.2;
      smoke.state.setXYZ(i, 0, 0.7 + Math.random() * 0.4, Math.min(0.34, 0.1 + slip * 0.24));
      s.alive = Math.max(s.alive, 2.2);
    }
    if (s.alive > 0) {
      s.alive -= dt;
      const pos = smoke.position.array as Float32Array;
      const state = smoke.state.array as Float32Array;
      const drag = Math.exp(-1.6 * dt);
      for (let i = 0; i < smoke.count; i++) {
        const age = state[i * 3];
        if (age >= 1) continue;
        state[i * 3] = Math.min(1, age + dt / smoke.life[i]);
        state[i * 3 + 1] += smoke.grow[i] * dt;
        smoke.velocity[i * 3] *= drag;
        smoke.velocity[i * 3 + 2] *= drag;
        pos[i * 3] += smoke.velocity[i * 3] * dt;
        pos[i * 3 + 1] += smoke.velocity[i * 3 + 1] * dt;
        pos[i * 3 + 2] += smoke.velocity[i * 3 + 2] * dt;
      }
      smoke.position.needsUpdate = true;
      smoke.state.needsUpdate = true;
    }
    smoke.points.visible = s.alive > 0;
    runtime.stats.smoke = s.alive > 0;

    // Point size in pixels for a given world size at distance 1.
    const fov = (camera as THREE.PerspectiveCamera).fov ?? 60;
    smoke.material.uniforms.uScale.value = (size.height * 0.5) / Math.tan((fov * Math.PI) / 360);
  });

  return (
    <>
      <primitive object={marks.mesh} />
      <primitive object={smoke.points} />
    </>
  );
}
