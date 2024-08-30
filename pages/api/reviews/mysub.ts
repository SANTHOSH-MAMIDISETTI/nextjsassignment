import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db'; // Adjust path as needed
import Review from '@/app/models/review'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const reviews = await Review.find({ createdBy: req.query.userId });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
