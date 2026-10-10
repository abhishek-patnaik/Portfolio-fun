import type { MetadataRoute } from "next";
import { articles } from "@/lib/data/blog";
import { navigation, site } from "@/lib/data/portfolio";
import { projects } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.siteUrl).toString();
  return [
    ...navigation.map((n) => ({ url: url(n.href), changeFrequency: "monthly" as const, priority: n.href === "/" ? 1 : 0.8 })),
    { url: url("/case-studies"), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: url("/garage"), changeFrequency: "yearly" as const, priority: 0.3 },
    ...projects.map((p) => ({ url: url(`/projects/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...articles.map((a) => ({ url: url(`/blog/${a.slug}`), lastModified: a.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
