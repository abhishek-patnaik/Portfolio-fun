/**
 * Route finding over the road graph.
 *
 * Routes follow real roads: both endpoints are projected onto their nearest road
 * edge and Dijkstra runs over the graph with those two temporary nodes added, so
 * a route never cuts through buildings or across the water.
 */
import type { RoadEdge, RouteResult, Vec2 } from "@/types/world";
import type { VehiclePose } from "@/types/vehicle";
import { LANE_OFFSET, ROAD_EDGES, ROAD_NODES, vectorToHeading, wrapAngle } from "@/lib/world/layout";

interface Projection {
  edge: RoadEdge;
  /** Distance along the edge polyline from node a. */
  along: number;
  point: Vec2;
  distance: number;
  /** Unit direction of the edge at the projection, from a towards b. */
  dir: Vec2;
}

function polylineLength(points: readonly Vec2[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  return total;
}

export function projectToRoad(x: number, z: number): Projection {
  let best: Projection | null = null;
  for (const edge of ROAD_EDGES) {
    let walked = 0;
    for (let i = 1; i < edge.points.length; i++) {
      const [ax, az] = edge.points[i - 1];
      const [bx, bz] = edge.points[i];
      const dx = bx - ax;
      const dz = bz - az;
      const len = Math.hypot(dx, dz);
      const t = len === 0 ? 0 : Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / (len * len)));
      const px = ax + dx * t;
      const pz = az + dz * t;
      const distance = Math.hypot(x - px, z - pz);
      if (!best || distance < best.distance) {
        best = { edge, along: walked + len * t, point: [px, pz], distance, dir: [dx / (len || 1), dz / (len || 1)] };
      }
      walked += len;
    }
  }
  if (!best) throw new Error("Road graph is empty");
  return best;
}

/** Points of an edge between two distances along it, in travel order. */
function slicePolyline(points: readonly Vec2[], from: number, to: number): Vec2[] {
  const reverse = from > to;
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  const out: Vec2[] = [];
  let walked = 0;
  const at = (i: number, d: number): Vec2 => {
    const [ax, az] = points[i - 1];
    const [bx, bz] = points[i];
    const len = Math.hypot(bx - ax, bz - az) || 1;
    const t = (d - walked) / len;
    return [ax + (bx - ax) * t, az + (bz - az) * t];
  };
  for (let i = 1; i < points.length; i++) {
    const len = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    const segStart = walked;
    const segEnd = walked + len;
    if (segEnd >= lo && segStart <= hi) {
      if (out.length === 0) out.push(at(i, Math.max(lo, segStart)));
      out.push(at(i, Math.min(hi, segEnd)));
    }
    walked = segEnd;
  }
  return reverse ? out.reverse() : out;
}

interface Link {
  to: string;
  cost: number;
  points: Vec2[];
}

function baseAdjacency(): Map<string, Link[]> {
  const adj = new Map<string, Link[]>();
  for (const n of ROAD_NODES) adj.set(n.id, []);
  for (const e of ROAD_EDGES) {
    adj.get(e.a)?.push({ to: e.b, cost: e.length, points: [...e.points] });
    adj.get(e.b)?.push({ to: e.a, cost: e.length, points: [...e.points].reverse() });
  }
  return adj;
}

const BASE = baseAdjacency();

export function findRoute(from: Vec2, to: Vec2): RouteResult {
  const start = projectToRoad(from[0], from[1]);
  const goal = projectToRoad(to[0], to[1]);
  const START = "__start";
  const GOAL = "__goal";

  const adj = new Map<string, Link[]>();
  for (const [k, v] of BASE) adj.set(k, [...v]);
  adj.set(START, []);
  adj.set(GOAL, []);

  const attach = (id: string, p: Projection, outgoing: boolean) => {
    const pts = p.edge.points;
    const total = polylineLength(pts);
    const toA = slicePolyline(pts, p.along, 0);
    const toB = slicePolyline(pts, p.along, total);
    if (outgoing) {
      adj.get(id)?.push({ to: p.edge.a, cost: p.along, points: toA });
      adj.get(id)?.push({ to: p.edge.b, cost: total - p.along, points: toB });
    } else {
      adj.get(p.edge.a)?.push({ to: id, cost: p.along, points: [...toA].reverse() });
      adj.get(p.edge.b)?.push({ to: id, cost: total - p.along, points: [...toB].reverse() });
    }
  };
  attach(START, start, true);
  attach(GOAL, goal, false);
  if (start.edge.id === goal.edge.id) {
    adj.get(START)?.push({
      to: GOAL,
      cost: Math.abs(goal.along - start.along),
      points: slicePolyline(start.edge.points, start.along, goal.along),
    });
  }

  const dist = new Map<string, number>([[START, 0]]);
  const prev = new Map<string, { from: string; link: Link }>();
  const open = new Set<string>([START]);
  const done = new Set<string>();
  while (open.size > 0) {
    let current = "";
    let bestCost = Infinity;
    for (const id of open) {
      const d = dist.get(id) ?? Infinity;
      if (d < bestCost) {
        bestCost = d;
        current = id;
      }
    }
    if (current === GOAL) break;
    open.delete(current);
    done.add(current);
    for (const link of adj.get(current) ?? []) {
      if (done.has(link.to)) continue;
      const cost = bestCost + link.cost;
      if (cost < (dist.get(link.to) ?? Infinity)) {
        dist.set(link.to, cost);
        prev.set(link.to, { from: current, link });
        open.add(link.to);
      }
    }
  }

  const legs: Vec2[][] = [];
  let cursor = GOAL;
  while (cursor !== START) {
    const step = prev.get(cursor);
    if (!step) return { points: [start.point, goal.point], length: Infinity };
    legs.push(step.link.points);
    cursor = step.from;
  }
  legs.reverse();
  const points: Vec2[] = [];
  for (const leg of legs) {
    for (const p of leg) {
      const last = points[points.length - 1];
      if (!last || Math.hypot(last[0] - p[0], last[1] - p[1]) > 0.01) points.push(p);
    }
  }
  if (points.length < 2) points.push(goal.point);
  return { points, length: dist.get(GOAL) ?? polylineLength(points) };
}

export interface Guidance {
  /** Remaining distance along the route, metres. */
  remaining: number;
  /** Bearing to the next waypoint relative to the car heading. Positive is to the right. */
  relativeBearing: number;
  instruction: "straight" | "left" | "right" | "u-turn" | "arrive";
  /** Distance to the next turn, or to the destination when no turn is left. */
  distanceToTurn: number;
  /** Index of the route segment the car is currently on. */
  segment: number;
}

/** Turn-by-turn style guidance for a car at (x, z) following `route`. */
export function guidance(route: RouteResult, x: number, z: number, heading: number): Guidance {
  const pts = route.points;
  let bestSeg = 0;
  let bestDist = Infinity;
  let bestT = 0;
  for (let i = 1; i < pts.length; i++) {
    const [ax, az] = pts[i - 1];
    const [bx, bz] = pts[i];
    const dx = bx - ax;
    const dz = bz - az;
    const lenSq = dx * dx + dz * dz || 1;
    const t = Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / lenSq));
    const d = Math.hypot(x - (ax + dx * t), z - (az + dz * t));
    if (d < bestDist) {
      bestDist = d;
      bestSeg = i - 1;
      bestT = t;
    }
  }
  const segLen = (i: number) => Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
  let remaining = segLen(bestSeg) * (1 - bestT);
  for (let i = bestSeg + 1; i < pts.length - 1; i++) remaining += segLen(i);

  // Look for the next change of direction of more than ~35°.
  let distanceToTurn = segLen(bestSeg) * (1 - bestT);
  let instruction: Guidance["instruction"] = "arrive";
  let turnFound = false;
  const startDir = vectorToHeading(pts[bestSeg + 1][0] - pts[bestSeg][0], pts[bestSeg + 1][1] - pts[bestSeg][1]);
  for (let i = bestSeg + 1; i < pts.length - 1; i++) {
    const dir = vectorToHeading(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    const turn = wrapAngle(dir - startDir);
    if (Math.abs(turn) > 0.6) {
      // A heading that decreases is a right turn in this coordinate system.
      instruction = turn < 0 ? "right" : "left";
      turnFound = true;
      break;
    }
    distanceToTurn += segLen(i);
  }
  if (!turnFound) {
    distanceToTurn = remaining;
    instruction = remaining < 25 ? "arrive" : "straight";
  }

  // Aim at a point a little way ahead on the route for the direction arrow.
  let look = 28;
  let ax = pts[bestSeg][0] + (pts[bestSeg + 1][0] - pts[bestSeg][0]) * bestT;
  let az = pts[bestSeg][1] + (pts[bestSeg + 1][1] - pts[bestSeg][1]) * bestT;
  for (let i = bestSeg; i < pts.length - 1 && look > 0; i++) {
    const ex = pts[i + 1][0];
    const ez = pts[i + 1][1];
    const d = Math.hypot(ex - ax, ez - az);
    if (d >= look) {
      ax += ((ex - ax) / d) * look;
      az += ((ez - az) / d) * look;
      look = 0;
    } else {
      ax = ex;
      az = ez;
      look -= d;
    }
  }
  const bearing = vectorToHeading(ax - x, az - z);
  // Heading decreases to the right, so flip the sign to make right positive.
  const relativeBearing = -wrapAngle(bearing - heading);
  if (turnFound === false && Math.abs(relativeBearing) > 2.2 && remaining > 25) instruction = "u-turn";
  return { remaining, relativeBearing, instruction, distanceToTurn, segment: bestSeg };
}

/**
 * A sensible pose on the nearest road: in the left-hand lane, pointing whichever
 * way along the road is closest to `heading`. Used for recovery and fast travel.
 */
export function nearestRoadPose(x: number, z: number, heading: number): VehiclePose {
  const p = projectToRoad(x, z);
  let dir = vectorToHeading(p.dir[0], p.dir[1]);
  if (Math.abs(wrapAngle(dir - heading)) > Math.PI / 2) dir = wrapAngle(dir + Math.PI);
  // Left of travel is (cos h, -sin h).
  return {
    x: p.point[0] + Math.cos(dir) * LANE_OFFSET,
    z: p.point[1] - Math.sin(dir) * LANE_OFFSET,
    heading: dir,
  };
}

export function formatDistance(metres: number): string {
  if (!Number.isFinite(metres)) return "–";
  if (metres >= 1000) return `${(metres / 1000).toFixed(1)} km`;
  return `${Math.max(0, Math.round(metres / 10) * 10)} m`;
}
