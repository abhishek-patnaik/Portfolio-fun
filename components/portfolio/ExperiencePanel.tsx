"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/data/experience";
import { Chip } from "@/components/ui/Chip";
import Icon from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { ExternalLink, SectionLink } from "./nav";

/** Vertical career timeline. Each role expands to show the detail. */
export default function ExperiencePanel({ itemId }: { itemId?: string }) {
  const [open, setOpen] = useState<string | null>(itemId ?? experience[0]?.id ?? null);
  const focusRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (itemId) focusRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [itemId]);

  if (experience.length === 0) return <p className="text-muted">Experience will be added soon.</p>;
  return (
    <ol className="relative space-y-3 before:absolute before:bottom-4 before:left-[0.9rem] before:top-4 before:w-px before:bg-line">
      {experience.map((role) => {
        const expanded = open === role.id;
        const panelId = `experience-${role.id}`;
        return (
          <li key={role.id} id={role.id} ref={role.id === itemId ? focusRef : undefined} className="relative scroll-mt-4 pl-10">
            <span
              aria-hidden
              className={`absolute left-[0.45rem] top-5 h-3.5 w-3.5 rounded-full border-2 ${
                role.end === null ? "border-amber bg-amber/30" : "border-line-strong bg-panel"
              }`}
            />
            <div className={`rounded-xl border transition ${expanded ? "border-amber/40 bg-white/5" : "border-line bg-white/3"}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : role.id)}
                  className="flex w-full items-start gap-3 rounded-xl p-4 text-left"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="display text-lg font-semibold text-fg">{role.title}</span>
                      <StatusBadge status={role.status} />
                    </span>
                    <span className="mt-0.5 block text-sm text-amber">{role.organization}</span>
                    <span className="mt-1 block text-xs text-muted">
                      {[`${role.start} – ${role.end ?? "Present"}`, role.employmentType, role.location].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <Icon name="chevronDown" className={`mt-1 shrink-0 text-muted transition ${expanded ? "rotate-180" : ""}`} />
                </button>
              </h3>
              {expanded ? (
                <div id={panelId} className="space-y-5 border-t border-line px-4 pb-5 pt-4">
                  {role.companyDescription ? <p className="text-sm text-muted">{role.companyDescription}</p> : null}
                  <p className="leading-relaxed text-fg">{role.summary}</p>
                  {role.metrics.length > 0 ? (
                    <dl className={`grid grid-cols-2 gap-2 ${role.metrics.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
                      {role.metrics.map((m) => (
                        <div key={m.label} className="rounded-lg border border-line bg-ink/40 p-3">
                          <dd className="font-mono text-2xl font-medium tabular-nums text-fg">{m.value}</dd>
                          <dt className="mt-1 text-xs leading-snug text-muted">{m.label}</dt>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {role.responsibilities.length > 0 ? (
                    <div>
                      <h4 className="hud-label">Responsibilities</h4>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
                        {role.responsibilities.map((r) => (
                          <li key={r.slice(0, 32)} className="flex gap-2.5">
                            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {role.highlights.length > 0 ? (
                    <div>
                      <h4 className="hud-label">Highlights</h4>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {role.highlights.map((h) => (
                          <li key={h}>
                            <Chip>{h}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {role.technologies.length > 0 ? (
                    <div>
                      <h4 className="hud-label">Tools & technologies</h4>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {role.technologies.map((t) => (
                          <li key={t}>
                            <Chip tone="accent">{t}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {role.caseStudySlug ? (
                    <SectionLink
                      section="projects"
                      itemId={role.caseStudySlug}
                      className="inline-flex items-center gap-2 rounded-lg border border-amber/40 bg-amber/8 px-3 py-2 text-sm text-fg transition hover:bg-amber/15"
                    >
                      <Icon name="book" size={16} className="text-amber" /> Read the case study <Icon name="arrowRight" size={14} />
                    </SectionLink>
                  ) : null}
                  {role.website ? (
                    <ExternalLink href={role.website} className="inline-flex items-center gap-1.5 text-sm text-sky hover:underline">
                      Visit {role.organization} <Icon name="external" size={14} />
                    </ExternalLink>
                  ) : null}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
