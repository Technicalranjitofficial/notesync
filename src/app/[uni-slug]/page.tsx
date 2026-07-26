import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/browse/Breadcrumb";
import { UNIVERSITIES, RECENT_RESOURCES } from "@/lib/mock-data";

const BASE_URL = "https://notesync.in";

// ── Static params for build-time generation ──────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(UNIVERSITIES).map((slug) => ({ "uni-slug": slug }));
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ "uni-slug": string }>;
}): Promise<Metadata> {
  const { "uni-slug": uniSlug } = await params;
  const university = UNIVERSITIES[uniSlug];

  if (!university) {
    return { title: "University Not Found" };
  }

  const totalResources = university.branches.reduce((s, b) => s + b.resources, 0);
  const branchNames = university.branches.map((b) => b.name).join(", ");
  const branchAbbrs = university.branches.map((b) => b.abbr).join(", ");

  const title = `${university.name} Notes & PYQs — Free Download`;
  const description = `Download free notes, previous year question papers (PYQs), and solutions for ${university.name} (${university.location}). Covers ${branchAbbrs} — ${totalResources.toLocaleString("en-IN")}+ verified resources. CSE, ECE, MECH, CIVIL and more.`;

  const keywords = [
    `${university.name} notes`,
    `${university.name} PYQ`,
    `${university.name} previous year papers`,
    `${university.name} study material`,
    `${university.name} semester notes`,
    `${university.name} ${university.location} notes`,
    ...university.branches.flatMap((b) => [
      `${university.name} ${b.abbr} notes`,
      `${university.name} ${b.abbr} PYQ`,
      `${b.name} notes ${university.name}`,
    ]),
    `${uniSlug} notes download`,
    `${uniSlug} PYQ`,
    branchNames,
  ];

  const url = `${BASE_URL}/${uniSlug}`;
  const ogImageUrl = `${BASE_URL}/${uniSlug}/opengraph-image`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },

    openGraph: {
      title,
      description,
      url,
      siteName: "NoteSync",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${university.name} Notes & PYQs on NoteSync`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@notesyncin",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function UniPage({
  params,
}: {
  params: Promise<{ "uni-slug": string }>;
}) {
  const { "uni-slug": uniSlug } = await params;
  const university = UNIVERSITIES[uniSlug];

  if (!university) notFound();

  const totalResources = university.branches.reduce((sum, b) => sum + b.resources, 0);
  const lastUpdated = new Date(university.lastUpdated).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // JSON-LD for this university page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/${uniSlug}`,
    name: `${university.name} Notes & PYQs`,
    description: `Free notes, PYQs, and solutions for ${university.name} students. Covering ${university.branches.map((b) => b.name).join(", ")}.`,
    url: `${BASE_URL}/${uniSlug}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: {
      "@type": "CollegeOrUniversity",
      name: university.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: university.location,
        addressCountry: "IN",
      },
      foundingDate: university.established,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: university.name, item: `${BASE_URL}/${uniSlug}` },
      ],
    },
  };

  return (
    <div className="px-6 sm:px-8 py-8 max-w-5xl">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "notesync.in", href: "/" },
          { label: "universities", href: "/" },
          { label: university.name },
        ]}
      />

      {/* University terminal info block */}
      <div className="mt-6 rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] overflow-hidden">
        {/* Terminal bar */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-[var(--color-text-3)]">
            notesync.in / universities / {uniSlug}
          </span>
        </div>

        {/* Info grid */}
        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "University",       value: university.name },
            { label: "Location",         value: university.location },
            { label: "Total Resources",  value: totalResources.toLocaleString("en-IN") },
            { label: "Last Updated",     value: lastUpdated },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className="text-sm text-[var(--color-text-1)] leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)] px-5 py-2.5 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
            <span className="font-mono text-[10px] text-[var(--color-text-2)]">live index</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--color-text-3)]">
            {university.branches.length} branches · est. {university.established}
          </span>
        </div>
      </div>

      {/* Section label */}
      <div className="mt-10 mb-6 flex items-center gap-3">
        <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
          / branches
        </span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      {/* Branch grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {university.branches.map((branch) => (
          <Link
            key={branch.slug}
            href={`/${uniSlug}/${branch.slug}`}
            className="group relative flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-3)] p-5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-amber-border)] hover:bg-[var(--color-bg-4)]"
          >
            {/* Amber left accent line on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-amber)] opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Branch abbr */}
            <span className="font-mono text-3xl font-bold text-[var(--color-text-1)] group-hover:text-[var(--color-amber)] transition-colors leading-none">
              {branch.abbr}
            </span>

            {/* Full name */}
            <p className="mt-2 text-xs text-[var(--color-text-2)] leading-snug">
              {branch.name}
            </p>

            {/* Stats */}
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                {branch.semesters} sems ·{" "}
                <span className="text-[var(--color-text-2)]">
                  {branch.resources.toLocaleString("en-IN")} resources
                </span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-3)] group-hover:text-[var(--color-amber)] transition-all group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recently added */}
      <div className="mt-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / recently added
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden">
          {RECENT_RESOURCES.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-4)] transition-colors"
            >
              <p className="text-sm text-[var(--color-text-1)] truncate">{item.title}</p>
              <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                {item.branch} · Sem {item.sem}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-text-2)] truncate max-w-[120px]">
                {item.subject}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                {item.uploadedAt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  );
}
