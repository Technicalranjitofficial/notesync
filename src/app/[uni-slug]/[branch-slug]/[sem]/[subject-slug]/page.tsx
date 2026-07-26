import type { Metadata } from "next";
import { UNIVERSITIES, BRANCH_SUBJECTS, SUBJECT_RESOURCES } from "@/lib/mock-data";
import SubjectPageClient from "@/components/browse/SubjectPageClient";

const BASE_URL = "https://notesync.in";

// ── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const params: {
    "uni-slug": string;
    "branch-slug": string;
    sem: string;
    "subject-slug": string;
  }[] = [];

  for (const [uniSlug, university] of Object.entries(UNIVERSITIES)) {
    for (const branch of university.branches) {
      const semData = BRANCH_SUBJECTS[branch.slug];
      if (!semData) continue;
      for (let sem = 1; sem <= branch.semesters; sem++) {
        const subjects = semData[sem] ?? [];
        for (const subject of subjects) {
          params.push({
            "uni-slug": uniSlug,
            "branch-slug": branch.slug,
            sem: `sem-${sem}`,
            "subject-slug": subject.slug,
          });
        }
      }
    }
  }
  return params;
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    "uni-slug": string;
    "branch-slug": string;
    sem: string;
    "subject-slug": string;
  }>;
}): Promise<Metadata> {
  const {
    "uni-slug": uniSlug,
    "branch-slug": branchSlug,
    sem,
    "subject-slug": subjectSlug,
  } = await params;

  const semNum = parseInt(sem.replace("sem-", ""), 10) || 1;
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);
  const subjects = BRANCH_SUBJECTS[branchSlug]?.[semNum] ?? [];
  const subject = subjects.find((s) => s.slug === subjectSlug);

  if (!university || !branch || !subject) return { title: "Subject Not Found" };

  const allResources = SUBJECT_RESOURCES[subjectSlug] ?? [];
  const freeCount = allResources.filter((r) => !r.premium).length;
  const totalCount = allResources.length;

  const title = `${subject.name} (${subject.code}) Notes, PYQs & Solutions — ${university.name} ${branch.abbr} Sem ${semNum}`;
  const description = `Download ${freeCount} free + ${totalCount - freeCount} premium ${subject.name} study resources for ${university.name} ${branch.abbr} Semester ${semNum}. Includes verified notes (${subject.notes}), PYQs (${subject.pyqs}), and solutions (${subject.solutions}). Subject code: ${subject.code}.`;

  const keywords = [
    `${subject.name} notes`,
    `${subject.name} PYQ`,
    `${subject.name} solutions`,
    `${subject.code} notes`,
    `${subject.code} PYQ`,
    `${university.name} ${subject.name} notes`,
    `${university.name} ${branch.abbr} sem ${semNum} ${subject.name}`,
    `${university.name} ${branch.abbr} ${subject.code}`,
    `${subject.name} ${university.name}`,
    `${subject.name} previous year papers`,
    `${subject.name} study material`,
    `${uniSlug} ${branchSlug} sem-${semNum} ${subjectSlug}`,
    `${branch.abbr} ${subject.name} notes India`,
  ];

  const url = `${BASE_URL}/${uniSlug}/${branchSlug}/${sem}/${subjectSlug}`;
  const ogImageUrl = `${BASE_URL}/${uniSlug}/${branchSlug}/${sem}/${subjectSlug}/opengraph-image`;

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
      type: "article",
      locale: "en_IN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${subject.name} Notes & PYQs — ${university.name}`,
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
export default async function SubjectPage({
  params,
}: {
  params: Promise<{
    "uni-slug": string;
    "branch-slug": string;
    sem: string;
    "subject-slug": string;
  }>;
}) {
  const {
    "uni-slug": uniSlug,
    "branch-slug": branchSlug,
    sem,
    "subject-slug": subjectSlug,
  } = await params;

  const semNum = parseInt(sem.replace("sem-", ""), 10) || 1;
  const university = UNIVERSITIES[uniSlug];
  const branch = university?.branches.find((b) => b.slug === branchSlug);
  const subjects = BRANCH_SUBJECTS[branchSlug]?.[semNum] ?? [];
  const subject = subjects.find((s) => s.slug === subjectSlug);

  if (!university || !branch || !subject) {
    return (
      <div className="px-6 sm:px-8 py-8">
        <p className="font-mono text-sm text-[var(--color-text-3)]">Subject not found.</p>
      </div>
    );
  }

  const allResources = SUBJECT_RESOURCES[subjectSlug] ?? [];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${BASE_URL}/${uniSlug}/${branchSlug}/${sem}/${subjectSlug}`,
    name: subject.name,
    description: `Study materials, notes, PYQs, and solutions for ${subject.name} (${subject.code}) at ${university.name}.`,
    url: `${BASE_URL}/${uniSlug}/${branchSlug}/${sem}/${subjectSlug}`,
    provider: {
      "@type": "CollegeOrUniversity",
      name: university.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: university.location,
        addressCountry: "IN",
      },
    },
    educationalLevel: `Semester ${semNum}`,
    inLanguage: "en-IN",
    teaches: subject.name,
    courseCode: subject.code,
    isPartOf: {
      "@type": "Course",
      name: `${branch.name} — ${university.name}`,
      url: `${BASE_URL}/${uniSlug}/${branchSlug}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `P${semNum}T${branch.semesters}`,
    },
    // Breadcrumb
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: university.name, item: `${BASE_URL}/${uniSlug}` },
        { "@type": "ListItem", position: 3, name: branch.abbr, item: `${BASE_URL}/${uniSlug}/${branchSlug}` },
        { "@type": "ListItem", position: 4, name: `Sem ${semNum}`, item: `${BASE_URL}/${uniSlug}/${branchSlug}/${sem}` },
        { "@type": "ListItem", position: 5, name: subject.name, item: `${BASE_URL}/${uniSlug}/${branchSlug}/${sem}/${subjectSlug}` },
      ],
    },
    // Resources as DigitalDocuments
    learningResourceType: allResources.map((r) => ({
      "@type": "DigitalDocument",
      name: r.title,
      isAccessibleForFree: !r.premium,
      encodingFormat: "application/pdf",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubjectPageClient
        uniSlug={uniSlug}
        branchSlug={branchSlug}
        semNum={semNum}
        subjectSlug={subjectSlug}
      />
    </>
  );
}
