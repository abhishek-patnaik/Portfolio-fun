export interface VehicleInput {
  /** 0..1 */
  throttle: number;
  /** 0..1 – brake while rolling forward, reverse once (nearly) stopped. */
  brake: number;
  /** -1 (left) .. 1 (right) */
  steer: number;
  handbrake: boolean;
  boost: boolean;
}

export interface VehicleState {
  x: number;
  z: number;
  /** Height of the body origin above the world ground plane. */
  y: number;
  /** Heading in radians. Forward vector is (sin h, 0, cos h). */
  heading: number;
  /** World-space velocity. */
  vx: number;
  vz: number;
  /** Signed speed along the heading, m/s (derived each step). */
  speed: number;
  /** Lateral slip speed, m/s (derived each step). */
  slip: number;
  /** Current front wheel angle, radians. Positive steers right. */
  steerAngle: number;
  /** Smoothed steering input, -1..1. */
  steerSmooth: number;
  /** Front wheel angle to draw; shows the big angles of a drift. */
  steerVisual: number;
  /** How loose the rear tyres are: 0 gripping, 1 fully sliding. */
  drift: number;
  /** Angle between the nose and the direction of travel, radians. Positive slides right. */
  slipAngle: number;
  /** 0..1 how hard the rear tyres are being scrubbed; drives smoke, marks and sound. */
  tyreSlip: number;
  /** Body pitch from the road gradient, radians. */
  pitch: number;
  /** Accumulated wheel spin, radians. */
  wheelSpin: number;
  /** Simulated engine speed, 0..1 of the rev range. */
  rpm: number;
  gear: number;
  /** Remaining boost energy 0..1. */
  boost: number;
  boosting: boolean;
  engineOn: boolean;
  /** True while reversing intent is latched. */
  reversing: boolean;
  /** Seconds since the last collision. */
  sinceCollision: number;
  /** Strength of the last impact, decays to 0. Used for audio and camera. */
  impact: number;
  /** Longitudinal acceleration of the last step, m/s². */
  accel: number;
  /** Yaw rate of the last step, rad/s. */
  yawRate: number;
  odometer: number;
}

export interface VehiclePose {
  x: number;
  z: number;
  heading: number;
}

export interface VehicleTuning {
  wheelBase: number;
  maxSpeed: number;
  maxReverseSpeed: number;
  boostSpeed: number;
  engineAccel: number;
  boostAccel: number;
  brakeDecel: number;
  reverseAccel: number;
  rollingResistance: number;
  drag: number;
  engineBrake: number;
  maxSteerLow: number;
  maxSteerHigh: number;
  steerRate: number;
  steerReturnRate: number;
  grip: number;
  handbrakeGrip: number;
  handbrakeDecel: number;
  /** Lateral grip while the rear is fully loose. Lower slides longer and scrubs less speed. */
  driftGrip: number;
  /** Slowest forward speed at which a drift can start or continue, m/s. */
  driftMinSpeed: number;
  /** Extra yaw the steering commands while drifting, rad/s at full lock. */
  driftYaw: number;
  /** Self-aligning yaw per radian of slip angle, 1/s. Higher is tamer. */
  driftAlign: number;
  /** Slip angle beyond which the car resists spinning, radians. */
  driftMaxAngle: number;
  /** How fast the rear lets go and recovers, 1/s. */
  driftBuild: number;
  driftRelease: number;
  restitution: number;
  collisionRadius: number;
  /** Offsets of the collision circles along the car's forward axis. */
  collisionOffsets: readonly number[];
}

export type CameraMode = "cockpit" | "chase" | "cinematic";
