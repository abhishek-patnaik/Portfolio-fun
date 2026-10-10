import { ImageResponse } from "next/og";
import { site } from "@/lib/data/portfolio";

export const alt = `${site.name}: an interactive 3D portfolio world`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing image, generated at build time. */
export default function OpengraphImage() {
  const towers = [120, 210, 150, 330, 260, 430, 300, 180, 240, 140, 200, 110];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg, #101a3f 0%, #05070c 55%, #1a0d2e 100%)",
          color: "#e9eef5",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 440, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: 14, paddingRight: 60, opacity: 0.55 }}>
          {towers.map((h, i) => (
            <div
              key={i}
              style={{
                width: 46,
                height: h,
                display: "flex",
                background: i % 3 === 0 ? "linear-gradient(180deg, #7cc4ff, #1c3b66)" : i % 3 === 1 ? "linear-gradient(180deg, #b79bff, #2a1f52)" : "linear-gradient(180deg, #3d5a80, #142033)",
                borderRadius: 4,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: "#7cc4ff", textTransform: "uppercase" }}>{site.disciplines.join("  ·  ")}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: 4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 22, color: "#9ba7b8", maxWidth: 780 }}>{site.tagline}</div>
          <div style={{ display: "flex", fontSize: 24, marginTop: 34, color: "#b79bff", letterSpacing: 6, textTransform: "uppercase" }}>The interactive 3D portfolio world</div>
        </div>
      </div>
    ),
    size,
  );
}
