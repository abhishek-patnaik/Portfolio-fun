"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CaseStudy, CaseStudyTable, Project, ProjectCategory } from "@/types/portfolio";
import { caseStudies, getProject, projectCategories, projects, searchProjects } from "@/lib/data/projects";
import { buttonClass } from "@/components/ui/Button";
import { Chip, FilterBar, SearchField } from "@/components/ui/Chip";
import GeneratedCover from "@/components/ui/GeneratedCover";
import Icon from "@/components/ui/Icon";
import RichText from "@/components/ui/RichText";
import StatusBadge from "@/components/ui/StatusBadge";
import { CASE_STUDIES, ExternalLink, SectionLink, usePortfolioNav } from "./nav";

function Cover({ project, className }: { project: Project; className: string }) {
  if (project.thumbnail) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={project.thumbnail} alt="" fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" />
      </div>
    );
  }
  const seed = project.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return <GeneratedCover seed={seed} label={project.title} className={className} />;
}

function DataTable({ table }: { table: CaseStudyTable }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <caption className="hud-label border-b border-line bg-white/4 px-4 py-2.5 text-left">{table.caption}</caption>
        <thead>
          <tr className="border-b border-line text-xs text-muted">
            {table.columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-2.5 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 align-top font-medium text-fg">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 align-top leading-relaxed text-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The long-form teardown attached to a project. */
function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <section aria-labelledby="case-study-title" className="space-y-7 rounded-2xl border border-sky/25 bg-sky/[0.035] p-5 sm:p-7" data-testid="case-study">
      <header>
        <p className="hud-label text-sky">{study.label}</p>
        <h3 id="case-study-title" className="display mt-2 text-2xl font-semibold leading-snug text-fg">
          {study.title}
        </h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{study.tagline}</p>
        <dl className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {study.facts.map((f) => (
            <div key={f.label} className="rounded-lg border border-line bg-ink/40 p-3">
              <dt className="hud-label">{f.label}</dt>
              <dd className="mt-1 text-sm leading-snug text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div>
        <h4 className="hud-label">{study.stepsTitle}</h4>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {study.steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-line bg-white/3 p-3.5">
              <span className="font-mono text-xs tabular-nums text-sky">{String(i + 1).padStart(2, "0")}</span>
              <span className="display mt-1 block font-semibold text-fg">{step.title}</span>
              <span className="mt-1 block text-sm leading-snug text-muted">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>

      {study.sections.map((section, i) => (
        <div key={section.heading} className="space-y-3">
          <h4 className="display flex items-baseline gap-3 text-lg font-semibold text-fg">
            <span className="font-mono text-xs tabular-nums text-sky">{String(i + 1).padStart(2, "0")}</span>
            {section.heading}
          </h4>
          {section.paragraphs.map((text) => (
            <p key={text.slice(0, 40)} className="max-w-3xl leading-relaxed text-muted">
              <RichText text={text} />
            </p>
          ))}
          {section.code ? (
            <pre className="overflow-x-auto rounded-xl border border-line bg-ink/70 p-4 font-mono text-[0.8125rem] leading-relaxed text-fg/90" tabIndex={0} aria-label={`${section.code.language} code`}>
              <code>{section.code.code}</code>
            </pre>
          ) : null}
          {section.table ? <DataTable table={section.table} /> : null}
        </div>
      ))}
    </section>
  );
}

/** Full write-up of one project. Used by the in-world panel and by /projects/[slug]. */
export function ProjectDetail({ project }: { project: Project }) {
  const actions = [
    project.liveDemoUrl ? { href: project.liveDemoUrl, label: "Live demo", icon: "external" as const } : null,
    project.githubUrl ? { href: project.githubUrl, label: "Source code on GitHub", icon: "github" as const } : null,
    project.videoUrl ? { href: project.videoUrl, label: "Watch video", icon: "play" as const } : null,
  ].filter((a): a is NonNullable<typeof a> => a !== null);
  return (
    <article className="space-y-7">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <p className="hud-label text-sky">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          {project.caseStudy ? <Chip tone="accent">Case study</Chip> : null}
          <StatusBadge status={project.status} />
        </div>
        <h2 className="display mt-2 text-3xl font-semibold leading-tight text-fg">{project.title}</h2>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>
        {actions.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {actions.map((a, i) => (
              <ExternalLink key={a.label} href={a.href} className={buttonClass(i === 0 ? "primary" : "outline")}>
                <Icon name={a.icon} /> {a.label}
              </ExternalLink>
            ))}
          </div>
        ) : null}
      </header>

      {project.kpis.length > 0 ? (
        <dl className="grid gap-2.5 sm:grid-cols-3" data-testid="project-kpis">
          {project.kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-line bg-white/3 p-4">
              <dd className="display text-3xl font-semibold tabular-nums text-fg">{k.value}</dd>
              <dt className="mt-1 text-sm leading-snug text-muted">{k.label}</dt>
            </div>
          ))}
        </dl>
      ) : (
        <Cover project={project} className="aspect-[16/7] w-full rounded-xl border border-line" />
      )}

      {project.quote ? (
        <blockquote className="border-l-2 border-sky/60 pl-4 text-xl leading-snug text-fg">“{project.quote}”</blockquote>
      ) : null}

      <div className={`grid gap-6 ${project.objective ? "md:grid-cols-2" : ""}`}>
        <section>
          <h3 className="hud-label">Problem</h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted">{project.problem}</p>
        </section>
        {project.objective ? (
          <section>
            <h3 className="hud-label">Objective</h3>
            <p className="mt-2 leading-relaxed text-muted">{project.objective}</p>
          </section>
        ) : null}
      </div>

      <section>
        <h3 className="hud-label">Approach</h3>
        <ol className="mt-3 space-y-2.5">
          {project.approach.map((step, i) => (
            <li key={step.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-0.5 font-mono text-xs tabular-nums text-sky">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {project.insights.length > 0 ? (
          <section>
            <h3 className="hud-label">Key insights</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {project.insights.map((r) => (
                <li key={r.slice(0, 32)} className="flex gap-2.5">
                  <Icon name="spark" size={16} className="mt-0.5 shrink-0 text-sky" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section>
          <h3 className="hud-label">Impact</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {project.results.map((r) => (
              <li key={r.slice(0, 32)} className="flex gap-2.5">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-mint" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {project.learnings ? (
        <section>
          <h3 className="hud-label">What I learned</h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted">{project.learnings}</p>
        </section>
      ) : null}

      <section>
        <h3 className="hud-label">Tools used</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li key={t}>
              <Chip tone="accent">{t}</Chip>
            </li>
          ))}
        </ul>
      </section>

      {project.gallery.length > 0 ? (
        <section>
          <h3 className="hud-label">Charts from the project</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {project.gallery.map((m) => (
              <li key={m.src}>
                <figure className="overflow-hidden rounded-xl border border-line bg-[#fcfcfa]">
                  <a href={m.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full size: ${m.alt}`}>
                    <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(max-width: 640px) 100vw, 560px" className="h-auto w-full" />
                  </a>
                  {m.caption ? <figcaption className="border-t border-black/10 bg-panel px-3 py-2 text-xs text-muted">{m.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.caseStudy ? <CaseStudyView study={project.caseStudy} /> : null}
    </article>
  );
}

/** Searchable, filterable project gallery with in-place detail views. */
export default function ProjectsPanel({ itemId }: { itemId?: string }) {
  const { mode } = usePortfolioNav();
  const caseView = itemId === CASE_STUDIES;
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [onlyCases, setOnlyCases] = useState(caseView);
  const selected = itemId && !caseView ? getProject(itemId) : undefined;
  const results = useMemo(() => searchProjects(query, category, onlyCases), [query, category, onlyCases]);
  const used = useMemo(() => projectCategories.filter((c) => projects.some((p) => p.category === c)), []);
  const caseCount = useMemo(() => caseStudies().length, []);

  if (mode === "panel" && selected) {
    return (
      <div>
        <SectionLink section="projects" className="mb-5 inline-flex items-center gap-2 text-sm text-sky hover:underline" data-testid="projects-back">
          <Icon name="arrowLeft" size={16} /> All projects
        </SectionLink>
        <ProjectDetail project={selected} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_18rem] lg:items-center">
        <FilterBar label="Project category" options={["All", ...used] as const} value={category} onChange={(v) => setCategory(v as ProjectCategory | "All")} />
        <SearchField label="Search projects" placeholder="Search by title or technology" value={query} onChange={setQuery} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted" role="status" aria-live="polite">
          {results.length} {onlyCases ? (results.length === 1 ? "case study" : "case studies") : results.length === 1 ? "project" : "projects"}
        </p>
        <button
          type="button"
          aria-pressed={onlyCases}
          onClick={() => setOnlyCases((v) => !v)}
          data-testid="case-study-toggle"
          className={`display inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs uppercase tracking-[0.12em] transition ${
            onlyCases ? "border-sky/60 bg-sky/15 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
          }`}
        >
          <Icon name="book" size={15} /> Case studies only ({caseCount})
        </button>
      </div>
      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-10 text-center">
          <p className="text-fg">No projects match that search.</p>
          <button
            type="button"
            className="mt-3 text-sm text-sky hover:underline"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setOnlyCases(false);
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="project-grid">
          {results.map((project) => (
            <li key={project.id}>
              <SectionLink
                section="projects"
                itemId={project.slug}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white/3 transition hover:border-sky/50 hover:bg-white/5"
              >
                <Cover project={project} className="aspect-[16/9] w-full" />
                <span className="flex flex-1 flex-col p-4">
                  <span className="flex items-center justify-between gap-2">
                    <span className="hud-label text-sky">{project.category}</span>
                    <span className="flex items-center gap-1.5">
                      {project.caseStudy ? <span className="rounded-md border border-sky/35 bg-sky/10 px-1.5 py-0.5 text-[0.625rem] uppercase tracking-wider text-sky">Case study</span> : null}
                      <StatusBadge status={project.status} />
                    </span>
                  </span>
                  <span className="display mt-2 text-lg font-semibold leading-snug text-fg">{project.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</span>
                  {project.kpis.length > 0 ? (
                    <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {project.kpis.slice(0, 2).map((k) => (
                        <span key={k.label} className="text-xs text-muted">
                          <span className="font-mono text-sm font-medium text-fg">{k.value}</span> {k.label}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md bg-white/6 px-2 py-0.5 text-[0.6875rem] text-muted">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </SectionLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
