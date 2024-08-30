// src/types/auth.d.ts
export interface User {
    _id?: string;
    token?: string;
  }
  
  export interface UseAuthReturn {
    user: User | null;
    loading: boolean;
  }
  