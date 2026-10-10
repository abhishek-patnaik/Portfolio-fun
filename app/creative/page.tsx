import CreativeWorkPanel from "@/components/portfolio/CreativeWorkPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Creative Work",
  description: "Creative portfolio: web design, AI imagery and video, and 3D experiments.",
  path: "/creative",
});

export default function Page() {
  return (
    <SiteShell current="/creative" title="Creative Work" kicker="Creative District" intro="Design, AI media and 3D experiments.">
      <CreativeWorkPanel />
    </SiteShell>
  );
}
