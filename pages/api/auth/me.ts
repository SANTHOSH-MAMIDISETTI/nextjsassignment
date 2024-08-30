// pages/api/auth/me.ts

import type { NextApiRequest, NextApiResponse } from 'next';
// import { authMiddleware } from '../../lib/middleware';
import { authMiddleware } from '../../../lib/middleware';
// import dbConnect from '../../lib/db';
import dbConnect, { getUserById } from '../../../lib/db';

// import getuserby

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Ensure DB is connected
  await dbConnect();

  const { user } = req as any; // Extract user from request object

  try {
    // Fetch user details from the database
    const userDetails = await getUserById(user.id);

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authMiddleware(handler);
