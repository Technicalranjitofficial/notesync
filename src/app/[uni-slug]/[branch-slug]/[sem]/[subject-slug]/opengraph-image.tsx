import { ImageResponse } from "next/og";
import { UNIVERSITIES, BRANCH_SUBJECTS, SUBJECT_RESOURCES } from "@/lib/mock-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{
    "uni-slug": string;
    "branch-slug": string;
    sem: string;
    "subject-slug": string;
  }>;
}) {
  const {
    "uni-slug": uniSlug,
    "branch-slug": branchSlug,
    sem,
    "subject-slug": subjectSlug,
  } = await params;

  const semNum = parseInt(sem.replace("sem-", ""), 10) || 1;
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);
  const subjects = BRANCH_SUBJECTS[branchSlug]?.[semNum] ?? [];
  const subject = subjects.find((s) => s.slug === subjectSlug);
  const allResources = SUBJECT_RESOURCES[subjectSlug] ?? [];

  const uniName = university?.name ?? "University";
  const branchAbbr = branch?.abbr ?? branchSlug.toUpperCase();
  const subjectName = subject?.name ?? subjectSlug;
  const subjectCode = subject?.code ?? "";
  const freeCount = allResources.filter((r) => !r.premium).length;
  const premiumCount = allResources.filter((r) => r.premium).length;

  // Resource type summary
  const notesCount = subject?.notes ?? 0;
  const pyqsCount = subject?.pyqs ?? 0;
  const solutionsCount = subject?.solutions ?? 0;

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
          padding: "52px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
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

        {/* Top brand + breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", zIndex: 1 }}>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#f5e6c8" }}>NoteSync</span>
          <span style={{ color: "#374151" }}>/</span>
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#6b7280" }}>
            {uniSlug} / {branchSlug} / {sem}
          </span>
        </div>

        {/* Centre: subject info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", zIndex: 1 }}>
          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: "8px",
                padding: "4px 12px",
                fontFamily: "monospace",
                fontSize: "13px",
                color: "#f59e0b",
                fontWeight: 600,
              }}
            >
              {subjectCode}
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "4px 12px",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              {branchAbbr} · Sem {semNum}
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "4px 12px",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              {uniName}
            </div>
          </div>

          {/* Subject name */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#eeeef5",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: "900px",
            }}
          >
            {subjectName}
          </div>

          {/* Resource type pills */}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            {[
              { label: `${notesCount} Notes`, color: "#3b82f6" },
              { label: `${pyqsCount} PYQs`, color: "#8b5cf6" },
              { label: `${solutionsCount} Solutions`, color: "#10b981" },
            ].map(({ label, color }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color,
                  fontFamily: "monospace",
                }}
              >
                {label}
              </div>
            ))}
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
              { label: String(freeCount), sub: "Free Files" },
              { label: String(premiumCount), sub: "Premium" },
              { label: String(allResources.length), sub: "Total" },
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
