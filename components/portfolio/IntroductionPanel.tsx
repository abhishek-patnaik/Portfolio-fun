"use client";

import Link from "next/link";
import { navigation, site, socialLinks } from "@/lib/data/portfolio";
import { buttonClass } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import Icon, { type IconName } from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { ExternalLink, SectionLink, usePortfolioNav } from "./nav";

export const SECTION_ICONS: Record<string, IconName> = {
  home: "home",
  about: "user",
  experience: "briefcase",
  education: "cap",
  projects: "code",
  creative: "palette",
  skills: "spark",
  blog: "book",
  resume: "file",
  contact: "mail",
};

export function SectionGrid() {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {navigation
        .filter((n) => n.section !== "home")
        .map((item) => (
          <li key={item.section}>
            <SectionLink
              section={item.section}
              className="group flex h-full items-center gap-3 rounded-xl border border-line bg-white/3 p-3.5 transition hover:border-sky/50 hover:bg-white/6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/6 text-sky">
                <Icon name={SECTION_ICONS[item.section]} size={19} />
              </span>
              <span className="min-w-0">
                <span className="display block text-sm font-semibold uppercase tracking-[0.12em] text-fg">{item.label}</span>
                <span className="block truncate text-xs text-muted">{item.description}</span>
              </span>
              <Icon name="chevronRight" size={16} className="ml-auto shrink-0 text-dim transition group-hover:translate-x-0.5 group-hover:text-sky" />
            </SectionLink>
          </li>
        ))}
    </ul>
  );
}

/** Welcome and introduction: the content of the central tower. */
export default function IntroductionPanel() {
  const { mode, close } = usePortfolioNav();
  return (
    <div className="space-y-8">
      <section aria-labelledby="intro-name">
        <div className="flex flex-wrap items-center gap-2">
          <p className="hud-label text-sky">{site.disciplines.join(" · ")}</p>
          <StatusBadge status={site.status} />
        </div>
        <h2 id="intro-name" className="display mt-2 text-4xl font-semibold tracking-[0.06em] text-fg sm:text-5xl">
          {site.name}
        </h2>
        <p className="mt-1 text-lg text-muted">
          {site.title} · {site.location}
        </p>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg">{site.tagline}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{site.intro}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {mode === "panel" && close ? (
            <button type="button" onClick={close} className={buttonClass("primary")} data-testid="intro-explore">
              <Icon name="wheel" /> Explore the city
            </button>
          ) : (
            <Link href="/" className={buttonClass("primary")}>
              <Icon name="wheel" /> Enter the 3D city
            </Link>
          )}
          <SectionLink section="resume" className={buttonClass("outline")}>
            <Icon name="file" /> Resume
          </SectionLink>
          <SectionLink section="contact" className={buttonClass("outline")}>
            <Icon name="mail" /> Contact
          </SectionLink>
        </div>
      </section>

      <section aria-labelledby="intro-focus" className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 id="intro-focus" className="hud-label">
            Focus areas
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {site.interests.map((i) => (
              <li key={i}>
                <Chip>{i}</Chip>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="hud-label">Primary skills</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {site.primarySkills.map((s) => (
              <li key={s}>
                <Chip tone="accent">{s}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="intro-sections">
        <h3 id="intro-sections" className="hud-label">
          {mode === "panel" ? "Jump straight to a section" : "Browse the portfolio"}
        </h3>
        <div className="mt-3">
          <SectionGrid />
        </div>
      </section>

      {socialLinks().length > 0 ? (
        <section aria-label="Profiles" className="flex flex-wrap gap-2 border-t border-line pt-5">
          {socialLinks().map((s) => (
            <ExternalLink key={s.id} href={s.url} className={buttonClass("ghost", "sm")}>
              <Icon name={s.id === "linkedin" ? "linkedin" : s.id === "github" ? "github" : "globe"} size={16} />
              {s.label}
            </ExternalLink>
          ))}
        </section>
      ) : null}
    </div>
  );
}
