"use client";

import { useEffect, useState } from "react";
import { displayFont } from "@/app/fonts";
import { articles } from "@/lib/data/blog";
import { destinations } from "@/lib/data/landmarks";
import { site } from "@/lib/data/portfolio";
import { ColliderIndex } from "@/lib/game/collision";
import { resetRuntime, runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import { generateCity } from "@/lib/world/cityGen";
import { STATIC_COLLIDERS, groundHeight } from "@/lib/world/layout";
import { detectDevice, type QualityLevel } from "@/lib/utils/deviceCapabilities";
import { buildCar } from "@/components/vehicle/model/car";
import { createWorldTextures } from "@/components/world/textures";
import type { WorldAssets } from "./GameCanvas";

/** Lets the browser paint the loading screen between heavy steps. */
function breathe(): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, 60);
    requestAnimationFrame(() => {
      window.clearTimeout(timer);
      window.setTimeout(resolve, 0);
    });
  });
}

export class WebGLUnavailableError extends Error {
  constructor() {
    super("This browser or device cannot run WebGL 2, which the 3D city needs.");
    this.name = "WebGLUnavailableError";
  }
}

/**
 * Builds everything the world needs, one real step per loading stage. There are
 * no downloads here: the car, the city and all textures are generated, so each
 * stage reports work that has actually finished.
 */
export function useWorldAssets(attempt: number): WorldAssets | null {
  const [assets, setAssets] = useState<WorldAssets | null>(null);

  useEffect(() => {
    let cancelled = false;
    const built: Partial<WorldAssets> = {};
    const store = useGameStore.getState();
    const stage = store.setStage;

    const run = async () => {
      const device = detectDevice();
      store.setDevice({ reducedMotion: device.reducedMotion, touch: device.touch });
      if (!device.webgl) throw new WebGLUnavailableError();
      const params = new URLSearchParams(window.location.search);
      const forced = params.get("q");
      if (forced === "low" || forced === "medium" || forced === "high") store.setQuality(forced as QualityLevel, false);
      else if (useGameStore.getState().qualityAuto) store.setQuality(device.recommended, true);
      // On a first visit from a phone, the chase camera shows far more of the road.
      if (device.mobile && !useGameStore.getState().introSeen) store.setCameraMode("chase");
      resetRuntime();

      stage("app", "done");
      stage("vehicle", "active");
      await breathe();
      if (cancelled) return;
      const fontFamily = displayFont.style.fontFamily;
      await Promise.all([
        document.fonts.load(`600 48px ${fontFamily}`).catch(() => undefined),
        document.fonts.load(`700 48px ${fontFamily}`).catch(() => undefined),
      ]);
      if (cancelled) return;
      built.car = buildCar({ physical: true, plateText: site.plate, fontFamily });

      stage("vehicle", "done");
      stage("city", "active");
      await breathe();
      if (cancelled) return;
      built.city = generateCity(destinations);
      runtime.world = {
        colliders: new ColliderIndex([...STATIC_COLLIDERS, ...built.city.colliders]),
        groundHeight,
      };

      stage("city", "done");
      stage("environment", "active");
      await breathe();
      if (cancelled) return;
      const words = [site.shortName, ...site.disciplines, "Analytics", "Insight", ...articles.map((a) => a.category)];
      built.textures = createWorldTextures(fontFamily, words);

      stage("environment", "done");
      stage("controls", "active");
      await breathe();
      if (cancelled) return;
      stage("controls", "done");
      stage("experience", "active");
      setAssets({ car: built.car, city: built.city, textures: built.textures, fontFamily });
    };

    run().catch((error: unknown) => {
      if (cancelled) return;
      console.error("World failed to initialise", error);
      store.fail(error instanceof Error ? error.message : "The 3D world could not be prepared.");
    });

    return () => {
      cancelled = true;
      built.car?.dispose();
      built.textures?.dispose();
      setAssets(null);
    };
  }, [attempt]);

  return assets;
}
