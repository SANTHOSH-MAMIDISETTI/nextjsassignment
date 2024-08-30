// pages/api/admin-data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Adjust based on your session management library

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  try {
    // Ensure that session and user role are properly checked
    if (!session || session.user?.role !== 'team member') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Handle team member-specific logic here
    res.status(200).json({ message: 'Success', data: 'Team member data' });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
