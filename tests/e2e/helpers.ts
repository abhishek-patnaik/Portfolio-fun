import { expect, type Page } from "@playwright/test";

interface WorldHandle {
  runtime: {
    vehicle: {
      x: number;
      z: number;
      y: number;
      vx: number;
      vz: number;
      speed: number;
      heading: number;
      steerAngle: number;
      engineOn: boolean;
      gear: number;
      drift: number;
      slipAngle: number;
      tyreSlip: number;
    };
    drift: { active: boolean; points: number; best: number; lastPoints: number; version: number };
    stats: { fps: number; calls: number; triangles: number; skidMarks: number; smoke: boolean };
    route: { points: [number, number][]; length: number } | null;
    pendingTeleport: { x: number; z: number; heading: number } | null;
    cameraOverride: unknown;
  };
  store: { getState: () => Record<string, unknown> & { phase: string; overlay: string; cameraMode: string; quality: string } };
  input: { isHeld: (code: string) => boolean; touch: { steer: number; throttle: number; brake: number } };
  destinations: { id: string; position: [number, number]; access: { x: number; z: number; heading: number } }[];
}

declare global {
  interface Window {
    __world: WorldHandle;
  }
}

/** Opens the city on the low profile and waits for the start screen. */
export async function openWorld(page: Page, query = "q=low"): Promise<void> {
  await page.goto(`/?${query}`);
  await expect(page.getByTestId("intro-screen")).toBeVisible({ timeout: 150_000 });
}

export async function startDriving(page: Page): Promise<void> {
  await page.getByTestId("start-driving").click();
  await expect(page.getByTestId("hud")).toBeVisible();
  await page.waitForFunction(() => window.__world.store.getState().phase === "driving");
}

export function vehicle(page: Page) {
  return page.evaluate(() => {
    const v = window.__world.runtime.vehicle;
    return { x: v.x, z: v.z, speed: v.speed, heading: v.heading, steer: v.steerAngle, engineOn: v.engineOn, gear: v.gear };
  });
}

export function state(page: Page) {
  return page.evaluate(() => {
    const s = window.__world.store.getState();
    return {
      phase: s.phase,
      overlay: s.overlay,
      cameraMode: s.cameraMode,
      quality: s.quality,
      nearbyId: s.nearbyId as string | null,
      district: s.district as string,
      muted: s.muted as boolean,
      timeOfDay: s.timeOfDay as string,
      routeTargetId: s.routeTargetId as string | null,
      reducedMotion: s.reducedMotion as boolean,
      panel: s.panel as { section: string; itemId?: string } | null,
    };
  });
}

/** Puts the car on the road at a pose, stationary. */
export async function teleport(page: Page, x: number, z: number, heading: number): Promise<void> {
  await page.evaluate(([px, pz, h]) => {
    window.__world.runtime.pendingTeleport = { x: px, z: pz, heading: h };
  }, [x, z, heading]);
  await page.waitForFunction(([px, pz]) => {
    const v = window.__world.runtime.vehicle;
    return window.__world.runtime.pendingTeleport === null && Math.hypot(v.x - px, v.z - pz) < 1;
  }, [x, z]);
}

/** Collects console errors and page errors for the lifetime of the page. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const text = m.text();
    // Software rendering lacks a few optional GPU extensions; those notices are not defects.
    if (/KHR_parallel_shader_compile|GPU stall|GL Driver Message/i.test(text)) return;
    errors.push(`console: ${text}`);
  });
  return errors;
}
