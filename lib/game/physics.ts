/**
 * Arcade vehicle model.
 *
 * `stepVehicle` is a pure function of (state, input, dt, world). It is always
 * called with the same fixed dt, so handling does not depend on the display
 * refresh rate. `advanceVehicle` is the accumulator that maps variable frame
 * times onto fixed steps.
 */
import type { VehicleInput, VehiclePose, VehicleState, VehicleTuning } from "@/types/vehicle";
import { WORLD_BOUNDS, wrapAngle } from "@/lib/world/layout";
import { circleContact, type ColliderIndex } from "./collision";

export const FIXED_STEP = 1 / 120;
export const MAX_FRAME_TIME = 0.1;
export const WHEEL_RADIUS = 0.33;

export const DEFAULT_TUNING: VehicleTuning = {
  wheelBase: 2.55,
  maxSpeed: 52,
  maxReverseSpeed: 11,
  boostSpeed: 68,
  engineAccel: 9.5,
  boostAccel: 15,
  brakeDecel: 23,
  reverseAccel: 5.5,
  rollingResistance: 0.35,
  drag: 0.0009,
  engineBrake: 1.3,
  maxSteerLow: 0.58,
  maxSteerHigh: 0.035,
  steerRate: 2.4,
  steerReturnRate: 4.2,
  grip: 9,
  handbrakeGrip: 1.7,
  handbrakeDecel: 6.5,
  driftGrip: 1.5,
  driftMinSpeed: 8,
  driftYaw: 1.3,
  driftAlign: 1.9,
  driftMaxAngle: 0.95,
  driftBuild: 5,
  driftRelease: 1.5,
  restitution: 0.22,
  collisionRadius: 0.95,
  collisionOffsets: [1.3, 0, -1.3],
};

/** Peak cornering acceleration the tyres allow, m/s². Shapes speed-sensitive steering. */
const MAX_LATERAL_ACCEL = 12.5;
const GEAR_TOP_SPEEDS = [0, 13, 23, 34, 45, 72];
const IDLE_RPM = 0.14;

export interface PhysicsWorld {
  colliders: ColliderIndex;
  groundHeight: (x: number, z: number) => number;
}

export const NEUTRAL_INPUT: VehicleInput = { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false };

export function createVehicleState(pose: VehiclePose): VehicleState {
  return {
    x: pose.x,
    z: pose.z,
    y: 0,
    heading: pose.heading,
    vx: 0,
    vz: 0,
    speed: 0,
    slip: 0,
    steerAngle: 0,
    steerSmooth: 0,
    steerVisual: 0,
    drift: 0,
    slipAngle: 0,
    tyreSlip: 0,
    pitch: 0,
    wheelSpin: 0,
    rpm: 0,
    gear: 0,
    boost: 1,
    boosting: false,
    engineOn: false,
    reversing: false,
    sinceCollision: 10,
    impact: 0,
    accel: 0,
    yawRate: 0,
    odometer: 0,
  };
}

/** Largest steering angle that keeps cornering force within the tyre limit. */
export function steerLimit(speed: number, tuning: VehicleTuning = DEFAULT_TUNING): number {
  const v = Math.abs(speed);
  if (v < 1) return tuning.maxSteerLow;
  const limit = Math.atan((tuning.wheelBase * MAX_LATERAL_ACCEL) / (v * v));
  return Math.min(tuning.maxSteerLow, Math.max(tuning.maxSteerHigh, limit));
}

function approach(current: number, target: number, maxDelta: number): number {
  if (current < target) return Math.min(target, current + maxDelta);
  return Math.max(target, current - maxDelta);
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function stepVehicle(
  s: VehicleState,
  input: VehicleInput,
  dt: number,
  world: PhysicsWorld,
  tuning: VehicleTuning = DEFAULT_TUNING,
): void {
  const sinH = Math.sin(s.heading);
  const cosH = Math.cos(s.heading);
  // Forward is (sinH, cosH); right is (-cosH, sinH).
  let vF = s.vx * sinH + s.vz * cosH;
  let vL = -s.vx * cosH + s.vz * sinH;
  const vFBefore = vF;

  const throttle = s.engineOn ? clamp01(input.throttle) : 0;
  const brake = clamp01(input.brake);
  const steerIn = Math.min(1, Math.max(-1, input.steer));

  // Boost energy.
  s.boosting = input.boost && throttle > 0.1 && s.boost > 0.02 && vF > 1;
  if (s.boosting) s.boost = Math.max(0, s.boost - dt / 4.5);
  else s.boost = Math.min(1, s.boost + dt / 12);

  // Longitudinal forces.
  s.reversing = false;
  if (throttle > 0) {
    if (vF < -0.4) {
      vF = Math.min(0, vF + tuning.brakeDecel * throttle * dt);
    } else {
      const top = s.boosting ? tuning.boostSpeed : tuning.maxSpeed;
      const power = s.boosting ? tuning.boostAccel : tuning.engineAccel;
      const fade = Math.max(0, 1 - Math.pow(Math.max(0, vF) / top, 1.7));
      vF += power * throttle * fade * dt;
    }
  }
  if (brake > 0) {
    if (vF > 0.4) {
      vF = Math.max(0, vF - tuning.brakeDecel * brake * dt);
    } else if (throttle === 0 && s.engineOn) {
      s.reversing = true;
      const fade = Math.max(0, 1 - Math.abs(Math.min(0, vF)) / tuning.maxReverseSpeed);
      vF -= tuning.reverseAccel * brake * fade * dt;
    } else if (vF > 0) {
      vF = Math.max(0, vF - tuning.brakeDecel * brake * dt);
    }
  }

  // Passive resistance never reverses the direction of travel.
  const coasting = throttle === 0 && !s.reversing;
  let resist = tuning.rollingResistance + tuning.drag * vF * vF + (coasting ? tuning.engineBrake : 0);
  if (input.handbrake) resist += tuning.handbrakeDecel;
  if (vF > 0) vF = Math.max(0, vF - resist * dt);
  else if (vF < 0) vF = Math.min(0, vF + resist * dt);

  // Drift state. The rear lets go when the handbrake is pulled while steering
  // at speed, or under boost at full lock. Once it is sliding, throttle and
  // steering hold the slide; easing off either lets the tyres grip again.
  const travel = Math.hypot(vF, vL);
  const beta = travel > 2 && vF > 0 ? Math.atan2(vL, vF) : 0;
  const absBeta = Math.abs(beta);
  s.steerSmooth = approach(s.steerSmooth, steerIn, 5 * dt);
  let loose = 0;
  if (vF > tuning.driftMinSpeed) {
    if (input.handbrake && (Math.abs(steerIn) > 0.15 || absBeta > 0.08)) loose = 1;
    else if (s.boosting && Math.abs(steerIn) > 0.8 && vF < 42) loose = 0.85;
    if (s.drift > 0.25 && throttle > 0.2) {
      const held = clamp01((absBeta - 0.05) / 0.2);
      const steered = Math.abs(steerIn) > 0.5 ? 0.6 : 0;
      loose = Math.max(loose, held, steered);
    }
  }
  s.drift = approach(s.drift, loose, (loose > s.drift ? tuning.driftBuild : tuning.driftRelease) * dt);

  // Lateral grip: sideways speed bleeds off quickly unless the rear is loose.
  let grip = tuning.grip + (tuning.driftGrip - tuning.grip) * s.drift;
  if (input.handbrake) grip = Math.min(grip, tuning.handbrakeGrip);
  vL *= Math.exp(-grip * dt);

  // Steering with a speed-dependent limit and a faster return to centre.
  const target = steerIn * steerLimit(vF, tuning);
  const returning = Math.abs(target) < Math.abs(s.steerAngle) || Math.sign(target) !== Math.sign(s.steerAngle);
  s.steerAngle = approach(s.steerAngle, target, (returning ? tuning.steerReturnRate : tuning.steerRate) * dt);

  // Bicycle-model yaw. Positive steer turns right, which decreases the heading.
  let yawRate = (-vF / tuning.wheelBase) * Math.tan(s.steerAngle);
  if (input.handbrake) yawRate *= 1.25;
  if (s.drift > 0.001 && vF > 2) {
    // Sliding rear tyres let the steering rotate the car past the grip limit,
    // while the slide itself pulls the nose back toward the direction of travel.
    // The balance of the two is the drift angle, so more lock means more angle
    // and opposite lock straightens the car.
    yawRate -= s.steerSmooth * tuning.driftYaw * s.drift * Math.min(1, vF / 14);
    yawRate -= beta * tuning.driftAlign * s.drift;
  }
  // Past the maximum angle the car fights the spin, whatever the inputs.
  if (absBeta > tuning.driftMaxAngle) yawRate -= Math.sign(beta) * (absBeta - tuning.driftMaxAngle) * 9;
  s.yawRate = yawRate;

  // Velocity stays in world space; the heading turns underneath it, which is
  // what produces a little slip in corners and a lot under the handbrake.
  s.vx = sinH * vF - cosH * vL;
  s.vz = cosH * vF + sinH * vL;
  s.heading = wrapAngle(s.heading + yawRate * dt);

  s.x += s.vx * dt;
  s.z += s.vz * dt;

  resolveCollisions(s, dt, world, tuning);

  // Follow the ground: sample under both axles for height and pitch.
  const fx = Math.sin(s.heading);
  const fz = Math.cos(s.heading);
  const front = world.groundHeight(s.x + fx * 1.33, s.z + fz * 1.33);
  const rear = world.groundHeight(s.x - fx * 1.22, s.z - fz * 1.22);
  const k = 1 - Math.exp(-22 * dt);
  s.y += ((front + rear) / 2 - s.y) * k;
  s.pitch += (Math.atan2(front - rear, tuning.wheelBase) - s.pitch) * k;

  // Derived quantities for rendering, audio and the HUD.
  s.speed = s.vx * fx + s.vz * fz;
  s.slip = -s.vx * fz + s.vz * fx;
  s.slipAngle = s.speed > 2 ? Math.atan2(s.slip, s.speed) : 0;
  const sliding = clamp01((Math.abs(s.slip) - 1.8) / 5) * clamp01(Math.abs(s.speed) / 6);
  const locked = input.handbrake && Math.abs(s.speed) > 5 ? 0.55 : 0;
  s.tyreSlip += (Math.max(sliding, locked) - s.tyreSlip) * (1 - Math.exp(-10 * dt));
  const lock = steerLimit(s.speed, tuning);
  const shown = s.steerAngle + (s.steerSmooth * Math.max(lock, 0.5) - s.steerAngle) * s.drift;
  s.steerVisual = approach(s.steerVisual, shown, 3.5 * dt);
  s.accel = (s.speed - vFBefore) / dt;
  s.wheelSpin += (s.speed * dt) / WHEEL_RADIUS;
  s.odometer += Math.abs(s.speed) * dt;
  s.sinceCollision += dt;
  s.impact *= Math.exp(-4 * dt);
  updateDrivetrain(s, throttle, dt, tuning);

  if (!Number.isFinite(s.x) || !Number.isFinite(s.z) || !Number.isFinite(s.heading)) {
    s.x = 0;
    s.z = 0;
    s.heading = Math.PI;
    s.vx = 0;
    s.vz = 0;
  }
  s.x = Math.min(WORLD_BOUNDS.x1, Math.max(WORLD_BOUNDS.x0, s.x));
  s.z = Math.min(WORLD_BOUNDS.z1, Math.max(WORLD_BOUNDS.z0, s.z));
}

function resolveCollisions(s: VehicleState, dt: number, world: PhysicsWorld, tuning: VehicleTuning): void {
  const r = tuning.collisionRadius;
  let touched = false;
  for (let pass = 0; pass < 2; pass++) {
    const fx = Math.sin(s.heading);
    const fz = Math.cos(s.heading);
    for (const offset of tuning.collisionOffsets) {
      const cx = s.x + fx * offset;
      const cz = s.z + fz * offset;
      world.colliders.query(cx, cz, r, (c) => {
        const contact = circleContact(s.x + fx * offset, s.z + fz * offset, r, c);
        if (!contact) return;
        touched = true;
        s.x += contact.nx * contact.depth;
        s.z += contact.nz * contact.depth;
        const vn = s.vx * contact.nx + s.vz * contact.nz;
        if (vn < 0) {
          s.vx -= (1 + tuning.restitution) * vn * contact.nx;
          s.vz -= (1 + tuning.restitution) * vn * contact.nz;
          // Scrubbing along the obstacle costs a little speed, more for harder hits.
          const scrub = 1 - Math.min(0.35, -vn * 0.02);
          s.vx *= scrub;
          s.vz *= scrub;
          if (-vn > s.impact) s.impact = -vn;
        }
      });
    }
  }
  if (!touched) return;
  s.sinceCollision = 0;
  // Ease the nose along the direction of travel so the car glances off walls
  // instead of grinding into them. This is a bounded correction, never a spin.
  const speed = Math.hypot(s.vx, s.vz);
  if (speed > 2) {
    const forward = s.vx * Math.sin(s.heading) + s.vz * Math.cos(s.heading);
    const travel = forward >= 0 ? Math.atan2(s.vx, s.vz) : Math.atan2(-s.vx, -s.vz);
    const diff = wrapAngle(travel - s.heading);
    if (Math.abs(diff) < 1.1) s.heading = wrapAngle(s.heading + diff * Math.min(1, 3.5 * dt));
  }
}

function updateDrivetrain(s: VehicleState, throttle: number, dt: number, tuning: VehicleTuning): void {
  let target = 0;
  if (!s.engineOn) {
    s.gear = 0;
  } else if (s.speed < -0.3 || s.reversing) {
    s.gear = -1;
    target = IDLE_RPM + (Math.abs(s.speed) / tuning.maxReverseSpeed) * 0.5;
  } else {
    const v = Math.max(0, s.speed);
    let gear = Math.max(1, s.gear);
    // Hysteresis keeps the gearbox from hunting around a shift point.
    while (gear < 5 && v > GEAR_TOP_SPEEDS[gear] * 0.96) gear++;
    while (gear > 1 && v < GEAR_TOP_SPEEDS[gear - 1] * 0.78) gear--;
    s.gear = v < 0.3 && throttle === 0 ? 0 : gear;
    const lo = GEAR_TOP_SPEEDS[gear - 1] * 0.55;
    const hi = GEAR_TOP_SPEEDS[gear];
    const band = clamp01((v - lo) / (hi - lo));
    target = IDLE_RPM + band * 0.78 + throttle * 0.08;
    if (v < 1) target = Math.max(target, IDLE_RPM + throttle * 0.3);
  }
  s.rpm += (target - s.rpm) * (1 - Math.exp(-(target > s.rpm ? 7 : 4) * dt));
}

/**
 * Advance the simulation by a variable frame time using fixed steps.
 * Returns the unused remainder, to be passed back in on the next frame.
 */
export function advanceVehicle(
  s: VehicleState,
  input: VehicleInput,
  frameDt: number,
  accumulator: number,
  world: PhysicsWorld,
  tuning: VehicleTuning = DEFAULT_TUNING,
): number {
  let acc = accumulator + Math.min(Math.max(frameDt, 0), MAX_FRAME_TIME);
  while (acc >= FIXED_STEP) {
    stepVehicle(s, input, FIXED_STEP, world, tuning);
    acc -= FIXED_STEP;
  }
  return acc;
}

/** Put the car at a pose, stationary. Does not touch engine state or the odometer. */
export function placeVehicle(s: VehicleState, pose: VehiclePose, world?: PhysicsWorld): void {
  s.x = pose.x;
  s.z = pose.z;
  s.heading = wrapAngle(pose.heading);
  s.vx = 0;
  s.vz = 0;
  s.speed = 0;
  s.slip = 0;
  s.steerAngle = 0;
  s.steerSmooth = 0;
  s.steerVisual = 0;
  s.drift = 0;
  s.slipAngle = 0;
  s.tyreSlip = 0;
  s.yawRate = 0;
  s.accel = 0;
  s.impact = 0;
  s.sinceCollision = 10;
  s.reversing = false;
  if (world) {
    s.y = world.groundHeight(pose.x, pose.z);
    s.pitch = 0;
  }
}

export function speedKmh(s: Pick<VehicleState, "speed">): number {
  return Math.abs(s.speed) * 3.6;
}

export function gearLabel(s: Pick<VehicleState, "gear" | "engineOn">): string {
  if (!s.engineOn) return "P";
  if (s.gear < 0) return "R";
  if (s.gear === 0) return "N";
  return String(s.gear);
}
