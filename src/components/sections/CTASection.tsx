"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tickerMessages = [
  "Arjun from KIIT just accessed Data Structures PYQ",
  "1,247 students studying right now",
  "Priya earned ₹20 for OS Notes",
  "Rohan from VIT unlocked DBMS solutions",
  "New: IIT Madras resources just added",
];

export default function CTASection() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % tickerMessages.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[var(--color-bg)]">
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      {/* Amber center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(245,158,11,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-amber-border)] to-transparent" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Live activity ticker */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse shrink-0" />
            <span
              key={msgIdx}
              className="font-mono text-[11px] text-[var(--color-text-2)] animate-fade-up"
              style={{ animationDuration: "0.35s" }}
            >
              {tickerMessages[msgIdx]}
            </span>
          </motion.div>

          {/* Mono label */}
          <p className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest mb-6">
            / ready to study smarter?
          </p>

          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-[var(--color-text-1)]">
            India&apos;s notes,
            <br />
            finally organised.
          </h2>

          <p className="mt-5 text-base text-[var(--color-text-2)] max-w-lg mx-auto leading-relaxed">
            Join 80,000+ students from 50+ universities.
            Free to browse. No signup needed to start.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-amber)] px-6 py-3 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors"
            >
              Browse notes free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] px-6 py-3 text-sm text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-bg-4)] transition-colors"
            >
              Upload your notes → earn ₹20/topic
            </Link>
          </div>

          <p className="mt-5 font-mono text-xs text-[var(--color-text-3)]">
            Free forever for basic access · No credit card · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
