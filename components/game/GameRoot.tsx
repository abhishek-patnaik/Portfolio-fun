"use client";

import { useCallback, useEffect, useState } from "react";
import { destinations } from "@/lib/data/landmarks";
import { bindGameState, handleAction } from "@/lib/game/actions";
import { audio } from "@/lib/game/audio";
import { input } from "@/lib/game/input";
import { runtime } from "@/lib/game/runtime";
import { useGameStore } from "@/lib/game/store";
import ControlsGuide from "./ControlsGuide";
import ErrorScreen from "./ErrorScreen";
import GameCanvas from "./GameCanvas";
import GameHUD from "./GameHUD";
import InteractionPrompt from "./InteractionPrompt";
import IntroScreen from "./IntroScreen";
import LoadingScreen from "./LoadingScreen";
import LookSurface from "./LookSurface";
import MainMenu from "./MainMenu";
import PortfolioPanel from "./PortfolioPanel";
import SettingsPanel from "./SettingsPanel";
import Toast from "./Toast";
import TouchControls from "./TouchControls";
import WorldMap from "./WorldMap";
import { useWorldAssets } from "./useWorldAssets";

/**
 * Root of the immersive experience: builds the world, mounts the canvas and
 * layers the interface on top according to the current phase and overlay.
 */
export default function GameRoot() {
  const [attempt, setAttempt] = useState(0);
  const assets = useWorldAssets(attempt);
  const phase = useGameStore((s) => s.phase);
  const overlay = useGameStore((s) => s.overlay);
  const panel = useGameStore((s) => s.panel);
  const inputMode = useGameStore((s) => s.inputMode);
  const touchDevice = useGameStore((s) => s.touchDevice);
  const closeOverlay = useGameStore((s) => s.closeOverlay);
  const showTouch = touchDevice && inputMode !== "keyboard" && inputMode !== "gamepad";

  const onReady = useCallback(() => {
    const store = useGameStore.getState();
    store.setStage("experience", "done");
    if (store.phase !== "loading") return;
    store.setPhase("intro");
    if (new URLSearchParams(window.location.search).has("autostart")) store.startDriving();
  }, []);

  const onContextLost = useCallback(() => {
    useGameStore.getState().fail("The graphics context was lost. This can happen when the device is low on memory.");
  }, []);

  const retry = useCallback(() => {
    useGameStore.setState({
      phase: "loading",
      error: null,
      overlay: "none",
      panel: null,
      stages: { app: "active", vehicle: "pending", city: "pending", environment: "pending", controls: "pending", experience: "pending" },
    });
    setAttempt((a) => a + 1);
  }, []);

  useEffect(() => {
    const detach = input.attach(window);
    const offAction = input.onAction(handleAction);
    const offSource = input.onSource((source) => useGameStore.getState().setInputMode(source));
    const unbind = bindGameState();
    const onVisibility = () => {
      if (document.hidden) audio.suspend();
      else if (useGameStore.getState().phase === "driving" && useGameStore.getState().overlay === "none") audio.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      detach();
      offAction();
      offSource();
      unbind();
      document.removeEventListener("visibilitychange", onVisibility);
      audio.suspend();
    };
  }, []);

  // Read-only handle for automated tests and debugging in the console.
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    w.__world = { runtime, store: useGameStore, input, destinations };
    return () => {
      delete w.__world;
    };
  }, []);

  const close = useCallback(() => {
    closeOverlay();
    audio.blip("close");
  }, [closeOverlay]);

  return (
    <div className="game-root" data-phase={phase} data-overlay={overlay} data-testid="game-root">
      {assets && phase !== "error" ? <GameCanvas assets={assets} onReady={onReady} onContextLost={onContextLost} /> : null}

      {phase === "driving" ? (
        <>
          <LookSurface />
          <GameHUD touch={showTouch} />
          {overlay === "none" ? <InteractionPrompt touch={showTouch} /> : null}
          {showTouch && overlay === "none" ? <TouchControls /> : null}
        </>
      ) : null}
      {phase === "intro" && overlay === "none" ? <IntroScreen /> : null}
      {phase !== "loading" && phase !== "error" ? <Toast /> : null}

      {overlay === "panel" && panel ? <PortfolioPanel panel={panel} onClose={close} /> : null}
      {overlay === "map" ? <WorldMap onClose={close} /> : null}
      {overlay === "menu" ? <MainMenu onClose={close} /> : null}
      {overlay === "settings" ? <SettingsPanel onClose={close} /> : null}
      {overlay === "controls" ? <ControlsGuide onClose={close} /> : null}

      {phase === "loading" ? <LoadingScreen /> : null}
      {phase === "error" ? <ErrorScreen onRetry={retry} /> : null}
    </div>
  );
}
