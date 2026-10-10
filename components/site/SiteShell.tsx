import Link from "next/link";
import type { ReactNode } from "react";
import { navigation, site, socialLinks } from "@/lib/data/portfolio";
import { PortfolioNavProvider } from "@/components/portfolio/nav";
import Icon from "@/components/ui/Icon";

interface Props {
  /** Path of the current page, used to mark the active navigation link. */
  current: string;
  title: string;
  kicker: string;
  intro?: string;
  children: ReactNode;
  /** Narrow reading column for long-form pages. */
  narrow?: boolean;
}

/**
 * Layout for the conventional, non-3D pages. These pages never load three.js,
 * so a project or article opens instantly and is fully indexable.
 */
export default function SiteShell({ current, title, kicker, intro, children, narrow }: Props) {
  const links = navigation.filter((n) => n.section !== "home");
  return (
    <div className="flex min-h-dvh flex-col bg-deep">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-sky focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-deep/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/about" className="display shrink-0 text-base font-semibold tracking-[0.2em] text-fg">
            {site.shortName}
          </Link>
          <nav aria-label="Portfolio" className="no-scrollbar -my-1 flex min-w-0 flex-1 gap-0.5 overflow-x-auto py-1">
            {links.map((item) => {
              const active = current === item.href || current.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`display shrink-0 rounded-lg px-2.5 py-2 text-xs uppercase tracking-[0.14em] transition ${
                    active ? "bg-white/10 text-fg" : "text-muted hover:bg-white/6 hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/"
            className="display flex h-10 shrink-0 items-center gap-2 rounded-xl bg-sky px-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-white"
          >
            <Icon name="wheel" size={17} /> <span className="hidden sm:inline">Enter the city</span>
            <span className="sr-only sm:hidden">Enter the 3D city</span>
          </Link>
        </div>
      </header>

      <main id="content" className={`mx-auto w-full flex-1 px-4 py-10 sm:px-6 sm:py-14 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        <header className="mb-9">
          <p className="hud-label text-sky">{kicker}</p>
          <h1 className="display mt-2 text-4xl font-semibold tracking-[0.03em] text-fg sm:text-5xl">{title}</h1>
          {intro ? <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
        </header>
        <PortfolioNavProvider mode="page">{children}</PortfolioNavProvider>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted sm:px-6">
          <p>
            © {site.copyrightYear} {site.name}. {site.location}.
          </p>
          <ul className="flex flex-wrap gap-4">
            {site.email ? (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-fg">
                  Email
                </a>
              </li>
            ) : null}
            {socialLinks().map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/garage" className="hover:text-fg">
                The Garage
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
