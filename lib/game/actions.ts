"use client";

/**
 * High-level actions shared by the keyboard, the HUD, the map and the menu.
 * Keeping them here means every entry point behaves identically.
 */
import type { InputAction } from "./input";
import { getDestination } from "@/lib/data/landmarks";
import { audio } from "./audio";
import { input } from "./input";
import { findRoute } from "./navigation";
import { runtime } from "./runtime";
import { useGameStore } from "./store";

export function startExperience(): void {
  const store = useGameStore.getState();
  void audio.start().then(() => {
    audio.setVolume(useGameStore.getState().volume);
    audio.setMuted(useGameStore.getState().muted);
    audio.ignition();
  });
  store.startDriving();
}

export function toggleEngine(): void {
  const store = useGameStore.getState();
  const next = !store.engineOn;
  store.setEngine(next);
  if (next) audio.ignition();
  store.showToast(next ? "Engine started" : "Engine off");
}

export function recoverVehicle(): void {
  runtime.pendingRecover = true;
}

/** Opens the portfolio content a destination stands for. */
export function openDestination(id: string): void {
  const dest = getDestination(id);
  if (!dest) return;
  const store = useGameStore.getState();
  store.markDiscovered(dest.id);
  store.openPanel(dest.section, dest.itemId);
  audio.blip("open");
}

export function setRouteTo(id: string): void {
  const dest = getDestination(id);
  if (!dest) return;
  const store = useGameStore.getState();
  const v = runtime.vehicle;
  runtime.route = findRoute([v.x, v.z], [dest.access.x, dest.access.z]);
  runtime.routeVersion++;
  store.setRouteTarget(dest.id);
  store.closeOverlay();
  store.showToast(`Route set to ${dest.name}`);
  audio.blip("select");
}

export function clearRoute(): void {
  runtime.route = null;
  runtime.guidance = null;
  runtime.routeVersion++;
  useGameStore.getState().setRouteTarget(null);
}

/** Moves the car to the road beside a destination, for visitors who prefer not to drive there. */
export function fastTravelTo(id: string): void {
  const dest = getDestination(id);
  if (!dest) return;
  const store = useGameStore.getState();
  clearRoute();
  runtime.pendingTeleport = { x: dest.access.x, z: dest.access.z, heading: dest.access.heading };
  runtime.preferredDestination = dest.id;
  store.closeOverlay();
  store.showToast(`Moved to ${dest.name}`);
  audio.blip("arrive");
}

export function startCinematic(): void {
  const store = useGameStore.getState();
  store.setCameraMode("cinematic");
  store.closeOverlay();
}

/** Central handler for discrete input actions. */
export function handleAction(action: InputAction): void {
  const store = useGameStore.getState();
  if (store.phase === "loading" || store.phase === "error") return;

  if (action === "escape") {
    if (store.overlay !== "none") {
      store.closeOverlay();
      audio.blip("close");
    } else if (store.phase === "driving") {
      store.openOverlay("settings");
    }
    return;
  }
  if (action === "mute") {
    store.setMuted(!store.muted);
    return;
  }
  if (store.phase !== "driving") return;

  if (action === "map") {
    store.toggleOverlay("map");
    return;
  }
  if (action === "controls") {
    store.toggleOverlay("controls");
    return;
  }
  // The remaining actions only make sense while actually driving.
  if (store.overlay !== "none") return;
  switch (action) {
    case "interact":
      if (store.nearbyId) openDestination(store.nearbyId);
      break;
    case "camera":
      store.cycleCamera();
      break;
    case "cockpit":
      store.toggleCockpitChase();
      break;
    case "recover":
      recoverVehicle();
      break;
    case "engine":
      toggleEngine();
      break;
  }
}

/** Keeps the input manager and audio in step with the interface state. */
export function bindGameState(): () => void {
  const apply = (s: ReturnType<typeof useGameStore.getState>) => {
    const driving = s.phase === "driving" && s.overlay === "none";
    if (input.driving !== driving) {
      input.driving = driving;
      // Whatever was held is released, so the car never moves on its own when
      // an interface closes.
      input.releaseAll();
      if (!driving) {
        // Bring the car to rest where it is; position and heading are kept.
        const v = runtime.vehicle;
        v.vx = 0;
        v.vz = 0;
        v.speed = 0;
        v.slip = 0;
        v.yawRate = 0;
        v.accel = 0;
      }
    }
    audio.setMuted(s.muted);
    audio.setVolume(s.volume);
    if (s.phase === "driving" && s.overlay !== "none") audio.suspend();
    else if (s.phase === "driving") audio.resume();
  };
  apply(useGameStore.getState());
  return useGameStore.subscribe(apply);
}
