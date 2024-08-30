// import type { NextApiRequest, NextApiResponse } from 'next';
// // import dbConnect from '../../../lib/db';\
// import dbConnect from '../../../../lib/db';
// // Adjust path as needed
// import Review from '@/app/models/review';

// import { authMiddleware } from '../../../../lib/middleware';
//  // Adjust path as needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   switch (req.method) {
//     case 'GET':
//       try {
//         // Fetch reviews from the database
//         const reviews = await Review.find().sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Error fetching reviews' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// // Apply middleware
// export default  authMiddleware(handler);




// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db'; // Adjust path as needed
// import Review from '@/app/models/review';
// import Product from '@/app/models/product'; // Import the Product model
// import { authMiddleware } from '../../../../lib/middleware'; // Adjust path as needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   switch (req.method) {
//     case 'GET':
//       try {
//         const reviews = await Review.find().sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Error fetching reviews' });
//       }
//       break;

//     case 'PATCH':
//       try {
//         const { reviewId } = req.query;
//         const { action } = req.body;

//         if (!['approve', 'reject'].includes(action)) {
//           return res.status(400).json({ message: 'Invalid action' });
//         }

//         const review = await Review.findById(reviewId);
//         if (!review) {
//           return res.status(404).json({ message: 'Review not found' });
//         }

//         review.status = action === 'approve' ? 'approved' : 'rejected';

//         if (action === 'approve') {
//           // Update the associated product with the review data
//           await Product.findByIdAndUpdate(review.productId, {
//             name: review.name,
//             description: review.description,
//             price: review.price,
//             imageUrl: review.imageUrl,
//           });
//         }

//         await review.save();

//         res.status(200).json({ message: `Review ${action}d successfully` });
//       } catch (error) {
//         console.error('Error updating review:', error);
//         res.status(500).json({ message: 'Error updating review' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'PATCH']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// // Apply middleware
// export default authMiddleware(handler);



// pages/api/reviews/adminrequests/[id].ts

// pages/api/reviews/adminrequests/[id].ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db'; // Adjust path as needed
// import Review from '@/app/models/review';
// import { authMiddleware } from '../../../../lib/middleware'; // Adjust path as needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();
//   const { id } = req.query;
  
//   switch (req.method) {
//     case 'PUT':
//       try {
//         const { name, description, price, imageUrl, status } = req.body;

//         const updatedReview = await Review.findByIdAndUpdate(
//           id,
//           { name, description, price, imageUrl, status }, // Update fields
//           { new: true } // Return the updated document
//         );

//         if (!updatedReview) {
//           return res.status(404).json({ message: 'Review not found' });
//         }

//         res.status(200).json(updatedReview);
//       } catch (error) {
//         console.error('Error updating review:', error);
//         res.status(500).json({ message: 'Error updating review' });
//       }
//       break;

//     case 'GET':
//       try {
//         const reviews = await Review.find().sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Error fetching reviews' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'PUT']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default authMiddleware(handler);

// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db'; // Adjust path as needed
// import Review from '@/app/models/review'; // Adjust path as needed
// import { authMiddleware } from '../../../../lib/middleware'; // Adjust path as needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   const { id } = req.query;
  
//   switch (req.method) {
//     case 'PUT':
//       try {
//         const { name, description, price, imageUrl, status } = req.body;

//         const updatedReview = await Review.findByIdAndUpdate(
//           id,
//           { name, description, price, imageUrl, status }, // Update fields
//           { new: true, runValidators: true } // Return the updated document and run validators
//         );

//         if (!updatedReview) {
//           return res.status(404).json({ message: 'Review not found' });
//         }

//         res.status(200).json(updatedReview);
//       } catch (error) {
//         console.error('Error updating review:', error);
//         res.status(500).json({ message: 'Error updating review' });
//       }
//       break;

//     case 'GET':
//       try {
//         const reviews = await Review.find().sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Error fetching reviews' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'PUT']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default authMiddleware(handler);


// /api/reviews/adminrequests/[id].ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db';
// import Review from '@/app/models/review'; // Adjust path as needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   const { id } = req.query;

//   if (typeof id !== 'string') {
//     return res.status(400).json({ message: 'Invalid ID' });
//   }

//   try {
//     if (req.method === 'PUT') {
//       const { status, name, description, price, imageUrl } = req.body;

//       // Find and update the review
//       const updatedReview = await Review.findByIdAndUpdate(
//         id,
//         { status, name, description, price, imageUrl },
//         { new: true, runValidators: true } // Ensure validation
//       );

//       if (!updatedReview) {
//         return res.status(404).json({ message: 'Review not found' });
//       }

//       res.status(200).json(updatedReview);
//     } else {
//       res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('Error updating review:', error);
//     res.status(500).json({ message: 'Error updating review', error });
//   }
// };

// export default handler;


// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db';
// import Review from '@/app/models/review'; // Adjust path as needed
// import Product from '@/app/models/product'; // Adjust path as needed

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   const { id } = req.query;

//   if (typeof id !== 'string') {
//     return res.status(400).json({ message: 'Invalid ID' });
//   }

//   try {
//     if (req.method === 'PUT') {
//       const { status, name, description, price, imageUrl } = req.body;
      
//       if (status === 'approved') {
//         // Update the review
//         const updatedReview = await Review.findByIdAndUpdate(
//           id,
//           { status, name, description, price, imageUrl },
//           { new: true, runValidators: true }
//         );

//         if (!updatedReview) {
//           return res.status(404).json({ message: 'Review not found' });
//         }

//         // Update the corresponding product
//         const updatedProduct = await Product.findByIdAndUpdate(
//           updatedReview.productId,
//           { name, description, price, imageUrl },
//           { new: true, runValidators: true }
//         );

//         if (!updatedProduct) {
//           return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ review: updatedReview, product: updatedProduct });
//       } else {
//         // If the status is not 'approved', just update the review
//         const updatedReview = await Review.findByIdAndUpdate(
//           id,
//           { status },
//           { new: true, runValidators: true }
//         );

//         if (!updatedReview) {
//           return res.status(404).json({ message: 'Review not found' });
//         }

//         res.status(200).json(updatedReview);
//       }
//     } else {
//       res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('Error updating review:', error);
//     res.status(500).json({ message: 'Error updating review' });
//   }
// };

// export default handler;





import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/db';
import Review from '@/app/models/review'; // Adjust path as needed
import Product from '@/app/models/product'; // Import the Product model

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    if (req.method === 'PUT') {
      const { status, name, description, price, imageUrl } = req.body;

      // Find the review by ID
      const review = await Review.findById(id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // If the review is already processed, prevent further updates
      if (review.disabled) {
        return res.status(400).json({ message: 'This review has already been processed' });
      }

      if (status === 'approved') {
        // Update the review with the new data and set it as disabled
        const updatedReview = await Review.findByIdAndUpdate(
          id,
          { status, name, description, price, imageUrl, disabled: true },
          { new: true, runValidators: true }
        );

        // Update the associated product with the new data
        const updatedProduct = await Product.findByIdAndUpdate(
          review.productId,
          { name, description, price, imageUrl },
          { new: true, runValidators: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ review: updatedReview, product: updatedProduct });
      } else if (status === 'rejected') {
        // If status is 'rejected', only update the review status and set it as disabled
        const updatedReview = await Review.findByIdAndUpdate(
          id,
          { status, disabled: true }, // Only update the status and disable the review
          { new: true, runValidators: true }
        );

        return res.status(200).json({ review: updatedReview });
      }

      return res.status(400).json({ message: 'Invalid status' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

export default handler;



// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../../../lib/db';
// import Review from '@/app/models/review'; // Adjust path as needed
// import Product from '@/app/models/product'; // Import the Product model

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await dbConnect();

//   const { id } = req.query;

//   if (typeof id !== 'string') {
//     return res.status(400).json({ message: 'Invalid ID' });
//   }

//   try {
//     if (req.method === 'PUT') {
//       const { status, name, description, price, imageUrl } = req.body;

//       // Find the review by ID
//       const review = await Review.findById(id);
//       if (!review) {
//         return res.status(404).json({ message: 'Review not found' });
//       }

//       // If the review is already processed, prevent further updates
//       if (review.disabled) {
//         return res.status(400).json({ message: 'This review has already been processed' });
//       }

//       if (status === 'approved') {
//         // Update the review with the new data and set it as disabled
//         const updatedReview = await Review.findByIdAndUpdate(
//           id,
//           { status, name, description, price, imageUrl, disabled: true },
//           { new: true, runValidators: true }
//         );

//         // Update the associated product with the new data
//         const updatedProduct = await Product.findByIdAndUpdate(
//           review.productId,
//           { name, description, price, imageUrl },
//           { new: true, runValidators: true }
//         );

//         if (!updatedProduct) {
//           return res.status(404).json({ message: 'Product not found' });
//         }

//         return res.status(200).json({ review: updatedReview, product: updatedProduct });
//       } else if (status === 'rejected') {
//         // If status is 'rejected', only update the review status and set it as disabled
//         const updatedReview = await Review.findByIdAndUpdate(
//           id,
//           { status, disabled: true }, // Only update the status and disable the review
//           { new: true, runValidators: true }
//         );

//         return res.status(200).json({ review: updatedReview });
//       }

//       return res.status(400).json({ message: 'Invalid status' });
//     } else {
//       res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('Error updating review:', error);
//     res.status(500).json({ message: 'Error updating review' });
//   }
// };

// export default handler;

