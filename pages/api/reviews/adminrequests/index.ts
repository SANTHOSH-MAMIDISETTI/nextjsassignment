

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/db';
import Review from '@/app/models/review'; // Adjust path as needed
import Product from '@/app/models/product'; // Import the Product model

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      // Fetch all review requests
      const reviews = await Review.find({}, 'productId name description price imageUrl status disabled');

      // Fetch corresponding product details
      const detailedReviews = await Promise.all(
        reviews.map(async (review) => {
          const product = await Product.findById(review.productId);
          return {
            ...review._doc,
            productName: product?.name,
            productDescription: product?.description,
            productPrice: product?.price,
          };
        })
      );

      res.status(200).json(detailedReviews);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

export default handler;


