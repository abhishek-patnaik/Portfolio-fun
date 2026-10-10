import type { CreativeCategory, CreativeWork } from "@/types/portfolio";

export const creativeCategories: CreativeCategory[] = [
  "Website Design",
  "Brand Identity",
  "Graphic Design",
  "AI Imagery",
  "AI Video",
  "Motion Graphics",
  "Marketing Creative",
  "Product Visualization",
  "3D Experiments",
];

/**
 * Creative work. Items without an `image` render a generated abstract cover
 * (see components/ui/GeneratedCover.tsx) so the gallery works before real media
 * is supplied. Drop images in /public/images/creative and set `image`.
 */
export const creativeWorks: CreativeWork[] = [
  {
    id: "city-world",
    title: "Portfolio City",
    category: "3D Experiments",
    description: "The procedurally generated city you can drive through on the home page: districts, bridges, harbour and skyline.",
    tools: ["Three.js", "React Three Fiber", "GLSL"],
    image: null,
    coverSeed: 11,
    caseStudy: "/projects/interactive-3d-portfolio-world",
    url: "/",
    featured: true,
    status: "verified",
  },
  {
    id: "jdm-coupe",
    title: "JDM Coupe, Modelled in Code",
    category: "3D Experiments",
    description: "A silver nineties-style Japanese sports coupe built entirely from code: lofted body, wheels, lights and cockpit.",
    tools: ["Three.js", "TypeScript"],
    image: null,
    coverSeed: 23,
    caseStudy: null,
    url: "/garage",
    featured: true,
    status: "verified",
  },
  {
    id: "studio-client-websites",
    title: "Client Websites",
    category: "Website Design",
    description: "Production websites designed and built for clients through Creative Moonlight Studios.",
    tools: ["Next.js", "Tailwind CSS", "Figma"],
    image: null,
    coverSeed: 37,
    caseStudy: null,
    url: "https://creativemoonlightstudio.com",
    featured: true,
    status: "draft",
  },
  {
    id: "ai-brand-visuals",
    title: "AI-Assisted Brand Visuals",
    category: "AI Imagery",
    description: "Sample entry for AI-generated imagery produced for brand and product storytelling.",
    tools: ["Image generation models", "Photoshop"],
    image: null,
    coverSeed: 41,
    caseStudy: null,
    url: null,
    featured: false,
    status: "placeholder",
  },
  {
    id: "ai-product-reels",
    title: "AI Product Reels",
    category: "AI Video",
    description: "Sample entry for short-form AI video content created for social channels.",
    tools: ["Video generation models", "Video editing"],
    image: null,
    coverSeed: 53,
    caseStudy: null,
    url: null,
    featured: false,
    status: "placeholder",
  },
  {
    id: "brand-identity-sample",
    title: "Brand Identity System",
    category: "Brand Identity",
    description: "Sample entry for a logo, colour and typography system.",
    tools: ["Illustrator", "Figma"],
    image: null,
    coverSeed: 67,
    caseStudy: null,
    url: null,
    featured: false,
    status: "placeholder",
  },
  {
    id: "motion-sample",
    title: "Motion Graphics Reel",
    category: "Motion Graphics",
    description: "Sample entry for animated explainers and logo stings.",
    tools: ["After Effects"],
    image: null,
    coverSeed: 71,
    caseStudy: null,
    url: null,
    featured: false,
    status: "placeholder",
  },
  {
    id: "campaign-sample",
    title: "Campaign Creative",
    category: "Marketing Creative",
    description: "Sample entry for a launch campaign across social and web.",
    tools: ["Figma", "Canva"],
    image: null,
    coverSeed: 83,
    caseStudy: null,
    url: null,
    featured: false,
    status: "placeholder",
  },
  {
    id: "product-viz-sample",
    title: "Product Visualisation",
    category: "Product Visualization",
    description: "Sample entry for rendered product shots and interactive viewers.",
    tools: ["Blender", "Three.js"],
    image: null,
    coverSeed: 97,
    caseStudy: null,
    url: null,
    featured: false,
    status: "placeholder",
  },
];

export function getCreativeWork(id: string): CreativeWork | undefined {
  return creativeWorks.find((c) => c.id === id);
}

export function featuredCreative(): CreativeWork[] {
  return creativeWorks.filter((c) => c.featured);
}
