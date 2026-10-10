import type { ExperienceEntry } from "@/types/portfolio";

/**
 * Work experience, from the résumé (October 2026) with the extra detail
 * published on abhishekpatnaik.in. The first three entries get an office tower
 * in the Career District.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "iris-waves",
    organization: "Iris Waves",
    title: "Sales Excellence Executive (Data & Analytics)",
    start: "Dec 2025",
    end: "Jun 2026",
    employmentType: "Full-time · MPS Business Unit",
    location: "Delhi, India",
    companyDescription: null,
    summary:
      "Leadership reporting in Power BI, company data moved from Excel into SQL with validation checks, and exception tracking for a 1,300+ PC rollout.",
    responsibilities: [
      "Built 4 Power BI dashboards on machine base, client allocation and 3-year revenue per machine for 3 leadership stakeholders, adding state, area and national KPIs beyond the brief.",
      "Moved Excel-based company datasets into a SQL database and designed validation checks across 5+ sources, cutting reporting errors by ~30%.",
      "Found a 15% revenue decline in one product segment through segment-level variance analysis, prompting a targeted recovery plan for that segment.",
      "Ran exception tracking for a 1,300+ PC rollout, surfacing 40+ delivery risks early and helping reach 98% on-time delivery.",
      "Partnered with marketing and IT to launch the Iris Global and Iris Waves corporate sites, owning content structure, analytics-tag integration, and go-live QA.",
    ],
    technologies: ["Power BI", "DAX", "SQL", "Excel"],
    highlights: [],
    metrics: [
      { label: "On-time delivery rate", value: "98%" },
      { label: "Reporting errors cut", value: "~30%" },
      { label: "Revenue decline found", value: "15%" },
      { label: "PCs tracked in rollout", value: "1,300+" },
    ],
    caseStudySlug: "iris-waves-reporting",
    website: null,
    logo: null,
    status: "verified",
  },
  {
    id: "the-creative-cosmos",
    organization: "The Creative Cosmos",
    title: "Product Strategist and Social Media Manager",
    start: "Jan 2025",
    end: "Apr 2025",
    employmentType: "Freelance",
    location: "",
    companyDescription: "A handmade jewellery brand.",
    summary: "Product strategy and organic Instagram for a handmade jewellery brand, plus an analytics web app for the brand.",
    responsibilities: [
      "Ran product strategy and organic Instagram for a handmade jewellery brand, no paid ads (150 followers at start, 500+ today).",
      "Built an analytics web app for the brand; both Instagram and market-stall sales grew over the engagement.",
    ],
    technologies: [],
    highlights: [],
    metrics: [
      { label: "Instagram followers, organic", value: "150 → 500+" },
      { label: "Paid ads", value: "None" },
    ],
    caseStudySlug: null,
    website: null,
    logo: null,
    status: "verified",
  },
  {
    id: "ubixe-infotech",
    organization: "Ubixe Infotech Pvt. Ltd.",
    title: "Business Analyst",
    start: "Jan 2023",
    end: "Dec 2024",
    employmentType: "Full-time · Analytics & Strategy",
    location: "Gurgaon, India",
    companyDescription: null,
    summary:
      "Subscriber analytics for a residential broadband provider: segmentation, logistic regression and K-means, campaign dashboards and automated data cleaning.",
    responsibilities: [
      "Analysed the subscriber database of a residential broadband provider using SQL and Python (pandas), segmenting 2K+ customers by plan, spending, payment behaviour and tenure.",
      "Built logistic regression and K-means models to find high-value and at-risk segments, then ran campaigns that grew sales by 15%, mainly by moving monthly subscribers to quarterly and yearly plans, and cut churn-related inquiries by 12%.",
      "Built the Power BI dashboards marketing used to plan and track campaigns, and automated weekly data cleaning in Python (~6 hours to under 1 hour per cycle).",
      "Delivered 40+ weekly and monthly performance reports to senior management, distilling complex behavioural patterns into 1-page executive summaries with clear action items.",
    ],
    technologies: ["SQL", "Python", "pandas", "scikit-learn", "Power BI"],
    highlights: [],
    metrics: [
      { label: "Sales growth", value: "+15%" },
      { label: "Churn inquiries reduced", value: "12%" },
      { label: "Analyst time saved per month", value: "20+ hrs" },
      { label: "Executive reports delivered", value: "40+" },
    ],
    caseStudySlug: "ubixe-subscriber-segmentation",
    website: null,
    logo: null,
    status: "verified",
  },
];

export function getExperience(id: string): ExperienceEntry | undefined {
  return experience.find((e) => e.id === id);
}
