import AboutPanel from "@/components/portfolio/AboutPanel";
import { SectionGrid } from "@/components/portfolio/IntroductionPanel";
import SiteShell from "@/components/site/SiteShell";
import { site } from "@/lib/data/portfolio";
import { jsonLdScript, pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: site.intro,
  path: "/about",
});

export default function Page() {
  return (
    <SiteShell current="/about" title={site.name} kicker={`${site.title} · ${site.location}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }} />
      <AboutPanel />
      <section aria-labelledby="about-browse" className="mt-14">
        <h2 id="about-browse" className="hud-label">
          Browse the portfolio
        </h2>
        <div className="mt-3">
          <SectionGrid />
        </div>
      </section>
    </SiteShell>
  );
}
