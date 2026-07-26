"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Menu, X, ArrowRight, BookOpen, GraduationCap, Zap,
  IndianRupee, User, LogOut, Settings, ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Universities", href: "#universities", icon: GraduationCap, desc: "Browse 50+ campuses" },
  { label: "Features",     href: "#features",     icon: Zap,            desc: "DRM protection & more" },
  { label: "How It Works", href: "#how-it-works", icon: BookOpen,        desc: "3 steps to get started" },
  { label: "Pricing",      href: "#pricing",      icon: IndianRupee,    desc: "Free + Premium plans" },
];

// ── Small avatar initials fallback ────────────────────────────────────────────
function AvatarFallback({ name }: { name?: string | null }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "U";
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-amber-glow)] border border-[var(--color-amber-border)]">
      <span className="font-mono text-[11px] font-semibold text-[var(--color-amber)]">{initials}</span>
    </div>
  );
}

// ── User dropdown ─────────────────────────────────────────────────────────────
function UserMenu({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const user = session?.user;

  async function handleSignOut() {
    onClose();
    await signOut({ callbackUrl: "/" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[var(--color-border-2)] bg-[var(--color-bg-2)] shadow-xl overflow-hidden z-50"
    >
      {/* Top glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-amber-border)] to-transparent" />

      {/* User info */}
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-sm font-medium text-[var(--color-text-1)] truncate">{user?.name ?? "Student"}</p>
        <p className="font-mono text-[10px] text-[var(--color-text-3)] truncate mt-0.5">{user?.email}</p>
        {(user as { isPremium?: boolean })?.isPremium && (
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-2 py-0.5 font-mono text-[9px] text-[var(--color-amber)]">
            ✦ Premium
          </span>
        )}
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-2)] hover:bg-[var(--color-bg-3)] hover:text-[var(--color-text-1)] transition-colors"
        >
          <User className="h-4 w-4 shrink-0" />
          My Profile
        </Link>
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-2)] hover:bg-[var(--color-bg-3)] hover:text-[var(--color-text-1)] transition-colors"
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </Link>
      </div>

      <div className="h-px bg-[var(--color-border)]" />

      <div className="py-1.5">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/8 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const user = session?.user;

  // Suppress SSR/client mismatch: session is only known client-side.
  // Render a stable placeholder until after first mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);           // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // desktop user dropdown
  const [count, setCount] = useState(1243);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (y < 60) {
      setHidden(false);
      setScrolled(false);
    } else {
      setScrolled(true);
      if (y > lastScrollY + 8 && !open) setHidden(true);
      else if (y < lastScrollY - 4) setHidden(false);
    }
    setLastScrollY(y);
  }, [lastScrollY, open]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) - 1);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled || open
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/98 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex h-14 items-center justify-between">

            {/* Logo */}
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 shrink-0">
              <span className="font-mono text-[10px] text-[var(--color-text-3)] select-none hidden sm:block">v2.0</span>
              <span className="text-[15px] font-semibold tracking-tight text-[var(--color-text-1)]">
                note<span className="text-[var(--color-amber)]">sync</span>
                <span className="text-[var(--color-text-3)]">.in</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {nav.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-3 py-1.5 text-sm text-[var(--color-text-2)] hover:text-[var(--color-text-1)] transition-colors rounded-md hover:bg-[var(--color-bg-3)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop right cluster */}
            <div className="hidden md:flex items-center gap-3">
              {/* Live count */}
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-3)] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
                <span className="font-mono text-[10px] text-[var(--color-text-2)]">
                  {count.toLocaleString()} studying
                </span>
              </div>

              {/* Auth area — only rendered client-side to avoid SSR/hydration mismatch */}
              {!mounted ? (
                // Stable SSR placeholder — matches what client renders before session loads
                <div className="h-8 w-20 rounded-lg bg-[var(--color-bg-3)] opacity-0" aria-hidden="true" />
              ) : status === "loading" ? (
                <div className="h-8 w-8 rounded-full bg-[var(--color-bg-3)] animate-pulse" />
              ) : isLoggedIn ? (
                // ── Logged in: avatar + dropdown ──
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] px-2.5 py-1.5 hover:bg-[var(--color-bg-4)] transition-colors"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name ?? "User"}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback name={user?.name} />
                    )}
                    <span className="text-sm text-[var(--color-text-1)] max-w-[100px] truncate hidden lg:block">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-[var(--color-text-3)] transition-transform duration-200",
                        userMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && <UserMenu onClose={() => setUserMenuOpen(false)} />}
                  </AnimatePresence>
                </div>
              ) : (
                // ── Logged out: sign in + get access ──
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm text-[var(--color-text-2)] hover:text-[var(--color-text-1)] transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-lg border border-[var(--color-amber-border)] bg-[var(--color-amber-glow)] px-4 py-1.5 text-sm font-medium text-[var(--color-amber)] hover:bg-[rgba(245,158,11,0.18)] transition-colors"
                  >
                    Get access
                  </Link>
                </>
              )}
            </div>

            {/* Mobile right: live count + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-3)] px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
                <span className="font-mono text-[9px] text-[var(--color-text-2)]">{count.toLocaleString()}</span>
              </div>

              {/* Mobile: show avatar if logged in, else nothing — mount-gated */}
              {mounted && isLoggedIn && (
                <Link href="/profile" className="shrink-0">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "User"}
                      width={32}
                      height={32}
                      className="rounded-full border border-[var(--color-border)] object-cover"
                    />
                  ) : (
                    <AvatarFallback name={user?.name} />
                  )}
                </Link>
              )}

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] text-[var(--color-text-2)] active:bg-[var(--color-bg-4)] transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="h-[18px] w-[18px]" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="h-[18px] w-[18px]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile full-screen menu ─────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-[var(--color-bg)]/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-14 left-0 right-0 z-40 md:hidden border-b border-[var(--color-border)] bg-[var(--color-bg)] overflow-y-auto max-h-[calc(100vh-3.5rem)]"
            >
              {/* Logged-in user strip in mobile menu */}
              {mounted && isLoggedIn && (
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-2)]">
                  {user?.image ? (
                    <Image src={user.image} alt={user.name ?? "User"} width={36} height={36} className="rounded-full object-cover border border-[var(--color-border)]" />
                  ) : (
                    <AvatarFallback name={user?.name} />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-1)] truncate">{user?.name}</p>
                    <p className="font-mono text-[10px] text-[var(--color-text-3)] truncate">{user?.email}</p>
                  </div>
                </div>
              )}

              {/* Nav items */}
              <div className="px-4 pt-3 pb-2">
                {nav.map((l, i) => {
                  const Icon = l.icon;
                  return (
                    <motion.div
                      key={l.label}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={l.href}
                        onClick={closeMenu}
                        className="group flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-[var(--color-bg-3)] active:bg-[var(--color-bg-4)]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-3)] group-hover:border-[var(--color-amber-border)] group-hover:bg-[var(--color-amber-glow)] transition-colors">
                          <Icon className="h-4 w-4 text-[var(--color-text-2)] group-hover:text-[var(--color-amber)] transition-colors" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text-1)]">{l.label}</p>
                          <p className="font-mono text-[10px] text-[var(--color-text-3)] mt-0.5">{l.desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[var(--color-text-3)] group-hover:text-[var(--color-amber)] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mx-4 h-px bg-[var(--color-border)]" />

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.2 }}
                className="px-4 py-4 flex flex-col gap-2.5"
              >
                {mounted && isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] py-3.5 text-sm text-[var(--color-text-1)] active:bg-[var(--color-bg-4)] transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                    <button
                      onClick={async () => { closeMenu(); await signOut({ callbackUrl: "/" }); }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 py-3.5 text-sm text-red-400 active:opacity-80 transition-opacity"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/register"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-amber)] py-3.5 text-sm font-semibold text-[var(--color-bg)] active:opacity-90 transition-opacity"
                    >
                      Get access free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/auth/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center rounded-xl border border-[var(--color-border-2)] bg-[var(--color-bg-3)] py-3.5 text-sm text-[var(--color-text-2)] active:bg-[var(--color-bg-4)] transition-colors"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </motion.div>

              {/* Bottom info strip */}
              <div className="px-4 pb-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
                  <span className="font-mono text-[10px] text-[var(--color-text-3)]">
                    {count.toLocaleString()} students studying now
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[var(--color-text-3)]">v2.0</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
