"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CreativeCategory, CreativeWork } from "@/types/portfolio";
import { creativeCategories, creativeWorks, getCreativeWork } from "@/lib/data/creative";
import { buttonClass } from "@/components/ui/Button";
import { Chip, FilterBar } from "@/components/ui/Chip";
import GeneratedCover from "@/components/ui/GeneratedCover";
import Icon from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { ExternalLink } from "./nav";

function Media({ work, className, sizes }: { work: CreativeWork; className: string; sizes: string }) {
  if (work.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={work.image} alt={work.title} fill sizes={sizes} className="object-cover" loading="lazy" />
      </div>
    );
  }
  return <GeneratedCover seed={work.coverSeed} label={work.title} className={className} />;
}

/** Full-size viewer for one piece, with keyboard support and focus handling. */
function Lightbox({ work, onClose, onStep }: { work: CreativeWork; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    ref.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, []);
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      tabIndex={-1}
      data-testid="creative-lightbox"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        } else if (e.key === "ArrowRight") onStep(1);
        else if (e.key === "ArrowLeft") onStep(-1);
      }}
      className="animate-fade fixed inset-0 z-[60] flex flex-col bg-ink/95 outline-none backdrop-blur"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <p className="hud-label truncate text-pink">{work.category}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => onStep(-1)} className={buttonClass("ghost", "sm", "w-9 px-0")} aria-label="Previous piece">
            <Icon name="arrowLeft" />
          </button>
          <button type="button" onClick={() => onStep(1)} className={buttonClass("ghost", "sm", "w-9 px-0")} aria-label="Next piece">
            <Icon name="arrowRight" />
          </button>
          <button type="button" onClick={onClose} className={buttonClass("outline", "sm", "w-9 px-0")} aria-label="Close viewer">
            <Icon name="close" />
          </button>
        </div>
      </div>
      <div className="thin-scroll grid min-h-0 flex-1 gap-6 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[1.7fr_1fr]">
        <Media work={work} className="aspect-[5/3] w-full self-start rounded-xl border border-line lg:aspect-auto lg:h-full lg:max-h-[72vh]" sizes="(max-width: 1024px) 100vw, 60vw" />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="display text-2xl font-semibold text-fg">{work.title}</h3>
            <StatusBadge status={work.status} />
          </div>
          <p className="mt-3 leading-relaxed text-muted">{work.description}</p>
          <h4 className="hud-label mt-6">Tools</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {work.tools.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {work.caseStudy ? (
              <ExternalLink href={work.caseStudy} className={buttonClass("outline")}>
                <Icon name="book" /> Case study
              </ExternalLink>
            ) : null}
            {work.url ? (
              <ExternalLink href={work.url} className={buttonClass("primary")}>
                <Icon name="external" /> View project
              </ExternalLink>
            ) : null}
            {!work.caseStudy && !work.url ? <p className="text-sm text-dim">No external link for this piece yet.</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Creative gallery: category filter, responsive grid, full-size viewer. */
export default function CreativeWorkPanel({ itemId }: { itemId?: string }) {
  const [category, setCategory] = useState<CreativeCategory | "All">("All");
  const [openId, setOpenId] = useState<string | null>(itemId && getCreativeWork(itemId) ? itemId : null);
  const used = useMemo(() => creativeCategories.filter((c) => creativeWorks.some((w) => w.category === c)), []);
  const visible = useMemo(() => creativeWorks.filter((w) => category === "All" || w.category === category), [category]);
  const open = openId ? getCreativeWork(openId) : undefined;
  const step = (dir: 1 | -1) => {
    const list = visible.length > 0 ? visible : creativeWorks;
    const i = list.findIndex((w) => w.id === openId);
    setOpenId(list[(i + dir + list.length) % list.length].id);
  };

  return (
    <div className="space-y-5">
      <FilterBar label="Creative category" options={["All", ...used] as const} value={category} onChange={(v) => setCategory(v as CreativeCategory | "All")} />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3" data-testid="creative-grid">
        {visible.map((work, i) => (
          <li key={work.id} className={i % 5 === 0 ? "col-span-2 md:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpenId(work.id)}
              className="group relative block w-full overflow-hidden rounded-xl border border-line text-left transition hover:border-pink/60"
              aria-label={`Open ${work.title}`}
            >
              <Media work={work} className={`w-full transition duration-500 group-hover:scale-[1.03] ${i % 5 === 0 ? "aspect-[2/1]" : "aspect-[4/3]"}`} sizes="(max-width: 768px) 100vw, 40vw" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent p-3 pt-10">
                <span className="flex items-center justify-between gap-2">
                  <span className="hud-label text-pink">{work.category}</span>
                  <StatusBadge status={work.status} />
                </span>
                <span className="display mt-1 block text-base font-semibold text-fg">{work.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open ? <Lightbox work={open} onClose={() => setOpenId(null)} onStep={step} /> : null}
    </div>
  );
}
