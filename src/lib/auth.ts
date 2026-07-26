import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// ── Mock user store (replace with real DB lookup in production) ──────────────
const MOCK_USERS = [
  {
    id: "1",
    email: "student@kiit.ac.in",
    name: "Demo Student",
    password: bcrypt.hashSync("demo1234", 10),
    image: null as string | null,
    isPremium: false,
    university: "kiit",
  },
];

async function getUserByEmail(email: string) {
  return MOCK_USERS.find((u) => u.email === email) ?? null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
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
        const user = await getUserByEmail(email);
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          isPremium: user.isPremium,
          university: user.university,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.isPremium = (user as { isPremium?: boolean }).isPremium ?? false;
        token.university = (user as { university?: string }).university ?? null;
      }
      // Auto-premium for 2025 batch emails
      if (typeof token.email === "string" && token.email.startsWith("25")) {
        token.isPremium = true;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isPremium = token.isPremium as boolean;
        session.user.university = token.university as string | null;
        // profileComplete is now tracked via the ns_profile cookie, not the JWT.
        // The session value is derived from the cookie on the client side.
        session.user.profileComplete = false; // client reads from cookie directly
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
