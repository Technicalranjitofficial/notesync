"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, User, Phone, Mail, GraduationCap, BookOpen, Hash } from "lucide-react";
import { UNIVERSITIES } from "@/lib/mock-data";

// ── Branch options per university ─────────────────────────────────────────────
const BRANCH_MAP: Record<string, { value: string; label: string }[]> = {};
for (const [slug, uni] of Object.entries(UNIVERSITIES)) {
  BRANCH_MAP[slug] = uni.branches.map((b) => ({ value: b.slug, label: b.name }));
}
BRANCH_MAP["other"] = [
  { value: "cse", label: "Computer Science & Engineering" },
  { value: "ece", label: "Electronics & Communication" },
  { value: "mech", label: "Mechanical Engineering" },
  { value: "civil", label: "Civil Engineering" },
  { value: "it", label: "Information Technology" },
  { value: "other", label: "Other" },
];

const UNI_OPTIONS = [
  ...Object.entries(UNIVERSITIES).map(([slug, uni]) => ({ value: slug, label: uni.name })),
  { value: "other", label: "Other University" },
];

// ── Steps config ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "confirm",  label: "Confirm",  icon: CheckCircle2 },
];

interface FormData {
  name: string;
  phone: string;
  personalEmail: string;
  rollNumber: string;
  bio: string;
  university: string;
  branch: string;
  semester: string;
  yearOfJoining: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i);

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label, error, children, hint,
}: { label: string; error?: string | null; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="font-mono text-[10px] text-red-400"
          >
            {error}
          </motion.p>
        )}
        {!error && hint && (
          <p className="font-mono text-[10px] text-[var(--color-text-3)]">{hint}</p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Input / Select shared style ───────────────────────────────────────────────
const inputCls = (err?: string | null) =>
  `w-full rounded-xl border ${err ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "border-[var(--color-border)] focus:border-[var(--color-amber-border)] focus:ring-[var(--color-amber-border)]"} bg-[var(--color-bg-3)] px-4 py-2.5 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:ring-1 transition-colors`;

// ── Step 1: Personal info ─────────────────────────────────────────────────────
function StepPersonal({
  data, onChange, errors,
}: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-4">
      <Field label="Full name" error={errors.name}>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-3)]" />
          <input
            type="text" value={data.name} onChange={(e) => onChange("name", e.target.value)}
            placeholder="Arjun Sharma" className={`${inputCls(errors.name)} pl-9`}
          />
        </div>
      </Field>

      <Field label="Phone number" error={errors.phone} hint="10-digit Indian mobile number">
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-3)]" />
          <span className="absolute left-9 top-1/2 -translate-y-1/2 font-mono text-sm text-[var(--color-text-3)] select-none">+91</span>
          <input
            type="tel" value={data.phone} onChange={(e) => onChange("phone", e.target.value)}
            placeholder="9876543210" maxLength={10} className={`${inputCls(errors.phone)} pl-[4.5rem]`}
          />
        </div>
      </Field>

      <Field label="Personal email" error={errors.personalEmail} hint="Not your university email — Gmail, Outlook, etc.">
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-3)]" />
          <input
            type="email" value={data.personalEmail} onChange={(e) => onChange("personalEmail", e.target.value)}
            placeholder="arjun.sharma@gmail.com" className={`${inputCls(errors.personalEmail)} pl-9`}
          />
        </div>
      </Field>

      <Field label="Bio (optional)" error={errors.bio}>
        <textarea
          value={data.bio} onChange={(e) => onChange("bio", e.target.value)}
          placeholder="Tell us a bit about yourself..." rows={2}
          className={`${inputCls()} resize-none`}
        />
      </Field>
    </div>
  );
}

// ── Step 2: Academic info ─────────────────────────────────────────────────────
function StepAcademic({
  data, onChange, errors,
}: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  const branchOptions = BRANCH_MAP[data.university] ?? BRANCH_MAP["other"];

  return (
    <div className="space-y-4">
      <Field label="University" error={errors.university}>
        <div className="relative">
          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-3)] pointer-events-none" />
          <select
            value={data.university} onChange={(e) => { onChange("university", e.target.value); onChange("branch", ""); }}
            className={`${inputCls(errors.university)} pl-9 appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select your university</option>
            {UNI_OPTIONS.map((u) => (
              <option key={u.value} value={u.value} className="bg-[#16161a]">{u.label}</option>
            ))}
          </select>
        </div>
      </Field>

      <Field label="Branch / Programme" error={errors.branch}>
        <div className="relative">
          <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-3)] pointer-events-none" />
          <select
            value={data.branch} onChange={(e) => onChange("branch", e.target.value)}
            disabled={!data.university}
            className={`${inputCls(errors.branch)} pl-9 appearance-none cursor-pointer disabled:opacity-50`}
          >
            <option value="" disabled>Select your branch</option>
            {branchOptions.map((b) => (
              <option key={b.value} value={b.value} className="bg-[#16161a]">{b.label}</option>
            ))}
          </select>
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Current semester" error={errors.semester}>
          <select
            value={data.semester} onChange={(e) => onChange("semester", e.target.value)}
            className={`${inputCls(errors.semester)} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Sem</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((s) => (
              <option key={s} value={String(s)} className="bg-[#16161a]">Sem {s}</option>
            ))}
          </select>
        </Field>

        <Field label="Year of joining" error={errors.yearOfJoining}>
          <select
            value={data.yearOfJoining} onChange={(e) => onChange("yearOfJoining", e.target.value)}
            className={`${inputCls(errors.yearOfJoining)} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Year</option>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={String(y)} className="bg-[#16161a]">{y}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Roll / Enrolment number (optional)" error={errors.rollNumber}>
        <div className="relative">
          <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-3)]" />
          <input
            type="text" value={data.rollNumber} onChange={(e) => onChange("rollNumber", e.target.value)}
            placeholder="21053420" className={`${inputCls()} pl-9`}
          />
        </div>
      </Field>
    </div>
  );
}

// ── Step 3: Confirm summary ───────────────────────────────────────────────────
function StepConfirm({ data, session }: { data: FormData; session?: { user?: { email?: string | null; image?: string | null } | null } }) {
  const uniLabel = UNI_OPTIONS.find((u) => u.value === data.university)?.label ?? data.university;
  const branchOptions = BRANCH_MAP[data.university] ?? BRANCH_MAP["other"];
  const branchLabel = branchOptions.find((b) => b.value === data.branch)?.label ?? data.branch;

  const rows = [
    { label: "Name",           value: data.name },
    { label: "University email", value: session?.user?.email ?? "—" },
    { label: "Personal email", value: data.personalEmail },
    { label: "Phone",          value: `+91 ${data.phone}` },
    { label: "University",     value: uniLabel },
    { label: "Branch",         value: branchLabel },
    { label: "Semester",       value: `Sem ${data.semester}` },
    { label: "Year of joining", value: data.yearOfJoining },
    ...(data.rollNumber ? [{ label: "Roll number", value: data.rollNumber }] : []),
    ...(data.bio ? [{ label: "Bio", value: data.bio }] : []),
  ];

  return (
    <div className="space-y-3">
      <p className="font-mono text-[11px] text-[var(--color-text-3)]">
        Review your details before submitting.
      </p>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`grid grid-cols-[140px_1fr] gap-4 px-4 py-3 ${i < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
          >
            <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest self-center shrink-0">
              {label}
            </span>
            <span className="text-sm text-[var(--color-text-1)] break-all">{value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-4 py-3">
        <p className="font-mono text-[10px] text-[var(--color-amber)]">
          ✓ Your profile will be saved and you&apos;ll be redirected automatically.
        </p>
      </div>
    </div>
  );
}

// ── Validation ────────────────────────────────────────────────────────────────
function validateStep(step: number, data: FormData): Partial<Record<keyof FormData, string>> {
  const errs: Partial<Record<keyof FormData, string>> = {};
  if (step === 0) {
    if (data.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (!/^[6-9]\d{9}$/.test(data.phone.trim())) errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalEmail.trim())) errs.personalEmail = "Enter a valid email address.";
  }
  if (step === 1) {
    if (!data.university) errs.university = "Please select your university.";
    if (!data.branch) errs.branch = "Please select your branch.";
    if (!data.semester) errs.semester = "Please select your semester.";
    if (!data.yearOfJoining) errs.yearOfJoining = "Please select your year of joining.";
  }
  return errs;
}

// ── Main component ────────────────────────────────────────────────────────────
function CompleteProfileContent() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [data, setData] = useState<FormData>({
    name: "",
    phone: "",
    personalEmail: "",
    rollNumber: "",
    bio: "",
    university: "",
    branch: "",
    semester: "",
    yearOfJoining: "",
  });

  // Pre-fill name from session
  useEffect(() => {
    // Pre-fill name from session
    if (session?.user?.name) {
      setData((d) => ({ ...d, name: d.name || session.user!.name! }));
    }
    // The middleware handles redirect if profile cookie is already set.
    // No client-side check needed here.
  }, [session, callbackUrl, router]);

  // Redirect unauthenticated users to login
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <span className="h-6 w-6 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-amber)] animate-spin" />
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.replace(`/auth/login?callbackUrl=${encodeURIComponent("/auth/complete-profile")}`);
    return null;
  }

  function onChange(key: keyof FormData, value: string) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  function goNext() {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setDir(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setErrors({});
    setDir(-1);
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
      const res = await fetch(`${baseUrl}/api/user/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setSubmitError(body.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      // Hard navigate forces a full page reload so the middleware reads the
      // fresh ns_profile cookie set by the API route above.
      window.location.href = callbackUrl;
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -48, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-5 py-12 sm:px-10 relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative w-full max-w-lg">
        {/* Top glow line */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-amber-border)] to-transparent" />

        {/* Card */}
        <div className="rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-2)] overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-[10px] text-[var(--color-text-3)]">
              notesync — complete profile
            </span>
            <div className="ml-auto flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
              <span className="font-mono text-[9px] text-[var(--color-text-3)]">
                {session?.user?.email}
              </span>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-0 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-6 py-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const active = i === step;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center h-7 w-7 rounded-full border transition-all duration-300 ${
                      done ? "bg-[var(--color-amber)] border-[var(--color-amber)]"
                      : active ? "border-[var(--color-amber)] bg-[var(--color-amber-glow)]"
                      : "border-[var(--color-border)] bg-[var(--color-bg-3)]"}`}>
                      <Icon className={`h-3.5 w-3.5 ${done || active ? "text-[var(--color-bg)]" : "text-[var(--color-text-3)]"} ${done ? "" : active ? "text-[var(--color-amber)]" : ""}`} />
                    </div>
                    <span className={`font-mono text-[11px] hidden sm:block ${active ? "text-[var(--color-text-1)]" : done ? "text-[var(--color-amber)]" : "text-[var(--color-text-3)]"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 mx-3 h-px transition-colors duration-300 ${i < step ? "bg-[var(--color-amber)]" : "bg-[var(--color-border)]"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Form area */}
          <div className="px-6 py-6 sm:px-8 min-h-[340px]">
            <div className="mb-5">
              <p className="font-mono text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-1">
                / step {step + 1} of {STEPS.length}
              </p>
              <h1 className="text-xl font-semibold text-[var(--color-text-1)]">
                {step === 0 && "Personal details"}
                {step === 1 && "Academic details"}
                {step === 2 && "Confirm profile"}
              </h1>
              <p className="text-sm text-[var(--color-text-3)] mt-0.5">
                {step === 0 && "How can we reach you?"}
                {step === 1 && "Help us personalise your experience."}
                {step === 2 && "Everything look good?"}
              </p>
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {step === 0 && <StepPersonal data={data} onChange={onChange} errors={errors} />}
                {step === 1 && <StepAcademic data={data} onChange={onChange} errors={errors} />}
                {step === 2 && <StepConfirm data={data} session={session ?? undefined} />}
              </motion.div>
            </AnimatePresence>

            {/* Submit error */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-2.5"
                >
                  <p className="font-mono text-[11px] text-red-400">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4">
            {step > 0 ? (
              <button onClick={goBack} disabled={submitting}
                className="font-mono text-[11px] text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors disabled:opacity-40">
                ← Back
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button onClick={goNext}
                className="group flex items-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors">
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className="group flex items-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors disabled:opacity-60">
                {submitting
                  ? <span className="h-4 w-4 rounded-full border-2 border-[var(--color-bg)]/40 border-t-[var(--color-bg)] animate-spin" />
                  : <><CheckCircle2 className="h-4 w-4" /><span>Complete profile</span></>}
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-0.5 rounded-full bg-[var(--color-border)] overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-amber)] rounded-full"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <span className="h-6 w-6 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-amber)] animate-spin" />
      </div>
    }>
      <CompleteProfileContent />
    </Suspense>
  );
}
