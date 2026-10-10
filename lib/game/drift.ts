/**
 * Drift scoring. Pure functions over a small state object so the rules can be
 * unit-tested without a renderer.
 *
 * A drift counts while the car is sliding at a real angle and a real speed.
 * Points build with angle, speed and time held; a short grace period lets the
 * car swing from one direction to the other without ending the run. Touching
 * anything loses the points that have not been banked yet.
 */
import type { VehicleState } from "@/types/vehicle";

export const DRIFT_MIN_ANGLE = 0.2; // ~11.5 degrees
export const DRIFT_MIN_SPEED = 7.5; // m/s, 27 km/h
export const DRIFT_GRACE = 0.7; // seconds below the threshold before a run ends
export const DRIFT_MAX_MULTIPLIER = 5;

export type DriftEvent = "none" | "start" | "bank" | "lost";

export interface DriftRun {
  /** A run is in progress (including its grace period). */
  active: boolean;
  /** The car is over the angle and speed thresholds right now. */
  sliding: boolean;
  /** Unbanked points of the current run. */
  points: number;
  /** Seconds spent sliding in the current run. */
  time: number;
  multiplier: number;
  /** Current slip angle in degrees, unsigned. */
  angle: number;
  /** Seconds since the car last met the thresholds. */
  gap: number;
  /** Result of the last finished run and how long ago it finished. */
  lastPoints: number;
  lastLost: boolean;
  sinceEnd: number;
  /** Best banked run of this visit. */
  best: number;
  /** Increases every time a run ends, so the interface can react once. */
  version: number;
}

export function createDriftRun(best = 0): DriftRun {
  return { active: false, sliding: false, points: 0, time: 0, multiplier: 1, angle: 0, gap: 0, lastPoints: 0, lastLost: false, sinceEnd: 99, best, version: 0 };
}

export function driftMultiplier(time: number): number {
  return Math.min(DRIFT_MAX_MULTIPLIER, 1 + Math.floor(time / 2) * 0.5);
}

type Motion = Pick<VehicleState, "speed" | "slipAngle" | "sinceCollision">;

export function updateDriftRun(run: DriftRun, v: Motion, dt: number): DriftEvent {
  const angle = Math.abs(v.slipAngle);
  run.angle = (angle * 180) / Math.PI;
  run.sinceEnd += dt;
  const hit = v.sinceCollision < 0.15;
  run.sliding = !hit && v.speed >= DRIFT_MIN_SPEED && angle >= DRIFT_MIN_ANGLE;

  if (run.active && hit) {
    end(run, true);
    return "lost";
  }
  if (run.sliding) {
    const started = !run.active;
    run.active = true;
    run.gap = 0;
    run.time += dt;
    run.multiplier = driftMultiplier(run.time);
    // About 60 points a second at 70 km/h and 30 degrees, before the multiplier.
    run.points += v.speed * Math.min(run.angle, 60) * 0.1 * run.multiplier * dt;
    return started ? "start" : "none";
  }
  if (run.active) {
    run.gap += dt;
    if (run.gap > DRIFT_GRACE) {
      // Very short slides are not worth announcing.
      if (run.points < 25) {
        reset(run);
        return "none";
      }
      end(run, false);
      return "bank";
    }
  }
  return "none";
}

function reset(run: DriftRun): void {
  run.active = false;
  run.sliding = false;
  run.points = 0;
  run.time = 0;
  run.multiplier = 1;
  run.gap = 0;
}

function end(run: DriftRun, lost: boolean): void {
  run.lastPoints = Math.round(run.points);
  run.lastLost = lost;
  run.sinceEnd = 0;
  run.version++;
  if (!lost && run.lastPoints > run.best) run.best = run.lastPoints;
  reset(run);
}
