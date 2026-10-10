"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { CameraMode } from "@/types/vehicle";
import { pointBlocked } from "@/lib/game/collision";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { SPAWN, wrapAngle } from "@/lib/world/layout";
import type { CarModel } from "./model/car";

interface Pose {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  fov: number;
  near: number;
}

const UP = new THREE.Vector3(0, 1, 0);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const TRANSITION = 0.7;
const FLYOVER = 5.5;

function lookAtQuaternion(out: THREE.Quaternion, from: THREE.Vector3, to: THREE.Vector3, scratch: THREE.Matrix4): void {
  scratch.lookAt(from, to, UP);
  out.setFromRotationMatrix(scratch);
}

/**
 * One camera, three driving modes (cockpit, chase, cinematic), plus the idle
 * showcase shot on the start screen and the first-visit fly-in. Mode changes
 * are blended, never cut, and every mode falls back to a valid pose.
 */
export default function CameraRig({ car }: { car: CarModel }) {
  const { camera, size } = useThree();
  const flyoverNonce = useGameStore((s) => s.flyoverNonce);
  const s = useRef({
    mode: "showcase" as CameraMode | "showcase",
    blend: 1,
    chaseHeading: SPAWN.heading,
    chaseDistance: 6.4,
    cinematicAngle: 0.6,
    cinematicLift: 0,
    flyover: -1,
    ready: false,
  });
  const scratch = useMemo(
    () => ({
      desired: { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), fov: 60, near: 0.3 } as Pose,
      from: { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), fov: 60, near: 0.3 } as Pose,
      fly: { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), fov: 50, near: 0.3 } as Pose,
      target: new THREE.Vector3(),
      eye: new THREE.Vector3(),
      bodyQuat: new THREE.Quaternion(),
      lookQuat: new THREE.Quaternion(),
      euler: new THREE.Euler(0, 0, 0, "YXZ"),
      matrix: new THREE.Matrix4(),
      v: new THREE.Vector3(),
    }),
    [],
  );

  useEffect(() => {
    if (flyoverNonce > 0) s.current.flyover = 0;
  }, [flyoverNonce]);

  useFrame(({ clock }, dt) => {
    const store = useGameStore.getState();
    const st = s.current;
    const v = runtime.vehicle;
    const cam = camera as THREE.PerspectiveCamera;
    const d = scratch.desired;
    const reduced = store.reducedMotion;
    const speed = Math.abs(v.speed);
    const look = runtime.look;
    const mode: CameraMode | "showcase" = store.phase === "driving" ? store.cameraMode : "showcase";

    // Free look eases back to centre once the visitor lets go and is moving.
    look.idle += dt;
    if (look.idle > 1.4 && (speed > 2 || mode === "cinematic")) {
      const k = Math.exp(-2.5 * dt);
      look.yaw *= k;
      look.pitch *= k;
    }

    if (mode !== st.mode) {
      scratch.from.position.copy(cam.position);
      scratch.from.quaternion.copy(cam.quaternion);
      scratch.from.fov = cam.fov;
      st.blend = st.ready ? 0 : 1;
      st.mode = mode;
      look.yaw = 0;
      look.pitch = 0;
    }

    car.root.updateWorldMatrix(true, true);
    const portrait = size.width / size.height < 1 ? 1 + (1 - size.width / size.height) * 0.45 : 1;

    if (mode === "cockpit") {
      scratch.eye.copy(car.eye);
      car.body.localToWorld(scratch.eye);
      car.body.getWorldQuaternion(scratch.bodyQuat);
      const yaw = Math.max(-2.5, Math.min(2.5, look.yaw));
      const pitch = Math.max(-0.5, Math.min(0.45, look.pitch));
      // The camera looks down -Z while the car drives along +Z, hence the half turn.
      // In portrait, tilt up a little so the tall frame shows road rather than dashboard.
      scratch.euler.set(-0.02 + (portrait - 1) * 0.5 + pitch, Math.PI + yaw, 0);
      scratch.lookQuat.setFromEuler(scratch.euler);
      d.position.copy(scratch.eye);
      d.quaternion.copy(scratch.bodyQuat).multiply(scratch.lookQuat);
      d.fov = (70 + Math.min(8, speed * 0.16)) * portrait;
      d.near = 0.07;
    } else if (mode === "chase") {
      const rate = 1 - Math.exp(-4.2 * dt);
      // In a slide the camera settles between the nose and the direction of
      // travel, so the car is seen at an angle instead of always from behind.
      const follow = v.heading - v.slipAngle * 0.6 * v.drift;
      st.chaseHeading = wrapAngle(st.chaseHeading + wrapAngle(follow - st.chaseHeading) * rate);
      const h = st.chaseHeading + look.yaw;
      const wanted = 6.6 + speed * 0.04;
      const height = 2.75 + speed * 0.008 - look.pitch * 4;
      // Pull the camera in if a building is in the way.
      let allowed = wanted;
      const world = runtime.world;
      if (world) {
        for (const f of [1, 0.82, 0.64, 0.48, 0.34]) {
          allowed = wanted * f;
          if (!pointBlocked(world.colliders, v.x - Math.sin(h) * allowed, v.z - Math.cos(h) * allowed, 0.8)) break;
        }
      }
      st.chaseDistance += (allowed - st.chaseDistance) * (1 - Math.exp(-(allowed < st.chaseDistance ? 12 : 3) * dt));
      d.position.set(v.x - Math.sin(h) * st.chaseDistance, v.y + Math.max(0.9, height), v.z - Math.cos(h) * st.chaseDistance);
      // Aim low and ahead so the car sits above the speedometer, not behind it.
      scratch.target.set(v.x + Math.sin(follow) * 3.2, v.y + 0.1, v.z + Math.cos(follow) * 3.2);
      lookAtQuaternion(d.quaternion, d.position, scratch.target, scratch.matrix);
      d.fov = (58 + Math.min(10, speed * 0.2)) * portrait;
      d.near = 0.3;
    } else {
      // Cinematic orbit while driving; a slow three-quarter shot on the start screen.
      const t = clock.elapsedTime;
      const showcase = mode === "showcase";
      if (!reduced) st.cinematicAngle += dt * (showcase ? 0.05 : 0.2);
      const a = (showcase ? v.heading + Math.PI - 0.55 + Math.sin(st.cinematicAngle) * 0.35 : st.cinematicAngle) + look.yaw;
      const radius = showcase ? 8.2 : 10.5 + Math.sin(t * 0.13) * 2.5;
      const baseHeight = showcase ? 1.55 : 2.4 + (0.5 + 0.5 * Math.sin(t * 0.17)) * 3.2;
      const px = v.x + Math.sin(a) * radius;
      const pz = v.z + Math.cos(a) * radius;
      const world = runtime.world;
      const blocked = world ? pointBlocked(world.colliders, px, pz, 1) : false;
      st.cinematicLift += ((blocked ? 16 : 0) - st.cinematicLift) * (1 - Math.exp(-2 * dt));
      d.position.set(px, v.y + baseHeight + st.cinematicLift - look.pitch * 4, pz);
      scratch.target.set(v.x, v.y + (showcase ? 1.6 : 0.8), v.z);
      lookAtQuaternion(d.quaternion, d.position, scratch.target, scratch.matrix);
      d.fov = (showcase ? 46 : 44) * portrait;
      d.near = 0.3;
    }

    // Blend from the previous pose after a mode change.
    if (st.blend < 1) {
      st.blend = Math.min(1, st.blend + dt / TRANSITION);
      const k = ease(st.blend);
      cam.position.lerpVectors(scratch.from.position, d.position, k);
      cam.quaternion.slerpQuaternions(scratch.from.quaternion, d.quaternion, k);
      cam.fov = scratch.from.fov + (d.fov - scratch.from.fov) * k;
    } else {
      cam.position.copy(d.position);
      cam.quaternion.copy(d.quaternion);
      cam.fov = d.fov;
    }

    // First visit: descend from above the island to the driving view.
    if (st.flyover >= 0) {
      st.flyover += dt / FLYOVER;
      if (st.flyover >= 1 || reduced || speed > 3) st.flyover = -1;
      else {
        const k = ease(st.flyover);
        const f = scratch.fly;
        f.position.set(v.x - 210 + Math.sin(k * 1.2) * 60, 250, v.z + 330);
        scratch.target.set(0, 60, -20);
        lookAtQuaternion(f.quaternion, f.position, scratch.target, scratch.matrix);
        cam.position.lerpVectors(f.position, cam.position.clone(), k);
        cam.quaternion.slerpQuaternions(f.quaternion, cam.quaternion.clone(), k);
        cam.fov = 48 + (cam.fov - 48) * k;
      }
    }

    const override = runtime.cameraOverride;
    if (override) {
      cam.position.set(...override.position);
      scratch.target.set(...override.target);
      lookAtQuaternion(cam.quaternion, cam.position, scratch.target, scratch.matrix);
      cam.fov = override.fov ?? 50;
      d.near = 0.5;
    }

    if (!Number.isFinite(cam.position.x + cam.position.y + cam.position.z)) {
      cam.position.set(v.x, v.y + 3, v.z + 8);
      cam.lookAt(v.x, v.y + 1, v.z);
    }
    if (Math.abs(cam.near - d.near) > 1e-4) cam.near = d.near;
    cam.updateProjectionMatrix();
    st.ready = true;
  });

  return null;
}
