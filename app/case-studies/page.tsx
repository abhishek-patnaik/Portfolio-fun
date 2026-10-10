import ProjectsPanel from "@/components/portfolio/ProjectsPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "In-depth case studies by Abhishek Patnaik: GA4 funnel analytics in BigQuery, leadership reporting at Iris Waves, subscriber segmentation at Ubixe Infotech and the TaxBridge AI MVP.",
  path: "/case-studies",
});

export default function Page() {
  return (
    <SiteShell
      current="/projects"
      title="Case Studies"
      kicker="Case Study Library"
      intro="Technical teardowns covering cloud data warehousing, statistical inference, business intelligence, customer segmentation and a fintech side project."
    >
      <ProjectsPanel itemId="case-studies" />
    </SiteShell>
  );
}
