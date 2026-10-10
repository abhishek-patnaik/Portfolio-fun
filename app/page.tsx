import Link from "next/link";
import GameLoader from "@/components/game/GameLoader";
import { navigation, site } from "@/lib/data/portfolio";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

/**
 * Home: the 3D city. The world itself is client-only, but the page still ships
 * real HTML: a skip link, a text overview with links to every section for
 * search engines and assistive technology, and a no-JavaScript fallback.
 */
export default function HomePage() {
  const links = navigation.filter((n) => n.section !== "home");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }} />
      <Link
        href="/about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-sky focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip the 3D city and open the classic portfolio
      </Link>
      <GameLoader />
      <section className="sr-only" aria-label="Portfolio overview">
        <h1>
          {site.name}: {site.title}
        </h1>
        <p>{site.tagline}</p>
        <p>{site.intro}</p>
        <p>This home page is an interactive 3D city. Every part of the portfolio is also available as a normal page:</p>
        <ul>
          {links.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>
                {n.label}: {n.description}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <noscript>
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-ink p-8 text-fg">
          <h1 className="display text-4xl font-semibold">{site.name}</h1>
          <p className="mt-2 text-muted">{site.tagline}</p>
          <p className="mt-6">The interactive city needs JavaScript. The full portfolio is available without it:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {links.map((n) => (
              <li key={n.href}>
                <a className="text-sky underline" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </>
  );
}
