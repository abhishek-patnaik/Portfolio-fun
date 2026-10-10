"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { CityData } from "@/types/world";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { SPAWN } from "@/lib/world/layout";
import { QUALITY } from "@/lib/utils/performance";
import CameraRig from "@/components/vehicle/CameraRig";
import DriftEffects from "@/components/vehicle/DriftEffects";
import Vehicle from "@/components/vehicle/Vehicle";
import type { CarModel } from "@/components/vehicle/model/car";
import CityScene from "@/components/world/CityScene";
import WorldEnvironment from "@/components/world/Environment";
import Landmarks from "@/components/world/Landmarks";
import RouteGuide from "@/components/world/RouteGuide";
import type { WorldTextures } from "@/components/world/textures";
import Effects from "./Effects";

export interface WorldAssets {
  car: CarModel;
  city: CityData;
  textures: WorldTextures;
  fontFamily: string;
}

/** Compiles shaders up front, then reports the first rendered frame. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree();
  const frames = useRef(0);
  const done = useRef(false);
  useEffect(() => {
    void gl.compileAsync(scene, camera).catch(() => undefined);
  }, [gl, scene, camera]);
  useFrame(() => {
    if (done.current) return;
    frames.current++;
    if (frames.current >= 3) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

/** Samples renderer statistics once a second for the settings panel and tests. */
function PerfProbe() {
  const gl = useThree((s) => s.gl);
  const acc = useRef({ time: 0, frames: 0 });
  useFrame((_, dt) => {
    const a = acc.current;
    a.time += dt;
    a.frames++;
    if (a.time >= 1) {
      runtime.stats.fps = Math.round(a.frames / a.time);
      runtime.stats.frameMs = Math.round((a.time / a.frames) * 1000);
      runtime.stats.calls = gl.info.render.calls;
      runtime.stats.triangles = gl.info.render.triangles;
      a.time = 0;
      a.frames = 0;
    }
  });
  return null;
}

interface Props {
  assets: WorldAssets;
  onReady: () => void;
  onContextLost: () => void;
}

export default function GameCanvas({ assets, onReady, onContextLost }: Props) {
  const quality = useGameStore((s) => s.quality);
  const overlay = useGameStore((s) => s.overlay);
  const phase = useGameStore((s) => s.phase);
  const profile = QUALITY[quality];
  // Nothing moves behind an open interface, so stop rendering continuously.
  // Settings stays live so quality and lighting changes are visible at once.
  const idle = phase === "driving" && overlay !== "none" && overlay !== "settings";

  return (
    <Canvas
      className="!absolute inset-0"
      data-testid="world-canvas"
      dpr={[1, profile.maxDpr]}
      shadows={profile.shadows ? "percentage" : false}
      frameloop={idle ? "demand" : "always"}
      gl={{ antialias: false, powerPreference: "high-performance", stencil: false, alpha: false }}
      camera={{ fov: 50, near: 0.3, far: 3000, position: [SPAWN.x - 5, 2, SPAWN.z + 9] }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost();
        });
      }}
    >
      <WorldEnvironment />
      <CityScene city={assets.city} textures={assets.textures} fontFamily={assets.fontFamily} />
      <Landmarks textures={assets.textures} fontFamily={assets.fontFamily} />
      <Vehicle car={assets.car} textures={assets.textures} />
      <DriftEffects />
      <RouteGuide textures={assets.textures} />
      <CameraRig car={assets.car} />
      <Effects />
      <PerfProbe />
      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
