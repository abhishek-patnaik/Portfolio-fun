import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/portfolio/ProjectsPanel";
import { PortfolioNavProvider } from "@/components/portfolio/nav";
import SiteShell from "@/components/site/SiteShell";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/data/portfolio";
import { getProject, projects } from "@/lib/data/projects";
import { jsonLdScript, pageMetadata } from "@/lib/seo";

// Only the slugs listed below exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    author: { "@type": "Person", name: site.name },
    keywords: project.technologies.join(", "),
    url: `${site.siteUrl}/projects/${project.slug}`,
  };
  return (
    <SiteShell current="/projects" title="Project" kicker="Project District">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-sky hover:underline">
        <Icon name="arrowLeft" size={16} /> All projects
      </Link>
      <PortfolioNavProvider mode="page">
        <ProjectDetail project={project} />
      </PortfolioNavProvider>
    </SiteShell>
  );
}
