"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Branch } from "@/lib/mock-data";

interface MobileBranchBarProps {
  branches: Branch[];
  uniSlug: string;
}

export default function MobileBranchBar({ branches, uniSlug }: MobileBranchBarProps) {
  const pathname = usePathname();

  function isActive(branch: Branch) {
    return pathname.includes(`/${uniSlug}/${branch.slug}`);
  }

  return (
    <div className="overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 w-max">
        {/* Back to university link */}
        <Link
          href={`/${uniSlug}`}
          className={cn(
            "shrink-0 px-3 py-1.5 rounded-lg font-mono text-[10px] transition-colors whitespace-nowrap border",
            pathname === `/${uniSlug}`
              ? "bg-[var(--color-amber)] text-[var(--color-bg)] border-transparent font-semibold"
              : "border-[var(--color-border)] bg-[var(--color-bg-3)] text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-bg-4)]"
          )}
        >
          Overview
        </Link>

        {/* Separator */}
        <span className="shrink-0 h-3 w-px bg-[var(--color-border)]" />

        {/* Branch pills */}
        {branches.map((branch) => {
          const active = isActive(branch);
          return (
            <Link
              key={branch.slug}
              href={`/${uniSlug}/${branch.slug}`}
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] transition-all whitespace-nowrap border",
                active
                  ? "bg-[var(--color-amber)] text-[var(--color-bg)] border-transparent font-semibold"
                  : "border-[var(--color-border)] bg-[var(--color-bg-3)] text-[var(--color-text-2)] hover:text-[var(--color-amber)] hover:border-[var(--color-amber-border)] hover:bg-[var(--color-bg-4)]"
              )}
            >
              {branch.abbr}
              <span
                className={cn(
                  "font-mono text-[9px]",
                  active ? "text-[rgba(12,12,14,0.6)]" : "text-[var(--color-text-3)]"
                )}
              >
                {branch.resources.toLocaleString("en-IN")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
