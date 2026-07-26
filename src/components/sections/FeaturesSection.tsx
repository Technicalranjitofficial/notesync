"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Search, Users, Award, Smartphone, BookOpen, Lock, FolderTree, ChevronRight } from "lucide-react";

const bento = [
  {
    id: "drm",
    icon: ShieldCheck,
    title: "DRM-protected viewing",
    body: "Presigned URLs, text layer off, no right-click, keyboard block, DevTools detection. The most locked-down note viewer in India.",
    span: "lg:col-span-2",
    accent: true,
  },
  {
    id: "speed",
    icon: Zap,
    title: "Fast on any device",
    body: "Virtualized renderer via react-window. 500-page PDFs load in under 2 seconds on 4G.",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    id: "search",
    icon: Search,
    title: "Deep search",
    body: "Search across all universities, branches, semesters simultaneously. Filter: notes, PYQs, solutions, lab manuals.",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    id: "hierarchy",
    icon: BookOpen,
    title: "Perfectly structured",
    body: "University → Branch → Semester → Subject. Every resource tagged, verified, and navigable.",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    id: "earn",
    icon: Award,
    title: "Earn by contributing",
    body: "₹20 per approved topic. Monthly leaderboard. Top contributors earn ₹2K–₹5K/month.",
    span: "lg:col-span-2",
    accent: false,
  },
  {
    id: "community",
    icon: Users,
    title: "Admin-verified content",
    body: "Every note reviewed before going live. Community flagging auto-removes poor quality.",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile first",
    body: "Pinch-to-zoom. Smooth page transitions. Works offline after first load.",
    span: "lg:col-span-1",
    accent: false,
  },
  {
    id: "access",
    icon: Lock,
    title: "Tiered access",
    body: "Free: basic notes. Premium: PYQs + solutions. 2025 batch auto-premium.",
    span: "lg:col-span-1",
    accent: false,
  },
];

const hierarchyPath = [
  { label: "University", example: "KIIT" },
  { label: "Branch", example: "CSE" },
  { label: "Semester", example: "Sem 3" },
  { label: "Subject", example: "Data Structures" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Label */}
        <div className="mb-14 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / features
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-1)] leading-tight">
            Built for students,
            <br />
            <span className="text-[var(--color-text-3)]">secured for creators.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* DRM — spans 2 cols, has visual depth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="bento-cell lg:col-span-2 border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-amber-border)] bg-[rgba(245,158,11,0.08)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-amber)]" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-amber)] mb-1">DRM-protected viewing</h3>
                <p className="text-xs text-[var(--color-text-2)] leading-relaxed">
                  Presigned URLs · Text layer off · No right-click · Keyboard block · DevTools detection · Per-user watermark
                </p>
              </div>
            </div>
            {/* Protection layer visual */}
            <div className="mx-5 mb-5 rounded-lg border border-[var(--color-border-2)] bg-[var(--color-bg-2)] overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2">
                <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest">protection layers active</span>
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
              </div>
              <div className="p-3 space-y-1.5">
                {[
                  "renderTextLayer: false",
                  "renderAnnotationLayer: false",
                  "onContextMenu: e.preventDefault()",
                  "Ctrl+P / Ctrl+S / F12 → blocked",
                  "Presigned URL TTL: 3600s",
                  "Watermark: user@kiit.ac.in",
                ].map((line) => (
                  <div key={line} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[var(--color-green)]">✓</span>
                    <span className="font-mono text-[10px] text-[var(--color-text-2)]">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Remaining bento cells */}
          {bento.slice(1).map((cell, i) => {
            const Icon = cell.icon;
            return (
              <motion.div
                key={cell.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i + 1) * 0.06 }}
                className={`bento-cell p-5 flex flex-col gap-3 ${cell.span}`}
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-2)]">
                  <Icon className="h-4 w-4 text-[var(--color-text-2)]" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-1)] mb-1">{cell.title}</h3>
                  <p className="text-xs text-[var(--color-text-2)] leading-relaxed">{cell.body}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Structured hierarchy cell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bento-cell p-5 flex flex-col gap-3 lg:col-span-1"
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-2)]">
              <FolderTree className="h-4 w-4 text-[var(--color-text-2)]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-1)] mb-1">Structured hierarchy</h3>
              <p className="text-xs text-[var(--color-text-2)] leading-relaxed mb-4">
                Every resource lives at an exact address. No ambiguity, no duplicates.
              </p>

              {/* Breadcrumb drill-down visual */}
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-2)] p-3">
                <div className="flex flex-wrap items-center gap-1">
                  {hierarchyPath.map((step, i) => (
                    <React.Fragment key={step.label}>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest">
                          {step.label}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--color-text-1)]">
                          {step.example}
                        </span>
                      </div>
                      {i < hierarchyPath.length - 1 && (
                        <ChevronRight
                          className="h-3 w-3 text-[var(--color-amber)] mx-0.5 shrink-0"
                          strokeWidth={2.5}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber)]" />
                  <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                    1,247 resources at this path
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
