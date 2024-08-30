// types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: 'admin' | 'team member'; // Ensure this matches your actual user structure
  }

  interface Session {
    user: {
      id: string;
      role: 'admin' | 'team member'; // Ensure this matches your actual session structure
    } & DefaultSession['user'];
  }

  interface JWT {
    role?: 'admin' | 'team member'; // Optional role in the JWT
  }
}
