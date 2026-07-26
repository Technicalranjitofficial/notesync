"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Eye, Upload } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Pick your university",
    body: "Search from 50+ verified Indian universities. Drill down from university → branch → semester → subject in seconds. No login needed to browse.",
    detail: "KIIT → CSE → Sem 3 → Data Structures",
  },
  {
    num: "02",
    icon: Eye,
    title: "View, never download",
    body: "Every PDF opens in our secure viewer. Text layer disabled, annotation layer off, per-session watermark with your email. DevTools detection active.",
    detail: "DRM · Watermark · Presigned URL (1h expiry)",
  },
  {
    num: "03",
    icon: Upload,
    title: "Contribute & earn",
    body: "Upload your own notes. Our admin team reviews and approves. Get ₹20 per approved topic. Top contributors earn ₹2,000–₹5,000/month.",
    detail: "₹20 per approved topic · Monthly payout",
  },
];

const activityFeed = [
  {
    dot: "green",
    text: "Arjun uploaded OS Notes",
    meta: "KIIT · 2m ago",
  },
  {
    dot: "amber",
    text: "Rohit earned ₹20 · Data Structures approved",
    meta: "3m ago",
  },
  {
    dot: "blue",
    text: "Priya unlocked DBMS PYQ",
    meta: "VIT · 5m ago",
  },
  {
    dot: "green",
    text: "Sneha uploaded CN Lab Manual",
    meta: "BITS · 8m ago",
  },
  {
    dot: "amber",
    text: "Karan earned ₹20 · Algorithms notes approved",
    meta: "11m ago",
  },
];

const dotColor: Record<string, string> = {
  green: "var(--color-green)",
  amber: "var(--color-amber)",
  blue: "var(--color-blue)",
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={ref} className="relative py-24 sm:py-32 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">

        {/* Section label */}
        <div className="mb-14 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / how it works
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 lg:gap-16">

          {/* Sticky heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-[var(--color-text-1)]">
              Three steps.
              <br />
              <span className="text-[var(--color-text-3)]">That&apos;s it.</span>
            </h2>
            <p className="mt-4 text-sm text-[var(--color-text-2)] leading-relaxed">
              No setup, no install, no confusion.
              Built for students who just want the notes.
            </p>
          </div>

          {/* Steps + activity feed */}
          <div className="relative">
            {/* Track */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-border)]">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[var(--color-amber)] origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-12">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    {/* Node */}
                    <div className="relative shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-2)] bg-[var(--color-bg-3)] z-10 relative">
                        <Icon className="h-4 w-4 text-[var(--color-amber)]" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pb-2 flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-mono text-xs text-[var(--color-text-3)]">{step.num}</span>
                        <h3 className="text-base font-semibold text-[var(--color-text-1)]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-[var(--color-text-2)] leading-relaxed">{step.body}</p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-3)] px-3 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber)]" />
                        <span className="font-mono text-[11px] text-[var(--color-text-2)]">{step.detail}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Activity feed */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-6"
              >
                {/* Node — activity dot */}
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-2)] bg-[var(--color-bg-3)] z-10 relative">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-green)] animate-pulse" />
                  </div>
                </div>

                {/* Feed card */}
                <div className="flex-1 pb-2">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-xs text-[var(--color-text-3)]">live</span>
                    <h3 className="text-base font-semibold text-[var(--color-text-1)]">Platform activity</h3>
                  </div>

                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden">
                    {/* Feed header */}
                    <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
                      <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                        recent activity
                      </span>
                    </div>

                    {/* Feed rows */}
                    {activityFeed.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                        className={`flex items-center gap-3 px-4 py-2.5 ${
                          i < activityFeed.length - 1 ? "border-b border-[var(--color-border)]" : ""
                        }`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: dotColor[item.dot] }}
                        />
                        <span className="font-mono text-[11px] text-[var(--color-text-2)] flex-1 truncate">
                          {item.text}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--color-text-3)] shrink-0">
                          {item.meta}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
