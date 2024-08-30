// // context/authcontext.tsx
// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   role: 'admin' | 'team member';
//   email: string;
//   token: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<User | undefined>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const login = async (email: string, password: string): Promise<User | undefined> => {
//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       if (response.status === 200) {
//         const { user, token } = response.data;
//         const authenticatedUser: User = { ...user, token };
//         setUser(authenticatedUser);
//         localStorage.setItem('authToken', token);
//         return authenticatedUser;
//       }
//       throw new Error('Login failed');
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = (): void => {
//     setUser(null);
//     localStorage.removeItem('authToken');
//   };

//   useEffect(() => {
//     const loadUser = async (): Promise<void> => {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         try {
//           const response = await axios.get('/api/auth/me', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (response.status === 200) {
//             const authenticatedUser: User = { ...response.data.user, token };
//             setUser(authenticatedUser);
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           localStorage.removeItem('authToken');
//         }
//       }
//       setLoading(false);
//     };

//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = React.useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
