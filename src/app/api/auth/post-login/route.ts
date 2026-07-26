import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * GET /api/auth/post-login?callbackUrl=<url>
 *
 * Used as the OAuth callbackUrl so we can check profileComplete
 * server-side immediately after Google sign-in and redirect
 * to the complete-profile page if needed.
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  if (!session?.user) {
    // Not signed in — send to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!session.user.profileComplete) {
    // Profile not yet complete — redirect to the form
    const dest = `/auth/complete-profile?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // Profile is complete — go to original destination
  return NextResponse.redirect(new URL(callbackUrl, req.url));
}
