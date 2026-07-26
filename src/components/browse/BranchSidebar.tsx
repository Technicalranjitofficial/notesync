"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Branch, University } from "@/lib/mock-data";

interface BranchSidebarProps {
  university: University;
  uniSlug: string;
}

export default function BranchSidebar({ university, uniSlug }: BranchSidebarProps) {
  const pathname = usePathname();

  const totalResources = university.branches.reduce((sum, b) => sum + b.resources, 0);
  const lastUpdated = new Date(university.lastUpdated).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function isActive(branch: Branch) {
    return pathname.includes(`/${uniSlug}/${branch.slug}`);
  }

  return (
    <aside className="w-60 h-full shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-2)] flex flex-col">
      {/* University header */}
      <div className="border-b border-[var(--color-border)] px-5 py-5">
        <Link href={`/${uniSlug}`} className="block">
          <p className="font-mono text-[9px] text-[var(--color-amber)] uppercase tracking-widest mb-1">
            / university
          </p>
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] leading-snug">
            {university.name}
          </h2>
          <p className="mt-0.5 font-mono text-[10px] text-[var(--color-text-3)]">
            {university.location}
          </p>
        </Link>
      </div>

      {/* Branch nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        <p className="px-5 pb-2 font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest">
          Branches
        </p>
        <ul className="flex flex-col gap-px">
          {university.branches.map((branch) => {
            const active = isActive(branch);
            return (
              <li key={branch.slug}>
                <Link
                  href={`/${uniSlug}/${branch.slug}`}
                  className={cn(
                    "group flex items-center justify-between px-5 py-2.5 transition-all",
                    active
                      ? "border-l-2 border-[var(--color-amber)] bg-[var(--color-bg-3)] pl-[calc(1.25rem-2px)]"
                      : "border-l-2 border-transparent hover:bg-[var(--color-bg-3)] hover:border-[var(--color-border-2)]"
                  )}
                >
                  <div className="min-w-0">
                    <span
                      className={cn(
                        "font-mono text-[11px] font-medium",
                        active
                          ? "text-[var(--color-amber)]"
                          : "text-[var(--color-text-2)] group-hover:text-[var(--color-text-1)]"
                      )}
                    >
                      {branch.abbr}
                    </span>
                    <p className="font-mono text-[9px] text-[var(--color-text-3)] leading-tight mt-0.5 truncate max-w-[120px]">
                      {branch.semesters} sems
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-[var(--color-text-3)] shrink-0 ml-2">
                    {branch.resources.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Stats mini section */}
      <div className="border-t border-[var(--color-border)] px-5 py-4">
        <p className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest mb-3">
          Stats
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--color-text-3)]">Total resources</span>
            <span className="font-mono text-[10px] text-[var(--color-text-1)]">
              {totalResources.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--color-text-3)]">Branches</span>
            <span className="font-mono text-[10px] text-[var(--color-text-1)]">
              {university.branches.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--color-text-3)]">Updated</span>
            <span className="font-mono text-[10px] text-[var(--color-text-2)]">{lastUpdated}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
