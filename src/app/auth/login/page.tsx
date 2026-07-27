"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ChevronRight, ArrowLeft, GraduationCap, CheckCircle2, XCircle } from "lucide-react";
import { detectUniversityFromEmail, validateUniversityEmail, UNIVERSITY_EMAIL_RULES } from "@/lib/mock-data";

// ── Fragment field data ────────────────────────────────────────────────────
const FRAGMENTS = [
  "Data Structures","Operating Systems","DBMS","Computer Networks",
  "Algorithms","Compiler Design","Machine Learning","Thermodynamics",
  "Signal Processing","Digital Electronics","Engineering Maths",
  "Fluid Mechanics","Software Engineering","AI & Robotics",
  "DS_PYQ_2023.pdf","OS_Notes_Unit4.pdf","DBMS_Solutions.pdf",
  "CN_Lab_Manual.pdf","Algo_Complete.pdf",
  "GET /api/notes/kiit/cse/sem3","200 OK · 4218 files",
  "access: premium_required","verified: true",
  "branch: cse · sem: 3","uni: KIIT · 80K students",
  "KIIT","IIT-D","VIT","NITR","BITS","SRM","Manipal","Amity",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface Fragment {
  id: number; text: string; x: number; y: number;
  size: number; opacity: number; speed: number; delay: number;
}

function buildFragments(count: number): Fragment[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i, text: FRAGMENTS[i % FRAGMENTS.length],
    x: seededRandom(i * 3) * 90 + 5,
    y: seededRandom(i * 7) * 100,
    size: 0.52 + seededRandom(i * 11) * 0.38,
    opacity: 0.035 + seededRandom(i * 13) * 0.055,
    speed: 7 + seededRandom(i * 5) * 20,
    delay: seededRandom(i * 17) * 15,
  }));
}

function FragmentField({ count = 44 }: { count?: number }) {
  const fragments = buildFragments(count);
  const [tick, setTick] = useState(0);
  const startRef = useRef<number | null>(null);
  useAnimationFrame((t) => {
    if (startRef.current === null) startRef.current = t;
    setTick(t - startRef.current);
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {fragments.map((f) => {
        const elapsed = tick / 1000;
        const totalH = 100;
        const rawY = f.y - ((elapsed + f.delay) * f.speed * 0.012) % totalH;
        const y = ((rawY % totalH) + totalH) % totalH;
        return (
          <span key={f.id} className="absolute font-mono whitespace-nowrap"
            style={{ left: `${f.x}%`, top: `${y}%`, fontSize: `${f.size}rem`,
              opacity: f.opacity, color: "var(--color-text-2)", transform: "translateX(-50%)" }}>
            {f.text}
          </span>
        );
      })}
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-10"
      style={{ background: "linear-gradient(90deg,transparent 0%,rgba(245,158,11,0.12) 30%,rgba(245,158,11,0.28) 50%,rgba(245,158,11,0.12) 70%,transparent 100%)" }}
      initial={{ top: "-2%" }} animate={{ top: "102%" }}
      transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatDelay: 4 }}
    />
  );
}

// ── Terminal lines ─────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { prefix: "$", text: "notesync --universities 50", delay: 0 },
  { prefix: "→", text: "Loaded KIIT · IIT-D · VIT · NITR", delay: 0.5, dim: true },
  { prefix: "$", text: "notesync --resources --count", delay: 1.0 },
  { prefix: "→", text: "1,00,247 files indexed", delay: 1.5, dim: true },
  { prefix: "$", text: "notesync --students --active", delay: 2.0 },
  { prefix: "→", text: "80,412 studying now", delay: 2.5, dim: true },
  { prefix: "$", text: "notesync --auth --status", delay: 3.0 },
  { prefix: "→", text: "Session required. Authenticate.", delay: 3.5, amber: true },
];

const ACCESS_FEATURES = [
  "PYQs going back 10 years",
  "Solutions & answer keys",
  "Unlimited daily PDF views",
  "Contributor rewards (₹20/topic)",
  "Priority content updates",
];

function TerminalLine({ line }: { line: (typeof TERMINAL_LINES)[number] }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), line.delay * 1000);
    return () => clearTimeout(t);
  }, [line.delay]);
  if (!visible) return null;
  return (
    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }} className="flex items-start gap-2">
      <span className={`font-mono text-[11px] shrink-0 mt-0.5 ${
        line.amber ? "text-[var(--color-amber)]" : line.prefix === "$" ? "text-[var(--color-green)]" : "text-[var(--color-text-3)]"
      }`}>{line.prefix}</span>
      <span className={`font-mono text-[11px] leading-relaxed ${
        line.amber ? "text-[var(--color-amber)]" : line.dim ? "text-[var(--color-text-3)]" : "text-[var(--color-text-2)]"
      }`}>{line.text}</span>
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}


// ── Slide variants — right panel flips between login & register ────────────
const slideVariants = {
  enterFromRight: { x: 60, opacity: 0, scale: 0.97 },
  center:         { x: 0,  opacity: 1, scale: 1 },
  exitToLeft:     { x: -60, opacity: 0, scale: 0.97 },
  enterFromLeft:  { x: -60, opacity: 0, scale: 0.97 },
  exitToRight:    { x: 60,  opacity: 0, scale: 0.97 },
};

type Mode = "login" | "register";

// ── Login form panel ───────────────────────────────────────────────────────
function LoginForm({
  onSwitch, callbackUrl, urlError,
}: { onSwitch: () => void; callbackUrl: string; urlError: string | null }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState<"google" | "creds" | null>(null);
  const [error, setError] = useState<string | null>(
    urlError === "CredentialsSignin" ? "Invalid email or password." : null
  );

  // After any sign-in, check if profile is complete and redirect accordingly
  function getPostLoginUrl(session: import("next-auth").Session | null): string {
    if (!session?.user?.profileComplete) {
      return `/auth/complete-profile?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    }
    return callbackUrl;
  }

  async function handleGoogle() {
    setLoading("google"); setError(null);
    // Pass callbackUrl directly — NextAuth v5 will redirect here after OAuth.
    // The landing page (or complete-profile) will handle the profile gate.
    await signIn("google", { callbackUrl });
  }

  async function handleCreds(e: React.FormEvent) {
    e.preventDefault(); setLoading("creds"); setError(null);
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(null);
    } else {
      // Fetch the fresh session to check profileComplete
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      router.push(getPostLoginUrl(session));
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="font-mono text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-1.5">/ authenticate</p>
        <h1 className="text-xl font-semibold text-[var(--color-text-1)]">Welcome back</h1>
        <p className="text-sm text-[var(--color-text-3)] mt-0.5">Sign in to access notes &amp; PYQs.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-2.5">
            <p className="font-mono text-[11px] text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={handleGoogle} disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] px-5 py-3 text-sm font-medium text-[var(--color-text-1)] hover:bg-[var(--color-bg-4)] transition-all disabled:opacity-60">
        {loading === "google" ? <span className="h-4 w-4 rounded-full border-2 border-[var(--color-text-3)] border-t-[var(--color-text-1)] animate-spin"/> : <GoogleIcon />}
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[var(--color-border)]"/></div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--color-bg-2)] px-3 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">or email</span>
        </div>
      </div>

      <form onSubmit={handleCreds} className="space-y-3">
        <div>
          <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1.5">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="student@kiit.ac.in" required
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-2.5 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"/>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">Password</label>
            <Link href="/auth/forgot-password" className="font-mono text-[10px] text-[var(--color-amber)] hover:opacity-80 transition-opacity">Forgot?</Link>
          </div>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-2.5 pr-11 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"/>
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors p-1">
              {showPw ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading !== null}
          className="group w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-amber)] py-3 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors disabled:opacity-60">
          {loading === "creds"
            ? <span className="h-4 w-4 rounded-full border-2 border-[var(--color-bg)]/40 border-t-[var(--color-bg)] animate-spin"/>
            : <><span>Sign in</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/></>}
        </button>
      </form>

      <p className="text-center font-mono text-[11px] text-[var(--color-text-3)]">
        New here?{" "}
        <button onClick={onSwitch} className="text-[var(--color-amber)] hover:opacity-80 transition-opacity">
          Create account →
        </button>
      </p>
    </div>
  );
}

// ── Register form panel ────────────────────────────────────────────────────
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [uniLocked, setUniLocked] = useState(false);   // true when auto-detected from email
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState<"google" | "form" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const is2025 = /^25\d{5}@/.test(email);

  // Auto-detect university from email domain as user types
  function handleEmailChange(val: string) {
    setEmail(val);
    setEmailError(null);

    const detected = detectUniversityFromEmail(val);
    if (detected) {
      setUniversity(detected.slug);
      setUniLocked(true);
    } else {
      // Only unlock if it was previously auto-locked
      setUniLocked(false);
    }

    // Validate if university is already selected
    if (university && !detected) {
      const err = validateUniversityEmail(val, university);
      setEmailError(err);
    }
  }

  // Validate email when university is manually changed
  function handleUniChange(slug: string) {
    setUniversity(slug);
    if (email && slug && slug !== "other") {
      const err = validateUniversityEmail(email, slug);
      setEmailError(err);
    } else {
      setEmailError(null);
    }
  }

  async function handleGoogle() {
    setLoading("google");
    await signIn("google", { callbackUrl: "/" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading("form");
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(null);
      return;
    }

    // Final email validation
    if (university && university !== "other") {
      const err = validateUniversityEmail(email, university);
      if (err) { setEmailError(err); setLoading(null); return; }
    }

    // Step 1: Create user in the NestJS backend (MongoDB via Prisma)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001/api/v1"}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, universitySlug: university || undefined }),
        },
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        const msg = Array.isArray(body.message) ? body.message[0] : (body.message ?? "Registration failed.");
        setError(msg);
        setLoading(null);
        return;
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(null);
      return;
    }

    // Step 2: Sign in with the newly created credentials
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Could not create account. Please try again.");
      setLoading(null);
      return;
    }
    // Check profileComplete before redirecting
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    if (!session?.user?.profileComplete) {
      router.push(`/auth/complete-profile?callbackUrl=${encodeURIComponent("/")}`);
    } else {
      router.push("/");
    }
    setLoading(null);
  }

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;

  // Build dropdown — put detected university first if locked
  const uniOptions = [
    ...UNIVERSITY_EMAIL_RULES.map(r => ({ value: r.slug, label: r.name })),
    { value: "other", label: "Other university" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <button onClick={onSwitch}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-text-3)] hover:text-[var(--color-amber)] transition-colors mb-3">
          <ArrowLeft className="h-3 w-3"/> Back to sign in
        </button>
        <p className="font-mono text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-1.5">/ new account</p>
        <h1 className="text-xl font-semibold text-[var(--color-text-1)]">Join NoteSync</h1>
        <p className="text-sm text-[var(--color-text-3)] mt-0.5">Free access · 50+ universities</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-2.5">
            <p className="font-mono text-[11px] text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={handleGoogle} disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-1)] hover:bg-[var(--color-bg-4)] transition-all disabled:opacity-60">
        {loading === "google" ? <span className="h-4 w-4 rounded-full border-2 border-[var(--color-text-3)] border-t-[var(--color-text-1)] animate-spin"/> : <GoogleIcon />}
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[var(--color-border)]"/></div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--color-bg-2)] px-3 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">or email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Name */}
        <div>
          <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1">Full name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Arjun Sharma" required
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-2.5 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"/>
        </div>

        {/* Email — with auto-detect feedback */}
        <div>
          <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1">University email</label>
          <div className="relative">
            <input type="email" value={email} onChange={e => handleEmailChange(e.target.value)}
              placeholder="21053420@kiit.ac.in" required
              className={`w-full rounded-xl border bg-[var(--color-bg-3)] px-4 py-2.5 pr-10 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none transition-colors focus:ring-1 ${
                emailError
                  ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                  : "border-[var(--color-border)] focus:border-[var(--color-amber-border)] focus:ring-[var(--color-amber-border)]"
              }`}/>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <AnimatePresence>
                {is2025 && !emailError && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    className="rounded-full border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-1.5 py-0.5 font-mono text-[8px] text-[var(--color-amber)] uppercase tracking-wide whitespace-nowrap">
                    Premium
                  </motion.span>
                )}
                {uniLocked && !emailError && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-green)]"/>
                  </motion.span>
                )}
                {emailError && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <XCircle className="h-3.5 w-3.5 text-red-400"/>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence>
            {emailError && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="font-mono text-[10px] text-red-400 mt-1">{emailError}</motion.p>
            )}
            {uniLocked && !emailError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-mono text-[10px] text-[var(--color-green)] mt-1">
                ✓ University detected automatically
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* University selector — locked when auto-detected */}
        <div>
          <label className="flex items-center gap-1 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1">
            <GraduationCap className="h-3 w-3"/>
            University
            {uniLocked && <span className="ml-1 text-[var(--color-green)]">(auto-detected)</span>}
          </label>
          <select value={university} onChange={e => handleUniChange(e.target.value)} required
            disabled={uniLocked}
            className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-2.5 text-sm font-mono outline-none transition-colors appearance-none ${
              uniLocked
                ? "text-[var(--color-green)] cursor-default opacity-80"
                : "text-[var(--color-text-1)] cursor-pointer focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)]"
            }`}>
            <option value="" disabled>Select university</option>
            {uniOptions.map(u => <option key={u.value} value={u.value} className="bg-[#16161a]">{u.label}</option>)}
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1">Password</label>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min 8 characters" required minLength={8}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-2.5 pr-11 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"/>
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors p-1">
              {showPw ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
            </button>
          </div>
          {password.length > 0 && (
            <div className="mt-1.5 flex gap-1">
              {[1,2,3].map(level => (
                <div key={level} className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                  pwStrength >= level ? level===1 ? "bg-red-500" : level===2 ? "bg-[var(--color-amber)]" : "bg-[var(--color-green)]"
                  : "bg-[var(--color-border)]"}`}/>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading !== null || !!emailError}
          className="group w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-amber)] py-3 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors disabled:opacity-60 mt-1">
          {loading === "form"
            ? <span className="h-4 w-4 rounded-full border-2 border-[var(--color-bg)]/40 border-t-[var(--color-bg)] animate-spin"/>
            : <><span>Create account</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/></>}
        </button>
      </form>

      <p className="font-mono text-[9px] text-center text-[var(--color-text-4)]">
        By registering you agree to our{" "}
        <Link href="/terms" className="underline hover:text-[var(--color-text-3)] transition-colors">Terms</Link>
        {" "}&amp;{" "}
        <Link href="/privacy" className="underline hover:text-[var(--color-text-3)] transition-colors">Privacy</Link>.
      </p>
    </div>
  );
}

// ── Main auth page ─────────────────────────────────────────────────────────
function AuthContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const urlError = searchParams.get("error");
  const [mode, setMode] = useState<Mode>("login");
  const [prevMode, setPrevMode] = useState<Mode>("login");

  function switchTo(next: Mode) {
    setPrevMode(mode);
    setMode(next);
  }

  // Direction: login→register = slide right-in, register→login = slide left-in
  const enterVariant = mode === "register" ? "enterFromRight" : "enterFromLeft";
  const exitVariant  = mode === "register" ? "exitToLeft"    : "exitToRight";

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">

      {/* ── Left panel: animated showcase ────────────────────────── */}
      <div className="hidden lg:flex lg:w-[54%] flex-col relative overflow-hidden border-r border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[var(--color-bg-2)]"/>
        <div className="absolute inset-0 bg-grid-dark opacity-30"/>
        <FragmentField count={44}/>
        <ScanLine/>
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%,transparent 35%,rgba(17,17,20,0.72) 100%)" }}/>
        {/* Amber bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom center,rgba(245,158,11,0.07) 0%,transparent 65%)" }}/>

        <div className="relative z-10 flex flex-col h-full px-10 py-12">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="font-mono text-[10px] text-[var(--color-text-3)]">v2.0</span>
            <span className="text-base font-semibold tracking-tight text-[var(--color-text-1)]">
              note<span className="text-[var(--color-amber)]">sync</span><span className="text-[var(--color-text-3)]">.in</span>
            </span>
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-md">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <p className="font-mono text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-3">/ platform status</p>
              <h2 className="text-2xl font-semibold text-[var(--color-text-1)] leading-tight mb-7">
                India&apos;s academic knowledge,<br/>
                <span className="text-[var(--color-text-3)]">organised &amp; protected.</span>
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)]/85 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"/>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"/>
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"/>
                <span className="ml-2 font-mono text-[10px] text-[var(--color-text-3)]">notesync-cli</span>
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse"/>
              </div>
              <div className="p-4 space-y-1.5 min-h-[175px]">
                {TERMINAL_LINES.map((line, i) => <TerminalLine key={i} line={line}/>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }} className="mt-7">
              <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-3.5">Premium unlocks</p>
              <ul className="space-y-2">
                {ACCESS_FEATURES.map((f, i) => (
                  <motion.li key={f} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.07, duration: 0.25 }}
                    className="flex items-center gap-2.5">
                    <ChevronRight className="h-3 w-3 text-[var(--color-amber)] shrink-0" strokeWidth={2.5}/>
                    <span className="text-xs text-[var(--color-text-2)]">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="font-mono text-[10px] text-[var(--color-text-3)] italic">
            &quot;Notes that made it to the exam. Now making it to every student.&quot;
          </motion.p>
        </div>
      </div>

      {/* ── Right panel: animated form swap ──────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:px-10 relative overflow-hidden">
        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
          <span className="text-base font-semibold tracking-tight text-[var(--color-text-1)]">
            note<span className="text-[var(--color-amber)]">sync</span><span className="text-[var(--color-text-3)]">.in</span>
          </span>
        </Link>

        {/* Fixed-width container so panel doesn't resize on switch */}
        <div className="relative w-full max-w-sm">
          {/* Card shell — always visible */}
          <div className="rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-2)] overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-amber-border)] to-transparent"/>
            <div className="px-7 py-7">
              {/* AnimatePresence swaps the inner form */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={mode}
                  variants={slideVariants}
                  initial={enterVariant}
                  animate="center"
                  exit={exitVariant}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  {mode === "login"
                    ? <LoginForm onSwitch={() => switchTo("register")} callbackUrl={callbackUrl} urlError={urlError}/>
                    : <RegisterForm onSwitch={() => switchTo("login")}/>
                  }
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 2025 batch note */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)]/60 px-4 py-3 flex items-start gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber)] animate-glow-pulse mt-1.5 shrink-0"/>
            <p className="font-mono text-[10px] text-[var(--color-text-3)] leading-relaxed">
              <span className="text-[var(--color-amber)]">2025 batch:</span>{" "}
              Emails starting with <span className="text-[var(--color-text-2)]">25XXXXX@</span> get Premium automatically.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <span className="h-6 w-6 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-amber)] animate-spin"/>
      </div>
    }>
      <AuthContent/>
    </Suspense>
  );
}
