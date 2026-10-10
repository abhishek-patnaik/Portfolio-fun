import { describe, expect, it } from "vitest";
import { ColliderIndex } from "@/lib/game/collision";
import { DRIFT_GRACE, DRIFT_MAX_MULTIPLIER, DRIFT_MIN_ANGLE, createDriftRun, driftMultiplier, updateDriftRun, type DriftEvent } from "@/lib/game/drift";
import { DEFAULT_TUNING, FIXED_STEP, NEUTRAL_INPUT, advanceVehicle, createVehicleState, placeVehicle, stepVehicle, type PhysicsWorld } from "@/lib/game/physics";
import type { VehicleInput, VehicleState } from "@/types/vehicle";

const open: PhysicsWorld = { colliders: new ColliderIndex([]), groundHeight: () => 0 };
const DEG = Math.PI / 180;

/** A car already rolling north at `speed` m/s with the engine running. */
function rolling(speed: number): VehicleState {
  const s = createVehicleState({ x: 0, z: 0, heading: 0 });
  s.engineOn = true;
  s.vz = speed;
  s.speed = speed;
  return s;
}

type Script = (t: number) => Partial<VehicleInput>;

function drive(s: VehicleState, script: Script, seconds: number, each?: (s: VehicleState, t: number) => void, world: PhysicsWorld = open) {
  const steps = Math.round(seconds / FIXED_STEP);
  for (let n = 0; n < steps; n++) {
    const t = n * FIXED_STEP;
    stepVehicle(s, { ...NEUTRAL_INPUT, ...script(t) }, FIXED_STEP, world);
    each?.(s, t);
  }
}

/** Turn in under power and tap the handbrake between 0.3 s and 0.8 s. */
const flick =
  (steer: number, hold: Partial<VehicleInput> = { throttle: 1 }): Script =>
  (t) => ({ ...hold, steer, handbrake: t > 0.3 && t < 0.8 });

describe("drift handling", () => {
  it("does not start a drift in ordinary hard cornering", () => {
    // City speeds. (Flat out at full lock the tyres do scrub, as they should.)
    for (const speed of [10, 15, 22]) {
      const s = rolling(speed);
      let maxAngle = 0;
      drive(s, () => ({ throttle: 1, steer: 1 }), 2, (v) => (maxAngle = Math.max(maxAngle, Math.abs(v.slipAngle))));
      expect(s.drift, `drift at ${speed} m/s`).toBe(0);
      expect(maxAngle, `slip angle at ${speed} m/s`).toBeLessThan(10 * DEG);
      // Stays under the level at which marks (0.22) or smoke (0.3) would appear.
      expect(s.tyreSlip, `tyre slip at ${speed} m/s`).toBeLessThan(0.15);
    }
  });

  it("starts a drift with a handbrake flick and holds it on throttle and steering", () => {
    const s = rolling(25);
    const angles: number[] = [];
    drive(s, flick(1), 4, (v, t) => {
      if (t > 1.5) angles.push(Math.abs(v.slipAngle));
    });
    expect(s.drift).toBe(1);
    // A steady, controllable angle: well sideways, never spinning.
    expect(Math.min(...angles)).toBeGreaterThan(22 * DEG);
    expect(Math.max(...angles)).toBeLessThan(45 * DEG);
    expect(Math.max(...angles) - Math.min(...angles)).toBeLessThan(8 * DEG);
    // Steering right slides the tail left and keeps the car moving.
    expect(s.slipAngle).toBeLessThan(0);
    expect(s.speed).toBeGreaterThan(10);
    expect(s.tyreSlip).toBeGreaterThan(0.8);
  });

  it("turns the way it is steered while drifting", () => {
    const right = rolling(25);
    drive(right, flick(1), 3);
    const left = rolling(25);
    drive(left, flick(-1), 3);
    // Right turns decrease the heading; the two runs mirror each other.
    expect(right.yawRate).toBeLessThan(-0.4);
    expect(left.yawRate).toBeGreaterThan(0.4);
    expect(left.slipAngle).toBeCloseTo(-right.slipAngle, 3);
    expect(left.x).toBeCloseTo(-right.x, 2);
  });

  it("gives more angle for more steering lock", () => {
    const half = rolling(25);
    drive(half, flick(0.6), 3.5);
    const full = rolling(25);
    drive(full, flick(1), 3.5);
    expect(Math.abs(half.slipAngle)).toBeGreaterThan(12 * DEG);
    expect(Math.abs(full.slipAngle)).toBeGreaterThan(Math.abs(half.slipAngle) + 5 * DEG);
  });

  it("swings into the opposite drift on opposite lock", () => {
    const s = rolling(25);
    let through = 0;
    drive(
      s,
      (t) => ({ throttle: 1, steer: t < 2 ? 1 : -1, handbrake: t > 0.3 && t < 0.8 }),
      4.5,
      (v, t) => {
        if (t > 2 && Math.abs(v.slipAngle) < 2 * DEG) through++;
      },
    );
    expect(through).toBeGreaterThan(0);
    expect(s.slipAngle).toBeGreaterThan(22 * DEG);
    expect(s.drift).toBe(1);
  });

  it("straightens up when the driver eases off", () => {
    const s = rolling(25);
    drive(s, (t) => ({ throttle: t < 2 ? 1 : 0, steer: t < 2 ? 1 : 0, handbrake: t > 0.3 && t < 0.8 }), 2);
    expect(Math.abs(s.slipAngle)).toBeGreaterThan(22 * DEG);
    drive(s, () => ({}), 1.2);
    expect(Math.abs(s.slipAngle)).toBeLessThan(2 * DEG);
    expect(s.drift).toBe(0);
    expect(s.tyreSlip).toBeLessThan(0.05);
    expect(Math.abs(s.yawRate)).toBeLessThan(0.02);
  });

  it("kicks the tail out under boost at full lock, but not without boost", () => {
    const boosted = rolling(22);
    drive(boosted, () => ({ throttle: 1, steer: 1, boost: true }), 2.5);
    expect(Math.abs(boosted.slipAngle)).toBeGreaterThan(20 * DEG);
    const plain = rolling(22);
    drive(plain, () => ({ throttle: 1, steer: 1 }), 2.5);
    expect(plain.drift).toBe(0);
  });

  it("never spins, whatever is held down", () => {
    for (const speed of [12, 25, 40, 60]) {
      for (const steer of [1, -1]) {
        const s = rolling(speed);
        let maxAngle = 0;
        drive(s, () => ({ throttle: 1, steer, handbrake: true, boost: true }), 6, (v) => (maxAngle = Math.max(maxAngle, Math.abs(v.slipAngle))));
        expect(maxAngle, `${speed} m/s`).toBeLessThan(70 * DEG);
        expect(Number.isFinite(s.x) && Number.isFinite(s.heading)).toBe(true);
      }
    }
  });

  it("will not drift below the minimum speed", () => {
    const s = rolling(DEFAULT_TUNING.driftMinSpeed - 3);
    drive(s, () => ({ steer: 1, handbrake: true }), 1.5);
    expect(s.drift).toBe(0);
  });

  it("shows the opposite lock on the front wheels", () => {
    const s = rolling(25);
    drive(s, (t) => ({ throttle: 1, steer: t < 2 ? 1 : -1, handbrake: t > 0.3 && t < 0.8 }), 2.3);
    // The physical steering limit at this speed is a few degrees; the drawn wheels go much further.
    expect(s.steerVisual).toBeLessThan(-10 * DEG);
    expect(Math.abs(s.steerVisual)).toBeLessThanOrEqual(0.5 + 1e-6);
  });

  it("drifts the same way at any frame rate", () => {
    const script = flick(1);
    const simulate = (hz: number) => {
      const s = rolling(25);
      let acc = 0;
      // Inputs are sampled once per rendered frame, as in the game.
      for (let f = 0; f < Math.round(3 * hz); f++) acc = advanceVehicle(s, { ...NEUTRAL_INPUT, ...script(f / hz) }, 1 / hz, acc, open);
      return s;
    };
    const a = simulate(30);
    const b = simulate(144);
    expect(Math.abs(a.slipAngle - b.slipAngle)).toBeLessThan(2 * DEG);
    expect(Math.abs(a.speed - b.speed)).toBeLessThan(1);
    expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeLessThan(3);
  });

  it("clears the drift state when the car is placed", () => {
    const s = rolling(25);
    drive(s, flick(1), 2);
    placeVehicle(s, { x: 5, z: 5, heading: 1 }, open);
    expect([s.drift, s.slipAngle, s.tyreSlip, s.steerVisual, s.steerSmooth]).toEqual([0, 0, 0, 0, 0]);
  });
});

describe("drift scoring", () => {
  const motion = (speed: number, angleDeg: number, sinceCollision = 10) => ({ speed, slipAngle: angleDeg * DEG, sinceCollision });
  const feed = (run: ReturnType<typeof createDriftRun>, m: ReturnType<typeof motion>, seconds: number): DriftEvent[] => {
    const events: DriftEvent[] = [];
    for (let i = 0; i < Math.round(seconds * 60); i++) {
      const e = updateDriftRun(run, m, 1 / 60);
      if (e !== "none") events.push(e);
    }
    return events;
  };

  it("ignores small angles and low speeds", () => {
    const run = createDriftRun();
    expect(feed(run, motion(30, (DRIFT_MIN_ANGLE / DEG) * 0.8), 2)).toEqual([]);
    expect(feed(run, motion(4, 40), 2)).toEqual([]);
    expect(run.active).toBe(false);
    expect(run.points).toBe(0);
  });

  it("builds points with angle, speed and time, then banks them", () => {
    const run = createDriftRun();
    expect(feed(run, motion(20, 30), 1)).toEqual(["start"]);
    const afterOne = run.points;
    expect(afterOne).toBeGreaterThan(40);
    expect(afterOne).toBeLessThan(80);
    feed(run, motion(20, 30), 1);
    expect(run.points).toBeGreaterThan(afterOne * 1.9);
    const total = Math.round(run.points);

    expect(feed(run, motion(20, 0), DRIFT_GRACE + 0.1)).toEqual(["bank"]);
    expect(run.active).toBe(false);
    expect(run.lastPoints).toBe(total);
    expect(run.lastLost).toBe(false);
    expect(run.best).toBe(total);
    expect(run.points).toBe(0);
    expect(run.version).toBe(1);
  });

  it("scores a faster, wider drift higher", () => {
    const slow = createDriftRun();
    feed(slow, motion(12, 20), 2);
    const fast = createDriftRun();
    feed(fast, motion(30, 40), 2);
    expect(fast.points).toBeGreaterThan(slow.points * 3);
  });

  it("raises the multiplier with time held, up to a cap", () => {
    expect(driftMultiplier(0)).toBe(1);
    expect(driftMultiplier(2.1)).toBe(1.5);
    expect(driftMultiplier(4.5)).toBe(2);
    expect(driftMultiplier(999)).toBe(DRIFT_MAX_MULTIPLIER);
    const run = createDriftRun();
    feed(run, motion(20, 30), 4.2);
    expect(run.multiplier).toBe(2);
  });

  it("keeps a run alive through a quick change of direction", () => {
    const run = createDriftRun();
    feed(run, motion(20, 30), 1.5);
    const before = run.points;
    expect(feed(run, motion(20, 3), DRIFT_GRACE * 0.6)).toEqual([]);
    expect(run.active).toBe(true);
    expect(feed(run, motion(20, -30), 1)).toEqual([]);
    expect(run.points).toBeGreaterThan(before);
    expect(run.time).toBeCloseTo(2.5, 1);
  });

  it("loses the unbanked points on contact and keeps the previous best", () => {
    const run = createDriftRun(500);
    feed(run, motion(20, 30), 2);
    expect(run.points).toBeGreaterThan(100);
    expect(updateDriftRun(run, motion(20, 30, 0), 1 / 60)).toBe("lost");
    expect(run.active).toBe(false);
    expect(run.lastLost).toBe(true);
    expect(run.best).toBe(500);
    // Still touching: nothing starts while the car is against the wall.
    expect(feed(run, motion(20, 30, 0.05), 0.5)).toEqual([]);
  });

  it("does not announce a slide too short to matter", () => {
    const run = createDriftRun();
    feed(run, motion(9, 13), 0.2);
    expect(feed(run, motion(9, 0), DRIFT_GRACE + 0.1)).toEqual([]);
    expect(run.version).toBe(0);
    expect(run.best).toBe(0);
  });

  it("scores a real simulated drift", () => {
    const s = rolling(25);
    const run = createDriftRun();
    const events: DriftEvent[] = [];
    drive(s, (t) => ({ throttle: t < 3.5 ? 1 : 0.3, steer: t < 3.5 ? 1 : 0, handbrake: t > 0.3 && t < 0.8 }), 6, (v) => {
      const e = updateDriftRun(run, v, FIXED_STEP);
      if (e !== "none") events.push(e);
    });
    expect(events).toEqual(["start", "bank"]);
    expect(run.best).toBeGreaterThan(150);
  });
});
