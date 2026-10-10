import { expect, test, type Page } from "@playwright/test";
import { startDriving, state, teleport, trackErrors, vehicle } from "./helpers";

/**
 * The driving journey, run as one continuous session so each step starts from
 * the state the previous one left behind, like a real visit.
 */
test.describe.serial("driving the city", () => {
  let page: Page;
  let errors: string[];

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    errors = trackErrors(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  test("loads through real stages to the start screen", async () => {
    await page.goto("/?q=low");
    await expect(page.getByRole("progressbar", { name: "Loading progress" }).or(page.getByTestId("intro-screen"))).toBeVisible({ timeout: 60_000 });
    await expect(page.getByTestId("intro-screen")).toBeVisible({ timeout: 150_000 });
    await expect(page.getByRole("heading", { level: 1, name: "Abhishek Patnaik" }).first()).toBeVisible();
    await expect(page.getByTestId("world-canvas")).toBeVisible();
    const stages = await page.evaluate(() => window.__world.store.getState().stages as Record<string, string>);
    expect(Object.values(stages).every((s) => s === "done")).toBe(true);
    const s = await state(page);
    expect(s.phase).toBe("intro");
    expect(s.quality).toBe("low");
  });

  test("renders the car and the city", async () => {
    await page.waitForFunction(() => window.__world.runtime.stats.triangles > 0, null, { timeout: 60_000 });
    const stats = await page.evaluate(() => window.__world.runtime.stats);
    expect(stats.triangles).toBeGreaterThan(100_000);
    expect(stats.calls).toBeGreaterThan(50);
    expect(stats.calls).toBeLessThan(900);
  });

  test("starts the engine and shows the HUD at rest", async () => {
    await startDriving(page);
    await expect(page.getByTestId("speed")).toHaveText("0");
    await expect(page.getByTestId("district")).toContainText("Waterfront");
    // The simulation picks the engine state up on its next frame.
    await page.waitForFunction(() => window.__world.runtime.vehicle.engineOn);
    expect((await vehicle(page)).speed).toBe(0);
  });

  test("accelerates forward, brakes, then reverses", async () => {
    const before = await vehicle(page);
    await page.keyboard.down("w");
    await page.waitForFunction(() => window.__world.runtime.vehicle.speed > 3, null, { timeout: 90_000 });
    await expect(page.getByTestId("speed")).not.toHaveText("0");
    const moving = await vehicle(page);
    // The spawn faces north, which is -Z.
    expect(moving.z).toBeLessThan(before.z - 0.5);
    await page.keyboard.up("w");

    await page.keyboard.down("s");
    await page.waitForFunction(() => window.__world.runtime.vehicle.speed < -1, null, { timeout: 120_000 });
    expect((await vehicle(page)).gear).toBe(-1);
    await expect(page.getByTestId("gear")).toHaveText("R");
    await page.keyboard.up("s");
    await page.waitForFunction(() => Math.abs(window.__world.runtime.vehicle.speed) < 0.2, null, { timeout: 120_000 });
  });

  test("steers while moving", async () => {
    const before = await vehicle(page);
    await page.keyboard.down("ArrowUp");
    await page.keyboard.down("d");
    await page.waitForFunction((h) => Math.abs(window.__world.runtime.vehicle.heading - h) > 0.12, before.heading, { timeout: 120_000 });
    const after = await vehicle(page);
    expect(after.steer).toBeGreaterThan(0);
    await page.keyboard.up("d");
    await page.keyboard.up("ArrowUp");
  });

  test("switches between cockpit, chase and cinematic cameras", async () => {
    await page.evaluate(() => (window.__world.store.getState().setCameraMode as (m: string) => void)("cockpit"));
    await page.keyboard.press("c");
    expect((await state(page)).cameraMode).toBe("chase");
    await page.keyboard.press("c");
    expect((await state(page)).cameraMode).toBe("cinematic");
    await page.keyboard.press("v");
    expect((await state(page)).cameraMode).toBe("cockpit");
    await page.getByTestId("hud-camera").click();
    expect((await state(page)).cameraMode).toBe("chase");
    // Rapid switching must always leave a valid mode.
    for (let i = 0; i < 7; i++) await page.keyboard.press("c");
    expect(["cockpit", "chase", "cinematic"]).toContain((await state(page)).cameraMode);
  });

  test("recovers to a road position without losing the session", async () => {
    await page.keyboard.press("r");
    await expect(page.getByTestId("toast")).toContainText("Back on the road");
    const v = await vehicle(page);
    expect(v.speed).toBe(0);
    expect(v.engineOn).toBe(true);
    expect((await state(page)).phase).toBe("driving");
  });

  test("opens and closes the map from the keyboard", async () => {
    await page.keyboard.press("m");
    const map = page.getByTestId("world-map");
    await expect(map).toBeVisible();
    await expect(map.getByRole("dialog", { name: "City Map" })).toBeFocused();
    await expect(map.getByTestId("map-car")).toBeAttached();
    await page.keyboard.press("Escape");
    await expect(map).toBeHidden();
    expect((await state(page)).overlay).toBe("none");
  });

  test("opens a section from the menu without moving the car", async () => {
    await teleport(page, -5.5, 300, Math.PI);
    const before = await vehicle(page);
    const menuButton = page.getByTestId("hud-menu");
    await menuButton.click();
    await page.getByTestId("menu-projects").click();
    const panel = page.getByTestId("portfolio-panel");
    await expect(panel.getByRole("dialog", { name: "Projects" })).toBeVisible();

    // Driving keys are inert while the panel is open, and typing works.
    await page.keyboard.down("w");
    await page.waitForTimeout(1500);
    await page.keyboard.up("w");
    await panel.getByRole("searchbox", { name: "Search projects" }).fill("power bi");
    await expect(panel.getByTestId("project-grid").getByRole("link")).not.toHaveCount(0);
    await panel.getByTestId("project-grid").getByRole("link").first().click();
    await expect(panel.getByTestId("projects-back")).toBeVisible();
    await panel.getByTestId("projects-back").click();
    await expect(panel.getByTestId("project-grid")).toBeVisible();

    await panel.getByTestId("modal-close").click();
    await expect(panel).toBeHidden();
    const after = await vehicle(page);
    expect(after.x).toBeCloseTo(before.x, 1);
    expect(after.z).toBeCloseTo(before.z, 1);
    expect(after.speed).toBe(0);
    expect((await state(page)).phase).toBe("driving");
  });

  test("does not lurch forward when a key was held across a panel", async () => {
    await page.keyboard.down("w");
    await page.keyboard.press("h");
    await expect(page.getByTestId("controls-guide")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("controls-guide")).toBeHidden();
    expect(await page.evaluate(() => window.__world.input.isHeld("KeyW"))).toBe(false);
    await page.keyboard.up("w");
  });

  test("shows one prompt near a landmark and opens its content", async () => {
    await page.keyboard.press("m");
    await page.getByTestId("map-marker-experience").click();
    await expect(page.getByTestId("map-selection")).toContainText("Career Plaza");
    await page.getByTestId("map-travel").click();
    await expect(page.getByTestId("world-map")).toBeHidden();
    const prompt = page.getByTestId("interaction-prompt");
    await expect(prompt).toBeVisible();
    await expect(prompt).toHaveAttribute("data-destination", "experience");
    await expect(page.getByTestId("interaction-prompt")).toHaveCount(1);
    await expect(page.getByTestId("district")).toContainText("Career");

    await page.keyboard.press("e");
    const panel = page.getByTestId("portfolio-panel");
    await expect(panel.getByRole("dialog", { name: "Work Experience" })).toBeVisible();
    await expect(panel.getByText("Iris Waves").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    // The prompt disappears once the car is taken away.
    await teleport(page, -420, -100, Math.PI);
    await expect(prompt).toBeHidden();
  });

  test("plans a route along the roads and can cancel it", async () => {
    await teleport(page, -5.5, 300, Math.PI);
    await page.keyboard.press("m");
    await page.getByTestId("map-marker-contact").click();
    await page.getByTestId("map-route").click();
    await expect(page.getByTestId("guidance")).toBeVisible();
    await expect(page.getByTestId("guidance")).toContainText("Connection Pavilion");
    const route = await page.evaluate(() => window.__world.runtime.route);
    expect(route?.points.length).toBeGreaterThan(1);
    expect(route?.length ?? 0).toBeGreaterThan(200);
    await page.getByRole("button", { name: "Cancel route" }).click();
    await expect(page.getByTestId("guidance")).toBeHidden();
    expect((await state(page)).routeTargetId).toBeNull();
  });

  test("keeps the car out of buildings", async () => {
    // Face the central tower from the boulevard and drive straight at it.
    await teleport(page, 0, 50, Math.PI);
    await page.keyboard.down("w");
    await page.waitForFunction(() => window.__world.runtime.vehicle.z < 30, null, { timeout: 120_000 });
    await page.waitForTimeout(6000);
    await page.keyboard.up("w");
    const v = await vehicle(page);
    // The tower's collision radius is 23 m around (0, -20).
    expect(Math.hypot(v.x, v.z + 20)).toBeGreaterThan(22.5);
    expect(Number.isFinite(v.heading)).toBe(true);
    expect(Math.abs(v.x)).toBeLessThan(40);
  });

  test("drifts on the handbrake with smoke, skid marks and a score", async () => {
    // Northbound on the boulevard at about 85 km/h, then turn in and pull the handbrake.
    await teleport(page, 0, 360, Math.PI);
    await page.evaluate(() => {
      const v = window.__world.runtime.vehicle;
      v.vx = 0;
      v.vz = -24;
    });
    const meter = page.getByTestId("drift-meter");
    await expect(meter).toHaveAttribute("data-state", "idle");
    await page.keyboard.down("w");
    await page.keyboard.down("d");
    await page.keyboard.down("Space");
    await page.waitForFunction(
      () => {
        const v = window.__world.runtime.vehicle;
        return v.drift > 0.6 && Math.abs(v.slipAngle) > 0.2;
      },
      null,
      { timeout: 120_000 },
    );
    // Steering right swings the tail out to the left.
    expect(await page.evaluate(() => window.__world.runtime.vehicle.slipAngle)).toBeLessThan(0);
    await page.waitForFunction(() => window.__world.runtime.drift.active || window.__world.runtime.drift.version > 0, null, { timeout: 120_000 });
    await page.waitForFunction(() => window.__world.runtime.stats.skidMarks > 0 && window.__world.runtime.stats.smoke, null, { timeout: 120_000 });
    await expect.poll(() => meter.getAttribute("data-state"), { timeout: 60_000 }).not.toBe("idle");

    await page.keyboard.up("Space");
    await page.keyboard.up("d");
    await page.keyboard.up("w");
    // Easing off lets the tyres grip again.
    await page.waitForFunction(() => window.__world.runtime.vehicle.drift === 0, null, { timeout: 120_000 });
    await page.waitForFunction(() => !window.__world.runtime.drift.active, null, { timeout: 120_000 });
    const v = await vehicle(page);
    expect(Number.isFinite(v.x) && Number.isFinite(v.heading)).toBe(true);

    // The controls guide explains how.
    await page.keyboard.press("h");
    await expect(page.getByTestId("drift-help")).toContainText("tap the handbrake");
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("controls-guide")).toBeHidden();
    await teleport(page, -5.5, 300, Math.PI);
  });

  test("applies quality, lighting and sound settings for real", async () => {
    await page.getByTestId("hud-settings").click();
    const settings = page.getByTestId("settings-panel");
    await expect(settings.getByRole("dialog", { name: "Paused" })).toBeVisible();

    const pixelsBefore = await page.evaluate(() => {
      const c = document.querySelector<HTMLCanvasElement>("[data-testid=world-canvas] canvas");
      return c ? c.width * c.height : 0;
    });
    await settings.getByTestId("settings-quality").getByText("Medium", { exact: true }).click();
    expect((await state(page)).quality).toBe("medium");
    await settings.getByTestId("settings-time").getByText("Night", { exact: true }).click();
    expect((await state(page)).timeOfDay).toBe("night");
    await settings.getByTestId("settings-mute").click();
    expect((await state(page)).muted).toBe(true);
    await expect(settings.getByTestId("settings-volume")).toBeDisabled();
    await settings.getByTestId("settings-camera").getByText("Chase", { exact: true }).click();
    expect((await state(page)).cameraMode).toBe("chase");
    expect(pixelsBefore).toBeGreaterThan(0);

    // Back to the cheap profile for the rest of the run.
    await settings.getByTestId("settings-quality").getByText("Low", { exact: true }).click();
    await settings.getByTestId("settings-time").getByText("Golden hour", { exact: true }).click();
    await settings.getByTestId("settings-resume").click();
    await expect(settings).toBeHidden();
    expect((await state(page)).phase).toBe("driving");
    const persisted = await page.evaluate(() => JSON.parse(localStorage.getItem("abhishek-world-settings") ?? "{}"));
    expect(persisted.state.muted).toBe(true);
  });

  test("releases held input when the window loses focus", async () => {
    await page.keyboard.down("w");
    await page.waitForFunction(() => window.__world.input.isHeld("KeyW"));
    await page.evaluate(() => window.dispatchEvent(new Event("blur")));
    expect(await page.evaluate(() => window.__world.input.isHeld("KeyW"))).toBe(false);
    await page.keyboard.up("w");
  });

  test("returns to the introduction and resumes for a returning visitor", async () => {
    await page.keyboard.press("Escape");
    await page.getByTestId("settings-intro").click();
    await expect(page.getByTestId("intro-screen")).toBeVisible();
    await expect(page.getByTestId("start-driving")).toContainText("Continue driving");
    await page.getByTestId("view-portfolio").click();
    await expect(page.getByTestId("portfolio-panel").getByRole("dialog", { name: "Welcome" })).toBeVisible();
    await page.getByTestId("intro-explore").click();
    await expect(page.getByTestId("intro-screen")).toBeVisible();
  });

  test("finishes without runtime errors", async () => {
    expect(errors).toEqual([]);
  });
});
