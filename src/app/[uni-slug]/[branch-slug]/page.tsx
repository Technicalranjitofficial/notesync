import type { Metadata } from "next";
import { UNIVERSITIES, BRANCH_SUBJECTS } from "@/lib/mock-data";
import BranchPageClient from "@/components/browse/BranchPageClient";

const BASE_URL = "https://notesync.in";

// ── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const params: { "uni-slug": string; "branch-slug": string }[] = [];
  for (const [uniSlug, university] of Object.entries(UNIVERSITIES)) {
    for (const branch of university.branches) {
      params.push({ "uni-slug": uniSlug, "branch-slug": branch.slug });
    }
  }
  return params;
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ "uni-slug": string; "branch-slug": string }>;
}): Promise<Metadata> {
  const { "uni-slug": uniSlug, "branch-slug": branchSlug } = await params;
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);

  if (!university || !branch) return { title: "Branch Not Found" };

  const title = `${university.name} ${branch.abbr} Notes, PYQs & Solutions — All Semesters`;
  const description = `Download free ${branch.name} notes, previous year question papers (PYQs), lab manuals, and solutions for all ${branch.semesters} semesters at ${university.name}. ${branch.resources.toLocaleString("en-IN")}+ verified resources. Sem 1 to Sem ${branch.semesters} covered.`;

  const keywords = [
    `${university.name} ${branch.abbr} notes`,
    `${university.name} ${branch.name} notes`,
    `${university.name} ${branch.abbr} PYQ`,
    `${university.name} ${branch.abbr} previous year papers`,
    `${university.name} ${branch.abbr} semester notes`,
    `${branch.name} notes ${university.location}`,
    ...Array.from({ length: branch.semesters }, (_, i) => [
      `${university.name} ${branch.abbr} sem ${i + 1} notes`,
      `${university.name} ${branch.abbr} sem ${i + 1} PYQ`,
    ]).flat(),
    `${uniSlug} ${branchSlug} notes`,
    `${uniSlug} ${branchSlug} PYQ`,
  ];

  const url = `${BASE_URL}/${uniSlug}/${branchSlug}`;
  const ogImageUrl = `${BASE_URL}/${uniSlug}/${branchSlug}/opengraph-image`;

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
          alt: `${university.name} ${branch.abbr} Notes & PYQs on NoteSync`,
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

// ── Page component (server shell → delegates to client for interactivity) ─────
export default async function BranchPage({
  params,
}: {
  params: Promise<{ "uni-slug": string; "branch-slug": string }>;
}) {
  const { "uni-slug": uniSlug, "branch-slug": branchSlug } = await params;
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);

  if (!university || !branch) {
    return (
      <div className="px-6 sm:px-8 py-8">
        <p className="font-mono text-sm text-[var(--color-text-3)]">Branch not found.</p>
      </div>
    );
  }

  // JSON-LD for this branch page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/${uniSlug}/${branchSlug}`,
    name: `${university.name} ${branch.name} Notes & PYQs`,
    description: `Free notes, PYQs and solutions for ${branch.name} at ${university.name}. All ${branch.semesters} semesters covered.`,
    url: `${BASE_URL}/${uniSlug}/${branchSlug}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE_URL}/${uniSlug}` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: university.name, item: `${BASE_URL}/${uniSlug}` },
        { "@type": "ListItem", position: 3, name: branch.abbr, item: `${BASE_URL}/${uniSlug}/${branchSlug}` },
      ],
    },
    hasPart: Array.from({ length: branch.semesters }, (_, i) => ({
      "@type": "Course",
      name: `${branch.abbr} Semester ${i + 1}`,
      url: `${BASE_URL}/${uniSlug}/${branchSlug}/sem-${i + 1}`,
      provider: {
        "@type": "CollegeOrUniversity",
        name: university.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BranchPageClient uniSlug={uniSlug} branchSlug={branchSlug} />
    </>
  );
}
