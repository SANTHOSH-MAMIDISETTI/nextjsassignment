// // import dbConnect from '@/app/lib/dbConnect';
// import dbConnect from '../../../lib/db';
// import { getSession } from 'next-auth/react';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Check if the user is authenticated
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Connect to the database
//   await dbConnect();
  
//   try {
//     const { method } = req;
//     const userId = session.user.id;
//     const Review = mongoose.model('Review'); // Assuming you have a `Review` model defined

//     if (method === 'GET') {
//       // Fetch requests that are either approved or rejected and haven't been seen by the user
//       const requests = await Review.find({
//         userId: userId,
//         status: { $in: ['approved', 'rejected'] },
//         seenByUser: { $ne: true },
//       }).exec();

//       res.status(200).json(requests);
//     } else if (method === 'PUT') {
//       // Mark all the approved or rejected requests as seen by the user
//       await Review.updateMany(
//         { userId: userId, status: { $in: ['approved', 'rejected'] } },
//         { $set: { seenByUser: true } }
//       );

//       res.status(200).json({ message: 'Marked as seen' });
//     } else {
//       // Method not allowed
//       res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
