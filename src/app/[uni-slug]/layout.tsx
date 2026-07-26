import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import BranchSidebar from "@/components/browse/BranchSidebar";
import MobileBranchBar from "@/components/browse/MobileBranchBar";
import { UNIVERSITIES } from "@/lib/mock-data";

// Pre-generate all university layout segments at build time
export async function generateStaticParams() {
  return Object.keys(UNIVERSITIES).map((slug) => ({ "uni-slug": slug }));
}

export default async function UniLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ "uni-slug": string }>;
}) {
  const { "uni-slug": uniSlug } = await params;
  const university = UNIVERSITIES[uniSlug];

  if (!university) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)]">
      {/* Fixed top navbar */}
      <Navbar />

      {/*
        Below navbar: full height remaining area.
        pt-14 accounts for the fixed 56px navbar.
        On desktop: sidebar + content side by side using flex row.
        On mobile: stacked — mobile branch bar on top, content below.
      */}
      <div className="flex flex-1 flex-col lg:flex-row pt-14">

        {/* ── Desktop sidebar ── fixed to viewport left, full height */}
        <div className="hidden lg:flex lg:flex-col lg:w-60 lg:shrink-0 lg:fixed lg:top-14 lg:left-0 lg:bottom-0 lg:overflow-y-auto lg:z-30">
          <BranchSidebar university={university} uniSlug={uniSlug} />
        </div>

        {/* ── Mobile top branch bar ── horizontal pill scroll, not sidebar */}
        <div className="lg:hidden sticky top-14 z-20 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-2)]/95 backdrop-blur-sm">
          <MobileBranchBar branches={university.branches} uniSlug={uniSlug} />
        </div>

        {/*
          Main content area.
          On desktop: offset left by sidebar width (lg:ml-60).
          On mobile: full width, no offset.
        */}
        <main className="flex-1 min-w-0 lg:ml-60">
          {children}
        </main>
      </div>
    </div>
  );
}
