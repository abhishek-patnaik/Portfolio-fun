"use client";

import Link from "next/link";
import type { SectionId } from "@/types/portfolio";
import { getArticle } from "@/lib/data/blog";
import { getDiscovery } from "@/lib/data/landmarks";
import { getProject } from "@/lib/data/projects";
import { startCinematic } from "@/lib/game/actions";
import { useGameStore, type PanelTarget } from "@/lib/game/store";
import AboutPanel from "@/components/portfolio/AboutPanel";
import BlogPanel from "@/components/portfolio/BlogPanel";
import ContactPanel from "@/components/portfolio/ContactPanel";
import CreativeWorkPanel from "@/components/portfolio/CreativeWorkPanel";
import DiscoveryPanel from "@/components/portfolio/DiscoveryPanel";
import EducationPanel from "@/components/portfolio/EducationPanel";
import ExperiencePanel from "@/components/portfolio/ExperiencePanel";
import IntroductionPanel from "@/components/portfolio/IntroductionPanel";
import ProjectsPanel from "@/components/portfolio/ProjectsPanel";
import ResumePanel from "@/components/portfolio/ResumePanel";
import SkillsPanel from "@/components/portfolio/SkillsPanel";
import { CASE_STUDIES, PortfolioNavProvider, sectionHref } from "@/components/portfolio/nav";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";

const META: Record<SectionId, { title: string; kicker: string; accent: string; size: "lg" | "xl" | "full" }> = {
  home: { title: "Welcome", kicker: "Central Innovation District", accent: "#7cc4ff", size: "xl" },
  about: { title: "About", kicker: "Central Innovation District", accent: "#7cc4ff", size: "xl" },
  experience: { title: "Work Experience", kicker: "Career District", accent: "#ffb86b", size: "xl" },
  education: { title: "Education", kicker: "Knowledge District", accent: "#8be9c0", size: "xl" },
  projects: { title: "Projects", kicker: "Project District", accent: "#5ee6ff", size: "full" },
  creative: { title: "Creative Work", kicker: "Creative District", accent: "#ff7ad9", size: "full" },
  skills: { title: "Skills & Technologies", kicker: "Skills Atrium", accent: "#c7b6ff", size: "xl" },
  blog: { title: "Blog & Insights", kicker: "Media District", accent: "#b79bff", size: "full" },
  resume: { title: "Resume & Profile", kicker: "Profile Vault", accent: "#9fd6ff", size: "xl" },
  contact: { title: "Contact", kicker: "Contact & Community District", accent: "#ffd166", size: "xl" },
  discovery: { title: "Discovery", kicker: "Hidden in the city", accent: "#6fd3c7", size: "lg" },
};

function titleFor(panel: PanelTarget): string {
  if (panel.section === "projects" && panel.itemId === CASE_STUDIES) return "Case Studies";
  if (panel.section === "projects" && panel.itemId) return getProject(panel.itemId)?.title ?? META.projects.title;
  if (panel.section === "blog" && panel.itemId) return getArticle(panel.itemId)?.title ?? META.blog.title;
  if (panel.section === "discovery" && panel.itemId) return getDiscovery(panel.itemId)?.title ?? META.discovery.title;
  return META[panel.section].title;
}

function Body({ panel }: { panel: PanelTarget }) {
  switch (panel.section) {
    case "home":
      return <IntroductionPanel />;
    case "about":
      return <AboutPanel />;
    case "experience":
      return <ExperiencePanel key={panel.itemId} itemId={panel.itemId} />;
    case "education":
      return <EducationPanel itemId={panel.itemId} />;
    case "projects":
      return <ProjectsPanel itemId={panel.itemId} />;
    case "creative":
      return <CreativeWorkPanel key={panel.itemId} itemId={panel.itemId} />;
    case "skills":
      return <SkillsPanel />;
    case "blog":
      return <BlogPanel itemId={panel.itemId} />;
    case "resume":
      return <ResumePanel />;
    case "contact":
      return <ContactPanel />;
    case "discovery":
      return <DiscoveryPanel itemId={panel.itemId} onCinematic={startCinematic} />;
  }
}

/**
 * The in-world host for portfolio content. It renders the same section
 * components as the standalone pages; links inside switch the panel instead of
 * leaving the city, and closing it returns to the car exactly where it was.
 */
export default function PortfolioPanel({ panel, onClose }: { panel: PanelTarget; onClose: () => void }) {
  const openPanel = useGameStore((s) => s.openPanel);
  const meta = META[panel.section];
  const kicker =
    panel.section === "discovery"
      ? (getDiscovery(panel.itemId ?? "")?.kicker ?? meta.kicker)
      : panel.section === "projects" && panel.itemId === CASE_STUDIES
        ? "Knowledge District"
        : meta.kicker;
  const href = sectionHref(panel.section, panel.itemId);
  return (
    <Modal
      title={titleFor(panel)}
      kicker={kicker}
      accent={meta.accent}
      onClose={onClose}
      size={meta.size}
      testId="portfolio-panel"
      actions={
        panel.section !== "discovery" && panel.section !== "home" ? (
          <Link
            href={href}
            className="hidden h-10 items-center gap-2 rounded-xl border border-line px-3 text-xs text-muted transition hover:bg-white/8 hover:text-fg sm:flex"
            title="Open this section as a normal page"
          >
            <Icon name="external" size={15} /> <span className="display uppercase tracking-[0.14em]">Page</span>
          </Link>
        ) : null
      }
    >
      <PortfolioNavProvider mode="panel" go={openPanel} close={onClose}>
        <div data-section={panel.section} data-item={panel.itemId ?? ""}>
          <Body panel={panel} />
        </div>
      </PortfolioNavProvider>
    </Modal>
  );
}
