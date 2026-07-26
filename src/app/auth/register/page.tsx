"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, GraduationCap } from "lucide-react";

const UNIVERSITIES = [
  { value: "kiit", label: "KIIT University" },
  { value: "iit-delhi", label: "IIT Delhi" },
  { value: "vit-vellore", label: "VIT Vellore" },
  { value: "nit-rourkela", label: "NIT Rourkela" },
  { value: "bits-pilani", label: "BITS Pilani" },
  { value: "amity", label: "Amity University" },
  { value: "srm", label: "SRM University" },
  { value: "manipal", label: "Manipal University" },
  { value: "other", label: "Other university" },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState<"google" | "form" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Detect 2025 batch from email
  const is2025Batch = email.match(/^25\d{5}@/);

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

    // In production: POST to /api/auth/register to create user in DB
    // Then sign in automatically
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Account created — please sign in with your credentials.");
      setLoading(null);
      router.push("/auth/login");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-5 py-12 sm:px-10">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="fixed inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Top line */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-amber-border)] to-transparent" />

        {/* Card */}
        <div className="rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-2)] overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-[10px] text-[var(--color-text-3)]">
              notesync — create account
            </span>
          </div>

          <div className="px-6 py-7 sm:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono text-[10px] text-[var(--color-amber)] uppercase tracking-widest mb-2.5">
                / new account
              </p>
              <h1 className="text-xl font-semibold text-[var(--color-text-1)]">
                Join NoteSync
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-3)]">
                Free access to notes from 50+ universities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="mt-6 space-y-4"
            >
              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3"
                  >
                    <p className="font-mono text-[11px] text-red-400">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Google */}
              <button
                onClick={handleGoogle}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] px-5 py-3 text-sm font-medium text-[var(--color-text-1)] hover:bg-[var(--color-bg-4)] transition-all disabled:opacity-60"
              >
                {loading === "google" ? (
                  <span className="h-4 w-4 rounded-full border-2 border-[var(--color-text-3)] border-t-[var(--color-text-1)] animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[var(--color-border)]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[var(--color-bg-2)] px-3 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest">
                    or with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arjun Sharma"
                    required
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-3 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1.5">
                    University email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="21053420@kiit.ac.in"
                      required
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-3 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"
                    />
                    {/* 2025 batch auto-premium badge */}
                    <AnimatePresence>
                      {is2025Batch && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <span className="rounded-full border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-2 py-0.5 font-mono text-[9px] text-[var(--color-amber)] uppercase tracking-wider">
                            Premium auto
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* University select */}
                <div>
                  <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1.5">
                    <GraduationCap className="h-3 w-3 inline-block mr-1 mb-0.5" />
                    University
                  </label>
                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-3 text-sm text-[var(--color-text-1)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-[var(--color-text-3)]">
                      Select your university
                    </option>
                    {UNIVERSITIES.map((u) => (
                      <option key={u.value} value={u.value} className="bg-[#16161a]">
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-widest mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-4 py-3 pr-11 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] font-mono outline-none focus:border-[var(--color-amber-border)] focus:ring-1 focus:ring-[var(--color-amber-border)] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors p-1"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {/* Password strength bar */}
                  {password.length > 0 && (
                    <div className="mt-1.5 flex gap-1">
                      {[3, 6, 10].map((threshold, i) => (
                        <div
                          key={i}
                          className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                            password.length >= threshold
                              ? i === 0
                                ? "bg-red-500"
                                : i === 1
                                ? "bg-[var(--color-amber)]"
                                : "bg-[var(--color-green)]"
                              : "bg-[var(--color-border)]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading !== null}
                  className="group w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-3 text-sm font-semibold text-[var(--color-bg)] hover:bg-amber-400 transition-colors disabled:opacity-60 mt-1"
                >
                  {loading === "form" ? (
                    <span className="h-4 w-4 rounded-full border-2 border-[var(--color-bg)]/40 border-t-[var(--color-bg)] animate-spin" />
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign in link */}
              <p className="text-center font-mono text-[11px] text-[var(--color-text-3)]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-[var(--color-amber)] hover:opacity-80 transition-opacity"
                >
                  Sign in →
                </Link>
              </p>

              <p className="text-center font-mono text-[9px] text-[var(--color-text-4)] leading-relaxed pt-1">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="underline hover:text-[var(--color-text-3)] transition-colors">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-[var(--color-text-3)] transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="font-mono text-[10px] text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors"
          >
            ← Back to notesync.in
          </Link>
        </div>
      </div>
    </div>
  );
}
