import { ImageResponse } from "next/og";
import { UNIVERSITIES } from "@/lib/mock-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ "uni-slug": string }>;
}) {
  const { "uni-slug": uniSlug } = await params;
  const university = UNIVERSITIES[uniSlug];

  const name = university?.name ?? "University";
  const location = university?.location ?? "India";
  const totalResources = university?.branches.reduce((s, b) => s + b.resources, 0) ?? 0;
  const branches = university?.branches ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0c0c0e 0%, #111220 60%, #0c0c0e 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top: NoteSync brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#f5e6c8" }}>NoteSync</span>
          <span style={{ color: "#374151", fontSize: "16px" }}>/</span>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#6b7280" }}>
            universities / {uniSlug}
          </span>
        </div>

        {/* Centre: university info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#f59e0b",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            / {location}
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#eeeef5",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              maxWidth: "900px",
            }}
          >
            {name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {branches.slice(0, 5).map((b) => (
              <div
                key={b.slug}
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "4px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#d1d5db",
                  fontFamily: "monospace",
                }}
              >
                {b.abbr}
              </div>
            ))}
            {branches.length > 5 && (
              <div
                style={{
                  display: "flex",
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: "8px",
                  padding: "4px 12px",
                  fontSize: "13px",
                  color: "#f59e0b",
                  fontFamily: "monospace",
                }}
              >
                +{branches.length - 5} more
              </div>
            )}
          </div>
        </div>

        {/* Bottom: stats + badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { label: totalResources.toLocaleString("en-IN") + "+", sub: "Resources" },
              { label: String(branches.length), sub: "Branches" },
              { label: "Free", sub: "Access" },
            ].map(({ label, sub }) => (
              <div
                key={sub}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "10px 18px",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#f59e0b" }}>{label}</span>
                <span style={{ fontSize: "10px", color: "#6b7280", marginTop: "2px" }}>{sub}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#374151",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
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
