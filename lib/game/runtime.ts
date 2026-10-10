/**
 * Mutable, non-React state that changes every frame.
 *
 * Vehicle motion, the camera and guidance are updated inside the render loop
 * and read directly by the HUD through refs, so driving never triggers React
 * re-renders. Only slow-changing facts (district, nearby landmark…) go into the
 * zustand store.
 */
import type { VehiclePose, VehicleState } from "@/types/vehicle";
import type { RouteResult } from "@/types/world";
import { SPAWN } from "@/lib/world/layout";
import type { Guidance } from "./navigation";
import { createDriftRun, type DriftRun } from "./drift";
import { createVehicleState, type PhysicsWorld } from "./physics";

export interface Runtime {
  vehicle: VehicleState;
  world: PhysicsWorld | null;
  lastSafe: VehiclePose;
  route: RouteResult | null;
  routeVersion: number;
  guidance: Guidance | null;
  /** Free-look offsets applied on top of the active camera, radians. */
  look: { yaw: number; pitch: number; idle: number };
  /** One-shot commands consumed by the vehicle controller on the next frame. */
  pendingTeleport: VehiclePose | null;
  pendingRecover: boolean;
  /** After fast travel, prefer this destination's prompt until the car moves away. */
  preferredDestination: string | null;
  stats: { fps: number; calls: number; triangles: number; frameMs: number; skidMarks: number; smoke: boolean };
  /** Seconds the throttle has been held with the car not moving. */
  stuckTimer: number;
  /** Current drift run and the best one of this visit. */
  drift: DriftRun;
  /**
   * Fixed camera for screenshots and debugging. When set, it replaces the
   * driving camera until cleared: `__world.runtime.cameraOverride = null`.
   */
  cameraOverride: { position: [number, number, number]; target: [number, number, number]; fov?: number } | null;
}

export const runtime: Runtime = {
  vehicle: createVehicleState(SPAWN),
  world: null,
  lastSafe: { ...SPAWN },
  route: null,
  routeVersion: 0,
  guidance: null,
  look: { yaw: 0, pitch: 0, idle: 0 },
  pendingTeleport: null,
  pendingRecover: false,
  preferredDestination: null,
  stats: { fps: 0, calls: 0, triangles: 0, frameMs: 0, skidMarks: 0, smoke: false },
  stuckTimer: 0,
  drift: createDriftRun(),
  cameraOverride: null,
};

export function resetRuntime(): void {
  runtime.vehicle = createVehicleState(SPAWN);
  runtime.lastSafe = { ...SPAWN };
  runtime.route = null;
  runtime.routeVersion++;
  runtime.guidance = null;
  runtime.look = { yaw: 0, pitch: 0, idle: 0 };
  runtime.pendingTeleport = null;
  runtime.pendingRecover = false;
  runtime.preferredDestination = null;
  runtime.stuckTimer = 0;
  runtime.drift = createDriftRun(runtime.drift.best);
}
