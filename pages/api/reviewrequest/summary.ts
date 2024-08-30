import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../lib/db';\\
import dbConnect from '../../../lib/db';
import Review from '@/app/models/review';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const totalRequests = await Review.countDocuments({});
      const approvedRequests = await Review.countDocuments({ status: 'approved' });
      const rejectedRequests = await Review.countDocuments({ status: 'rejected' });

      res.status(200).json({
        totalRequests,
        approvedRequests,
        rejectedRequests,
      });
    } catch (error) {
      console.error('Error fetching review request summary:', error);
      res.status(500).json({ message: 'Error fetching review request summary' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
