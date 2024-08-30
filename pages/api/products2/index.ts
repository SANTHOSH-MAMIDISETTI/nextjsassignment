import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db';
import dbConnect from '../../../lib/db';
import Review from '@/app/models/review'; // Adjust path as needed

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      // Query all reviews and include necessary fields
      const reviews = await Review.find({}, 'productId name description price imageUrl status');
      res.status(200).json(reviews);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

export default handler;

