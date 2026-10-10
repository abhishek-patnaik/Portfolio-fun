"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { QUALITY } from "@/lib/utils/performance";
import { SKY_PRESETS, applySkyPreset, bakeEnvironment, createSkyMaterial } from "./sky";

/**
 * Sky dome, fog, sun and ambient light, and the baked reflection environment.
 * Everything here follows the time-of-day preset and the quality profile.
 */
export default function WorldEnvironment() {
  const timeOfDay = useGameStore((s) => s.timeOfDay);
  const quality = useGameStore((s) => s.quality);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const preset = SKY_PRESETS[timeOfDay];
  const profile = QUALITY[quality];
  const { gl, scene, camera } = useThree();
  const dome = useRef<THREE.Mesh>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const material = useMemo(() => createSkyMaterial(), []);
  const sunDirection = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    applySkyPreset(material, preset);
    const target = bakeEnvironment(gl, preset);
    scene.environment = target.texture;
    scene.environmentIntensity = preset.envIntensity;
    gl.toneMappingExposure = preset.exposure;
    sunDirection.set(...preset.sunDirection).normalize();
    return () => {
      scene.environment = null;
      target.dispose();
    };
  }, [gl, scene, material, preset, sunDirection]);

  useEffect(() => {
    const fog = new THREE.Fog(preset.fog, profile.drawDistance * preset.fogRange[0], profile.drawDistance * preset.fogRange[1]);
    scene.fog = fog;
    const cam = camera as THREE.PerspectiveCamera;
    cam.far = profile.drawDistance * 1.25;
    cam.updateProjectionMatrix();
    return () => {
      scene.fog = null;
    };
  }, [scene, camera, preset, profile.drawDistance]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame(({ clock }) => {
    if (dome.current) dome.current.position.copy(camera.position);
    if (!reducedMotion) material.uniforms.uTime.value = clock.elapsedTime;
    const light = sun.current;
    if (light) {
      // The shadow frustum follows the car so a modest map stays sharp.
      const v = runtime.vehicle;
      light.target.position.set(v.x, 0, v.z);
      light.position.set(v.x + sunDirection.x * 320, sunDirection.y * 320, v.z + sunDirection.z * 320);
      light.target.updateMatrixWorld();
    }
  });

  const range = profile.shadowRange;
  return (
    <>
      <mesh ref={dome} material={material} renderOrder={-10} frustumCulled={false}>
        <sphereGeometry args={[20, 32, 16]} />
      </mesh>
      <hemisphereLight args={[preset.hemiSky, preset.hemiGround, preset.hemiIntensity]} />
      <directionalLight
        ref={sun}
        color={preset.sunColor}
        intensity={preset.sunIntensity}
        castShadow={profile.shadows}
        shadow-mapSize={[profile.shadowMapSize, profile.shadowMapSize]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.5}
      >
        <orthographicCamera attach="shadow-camera" args={[-range, range, range, -range, 20, 900]} />
      </directionalLight>
    </>
  );
}
