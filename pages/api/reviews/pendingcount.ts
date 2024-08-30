// pages/api/reviews/pending-count.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Review from '@/app/models/review'; // Adjust the path as needed
import { verifyToken } from '../../../lib/auth'; // Import your token verification method

const getPendingCount = async (req: NextApiRequest, res: NextApiResponse) => {
  // Verify token and extract user information
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = await verifyToken(token); // Implement your token verification logic

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    await dbConnect();

    // Query for the count of pending review requests
    const pendingCount = await Review.countDocuments({ status: 'pending' });

    return res.status(200).json({ count: pendingCount });
  } catch (error) {
    console.error('Error fetching pending count:', error);
    return res.status(500).json({ message: 'Failed to fetch pending count' });
  }
};

export default getPendingCount;
