import Link from "next/link";
import { navigation } from "@/lib/data/portfolio";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-deep p-6">
      <div className="max-w-md">
        <p className="hud-label text-sky">Error 404</p>
        <h1 className="display mt-2 text-4xl font-semibold text-fg">This road does not exist</h1>
        <p className="mt-3 text-muted">The page you were looking for is not on the map. Head back to the city, or pick a section below.</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href="/" className={buttonClass("primary")}>
            Enter the city
          </Link>
          <Link href="/about" className={buttonClass("outline")}>
            About
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {navigation
            .filter((n) => n.section !== "home")
            .map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sky underline-offset-4 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
