import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/auth/convert-token/",
  timeout: 5000,
});

const provider = {
  github: "github",
  google: "google-oauth2",
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log(account?.provider);
      if (account) {
        const response = await axiosInstance.post("http://localhost:8000/auth/convert-token/", {
          token: account?.access_token,
          backend: provider[account.provider],
          grant_type: "convert_token",
          client_id: process.env.DJANGO_ID,
          client_secret: process.env.DJANGO_SECRET,
        });

        token.accessToken = response.data.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
