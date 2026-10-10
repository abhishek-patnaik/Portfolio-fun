import type { QualityLevel } from "./deviceCapabilities";

export interface QualityProfile {
  label: string;
  description: string;
  /** Upper bound for the device pixel ratio. */
  maxDpr: number;
  shadows: boolean;
  shadowMapSize: number;
  /** Half-size of the area around the car that receives sun shadows, metres. */
  shadowRange: number;
  bloom: boolean;
  vignette: boolean;
  antialias: boolean;
  /** Camera far plane and fog distance, metres. */
  drawDistance: number;
  /** Share of trees, lamps and other decoration that is drawn (0..1). */
  propDensity: number;
  /** Street-light glow sprites and other decorative lighting. */
  decorativeLights: boolean;
  /** Real spot light for the headlamps. */
  headlightBeam: boolean;
  /** Clear-coat car paint and animated water. */
  richMaterials: boolean;
}

/**
 * The three rendering profiles. Every field is read by the renderer, so
 * changing quality in Settings changes real GPU work, not just a label.
 */
export const QUALITY: Record<QualityLevel, QualityProfile> = {
  low: {
    label: "Low",
    description: "Best for phones and older laptops",
    maxDpr: 1,
    shadows: false,
    shadowMapSize: 512,
    shadowRange: 60,
    bloom: false,
    vignette: false,
    antialias: false,
    drawDistance: 900,
    propDensity: 0.4,
    decorativeLights: false,
    headlightBeam: false,
    richMaterials: false,
  },
  medium: {
    label: "Medium",
    description: "Balanced detail and frame rate",
    maxDpr: 1.5,
    shadows: true,
    shadowMapSize: 1024,
    shadowRange: 90,
    bloom: true,
    vignette: true,
    antialias: true,
    drawDistance: 1500,
    propDensity: 0.75,
    decorativeLights: true,
    headlightBeam: true,
    richMaterials: true,
  },
  high: {
    label: "High",
    description: "Full detail for dedicated graphics",
    maxDpr: 2,
    shadows: true,
    shadowMapSize: 2048,
    shadowRange: 130,
    bloom: true,
    vignette: true,
    antialias: true,
    drawDistance: 2400,
    propDensity: 1,
    decorativeLights: true,
    headlightBeam: true,
    richMaterials: true,
  },
};

export const QUALITY_LEVELS: QualityLevel[] = ["low", "medium", "high"];
