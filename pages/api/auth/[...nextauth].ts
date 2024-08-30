// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/db"; // Adjust the import path as needed
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';

// Define the User model
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect(); // Ensure that MongoDB is connected

        // Find the user by username
        const user = await User.findOne({ username: credentials?.username });

        if (user && user.role === "team member") {
          // Compare the hashed password with the user's password
          const isPasswordValid = await bcrypt.compare(credentials?.password || '', user.password);
          if (isPasswordValid) {
            // Return the user object for the session
            return { id: user._id.toString(), role: user.role };
          }
        }

        // If authentication fails, return null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // Cast user to any to access role
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as 'admin' | 'team member'; // Ensure token.role is cast correctly
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

export default NextAuth(options);
