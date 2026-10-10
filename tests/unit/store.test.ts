// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { InputManager } from "@/lib/game/input";
import { NEUTRAL_INPUT } from "@/lib/game/physics";
import { isDrivingActive, useGameStore } from "@/lib/game/store";

const key = (type: "keydown" | "keyup", code: string, init: KeyboardEventInit = {}) => new KeyboardEvent(type, { code, bubbles: true, cancelable: true, ...init });

describe("game store", () => {
  beforeEach(() => {
    useGameStore.setState({ phase: "intro", overlay: "none", panel: null, cameraMode: "cockpit", introSeen: false, reducedMotion: false, flyoverNonce: 0, engineOn: false });
  });

  it("starts driving with the engine on and plays the fly-in only once", () => {
    useGameStore.getState().startDriving();
    let s = useGameStore.getState();
    expect(s.phase).toBe("driving");
    expect(s.engineOn).toBe(true);
    expect(s.flyoverNonce).toBe(1);
    expect(s.introSeen).toBe(true);
    s.returnToIntro();
    useGameStore.getState().startDriving();
    s = useGameStore.getState();
    expect(s.flyoverNonce).toBe(1);
  });

  it("skips the fly-in when reduced motion is requested", () => {
    useGameStore.setState({ reducedMotion: true });
    useGameStore.getState().startDriving();
    expect(useGameStore.getState().flyoverNonce).toBe(0);
  });

  it("pauses driving whenever an interface is open", () => {
    const s = useGameStore.getState();
    s.startDriving();
    expect(isDrivingActive(useGameStore.getState())).toBe(true);
    s.openPanel("projects", "abc");
    expect(isDrivingActive(useGameStore.getState())).toBe(false);
    expect(useGameStore.getState().panel).toEqual({ section: "projects", itemId: "abc" });
    s.closeOverlay();
    expect(isDrivingActive(useGameStore.getState())).toBe(true);
    s.toggleOverlay("map");
    expect(useGameStore.getState().overlay).toBe("map");
    s.toggleOverlay("map");
    expect(useGameStore.getState().overlay).toBe("none");
  });

  it("cycles cameras and always lands on a valid mode", () => {
    const s = useGameStore.getState();
    s.cycleCamera();
    expect(useGameStore.getState().cameraMode).toBe("chase");
    s.cycleCamera();
    expect(useGameStore.getState().cameraMode).toBe("cinematic");
    s.cycleCamera();
    expect(useGameStore.getState().cameraMode).toBe("cockpit");
    s.toggleCockpitChase();
    expect(useGameStore.getState().cameraMode).toBe("chase");
    s.setCameraMode("nonsense" as never);
    expect(useGameStore.getState().cameraMode).toBe("chase");
  });

  it("clamps volume and records discoveries once", () => {
    const s = useGameStore.getState();
    s.setVolume(4);
    expect(useGameStore.getState().volume).toBe(1);
    s.setVolume(-1);
    expect(useGameStore.getState().volume).toBe(0);
    useGameStore.setState({ discovered: [] });
    s.markDiscovered("home");
    s.markDiscovered("home");
    expect(useGameStore.getState().discovered).toEqual(["home"]);
  });
});

describe("input manager", () => {
  it("ignores driving keys unless driving is active", () => {
    const input = new InputManager();
    input.handleKeyDown(key("keydown", "KeyW"));
    expect(input.read({ ...NEUTRAL_INPUT }).throttle).toBe(0);
    input.driving = true;
    input.handleKeyDown(key("keydown", "KeyW"));
    input.handleKeyDown(key("keydown", "ArrowRight"));
    input.handleKeyDown(key("keydown", "Space"));
    const out = input.read({ ...NEUTRAL_INPUT });
    expect(out.throttle).toBe(1);
    expect(out.steer).toBe(1);
    expect(out.handbrake).toBe(true);
    input.handleKeyUp(key("keyup", "KeyW"));
    expect(input.read({ ...NEUTRAL_INPUT }).throttle).toBe(0);
  });

  it("cancels opposite steering keys and prevents page scrolling", () => {
    const input = new InputManager();
    input.driving = true;
    const down = key("keydown", "ArrowDown");
    input.handleKeyDown(down);
    expect(down.defaultPrevented).toBe(true);
    input.handleKeyDown(key("keydown", "KeyA"));
    input.handleKeyDown(key("keydown", "KeyD"));
    expect(input.read({ ...NEUTRAL_INPUT }).steer).toBe(0);
  });

  it("requires a fresh press after driving resumes", () => {
    const input = new InputManager();
    input.driving = true;
    input.handleKeyDown(key("keydown", "KeyW"));
    input.releaseAll();
    // The key is still physically held, so the browser sends repeats.
    input.handleKeyDown(key("keydown", "KeyW", { repeat: true }));
    expect(input.read({ ...NEUTRAL_INPUT }).throttle).toBe(0);
    input.handleKeyUp(key("keyup", "KeyW"));
    input.handleKeyDown(key("keydown", "KeyW"));
    expect(input.read({ ...NEUTRAL_INPUT }).throttle).toBe(1);
  });

  it("never steals keys from text fields", () => {
    const input = new InputManager();
    input.driving = true;
    const field = document.createElement("textarea");
    document.body.appendChild(field);
    const event = key("keydown", "KeyW");
    Object.defineProperty(event, "target", { value: field });
    input.handleKeyDown(event);
    expect(event.defaultPrevented).toBe(false);
    expect(input.isHeld("KeyW")).toBe(false);
    field.remove();
  });

  it("raises actions once per press and releases everything on blur", () => {
    const input = new InputManager();
    const seen: string[] = [];
    input.onAction((a) => seen.push(a));
    const detach = input.attach(window);
    input.driving = true;
    window.dispatchEvent(key("keydown", "KeyM"));
    window.dispatchEvent(key("keydown", "KeyM", { repeat: true }));
    window.dispatchEvent(key("keydown", "KeyE"));
    window.dispatchEvent(key("keydown", "Escape"));
    expect(seen).toEqual(["map", "interact", "escape"]);
    window.dispatchEvent(key("keydown", "KeyW"));
    expect(input.isHeld("KeyW")).toBe(true);
    window.dispatchEvent(new Event("blur"));
    expect(input.isHeld("KeyW")).toBe(false);
    detach();
  });

  it("merges touch input with the keyboard", () => {
    const input = new InputManager();
    input.driving = true;
    input.touch.steer = -0.6;
    input.touch.throttle = 1;
    const out = input.read({ ...NEUTRAL_INPUT });
    expect(out.steer).toBeCloseTo(-0.6);
    expect(out.throttle).toBe(1);
    input.releaseAll();
    expect(input.read({ ...NEUTRAL_INPUT }).throttle).toBe(0);
  });
});
