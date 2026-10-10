"use client";

import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useEffect } from "react";
import * as THREE from "three";
import { useGameStore } from "@/lib/game/store";
import { QUALITY } from "@/lib/utils/performance";
import { SKY_PRESETS } from "@/components/world/sky";

/**
 * Post-processing, used selectively: bloom for lit windows and neon, a light
 * vignette, and filmic tone mapping. The low profile skips the composer
 * entirely and tone-maps in the renderer instead.
 */
export default function Effects() {
  const quality = useGameStore((s) => s.quality);
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const profile = QUALITY[quality];
  const preset = SKY_PRESETS[timeOfDay];
  const gl = useThree((s) => s.gl);
  const enabled = profile.bloom || profile.vignette;

  useEffect(() => {
    gl.toneMapping = enabled ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
  }, [gl, enabled]);

  if (!enabled) return null;
  return (
    <EffectComposer multisampling={profile.antialias ? (quality === "high" ? 4 : 2) : 0} enableNormalPass={false}>
      <Bloom intensity={preset.bloom} luminanceThreshold={1.0} luminanceSmoothing={0.25} mipmapBlur radius={0.72} />
      <Vignette offset={0.28} darkness={profile.vignette ? 0.5 : 0} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
