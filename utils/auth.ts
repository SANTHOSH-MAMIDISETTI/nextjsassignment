// utils/auth.ts
// import { Session } from '@/types/session'; // Adjust import based on your file structure
// import { Session } from '../types/session';
import { Session } from "next-auth";
export const checkUserRole = (session: Session, requiredRole: 'admin' | 'team member') => {
  if (!session || !session.user || session.user.role !== requiredRole) {
    throw new Error('Access denied');
  }
};
