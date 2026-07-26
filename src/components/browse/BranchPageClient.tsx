"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Breadcrumb from "@/components/browse/Breadcrumb";
import { UNIVERSITIES, BRANCH_SUBJECTS } from "@/lib/mock-data";

interface Props {
  uniSlug: string;
  branchSlug: string;
}

export default function BranchPageClient({ uniSlug, branchSlug }: Props) {
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);
  const [activeSem, setActiveSem] = useState(3);

  if (!university || !branch) {
    return (
      <div className="px-6 sm:px-8 py-8">
        <p className="font-mono text-sm text-[var(--color-text-3)]">Branch not found.</p>
      </div>
    );
  }

  const semSubjects = BRANCH_SUBJECTS[branchSlug]?.[activeSem] ?? [];

  return (
    <div className="px-6 sm:px-8 py-8 max-w-5xl">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "notesync.in", href: "/" },
          { label: university.name, href: `/${uniSlug}` },
          { label: branch.abbr },
        ]}
      />

      {/* Branch header */}
      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-[var(--color-text-1)] leading-snug">
          {branch.name}
        </h1>
        <p className="mt-1 font-mono text-[11px] text-[var(--color-text-3)]">
          {university.name} · {branch.semesters} semesters · {branch.resources.toLocaleString("en-IN")} resources
        </p>
      </div>

      {/* Semester selector */}
      <div className="mt-8 mb-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / semester
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {Array.from({ length: branch.semesters }, (_, i) => i + 1).map((sem) => (
            <button
              key={sem}
              onClick={() => setActiveSem(sem)}
              className={cn(
                "px-3.5 py-2 rounded-xl font-mono text-[12px] transition-all duration-150",
                activeSem === sem
                  ? "bg-[var(--color-amber)] text-[var(--color-bg)] font-semibold shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-bg-3)] text-[var(--color-text-2)] hover:bg-[var(--color-bg-4)] hover:text-[var(--color-text-1)] hover:border-[var(--color-border-2)]"
              )}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Subject table */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / subjects · sem {activeSem}
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {semSubjects.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-6 py-10 text-center">
            <p className="font-mono text-xs text-[var(--color-text-3)]">
              No subjects indexed for Sem {activeSem} yet.
            </p>
            <p className="font-mono text-[10px] text-[var(--color-text-4)] mt-1">
              Content is being added — check back soon or try another semester.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-2)]">
              <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest">Subject</span>
              <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest">Code</span>
              <span className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest text-right">Resources</span>
              <span className="w-6" />
            </div>

            {/* Rows */}
            {semSubjects.map((subject, i) => (
              <motion.div
                key={`${activeSem}-${subject.slug}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <Link
                  href={`/${uniSlug}/${branchSlug}/sem-${activeSem}/${subject.slug}`}
                  className="group grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-4)] transition-colors"
                >
                  {/* Subject name + pills */}
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--color-text-1)] group-hover:text-[var(--color-amber)] transition-colors truncate">
                      {subject.name}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      {subject.notes > 0 && (
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-4)] px-1.5 py-0.5 font-mono text-[8px] text-[var(--color-text-3)]">
                          {subject.notes} notes
                        </span>
                      )}
                      {subject.pyqs > 0 && (
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-4)] px-1.5 py-0.5 font-mono text-[8px] text-[var(--color-text-3)]">
                          {subject.pyqs} PYQs
                        </span>
                      )}
                      {subject.solutions > 0 && (
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-4)] px-1.5 py-0.5 font-mono text-[8px] text-[var(--color-text-3)]">
                          {subject.solutions} solutions
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Code */}
                  <span className="font-mono text-[11px] text-[var(--color-text-3)] group-hover:text-[var(--color-text-2)] transition-colors shrink-0">
                    {subject.code}
                  </span>

                  {/* Total */}
                  <span className="font-mono text-[11px] text-[var(--color-text-2)] shrink-0 text-right">
                    {subject.notes + subject.pyqs + subject.solutions}
                  </span>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-[var(--color-text-3)] group-hover:text-[var(--color-amber)] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="h-16" />
    </div>
  );
}
