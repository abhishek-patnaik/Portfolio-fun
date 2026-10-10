"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { getDestination } from "@/lib/data/landmarks";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { LANE_OFFSET, groundHeight } from "@/lib/world/layout";
import type { WorldTextures } from "./textures";

/** Builds a ribbon along the route, shifted into the left-hand driving lane. */
function ribbonGeometry(points: readonly (readonly [number, number])[]): THREE.BufferGeometry {
  const dense: [number, number][] = [];
  for (let i = 1; i < points.length; i++) {
    const [ax, az] = points[i - 1];
    const [bx, bz] = points[i];
    const len = Math.hypot(bx - ax, bz - az);
    const steps = Math.max(1, Math.ceil(len / 3));
    for (let s = i === 1 ? 0 : 1; s <= steps; s++) dense.push([ax + ((bx - ax) * s) / steps, az + ((bz - az) * s) / steps]);
  }
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const half = 1.1;
  let walked = 0;
  for (let i = 0; i < dense.length; i++) {
    const prev = dense[Math.max(0, i - 1)];
    const next = dense[Math.min(dense.length - 1, i + 1)];
    let dx = next[0] - prev[0];
    let dz = next[1] - prev[1];
    const len = Math.hypot(dx, dz) || 1;
    dx /= len;
    dz /= len;
    // Left of travel is (dz, -dx) in this coordinate system.
    const cx = dense[i][0] + dz * LANE_OFFSET;
    const cz = dense[i][1] - dx * LANE_OFFSET;
    if (i > 0) walked += Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]);
    for (const side of [-1, 1]) {
      const x = cx + dz * half * side;
      const z = cz - dx * half * side;
      pos.push(x, groundHeight(x, z) + 0.07, z);
      uv.push(side < 0 ? 0 : 1, walked / 5);
    }
    if (i > 0) {
      const o = (i - 1) * 2;
      idx.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/** Animated arrows on the road towards the selected destination, and a marker at it. */
export default function RouteGuide({ textures }: { textures: WorldTextures }) {
  const targetId = useGameStore((s) => s.routeTargetId);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const [version, setVersion] = useState(0);
  const seen = useRef(-1);
  const marker = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    const map = textures.routeArrow.clone();
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.needsUpdate = true;
    return new THREE.MeshBasicMaterial({
      map,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -6,
      polygonOffsetUnits: -6,
    });
  }, [textures]);
  useEffect(
    () => () => {
      material.map?.dispose();
      material.dispose();
    },
    [material],
  );

  // The route itself lives in the runtime; watch its version to rebuild the ribbon.
  useFrame((_, dt) => {
    if (runtime.routeVersion !== seen.current) {
      seen.current = runtime.routeVersion;
      setVersion(runtime.routeVersion);
    }
    if (material.map && !reducedMotion) material.map.offset.y -= dt * 0.9;
    if (marker.current && !reducedMotion) marker.current.rotation.y += dt * 0.8;
  });

  const geometry = useMemo(() => {
    void version;
    const route = runtime.route;
    if (!route || !targetId || route.points.length < 2) return null;
    return ribbonGeometry(route.points);
  }, [version, targetId]);
  useEffect(() => () => geometry?.dispose(), [geometry]);

  const target = targetId ? getDestination(targetId) : undefined;
  if (!geometry || !target) return null;
  return (
    <group name="route-guide">
      <mesh geometry={geometry} material={material} renderOrder={4} frustumCulled={false} />
      <group ref={marker} position={[target.access.x, groundHeight(target.access.x, target.access.z), target.access.z]}>
        <mesh position={[0, 30, 0]}>
          <cylinderGeometry args={[0.5, 2.2, 60, 16, 1, true]} />
          <meshBasicMaterial color="#9fd8ff" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
          <ringGeometry args={[3.4, 4.2, 6]} />
          <meshBasicMaterial color="#bfe6ff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
