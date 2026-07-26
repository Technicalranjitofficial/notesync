import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-3)]">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="text-[var(--color-text-4)] select-none">›</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[var(--color-text-2)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--color-text-1)]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
