"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { BuildingBox, CityData } from "@/types/world";
import { useGameStore } from "@/lib/game/store";
import { CHANNEL, CURB, GANTRIES, ISLAND } from "@/lib/world/layout";
import { QUALITY } from "@/lib/utils/performance";
import { disposeObject, mat4 } from "@/lib/three/merge";
import { createFacadeMaterial, facadeUniforms } from "./facadeMaterial";
import { instancedBoxes } from "./instancing";
import { buildBridges, buildGround, buildMarkings, buildRoundaboutRings, markingsToMesh } from "./geometry/ground";
import {
  LAMP_REACH,
  boatGeometry,
  craneGeometry,
  hillTreePoints,
  hillsGeometry,
  lampHeadGeometry,
  lampPoleGeometry,
  pagodaGeometry,
  palmGeometry,
  pineGeometry,
  radioMastGeometry,
  setInstances,
  skybridgeGeometry,
  skybridgeGlowGeometry,
  treeGeometry,
  turbineRotorGeometry,
  turbineTowerGeometry,
} from "./geometry/props";
import { SKY_PRESETS } from "./sky";
import { makeGantryTexture, type WorldTextures } from "./textures";

interface SceneProps {
  city: CityData;
  textures: WorldTextures;
  fontFamily: string;
}

/** Keeps every `step`-th item, used to thin decoration on lower quality levels. */
function thin<T>(items: readonly T[], density: number): T[] {
  if (density >= 1) return [...items];
  const out: T[] = [];
  let acc = 0;
  for (const item of items) {
    acc += density;
    if (acc >= 1) {
      acc -= 1;
      out.push(item);
    }
  }
  return out;
}

/** Roads, pavements, walls, bridges and painted markings. */
function Ground({ textures, city }: Pick<SceneProps, "textures" | "city">) {
  const group = useMemo(() => {
    const root = new THREE.Group();
    root.name = "ground";
    const ground = buildGround();
    const share = (m: THREE.Material) => {
      m.userData.sharedMap = true;
      return m;
    };
    const asphalt = share(
      new THREE.MeshStandardMaterial({ color: "#23262c", roughness: 0.62, roughnessMap: textures.asphalt, metalness: 0.02, envMapIntensity: 0.9 }),
    );
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, cast = false) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.receiveShadow = true;
      mesh.castShadow = cast;
      root.add(mesh);
      return mesh;
    };
    add(ground.road, asphalt);
    add(ground.pavement, share(new THREE.MeshStandardMaterial({ color: "#c9cdd3", map: textures.pavement, roughness: 0.86 })));
    add(ground.plaza, share(new THREE.MeshStandardMaterial({ color: "#d6d2c9", map: textures.plaza, roughness: 0.8 })));
    add(ground.harbor, new THREE.MeshStandardMaterial({ color: "#7c8087", roughness: 0.92 }));
    add(ground.walls, new THREE.MeshStandardMaterial({ color: "#8d9096", roughness: 0.9 }), true);

    const bridges = buildBridges();
    add(bridges.deck, asphalt);
    add(bridges.structure, new THREE.MeshStandardMaterial({ color: "#e4e7ea", roughness: 0.55, metalness: 0.1 }), true);
    root.add(new THREE.LineSegments(bridges.cables, new THREE.LineBasicMaterial({ color: "#eef2f5", transparent: true, opacity: 0.85 })));

    const paint = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.7,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const markings = markingsToMesh(buildMarkings(), paint);
    markings.receiveShadow = true;
    root.add(markings);
    add(buildRoundaboutRings(), paint);

    // Lawns for the generated parks.
    if (city.parks.length > 0) {
      const lawn = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: "#4b8a50", roughness: 1 }), city.parks.length);
      const m = new THREE.Matrix4();
      city.parks.forEach((r, i) => {
        m.makeScale(r.x1 - r.x0, 1, r.z1 - r.z0).setPosition((r.x0 + r.x1) / 2, CURB + 0.03, (r.z0 + r.z1) / 2);
        lawn.setMatrixAt(i, m);
      });
      lawn.receiveShadow = true;
      root.add(lawn);
    }
    return root;
  }, [textures, city]);
  useEffect(() => () => disposeObject(group), [group]);
  return <primitive object={group} />;
}

/** All generic buildings as two instanced meshes sharing the facade shader. */
function Buildings({ city }: Pick<SceneProps, "city">) {
  const group = useMemo(() => {
    const root = new THREE.Group();
    root.name = "buildings";
    const material = createFacadeMaterial();
    root.add(instancedBoxes(city.buildings, material, true));
    root.add(instancedBoxes(city.roofProps, material, true));
    return root;
  }, [city]);
  useEffect(() => () => disposeObject(group), [group]);
  return <primitive object={group} />;
}

function StreetProps({ city, textures }: Pick<SceneProps, "city" | "textures">) {
  const quality = useGameStore((s) => s.quality);
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const profile = QUALITY[quality];
  const preset = SKY_PRESETS[timeOfDay];
  const built = useMemo(() => {
    const root = new THREE.Group();
    root.name = "street-props";
    let glowMaterial: THREE.MeshBasicMaterial | null = null;
    const density = profile.propDensity;
    const vertex = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85 });
    const foliage = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, side: THREE.DoubleSide });

    const lamps = thin(city.lamps, Math.max(0.6, density));
    const poles = new THREE.InstancedMesh(lampPoleGeometry(), vertex, lamps.length);
    setInstances(poles, lamps);
    poles.castShadow = false;
    root.add(poles);
    const heads = new THREE.MeshBasicMaterial({ color: "#ffe2b0", toneMapped: false });
    const headMesh = new THREE.InstancedMesh(lampHeadGeometry(), heads, lamps.length);
    setInstances(headMesh, lamps);
    root.add(headMesh);

    if (profile.decorativeLights) {
      const glow = new THREE.MeshBasicMaterial({
        map: textures.glow,
        color: "#ffc98a",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      });
      glow.userData.sharedMap = true;
      glowMaterial = glow;
      const pools = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), glow, lamps.length);
      const m = new THREE.Matrix4();
      lamps.forEach((l, i) => {
        const reach = LAMP_REACH * l.scale;
        m.makeScale(17, 1, 17).setPosition(l.x + Math.cos(l.rot) * reach, l.y + 0.05 - CURB * 0.5, l.z - Math.sin(l.rot) * reach);
        pools.setMatrixAt(i, m);
      });
      pools.instanceMatrix.needsUpdate = true;
      pools.frustumCulled = false;
      pools.renderOrder = 2;
      root.add(pools);
    }

    const trees = thin(city.trees, density);
    const treeMesh = new THREE.InstancedMesh(treeGeometry(), vertex, trees.length);
    setInstances(treeMesh, trees);
    treeMesh.castShadow = true;
    root.add(treeMesh);

    const palms = thin(city.palms, Math.max(0.5, density));
    const palmMesh = new THREE.InstancedMesh(palmGeometry(), foliage, palms.length);
    setInstances(palmMesh, palms);
    palmMesh.castShadow = true;
    root.add(palmMesh);
    return { root, heads, glow: glowMaterial as THREE.MeshBasicMaterial | null };
  }, [city, textures, profile.propDensity, profile.decorativeLights]);

  useEffect(() => {
    built.heads.color.set("#ffe2b0").multiplyScalar(0.25 + preset.lampGlow * 1.9);
    if (built.glow) built.glow.opacity = preset.lampGlow * 0.42;
  }, [preset, built]);
  useEffect(() => () => disposeObject(built.root), [built]);
  return <primitive object={built.root} />;
}

/** Skybridges, overhead signs and the LED screens mounted on towers. */
function Structures({ city, textures, fontFamily }: SceneProps) {
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const preset = SKY_PRESETS[timeOfDay];
  const built = useMemo(() => {
    const root = new THREE.Group();
    root.name = "structures";
    const vertex = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.15 });
    const glow = new THREE.MeshBasicMaterial({ color: new THREE.Color("#9fd4ff").multiplyScalar(1.5), toneMapped: false });
    for (const s of city.skybridges) {
      const holder = new THREE.Group();
      holder.position.set(s.x, CURB, s.z);
      holder.rotation.y = s.axis === "x" ? 0 : Math.PI / 2;
      const bridge = new THREE.Mesh(skybridgeGeometry(s.span, s.height), vertex);
      bridge.castShadow = true;
      holder.add(bridge, new THREE.Mesh(skybridgeGlowGeometry(s.span, s.height), glow));
      root.add(holder);
    }

    const steel = new THREE.MeshStandardMaterial({ color: "#8d949c", roughness: 0.4, metalness: 0.8 });
    for (const g of GANTRIES) {
      const holder = new THREE.Group();
      holder.position.set(g.x, 0, g.z);
      holder.rotation.y = g.facing + Math.PI;
      const span = (g.halfWidth + 1.7) * 2;
      for (const side of [-1, 1]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 8.4, 10), steel);
        post.position.set((side * span) / 2, 4.2 + CURB, 0);
        holder.add(post);
      }
      const beam = new THREE.Mesh(new THREE.BoxGeometry(span, 0.5, 0.5), steel);
      beam.position.set(0, 8.2, 0);
      holder.add(beam);
      const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(span * 0.8, span * 0.2),
        new THREE.MeshBasicMaterial({ map: makeGantryTexture(fontFamily, g.entries), toneMapped: false }),
      );
      sign.position.set(0, 7.2, 0.3);
      holder.add(sign);
      const back = new THREE.Mesh(new THREE.BoxGeometry(span * 0.8, span * 0.2, 0.12), new THREE.MeshStandardMaterial({ color: "#2b3036", roughness: 0.7 }));
      back.position.set(0, 7.2, 0.22);
      holder.add(back);
      root.add(holder);
    }

    const screens = textures.billboards.map((map) => {
      const m = new THREE.MeshBasicMaterial({ map, toneMapped: false });
      m.userData.sharedMap = true;
      return m;
    });
    const frame = new THREE.MeshStandardMaterial({ color: "#14161b", roughness: 0.6, metalness: 0.5 });
    for (const b of city.billboards) {
      const holder = new THREE.Group();
      holder.position.set(b.x, b.y, b.z);
      holder.rotation.y = b.rot;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(b.w, b.h), screens[b.variant % screens.length]);
      face.position.z = 0.16;
      holder.add(face, new THREE.Mesh(new THREE.BoxGeometry(b.w + 0.6, b.h + 0.6, 0.3), frame));
      root.add(holder);
    }
    return { root, screens };
  }, [city, textures, fontFamily]);

  useEffect(() => {
    for (const m of built.screens) m.color.setScalar(0.75 + preset.emissive * 0.45);
  }, [preset, built]);
  useEffect(() => () => disposeObject(built.root), [built]);
  return <primitive object={built.root} />;
}

function Harbor({ city }: Pick<SceneProps, "city">) {
  const group = useMemo(() => {
    const root = new THREE.Group();
    root.name = "harbor";
    const containers = instancedBoxes(city.containers, new THREE.MeshStandardMaterial({ roughness: 0.72, metalness: 0.25 }), false);
    root.add(containers);
    const cranes = new THREE.InstancedMesh(craneGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.3 }), city.cranes.length);
    setInstances(cranes, city.cranes);
    cranes.castShadow = true;
    root.add(cranes);

    // A container ship waiting off the east shore.
    const hullMat = new THREE.MeshStandardMaterial({ color: "#1f2f45", roughness: 0.6 });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(28, 12, 170), hullMat);
    hull.position.set(ISLAND.x1 + 70, 2.5, 80);
    root.add(hull);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(22, 14, 16), new THREE.MeshStandardMaterial({ color: "#eceff1", roughness: 0.6 }));
    deck.position.set(ISLAND.x1 + 70, 15, 150);
    root.add(deck);
    const cargo = city.containers.slice(0, 220).map((c, i): BuildingBox => ({
      ...c,
      x: ISLAND.x1 + 60 + (i % 7) * 3.1,
      y: 8.5 + (Math.floor(i / 7) % 4) * 2.7,
      z: 6 + Math.floor(i / 28) * 13.4,
    }));
    root.add(instancedBoxes(cargo, new THREE.MeshStandardMaterial({ roughness: 0.72, metalness: 0.25 }), false));
    return root;
  }, [city]);
  useEffect(() => () => disposeObject(group), [group]);
  return <primitive object={group} />;
}

/** Sea and channel, moored and moving boats, and the marina piers. */
function Water({ textures }: Pick<SceneProps, "textures">) {
  const quality = useGameStore((s) => s.quality);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const rich = QUALITY[quality].richMaterials;
  const built = useMemo(() => {
    const root = new THREE.Group();
    root.name = "water";
    const normal = textures.waterNormal.clone();
    normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(320, 320);
    normal.needsUpdate = true;
    const material = new THREE.MeshStandardMaterial({
      color: "#1b4c66",
      roughness: rich ? 0.1 : 0.25,
      metalness: 0.75,
      normalMap: normal,
      normalScale: new THREE.Vector2(0.38, 0.38),
      envMapIntensity: 1.35,
    });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(7000, 7000).rotateX(-Math.PI / 2), material);
    sea.position.y = -1.3;
    sea.receiveShadow = false;
    root.add(sea);

    const boatMesh = new THREE.InstancedMesh(boatGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.1 }), 14);
    boatMesh.castShadow = true;
    root.add(boatMesh);

    // Marina piers reaching out from the south quay.
    const pier = new THREE.MeshStandardMaterial({ color: "#8a7a66", roughness: 0.95 });
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 16), pier);
      p.position.set(-186 + i * 26, -0.55, CHANNEL.z1 - 8);
      root.add(p);
    }
    return { root, normal, boats: boatMesh };
  }, [textures, rich]);

  const moving = useMemo(
    () => [
      { z: 160, speed: 4.2, phase: 0, dir: 1 },
      { z: 176, speed: 3.1, phase: 300, dir: -1 },
      { z: 150, speed: 5.0, phase: 620, dir: 1 },
      { z: 188, speed: 2.6, phase: 120, dir: -1 },
    ],
    [],
  );

  useFrame(({ clock }) => {
    const t = reducedMotion ? 0 : clock.elapsedTime;
    if (rich) built.normal.offset.set(t * 0.006, t * 0.004);
    const mesh = built.boats;
    const m = new THREE.Matrix4();
    const span = ISLAND.x1 - ISLAND.x0 + 500;
    moving.forEach((b, i) => {
      const along = (((b.phase + t * b.speed) % span) + span) % span;
      const x = b.dir > 0 ? ISLAND.x0 - 250 + along : ISLAND.x1 + 250 - along;
      // Boats pass under the bridges, so keep them low in the water.
      m.copy(mat4([x, -1.25 + Math.sin(t * 0.8 + i) * 0.06, b.z], [0, b.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0], [0.8, 0.8, 0.8]));
      mesh.setMatrixAt(i, m);
    });
    for (let i = 0; i < 10; i++) {
      const pierIndex = Math.floor(i / 2);
      const side = i % 2 === 0 ? -1 : 1;
      m.copy(mat4([-186 + pierIndex * 26 + side * 4.4, -1.2 + Math.sin(t * 0.7 + i * 1.3) * 0.05, CHANNEL.z1 - 9], [0, 0, 0], [0.62, 0.62, 0.62]));
      mesh.setMatrixAt(moving.length + i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  useEffect(
    () => () => {
      disposeObject(built.root);
      built.normal.dispose();
    },
    [built],
  );
  return <primitive object={built.root} />;
}

/** Hills, pines, the radio mast, wind turbines and the hilltop pagoda. */
function Backdrop() {
  const quality = useGameStore((s) => s.quality);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const density = QUALITY[quality].propDensity;
  const built = useMemo(() => {
    const root = new THREE.Group();
    root.name = "backdrop";
    const rotors: THREE.Object3D[] = [];
    const { geometry, heightAt } = hillsGeometry();
    const vertex = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 });
    const hills = new THREE.Mesh(geometry, vertex);
    hills.receiveShadow = true;
    root.add(hills);

    const pines = hillTreePoints(heightAt, Math.round(520 * density));
    const pineMesh = new THREE.InstancedMesh(pineGeometry(), vertex, pines.length);
    setInstances(pineMesh, pines);
    root.add(pineMesh);

    const place = (geo: THREE.BufferGeometry, x: number, z: number, scale = 1) => {
      const mesh = new THREE.Mesh(geo, vertex);
      mesh.position.set(x, heightAt(x, z) - 0.5, z);
      mesh.scale.setScalar(scale);
      root.add(mesh);
      return mesh;
    };
    const mast = place(radioMastGeometry(), -300, ISLAND.z0 - 150);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color("#ff3b30").multiplyScalar(2), toneMapped: false }));
    beacon.position.set(0, 79, 0);
    mast.add(beacon);
    place(pagodaGeometry(), -120, ISLAND.z0 - 118, 1.3);

    const rotorGeo = turbineRotorGeometry();
    const towerGeo = turbineTowerGeometry();
    for (const [x, dz] of [
      [120, 130],
      [200, 150],
      [285, 120],
      [370, 140],
      [450, 110],
    ]) {
      const tower = place(towerGeo, x, ISLAND.z0 - dz);
      const rotor = new THREE.Mesh(rotorGeo, vertex);
      rotor.position.set(0, 38.4, 2.4);
      rotor.rotation.z = x;
      tower.add(rotor);
      rotors.push(rotor);
    }
    return { root, rotors };
  }, [density]);
  useFrame((_, dt) => {
    if (reducedMotion) return;
    for (const r of built.rotors) r.rotation.z += dt * 0.9;
  });
  useEffect(() => () => disposeObject(built.root), [built]);
  return <primitive object={built.root} />;
}

/** Updates the shared facade uniforms when the time of day changes. */
function FacadeClock() {
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  useEffect(() => {
    const preset = SKY_PRESETS[timeOfDay];
    facadeUniforms.uWindowLit.value = preset.windowLit;
    facadeUniforms.uEmissive.value = preset.emissive;
  }, [timeOfDay]);
  return null;
}

export default function CityScene(props: SceneProps) {
  return (
    <group name="city">
      <FacadeClock />
      <Ground textures={props.textures} city={props.city} />
      <Buildings city={props.city} />
      <StreetProps city={props.city} textures={props.textures} />
      <Structures {...props} />
      <Harbor city={props.city} />
      <Water textures={props.textures} />
      <Backdrop />
    </group>
  );
}
