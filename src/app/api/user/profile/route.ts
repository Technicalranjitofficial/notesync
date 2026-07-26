import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { profileStore, type UserProfile } from "@/lib/profile-store";

// Cookie name used by middleware to check profile completion.
// Must stay in sync with middleware.ts.
export const PROFILE_COOKIE = "ns_profile";

// ── POST /api/user/profile ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, personalEmail, university, branch, semester, yearOfJoining, rollNumber, bio } = body;

  // ── Validation ──────────────────────────────────────────────────────────
  if (!name || typeof name !== "string" || name.trim().length < 2)
    return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });

  const phoneStr = String(phone ?? "").trim();
  if (!/^[6-9]\d{9}$/.test(phoneStr))
    return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });

  const personalEmailStr = String(personalEmail ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalEmailStr))
    return NextResponse.json({ error: "Enter a valid personal email." }, { status: 400 });

  if (!university || typeof university !== "string")
    return NextResponse.json({ error: "University is required." }, { status: 400 });

  if (!branch || typeof branch !== "string")
    return NextResponse.json({ error: "Branch is required." }, { status: 400 });

  const semNum = Number(semester);
  if (!semNum || semNum < 1 || semNum > 10)
    return NextResponse.json({ error: "Semester must be between 1 and 10." }, { status: 400 });

  const yearNum = Number(yearOfJoining);
  const currentYear = new Date().getFullYear();
  if (!yearNum || yearNum < 2000 || yearNum > currentYear)
    return NextResponse.json({ error: "Enter a valid year of joining." }, { status: 400 });

  // ── Save profile ─────────────────────────────────────────────────────────
  const profile: UserProfile = {
    email: session.user.email,
    name: String(name).trim(),
    phone: phoneStr,
    personalEmail: personalEmailStr,
    university: String(university).trim(),
    branch: String(branch).trim(),
    semester: semNum,
    yearOfJoining: yearNum,
    rollNumber: rollNumber ? String(rollNumber).trim() : undefined,
    bio: bio ? String(bio).trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  profileStore.set(session.user.email, profile);

  // ── Set profile-complete cookie ───────────────────────────────────────────
  // This cookie is readable by the Edge middleware (no shared memory needed).
  // httpOnly so JS can't tamper with it; SameSite=Lax is fine for same-origin.
  const res = NextResponse.json({ success: true, profile });
  res.cookies.set(PROFILE_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // 10 days — matches the session maxAge
    maxAge: 10 * 24 * 60 * 60,
  });

  return res;
}

// ── GET /api/user/profile ─────────────────────────────────────────────────────
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = profileStore.get(session.user.email);
  if (!profile) {
    return NextResponse.json({ exists: false }, { status: 404 });
  }

  return NextResponse.json({ exists: true, profile });
}
