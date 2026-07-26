import React from "react";

const universities = [
  "KIIT University",
  "IIT Delhi",
  "IIT Bombay",
  "VIT Vellore",
  "NIT Rourkela",
  "BITS Pilani",
  "Amity University",
  "SRM University",
  "Manipal University",
  "Lovely Professional University",
  "Jadavpur University",
  "NSUT Delhi",
  "DTU Delhi",
  "NIT Trichy",
  "IIT Madras",
  "Chandigarh University",
];

const subjects = [
  "Data Structures",
  "Operating Systems",
  "DBMS",
  "Computer Networks",
  "Algorithms",
  "Digital Electronics",
  "Thermodynamics",
  "Engineering Maths",
  "Signal Processing",
  "Fluid Mechanics",
  "Theory of Computation",
  "Compiler Design",
  "Software Engineering",
  "Machine Learning",
  "Computer Architecture",
  "Discrete Mathematics",
];

const UniItem = ({ name }: { name: string }) => (
  <span className="inline-flex items-center gap-2 px-5 text-sm text-[var(--color-text-3)] whitespace-nowrap shrink-0">
    <span className="h-px w-4 bg-[var(--color-text-4)]" />
    {name}
  </span>
);

const SubjectItem = ({ name }: { name: string }) => (
  <span className="inline-flex items-center gap-2 px-5 text-sm text-[var(--color-text-3)] whitespace-nowrap shrink-0">
    <span className="font-mono text-[var(--color-text-4)] text-[10px]">#</span>
    {name}
  </span>
);

export default function MarqueeBar() {
  const doubledUnis = [...universities, ...universities];
  const doubledSubjects = [...subjects, ...subjects];

  return (
    <div className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-2)] overflow-hidden">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-bg-2)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-bg-2)] to-transparent z-10 pointer-events-none" />

      {/* Row 1 — universities, left to right */}
      <div className="py-2.5 border-b border-[var(--color-border)]">
        <div className="animate-marquee">
          {doubledUnis.map((name, i) => (
            <UniItem key={i} name={name} />
          ))}
        </div>
      </div>

      {/* Row 2 — subjects, right to left */}
      <div className="py-2.5">
        <div className="animate-marquee-reverse">
          {doubledSubjects.map((name, i) => (
            <SubjectItem key={i} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
