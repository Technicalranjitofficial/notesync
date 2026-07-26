"use client";

import { Lock, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Resource, ResourceType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<ResourceType, string> = {
  notes:    "notes",
  pyq:      "pyq",
  solution: "solution",
  lab:      "lab",
};

interface ResourceRowProps {
  resource: Resource;
  index: number;
}

export default function ResourceRow({ resource, index }: ResourceRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={cn(
        "group grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center",
        "px-5 py-4 border-b border-[var(--color-border)]",
        "transition-colors",
        resource.premium
          ? "hover:bg-[var(--color-bg-3)] cursor-default"
          : "hover:bg-[var(--color-bg-3)] cursor-pointer"
      )}
    >
      {/* File icon */}
      <div
        className={cn(
          "flex items-center justify-center w-7 h-7 rounded-lg shrink-0",
          resource.premium
            ? "bg-[var(--color-bg-4)] text-[var(--color-text-3)]"
            : "bg-[var(--color-bg-4)] text-[var(--color-text-2)] group-hover:text-[var(--color-amber)] transition-colors"
        )}
      >
        {resource.premium ? (
          <Lock className="h-3.5 w-3.5" />
        ) : (
          <FileText className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Title + uploader */}
      <div className="min-w-0">
        <p
          className={cn(
            "text-sm leading-snug truncate transition-colors",
            resource.premium
              ? "text-[var(--color-text-3)]"
              : "text-[var(--color-text-1)] group-hover:text-[var(--color-amber)]"
          )}
        >
          {resource.title}
        </p>
        {resource.uploader && (
          <p className="font-mono text-[9px] text-[var(--color-text-3)] mt-0.5">
            {resource.uploader}
          </p>
        )}
      </div>

      {/* Year (PYQs) */}
      <div className="text-right shrink-0 w-12">
        {resource.year ? (
          <span className="font-mono text-[10px] text-[var(--color-text-3)]">
            {resource.year}
          </span>
        ) : null}
      </div>

      {/* Size + type badge */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-mono text-[10px] text-[var(--color-text-3)]">
          {resource.size}
        </span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider",
            resource.premium
              ? "border border-[var(--color-border)] text-[var(--color-text-3)]"
              : "border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] text-[var(--color-amber)]"
          )}
        >
          {TYPE_LABELS[resource.type]}
        </span>
      </div>

      {/* CTA */}
      <div className="shrink-0 w-16 flex justify-end">
        {resource.premium ? (
          <span className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--color-text-3)]">
            <Lock className="h-3 w-3" />
            Premium
          </span>
        ) : (
          <button className="group/btn flex items-center gap-1 rounded-lg border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--color-amber)] hover:bg-[rgba(245,158,11,0.18)] transition-colors">
            View
            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
