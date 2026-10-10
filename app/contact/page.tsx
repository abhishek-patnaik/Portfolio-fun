import ContactPanel from "@/components/portfolio/ContactPanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Email Abhishek Patnaik about analytics roles, projects and collaboration.",
  path: "/contact",
});

export default function Page() {
  return (
    <SiteShell current="/contact" title="Contact" kicker="Contact & Community District" intro="Open to full-time Data Analyst and Web Developer roles, BI consulting and agency collaborations.">
      <ContactPanel />
    </SiteShell>
  );
}
