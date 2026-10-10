"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { destinations } from "@/lib/data/landmarks";
import { site } from "@/lib/data/portfolio";
import { useGameStore } from "@/lib/game/store";
import { groundHeight } from "@/lib/world/layout";
import { disposeObject } from "@/lib/three/merge";
import { createFacadeMaterial } from "./facadeMaterial";
import { buildLandmarks } from "./geometry/landmarks";
import { instancedBoxes } from "./instancing";
import type { WorldTextures } from "./textures";

interface Props {
  textures: WorldTextures;
  fontFamily: string;
}

/** Where a destination's marker floats: on its forecourt, towards the road. */
export function beaconPosition(d: (typeof destinations)[number]): [number, number, number] {
  const small = d.landmark === "kiosk" || d.landmark === "terminal" || d.landmark === "lookout";
  const t = small ? 0 : 0.62;
  const x = d.position[0] + (d.access.x - d.position[0]) * t;
  const z = d.position[1] + (d.access.z - d.position[1]) * t;
  return [x, groundHeight(x, z), z];
}

/**
 * Floating markers above every destination. Three instanced meshes (ground
 * ring, diamond and light beam) cover all of them.
 */
function Beacons() {
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const discovered = useGameStore((s) => s.discovered);
  const layout = useMemo(
    () =>
      destinations.map((d) => {
        const [x, y, z] = beaconPosition(d);
        const small = d.landmark === "kiosk" || d.landmark === "terminal" || d.landmark === "lookout";
        return { id: d.id, x, y, z, color: new THREE.Color(d.color), scale: d.kind === "section" ? 1 : 0.62, height: small ? 8.5 : d.kind === "section" ? 7 : 5.5 };
      }),
    [],
  );

  const built = useMemo(() => {
    const root = new THREE.Group();
    root.name = "beacons";
    const n = layout.length;
    const m = new THREE.Matrix4();
    const ring = new THREE.InstancedMesh(
      new THREE.RingGeometry(2.7, 3.3, 40).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }),
      n,
    );
    const beam = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.2, 0.9, 1, 12, 1, true).translate(0, 0.5, 0),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.045, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
      n,
    );
    const diamond = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1.25), new THREE.MeshBasicMaterial({ toneMapped: false }), n);
    layout.forEach((b, i) => {
      m.makeScale(b.scale, 1, b.scale).setPosition(b.x, b.y + 0.06, b.z);
      ring.setMatrixAt(i, m);
      ring.setColorAt(i, b.color);
      m.makeScale(b.scale, 46 * b.scale, b.scale).setPosition(b.x, b.y, b.z);
      beam.setMatrixAt(i, m);
      beam.setColorAt(i, b.color);
      diamond.setColorAt(i, b.color.clone().multiplyScalar(1.5));
    });
    for (const mesh of [ring, beam, diamond]) {
      mesh.frustumCulled = false;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.instanceMatrix.needsUpdate = true;
    }
    ring.renderOrder = 3;
    beam.renderOrder = 3;
    root.add(ring, beam, diamond);
    return { root, diamond };
  }, [layout]);

  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const scl = useMemo(() => new THREE.Vector3(), []);
  const axis = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  useFrame(({ clock }) => {
    const mesh = built.diamond;
    const t = reducedMotion ? 0 : clock.elapsedTime;
    layout.forEach((b, i) => {
      const seen = discovered.includes(b.id);
      quat.setFromAxisAngle(axis, t * 0.9 + i);
      pos.set(b.x, b.y + b.height + Math.sin(t * 1.6 + i * 0.7) * 0.35, b.z);
      const s = b.scale * (seen ? 0.7 : 1);
      scl.set(s, s * 1.5, s);
      matrix.compose(pos, quat, scl);
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  useEffect(() => () => disposeObject(built.root), [built]);
  return <primitive object={built.root} />;
}

export default function Landmarks({ textures, fontFamily }: Props) {
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const built = useMemo(() => {
    const result = buildLandmarks(destinations, {
      fontFamily,
      billboards: textures.billboards,
      ownerName: site.shortName,
      disciplines: site.disciplines,
    });
    // Landmark volumes with windows share the skyline's facade shader.
    result.group.add(instancedBoxes(result.facades, createFacadeMaterial(), true));
    return result;
  }, [textures, fontFamily]);
  useFrame(({ clock }, dt) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime;
    for (const s of built.spinners) {
      s.object.rotation.y += s.speed * dt;
      if (s.bob && s.baseY !== undefined) s.object.position.y = s.baseY + Math.sin(t * 1.2 + s.baseY) * s.bob;
    }
  });
  useEffect(() => () => disposeObject(built.group), [built]);
  return (
    <>
      <primitive object={built.group} />
      <Beacons />
    </>
  );
}
