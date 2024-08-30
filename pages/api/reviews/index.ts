// import dbConnect from '../../../lib/db'; // Adjust path to your DB connection utility
// import Product from '@/app/models/product';
// import { NextApiRequest, NextApiResponse } from 'next';
// // import Product from '../../../models/Product'; // Adjust path to your Product model

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   const { product_id } = req.query;

//   if (req.method === 'POST') {
//     try {
//       const { requestId, status } = req.body;

//       if (!['approved', 'rejected'].includes(status)) {
//         return res.status(400).json({ message: 'Invalid status' });
//       }

//       const updatedProduct = await Product.findOneAndUpdate(
//         { _id: product_id, 'changeRequests._id': requestId },
//         { $set: { 'changeRequests.$.status': status } },
//         { new: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product or change request not found' });
//       }

//       if (status === 'approved') {
//         // Apply the approved changes to the product
//         const changeRequest = updatedProduct.changeRequests.id(requestId);
//         await Product.findByIdAndUpdate(product_id, {
//           $set: {
//             title: changeRequest.title,
//             description: changeRequest.description,
//             images: changeRequest.images,
//             price: changeRequest.price,
//           },
//           $pull: { changeRequests: { _id: requestId } }
//         });
//       } else if (status === 'rejected') {
//         // Simply remove the change request
//         await Product.findByIdAndUpdate(product_id, {
//           $pull: { changeRequests: { _id: requestId } }
//         });
//       }

//       res.status(200).json({ message: 'Change request status updated' });
//     } catch (error) {
//       console.error('Error updating change request status:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../lib/db'; // Adjust path as needed
// import Review from '@/app/models/review';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   switch (req.method) {
//     case 'POST':
//       try {
//         const { productId, name, imageUrl, createdBy, status } = req.body;
//         const review = new Review({ productId, name, imageUrl, createdBy, status });
//         await review.save();
//         res.status(201).json(review);
//       } catch (error) {
//         res.status(500).json({ message: 'Error submitting review' });
//       }
//       break;
//     case 'GET':
//       // For getting all reviews for the team member's submissions
//       try {
//         const reviews = await Review.find({ createdBy: req.query.userId });
//         res.status(200).json(reviews);
//       } catch (error) {
//         res.status(500).json({ message: 'Error fetching reviews' });
//       }
//       break;
//     default:
//       res.setHeader('Allow', ['POST', 'GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../lib/db'; // Adjust path as needed
// import Review from '@/app/models/review';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   switch (req.method) {
//     case 'POST':
//   try {
//     // Destructure fields from request body
//     const { name, description, price, imageUrl } = req.body;

//     // Validate required fields
//     if (!name || !description || !price) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create and save new review
//     const review = new Review({
//       productId: req.query.productId, // Automatically set or derived from URL
//       name,
//       description,
//       price,
//       imageUrl,
//       createdBy: req.user.id, // Automatically set based on user context
//       status: 'pending', // Automatically set
//     });

//     await review.save();
//     res.status(201).json(review);
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     res.status(500).json({ message: 'Error submitting review' });
//   }
//   break;
//     // case 'POST':
//     //   try {
//     //     // Destructure fields from request body
//     //     const { productId, name, description, price, imageUrl, createdBy, status } = req.body;

//     //     // Validate required fields
//     //     if (!productId || !name || !description || !price || !createdBy || !status) {
//     //       return res.status(400).json({ message: 'Missing required fields' });
//     //     }

//     //     // Create and save new review
//     //     const review = new Review({
//     //       productId,
//     //       name,
//     //       description,
//     //       price,
//     //       imageUrl,
//     //       createdBy,
//     //       status,
//     //     });

//     //     await review.save();
//     //     res.status(201).json(review);
//     //   } catch (error) {
//     //     console.error('Error submitting review:', error);
//     //     res.status(500).json({ message: 'Error submitting review' });
//     //   }
//     //   break;

//     case 'GET':
//       try {
//         // Retrieve reviews based on query parameter
//         const { userId } = req.query;

//         if (typeof userId !== 'string') {
//           return res.status(400).json({ message: 'Invalid user ID' });
//         }

//         const reviews = await Review.find({ createdBy: userId });
//         res.status(200).json(reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Error fetching reviews' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['POST', 'GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }








import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db'; // Adjust path as needed
import Review from '@/app/models/review';
import { authMiddleware } from '../../../lib/middleware';
// import { authenticate } from '../../../lib/authenticate';
 // Adjust path as needed

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const { productId, name, description, price, imageUrl } = req.body;

        if (!productId || !name || !description || !price) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const review = new Review({
          productId,
          name,
          description,
          price,
          imageUrl,
          createdBy: (req as any).user.id, // Ensure req.user.id is available
          status: 'pending',
        });

        await review.save();
        res.status(201).json(review);
      } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Error submitting review' });
      }
      break;


    case 'GET':
      try {
        const { userId } = req.query;

        if (typeof userId !== 'string') {
          return res.status(400).json({ message: 'Invalid user ID' });
        }

        const reviews = await Review.find({ createdBy: userId });
        res.status(200).json(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Apply middleware
export default authMiddleware(handler);

