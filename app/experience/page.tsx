import ExperiencePanel from "@/components/portfolio/ExperiencePanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work Experience",
  description: "Professional experience of Abhishek Patnaik: analytics roles, responsibilities and tools.",
  path: "/experience",
});

export default function Page() {
  return (
    <SiteShell current="/experience" title="Work Experience" kicker="Career District" intro="Roles, responsibilities and the tools used along the way.">
      <ExperiencePanel />
    </SiteShell>
  );
}
