import type { SkillGroup } from "@/types/portfolio";

/**
 * Skills, from the résumé (October 2026) plus the web toolkit listed on
 * abhishekpatnaik.in. There are deliberately no percentage bars: they imply a
 * measurement that does not exist.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    name: "Languages",
    description: "The two languages behind almost every analysis.",
    skills: [
      { name: "SQL", note: "CTEs, window functions" },
      { name: "Python", note: "pandas, NumPy, scikit-learn" },
    ],
    status: "verified",
  },
  {
    id: "analytics-bi",
    name: "Analytics & BI",
    description: "Dashboards, models and KPIs that people act on.",
    skills: [
      { name: "Power BI", note: "DAX, data modelling" },
      { name: "Excel", note: "Pivot tables, advanced formulas" },
      { name: "GA4" },
      { name: "KPI design" },
      { name: "Tableau" },
      { name: "Looker Studio" },
    ],
    status: "verified",
  },
  {
    id: "statistics",
    name: "Statistics",
    description: "Sizing a finding, and designing the test that proves it.",
    skills: [
      { name: "A/B testing and power analysis" },
      { name: "Hypothesis testing" },
      { name: "Funnel and cohort analysis" },
      { name: "Survival analysis" },
      { name: "Monte Carlo simulation" },
    ],
    status: "verified",
  },
  {
    id: "ml-ai",
    name: "ML & AI",
    description: "Models used where they lead to an action.",
    skills: [
      { name: "Logistic regression" },
      { name: "Random Forest" },
      { name: "K-means" },
      { name: "CLV modelling", note: "BG/NBD" },
      { name: "LLM classification and evaluation", note: "Ollama" },
    ],
    status: "verified",
  },
  {
    id: "data-cloud",
    name: "Data & Cloud",
    description: "Where the data lives and how it is versioned.",
    skills: [
      { name: "BigQuery", note: "Partitioning, scheduled queries" },
      { name: "MySQL" },
      { name: "DuckDB" },
      { name: "Git" },
    ],
    status: "verified",
  },
  {
    id: "web",
    name: "Web & Full Stack",
    description: "Building the products around the analysis.",
    skills: [
      { name: "React & Next.js" },
      { name: "TypeScript & JavaScript" },
      { name: "FastAPI" },
      { name: "Prisma ORM" },
      { name: "Chrome Extension API" },
      { name: "HTML & CSS" },
    ],
    status: "verified",
  },
];
