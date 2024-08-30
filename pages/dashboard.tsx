import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const session = await getSession();
        console.log('Session:', session); // Debugging: Check the session object

        if (!session || !session.user) {
          router.replace('/login');
          return;
        }

        // Ensure session.user.role exists before checking
        if (session.user.role === 'admin') {
          router.replace('/admin/dashboard');
        } else if (session.user.role === 'team member') {
          router.replace('/team/dashboard');
        } else {
          router.replace('/unauthorized');
        }
      } catch (error) {
        console.error('Error retrieving session:', error);
        router.replace('/login'); // Redirect to login in case of error
      } finally {
        setLoading(false); // Stop loading indicator after checking
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while redirecting
  }

  return null; // Render nothing while redirecting
};

export default Dashboard;
