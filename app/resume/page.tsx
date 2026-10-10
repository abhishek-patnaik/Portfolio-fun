import ResumePanel from "@/components/portfolio/ResumePanel";
import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resume & Profile",
  description: "Professional summary, key skills, experience and resume download for Abhishek Patnaik.",
  path: "/resume",
});

export default function Page() {
  return (
    <SiteShell current="/resume" title="Resume & Profile" kicker="Profile Vault" intro="A professional summary with the essentials in one place.">
      <ResumePanel />
    </SiteShell>
  );
}
