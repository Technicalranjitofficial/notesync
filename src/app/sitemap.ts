import type { MetadataRoute } from "next";
import { UNIVERSITIES, BRANCH_SUBJECTS } from "@/lib/mock-data";

const BASE_URL = "https://notesync.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // ── Homepage ────────────────────────────────────────────────────────────
  entries.push({
    url: BASE_URL,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  });

  // ── Auth pages ──────────────────────────────────────────────────────────
  entries.push(
    {
      url: `${BASE_URL}/auth/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/auth/register`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  );

  // ── University pages ─────────────────────────────────────────────────────
  for (const [uniSlug, university] of Object.entries(UNIVERSITIES)) {
    // /[uni-slug]
    entries.push({
      url: `${BASE_URL}/${uniSlug}`,
      lastModified: new Date(university.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const branch of university.branches) {
      // /[uni-slug]/[branch-slug]
      entries.push({
        url: `${BASE_URL}/${uniSlug}/${branch.slug}`,
        lastModified: new Date(university.lastUpdated),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // Semesters for this branch
      const semesterData = BRANCH_SUBJECTS[branch.slug];
      const numSems = branch.semesters;

      for (let sem = 1; sem <= numSems; sem++) {
        const semSlug = `sem-${sem}`;
        const subjects = semesterData?.[sem] ?? [];

        if (subjects.length === 0) continue;

        // /[uni-slug]/[branch-slug]/sem-N  (redirects to branch but still indexable)
        entries.push({
          url: `${BASE_URL}/${uniSlug}/${branch.slug}/${semSlug}`,
          lastModified: new Date(university.lastUpdated),
          changeFrequency: "weekly",
          priority: 0.7,
        });

        // /[uni-slug]/[branch-slug]/sem-N/[subject-slug]
        for (const subject of subjects) {
          entries.push({
            url: `${BASE_URL}/${uniSlug}/${branch.slug}/${semSlug}/${subject.slug}`,
            lastModified: new Date(university.lastUpdated),
            changeFrequency: "weekly",
            priority: 0.6,
          });
        }
      }
    }
  }

  return entries;
}
