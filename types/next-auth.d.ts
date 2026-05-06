import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

//adição de propriedades complementares ao Session e ao JWT no next-auth
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "admin" | "user" | "vendedor";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user" | "vendedor";
  }
}