import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NoteSync — India's University Notes Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0c0c0e 0%, #111220 50%, #0c0c0e 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top — Logo + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <span style={{ fontSize: "24px" }}>📚</span>
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#f5e6c8", letterSpacing: "-0.5px" }}>
            NoteSync
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "999px",
              padding: "4px 12px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span style={{ fontSize: "12px", color: "#86efac", fontWeight: 600, letterSpacing: "0.05em" }}>
              LIVE INDEX
            </span>
          </div>
        </div>

        {/* Centre — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 1, maxWidth: "820px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#f59e0b",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            / india&apos;s university notes platform
          </div>

          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              color: "#eeeef5",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Free Notes, PYQs &{" "}
            <span style={{ color: "#f59e0b" }}>Solutions</span>
          </div>

          <div style={{ fontSize: "22px", color: "#9ca3af", lineHeight: 1.5, fontWeight: 400 }}>
            Verified study material for KIIT, IIT Delhi, VIT Vellore, NIT Rourkela,
            BITS Pilani, SRM, Manipal, Amity & 50+ universities.
          </div>
        </div>

        {/* Bottom row — stats + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          {/* Stats pills */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { label: "50+", sub: "Universities" },
              { label: "1L+", sub: "Resources" },
              { label: "Free", sub: "Access" },
            ].map(({ label, sub }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "12px 20px",
                }}
              >
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#f59e0b" }}>{label}</span>
                <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 500, marginTop: "2px" }}>{sub}</span>
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              color: "#4b5563",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            notesync.in
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
