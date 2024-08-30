// types/session.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      role: 'admin' | 'team member'; // Ensure this matches your actual session data
    } & DefaultSession['user'];
  }
}
