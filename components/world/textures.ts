/**
 * Every texture in the world is drawn at load time on a 2D canvas, so the city
 * needs no image downloads. Text uses the site's own display font.
 */
import * as THREE from "three";
import { createRng } from "@/lib/game/rng";

export interface WorldTextures {
  glow: THREE.CanvasTexture;
  pavement: THREE.CanvasTexture;
  plaza: THREE.CanvasTexture;
  asphalt: THREE.CanvasTexture;
  waterNormal: THREE.CanvasTexture;
  billboards: THREE.CanvasTexture[];
  routeArrow: THREE.CanvasTexture;
  dispose: () => void;
}

function make(width: number, height: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function repeating(texture: THREE.CanvasTexture, rx: number, ry: number) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(rx, ry);
  return texture;
}

/** Tileable value noise, used for the asphalt grain and the water normal map. */
function tileNoise(size: number, cells: number, seed: number): Float32Array {
  const rng = createRng(seed);
  const lattice = new Float32Array(cells * cells);
  for (let i = 0; i < lattice.length; i++) lattice[i] = rng.next();
  const out = new Float32Array(size * size);
  const smooth = (t: number) => t * t * (3 - 2 * t);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const fx = (x / size) * cells;
      const fy = (y / size) * cells;
      const x0 = Math.floor(fx);
      const y0 = Math.floor(fy);
      const tx = smooth(fx - x0);
      const ty = smooth(fy - y0);
      const a = lattice[(y0 % cells) * cells + (x0 % cells)];
      const b = lattice[(y0 % cells) * cells + ((x0 + 1) % cells)];
      const c = lattice[((y0 + 1) % cells) * cells + (x0 % cells)];
      const d = lattice[((y0 + 1) % cells) * cells + ((x0 + 1) % cells)];
      out[y * size + x] = a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
    }
  }
  return out;
}

function fbm(size: number, seed: number): Float32Array {
  const out = new Float32Array(size * size);
  let amp = 0.5;
  let cells = 4;
  for (let o = 0; o < 5; o++) {
    const n = tileNoise(size, cells, seed + o * 17);
    for (let i = 0; i < out.length; i++) out[i] += n[i] * amp;
    amp *= 0.5;
    cells *= 2;
  }
  return out;
}

export function makeLabelTexture(
  fontFamily: string,
  title: string,
  subtitle: string,
  color: string,
  options: { width?: number; height?: number; background?: string; align?: CanvasTextAlign } = {},
): THREE.CanvasTexture {
  const width = options.width ?? 1024;
  const height = options.height ?? 256;
  return make(width, height, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    if (options.background) {
      ctx.fillStyle = options.background;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = Math.max(3, h * 0.02);
      ctx.strokeRect(ctx.lineWidth, ctx.lineWidth, w - ctx.lineWidth * 2, h - ctx.lineWidth * 2);
      ctx.globalAlpha = 1;
    }
    const align = options.align ?? "center";
    const x = align === "center" ? w / 2 : h * 0.18;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    const upper = title.toUpperCase();
    let size = h * (subtitle ? 0.4 : 0.52);
    ctx.font = `700 ${size}px ${fontFamily}`;
    const max = w * 0.9;
    const measured = ctx.measureText(upper).width;
    if (measured > max) {
      size *= max / measured;
      ctx.font = `700 ${size}px ${fontFamily}`;
    }
    ctx.shadowColor = color;
    ctx.shadowBlur = h * 0.12;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(upper, x, subtitle ? h * 0.4 : h * 0.52);
    ctx.shadowBlur = 0;
    if (subtitle) {
      ctx.fillStyle = color;
      let sub = h * 0.16;
      ctx.font = `600 ${sub}px ${fontFamily}`;
      const sm = ctx.measureText(subtitle.toUpperCase()).width;
      if (sm > max) {
        sub *= max / sm;
        ctx.font = `600 ${sub}px ${fontFamily}`;
      }
      ctx.fillText(subtitle.toUpperCase(), x, h * 0.76);
    }
  });
}

/**
 * Curtain-wall texture for round towers, which cannot use the box facade
 * shader: a mullion grid over dark glass with a scattering of lit rooms.
 */
export function makeGlassGridTexture(seed: number, base: string, lit: string): THREE.CanvasTexture {
  const texture = make(256, 256, (ctx, w, h) => {
    const rng = createRng(seed);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    const cols = 16;
    const rows = 16;
    const cw = w / cols;
    const ch = h / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const roll = rng.next();
        if (roll > 0.72) {
          ctx.globalAlpha = 0.35 + rng.next() * 0.65;
          ctx.fillStyle = roll > 0.93 ? "#cfe8ff" : lit;
          ctx.fillRect(c * cw + 1.5, r * ch + 2.5, cw - 3, ch - 5);
        } else {
          ctx.globalAlpha = 0.12 + rng.next() * 0.1;
          ctx.fillStyle = "#9fc6ee";
          ctx.fillRect(c * cw + 1.5, r * ch + 2.5, cw - 3, ch - 5);
        }
      }
    }
    ctx.globalAlpha = 1;
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Green overhead road sign with up to three destinations, like the reference. */
export function makeGantryTexture(fontFamily: string, entries: { label: string; arrow: "up" | "left" | "right" }[]): THREE.CanvasTexture {
  return make(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = "#0e3b2e";
    ctx.fillRect(0, 0, w, h);
    const cell = w / entries.length;
    entries.forEach((entry, i) => {
      const x0 = i * cell;
      ctx.strokeStyle = "#e8f2ee";
      ctx.lineWidth = 6;
      ctx.strokeRect(x0 + 10, 10, cell - 20, h - 20);
      ctx.fillStyle = "#f3faf7";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${h * 0.2}px ${fontFamily}`;
      ctx.fillText(entry.label, x0 + cell / 2, h * 0.34, cell - 50);
      // Arrow.
      ctx.save();
      ctx.translate(x0 + cell / 2, h * 0.7);
      ctx.rotate(entry.arrow === "up" ? 0 : entry.arrow === "right" ? Math.PI / 2 : -Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.17);
      ctx.lineTo(h * 0.13, 0);
      ctx.lineTo(h * 0.045, 0);
      ctx.lineTo(h * 0.045, h * 0.15);
      ctx.lineTo(-h * 0.045, h * 0.15);
      ctx.lineTo(-h * 0.045, 0);
      ctx.lineTo(-h * 0.13, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  });
}

function billboard(fontFamily: string, variant: number, words: string[]): THREE.CanvasTexture {
  const palettes: [string, string, string][] = [
    ["#6a2be0", "#ff7fe0", "#aee0ff"],
    ["#1463c9", "#7ff0ff", "#e0d2ff"],
    ["#c2338f", "#ffd9a0", "#ffffff"],
    ["#0f8f8a", "#c8ffe6", "#bfe4ff"],
    ["#4b36d6", "#e0d2ff", "#ffe08a"],
    ["#d2456e", "#ffe1f3", "#a6f1ff"],
  ];
  const [bg, a, b] = palettes[variant % palettes.length];
  const rng = createRng(900 + variant * 31);
  return make(256, 384, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, bg);
    g.addColorStop(1, "#160a33");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.9;
    const kind = variant % 3;
    if (kind === 0) {
      // Bar chart.
      const bars = 7;
      for (let i = 0; i < bars; i++) {
        const bh = (0.2 + rng.next() * 0.5) * h * 0.55;
        ctx.fillStyle = i % 2 === 0 ? a : b;
        ctx.fillRect(24 + i * ((w - 48) / bars), h * 0.9 - bh, (w - 48) / bars - 8, bh);
      }
    } else if (kind === 1) {
      // Line chart over a faint grid.
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(20, h * 0.4 + (i * h * 0.5) / 6);
        ctx.lineTo(w - 20, h * 0.4 + (i * h * 0.5) / 6);
        ctx.stroke();
      }
      for (const [col, base] of [
        [a, 0.72],
        [b, 0.8],
      ] as const) {
        ctx.strokeStyle = col;
        ctx.lineWidth = 5;
        ctx.beginPath();
        let y = h * base;
        ctx.moveTo(20, y);
        for (let x = 20; x <= w - 20; x += 24) {
          y -= (rng.next() - 0.36) * 26;
          ctx.lineTo(x, Math.max(h * 0.42, Math.min(h * 0.9, y)));
        }
        ctx.stroke();
      }
    } else {
      // Concentric rings.
      for (let i = 5; i > 0; i--) {
        ctx.strokeStyle = i % 2 === 0 ? a : b;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.66, i * 20, rng.next() * 3, rng.next() * 3 + 4);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.shadowColor = a;
    ctx.shadowBlur = 14;
    ctx.font = `700 46px ${fontFamily}`;
    ctx.fillText(words[variant % words.length].toUpperCase(), 22, 26, w - 44);
    ctx.shadowBlur = 0;
    ctx.fillStyle = a;
    ctx.font = `600 18px ${fontFamily}`;
    ctx.fillText(words[(variant + 2) % words.length].toUpperCase(), 24, 82, w - 44);
  });
}

export function createWorldTextures(fontFamily: string, words: string[]): WorldTextures {
  const glow = make(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.5)");
    g.addColorStop(0.6, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  const pavement = repeating(
    make(256, 256, (ctx, w, h) => {
      ctx.fillStyle = "#8a8f96";
      ctx.fillRect(0, 0, w, h);
      const rng = createRng(77);
      const n = 4;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const v = 128 + Math.floor(rng.next() * 22);
          ctx.fillStyle = `rgb(${v},${v + 2},${v + 6})`;
          ctx.fillRect(i * (w / n) + 1.5, j * (h / n) + 1.5, w / n - 3, h / n - 3);
        }
      }
    }),
    0.125,
    0.125,
  );

  const plaza = repeating(
    make(256, 256, (ctx, w, h) => {
      ctx.fillStyle = "#70757d";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#9aa1ab";
      ctx.lineWidth = 3;
      for (let i = 0; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo((i * w) / 2, 0);
        ctx.lineTo((i * w) / 2, h);
        ctx.moveTo(0, (i * h) / 2);
        ctx.lineTo(w, (i * h) / 2);
        ctx.stroke();
      }
      ctx.strokeStyle = "#5d626a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, h);
      ctx.moveTo(w, 0);
      ctx.lineTo(0, h);
      ctx.stroke();
    }),
    0.1,
    0.1,
  );

  const grain = fbm(256, 5);
  const asphalt = repeating(
    make(256, 256, (ctx, w, h) => {
      const img = ctx.createImageData(w, h);
      const rng = createRng(9);
      for (let i = 0; i < w * h; i++) {
        const v = 150 + (grain[i] - 0.5) * 90 + (rng.next() - 0.5) * 40;
        img.data[i * 4] = v;
        img.data[i * 4 + 1] = v;
        img.data[i * 4 + 2] = v;
        img.data[i * 4 + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }),
    1,
    1,
  );
  asphalt.colorSpace = THREE.NoColorSpace;

  const heights = fbm(256, 23);
  const waterNormal = repeating(
    make(256, 256, (ctx, w, h) => {
      const img = ctx.createImageData(w, h);
      const at = (x: number, y: number) => heights[((y + h) % h) * w + ((x + w) % w)];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = (at(x + 1, y) - at(x - 1, y)) * 6;
          const dy = (at(x, y + 1) - at(x, y - 1)) * 6;
          const len = Math.hypot(dx, dy, 1);
          const i = (y * w + x) * 4;
          img.data[i] = (-dx / len) * 127 + 128;
          img.data[i + 1] = (-dy / len) * 127 + 128;
          img.data[i + 2] = (1 / len) * 127 + 128;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    }),
    1,
    1,
  );
  waterNormal.colorSpace = THREE.NoColorSpace;

  const routeArrow = repeating(
    make(64, 128, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(124,196,255,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#bfe4ff";
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.2);
      ctx.lineTo(w * 0.86, h * 0.62);
      ctx.lineTo(w * 0.66, h * 0.62);
      ctx.lineTo(w / 2, h * 0.44);
      ctx.lineTo(w * 0.34, h * 0.62);
      ctx.lineTo(w * 0.14, h * 0.62);
      ctx.closePath();
      ctx.fill();
    }),
    1,
    1,
  );

  const billboards = Array.from({ length: 6 }, (_, i) => billboard(fontFamily, i, words));

  const all = [glow, pavement, plaza, asphalt, waterNormal, routeArrow, ...billboards];
  return { glow, pavement, plaza, asphalt, waterNormal, billboards, routeArrow, dispose: () => all.forEach((t) => t.dispose()) };
}
