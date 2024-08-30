import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: { id: string; [key: string]: any }; // Extend as needed
  }
}
