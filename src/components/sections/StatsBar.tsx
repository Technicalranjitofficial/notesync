import React from "react";
import { Building2, FileText, Users, Star } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "50+",
    label: "Universities",
    color: "text-[var(--color-brand-600)]",
    bg: "bg-[var(--color-brand-50)]",
  },
  {
    icon: FileText,
    value: "1L+",
    label: "Resources",
    color: "text-[var(--color-accent-green)]",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    value: "80K+",
    label: "Active Students",
    color: "text-[var(--color-accent-purple)]",
    bg: "bg-violet-50",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Avg Rating",
    color: "text-[var(--color-accent-orange)]",
    bg: "bg-amber-50",
  },
];

const universities = [
  "KIIT University",
  "IIT Delhi",
  "VIT Vellore",
  "NIT Rourkela",
  "BITS Pilani",
  "Amity University",
  "SRM University",
  "Manipal University",
];

export default function StatsBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-2)]">
      {/* Stats row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrolling university ticker */}
      <div className="border-t border-[var(--color-border)] overflow-hidden py-3 bg-[var(--color-surface-3)]">
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] mb-1 px-4 sm:px-6">
          <span className="font-medium text-[var(--color-text-secondary)]">Supported universities:</span>
        </div>
        <div className="flex gap-3 px-4 sm:px-6 overflow-x-auto scrollbar-none pb-1 flex-wrap">
          {universities.map((uni) => (
            <span
              key={uni}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-400)]" />
              {uni}
            </span>
          ))}
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)] whitespace-nowrap">
            + 42 more
          </span>
        </div>
      </div>
    </section>
  );
}
