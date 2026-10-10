import { expect, test, type Locator, type Page } from "@playwright/test";
import { openWorld, startDriving, state, vehicle } from "./helpers";

async function inViewport(page: Page, locator: Locator): Promise<void> {
  const box = await locator.boundingBox();
  const size = page.viewportSize();
  expect(box, "element should be laid out").not.toBeNull();
  if (!box || !size) return;
  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.y).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(size.width + 1);
  expect(box.y + box.height).toBeLessThanOrEqual(size.height + 1);
}

/** Holds a control down with a real pointer sequence, as a thumb would. */
async function hold(page: Page, testId: string): Promise<() => Promise<void>> {
  const box = await page.getByTestId(testId).boundingBox();
  if (!box) throw new Error(`${testId} is not visible`);
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.getByTestId(testId).dispatchEvent("pointerdown", { pointerId: 7, pointerType: "touch", clientX: x, clientY: y, bubbles: true, isPrimary: true });
  return async () => {
    await page.getByTestId(testId).dispatchEvent("pointerup", { pointerId: 7, pointerType: "touch", clientX: x, clientY: y, bubbles: true, isPrimary: true });
  };
}

test.describe("phone experience", () => {
  test("drives with on-screen controls and keeps the interface on screen", async ({ page }) => {
    await openWorld(page);
    expect(await page.evaluate(() => window.__world.store.getState().touchDevice)).toBe(true);
    await inViewport(page, page.getByTestId("start-driving"));
    await startDriving(page);

    const controls = page.getByTestId("touch-controls");
    await expect(controls).toBeVisible();
    for (const id of ["touch-gas", "touch-brake", "touch-steer", "touch-camera", "touch-recover", "hud-menu", "hud-map", "hud-settings", "speedometer"]) {
      await inViewport(page, page.getByTestId(id));
    }

    // Holding the pedal keeps the car accelerating without repeated taps.
    const releaseGas = await hold(page, "touch-gas");
    await expect(page.getByTestId("touch-gas")).toHaveAttribute("data-held", "true");
    expect(await page.evaluate(() => window.__world.input.touch.throttle)).toBe(1);
    await page.waitForFunction(() => window.__world.runtime.vehicle.speed > 2, null, { timeout: 120_000 });
    await releaseGas();
    expect(await page.evaluate(() => window.__world.input.touch.throttle)).toBe(0);

    // Steering pad: drag to the right of centre.
    const pad = await page.getByTestId("touch-steer").boundingBox();
    if (!pad) throw new Error("steering pad missing");
    const cy = pad.y + pad.height / 2;
    await page.getByTestId("touch-steer").dispatchEvent("pointerdown", { pointerId: 9, pointerType: "touch", clientX: pad.x + pad.width / 2, clientY: cy, bubbles: true });
    await page.getByTestId("touch-steer").dispatchEvent("pointermove", { pointerId: 9, pointerType: "touch", clientX: pad.x + pad.width * 0.92, clientY: cy, bubbles: true });
    expect(await page.evaluate(() => window.__world.input.touch.steer)).toBeGreaterThan(0.8);
    await page.getByTestId("touch-steer").dispatchEvent("pointerup", { pointerId: 9, pointerType: "touch", clientX: pad.x + pad.width * 0.92, clientY: cy, bubbles: true });
    expect(await page.evaluate(() => window.__world.input.touch.steer)).toBe(0);

    // Brake to a stop, then the same pedal reverses.
    const releaseBrake = await hold(page, "touch-brake");
    await page.waitForFunction(() => window.__world.runtime.vehicle.speed < -0.5, null, { timeout: 120_000 });
    await releaseBrake();

    await page.getByTestId("touch-camera").tap();
    expect(["chase", "cinematic", "cockpit"]).toContain((await state(page)).cameraMode);
  });

  test("opens full-screen panels and the map on a phone", async ({ page }) => {
    await openWorld(page);
    await startDriving(page);
    await page.getByTestId("hud-menu").tap();
    await page.getByTestId("menu-contact").tap();
    const dialog = page.getByTestId("portfolio-panel").getByRole("dialog");
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    const size = page.viewportSize();
    expect(box?.width).toBeGreaterThanOrEqual((size?.width ?? 0) - 2);
    expect(box?.height).toBeLessThanOrEqual((size?.height ?? 0) + 1);
    await expect(page.getByTestId("touch-controls")).toBeHidden();
    await expect(dialog.getByRole("link", { name: /write an email/i })).toHaveAttribute("href", "mailto:abhiishek.patnaik@gmail.com");
    await inViewport(page, dialog.getByRole("button", { name: /copy address/i }));
    await page.getByTestId("modal-close").tap();

    await page.getByTestId("hud-map").tap();
    await expect(page.getByTestId("world-map")).toBeVisible();
    await page.getByRole("navigation", { name: "Destinations" }).getByRole("button", { name: "Media Tower" }).tap();
    await page.getByTestId("map-travel").tap();
    await expect(page.getByTestId("interaction-prompt")).toBeVisible();
    await inViewport(page, page.getByTestId("interaction-prompt"));
    await expect(page.getByTestId("touch-interact")).toBeVisible();
    await page.getByTestId("touch-interact").tap();
    await expect(page.getByTestId("portfolio-panel").getByRole("dialog", { name: "Blog & Insights" })).toBeVisible();
    const v = await vehicle(page);
    expect(Math.hypot(v.x - 315, v.z - 234.5)).toBeLessThan(2);
  });

  test("classic pages fit a narrow screen", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByTestId("project-grid").getByRole("link").first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.goto("/blog/india-dpdp-rules-read-by-an-analyst");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });
});
