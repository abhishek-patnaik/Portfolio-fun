import SkillsPanel from "@/components/portfolio/SkillsPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skills & Technologies",
  description: "Skills and technologies across analytics, programming, engineering and creative work.",
  path: "/skills",
});

export default function Page() {
  return (
    <SiteShell current="/skills" title="Skills & Technologies" kicker="Skills Atrium" intro="Tools and methods, grouped by discipline and described in plain words.">
      <SkillsPanel />
    </SiteShell>
  );
}
