"use client";

import { useEffect, useRef } from "react";
import { certifications, education } from "@/lib/data/education";
import { Chip } from "@/components/ui/Chip";
import Icon from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { ExternalLink } from "./nav";

export default function EducationPanel({ itemId }: { itemId?: string }) {
  const certRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (itemId === "certifications") certRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [itemId]);

  return (
    <div className="space-y-10">
      <section aria-labelledby="education-degrees">
        <h2 id="education-degrees" className="hud-label text-mint">
          Degrees
        </h2>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {education.map((entry) => (
            <li key={entry.id} id={entry.id} className="flex flex-col rounded-xl border border-line bg-white/3 p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint/12 text-mint">
                  <Icon name="cap" size={22} />
                </span>
                <StatusBadge status={entry.status} />
              </div>
              <h3 className="display mt-4 text-lg font-semibold leading-snug text-fg">{entry.degree}</h3>
              <p className="mt-1 text-sm text-mint">{entry.institution}</p>
              <p className="mt-1 text-xs text-muted">
                {entry.start || entry.end ? `${entry.start ?? ""}${entry.start && entry.end ? " – " : ""}${entry.end ?? ""}` : "Dates to be added"}
                {entry.specialization ? ` · ${entry.specialization}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{entry.description}</p>
              {entry.achievements.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.achievements.map((a) => (
                    <li key={a}>
                      <Chip tone="accent">{a}</Chip>
                    </li>
                  ))}
                </ul>
              ) : null}
              {entry.subjects.length > 0 ? (
                <div className="mt-4">
                  <h4 className="hud-label">Relevant subjects</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {entry.subjects.map((s) => (
                      <li key={s}>
                        <Chip>{s}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {entry.projects.length > 0 ? (
                <div className="mt-4">
                  <h4 className="hud-label">Academic projects</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                    {entry.projects.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {certifications.length > 0 ? (
        <section ref={certRef} id="certifications" aria-labelledby="education-certs" className="scroll-mt-4">
          <h2 id="education-certs" className="hud-label text-mint">
            Certifications
          </h2>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-white/3">
            {certifications.map((cert) => (
              <li key={cert.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3.5">
                <Icon name="check" className="text-mint" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">{cert.name}</p>
                  <p className="text-xs text-muted">
                    {cert.issuer}
                    {cert.date ? ` · ${cert.date}` : ""}
                  </p>
                </div>
                <StatusBadge status={cert.status} />
                {cert.url ? (
                  <ExternalLink href={cert.url} className="inline-flex items-center gap-1 text-xs text-sky hover:underline">
                    Verify <Icon name="external" size={13} />
                  </ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
