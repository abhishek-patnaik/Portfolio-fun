import ProjectsPanel from "@/components/portfolio/ProjectsPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Projects and case studies by Abhishek Patnaik across data analytics, customer value, LLM classification and web engineering.",
  path: "/projects",
});

export default function Page() {
  return (
    <SiteShell current="/projects" title="Projects" kicker="Project District" intro="Data projects, case studies and side builds. Filter by category or search by technology.">
      <ProjectsPanel />
    </SiteShell>
  );
}
