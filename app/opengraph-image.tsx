import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(1200px 600px at 20% -10%, #1a1450 0%, #0b1026 45%, #050816 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* top brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #00fff0, #3b82f6)",
              color: "#050816",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
            NoobxMarketing
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 24,
              color: "#b6c0d9",
            }}
          >
            Premium Digital Marketing Agency
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>Launch Your Brand Into</span>
            <span
              style={{
                background: "linear-gradient(100deg, #ffffff, #4dfff5, #60a5fa)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              The Digital Universe
            </span>
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#b6c0d9",
          }}
        >
          <div style={{ display: "flex" }}>SEO · PPC · Social · Content · Design</div>
          <div style={{ display: "flex", color: "#ffffff" }}>noobxmarketing.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
