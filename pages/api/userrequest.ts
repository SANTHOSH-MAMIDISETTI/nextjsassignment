import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import Review from '@/app/models/review'; // Adjust the import based on your actual file path

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    try {
      const userRequests = await Review.countDocuments({ userId });
      res.status(200).json({ requests: userRequests });
    } catch (error) {
      console.error('Error fetching requests by user:', error);
      res.status(500).json({ message: 'Error fetching requests by user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
