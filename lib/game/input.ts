/**
 * Input manager: merges keyboard, touch and gamepad into one VehicleInput and
 * raises discrete actions (interact, camera, map…).
 *
 * It holds no React state. Components attach it once and the render loop calls
 * `read()` each frame.
 */
import type { VehicleInput } from "@/types/vehicle";

export type InputAction =
  | "interact"
  | "camera"
  | "cockpit"
  | "map"
  | "controls"
  | "escape"
  | "recover"
  | "engine"
  | "mute";

type Source = "keyboard" | "touch" | "gamepad";

const DRIVE_KEYS = new Set([
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Space",
  "ShiftLeft",
  "ShiftRight",
]);

const ACTION_KEYS: Record<string, InputAction> = {
  KeyE: "interact",
  Enter: "interact",
  KeyC: "camera",
  KeyV: "cockpit",
  KeyM: "map",
  KeyH: "controls",
  Escape: "escape",
  KeyR: "recover",
  KeyI: "engine",
  KeyN: "mute",
};

export function isTextTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

function deadzone(v: number, zone = 0.14): number {
  if (Math.abs(v) < zone) return 0;
  return (Math.sign(v) * (Math.abs(v) - zone)) / (1 - zone);
}

export class InputManager {
  private readonly keys = new Set<string>();
  private readonly actionListeners = new Set<(action: InputAction) => void>();
  private readonly sourceListeners = new Set<(source: Source) => void>();
  private padButtons: boolean[] = [];
  private lastSource: Source = "keyboard";

  /** Set by the on-screen controls. */
  readonly touch = { steer: 0, throttle: 0, brake: 0, handbrake: false, boost: false };

  /** When false, driving keys are ignored and not swallowed (an interface is open). */
  driving = false;

  onAction(listener: (action: InputAction) => void): () => void {
    this.actionListeners.add(listener);
    return () => this.actionListeners.delete(listener);
  }

  onSource(listener: (source: Source) => void): () => void {
    this.sourceListeners.add(listener);
    return () => this.sourceListeners.delete(listener);
  }

  emit(action: InputAction): void {
    this.actionListeners.forEach((l) => l(action));
  }

  private setSource(source: Source): void {
    if (source === this.lastSource) return;
    this.lastSource = source;
    this.sourceListeners.forEach((l) => l(source));
  }

  noteTouch(): void {
    this.setSource("touch");
  }

  /** Clears everything that is held. Called when focus is lost or an interface opens. */
  releaseAll(): void {
    this.keys.clear();
    this.touch.steer = 0;
    this.touch.throttle = 0;
    this.touch.brake = 0;
    this.touch.handbrake = false;
    this.touch.boost = false;
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTextTarget(e.target)) return;
    this.setSource("keyboard");

    const action = ACTION_KEYS[e.code];
    if (action) {
      // Enter must keep activating focused buttons and links.
      if (e.code === "Enter" && e.target instanceof HTMLElement && e.target !== document.body) return;
      if (!e.repeat) this.emit(action);
      if (e.code !== "Escape") e.preventDefault();
      return;
    }
    if (!DRIVE_KEYS.has(e.code)) return;
    if (!this.driving) return;
    // Stop the page scrolling on arrows and space while driving.
    e.preventDefault();
    // A key that was already held when driving resumed does not count:
    // the visitor has to press it again, so the car never lurches forward.
    if (e.repeat && !this.keys.has(e.code)) return;
    this.keys.add(e.code);
  };

  handleKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
  };

  attach(target: Window): () => void {
    const release = () => this.releaseAll();
    const visibility = () => {
      if (document.hidden) this.releaseAll();
    };
    target.addEventListener("keydown", this.handleKeyDown);
    target.addEventListener("keyup", this.handleKeyUp);
    target.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      target.removeEventListener("keydown", this.handleKeyDown);
      target.removeEventListener("keyup", this.handleKeyUp);
      target.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      this.releaseAll();
    };
  }

  private pollGamepad(out: VehicleInput): void {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return;
    let pad: Gamepad | null = null;
    for (const p of navigator.getGamepads()) {
      if (p && p.connected) {
        pad = p;
        break;
      }
    }
    if (!pad) return;
    const steer = deadzone(pad.axes[0] ?? 0);
    const throttle = pad.buttons[7]?.value ?? 0;
    const brake = pad.buttons[6]?.value ?? 0;
    if (steer !== 0 || throttle > 0.05 || brake > 0.05) this.setSource("gamepad");
    if (this.driving) {
      if (Math.abs(steer) > Math.abs(out.steer)) out.steer = steer;
      out.throttle = Math.max(out.throttle, throttle);
      out.brake = Math.max(out.brake, brake);
      if (pad.buttons[1]?.pressed) out.handbrake = true;
      if (pad.buttons[2]?.pressed) out.boost = true;
    }
    const map: [number, InputAction][] = [
      [0, "interact"],
      [3, "camera"],
      [8, "map"],
      [9, "escape"],
      [5, "recover"],
    ];
    for (const [index, action] of map) {
      const pressed = pad.buttons[index]?.pressed ?? false;
      if (pressed && !this.padButtons[index]) {
        this.setSource("gamepad");
        this.emit(action);
      }
      this.padButtons[index] = pressed;
    }
  }

  /** Writes the current combined input into `out` and returns it. */
  read(out: VehicleInput): VehicleInput {
    out.throttle = 0;
    out.brake = 0;
    out.steer = 0;
    out.handbrake = false;
    out.boost = false;
    if (this.driving) {
      const k = this.keys;
      if (k.has("KeyW") || k.has("ArrowUp")) out.throttle = 1;
      if (k.has("KeyS") || k.has("ArrowDown")) out.brake = 1;
      if (k.has("KeyA") || k.has("ArrowLeft")) out.steer -= 1;
      if (k.has("KeyD") || k.has("ArrowRight")) out.steer += 1;
      if (k.has("Space")) out.handbrake = true;
      if (k.has("ShiftLeft") || k.has("ShiftRight")) out.boost = true;

      const t = this.touch;
      if (Math.abs(t.steer) > Math.abs(out.steer)) out.steer = t.steer;
      out.throttle = Math.max(out.throttle, t.throttle);
      out.brake = Math.max(out.brake, t.brake);
      out.handbrake = out.handbrake || t.handbrake;
      out.boost = out.boost || t.boost;
    }
    this.pollGamepad(out);
    return out;
  }

  /** Test helper: is a drive key currently registered as held? */
  isHeld(code: string): boolean {
    return this.keys.has(code);
  }
}

export const input = new InputManager();
