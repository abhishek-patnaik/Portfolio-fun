import type { Metadata } from "next";
import { site, socialLinks } from "@/lib/data/portfolio";

/** Page metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata(options: { title: string; description: string; path: string; type?: "website" | "article"; publishedTime?: string }): Metadata {
  const { title, description, path, type = "website", publishedTime } = options;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: `${site.name} · Portfolio`,
      ...(type === "article" && publishedTime ? { publishedTime, authors: [site.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description },
  };
}

/** schema.org Person for search engines. */
export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description: site.intro,
    url: site.siteUrl,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    ...(site.email ? { email: `mailto:${site.email}` } : {}),
    sameAs: socialLinks().map((s) => s.url),
    knowsAbout: site.primarySkills,
  };
}

/** Serialises JSON-LD safely for embedding in a script tag. */
export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
