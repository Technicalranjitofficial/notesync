import { ImageResponse } from "next/og";
import { UNIVERSITIES } from "@/lib/mock-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ "uni-slug": string; "branch-slug": string }>;
}) {
  const { "uni-slug": uniSlug, "branch-slug": branchSlug } = await params;
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);

  const uniName = university?.name ?? "University";
  const branchName = branch?.name ?? branchSlug.toUpperCase();
  const branchAbbr = branch?.abbr ?? branchSlug.toUpperCase();
  const semesters = branch?.semesters ?? 8;
  const resources = branch?.resources?.toLocaleString("en-IN") ?? "0";

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
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#f5e6c8" }}>NoteSync</span>
          <span style={{ color: "#374151", fontSize: "16px" }}>/</span>
          <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#6b7280" }}>
            {uniSlug} / {branchSlug}
          </span>
        </div>

        {/* Centre */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#f59e0b",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            / {uniName}
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#f59e0b",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            {branchAbbr}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#9ca3af",
              lineHeight: 1.3,
            }}
          >
            {branchName}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#6b7280",
            }}
          >
            Notes, PYQs &amp; Solutions — All {semesters} Semesters
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: resources + "+", sub: "Resources" },
              { label: String(semesters), sub: "Semesters" },
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
