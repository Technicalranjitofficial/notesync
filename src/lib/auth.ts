import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.API_URL ?? "http://localhost:8001/api/v1";

// Shape returned by the NestJS backend on successful auth
interface BackendAuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    isPremium: boolean;
    universitySlug?: string | null;
    roles: string[];
    emailVerified: boolean;
  };
}

async function callBackend(path: string, body: Record<string, unknown>): Promise<BackendAuthResponse | null> {
  try {
    const res = await fetch(`${API_URL}/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as BackendAuthResponse;
  } catch {
    return null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ── Google OAuth ───────────────────────────────────────────────
    // NextAuth resolves Google → we get an idToken → send to NestJS backend
    // which verifies it, upserts the user in MongoDB, and returns our JWT.
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      // Request the openid scope so we get an id_token back
      authorization: {
        params: { scope: "openid email profile" },
      },
    }),

    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const data = await callBackend("login", { email, password });
        if (!data) return null;

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          image: data.user.image ?? null,
          isPremium: data.user.isPremium,
          university: data.user.universitySlug ?? null,
          authToken: data.accessToken,
        };
      },
    }),
  ],

  callbacks: {
    // ── signIn: called after Google resolves, before jwt callback ──
    // We send the Google idToken to our backend to upsert the user.
    async signIn({ user, account }) {
      if (account?.provider === "google" && account.id_token) {
        const data = await callBackend("google-token", {
          idToken: account.id_token,
        });

        if (!data) {
          // Backend rejected the token — block sign-in
          return false;
        }

        // Attach backend data to the user object so jwt() can pick it up
        user.id = data.user.id;
        user.name = data.user.name;
        user.email = data.user.email;
        user.image = data.user.image ?? null;
        user.isPremium = data.user.isPremium;
        user.university = data.user.universitySlug ?? null;
        user.authToken = data.accessToken;
      }
      return true;
    },

    async jwt({ token, user }) {
      // `user` is only present on the first sign-in
      if (user) {
        token.id = user.id ?? "";
        token.isPremium = (user as { isPremium?: boolean }).isPremium ?? false;
        token.university = (user as { university?: string | null }).university ?? null;
        token.authToken = (user as { authToken?: string }).authToken ?? "";
        token.profileComplete = false; // read from ns_profile cookie on client
      }

      // Auto-premium for 2025 batch emails
      if (typeof token.email === "string" && /^25\d{5}@/.test(token.email)) {
        token.isPremium = true;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isPremium = token.isPremium as boolean;
        session.user.university = token.university as string | null;
        session.user.authToken = token.authToken as string;
        // profileComplete is tracked via the ns_profile cookie on the client
        session.user.profileComplete = false;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) || url.startsWith("/") ? url : baseUrl;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },

  trustHost: true,
});
