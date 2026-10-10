import type { Metadata } from "next";
import Link from "next/link";
import CarShowcaseLoader from "@/components/vehicle/CarShowcaseLoader";

export const metadata: Metadata = {
  title: "The Garage",
  description: "A closer look at the car from the portfolio city: a silver JDM coupe modelled entirely in code.",
  alternates: { canonical: "/garage" },
};

export default function GaragePage() {
  return (
    <main className="fixed inset-0 bg-[#0b0d12]">
      <CarShowcaseLoader />
      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-6">
        <div>
          <p className="hud-label">The Garage</p>
          <h1 className="display mt-1 text-2xl font-semibold sm:text-3xl">Silver JDM Coupe</h1>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Reconstructed in code from the reference sheet. Drag to orbit, or pick a view.
          </p>
        </div>
        <Link
          href="/"
          className="glass display pointer-events-auto rounded-xl px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-fg transition hover:bg-white/10"
        >
          Back to the city
        </Link>
      </header>
    </main>
  );
}
