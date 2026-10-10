import { describe, expect, it } from "vitest";
import { ColliderIndex } from "@/lib/game/collision";
import {
  DEFAULT_TUNING,
  FIXED_STEP,
  NEUTRAL_INPUT,
  advanceVehicle,
  createVehicleState,
  gearLabel,
  placeVehicle,
  speedKmh,
  steerLimit,
  stepVehicle,
  type PhysicsWorld,
} from "@/lib/game/physics";
import type { VehicleInput, VehicleState } from "@/types/vehicle";

const open: PhysicsWorld = { colliders: new ColliderIndex([]), groundHeight: () => 0 };
const input = (partial: Partial<VehicleInput>): VehicleInput => ({ ...NEUTRAL_INPUT, ...partial });

function fresh(heading = 0): VehicleState {
  const s = createVehicleState({ x: 0, z: 0, heading });
  s.engineOn = true;
  return s;
}

function run(s: VehicleState, i: VehicleInput, seconds: number, world: PhysicsWorld = open) {
  const steps = Math.round(seconds / FIXED_STEP);
  for (let n = 0; n < steps; n++) stepVehicle(s, i, FIXED_STEP, world);
}

describe("vehicle physics", () => {
  it("stays still with no input", () => {
    const s = fresh();
    run(s, NEUTRAL_INPUT, 2);
    expect(s.speed).toBe(0);
    expect(s.z).toBe(0);
  });

  it("does not accelerate with the engine off", () => {
    const s = createVehicleState({ x: 0, z: 0, heading: 0 });
    run(s, input({ throttle: 1 }), 2);
    expect(s.speed).toBe(0);
    expect(gearLabel(s)).toBe("P");
  });

  it("accelerates gradually towards a top speed", () => {
    const s = fresh();
    run(s, input({ throttle: 1 }), 0.5);
    const early = s.speed;
    expect(early).toBeGreaterThan(2);
    expect(early).toBeLessThan(8);
    run(s, input({ throttle: 1 }), 11);
    expect(s.speed).toBeGreaterThan(36);
    expect(s.speed).toBeLessThanOrEqual(DEFAULT_TUNING.maxSpeed);
    expect(s.z).toBeGreaterThan(280);
    expect(Math.abs(s.x)).toBeLessThan(1e-6);
  });

  it("brakes to a stop, then reverses up to the reverse limit", () => {
    const s = fresh();
    run(s, input({ throttle: 1 }), 4);
    const cruising = s.speed;
    run(s, input({ brake: 1 }), 0.5);
    expect(s.speed).toBeLessThan(cruising - 8);
    expect(s.speed).toBeGreaterThanOrEqual(0);
    run(s, input({ brake: 1 }), 8);
    expect(s.speed).toBeLessThan(-3);
    expect(Math.abs(s.speed)).toBeLessThanOrEqual(DEFAULT_TUNING.maxReverseSpeed + 0.01);
    expect(gearLabel(s)).toBe("R");
  });

  it("coasts down under rolling resistance and engine braking", () => {
    const s = fresh();
    run(s, input({ throttle: 1 }), 3);
    const before = s.speed;
    run(s, NEUTRAL_INPUT, 3);
    expect(s.speed).toBeLessThan(before);
    expect(s.speed).toBeGreaterThanOrEqual(0);
    run(s, NEUTRAL_INPUT, 60);
    expect(s.speed).toBe(0);
  });

  it("steers right and left in the expected direction", () => {
    const right = fresh(0);
    run(right, input({ throttle: 1 }), 1.5);
    run(right, input({ throttle: 0.5, steer: 1 }), 1.5);
    // Heading 0 faces +Z; the driver's right is -X.
    expect(right.x).toBeLessThan(-1);
    expect(right.heading).toBeLessThan(0);

    const left = fresh(0);
    run(left, input({ throttle: 1 }), 1.5);
    run(left, input({ throttle: 0.5, steer: -1 }), 1.5);
    expect(left.x).toBeGreaterThan(1);
    expect(left.x).toBeCloseTo(-right.x, 3);
  });

  it("reduces the steering limit as speed rises", () => {
    expect(steerLimit(0)).toBe(DEFAULT_TUNING.maxSteerLow);
    expect(steerLimit(15)).toBeLessThan(steerLimit(5));
    expect(steerLimit(45)).toBeLessThan(steerLimit(15));
    expect(steerLimit(200)).toBe(DEFAULT_TUNING.maxSteerHigh);
  });

  it("changes steering angle gradually, never instantly", () => {
    const s = fresh();
    stepVehicle(s, input({ steer: 1 }), FIXED_STEP, open);
    expect(s.steerAngle).toBeGreaterThan(0);
    expect(s.steerAngle).toBeLessThan(0.05);
  });

  it("slides more with the handbrake than without", () => {
    const grip = fresh();
    run(grip, input({ throttle: 1 }), 3);
    run(grip, input({ steer: 1 }), 0.6);
    const drift = fresh();
    run(drift, input({ throttle: 1 }), 3);
    run(drift, input({ steer: 1, handbrake: true }), 0.6);
    expect(Math.abs(drift.slip)).toBeGreaterThan(Math.abs(grip.slip) * 1.5);
  });

  it("boost raises speed and drains, then recharges", () => {
    const normal = fresh();
    run(normal, input({ throttle: 1 }), 6);
    const boosted = fresh();
    run(boosted, input({ throttle: 1, boost: true }), 6);
    expect(boosted.speed).toBeGreaterThan(normal.speed + 3);
    expect(boosted.boost).toBeLessThan(0.2);
    run(boosted, NEUTRAL_INPUT, 15);
    expect(boosted.boost).toBe(1);
  });

  it("is independent of frame rate", () => {
    const script = (t: number): VehicleInput => {
      if (t < 2) return input({ throttle: 1 });
      if (t < 3.5) return input({ throttle: 0.6, steer: 0.7 });
      if (t < 4.5) return input({ throttle: 1, steer: -0.5 });
      if (t < 5.2) return input({ brake: 1 });
      return input({ throttle: 0.8 });
    };
    const simulate = (fps: number) => {
      const s = fresh(Math.PI);
      let acc = 0;
      const frame = 1 / fps;
      for (let n = 0; n < 6 * fps; n++) {
        acc = advanceVehicle(s, script(n / fps), frame, acc, open);
      }
      return s;
    };
    const a = simulate(30);
    const b = simulate(60);
    const c = simulate(144);
    for (const other of [b, c]) {
      expect(Math.abs(other.x - a.x)).toBeLessThan(1.2);
      expect(Math.abs(other.z - a.z)).toBeLessThan(1.2);
      expect(Math.abs(other.speed - a.speed)).toBeLessThan(0.6);
      expect(Math.abs(other.heading - a.heading)).toBeLessThan(0.05);
    }
  });

  it("caps very long frames instead of tunnelling", () => {
    const s = fresh();
    const acc = advanceVehicle(s, input({ throttle: 1 }), 5, 0, open);
    expect(acc).toBeLessThan(FIXED_STEP);
    expect(s.z).toBeLessThan(1);
  });
});

describe("collisions", () => {
  const wall: PhysicsWorld = {
    colliders: new ColliderIndex([{ type: "box", x0: -50, x1: 50, z0: 40, z1: 44 }]),
    groundHeight: () => 0,
  };

  it("stops at a wall without passing through or spinning", () => {
    const s = fresh(0);
    run(s, input({ throttle: 1 }), 8, wall);
    expect(s.z + 1.3 + DEFAULT_TUNING.collisionRadius).toBeLessThanOrEqual(40.05);
    expect(Math.abs(s.heading)).toBeLessThan(0.01);
    expect(Math.abs(s.speed)).toBeLessThan(3);
  });

  it("glances along a wall hit at a shallow angle", () => {
    const s = fresh(0.35);
    run(s, input({ throttle: 1 }), 7, wall);
    expect(s.z).toBeLessThan(40);
    expect(s.x).toBeGreaterThan(15);
    expect(Number.isFinite(s.heading)).toBe(true);
    expect(Math.abs(s.yawRate)).toBeLessThan(2);
  });

  it("can reverse away from a wall", () => {
    const s = fresh(0);
    run(s, input({ throttle: 1 }), 6, wall);
    const stuckAt = s.z;
    run(s, input({ brake: 1 }), 3, wall);
    expect(s.z).toBeLessThan(stuckAt - 3);
  });

  it("recovery places the car at rest and keeps the odometer", () => {
    const s = fresh(0);
    run(s, input({ throttle: 1 }), 3);
    const odo = s.odometer;
    placeVehicle(s, { x: 10, z: 20, heading: 1 }, open);
    expect(s.x).toBe(10);
    expect(s.z).toBe(20);
    expect(s.speed).toBe(0);
    expect(s.vx).toBe(0);
    expect(s.engineOn).toBe(true);
    expect(s.odometer).toBe(odo);
    expect(speedKmh(s)).toBe(0);
  });

  it("follows ground height and pitches on a slope", () => {
    const ramp: PhysicsWorld = { colliders: new ColliderIndex([]), groundHeight: (_x, z) => Math.max(0, z * 0.1) };
    const s = fresh(0);
    run(s, input({ throttle: 1 }), 3, ramp);
    expect(s.y).toBeGreaterThan(0.5);
    expect(s.pitch).toBeGreaterThan(0.05);
  });
});
