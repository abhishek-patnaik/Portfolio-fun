"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Article } from "@/types/portfolio";
import { articleCategories, getArticle, readingTime, relatedArticles, searchArticles } from "@/lib/data/blog";
import { FilterBar, SearchField } from "@/components/ui/Chip";
import GeneratedCover from "@/components/ui/GeneratedCover";
import Icon from "@/components/ui/Icon";
import RichText from "@/components/ui/RichText";
import StatusBadge from "@/components/ui/StatusBadge";
import { ExternalLink, SectionLink, usePortfolioNav } from "./nav";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Formats an ISO date without Date(), so server and client always agree. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[(m || 1) - 1]} ${y}`;
}

function Cover({ article, className }: { article: Article; className: string }) {
  if (article.cover) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={article.cover} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
      </div>
    );
  }
  return <GeneratedCover seed={article.coverSeed} label={article.title} className={className} />;
}

/** A single article in a comfortable reading column. */
export function ArticleView({ article }: { article: Article }) {
  const related = relatedArticles(article);
  return (
    <article className="mx-auto max-w-[44rem]">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <p className="hud-label text-violet">{article.category}</p>
          <StatusBadge status={article.status} />
        </div>
        <h2 className="display mt-2 text-3xl font-semibold leading-tight text-fg sm:text-4xl">{article.title}</h2>
        <p className="mt-3 text-sm text-muted">
          {article.author} · <time dateTime={article.date}>{formatDate(article.date)}</time> · {readingTime(article)} min read
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">{article.summary}</p>
      </header>
      <Cover article={article} className="mt-6 aspect-[16/7] w-full rounded-xl border border-line" />
      {article.takeaways && article.takeaways.length > 0 ? (
        <aside aria-labelledby="takeaways-title" className="mt-6 rounded-xl border border-violet/30 bg-violet/[0.06] p-5" data-testid="article-takeaways">
          <h3 id="takeaways-title" className="hud-label text-violet">
            Key takeaways
          </h3>
          <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-fg">
            {article.takeaways.map((t) => (
              <li key={t.slice(0, 32)} className="flex gap-2.5">
                <Icon name="check" size={16} className="mt-1 shrink-0 text-violet" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
      <div className="prose-article mt-6 text-[1.0625rem]">
        {article.body.map((block, i) => {
          switch (block.type) {
            case "h2":
              return <h2 key={i}>{block.text}</h2>;
            case "ul":
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item.slice(0, 32)}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              );
            case "quote":
              return <blockquote key={i}>{block.text}</blockquote>;
            case "code":
              return (
                <pre key={i}>
                  <code>{block.code}</code>
                </pre>
              );
            default:
              return (
                <p key={i}>
                  <RichText text={block.text} />
                </p>
              );
          }
        })}
      </div>
      <footer className="mt-8 space-y-6 border-t border-line pt-6">
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {article.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-white/6 px-2 py-1 font-mono text-xs text-muted">
              #{tag}
            </li>
          ))}
        </ul>
        {article.references.length > 0 ? (
          <div>
            <h3 className="hud-label">References</h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              {article.references.map((r) => (
                <li key={r.url}>
                  <ExternalLink href={r.url} className="inline-flex items-center gap-1.5 text-sky hover:underline">
                    {r.label} <Icon name="external" size={13} />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {related.length > 0 ? (
          <div>
            <h3 className="hud-label">Related articles</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.id}>
                  <SectionLink section="blog" itemId={r.slug} className="block h-full rounded-xl border border-line bg-white/3 p-4 transition hover:border-violet/60">
                    <span className="hud-label text-violet">{r.category}</span>
                    <span className="display mt-1 block font-semibold leading-snug text-fg">{r.title}</span>
                    <span className="mt-1 block text-xs text-muted">{readingTime(r)} min read</span>
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </footer>
    </article>
  );
}

/** Blog index with category filter and search; opens articles in place inside the city. */
export default function BlogPanel({ itemId }: { itemId?: string }) {
  const { mode } = usePortfolioNav();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchArticles(query, category), [query, category]);
  const selected = itemId ? getArticle(itemId) : undefined;

  if (mode === "panel" && selected) {
    return (
      <div>
        <SectionLink section="blog" className="mb-5 inline-flex items-center gap-2 text-sm text-sky hover:underline" data-testid="blog-back">
          <Icon name="arrowLeft" size={16} /> All articles
        </SectionLink>
        <ArticleView article={selected} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_18rem] lg:items-center">
        <FilterBar label="Article category" options={["All", ...articleCategories()]} value={category} onChange={setCategory} />
        <SearchField label="Search articles" placeholder="Search by title or tag" value={query} onChange={setQuery} />
      </div>
      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-10 text-center">
          <p className="text-fg">No articles match that search.</p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2" data-testid="article-list">
          {results.map((article, i) => (
            <li key={article.id} className={i === 0 && results.length > 2 ? "md:col-span-2" : ""}>
              <SectionLink
                section="blog"
                itemId={article.slug}
                className={`group flex h-full overflow-hidden rounded-xl border border-line bg-white/3 transition hover:border-violet/60 hover:bg-white/5 ${
                  i === 0 && results.length > 2 ? "flex-col md:flex-row" : "flex-col"
                }`}
              >
                <Cover article={article} className={i === 0 && results.length > 2 ? "aspect-[16/8] w-full md:aspect-auto md:w-2/5" : "aspect-[16/8] w-full"} />
                <span className="flex flex-1 flex-col p-5">
                  <span className="flex items-center justify-between gap-2">
                    <span className="hud-label text-violet">{article.category}</span>
                    <StatusBadge status={article.status} />
                  </span>
                  <span className="display mt-2 text-xl font-semibold leading-snug text-fg">{article.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.summary}</span>
                  <span className="mt-auto pt-4 text-xs text-dim">
                    <time dateTime={article.date}>{formatDate(article.date)}</time> · {readingTime(article)} min read
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
