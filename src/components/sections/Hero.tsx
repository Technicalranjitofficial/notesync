"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useSpring, useInView } from "framer-motion";
import { ArrowRight, Lock, FileText, Shield } from "lucide-react";

const words = ["Notes.", "PYQs.", "Solutions.", "Lab Files."];

const fileTree = [
  { indent: 0, icon: "📁", name: "KIIT University", type: "dir", open: true },
  { indent: 1, icon: "📂", name: "CSE — Semester 3", type: "dir", open: true },
  { indent: 2, icon: "📄", name: "Data Structures.pdf", type: "file", size: "4.2 MB", locked: false },
  { indent: 2, icon: "📄", name: "OS Notes — Unit 4.pdf", type: "file", size: "2.8 MB", locked: false },
  { indent: 2, icon: "📄", name: "DBMS PYQ 2023.pdf", type: "file", size: "1.1 MB", locked: true },
  { indent: 2, icon: "🔒", name: "CN Solutions.pdf", type: "file", size: "3.4 MB", locked: true },
  { indent: 1, icon: "📂", name: "ECE — Semester 5", type: "dir", open: true },
  { indent: 2, icon: "📄", name: "DSP Notes.pdf", type: "file", size: "5.6 MB", locked: false },
  { indent: 0, icon: "📁", name: "IIT Delhi", type: "dir", open: false },
  { indent: 0, icon: "📁", name: "VIT Vellore", type: "dir", open: false },
];

const stats = [
  { value: 50, suffix: "+", label: "Universities" },
  { value: 100, suffix: "K+", label: "Resources" },
  { value: 80, suffix: "K+", label: "Students" },
];

const STAGGER = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  },
} as const;

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      spring.set(target);
    }
  }, [inView, target, spring]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref} className="font-mono text-lg font-bold text-[var(--color-text-1)]">
      {display}{suffix}
    </span>
  );
}

function BlinkingCursor() {
  return (
    <span
      className="inline-block w-0.5 h-3 bg-[var(--color-text-2)] ml-0.5 align-middle"
      style={{ animation: "blink-cursor 1.1s step-end infinite" }}
    />
  );
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" />

      {/* Amber radial glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 h-[500px] w-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom left, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl w-full px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ───────────────────────────── */}
          <motion.div
            variants={STAGGER.container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.div variants={STAGGER.item} className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border-2)] bg-[var(--color-bg-3)] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber)] animate-glow-pulse" />
              <span className="font-mono text-[11px] text-[var(--color-text-2)] uppercase tracking-widest">
                50+ Indian Universities
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={STAGGER.item}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-[var(--color-text-1)]"
            >
              Every campus,
              <br />
              every
              {" "}
              <span
                key={wordIdx}
                className="inline-block text-[var(--color-amber)] animate-fade-up"
                style={{ animationDuration: "0.4s" }}
              >
                {words[wordIdx]}
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={STAGGER.item}
              className="mt-5 max-w-md text-base text-[var(--color-text-2)] leading-relaxed"
            >
              NoteSync organises India&apos;s academic resources in one place.
              View-only, DRM-protected, watermarked per session.
              No Telegram links. No broken Drive folders.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={STAGGER.item} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors"
              >
                Browse notes free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] px-5 py-2.5 text-sm text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-bg-4)] transition-colors"
              >
                See how it works
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={STAGGER.item}
              className="mt-8 flex flex-wrap items-center gap-5 text-xs text-[var(--color-text-3)]"
            >
              {[
                { icon: Lock, label: "View only — no download" },
                { icon: Shield, label: "Per-user watermark" },
                { icon: FileText, label: "100K+ resources" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[var(--color-text-3)]" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Animated counters */}
            <motion.div
              variants={STAGGER.item}
              className="mt-8 flex items-center gap-0 divide-x divide-[var(--color-border)]"
            >
              {stats.map((s, i) => (
                <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "pr-6" : i === stats.length - 1 ? "pl-6" : "px-6"}`}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                  <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: file tree ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Ambient glow behind the terminal */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Terminal card */}
            <div className="relative rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] overflow-hidden">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-[11px] text-[var(--color-text-3)]">
                  notesync.in / browse<BlinkingCursor />
                </span>
              </div>

              {/* File tree */}
              <div className="p-4 space-y-0.5">
                {fileTree.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.055, duration: 0.3 }}
                    style={{ paddingLeft: `${f.indent * 1.25}rem` }}
                    className={`group flex items-center justify-between rounded-md px-2 py-1.5 transition-colors ${
                      f.type === "file" && !f.locked ? "hover:bg-[var(--color-bg-4)] cursor-pointer" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-sm">{f.icon}</span>
                      <span
                        className={`font-mono text-[12px] truncate ${
                          f.type === "dir"
                            ? "text-[var(--color-text-2)] font-medium"
                            : f.locked
                            ? "text-[var(--color-text-3)]"
                            : "text-[var(--color-text-1)] group-hover:text-[var(--color-amber)] transition-colors"
                        }`}
                      >
                        {f.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      {f.type === "file" && (
                        <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                          {f.size}
                        </span>
                      )}
                      {f.type === "file" && !f.locked && (
                        <span className="font-mono text-[10px] text-[var(--color-amber)] opacity-0 group-hover:opacity-100 transition-all duration-150 translate-x-1 group-hover:translate-x-0 whitespace-nowrap">
                          View →
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-2.5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                  4,218 files · 2 locked (premium)
                </span>
                <span className="font-mono text-[10px] text-[var(--color-amber)]">
                  view-only ●
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
