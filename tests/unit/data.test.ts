import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { articles, getArticle, plainText, readingTime, relatedArticles, searchArticles } from "@/lib/data/blog";
import { creativeCategories, creativeWorks, getCreativeWork } from "@/lib/data/creative";
import { certifications, education } from "@/lib/data/education";
import { experience, getExperience } from "@/lib/data/experience";
import { destinations, destinationForSection, discoveries, getDiscovery } from "@/lib/data/landmarks";
import { navigation, site, socialLinks } from "@/lib/data/portfolio";
import { caseStudies, getProject, projectCategories, projects, searchProjects } from "@/lib/data/projects";
import { skillGroups } from "@/lib/data/skills";
import { nearestDestination } from "@/lib/game/destinations";
import { CASE_STUDIES, sectionHref } from "@/components/portfolio/nav";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("portfolio content", () => {
  it("has unique ids and slugs", () => {
    expect(unique(projects.map((p) => p.slug))).toBe(true);
    expect(unique(articles.map((a) => a.slug))).toBe(true);
    expect(unique(experience.map((e) => e.id))).toBe(true);
    expect(unique(creativeWorks.map((c) => c.id))).toBe(true);
    expect(unique(destinations.map((d) => d.id))).toBe(true);
  });

  it("uses known categories", () => {
    for (const p of projects) expect(projectCategories).toContain(p.category);
    for (const c of creativeWorks) expect(creativeCategories).toContain(c.category);
  });

  it("only links to safe URLs", () => {
    const urls = [
      ...socialLinks().map((s) => s.url),
      ...projects.flatMap((p) => [p.githubUrl, p.liveDemoUrl, p.videoUrl]),
      ...creativeWorks.flatMap((c) => [c.url, c.caseStudy]),
      ...experience.map((e) => e.website),
      ...certifications.map((c) => c.url),
      ...articles.flatMap((a) => a.references.map((r) => r.url)),
    ].filter((u): u is string => typeof u === "string");
    for (const url of urls) expect(url).toMatch(/^(https:\/\/|\/)/);
  });

  it("marks every record with a provenance status", () => {
    const statuses = [site.status, ...projects.map((p) => p.status), ...experience.map((e) => e.status), ...education.map((e) => e.status), ...articles.map((a) => a.status), ...creativeWorks.map((c) => c.status), ...skillGroups.map((s) => s.status)];
    for (const s of statuses) expect(["verified", "draft", "placeholder"]).toContain(s);
  });

  it("never expresses skills as percentages", () => {
    for (const g of skillGroups) for (const s of g.skills) expect(`${s.name} ${s.note ?? ""}`).not.toMatch(/\d+\s*%/);
  });

  it("searches and filters projects", () => {
    expect(searchProjects("", "All")).toHaveLength(projects.length);
    expect(searchProjects("bigquery", "All").map((p) => p.slug)).toContain("funnel-intelligence");
    expect(searchProjects("", "All", true)).toEqual(caseStudies());
    expect(caseStudies().map((p) => p.slug)).toEqual(expect.arrayContaining(["funnel-intelligence", "iris-waves-reporting", "ubixe-subscriber-segmentation", "taxbridge-ai"]));
    expect(searchProjects("", "Machine Learning").every((p) => p.category === "Machine Learning")).toBe(true);
    expect(searchProjects("no-such-thing-xyz", "All")).toHaveLength(0);
    expect(getProject("missing")).toBeUndefined();
  });

  it("supports the blog helpers", () => {
    const first = articles[0];
    expect(getArticle(first.slug)).toBe(first);
    expect(readingTime(first)).toBeGreaterThanOrEqual(1);
    expect(relatedArticles(first).every((a) => a.id !== first.id)).toBe(true);
    expect(searchArticles("bigquery", "All").length).toBeGreaterThan(0);
    expect(searchArticles("", "Career").every((a) => a.category === "Career")).toBe(true);
    expect(searchArticles("", "Career")).toHaveLength(1);
    expect(plainText("**Bold.** See [GitHub](https://github.com/x).")).toBe("Bold. See GitHub.");
  });

  it("carries the real résumé and site content, not samples", () => {
    expect(site.socials.find((s) => s.id === "github")?.url).toBe("https://github.com/abhishek-patnaik");
    expect(site.resumeFile).toBe("/resume/Abhishek_Patnaik_Resume.pdf");
    expect(experience.map((e) => e.organization)).toEqual(["Iris Waves", "The Creative Cosmos", "Ubixe Infotech Pvt. Ltd."]);
    expect(experience[0].end).toBe("Jun 2026");
    expect(articles).toHaveLength(8);
    expect([...articles].sort((a, b) => b.date.localeCompare(a.date))).toEqual(articles);
    for (const record of [...projects, ...articles, ...experience, ...education, ...skillGroups]) expect(record.status).toBe("verified");
    for (const p of projects) for (const m of p.gallery) expect(existsSync(join(process.cwd(), "public", m.src)), m.src).toBe(true);
    expect(existsSync(join(process.cwd(), "public", site.resumeFile ?? "missing"))).toBe(true);
    // Each experience case-study link points at a project that has one.
    for (const e of experience) if (e.caseStudySlug) expect(getProject(e.caseStudySlug)?.caseStudy, e.id).toBeTruthy();
  });

  it("keeps the phone number out of the site content", () => {
    const text = JSON.stringify({ site, experience, education, skillGroups, projects, articles, destinations, discoveries });
    expect(text).not.toMatch(/9810375860/);
  });
});

describe("destinations", () => {
  it("resolve to existing content", () => {
    for (const d of destinations) {
      if (!d.itemId) continue;
      if (d.section === "projects" && d.itemId === CASE_STUDIES) expect(caseStudies().length, d.id).toBeGreaterThan(0);
      else if (d.section === "projects") expect(getProject(d.itemId), d.id).toBeDefined();
      else if (d.section === "blog") expect(getArticle(d.itemId), d.id).toBeDefined();
      else if (d.section === "experience") expect(getExperience(d.itemId), d.id).toBeDefined();
      else if (d.section === "creative") expect(getCreativeWork(d.itemId), d.id).toBeDefined();
      else if (d.section === "discovery") expect(getDiscovery(d.itemId), d.id).toBeDefined();
    }
  });

  it("give every menu section a place in the city", () => {
    for (const item of navigation) expect(destinationForSection(item.section), item.section).toBeDefined();
  });

  it("derive their labels from the content records", () => {
    const pod = destinations.find((d) => d.id.startsWith("project-"));
    expect(pod).toBeDefined();
    expect(pod?.name).toBe(getProject(pod?.itemId ?? "")?.title);
  });

  it("have a discovery card for every easter egg", () => {
    const eggs = destinations.filter((d) => d.kind === "easter-egg");
    expect(eggs.length).toBeGreaterThanOrEqual(3);
    expect(discoveries.map((d) => d.id).sort()).toEqual(eggs.map((d) => d.itemId).sort());
  });

  it("pick one nearest destination and honour a preferred one", () => {
    const home = destinations.find((d) => d.id === "home");
    expect(home).toBeDefined();
    expect(nearestDestination(destinations, 0, -20)?.id).toBe("home");
    expect(nearestDestination(destinations, 2000, 2000)).toBeNull();
    // Between the tower and the Profile Vault both are in range; preference decides.
    const both = destinations.filter((d) => Math.hypot(-6 - d.position[0], 50 - d.position[1]) <= d.radius).map((d) => d.id);
    expect(both).toEqual(expect.arrayContaining(["home", "resume"]));
    expect(nearestDestination(destinations, -6, 50, "home")?.id).toBe("home");
    expect(nearestDestination(destinations, -6, 50, "resume")?.id).toBe("resume");
  });
});

describe("section links", () => {
  it("map sections and items to URLs", () => {
    expect(sectionHref("home")).toBe("/");
    expect(sectionHref("projects")).toBe("/projects");
    expect(sectionHref("projects", "abc")).toBe("/projects/abc");
    expect(sectionHref("projects", CASE_STUDIES)).toBe("/case-studies");
    expect(sectionHref("blog", "post")).toBe("/blog/post");
    expect(sectionHref("experience", "iris-waves")).toBe("/experience#iris-waves");
    expect(sectionHref("discovery", "garage")).toBe("/garage");
  });
});
