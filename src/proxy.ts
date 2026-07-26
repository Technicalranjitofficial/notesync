import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

// Must match the constant in api/user/profile/route.ts
const PROFILE_COOKIE = "ns_profile";

const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/complete-profile",
  "/auth/forgot-password",
  "/api/auth",
  "/api/user/profile",
  "/_next",
  "/favicon",
  "/site.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
  "/og-image",
  "/icon",
  "/apple-icon",
  "/sw.js",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export default auth((req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname;

  if (isPublic(pathname)) return NextResponse.next();

  const session = req.auth;

  // Not logged in — pages handle their own auth requirements
  if (!session?.user) return NextResponse.next();

  // Read the profile-complete cookie — set by POST /api/user/profile.
  // This works in both Node.js and Edge runtimes (no shared memory needed).
  const profileComplete = req.cookies.get(PROFILE_COOKIE)?.value === "1";

  if (!profileComplete) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/complete-profile";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
