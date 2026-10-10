import { describe, expect, it } from "vitest";
import { destinations } from "@/lib/data/landmarks";
import { ColliderIndex, circleContact, pointBlocked } from "@/lib/game/collision";
import { findRoute, guidance, nearestRoadPose, projectToRoad } from "@/lib/game/navigation";
import { generateCity } from "@/lib/world/cityGen";
import {
  BLOCKS,
  BRIDGES,
  CHANNEL,
  CURB,
  DISTRICTS,
  ISLAND,
  ROAD_EDGES,
  ROAD_NODES,
  SPAWN,
  STATIC_COLLIDERS,
  districtAt,
  groundHeight,
  isOnRoad,
  surfaceAt,
} from "@/lib/world/layout";

const city = generateCity(destinations);
const index = new ColliderIndex([...STATIC_COLLIDERS, ...city.colliders]);

describe("world layout", () => {
  it("has eight districts and every block belongs to one", () => {
    expect(DISTRICTS).toHaveLength(8);
    const ids = new Set(DISTRICTS.map((d) => d.id));
    for (const b of BLOCKS) expect(ids.has(b.district)).toBe(true);
  });

  it("classifies surfaces", () => {
    expect(surfaceAt(SPAWN.x, SPAWN.z)).toBe("road");
    expect(surfaceAt(100, (CHANNEL.z0 + CHANNEL.z1) / 2)).toBe("water");
    expect(surfaceAt(0, (CHANNEL.z0 + CHANNEL.z1) / 2)).toBe("bridge");
    expect(surfaceAt(-300, -100)).toBe("pavement");
    expect(surfaceAt(ISLAND.x1 + 50, 0)).toBe("outside");
    expect(districtAt(300, -300)).toBe("career");
    expect(districtAt(-300, 300)).toBe("contact");
  });

  it("raises pavements by a kerb and arches the bridges", () => {
    expect(groundHeight(SPAWN.x, SPAWN.z)).toBe(0);
    expect(groundHeight(-300, -100)).toBeCloseTo(CURB, 5);
    const b = BRIDGES[1];
    expect(groundHeight(b.x, (b.z0 + b.z1) / 2)).toBeCloseTo(b.height, 5);
    expect(groundHeight(b.x, b.z0 + 0.01)).toBeLessThan(0.01);
  });

  it("keeps ground height continuous along the boulevard", () => {
    let prev = groundHeight(SPAWN.x, 360);
    for (let z = 360; z > -340; z -= 0.25) {
      const h = groundHeight(SPAWN.x, z);
      if (Math.hypot(SPAWN.x, z + 20) > 44.5) expect(Math.abs(h - prev)).toBeLessThan(0.08);
      prev = h;
    }
  });

  it("has a connected road graph", () => {
    const adj = new Map<string, string[]>();
    for (const n of ROAD_NODES) adj.set(n.id, []);
    for (const e of ROAD_EDGES) {
      adj.get(e.a)?.push(e.b);
      adj.get(e.b)?.push(e.a);
    }
    const seen = new Set<string>([ROAD_NODES[0].id]);
    const queue = [ROAD_NODES[0].id];
    while (queue.length) {
      const id = queue.pop() as string;
      for (const next of adj.get(id) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    expect(seen.size).toBe(ROAD_NODES.length);
  });

  it("puts every road node and edge sample on a drivable surface", () => {
    for (const e of ROAD_EDGES) {
      for (let i = 1; i < e.points.length; i++) {
        const [ax, az] = e.points[i - 1];
        const [bx, bz] = e.points[i];
        for (let t = 0; t <= 1; t += 0.1) {
          expect(isOnRoad(ax + (bx - ax) * t, az + (bz - az) * t)).toBe(true);
        }
      }
    }
  });
});

describe("generated city", () => {
  it("is deterministic", () => {
    const again = generateCity(destinations);
    expect(again.buildings.length).toBe(city.buildings.length);
    expect(again.buildings[10]).toEqual(city.buildings[10]);
  });

  it("generates a substantial skyline", () => {
    expect(city.buildings.length).toBeGreaterThan(150);
    expect(city.lamps.length).toBeGreaterThan(100);
    expect(Math.max(...city.buildings.map((b) => b.y + b.h))).toBeGreaterThan(120);
  });

  it("never places a building on a road or in the water", () => {
    for (const b of city.buildings) {
      for (const [dx, dz] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [0, 0],
      ]) {
        const x = b.x + (dx * b.w) / 2;
        const z = b.z + (dz * b.d) / 2;
        expect(surfaceAt(x, z)).toBe("pavement");
      }
    }
  });

  it("keeps the road network free of obstacles", () => {
    for (const e of ROAD_EDGES) {
      for (let i = 1; i < e.points.length; i++) {
        const [ax, az] = e.points[i - 1];
        const [bx, bz] = e.points[i];
        const len = Math.hypot(bx - ax, bz - az);
        for (let d = 0; d <= len; d += 3) {
          const x = ax + ((bx - ax) * d) / len;
          const z = az + ((bz - az) * d) / len;
          expect(pointBlocked(index, x, z, 4)).toBe(false);
        }
      }
    }
  });

  it("leaves the spawn point and every destination access point clear", () => {
    expect(pointBlocked(index, SPAWN.x, SPAWN.z, 2.5)).toBe(false);
    for (const d of destinations) {
      expect(isOnRoad(d.access.x, d.access.z), d.id).toBe(true);
      expect(pointBlocked(index, d.access.x, d.access.z, 2.2), d.id).toBe(false);
      const dist = Math.hypot(d.access.x - d.position[0], d.access.z - d.position[1]);
      expect(dist, `${d.id} access within interaction radius`).toBeLessThan(d.radius);
    }
  });
});

describe("collision", () => {
  it("pushes a circle out of a box along the nearest face", () => {
    const c = circleContact(0.5, 5, 1, { type: "box", x0: 1, x1: 3, z0: 0, z1: 10 });
    expect(c).not.toBeNull();
    expect(c?.nx).toBeCloseTo(-1);
    expect(c?.depth).toBeCloseTo(0.5);
    expect(circleContact(-1, 5, 1, { type: "box", x0: 1, x1: 3, z0: 0, z1: 10 })).toBeNull();
  });

  it("handles circle obstacles and centres inside boxes", () => {
    const c = circleContact(0, 0, 1, { type: "circle", x: 1.5, z: 0, r: 1 });
    expect(c?.nx).toBeCloseTo(-1);
    expect(c?.depth).toBeCloseTo(0.5);
    const inside = circleContact(1.2, 5, 1, { type: "box", x0: 1, x1: 3, z0: 0, z1: 10 });
    expect(inside?.nx).toBe(-1);
  });
});

describe("navigation", () => {
  it("projects points onto the nearest road", () => {
    const p = projectToRoad(SPAWN.x, SPAWN.z);
    expect(p.distance).toBeLessThan(8);
  });

  it("finds a road route to every destination from the spawn", () => {
    for (const d of destinations) {
      const route = findRoute([SPAWN.x, SPAWN.z], [d.access.x, d.access.z]);
      expect(Number.isFinite(route.length), d.id).toBe(true);
      expect(route.points.length).toBeGreaterThanOrEqual(2);
      // Every point of the route stays on the road network.
      for (let i = 1; i < route.points.length; i++) {
        const [ax, az] = route.points[i - 1];
        const [bx, bz] = route.points[i];
        for (let t = 0; t <= 1; t += 0.2) {
          expect(isOnRoad(ax + (bx - ax) * t, az + (bz - az) * t), d.id).toBe(true);
        }
      }
      const straight = Math.hypot(d.access.x - SPAWN.x, d.access.z - SPAWN.z);
      expect(route.length).toBeGreaterThanOrEqual(straight - 20);
    }
  });

  it("crosses the channel only on a bridge", () => {
    const route = findRoute([-420, 300], [420, -300]);
    const crossings = route.points.filter(([, z]) => z > CHANNEL.z0 && z < CHANNEL.z1);
    for (const [x] of crossings) expect(BRIDGES.some((b) => Math.abs(b.x - x) < 1)).toBe(true);
  });

  it("gives turn guidance", () => {
    const route = findRoute([SPAWN.x, SPAWN.z], [315, -194.5]);
    const g = guidance(route, SPAWN.x, SPAWN.z, SPAWN.heading);
    expect(g.remaining).toBeGreaterThan(300);
    expect(["straight", "left", "right"]).toContain(g.instruction);
    expect(Math.abs(g.relativeBearing)).toBeLessThan(0.6);
  });

  it("recovers to the left-hand lane of the nearest road", () => {
    const pose = nearestRoadPose(3, 300, Math.PI);
    expect(pose.x).toBeLessThan(0);
    expect(Math.abs(pose.heading)).toBeCloseTo(Math.PI, 3);
    expect(isOnRoad(pose.x, pose.z)).toBe(true);
  });
});
