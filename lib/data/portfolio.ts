import type { NavItem, SiteConfig } from "@/types/portfolio";

/**
 * Central identity and site configuration.
 *
 * Everything the interface says about the portfolio owner comes from the files in
 * `lib/data`. Records carry a `status`:
 *   - "verified"     confirmed by the owner
 *   - "draft"        awaiting the owner's review
 *   - "placeholder"  sample content that must be replaced
 */
export const site: SiteConfig = {
  name: "Abhishek Patnaik",
  shortName: "ABHISHEK",
  title: "Data Analyst",
  disciplines: ["Analyze", "Build", "Solve", "Repeat"],
  tagline: "Data for a more human tomorrow.",
  intro:
    "I'm a Data Analyst with 2.5 years of experience. I turn messy data into decisions a team can act on, using SQL, Python, Power BI and BigQuery, and I size every recommendation in money.",
  summary:
    "Data Analyst with 2.5 years across broadband subscriptions and B2B sales operations, turning raw data into ranked, money-sized decisions with SQL, Python and Power BI. Recent work includes showing that only £6.3K of a £50K retention budget pays back, and finding a tracking gap affecting 41% of purchases in GA4 data. Validates the data before trusting it, states uncertainty plainly, and designs the test that proves each recommendation.",
  about: [
    "I'm a data analyst who thinks like a builder. I can't leave a weird number alone: when something looks off in the metrics, I keep pulling the thread until I find the real reason behind it, not just a plausible one. Then I do the part most people skip: I automate the manual pipeline around it, so the answer holds up every month.",
    "Outside of analytics, I co-run Creative Moonlight Studios, a boutique creative and engineering studio building websites, web apps, and AI workflows for real clients. Running it taught me to move fast, own the business outcome, and always design for whoever is on the other side of the screen.",
    "This city is the portfolio. Every district is a part of my work, and every landmark opens the details. Drive around, or use the menu to jump straight to what you need.",
  ],
  location: "New Delhi, India",
  email: "abhiishek.patnaik@gmail.com",
  resumeFile: "/resume/Abhishek_Patnaik_Resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/abhiishek-patnaik",
      handle: "in/abhiishek-patnaik",
    },
    { id: "github", label: "GitHub", url: "https://github.com/abhishek-patnaik", handle: "abhishek-patnaik" },
    {
      id: "studio",
      label: "Creative Moonlight Studios",
      url: "https://creativemoonlightstudio.com",
      handle: "creativemoonlightstudio.com",
    },
  ],
  interests: ["Funnel and product analytics", "Customer value and retention", "Data quality and validation", "Local LLMs for analysis", "Building web products"],
  primarySkills: ["SQL", "Python", "Power BI", "BigQuery", "Excel", "GA4"],
  quickFacts: [
    { label: "Based in", value: "New Delhi, India" },
    { label: "Experience", value: "2.5 years" },
    { label: "Availability", value: "Available to join immediately" },
    { label: "Open to", value: "Full-time Data Analyst and Web Developer roles, BI consulting, agency collaborations" },
    { label: "Also", value: "Co-runs Creative Moonlight Studios" },
  ],
  plate: "ABHISHEK",
  status: "verified",
  showStatusBadges: true,
  copyrightYear: 2026,
};

export const navigation: NavItem[] = [
  { section: "home", label: "Home", href: "/", description: "Enter the city" },
  { section: "about", label: "About", href: "/about", description: "Who I am and how I work" },
  { section: "experience", label: "Experience", href: "/experience", description: "Roles and professional journey" },
  { section: "education", label: "Education", href: "/education", description: "Degrees and academic background" },
  { section: "projects", label: "Projects", href: "/projects", description: "Projects and case studies" },
  { section: "creative", label: "Creative Work", href: "/creative", description: "Design, AI media and 3D" },
  { section: "skills", label: "Skills", href: "/skills", description: "Tools and methods" },
  { section: "blog", label: "Blog", href: "/blog", description: "Articles and insights" },
  { section: "resume", label: "Resume", href: "/resume", description: "Profile summary and download" },
  { section: "contact", label: "Contact", href: "/contact", description: "Get in touch" },
];

export function socialLinks() {
  return site.socials.filter((s): s is typeof s & { url: string } => typeof s.url === "string" && s.url.length > 0);
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.siteUrl).toString();
}
