import { expect, test } from "@playwright/test";
import { trackErrors } from "./helpers";

/** The conventional site: every section must work with no 3D involved. */
test.describe("classic pages", () => {
  test("about page introduces the owner and links to every section", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1, name: "Abhishek Patnaik" })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    const nav = page.getByRole("navigation", { name: "Portfolio" });
    for (const label of ["Experience", "Education", "Projects", "Creative Work", "Skills", "Blog", "Resume", "Contact"]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test("projects can be filtered, searched and opened by URL", async ({ page }) => {
    await page.goto("/projects");
    const grid = page.getByTestId("project-grid");
    await expect(grid.getByRole("link")).toHaveCount(9);
    await page.getByRole("button", { name: "Business Intelligence" }).click();
    await expect(grid.getByRole("link")).toHaveCount(1);
    await page.getByRole("button", { name: "All", exact: true }).click();
    await page.getByRole("searchbox", { name: "Search projects" }).fill("bigquery");
    await expect(grid.getByRole("link")).toHaveCount(1);
    await grid.getByRole("link").first().click();
    await expect(page).toHaveURL(/\/projects\/funnel-intelligence$/);
    await expect(page.getByRole("heading", { level: 2, name: "Funnel Intelligence: GA4 E-Commerce Analytics" })).toBeVisible();
    await expect(page.getByRole("link", { name: /all projects/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /source code on github/i })).toHaveAttribute("href", "https://github.com/abhishek-patnaik/ga4-funnel-intelligence");
    // The real charts from the repository load.
    const chart = page.getByRole("img", { name: /prioritised backlog/i });
    await chart.scrollIntoViewIfNeeded();
    await expect.poll(() => chart.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  });

  test("case studies have their own page and full teardown", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(page.getByRole("heading", { level: 1, name: "Case Studies" })).toBeVisible();
    const grid = page.getByTestId("project-grid");
    await expect(grid.getByRole("link")).toHaveCount(4);
    await expect(page.getByTestId("case-study-toggle")).toHaveAttribute("aria-pressed", "true");
    await grid.getByRole("link", { name: /Iris Waves/ }).click();
    await expect(page).toHaveURL(/\/projects\/iris-waves-reporting$/);
    const study = page.getByTestId("case-study");
    await expect(study.getByRole("heading", { name: /Reporting Leadership Could Trust, and a 15% Segment Decline/ })).toBeVisible();
    await expect(study.getByRole("table")).toContainText("40+ risks flagged early, 98% on time");
    // A role links straight to its case study.
    await page.goto("/experience");
    await page.getByRole("link", { name: /read the case study/i }).first().click();
    await expect(page).toHaveURL(/\/projects\/iris-waves-reporting$/);
  });

  test("project and article pages carry their own metadata", async ({ page }) => {
    await page.goto("/projects/interactive-3d-portfolio-world");
    await expect(page).toHaveTitle(/The Interactive 3D Portfolio World/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/projects\/interactive-3d-portfolio-world$/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Interactive 3D Portfolio World/);

    await page.goto("/blog/check-the-tracking-before-you-trust-the-funnel");
    await expect(page.getByRole("heading", { level: 2, name: "Check the Tracking Before You Trust the Funnel" })).toBeVisible();
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    await expect(page.getByText(/min read/).first()).toBeVisible();
    await expect(page.getByTestId("article-takeaways")).toContainText("Audit the events before you build the funnel.");
    await expect(page.getByRole("heading", { name: "Related articles" })).toBeVisible();
  });

  test("blog index filters by category", async ({ page }) => {
    await page.goto("/blog");
    const list = page.getByTestId("article-list");
    await expect(list.getByRole("link")).toHaveCount(8);
    await expect(list.getByRole("link").first()).toContainText("Sometimes the Right Answer Is to Spend Less");
    await page.getByRole("button", { name: "Career" }).click();
    await expect(list.getByRole("link")).toHaveCount(1);
    await expect(list.getByRole("link")).toContainText("What Six Months of Sales Reporting Taught Me");
  });

  test("contact shows only the email address", async ({ page, request }) => {
    await page.goto("/contact");
    const box = page.getByTestId("contact-email");
    await expect(box.getByRole("link", { name: "abhiishek.patnaik@gmail.com" })).toHaveAttribute("href", "mailto:abhiishek.patnaik@gmail.com");
    await expect(box.getByRole("link", { name: /write an email/i })).toHaveAttribute("href", "mailto:abhiishek.patnaik@gmail.com");
    await expect(box.getByRole("button", { name: /copy address/i })).toBeVisible();
    await expect(page.locator("main form, main input, main textarea")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(/9810375860/);
    // The old form endpoint is gone.
    expect((await request.get("/api/contact")).status()).toBe(404);
  });

  test("resume page offers the PDF and it is served", async ({ page, request }) => {
    await page.goto("/resume");
    const box = page.getByTestId("resume-download");
    const link = box.getByRole("link", { name: /download resume/i });
    await expect(link).toHaveAttribute("href", "/resume/Abhishek_Patnaik_Resume.pdf");
    await expect(link).toHaveAttribute("download", "");
    const pdf = await request.get("/resume/Abhishek_Patnaik_Resume.pdf");
    expect(pdf.ok()).toBe(true);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
    await expect(page.locator("main").getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/abhishek-patnaik");
  });

  test("remaining sections render", async ({ page }) => {
    for (const [path, heading] of [
      ["/experience", "Work Experience"],
      ["/education", "Education"],
      ["/creative", "Creative Work"],
      ["/skills", "Skills & Technologies"],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    }
    await page.goto("/creative");
    await page.getByTestId("creative-grid").getByRole("button").first().click();
    await expect(page.getByTestId("creative-lightbox")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("creative-lightbox")).toBeHidden();
  });

  test("unknown routes and slugs return a helpful 404", async ({ page }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "This road does not exist" })).toBeVisible();
    const other = await page.goto("/nowhere");
    expect(other?.status()).toBe(404);
  });

  test("sitemap, robots and the social image are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const xml = await sitemap.text();
    expect(xml).toContain("/projects/funnel-intelligence");
    expect(xml).toContain("/blog/sometimes-the-right-answer-is-to-spend-less");
    expect(xml).toContain("/case-studies");
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Sitemap:");
    const og = await request.get("/opengraph-image");
    expect(og.ok()).toBe(true);
    expect(og.headers()["content-type"]).toContain("image/png");
  });

  test("the home page ships real HTML and a skip link", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain("Abhishek Patnaik");
    expect(html).toContain('href="/projects"');
    expect(html).toContain("Skip the 3D city");
    expect(html).toContain("application/ld+json");
  });
});
