"use client";

import { site } from "@/lib/data/portfolio";
import { buttonClass } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import Icon from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { SectionLink } from "./nav";

export default function AboutPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <section aria-labelledby="about-heading">
        <div className="flex items-center gap-2">
          <h2 id="about-heading" className="hud-label text-sky">
            About {site.name.split(" ")[0]}
          </h2>
          <StatusBadge status={site.status} />
        </div>
        <p className="mt-3 text-2xl leading-snug text-fg">{site.tagline}</p>
        <div className="mt-5 space-y-4 leading-relaxed text-muted">
          {site.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <SectionLink section="experience" className={buttonClass("outline")}>
            <Icon name="briefcase" /> Experience
          </SectionLink>
          <SectionLink section="projects" className={buttonClass("outline")}>
            <Icon name="code" /> Projects
          </SectionLink>
          <SectionLink section="contact" className={buttonClass("primary")}>
            <Icon name="mail" /> Get in touch
          </SectionLink>
        </div>
      </section>
      <aside className="space-y-6">
        <dl className="divide-y divide-line rounded-xl border border-line bg-white/3">
          {site.quickFacts.map((fact) => (
            <div key={fact.label} className="px-4 py-3">
              <dt className="hud-label">{fact.label}</dt>
              <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div>
          <h3 className="hud-label">Focus areas</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {site.interests.map((i) => (
              <li key={i}>
                <Chip>{i}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
