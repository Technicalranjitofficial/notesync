import React from "react";
import Link from "next/link";

const cols = {
  Platform: [
    { label: "Browse universities", href: "/universities" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Submit notes", href: "/submit" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  Universities: [
    { label: "KIIT University", href: "/kiit" },
    { label: "IIT Delhi", href: "/iit-delhi" },
    { label: "VIT Vellore", href: "/vit-vellore" },
    { label: "BITS Pilani", href: "/bits-pilani" },
    { label: "View all →", href: "/universities" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Institutional", href: "/institutional" },
    { label: "Contact", href: "mailto:hello@notesync.in" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Copyright", href: "/copyright" },
    { label: "Refund", href: "/refund" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-base font-semibold tracking-tight text-[var(--color-text-1)]">
                note<span className="text-[var(--color-amber)]">sync</span>
                <span className="text-[var(--color-text-3)]">.in</span>
              </span>
            </Link>
            <p className="text-xs text-[var(--color-text-3)] leading-relaxed max-w-[200px]">
              India's largest university notes platform. Verified, structured, protected.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1">
              <span className="text-sm">🇮🇳</span>
              <span className="font-mono text-[10px] text-[var(--color-text-3)]">Made in India</span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(cols).map(([cat, links]) => (
              <div key={cat}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-3)] mb-4">{cat}</p>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-xs text-[var(--color-text-2)] hover:text-[var(--color-text-1)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-[var(--color-text-3)]">
            © {new Date().getFullYear()} NoteSync Technologies Pvt. Ltd.
          </p>
          <p className="font-mono text-[10px] text-[var(--color-text-3)] italic">
            &quot;Notes that made it to the exam. Now making it to every student.&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
