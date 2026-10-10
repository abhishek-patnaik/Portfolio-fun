"use client";

import { experience } from "@/lib/data/experience";
import { site, socialLinks } from "@/lib/data/portfolio";
import { skillGroups } from "@/lib/data/skills";
import { buttonClass } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import Icon from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { ExternalLink, SectionLink } from "./nav";

/** Professional profile at a glance, with the resume download when a file exists. */
export default function ResumePanel() {
  const keySkills = skillGroups.flatMap((g) => g.skills.slice(0, 3).map((s) => s.name)).slice(0, 12);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-7">
        <section aria-labelledby="resume-summary">
          <div className="flex items-center gap-2">
            <h2 id="resume-summary" className="hud-label text-sky">
              Professional summary
            </h2>
            <StatusBadge status={site.status} />
          </div>
          <p className="mt-3 text-lg leading-relaxed text-fg">{site.summary}</p>
        </section>

        <section aria-labelledby="resume-experience">
          <h2 id="resume-experience" className="hud-label">
            Relevant experience
          </h2>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-white/3">
            {experience.map((role) => (
              <li key={role.id}>
                <SectionLink section="experience" itemId={role.id} className="flex items-center gap-4 px-4 py-3.5 transition hover:bg-white/5">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">{role.title}</span>
                    <span className="block truncate text-xs text-muted">
                      {role.organization} · {role.start} – {role.end ?? "Present"}
                    </span>
                  </span>
                  <Icon name="chevronRight" size={16} className="shrink-0 text-dim" />
                </SectionLink>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="resume-skills">
          <h2 id="resume-skills" className="hud-label">
            Key skills
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {keySkills.map((s) => (
              <li key={s}>
                <Chip tone="accent">{s}</Chip>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-line bg-white/3 p-5" data-testid="resume-download">
          <h2 className="display text-lg font-semibold text-fg">Resume</h2>
          {site.resumeFile ? (
            <>
              <p className="mt-1 text-sm text-muted">Download the latest version as a PDF.</p>
              <a href={site.resumeFile} download className={buttonClass("primary", "md", "mt-4 w-full")}>
                <Icon name="download" /> Download resume
              </a>
            </>
          ) : (
            <>
              <p className="mt-1 text-sm text-muted">
                The downloadable resume has not been added yet. In the meantime the full profile is on this site, or ask for a copy by email.
              </p>
              <button type="button" disabled className={buttonClass("outline", "md", "mt-4 w-full")}>
                <Icon name="download" /> Resume not available yet
              </button>
              {site.email ? (
                <a href={`mailto:${site.email}?subject=Resume%20request`} className={buttonClass("primary", "md", "mt-2 w-full")}>
                  <Icon name="mail" /> Request by email
                </a>
              ) : null}
            </>
          )}
        </div>
        <ul className="divide-y divide-line rounded-xl border border-line bg-white/3">
          {site.email ? (
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 px-4 py-3.5 text-sm text-fg transition hover:bg-white/5">
                <Icon name="mail" className="text-sky" /> <span className="truncate">{site.email}</span>
              </a>
            </li>
          ) : null}
          {socialLinks().map((s) => (
            <li key={s.id}>
              <ExternalLink href={s.url} className="flex items-center gap-3 px-4 py-3.5 text-sm text-fg transition hover:bg-white/5">
                <Icon name={s.id === "linkedin" ? "linkedin" : s.id === "github" ? "github" : "globe"} className="text-sky" />
                <span className="min-w-0 flex-1 truncate">{s.label}</span>
                <Icon name="external" size={14} className="text-dim" />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
