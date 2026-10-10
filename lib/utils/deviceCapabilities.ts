export type QualityLevel = "low" | "medium" | "high";

export interface DeviceProfile {
  webgl: boolean;
  touch: boolean;
  mobile: boolean;
  softwareRenderer: boolean;
  renderer: string;
  recommended: QualityLevel;
  reducedMotion: boolean;
}

/**
 * Inspect the device once at start-up and pick a sensible default quality.
 * Visitors can always override it in Settings; this only chooses the default.
 */
export function detectDevice(): DeviceProfile {
  const nav = typeof navigator === "undefined" ? undefined : navigator;
  const touch = !!nav && (nav.maxTouchPoints > 0 || "ontouchstart" in window);
  const ua = nav?.userAgent ?? "";
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (touch && Math.min(window.innerWidth, window.innerHeight) < 820);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  let webgl = false;
  let renderer = "";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (gl) {
      webgl = true;
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    webgl = false;
  }

  const softwareRenderer = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
  const memory = (nav as (Navigator & { deviceMemory?: number }) | undefined)?.deviceMemory ?? 8;
  const cores = nav?.hardwareConcurrency ?? 4;
  const integrated = /intel|uhd|iris|mali|adreno|powervr|apple gpu/i.test(renderer) && !/rtx|gtx|radeon rx|arc a/i.test(renderer);

  let recommended: QualityLevel = "high";
  if (softwareRenderer || memory <= 2 || cores <= 2) recommended = "low";
  else if (mobile) recommended = memory >= 6 && cores >= 8 ? "medium" : "low";
  else if (integrated || memory <= 4 || cores <= 4) recommended = "medium";

  return { webgl, touch, mobile, softwareRenderer, renderer, recommended, reducedMotion };
}
