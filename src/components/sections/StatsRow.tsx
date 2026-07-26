"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSpring, useInView } from "framer-motion";

interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  display: string; // formatted display string
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Universities", display: "50+" },
  { value: 100000, prefix: "1,00,000", suffix: "+", label: "Resources", display: "1,00,000+" },
  { value: 80000, prefix: "80,000", suffix: "+", label: "Students", display: "80,000+" },
  { value: 20, prefix: "₹", suffix: "/topic", label: "Earned by creators", display: "₹20" },
];

function AnimatedNumber({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 18 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      spring.set(stat.value);
    }
  }, [inView, stat.value, spring]);

  useEffect(() => {
    return spring.on("change", (v) => {
      const rounded = Math.round(v);
      if (stat.value >= 10000) {
        // format large numbers with commas
        setDisplay(rounded.toLocaleString("en-IN"));
      } else {
        setDisplay(String(rounded));
      }
    });
  }, [spring, stat.value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <span className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-text-1)]">
        {stat.value >= 10000 || stat.prefix === "₹"
          ? stat.display
          : `${display}${stat.suffix}`}
      </span>
      <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsRow() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y sm:divide-y-0 divide-[var(--color-border)]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex items-center justify-center py-6 px-4 ${
                i === 0 ? "divide-[var(--color-border)]" : ""
              }`}
            >
              <AnimatedNumber stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
