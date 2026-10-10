import { createRng } from "@/lib/game/rng";

const PALETTES: [string, string, string][] = [
  ["#1b2a6b", "#7cc4ff", "#b79bff"],
  ["#3b1456", "#ff7ad9", "#ffb86b"],
  ["#0d3b3a", "#8be9c0", "#7cc4ff"],
  ["#2a1a5e", "#b79bff", "#5ee6ff"],
  ["#43210f", "#ffb86b", "#ffd166"],
  ["#0e2b4d", "#5ee6ff", "#8be9c0"],
];

interface Props {
  seed: number;
  label?: string;
  className?: string;
}

/**
 * A deterministic abstract cover drawn as inline SVG. Used wherever a real
 * image has not been supplied yet, so galleries and article lists are never
 * empty and never fetch a missing file.
 */
export default function GeneratedCover({ seed, label, className = "" }: Props) {
  const rng = createRng(seed * 7919 + 13);
  const [bg, a, b] = PALETTES[seed % PALETTES.length];
  const kind = seed % 4;
  const id = `cover-${seed}`;
  const bars = Array.from({ length: 9 }, () => 20 + rng.next() * 70);
  const points = Array.from({ length: 10 }, (_, i) => `${20 + i * 40},${150 - rng.next() * 90 - i * 3}`).join(" ");
  const dots = Array.from({ length: 26 }, () => ({ x: 20 + rng.next() * 360, y: 30 + rng.next() * 180, r: 2 + rng.next() * 7 }));
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label ? `Generated cover for ${label}` : "Generated cover"}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg} />
          <stop offset="1" stopColor="#070912" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-g)`} />
      <g opacity="0.14" stroke="#ffffff" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="240" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} />
        ))}
      </g>
      {kind === 0 ? (
        <g>
          {bars.map((h, i) => (
            <rect key={i} x={30 + i * 39} y={210 - h * 1.7} width="26" height={h * 1.7} rx="3" fill={i % 2 === 0 ? a : b} opacity="0.9" />
          ))}
        </g>
      ) : null}
      {kind === 1 ? (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={points} stroke={`url(#${id}-s)`} strokeWidth="5" />
          <polyline points={points} stroke={a} strokeWidth="14" opacity="0.15" />
        </g>
      ) : null}
      {kind === 2 ? (
        <g>
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={i % 3 === 0 ? b : a} opacity={0.35 + (i % 5) * 0.12} />
          ))}
        </g>
      ) : null}
      {kind === 3 ? (
        <g fill="none" stroke={`url(#${id}-s)`} strokeWidth="3">
          {[30, 55, 80, 105].map((r, i) => (
            <circle key={r} cx="280" cy="130" r={r} opacity={1 - i * 0.2} strokeDasharray={`${r * 2.2} ${r * 0.9}`} />
          ))}
          <path d="M40 190 L120 110 L170 150 L230 70" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}
