
import bcrypt from "bcrypt";
import { db } from "@/libs/prisma.server";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      name: "sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error("Invalid credentials");
        }
        const user = await db.user.findUnique({
          where:{
            email: credentials.email
          }
        });
        if(!user || !user.password){
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if(!isCorrectPassword){
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages:{
    signIn:'/'
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
