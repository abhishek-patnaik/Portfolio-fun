import type { Metadata, Viewport } from "next";
import { displayFont, monoFont, sansFont } from "./fonts";
import { site } from "@/lib/data/portfolio";
import "./globals.css";

const title = `${site.name} · ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.intro,
  applicationName: `${site.shortName} World`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: ["portfolio", "data analyst", "data science", "three.js", "interactive 3D", site.name],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${site.name} · Portfolio`,
    title,
    description: site.tagline,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.tagline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
