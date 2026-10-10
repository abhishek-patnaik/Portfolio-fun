/**
 * Procedural building facades.
 *
 * Every generic building is one instanced box. Windows, mullions, lit rooms,
 * shopfronts and neon edge strips are drawn in the fragment shader from the
 * box's own size and a per-building seed, so a forty-storey tower costs the
 * same as a kiosk and needs no textures.
 *
 * The shader extends MeshStandardMaterial, so buildings still receive sun,
 * shadows, fog and environment reflections like everything else.
 */
import * as THREE from "three";

export interface FacadeUniforms {
  uWindowLit: { value: number };
  uEmissive: { value: number };
  uTime: { value: number };
}

export const facadeUniforms: FacadeUniforms = {
  uWindowLit: { value: 0.5 },
  uEmissive: { value: 1 },
  uTime: { value: 0 },
};

const VERTEX_DECL = /* glsl */ `
attribute vec4 aStyle;
attribute vec3 aAccent;
varying vec3 vBPos;
varying vec3 vBNrm;
// Per-building constants are passed flat: interpolating them introduces
// last-bit differences per pixel, which the hash would turn into static.
flat varying vec3 vBSize;
flat varying vec4 vStyle;
flat varying vec3 vAccent;
`;

const VERTEX_BODY = /* glsl */ `
#ifdef USE_INSTANCING
  vec3 bSize = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
#else
  vec3 bSize = vec3(1.0);
#endif
vBSize = bSize;
vBPos = position * bSize;
vBNrm = normal;
vStyle = aStyle;
vAccent = aAccent;
`;

const FRAGMENT_DECL = /* glsl */ `
varying vec3 vBPos;
varying vec3 vBNrm;
flat varying vec3 vBSize;
flat varying vec4 vStyle;
flat varying vec3 vAccent;
uniform float uWindowLit;
uniform float uEmissive;
float fHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float fWin = 0.0;
float fLit = 0.0;
float fAccent = 0.0;
vec3 fLightColor = vec3(1.0);
`;

const FRAGMENT_COLOR = /* glsl */ `
{
  float style = vStyle.x;
  float seed = floor(vStyle.y + 0.5);
  bool roof = abs(vBNrm.y) > 0.5;
  vec2 fuv;
  float faceId;
  float halfW;
  if (abs(vBNrm.x) > 0.5) {
    fuv = vec2(vBPos.z, vBPos.y);
    faceId = 1.0 + sign(vBNrm.x);
    halfW = vBSize.z * 0.5;
  } else {
    fuv = vec2(vBPos.x, vBPos.y);
    faceId = 5.0 + sign(vBNrm.z);
    halfW = vBSize.x * 0.5;
  }
  float floorH = 3.6;
  float bay = 3.2;
  vec2 margin = vec2(0.14, 0.24);
  vec3 glass = vec3(0.26, 0.4, 0.56);
  float glassMix = 0.55;
  if (style < 0.5) { floorH = 3.9; bay = 1.95; margin = vec2(0.04, 0.07); glass = vec3(0.28, 0.46, 0.66); glassMix = 0.35; }
  else if (style < 1.5) { floorH = 3.6; bay = 3.2; margin = vec2(0.14, 0.25); }
  else if (style < 2.5) { floorH = 3.1; bay = 2.5; margin = vec2(0.24, 0.3); glass = vec3(0.22, 0.3, 0.4); }
  else if (style < 3.5) { floorH = 3.9; bay = 1.35; margin = vec2(0.26, 0.04); glass = vec3(0.24, 0.4, 0.6); glassMix = 0.4; }
  else if (style < 4.5) { floorH = 5.2; bay = 7.5; margin = vec2(0.4, 0.42); glass = vec3(0.2, 0.3, 0.4); }
  else if (style < 5.5) { floorH = max(4.5, vBSize.y * 0.5); bay = 5.5; margin = vec2(0.06, 0.14); glass = vec3(0.32, 0.38, 0.42); }

  vec2 g = vec2(fuv.x / bay + 0.5, fuv.y / floorH);
  vec2 cell = floor(g);
  vec2 f = fract(g);
  vec2 fw = fwidth(g) * 0.75;
  float wx = smoothstep(margin.x - fw.x, margin.x + fw.x, f.x) * (1.0 - smoothstep(1.0 - margin.x - fw.x, 1.0 - margin.x + fw.x, f.x));
  float wy = smoothstep(margin.y - fw.y, margin.y + fw.y, f.y) * (1.0 - smoothstep(1.0 - margin.y - fw.y, 1.0 - margin.y + fw.y, f.y));
  float win = wx * wy;
  // Far away the grid is finer than a pixel: fade to its average coverage instead of shimmering.
  float fade = clamp(1.0 - (max(fw.x, fw.y) - 0.1) * 4.0, 0.0, 1.0);
  float cover = (1.0 - 2.0 * margin.x) * (1.0 - 2.0 * margin.y);
  win = mix(cover, win, fade);

  float rnd = fHash(cell + vec2(seed * 0.173, faceId * 3.7));
  float share = clamp(vStyle.z * uWindowLit, 0.0, 1.0);
  if (style > 4.5 && style < 5.5) share = clamp(0.35 + uWindowLit * 0.6, 0.0, 1.0);
  float lit = mix(share, step(1.0 - share, rnd), fade);
  // Plain styles (roof plant, spires) and roofs have no windows.
  if (roof || style > 5.5) { win = 0.0; lit = 0.0; }

  vec3 wall = diffuseColor.rgb;
  if (roof) wall *= 0.55;
  vec3 glassCol = mix(glass, wall, glassMix * 0.4);
  diffuseColor.rgb = mix(wall, glassCol, win);
  fWin = win;
  fLit = lit * win;
  float warm = fHash(cell * 1.7 + seed * 0.31);
  fLightColor = mix(vec3(1.0, 0.74, 0.44), vec3(0.6, 0.78, 1.0), step(0.82, warm)) * (0.4 + 0.6 * fHash(cell + 9.1));
  if (style > 4.5 && style < 5.5) fLightColor = vec3(1.0, 0.78, 0.5) * 0.6;

  // Neon: vertical strips at the corners and a crown band at the top.
  float hasAccent = step(0.01, dot(vAccent, vAccent));
  if (!roof && hasAccent > 0.5) {
    float edge = smoothstep(halfW - 0.55, halfW - 0.3, abs(fuv.x));
    float crown = smoothstep(vBSize.y - 1.4, vBSize.y - 1.0, vBPos.y);
    fAccent = max(edge, crown);
    if (style > 6.5) fAccent = 0.35 + 0.65 * smoothstep(vBSize.y - 3.0, vBSize.y, vBPos.y);
    diffuseColor.rgb = mix(diffuseColor.rgb, vAccent * 0.3, fAccent);
  }
}
`;

const FRAGMENT_EMISSIVE = /* glsl */ `
totalEmissiveRadiance += fLit * fLightColor * uEmissive * 0.85;
totalEmissiveRadiance += fAccent * vAccent * (0.35 + uEmissive * 0.6);
`;

export function createFacadeMaterial(): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.82, metalness: 0, envMapIntensity: 0.85 });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uWindowLit = facadeUniforms.uWindowLit;
    shader.uniforms.uEmissive = facadeUniforms.uEmissive;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${VERTEX_DECL}`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${VERTEX_BODY}`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${FRAGMENT_DECL}`)
      .replace("#include <color_fragment>", `#include <color_fragment>\n${FRAGMENT_COLOR}`)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.07, fWin);`)
      .replace("#include <metalnessmap_fragment>", `#include <metalnessmap_fragment>\nmetalnessFactor = mix(metalnessFactor, 0.92, fWin * (1.0 - fLit * 0.6));`)
      .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>\n${FRAGMENT_EMISSIVE}`);
  };
  material.customProgramCacheKey = () => "facade-v3";
  return material;
}
