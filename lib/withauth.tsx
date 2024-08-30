// /components/withAuth.tsx or /lib/withAuth.tsx

// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useAuth } from './useauth';
// // import useAuth from '../lib/useAuth'; // Adjust the path as necessary

// const withAuth = (WrappedComponent: React.ComponentType) => {
//   return (props: any) => {
//     const { user } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       if (!user) {
//         router.replace('/login');
//       }
//     }, [user, router]);

//     return user ? <WrappedComponent {...props} /> : <div>Loading...</div>;
//   };
// };

// export default withAuth;
// components/withAuth.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../lib/useauth';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login');
      }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;
    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
