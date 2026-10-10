/**
 * Portfolio destinations: the physical places in the city and the content they open.
 *
 * Buildings never carry their own copy of portfolio text. Each destination points
 * at a section (and optionally a record id) and the interface resolves the text
 * from the content files, so changing a project title updates the sign, the
 * prompt, the map and the panel together.
 */
import type { Discovery } from "@/types/portfolio";
import type { Destination, DistrictId } from "@/types/world";
import { LANE_OFFSET, ROADS_Z, getDistrict } from "@/lib/world/layout";
import { articles } from "./blog";
import { featuredCreative } from "./creative";
import { experience } from "./experience";
import { site } from "./portfolio";
import { featuredProjects } from "./projects";

const N = Math.PI;
const E = Math.PI / 2;
const S = 0;
const W = -Math.PI / 2;

const AVENUE_LANE = 6;
const zCampus = ROADS_Z[1].z;
const zAvenue = ROADS_Z[2].z;
const zNorthQuay = ROADS_Z[3].z;
const zSouthQuay = ROADS_Z[4].z;
const zMarina = ROADS_Z[5].z;

const color = (d: DistrictId) => getDistrict(d).color;

function sectionDestinations(): Destination[] {
  return [
    {
      id: "home",
      kind: "section",
      section: "home",
      name: `${site.shortName} Tower`,
      category: "Introduction",
      description: "Who I am, what I do and how to explore the city",
      district: "central",
      position: [0, -20],
      radius: 80,
      access: { x: -LANE_OFFSET - 1, z: 57, heading: N },
      landmark: "centralTower",
      rotation: 0,
      color: color("central"),
    },
    {
      id: "resume",
      kind: "section",
      section: "resume",
      name: "Profile Vault",
      category: "Resume",
      description: "Professional summary and resume download",
      district: "central",
      position: [-66, 62],
      radius: 70,
      access: { x: -AVENUE_LANE, z: 62, heading: N },
      landmark: "gatewayPavilion",
      rotation: E,
      color: "#9fd6ff",
      variant: 0,
    },
    {
      id: "skills",
      kind: "section",
      section: "skills",
      name: "Skills Atrium",
      category: "Skills & Technologies",
      description: "Tools and methods, grouped by discipline",
      district: "central",
      position: [66, 62],
      radius: 70,
      access: { x: AVENUE_LANE, z: 62, heading: S },
      landmark: "gatewayPavilion",
      rotation: W,
      color: "#c7b6ff",
      variant: 1,
    },
    {
      id: "experience",
      kind: "section",
      section: "experience",
      name: "Career Plaza",
      category: "Work Experience",
      description: "Roles, responsibilities and professional journey",
      district: "career",
      position: [315, -268],
      radius: 80,
      access: { x: 315, z: zCampus - LANE_OFFSET, heading: E },
      landmark: "corporateTwin",
      rotation: 0,
      color: color("career"),
    },
    {
      id: "education",
      kind: "section",
      section: "education",
      name: "University Hall",
      category: "Education",
      description: "Degrees, subjects and academic work",
      district: "knowledge",
      position: [-315, -272],
      radius: 84,
      access: { x: -315, z: zCampus - LANE_OFFSET, heading: E },
      landmark: "university",
      rotation: 0,
      color: color("knowledge"),
    },
    {
      id: "case-studies",
      kind: "item",
      section: "projects",
      itemId: "case-studies",
      name: "Case Study Library",
      category: "Case Studies",
      description: "In-depth teardowns of analytics work",
      district: "knowledge",
      position: [-106, -240],
      radius: 52,
      access: { x: -106, z: zCampus - LANE_OFFSET, heading: E },
      landmark: "library",
      rotation: 0,
      color: "#a8f0d0",
    },
    {
      id: "projects",
      kind: "section",
      section: "projects",
      name: "Project Lab",
      category: "Technical Projects",
      description: "Analytics, engineering and AI projects",
      district: "projects",
      position: [315, -96],
      radius: 78,
      access: { x: 315, z: zAvenue - AVENUE_LANE, heading: E },
      landmark: "researchLab",
      rotation: 0,
      color: color("projects"),
    },
    {
      id: "creative",
      kind: "section",
      section: "creative",
      name: "Creative Studio",
      category: "Creative Work",
      description: "Design, AI media and 3D experiments",
      district: "creative",
      position: [-315, -96],
      radius: 78,
      access: { x: -315, z: zAvenue - AVENUE_LANE, heading: E },
      landmark: "creativeStudio",
      rotation: 0,
      color: color("creative"),
    },
    {
      id: "blog",
      kind: "section",
      section: "blog",
      name: "Media Tower",
      category: "Blog & Insights",
      description: "Articles, tutorials and technical writing",
      district: "media",
      position: [315, 304],
      radius: 78,
      access: { x: 315, z: zSouthQuay + LANE_OFFSET, heading: W },
      landmark: "mediaTower",
      rotation: N,
      color: color("media"),
    },
    {
      id: "contact",
      kind: "section",
      section: "contact",
      name: "Connection Pavilion",
      category: "Contact & Collaboration",
      description: "Reach me by email",
      district: "contact",
      position: [-315, 304],
      radius: 80,
      access: { x: -315, z: zSouthQuay + LANE_OFFSET, heading: W },
      landmark: "contactPavilion",
      rotation: N,
      color: color("contact"),
    },
  ];
}

function itemDestinations(): Destination[] {
  const out: Destination[] = [];

  const officeSlots = [52, 112, 172];
  experience.slice(0, officeSlots.length).forEach((entry, i) => {
    out.push({
      id: `experience-${entry.id}`,
      kind: "item",
      section: "experience",
      itemId: entry.id,
      name: entry.organization,
      category: entry.title,
      description: `${entry.start} – ${entry.end ?? "Present"}`,
      district: "career",
      position: [officeSlots[i], -240],
      radius: 52,
      access: { x: officeSlots[i], z: zCampus - LANE_OFFSET, heading: E },
      landmark: "officeTower",
      rotation: 0,
      color: color("career"),
      variant: i,
    });
  });

  const podSlots: { x: number; z: number; front: "avenue" | "quay" }[] = [
    { x: 258, z: 28, front: "avenue" },
    { x: 315, z: 28, front: "avenue" },
    { x: 372, z: 28, front: "avenue" },
    { x: 286, z: 74, front: "quay" },
    { x: 344, z: 74, front: "quay" },
  ];
  featuredProjects()
    .slice(0, podSlots.length)
    .forEach((project, i) => {
      const slot = podSlots[i];
      const avenue = slot.front === "avenue";
      out.push({
        id: `project-${project.slug}`,
        kind: "item",
        section: "projects",
        itemId: project.slug,
        name: project.title,
        category: project.category,
        description: project.summary,
        district: "projects",
        position: [slot.x, slot.z],
        radius: avenue ? 48 : 38,
        access: avenue
          ? { x: slot.x, z: zAvenue + AVENUE_LANE, heading: W }
          : { x: slot.x, z: zNorthQuay - LANE_OFFSET, heading: E },
        landmark: "projectPod",
        rotation: avenue ? N : 0,
        color: color("projects"),
        variant: i,
      });
    });

  const gallerySlots = [-372, -315, -258];
  featuredCreative()
    .slice(0, gallerySlots.length)
    .forEach((work, i) => {
      out.push({
        id: `creative-${work.id}`,
        kind: "item",
        section: "creative",
        itemId: work.id,
        name: work.title,
        category: work.category,
        description: work.description,
        district: "creative",
        position: [gallerySlots[i], 28],
        radius: 48,
        access: { x: gallerySlots[i], z: zAvenue + AVENUE_LANE, heading: W },
        landmark: "galleryPavilion",
        rotation: N,
        color: color("creative"),
        variant: i,
      });
    });

  const kioskSlots: { x: number; z: number; rot: number; ax: number; az: number; h: number }[] = [
    { x: 240, z: 250, rot: N, ax: 240, az: zSouthQuay + LANE_OFFSET, h: W },
    { x: 392, z: 250, rot: N, ax: 392, az: zSouthQuay + LANE_OFFSET, h: W },
    { x: 240, z: 352, rot: 0, ax: 240, az: zMarina - LANE_OFFSET, h: E },
  ];
  articles.slice(0, kioskSlots.length).forEach((article, i) => {
    const slot = kioskSlots[i];
    out.push({
      id: `article-${article.slug}`,
      kind: "item",
      section: "blog",
      itemId: article.slug,
      name: article.title,
      category: `Article · ${article.category}`,
      description: article.summary,
      district: "media",
      position: [slot.x, slot.z],
      radius: 19,
      access: { x: slot.ax, z: slot.az, heading: slot.h },
      landmark: "kiosk",
      rotation: slot.rot,
      color: color("media"),
      variant: i,
    });
  });

  return out;
}

function easterEggs(): Destination[] {
  return [
    {
      id: "arena",
      kind: "easter-egg",
      section: "discovery",
      itemId: "arena",
      name: "Data Dome Arena",
      category: "Hidden display",
      description: "A stadium with a secret on the scoreboard",
      district: "waterfront",
      position: [106, 302],
      radius: 76,
      access: { x: 106, z: zSouthQuay + LANE_OFFSET, heading: W },
      landmark: "stadium",
      rotation: N,
      color: color("waterfront"),
    },
    {
      id: "sunset-pier",
      kind: "easter-egg",
      section: "discovery",
      itemId: "sunset-pier",
      name: "Sunset Pier",
      category: "Scenic overlook",
      description: "The best view of the skyline",
      district: "waterfront",
      position: [-106, 215.5],
      radius: 17,
      access: { x: -106, z: zSouthQuay - LANE_OFFSET, heading: E },
      landmark: "lookout",
      rotation: N,
      color: "#ffb38a",
      action: "cinematic",
    },
    {
      id: "dev-terminal",
      kind: "easter-egg",
      section: "discovery",
      itemId: "dev-terminal",
      name: "Harbor Dev Terminal",
      category: "Developer terminal",
      description: "How this world was built",
      district: "projects",
      position: [452, 40],
      radius: 42,
      access: { x: 420 - LANE_OFFSET, z: 40, heading: N },
      landmark: "terminal",
      rotation: W,
      color: "#5effa1",
    },
    {
      id: "garage",
      kind: "easter-egg",
      section: "discovery",
      itemId: "garage",
      name: "The Garage",
      category: "Vehicle showcase",
      description: "Take a closer look at the car",
      district: "waterfront",
      position: [-44, 404],
      radius: 36,
      access: { x: -44, z: zMarina + LANE_OFFSET, heading: W },
      landmark: "garage",
      rotation: N,
      color: "#d7dde6",
    },
  ];
}

export const destinations: Destination[] = [...sectionDestinations(), ...itemDestinations(), ...easterEggs()];

const BY_ID = new Map(destinations.map((d) => [d.id, d]));

export function getDestination(id: string): Destination | undefined {
  return BY_ID.get(id);
}

/** The landmark that represents a whole section, used by the menu and the map. */
export function destinationForSection(section: string): Destination | undefined {
  if (section === "about") return BY_ID.get("home");
  return destinations.find((d) => d.kind === "section" && d.section === section);
}

export const discoveries: Discovery[] = [
  {
    id: "arena",
    title: "Data Dome Arena",
    kicker: "Hidden display",
    body: [
      "You found the arena. Tonight's fixture: the city itself.",
      "Everything you have driven past is generated at load time from a few hundred lines of layout data. No models are downloaded.",
    ],
    facts: [
      { label: "City blocks", value: "30" },
      { label: "Bridges", value: "3" },
      { label: "Districts", value: "8" },
    ],
    action: { label: "Read how it was built", href: "/projects/interactive-3d-portfolio-world" },
  },
  {
    id: "sunset-pier",
    title: "Sunset Pier",
    kicker: "Scenic overlook",
    body: [
      "The quiet end of the south quay, facing the skyline across the channel.",
      "Take the cinematic camera for a slow orbit of the car against the towers.",
    ],
    facts: [],
    action: { label: "Start cinematic camera", cinematic: true },
  },
  {
    id: "dev-terminal",
    title: "Harbor Dev Terminal",
    kicker: "abhishek@world:~$ cat build.log",
    body: [
      "Stack: Next.js, TypeScript, React Three Fiber, Three.js, Zustand, Tailwind CSS.",
      "Physics: custom arcade vehicle model on a fixed 120 Hz step.",
      "Assets: zero binary models. City, car and audio are generated in code.",
    ],
    facts: [
      { label: "Physics step", value: "120 Hz" },
      { label: "Camera modes", value: "3" },
      { label: "Quality profiles", value: "3" },
    ],
    action: { label: "Read the blog", section: "blog" },
  },
  {
    id: "garage",
    title: "The Garage",
    kicker: "Vehicle showcase",
    body: [
      "A silver nineties-style Japanese sports coupe, modelled in code from a reference sheet: lofted body, hoop spoiler, five-spoke wheels and a right-hand-drive cockpit.",
      "Open the showroom to see it on a turntable from every angle.",
    ],
    facts: [
      { label: "Layout", value: "Front engine, rear drive" },
      { label: "Driving position", value: "Right-hand drive" },
    ],
    action: { label: "Open the showroom", href: "/garage" },
  },
];

export function getDiscovery(id: string): Discovery | undefined {
  return discoveries.find((d) => d.id === id);
}
