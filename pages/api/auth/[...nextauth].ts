// // pages/api/auth/[...nextauth].ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

// // Define the shape of your user object
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// // Configure NextAuth
// const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials) => {
//         // Ensure credentials is not undefined and has the required properties
//         if (!credentials || !credentials.username || !credentials.password) {
//           return null;
//         }

//         // Example user object, replace with actual validation
//         const user: User = { id: '1', name: 'John Doe', email: 'john@example.com' };

//         // Replace this with your actual validation logic
//         if (credentials.username === 'praneethvvsss123@gmail.com' && credentials.password === '123456789') {
//           return user;
//         } else {
//           return null;
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async session({ session, token }) {
//       // Optionally add custom properties to the session
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(options);

// import NextAuth, { NextAuthOptions, Session as NextAuthSession, JWT as NextAuthJWT } from "next-auth";
import NextAuth, { NextAuthOptions, Session as NextAuthSession, getToken as NextAuthJWT } from "next-auth";

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
            return { id: user._id.toString(), name: user.username, email: user.email, role: user.role };
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
    async jwt({ token, user }: { token: NextAuthJWT; user?: any }) {
      if (user) {
        token.role = user.role as string; // Ensure role is added to token and cast as string
      }
      return token;
    },
    async session({ session, token }: { session: NextAuthSession; token: NextAuthJWT }) {
      if (session.user) {
        session.user.role = token.role as string; // Ensure token.role is cast to string
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

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "../../../lib/db"; // Adjust the import path as needed
// import bcrypt from "bcryptjs";
// import mongoose from 'mongoose';

// // Assuming you have a User model
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   role: String,
// });

// const User = mongoose.models.User || mongoose.model("User", UserSchema);

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         await dbConnect(); // Ensure that MongoDB is connected

//         // Find the user by username (or email)
//         const user = await User.findOne({ username: credentials?.username });

//         if (user && user.role === "team member") {
//           // Compare the hashed password with the user's password
//           const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//           if (isPasswordValid) {
//             // Return the user object for the session
//             return { id: user._id, name: user.name, email: user.email, role: user.role };
//           }
//         }

//         // If authentication fails, return null
//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
