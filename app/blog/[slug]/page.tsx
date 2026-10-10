import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/portfolio/BlogPanel";
import { PortfolioNavProvider } from "@/components/portfolio/nav";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/ui/Icon";
import { articles, getArticle } from "@/lib/data/blog";
import { site } from "@/lib/data/portfolio";
import { jsonLdScript, pageMetadata } from "@/lib/seo";

// Only the slugs listed below exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    keywords: article.tags.join(", "),
    mainEntityOfPage: `${site.siteUrl}/blog/${article.slug}`,
  };
  return (
    <SiteShell current="/blog" title="Article" kicker="Media District" narrow>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-sky hover:underline">
        <Icon name="arrowLeft" size={16} /> All articles
      </Link>
      <PortfolioNavProvider mode="page">
        <ArticleView article={article} />
      </PortfolioNavProvider>
    </SiteShell>
  );
}
