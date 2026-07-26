"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SemesterTabsProps {
  totalSems: number;
  activeSem: number;
  uniSlug: string;
  branchSlug: string;
}

export default function SemesterTabs({
  totalSems,
  activeSem,
  uniSlug,
  branchSlug,
}: SemesterTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleSelect(sem: number) {
    const base = `/${uniSlug}/${branchSlug}`;
    // Keep any deeper path segments but replace the sem
    const segments = pathname.split("/").filter(Boolean);
    // segments[0]=uniSlug [1]=branchSlug [2]=sem-N ...
    const rest = segments.slice(3); // anything after sem
    const target = rest.length
      ? `${base}/sem-${sem}/${rest.join("/")}`
      : `${base}/sem-${sem}`;
    router.push(target);
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {Array.from({ length: totalSems }, (_, i) => i + 1).map((sem) => (
        <button
          key={sem}
          onClick={() => handleSelect(sem)}
          className={cn(
            "px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all",
            activeSem === sem
              ? "bg-[var(--color-amber)] text-[var(--color-bg)] font-semibold"
              : "border border-[var(--color-border)] bg-[var(--color-bg-3)] text-[var(--color-text-2)] hover:bg-[var(--color-bg-4)] hover:text-[var(--color-text-1)]"
          )}
        >
          Sem {sem}
        </button>
      ))}
    </div>
  );
}
