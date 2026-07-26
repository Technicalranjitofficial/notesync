"use client";

import Link from "next/link";
import { Upload, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Breadcrumb from "@/components/browse/Breadcrumb";
import ResourceRow from "@/components/browse/ResourceRow";
import { UNIVERSITIES, BRANCH_SUBJECTS, SUBJECT_RESOURCES } from "@/lib/mock-data";
import type { ResourceType } from "@/lib/mock-data";

const TABS: { label: string; value: ResourceType | "all" }[] = [
  { label: "All",       value: "all"      },
  { label: "Notes",     value: "notes"    },
  { label: "PYQs",      value: "pyq"      },
  { label: "Solutions", value: "solution" },
  { label: "Lab Files", value: "lab"      },
];

interface Props {
  uniSlug: string;
  branchSlug: string;
  semNum: number;
  subjectSlug: string;
}

export default function SubjectPageClient({
  uniSlug,
  branchSlug,
  semNum,
  subjectSlug,
}: Props) {
  const university = UNIVERSITIES[uniSlug];
  const branch     = university?.branches.find((b) => b.slug === branchSlug);
  const subjects   = BRANCH_SUBJECTS[branchSlug]?.[semNum] ?? [];
  const subject    = subjects.find((s) => s.slug === subjectSlug);

  const [activeTab, setActiveTab] = useState<ResourceType | "all">("all");

  if (!university || !branch || !subject) {
    return (
      <div className="px-6 sm:px-8 py-8">
        <p className="font-mono text-sm text-[var(--color-text-3)]">Subject not found.</p>
      </div>
    );
  }

  const allResources = SUBJECT_RESOURCES[subjectSlug] ?? [];
  const filtered = activeTab === "all"
    ? allResources
    : allResources.filter((r) => r.type === activeTab);

  const freeCount    = allResources.filter((r) => !r.premium).length;
  const premiumCount = allResources.filter((r) =>  r.premium).length;

  return (
    <div className="px-6 sm:px-8 py-8 max-w-5xl">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "notesync.in",   href: "/" },
          { label: university.name, href: `/${uniSlug}` },
          { label: branch.abbr,     href: `/${uniSlug}/${branchSlug}` },
          { label: `Sem ${semNum}` },
          { label: subject.name },
        ]}
      />

      {/* Subject header — terminal block */}
      <div className="mt-6 rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-[var(--color-text-3)]">
            {uniSlug} / {branchSlug} / sem-{semNum} / {subjectSlug}
          </span>
        </div>

        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Subject",  value: subject.name },
            { label: "Code",     value: subject.code },
            { label: "Semester", value: `Sem ${semNum}` },
            { label: "Branch",   value: branch.abbr },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className="text-sm text-[var(--color-text-1)]">{value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)] px-5 py-2.5 flex items-center gap-4">
          <span className="font-mono text-[10px] text-[var(--color-text-3)]">
            {allResources.length} files total
          </span>
          <span className="font-mono text-[10px] text-[var(--color-green)]">
            {freeCount} free
          </span>
          <span className="font-mono text-[10px] text-[var(--color-amber)]">
            {premiumCount} premium
          </span>
        </div>
      </div>

      {/* Resource type tabs */}
      <div className="mt-8 mb-1 flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
          / resources
        </span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="mt-4 flex items-center gap-1.5 flex-wrap">
        {TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? allResources.length
              : allResources.filter((r) => r.type === tab.value).length;
          if (count === 0 && tab.value !== "all") return null;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all ${
                activeTab === tab.value
                  ? "bg-[var(--color-amber)] text-[var(--color-bg)] font-semibold"
                  : "border border-[var(--color-border)] bg-[var(--color-bg-3)] text-[var(--color-text-2)] hover:bg-[var(--color-bg-4)] hover:text-[var(--color-text-1)]"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 font-mono text-[9px] ${
                  activeTab === tab.value
                    ? "text-[rgba(12,12,14,0.6)]"
                    : "text-[var(--color-text-3)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Resource list */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden"
      >
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-2)]">
          <span className="w-7" />
          <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest">File</span>
          <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest w-12">Year</span>
          <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest text-right">Size</span>
          <span className="w-16" />
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-8">
            <p className="font-mono text-xs text-[var(--color-text-3)]">
              No {activeTab === "all" ? "resources" : activeTab} found for this subject.
            </p>
          </div>
        ) : (
          filtered.map((resource, i) => (
            <ResourceRow key={resource.id} resource={resource} index={i} />
          ))
        )}
      </motion.div>

      {/* Contribute callout */}
      <div className="mt-6 rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-amber-border)] to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: "radial-gradient(ellipse at bottom right, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Upload className="h-4 w-4 text-[var(--color-amber)]" />
              <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
                / contribute
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-1)] font-medium">
              Upload your notes for {subject.name}
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-2)]">
              Earn{" "}
              <span className="font-mono text-[var(--color-amber)]">₹20</span>{" "}
              per approved topic. Helps thousands of students.
            </p>
          </div>
          <Link
            href="/upload"
            className="group shrink-0 inline-flex items-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors"
          >
            Upload notes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
