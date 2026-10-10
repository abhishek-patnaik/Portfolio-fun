import { expect, test } from "@playwright/test";
import { openWorld, startDriving, state } from "./helpers";

test.describe("resilience and accessibility", () => {
  test("falls back to the classic site when WebGL is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
        if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
        return (original as (...args: unknown[]) => unknown).call(this, type, ...rest);
      } as typeof HTMLCanvasElement.prototype.getContext;
    });
    await page.goto("/");
    const error = page.getByTestId("error-screen");
    await expect(error).toBeVisible({ timeout: 60_000 });
    await expect(error).toContainText(/WebGL/);
    await expect(error.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    await expect(error.getByRole("link", { name: /classic site/i })).toHaveAttribute("href", "/about");
    await expect(error.getByTestId("error-retry")).toBeVisible();
    // Retrying re-runs the loader; with WebGL still missing it must fail cleanly again.
    await error.getByTestId("error-retry").click();
    await expect(page.getByTestId("error-screen")).toBeVisible({ timeout: 60_000 });
  });

  test("honours reduced motion and lets the keyboard reach everything", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openWorld(page);
    expect((await state(page)).reducedMotion).toBe(true);
    await expect(page.getByTestId("intro-screen")).toContainText("Reduced motion is on");
    await expect(page.getByTestId("start-driving")).toBeFocused();

    // The whole start screen is operable from the keyboard.
    await page.keyboard.press("Tab");
    await expect(page.getByTestId("view-portfolio")).toBeFocused();
    await page.keyboard.press("Enter");
    const panel = page.getByTestId("portfolio-panel");
    await expect(panel.getByRole("dialog", { name: "Welcome" })).toBeFocused();
    await panel.getByRole("link", { name: /^Resume/ }).first().click();
    await expect(panel.getByRole("dialog", { name: "Resume & Profile" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(page.getByTestId("intro-screen")).toBeVisible();

    await startDriving(page);
    // No fly-in was queued, so the driving camera is live immediately.
    expect(await page.evaluate(() => window.__world.store.getState().flyoverNonce)).toBe(0);
    await expect(page.getByRole("navigation", { name: "Game controls" })).toBeVisible();
  });

  test("survives repeated opening and closing of interfaces", async ({ page }) => {
    await openWorld(page);
    await startDriving(page);
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("m");
      await expect(page.getByTestId("world-map")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("world-map")).toBeHidden();
      await page.getByTestId("hud-menu").click();
      await expect(page.getByTestId("main-menu")).toBeVisible();
      await page.getByTestId("menu-blog").click();
      await expect(page.getByTestId("portfolio-panel")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("portfolio-panel")).toBeHidden();
    }
    const s = await state(page);
    expect(s.phase).toBe("driving");
    expect(s.overlay).toBe("none");
    // Focus returned to the control that opened the last interface.
    await expect(page.getByTestId("hud-menu")).toBeFocused();
  });
});
