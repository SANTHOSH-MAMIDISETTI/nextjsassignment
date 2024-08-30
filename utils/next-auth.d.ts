// types/next-auth.d.ts

import NextAuth from "next-auth";
import { JWT as NextAuthJWT, Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // Add the role field
    };
  }

  interface JWT {
    role: string; // Add the role field
  }
}
