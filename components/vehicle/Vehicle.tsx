"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { VehicleInput } from "@/types/vehicle";
import { destinations, getDestination } from "@/lib/data/landmarks";
import { audio } from "@/lib/game/audio";
import { pointBlocked } from "@/lib/game/collision";
import { nearestDestination } from "@/lib/game/destinations";
import { updateDriftRun } from "@/lib/game/drift";
import { input } from "@/lib/game/input";
import { findRoute, guidance, nearestRoadPose } from "@/lib/game/navigation";
import { MAX_FRAME_TIME, NEUTRAL_INPUT, advanceVehicle, placeVehicle, speedKmh } from "@/lib/game/physics";
import { runtime } from "@/lib/game/runtime";
import { isDrivingActive, useGameStore } from "@/lib/game/store";
import { districtAt, isOnRoad } from "@/lib/world/layout";
import { QUALITY } from "@/lib/utils/performance";
import { SKY_PRESETS } from "@/components/world/sky";
import type { WorldTextures } from "@/components/world/textures";
import type { CarModel } from "./model/car";

interface Props {
  car: CarModel;
  textures: WorldTextures;
}

const SLOW_TICK = 0.15;

/**
 * The player's car: runs the physics on a fixed step, moves the model, and
 * performs the slow per-tick checks (district, nearby landmark, guidance).
 */
export default function Vehicle({ car, textures }: Props) {
  const quality = useGameStore((s) => s.quality);
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const profile = QUALITY[quality];
  const preset = SKY_PRESETS[timeOfDay];
  const holder = useRef<THREE.Group>(null);
  const beam = useRef<THREE.SpotLight>(null);
  const beamTarget = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(0, -0.4, 26);
    return o;
  }, []);
  const state = useRef({ acc: 0, slow: 0, safe: 0, roll: 0, squat: 0, rearSpin: 0, wasActive: false });
  const frameInput = useRef<VehicleInput>({ ...NEUTRAL_INPUT });

  const shadow = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      color: "#000000",
      map: textures.glow,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    material.userData.sharedMap = true;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 6.6).rotateX(-Math.PI / 2), material);
    mesh.position.y = 0.03;
    mesh.renderOrder = 1;
    return mesh;
  }, [textures]);

  useEffect(() => {
    car.root.add(beamTarget);
    return () => {
      car.root.remove(beamTarget);
    };
  }, [car, beamTarget]);

  useEffect(() => {
    // Clear-coat is the expensive part of the paint; drop it on the low profile.
    if (car.paint instanceof THREE.MeshPhysicalMaterial) {
      car.paint.clearcoat = profile.richMaterials ? 1 : 0;
      car.paint.needsUpdate = true;
    }
  }, [car, profile.richMaterials]);

  useEffect(() => {
    car.lamps.head.emissiveIntensity = 1.4 + preset.headlights * 2.4;
    car.lamps.tail.emissiveIntensity = 0.7 + preset.headlights * 1.1;
  }, [car, preset]);

  useFrame((_, dt) => {
    const world = runtime.world;
    const group = holder.current;
    if (!world || !group) return;
    const store = useGameStore.getState();
    const v = runtime.vehicle;
    const s = state.current;
    const active = isDrivingActive(store);
    v.engineOn = store.engineOn;

    if (runtime.pendingTeleport) {
      placeVehicle(v, runtime.pendingTeleport, world);
      runtime.lastSafe = { ...runtime.pendingTeleport };
      runtime.pendingTeleport = null;
      s.acc = 0;
    }
    if (runtime.pendingRecover) {
      runtime.pendingRecover = false;
      let pose = runtime.lastSafe;
      if (pointBlocked(world.colliders, pose.x, pose.z, 2) || !isOnRoad(pose.x, pose.z)) pose = nearestRoadPose(v.x, v.z, v.heading);
      placeVehicle(v, pose, world);
      runtime.stuckTimer = 0;
      s.acc = 0;
      store.setStuck(false);
      store.showToast("Back on the road");
    }

    const inp = input.read(frameInput.current);
    if (active) {
      s.acc = advanceVehicle(v, inp, dt, s.acc, world);
    } else if (s.wasActive) {
      // An interface just opened: bring the car to rest where it is.
      v.vx = 0;
      v.vz = 0;
      v.speed = 0;
      v.slip = 0;
      v.slipAngle = 0;
      v.drift = 0;
      v.tyreSlip = 0;
      v.yawRate = 0;
      v.accel = 0;
      s.acc = 0;
    }
    s.wasActive = active;

    // Drift scoring: bank a run when it ends cleanly, lose it on contact.
    if (active) {
      const run = runtime.drift;
      if (run.best < store.bestDrift) run.best = store.bestDrift;
      // Score on simulated time, which is capped per frame exactly like the physics.
      const event = updateDriftRun(run, v, Math.min(dt, MAX_FRAME_TIME));
      if (event === "bank" && run.lastPoints > store.bestDrift) {
        const first = store.bestDrift === 0;
        store.setBestDrift(run.lastPoints);
        if (!first) store.showToast(`New best drift: ${run.lastPoints.toLocaleString("en-US")}`);
        audio.blip("arrive");
      }
    }
    audio.update(v, active ? inp.throttle : 0, active && inp.brake > 0 && v.speed > 1);

    // Model transform. YXZ order: heading first, then the road gradient.
    group.position.set(v.x, v.y, v.z);
    group.rotation.set(-v.pitch, v.heading, 0, "YXZ");
    const k = 1 - Math.exp(-7 * dt);
    const lateral = Math.max(-9, Math.min(9, v.speed * v.yawRate));
    s.roll += (lateral * 0.0058 - s.roll) * k;
    s.squat += (Math.max(-12, Math.min(12, v.accel)) * -0.0026 - s.squat) * k;
    car.body.rotation.set(s.squat, 0, s.roll);

    // Rear wheels spin up under power while they are sliding.
    if (active) s.rearSpin += v.drift * inp.throttle * 26 * dt;
    for (const w of car.wheels) {
      w.spinner.rotation.x = w.front ? v.wheelSpin : v.wheelSpin + s.rearSpin;
      if (w.front) w.pivot.rotation.y = -v.steerVisual;
    }
    car.steeringWheel.rotation.z = v.steerVisual * 5.2;
    car.tachNeedle.rotation.z = -(1.25 * Math.PI + 1.5 * Math.PI * Math.min(1, (v.rpm * 8.3) / 9));
    car.speedNeedle.rotation.z = -(1.25 * Math.PI + 1.5 * Math.PI * Math.min(1, speedKmh(v) / 280));
    const braking = active && inp.brake > 0 && !v.reversing;
    car.lamps.brake.emissiveIntensity = braking ? 3.4 : 0.9 + preset.headlights * 0.8;
    car.lamps.reverse.emissiveIntensity = v.gear < 0 ? 2.6 : 0;
    if (beam.current) beam.current.intensity = v.engineOn ? preset.headlights * 520 : 0;

    // Remember the last good road position for recovery.
    s.safe += dt;
    if (s.safe > 0.5) {
      s.safe = 0;
      if (Math.abs(v.speed) > 3 && v.sinceCollision > 1.2 && Math.abs(v.slip) < 2.5 && isOnRoad(v.x, v.z)) {
        runtime.lastSafe = { x: v.x, z: v.z, heading: v.speed >= 0 ? v.heading : v.heading + Math.PI };
      }
    }

    s.slow += dt;
    if (s.slow < SLOW_TICK) return;
    const tick = s.slow;
    s.slow = 0;

    store.setDistrict(districtAt(v.x, v.z));

    const preferred = runtime.preferredDestination ? getDestination(runtime.preferredDestination) : undefined;
    if (preferred && Math.hypot(v.x - preferred.position[0], v.z - preferred.position[1]) > preferred.radius) {
      runtime.preferredDestination = null;
    }
    const near = nearestDestination(destinations, v.x, v.z, runtime.preferredDestination);
    store.setNearby(near ? near.id : null);
    if (near) store.markDiscovered(near.id);

    if (runtime.route && store.routeTargetId) {
      let g = guidance(runtime.route, v.x, v.z, v.heading);
      const target = getDestination(store.routeTargetId);
      if (target) {
        const direct = Math.hypot(v.x - target.access.x, v.z - target.access.z);
        if (direct < 16 || g.remaining < 10) {
          runtime.route = null;
          runtime.guidance = null;
          runtime.routeVersion++;
          store.setRouteTarget(null);
          store.showToast(`Arrived at ${target.name}`);
          audio.blip("arrive");
          return;
        }
        // Wandered off the route: plan again from here.
        const offRoute = Math.hypot(v.x - runtime.route.points[g.segment][0], v.z - runtime.route.points[g.segment][1]);
        const segLen = Math.hypot(
          runtime.route.points[g.segment + 1][0] - runtime.route.points[g.segment][0],
          runtime.route.points[g.segment + 1][1] - runtime.route.points[g.segment][1],
        );
        if (offRoute > segLen + 45) {
          runtime.route = findRoute([v.x, v.z], [target.access.x, target.access.z]);
          runtime.routeVersion++;
          g = guidance(runtime.route, v.x, v.z, v.heading);
        }
      }
      runtime.guidance = g;
    } else if (runtime.guidance) {
      runtime.guidance = null;
    }

    if (active && (inp.throttle > 0.5 || inp.brake > 0.5) && Math.abs(v.speed) < 0.5 && v.engineOn) runtime.stuckTimer += tick;
    else runtime.stuckTimer = 0;
    store.setStuck(runtime.stuckTimer > 2.2);
  });

  return (
    <group ref={holder} name="vehicle">
      <primitive object={car.root} />
      <primitive object={shadow} />
      {profile.headlightBeam && preset.headlights > 0 ? (
        <spotLight
          ref={beam}
          position={[0, 0.72, 1.9]}
          target={beamTarget}
          color="#fff0d8"
          angle={0.62}
          penumbra={0.7}
          distance={95}
          decay={1.6}
          intensity={0}
        />
      ) : null}
    </group>
  );
}
