import type { Certification, EducationEntry } from "@/types/portfolio";

/** Degrees, from the résumé (October 2026). */
export const education: EducationEntry[] = [
  {
    id: "mca-jain-university",
    institution: "Jain University, Bangalore",
    degree: "Master of Computer Applications (MCA)",
    specialization: null,
    start: "2022",
    end: "2024",
    description: "Postgraduate degree in computer applications.",
    subjects: [],
    projects: [],
    achievements: ["GPA 9.1 / 10"],
    status: "verified",
  },
  {
    id: "bca-maharaja-surajmal",
    institution: "Maharaja Surajmal Institute, Delhi",
    degree: "Bachelor of Computer Applications (BCA)",
    specialization: null,
    start: "2019",
    end: "2022",
    description: "Undergraduate degree in computer applications.",
    subjects: [],
    projects: [],
    achievements: ["GPA 8.9 / 10"],
    status: "verified",
  },
];

/**
 * Neither the résumé nor the current site lists certifications, so this is
 * empty and the section is hidden. Add entries here to show it.
 */
export const certifications: Certification[] = [];

export function getEducation(id: string): EducationEntry | undefined {
  return education.find((e) => e.id === id);
}
