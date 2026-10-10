import type { Destination } from "@/types/world";

/**
 * Picks the single destination whose prompt should be shown for a car at (x, z).
 * Distances are normalised by each destination's own radius so a small kiosk
 * next to a large landmark can still win when the car is right beside it.
 */
export function nearestDestination(
  destinations: readonly Destination[],
  x: number,
  z: number,
  preferredId: string | null = null,
): Destination | null {
  let best: Destination | null = null;
  let bestScore = Infinity;
  for (const d of destinations) {
    const dist = Math.hypot(x - d.position[0], z - d.position[1]);
    if (dist > d.radius) continue;
    if (d.id === preferredId) return d;
    const score = dist / d.radius;
    if (score < bestScore) {
      bestScore = score;
      best = d;
    }
  }
  return best;
}
