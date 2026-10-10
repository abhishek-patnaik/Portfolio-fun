// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BlogPanel from "@/components/portfolio/BlogPanel";
import ContactPanel from "@/components/portfolio/ContactPanel";
import CreativeWorkPanel from "@/components/portfolio/CreativeWorkPanel";
import EducationPanel from "@/components/portfolio/EducationPanel";
import ExperiencePanel from "@/components/portfolio/ExperiencePanel";
import IntroductionPanel from "@/components/portfolio/IntroductionPanel";
import ProjectsPanel from "@/components/portfolio/ProjectsPanel";
import ResumePanel from "@/components/portfolio/ResumePanel";
import SkillsPanel from "@/components/portfolio/SkillsPanel";
import { PortfolioNavProvider } from "@/components/portfolio/nav";
import Modal from "@/components/ui/Modal";
import { articles } from "@/lib/data/blog";
import { certifications, education } from "@/lib/data/education";
import { experience } from "@/lib/data/experience";
import { site } from "@/lib/data/portfolio";
import { projects } from "@/lib/data/projects";

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("ProjectsPanel", () => {
  it("lists every project and filters by category and search", async () => {
    const user = userEvent.setup();
    render(<ProjectsPanel />);
    const grid = screen.getByTestId("project-grid");
    expect(within(grid).getAllByRole("link")).toHaveLength(projects.length);

    await user.click(screen.getByRole("button", { name: "Data Analytics" }));
    expect(within(screen.getByTestId("project-grid")).getAllByRole("link")).toHaveLength(projects.filter((p) => p.category === "Data Analytics").length);

    await user.click(screen.getByRole("button", { name: "All" }));
    await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "duckdb");
    expect(within(screen.getByTestId("project-grid")).getByText("Funnel Intelligence: GA4 E-Commerce Analytics")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 project");
  });

  it("narrows to case studies from the toggle and from the library landmark", async () => {
    const user = userEvent.setup();
    const cases = projects.filter((p) => p.caseStudy);
    expect(cases.length).toBeGreaterThanOrEqual(4);
    const { unmount } = render(<ProjectsPanel />);
    const toggle = screen.getByTestId("case-study-toggle");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(within(screen.getByTestId("project-grid")).getAllByRole("link")).toHaveLength(cases.length);
    expect(screen.getByRole("status")).toHaveTextContent(`${cases.length} case studies`);
    unmount();

    render(<ProjectsPanel itemId="case-studies" />);
    expect(screen.getByTestId("case-study-toggle")).toHaveAttribute("aria-pressed", "true");
    expect(within(screen.getByTestId("project-grid")).getAllByRole("link")).toHaveLength(cases.length);
  });

  it("shows an empty state with a way back", async () => {
    const user = userEvent.setup();
    render(<ProjectsPanel />);
    await user.type(screen.getByRole("searchbox", { name: "Search projects" }), "zzzz-nothing");
    expect(screen.getByText("No projects match that search.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByTestId("project-grid")).toBeInTheDocument();
  });

  it("links to real pages in page mode and switches in place in panel mode", async () => {
    const user = userEvent.setup();
    const go = vi.fn();
    const first = projects[0];
    const { unmount } = render(<ProjectsPanel />);
    expect(screen.getByRole("link", { name: new RegExp(first.title) })).toHaveAttribute("href", `/projects/${first.slug}`);
    unmount();

    render(
      <PortfolioNavProvider mode="panel" go={go}>
        <ProjectsPanel />
      </PortfolioNavProvider>,
    );
    await user.click(screen.getByRole("link", { name: new RegExp(first.title) }));
    expect(go).toHaveBeenCalledWith("projects", first.slug);
  });

  it("renders a detail view without dead buttons when links are missing", () => {
    const withoutLinks = projects.find((p) => !p.githubUrl && !p.liveDemoUrl && !p.videoUrl);
    expect(withoutLinks).toBeDefined();
    render(
      <PortfolioNavProvider mode="panel" go={vi.fn()}>
        <ProjectsPanel itemId={withoutLinks?.slug} />
      </PortfolioNavProvider>,
    );
    expect(screen.getByRole("heading", { level: 2, name: withoutLinks?.title })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /source code/i })).not.toBeInTheDocument();
  });

  it("shows the headline figures, charts and the full case study", () => {
    const funnel = projects.find((p) => p.slug === "funnel-intelligence");
    expect(funnel?.caseStudy).toBeTruthy();
    render(
      <PortfolioNavProvider mode="panel" go={vi.fn()}>
        <ProjectsPanel itemId="funnel-intelligence" />
      </PortfolioNavProvider>,
    );
    const kpis = screen.getByTestId("project-kpis");
    for (const k of funnel?.kpis ?? []) expect(within(kpis).getByText(k.value)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source code on github/i })).toHaveAttribute("href", funnel?.githubUrl);
    expect(screen.getAllByRole("img").length).toBe(funnel?.gallery.length);
    const study = screen.getByTestId("case-study");
    expect(within(study).getByRole("heading", { name: funnel?.caseStudy?.title })).toBeInTheDocument();
    expect(within(study).getByRole("table")).toBeInTheDocument();
    expect(within(study).getByText("$18,704")).toBeInTheDocument();
    expect(study.querySelector("pre")).toHaveTextContent("share_missing_cart");
  });
});

describe("ContactPanel", () => {
  it("shows only the email address, with a way to write and to copy it", async () => {
    expect(site.email).toBeTruthy();
    const writeText = vi.fn(async (_text: string) => undefined);
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const { container } = render(<ContactPanel />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link).toHaveAttribute("href", `mailto:${site.email}`);
    expect(screen.getAllByText(site.email ?? "").length).toBeGreaterThan(0);

    // No form, no phone number, no other channels.
    expect(container.querySelector("form, input, textarea")).toBeNull();
    expect(container.textContent).not.toMatch(/\+?\d[\d\s-]{8,}/);
    expect(container.textContent).not.toMatch(/linkedin|github/i);

    await user.click(screen.getByRole("button", { name: /copy address/i }));
    expect(writeText).toHaveBeenCalledWith(site.email);
    expect(await screen.findByText(/copied to the clipboard/i)).toBeInTheDocument();
  });

  it("explains what to do when the clipboard is unavailable", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn(async () => {
          throw new Error("denied");
        }),
      },
      configurable: true,
    });
    render(<ContactPanel />);
    await user.click(screen.getByRole("button", { name: /copy address/i }));
    expect(await screen.findByText(/could not copy automatically/i)).toBeInTheDocument();
  });
});

describe("other sections", () => {
  it("expands a requested role in the experience timeline", async () => {
    const user = userEvent.setup();
    const last = experience[experience.length - 1];
    render(<ExperiencePanel itemId={last.id} />);
    const toggle = screen.getByRole("button", { name: new RegExp(last.organization.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(last.summary)).toBeInTheDocument();
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the degrees, and certifications only when there are any", () => {
    render(<EducationPanel />);
    expect(screen.getByRole("heading", { name: "Degrees" })).toBeInTheDocument();
    for (const entry of education) expect(screen.getByRole("heading", { name: entry.degree })).toBeInTheDocument();
    expect(screen.getByText("GPA 9.1 / 10")).toBeInTheDocument();
    const heading = screen.queryByRole("heading", { name: "Certifications" });
    if (certifications.length === 0) expect(heading).toBeNull();
    else expect(heading).toBeInTheDocument();
  });

  it("links a role to its case study", async () => {
    const user = userEvent.setup();
    const go = vi.fn();
    const role = experience.find((e) => e.caseStudySlug);
    expect(role).toBeDefined();
    render(
      <PortfolioNavProvider mode="panel" go={go}>
        <ExperiencePanel itemId={role?.id} />
      </PortfolioNavProvider>,
    );
    await user.click(screen.getByRole("link", { name: /read the case study/i }));
    expect(go).toHaveBeenCalledWith("projects", role?.caseStudySlug);
  });

  it("groups skills without percentage bars", () => {
    const { container } = render(<SkillsPanel />);
    expect(screen.getByRole("heading", { name: "Analytics & BI" })).toBeInTheDocument();
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\d+%/);
  });

  it("offers the resume download and the professional summary", () => {
    render(<ResumePanel />);
    expect(screen.getByText(site.summary)).toBeInTheDocument();
    const box = screen.getByTestId("resume-download");
    if (site.resumeFile) {
      expect(within(box).getByRole("link", { name: /download resume/i })).toHaveAttribute("href", site.resumeFile);
    } else {
      expect(within(box).getByRole("button", { name: /not available yet/i })).toBeDisabled();
      expect(box.querySelector("a[download]")).toBeNull();
    }
  });

  it("filters the blog and opens an article in place", async () => {
    const user = userEvent.setup();
    const go = vi.fn();
    const { unmount } = render(
      <PortfolioNavProvider mode="panel" go={go}>
        <BlogPanel />
      </PortfolioNavProvider>,
    );
    expect(within(screen.getByTestId("article-list")).getAllByRole("link")).toHaveLength(articles.length);
    await user.type(screen.getByRole("searchbox", { name: "Search articles" }), "dpdp");
    const links = within(screen.getByTestId("article-list")).getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    expect(links.length).toBeLessThan(articles.length);
    await user.click(links[0]);
    expect(go).toHaveBeenCalledWith("blog", expect.any(String));
    unmount();

    render(
      <PortfolioNavProvider mode="panel" go={go}>
        <BlogPanel itemId={articles[0].slug} />
      </PortfolioNavProvider>,
    );
    expect(screen.getByRole("heading", { name: articles[0].title })).toBeInTheDocument();
    expect(screen.getByTestId("blog-back")).toBeInTheDocument();
    const takeaways = screen.getByTestId("article-takeaways");
    for (const t of articles[0].takeaways ?? []) expect(within(takeaways).getByText(t)).toBeInTheDocument();
    // Inline links in the body are real, safe external links.
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/abhishek-patnaik/customer-value-engine");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("opens creative work in a full-size viewer with keyboard support", async () => {
    const user = userEvent.setup();
    render(<CreativeWorkPanel />);
    const tiles = within(screen.getByTestId("creative-grid")).getAllByRole("button");
    await user.click(tiles[0]);
    const viewer = screen.getByTestId("creative-lightbox");
    expect(viewer).toHaveAttribute("aria-modal", "true");
    const firstTitle = within(viewer).getByRole("heading", { level: 3 }).textContent;
    fireEvent.keyDown(viewer, { key: "ArrowRight" });
    expect(within(screen.getByTestId("creative-lightbox")).getByRole("heading", { level: 3 }).textContent).not.toBe(firstTitle);
    fireEvent.keyDown(screen.getByTestId("creative-lightbox"), { key: "Escape" });
    expect(screen.queryByTestId("creative-lightbox")).not.toBeInTheDocument();
  });

  it("offers every section from the introduction", () => {
    render(<IntroductionPanel />);
    expect(screen.getByRole("heading", { name: site.name })).toBeInTheDocument();
    for (const label of ["Experience", "Projects", "Blog", "Contact"]) {
      expect(screen.getAllByRole("link", { name: new RegExp(label) }).length).toBeGreaterThan(0);
    }
  });
});

describe("Modal", () => {
  it("moves focus in, traps it, closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    function Host({ open }: { open: boolean }) {
      return (
        <div>
          <button type="button">Opener</button>
          {open ? (
            <Modal title="Test dialog" onClose={onClose}>
              <button type="button">Inside</button>
            </Modal>
          ) : null}
        </div>
      );
    }
    const { rerender } = render(<Host open={false} />);
    const opener = screen.getByRole("button", { name: "Opener" });
    opener.focus();
    rerender(<Host open />);
    const dialog = screen.getByRole("dialog", { name: "Test dialog" });
    expect(dialog).toHaveFocus();

    // jsdom has no layout, so give the dialog's controls a parent for the visibility check.
    for (const el of Array.from(dialog.querySelectorAll<HTMLElement>("button"))) Object.defineProperty(el, "offsetParent", { get: () => dialog });
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Inside" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Inside" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
    rerender(<Host open={false} />);
    expect(opener).toHaveFocus();
  });
});
