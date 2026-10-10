"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { displayFont } from "@/app/fonts";
import { site } from "@/lib/data/portfolio";
import { buildCar } from "./model/car";

const VIEWS = [
  { id: "front34", label: "Front 3/4", position: [-4.2, 1.5, 5.2] },
  { id: "front", label: "Front", position: [0, 1.0, 7.2] },
  { id: "left", label: "Left side", position: [7.4, 1.0, 0] },
  { id: "rear34", label: "Rear 3/4", position: [4.2, 1.6, -5.4] },
  { id: "rear", label: "Rear", position: [0, 1.1, -7.2] },
  { id: "right", label: "Right side", position: [-7.4, 1.0, 0] },
  { id: "top", label: "Top", position: [0.01, 8.5, 0] },
  { id: "cockpit", label: "Cockpit", position: [-0.37, 1.08, -0.2] },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

function Car({ spin }: { spin: boolean }) {
  const car = useMemo(
    () => buildCar({ physical: true, plateText: site.plate, fontFamily: displayFont.style.fontFamily }),
    [],
  );
  const group = useRef<THREE.Group>(null);
  useEffect(() => () => car.dispose(), [car]);
  useFrame((_, dt) => {
    if (spin && group.current) group.current.rotation.y += dt * 0.25;
    for (const w of car.wheels) w.spinner.rotation.x += spin ? dt * 0.6 : 0;
  });
  return (
    <group ref={group}>
      <primitive object={car.root} />
    </group>
  );
}

function CameraRig({ view }: { view: ViewId }) {
  const { camera } = useThree();
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  useEffect(() => {
    const v = VIEWS.find((x) => x.id === view) ?? VIEWS[0];
    camera.position.set(v.position[0], v.position[1], v.position[2]);
    const target = view === "cockpit" ? new THREE.Vector3(-0.37, 0.98, 2) : new THREE.Vector3(0, 0.62, 0);
    if (controls.current) {
      controls.current.target.copy(target);
      controls.current.update();
    } else camera.lookAt(target);
  }, [camera, view]);
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={view === "cockpit" ? 0.05 : 3.2}
      maxDistance={12}
      maxPolarAngle={Math.PI / 2 - 0.03}
      enableDamping
    />
  );
}

export default function CarShowcase({ initialView = "front34" }: { initialView?: ViewId }) {
  const [view, setView] = useState<ViewId>(initialView);
  const [spin, setSpin] = useState(false);
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 32, near: 0.05, far: 80, position: [-4.2, 1.5, 5.2] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        data-testid="garage-canvas"
      >
        <color attach="background" args={["#0b0d12"]} />
        <fog attach="fog" args={["#0b0d12", 14, 40]} />
        <ambientLight intensity={0.25} />
        <spotLight position={[4, 9, 5]} angle={0.5} penumbra={1} intensity={90} castShadow shadow-mapSize={[1024, 1024]} />
        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#07080b"]} />
          <Lightformer form="rect" intensity={4} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 3, 1]} />
          <Lightformer form="rect" intensity={2.4} position={[-6, 2.2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[9, 1.4, 1]} />
          <Lightformer form="rect" intensity={2.4} position={[6, 2.2, -2]} rotation={[0, -Math.PI / 2, 0]} scale={[9, 1.4, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[0, 2.5, -8]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#9fc8ff" position={[0, 1.5, 8]} rotation={[0, Math.PI, 0]} scale={[8, 1.2, 1]} />
        </Environment>
        <Car spin={spin} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[30, 64]} />
          <meshStandardMaterial color="#0d0f14" roughness={0.55} metalness={0.3} />
        </mesh>
        <ContactShadows position={[0, 0.005, 0]} opacity={0.75} scale={9} blur={2.2} far={1.6} resolution={512} frames={spin ? Infinity : 2} />
        <CameraRig view={view} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-4">
        <div className="glass pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl p-1.5">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              aria-pressed={view === v.id}
              className={`display rounded-xl px-3 py-2 text-xs uppercase tracking-[0.16em] transition ${
                view === v.id ? "bg-white/12 text-fg" : "text-muted hover:bg-white/6 hover:text-fg"
              }`}
            >
              {v.label}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          <button
            type="button"
            onClick={() => setSpin((s) => !s)}
            aria-pressed={spin}
            className={`display rounded-xl px-3 py-2 text-xs uppercase tracking-[0.16em] transition ${
              spin ? "bg-sky/20 text-sky" : "text-muted hover:bg-white/6 hover:text-fg"
            }`}
          >
            Turntable
          </button>
        </div>
      </div>
    </div>
  );
}
