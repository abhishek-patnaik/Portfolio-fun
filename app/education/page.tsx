import EducationPanel from "@/components/portfolio/EducationPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Education",
  description: "Degrees and academic background of Abhishek Patnaik.",
  path: "/education",
});

export default function Page() {
  return (
    <SiteShell current="/education" title="Education" kicker="Knowledge District" intro="Degrees and academic background.">
      <EducationPanel />
    </SiteShell>
  );
}
