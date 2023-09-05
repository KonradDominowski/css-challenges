import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    // user: {
    //   accessToken?: string;
    // };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
    accessToken?: string;
  }
}
