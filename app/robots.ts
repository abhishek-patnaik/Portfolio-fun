import type { MetadataRoute } from "next";
import { site } from "@/lib/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: new URL("/sitemap.xml", site.siteUrl).toString(),
  };
}
