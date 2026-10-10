"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SectionId } from "@/types/portfolio";
import type { CameraMode } from "@/types/vehicle";
import type { DistrictId } from "@/types/world";
import type { QualityLevel } from "@/lib/utils/deviceCapabilities";

export type Phase = "loading" | "intro" | "driving" | "error";
export type Overlay = "none" | "panel" | "map" | "menu" | "settings" | "controls";
export type TimeOfDay = "golden" | "day" | "night";
export type InputMode = "keyboard" | "touch" | "gamepad";
export type StageStatus = "pending" | "active" | "done";

export const LOADING_STAGES = [
  { id: "app", label: "Initializing application" },
  { id: "vehicle", label: "Loading vehicle assets" },
  { id: "city", label: "Preparing the city" },
  { id: "environment", label: "Loading environment textures" },
  { id: "controls", label: "Initializing controls" },
  { id: "experience", label: "Preparing the experience" },
] as const;

export type StageId = (typeof LOADING_STAGES)[number]["id"];

export interface PanelTarget {
  section: SectionId;
  itemId?: string;
}

interface GameState {
  phase: Phase;
  overlay: Overlay;
  panel: PanelTarget | null;
  stages: Record<StageId, StageStatus>;
  error: string | null;

  cameraMode: CameraMode;
  quality: QualityLevel;
  /** True until the visitor picks a quality level by hand. */
  qualityAuto: boolean;
  timeOfDay: TimeOfDay;
  muted: boolean;
  volume: number;
  introSeen: boolean;
  /** Highest banked drift score, kept between visits. */
  bestDrift: number;
  discovered: string[];

  engineOn: boolean;
  nearbyId: string | null;
  district: DistrictId;
  routeTargetId: string | null;
  inputMode: InputMode;
  reducedMotion: boolean;
  touchDevice: boolean;
  stuck: boolean;
  toast: { id: number; text: string } | null;
  /** Incremented to make the camera replay its arrival move. */
  flyoverNonce: number;

  setStage: (id: StageId, status: StageStatus) => void;
  fail: (message: string) => void;
  setPhase: (phase: Phase) => void;
  startDriving: () => void;
  returnToIntro: () => void;

  openPanel: (section: SectionId, itemId?: string) => void;
  openOverlay: (overlay: Exclude<Overlay, "none" | "panel">) => void;
  toggleOverlay: (overlay: Exclude<Overlay, "none" | "panel">) => void;
  closeOverlay: () => void;

  setCameraMode: (mode: CameraMode) => void;
  cycleCamera: () => void;
  toggleCockpitChase: () => void;
  setQuality: (quality: QualityLevel, auto?: boolean) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setBestDrift: (points: number) => void;
  setEngine: (on: boolean) => void;
  setNearby: (id: string | null) => void;
  setDistrict: (id: DistrictId) => void;
  setRouteTarget: (id: string | null) => void;
  markDiscovered: (id: string) => void;
  setInputMode: (mode: InputMode) => void;
  setDevice: (device: { reducedMotion: boolean; touch: boolean }) => void;
  setStuck: (stuck: boolean) => void;
  showToast: (text: string) => void;
  clearToast: (id: number) => void;
}

const CAMERA_ORDER: CameraMode[] = ["cockpit", "chase", "cinematic"];

const initialStages = (): Record<StageId, StageStatus> => ({
  app: "active",
  vehicle: "pending",
  city: "pending",
  environment: "pending",
  controls: "pending",
  experience: "pending",
});

let toastId = 0;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "loading",
      overlay: "none",
      panel: null,
      stages: initialStages(),
      error: null,

      cameraMode: "cockpit",
      quality: "medium",
      qualityAuto: true,
      timeOfDay: "golden",
      muted: false,
      volume: 0.7,
      introSeen: false,
      bestDrift: 0,
      discovered: [],

      engineOn: false,
      nearbyId: null,
      district: "waterfront",
      routeTargetId: null,
      inputMode: "keyboard",
      reducedMotion: false,
      touchDevice: false,
      stuck: false,
      toast: null,
      flyoverNonce: 0,

      setStage: (id, status) => set((s) => ({ stages: { ...s.stages, [id]: status } })),
      fail: (message) => set({ phase: "error", error: message }),
      setPhase: (phase) => set({ phase }),
      startDriving: () =>
        set((s) => ({
          phase: "driving",
          overlay: "none",
          panel: null,
          engineOn: true,
          flyoverNonce: s.introSeen || s.reducedMotion ? s.flyoverNonce : s.flyoverNonce + 1,
          introSeen: true,
        })),
      returnToIntro: () => set({ phase: "intro", overlay: "none", panel: null }),

      openPanel: (section, itemId) => set({ overlay: "panel", panel: { section, itemId } }),
      openOverlay: (overlay) => set({ overlay, panel: null }),
      toggleOverlay: (overlay) => set((s) => (s.overlay === overlay ? { overlay: "none" } : { overlay, panel: null })),
      closeOverlay: () => set({ overlay: "none", panel: null }),

      setCameraMode: (cameraMode) => set({ cameraMode: CAMERA_ORDER.includes(cameraMode) ? cameraMode : "chase" }),
      cycleCamera: () => {
        const i = CAMERA_ORDER.indexOf(get().cameraMode);
        set({ cameraMode: CAMERA_ORDER[(i + 1) % CAMERA_ORDER.length] });
      },
      toggleCockpitChase: () => set((s) => ({ cameraMode: s.cameraMode === "cockpit" ? "chase" : "cockpit" })),
      setQuality: (quality, auto = false) => set({ quality, qualityAuto: auto }),
      setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
      setMuted: (muted) => set({ muted }),
      setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
      setBestDrift: (points) => set((s) => ({ bestDrift: Math.max(s.bestDrift, Math.round(points)) })),
      setEngine: (engineOn) => set({ engineOn }),
      setNearby: (nearbyId) => {
        if (get().nearbyId !== nearbyId) set({ nearbyId });
      },
      setDistrict: (district) => {
        if (get().district !== district) set({ district });
      },
      setRouteTarget: (routeTargetId) => set({ routeTargetId }),
      markDiscovered: (id) => {
        if (!get().discovered.includes(id)) set((s) => ({ discovered: [...s.discovered, id] }));
      },
      setInputMode: (inputMode) => {
        if (get().inputMode !== inputMode) set({ inputMode });
      },
      setDevice: ({ reducedMotion, touch }) =>
        set((s) => ({ reducedMotion, touchDevice: touch, inputMode: touch ? "touch" : s.inputMode })),
      setStuck: (stuck) => {
        if (get().stuck !== stuck) set({ stuck });
      },
      showToast: (text) => set({ toast: { id: ++toastId, text } }),
      clearToast: (id) => {
        if (get().toast?.id === id) set({ toast: null });
      },
    }),
    {
      name: "abhishek-world-settings",
      version: 1,
      partialize: (s) => ({
        cameraMode: s.cameraMode,
        quality: s.quality,
        qualityAuto: s.qualityAuto,
        timeOfDay: s.timeOfDay,
        muted: s.muted,
        volume: s.volume,
        introSeen: s.introSeen,
        bestDrift: s.bestDrift,
        discovered: s.discovered,
      }),
    },
  ),
);

/** True while the simulation should run: driving with no interface open. */
export function isDrivingActive(s: Pick<GameState, "phase" | "overlay">): boolean {
  return s.phase === "driving" && s.overlay === "none";
}
