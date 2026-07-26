"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Arjun Mehta",
    university: "KIIT University",
    batch: "2024",
    quote: "Finally a platform where I can actually find Sem 5 notes without digging through 15 Telegram groups. The DRM thing is annoying but honestly I get it.",
    subject: "CSE",
  },
  {
    name: "Priya Nair",
    university: "VIT Vellore",
    batch: "2025",
    quote: "Got Premium free since I'm 2025 batch. Solved 3 years of PYQs before my end sem. Passed all subjects. Recommend.",
    subject: "ECE",
  },
  {
    name: "Rohit Sharma",
    university: "IIT Delhi",
    batch: "2023",
    quote: "Uploaded my CN and OS notes. ₹40 in the first week, ₹200 by end of month. Wasn't expecting to actually earn from this but here we are.",
    subject: "CSE",
  },
  {
    name: "Sneha Kumari",
    university: "NIT Rourkela",
    batch: "2024",
    quote: "Data Structures PYQs going back 8 years. I literally could not find this anywhere else. Not even on the college portal.",
    subject: "IT",
  },
  {
    name: "Karan Agarwal",
    university: "BITS Pilani",
    batch: "2023",
    quote: "The breadcrumb drill-down is how notes platforms should work. University → Branch → Semester is obvious and I don't know why others haven't done it.",
    subject: "EEE",
  },
  {
    name: "Ananya Das",
    university: "Manipal University",
    batch: "2025",
    quote: "I was skeptical about view-only. But after finding my notes on a random Telegram channel with my name watermarked, I respect the decision now.",
    subject: "CSE",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[var(--color-bg-2)] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Label */}
        <div className="mb-14 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / testimonials
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-1)] mb-12">
          What students say.
          <br />
          <span className="text-[var(--color-text-3)]">Unfiltered.</span>
        </h2>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-bg-2)] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex-shrink-0 w-72 sm:w-80"
              >
                {/* Terminal-style comment card */}
                <div className="rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] overflow-hidden h-full transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-border-2)]">
                  {/* Window bar */}
                  <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 font-mono text-[10px] text-[var(--color-text-3)]">
                      review_{String(i + 1).padStart(2, "0")}.md
                    </span>
                  </div>

                  {/* Comment block */}
                  <div className="p-5 flex flex-col gap-3 h-full">
                    {/* Commenter header */}
                    <div className="space-y-0.5">
                      <p className="font-mono text-[11px] text-[var(--color-amber)]">
                        // {t.name} · {t.university} · {t.batch}
                      </p>
                      <p className="font-mono text-[10px] text-[var(--color-text-3)]">
                        // {t.subject} branch
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[var(--color-border)]" />

                    {/* Quote */}
                    <p className="font-mono text-[11px] text-[var(--color-text-2)] leading-relaxed flex-1">
                      {"// "}
                      <span className="text-[var(--color-text-1)]">&quot;{t.quote}&quot;</span>
                    </p>

                    {/* Rating footer */}
                    <div className="pt-2 border-t border-[var(--color-border)]">
                      <p className="font-mono text-[10px] text-[var(--color-text-3)]">
                        // ─── rated{" "}
                        <span className="text-[var(--color-amber)]">★★★★★</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-6 font-mono text-xs text-[var(--color-text-3)]">
          {testimonials.length} verified student reviews · collected via in-app feedback
        </p>
      </div>
    </section>
  );
}
