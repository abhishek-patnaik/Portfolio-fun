import BlogPanel from "@/components/portfolio/BlogPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog & Insights",
  description: "Articles and insights on analytics, dashboards and interactive web engineering.",
  path: "/blog",
});

export default function Page() {
  return (
    <SiteShell current="/blog" title="Blog & Insights" kicker="Media District" intro="Articles on analytics and on building this site.">
      <BlogPanel />
    </SiteShell>
  );
}
