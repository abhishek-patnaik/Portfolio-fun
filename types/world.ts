import type { SectionId } from "./portfolio";

/** World units are metres. +X is east, +Z is south, +Y is up. */
export type Vec2 = readonly [x: number, z: number];

export interface Rect {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
}

export type DistrictId =
  | "central"
  | "career"
  | "knowledge"
  | "projects"
  | "creative"
  | "media"
  | "contact"
  | "waterfront";

export interface District {
  id: DistrictId;
  name: string;
  purpose: string;
  /** Accent colour used for map shading, signage and landmark lighting. */
  color: string;
  rects: Rect[];
  labelAt: Vec2;
}

export type BlockKind = "city" | "quay" | "perimeter" | "harbor";

export interface Block {
  id: string;
  kind: BlockKind;
  rect: Rect;
  district: DistrictId;
  cornerRadius: number;
}

export type Collider =
  | { type: "box"; x0: number; z0: number; x1: number; z1: number }
  | { type: "circle"; x: number; z: number; r: number };

export interface RoadLine {
  id: string;
  axis: "x" | "z";
  /** Constant coordinate: x for a north–south road, z for an east–west road. */
  at: number;
  from: number;
  to: number;
  halfWidth: number;
  kind: "street" | "avenue" | "bridge";
  name: string;
}

export interface RoadNode {
  id: string;
  x: number;
  z: number;
}

export interface RoadEdge {
  id: string;
  a: string;
  b: string;
  length: number;
  /** Polyline from node a to node b (curved for the roundabout). */
  points: Vec2[];
}

export interface Bridge {
  id: string;
  x: number;
  halfWidth: number;
  z0: number;
  z1: number;
  height: number;
  name: string;
}

export type LandmarkType =
  | "centralTower"
  | "gatewayPavilion"
  | "corporateTwin"
  | "officeTower"
  | "university"
  | "library"
  | "researchLab"
  | "projectPod"
  | "creativeStudio"
  | "galleryPavilion"
  | "mediaTower"
  | "kiosk"
  | "contactPavilion"
  | "stadium"
  | "terminal"
  | "lookout"
  | "garage";

export type DestinationKind = "section" | "item" | "easter-egg";

export interface Destination {
  id: string;
  kind: DestinationKind;
  /** Portfolio section opened when the visitor interacts. */
  section: SectionId;
  /** Stable id of a record inside that section (project slug, experience id…). */
  itemId?: string;
  name: string;
  category: string;
  description: string;
  district: DistrictId;
  position: Vec2;
  /** Interaction radius measured from `position`. */
  radius: number;
  /** A point on the road next to the destination, used for routing and fast travel. */
  access: { x: number; z: number; heading: number };
  landmark: LandmarkType;
  /** Rotation of the landmark around Y, radians. */
  rotation: number;
  color: string;
  /** Optional variant index so repeated landmark types do not look identical. */
  variant?: number;
  /** Special behaviour for easter eggs. */
  action?: "panel" | "cinematic" | "link";
  href?: string;
}

export interface BuildingBox {
  x: number;
  z: number;
  /** Bottom of the box above ground. */
  y: number;
  w: number;
  d: number;
  h: number;
  style: number;
  seed: number;
  tint: readonly [number, number, number];
  accent: readonly [number, number, number];
  lit: number;
}

export interface PropPoint {
  x: number;
  z: number;
  y: number;
  rot: number;
  scale: number;
}

export interface Billboard {
  x: number;
  y: number;
  z: number;
  rot: number;
  w: number;
  h: number;
  variant: number;
}

export interface Skybridge {
  /** Centre of the span. */
  x: number;
  z: number;
  /** Axis the bridge runs along. */
  axis: "x" | "z";
  span: number;
  height: number;
}

export interface CityData {
  buildings: BuildingBox[];
  roofProps: BuildingBox[];
  containers: BuildingBox[];
  cranes: PropPoint[];
  trees: PropPoint[];
  palms: PropPoint[];
  lamps: PropPoint[];
  billboards: Billboard[];
  skybridges: Skybridge[];
  parks: Rect[];
  colliders: Collider[];
}

export interface RouteResult {
  points: Vec2[];
  length: number;
}
