import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

function getAllowedEmails(): Set<string> {
  const list = [
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    "vojta.tranta@gmail.com",
    ...(process.env.ALLOWED_USERS ? process.env.ALLOWED_USERS.split(",") : []),
  ]
    .filter(Boolean)
    .map((e) => String(e).toLowerCase().trim());
  return new Set(list);
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = (creds?.email || "").toLowerCase().trim();
        const password = creds?.password || "";

        const adminEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "")
          .toLowerCase()
          .trim();
        const adminPass = process.env.ADMIN_PASSWORD || "";

        const vojtaEmail = "vojta.tranta@gmail.com";
        const vojtaPass = process.env.VOJTA_PASSWORD || "";

        const extra = (process.env.ALLOWED_USERS || "")
          .split(",")
          .map((e) => e.toLowerCase().trim())
          .filter(Boolean);

        const allowed = new Set([adminEmail, vojtaEmail, ...extra]);

        const ok =
          (email === adminEmail && password === adminPass) ||
          (email === vojtaEmail && password === vojtaPass);

        if (email && allowed.has(email) && ok) {
          return { id: email, email } as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = (user?.email || "").toLowerCase();
      const allowed = getAllowedEmails();
      return email ? allowed.has(email) : false;
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token?.email)
        session.user = { ...session.user, email: token.email } as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
