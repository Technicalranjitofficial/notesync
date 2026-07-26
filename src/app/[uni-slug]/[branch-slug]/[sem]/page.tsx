import { redirect } from "next/navigation";
import { UNIVERSITIES, BRANCH_SUBJECTS } from "@/lib/mock-data";

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const params: { "uni-slug": string; "branch-slug": string; sem: string }[] = [];
  for (const [uniSlug, university] of Object.entries(UNIVERSITIES)) {
    for (const branch of university.branches) {
      const semData = BRANCH_SUBJECTS[branch.slug];
      if (!semData) continue;
      for (let sem = 1; sem <= branch.semesters; sem++) {
        const subjects = semData[sem] ?? [];
        if (subjects.length > 0) {
          params.push({
            "uni-slug": uniSlug,
            "branch-slug": branch.slug,
            sem: `sem-${sem}`,
          });
        }
      }
    }
  }
  return params;
}

export default async function SemPage({
  params,
}: {
  params: Promise<{ "uni-slug": string; "branch-slug": string; sem: string }>;
}) {
  const { "uni-slug": uniSlug, "branch-slug": branchSlug } = await params;
  redirect(`/${uniSlug}/${branchSlug}`);
}
