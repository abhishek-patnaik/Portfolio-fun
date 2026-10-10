"use client";

import dynamic from "next/dynamic";

const CarShowcase = dynamic(() => import("./CarShowcase"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="hud-label">Preparing the showroom…</p>
    </div>
  ),
});

export default function CarShowcaseLoader() {
  return <CarShowcase />;
}
