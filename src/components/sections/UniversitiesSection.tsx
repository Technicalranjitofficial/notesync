"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const universities = [
  { name: "KIIT University", location: "Bhubaneswar, OD", branches: 12, resources: "4,218", slug: "kiit", tag: "Featured" },
  { name: "IIT Delhi", location: "New Delhi", branches: 15, resources: "3,841", slug: "iit-delhi", tag: null },
  { name: "VIT Vellore", location: "Vellore, TN", branches: 18, resources: "5,102", slug: "vit-vellore", tag: "Popular" },
  { name: "NIT Rourkela", location: "Rourkela, OD", branches: 14, resources: "2,904", slug: "nit-rourkela", tag: null },
  { name: "BITS Pilani", location: "Pilani, RJ", branches: 10, resources: "3,419", slug: "bits-pilani", tag: null },
  { name: "Amity University", location: "Noida, UP", branches: 20, resources: "4,607", slug: "amity", tag: null },
  { name: "SRM University", location: "Chennai, TN", branches: 16, resources: "3,255", slug: "srm", tag: null },
  { name: "Manipal University", location: "Manipal, KA", branches: 14, resources: "2,881", slug: "manipal", tag: null },
];

const recentlyAdded = [
  { name: "Thapar Institute", location: "Patiala, PB", addedAgo: "just now" },
  { name: "Symbiosis Pune", location: "Pune, MH", addedAgo: "2 days ago" },
  { name: "LPU Jalandhar", location: "Jalandhar, PB", addedAgo: "3 days ago" },
];

export default function UniversitiesSection() {
  return (
    <section id="universities" className="py-24 sm:py-32 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Label */}
        <div className="mb-14 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / universities
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-1)]">
            50+ universities.
            <br />
            <span className="text-[var(--color-text-3)]">One platform.</span>
          </h2>
          <Link
            href="/universities"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-2)] hover:text-[var(--color-amber)] transition-colors font-mono"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-2)]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-3)]">University</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-3)] text-right hidden sm:block">Branches</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-3)] text-right">Resources</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-3)] text-right hidden md:block">Action</span>
          </div>

          {universities.map((uni, i) => (
            <motion.div
              key={uni.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/${uni.slug}`}
                className={`group grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 transition-colors hover:bg-[var(--color-bg-3)] ${
                  i < universities.length - 1 ? "border-b border-[var(--color-border)]" : ""
                }`}
              >
                {/* Name + location */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-7 w-7 shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-3)] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[var(--color-text-2)] uppercase">
                      {uni.name.slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--color-text-1)] truncate group-hover:text-[var(--color-amber)] transition-colors">
                        {uni.name}
                      </span>
                      {uni.tag && (
                        <span className="shrink-0 rounded-full border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-amber)] uppercase tracking-wider">
                          {uni.tag}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-[var(--color-text-3)]">{uni.location}</span>
                  </div>
                </div>

                {/* Branches */}
                <span className="font-mono text-sm text-[var(--color-text-2)] text-right hidden sm:block">
                  {uni.branches}
                </span>

                {/* Resources */}
                <span className="font-mono text-sm text-[var(--color-text-2)] text-right">
                  {uni.resources}
                </span>

                {/* Arrow */}
                <div className="hidden md:flex justify-end">
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-text-3)] group-hover:text-[var(--color-amber)] transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 font-mono text-xs text-[var(--color-text-3)] text-right">
          + 42 more universities being onboarded
        </p>

        {/* Recently added strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
            <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">recently added</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
            {recentlyAdded.map((uni, i) => (
              <div key={i} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-1)] truncate">{uni.name}</p>
                  <p className="font-mono text-[10px] text-[var(--color-text-3)]">{uni.location}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded-full border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-amber)] uppercase tracking-wider">
                    New
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-3)]">{uni.addedAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
