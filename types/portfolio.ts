export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "creative"
  | "skills"
  | "blog"
  | "resume"
  | "contact"
  | "discovery";

/**
 * Content provenance, shown in the UI so nothing unverified is presented as fact.
 * - verified: confirmed by the portfolio owner.
 * - draft: awaiting the owner's final review.
 * - placeholder: illustrative sample content that must be replaced.
 */
export type ContentStatus = "verified" | "draft" | "placeholder";

export interface SocialLink {
  id: string;
  label: string;
  /** null hides the link everywhere in the interface. */
  url: string | null;
  handle?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  /** Three or four words shown on the central landmark. */
  disciplines: string[];
  tagline: string;
  intro: string;
  /** Professional summary, as on the résumé. */
  summary: string;
  about: string[];
  location: string;
  email: string | null;
  /** Path under /public, or null while no file has been supplied. */
  resumeFile: string | null;
  siteUrl: string;
  socials: SocialLink[];
  interests: string[];
  primarySkills: string[];
  quickFacts: { label: string; value: string }[];
  /** Number plate text on the car. */
  plate: string;
  status: ContentStatus;
  /** Show small "Draft"/"Placeholder" badges next to unverified content. */
  showStatusBadges: boolean;
  copyrightYear: number;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  title: string;
  start: string;
  /** null means present. */
  end: string | null;
  employmentType: string;
  location: string;
  companyDescription: string | null;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  /** Slug of the project that holds this role's case study, if any. */
  caseStudySlug: string | null;
  website: string | null;
  logo: string | null;
  status: ContentStatus;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  specialization: string | null;
  start: string | null;
  end: string | null;
  description: string;
  subjects: string[];
  projects: string[];
  achievements: string[];
  status: ContentStatus;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string | null;
  url: string | null;
  status: ContentStatus;
}

export type ProjectCategory =
  | "Data Science"
  | "Machine Learning"
  | "Data Analytics"
  | "Business Intelligence"
  | "Software Engineering"
  | "AI Applications"
  | "Web Development"
  | "Experimental Technology";

export interface MediaItem {
  src: string;
  alt: string;
  /** Intrinsic size, so charts can be shown uncropped without layout shift. */
  width: number;
  height: number;
  caption?: string;
}

export interface CaseStudyTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  code?: { language: string; code: string };
  table?: CaseStudyTable;
}

/** A long-form teardown attached to a project. */
export interface CaseStudy {
  /** Short label such as "Case study 01". */
  label: string;
  title: string;
  tagline: string;
  facts: { label: string; value: string }[];
  stepsTitle: string;
  steps: { title: string; text: string }[];
  sections: CaseStudySection[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  /** Optional; hidden when null. */
  objective: string | null;
  approach: string[];
  technologies: string[];
  /** Headline figures shown as tiles. */
  kpis: { value: string; label: string }[];
  insights: string[];
  results: string[];
  learnings: string | null;
  /** One-line takeaway in the owner's words. */
  quote: string | null;
  caseStudy: CaseStudy | null;
  thumbnail: string | null;
  gallery: MediaItem[];
  videoUrl: string | null;
  githubUrl: string | null;
  liveDemoUrl: string | null;
  featured: boolean;
  year: string | null;
  status: ContentStatus;
}

export type CreativeCategory =
  | "Website Design"
  | "Brand Identity"
  | "Graphic Design"
  | "AI Imagery"
  | "AI Video"
  | "Motion Graphics"
  | "Marketing Creative"
  | "Product Visualization"
  | "3D Experiments";

export interface CreativeWork {
  id: string;
  title: string;
  category: CreativeCategory;
  description: string;
  tools: string[];
  /** Local image path, or null to render a generated abstract cover. */
  image: string | null;
  /** Seed for the generated cover when no image is supplied. */
  coverSeed: number;
  caseStudy: string | null;
  url: string | null;
  featured: boolean;
  status: ContentStatus;
}

export interface SkillItem {
  name: string;
  /** Optional plain-language note. Deliberately not a percentage. */
  note?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
  status: ContentStatus;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; language: string; code: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  cover: string | null;
  coverSeed: number;
  summary: string;
  /** Short "key takeaways" shown above the body. */
  takeaways?: string[];
  body: ArticleBlock[];
  tags: string[];
  references: { label: string; url: string }[];
  status: ContentStatus;
}

export interface NavItem {
  section: SectionId;
  label: string;
  href: string;
  description: string;
}

export interface Discovery {
  id: string;
  title: string;
  kicker: string;
  body: string[];
  facts: { label: string; value: string }[];
  action: { label: string; href?: string; section?: SectionId; cinematic?: boolean } | null;
}
