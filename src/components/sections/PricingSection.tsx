"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Browse, preview, read basic notes.",
    features: [
      "All universities browsable",
      "Basic notes access",
      "10 PDF views/day",
      "Mobile viewer",
    ],
    cta: "Start for free",
    href: "/auth/register",
    highlight: false,
  },
  {
    name: "Premium",
    price: "₹99",
    period: "/ month",
    desc: "Full access. Unlimited. No restrictions.",
    features: [
      "Everything in Free",
      "PYQs — last 10 years",
      "Answer keys & solutions",
      "Unlimited daily views",
      "Priority content updates",
      "Contributor rewards eligible",
      "Ad-free",
    ],
    cta: "Get Premium",
    href: "/auth/register?plan=premium",
    highlight: true,
  },
  {
    name: "Institutional",
    price: "Custom",
    period: "",
    desc: "For colleges, departments, coaching institutes.",
    features: [
      "Private namespace",
      "Bulk student onboarding",
      "Custom branding",
      "Admin panel access",
      "SLA support",
      "API + SSO",
    ],
    cta: "Contact us",
    href: "mailto:hello@notesync.in",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">

        {/* Label */}
        <div className="mb-14 flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-widest">
            / pricing
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-1)] mb-3">
          Start free.
          <span className="text-[var(--color-text-3)]"> Upgrade when it matters.</span>
        </h2>
        <p className="text-sm text-[var(--color-text-2)] mb-12 max-w-lg">
          2025 batch students get Premium automatically. Everyone else — free tier is genuinely useful.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-xl border flex flex-col p-6 ${
                plan.highlight
                  ? "border-[var(--color-amber-border)] bg-[var(--color-amber-glow)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-3)]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 rounded-full border border-[var(--color-amber-border)] bg-[var(--color-bg)] px-3 py-0.5 font-mono text-[10px] text-[var(--color-amber)] uppercase tracking-widest">
                  Most popular
                </span>
              )}

              <div className="mb-5">
                <p className="font-mono text-xs text-[var(--color-text-3)] uppercase tracking-widest mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold tracking-tight ${plan.highlight ? "text-[var(--color-amber)]" : "text-[var(--color-text-1)]"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[var(--color-text-3)]">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-2)]">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${plan.highlight ? "text-[var(--color-amber)]" : "text-[var(--color-text-3)]"}`}
                      strokeWidth={2.5}
                    />
                    <span className="text-xs text-[var(--color-text-2)]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-[var(--color-amber)] text-[var(--color-bg)] hover:bg-amber-400"
                    : "border border-[var(--color-border-2)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:border-[var(--color-border-2)] hover:bg-[var(--color-bg-4)]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Terminal comparison note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-[10px] text-[var(--color-text-3)]">batch-check.sh</span>
          </div>
          <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="font-mono text-[11px] text-[var(--color-amber)] shrink-0">$</span>
            <span className="font-mono text-[12px] text-[var(--color-text-2)] leading-relaxed">
              2025 batch students → automatic Premium.
              <span className="text-[var(--color-text-1)]"> Verify with your </span>
              <span className="text-[var(--color-amber)]">@kiit.ac.in</span>
              <span className="text-[var(--color-text-1)]"> / </span>
              <span className="text-[var(--color-amber)]">@vit.ac.in</span>
              <span className="text-[var(--color-text-1)]"> email to unlock instantly.</span>
            </span>
          </div>
        </motion.div>

        <p className="mt-5 font-mono text-xs text-[var(--color-text-3)] text-center">
          All plans include view-only DRM protection · Payments via Razorpay · Cancel anytime
        </p>
      </div>
    </section>
  );
}
