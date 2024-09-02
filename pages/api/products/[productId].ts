


import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Product from '@/app/models/product';
import { uploadToFirebase} from '../../../utils/firebase';
// import deletehandler from '../../../utils/firebasedelete';
import { deletehandler } from '../../../utils/firebasedelete';
 // Assuming deleteFromFirebase now exists
import formidable, { IncomingForm, File, Fields, Files } from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing to handle form data with formidable
  },
};

// Function to parse form data using formidable
const parseForm = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'tmp'); // Temporary directory for file uploads
    form.keepExtensions = true; // Keep file extensions

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;

  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Failed to connect to the database', error: (error as Error).message });
  }

  switch (req.method) {
    case 'GET':
      try {
        if (typeof productId !== 'string') {
          return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Failed to fetch product', error: (error as Error).message });
      }

    // case 'PUT':
    //   try {
    //     const { fields, files } = await parseForm(req);
    //     const { name, price, description, oldImageUrl } = fields;

    //     if (typeof productId !== 'string') {
    //       return res.status(400).json({ message: 'Invalid product ID' });
    //     }

    //     const productUpdates: { [key: string]: any } = {
    //       name: name?.toString(),
    //       price: parseFloat(price?.toString() || '0'),
    //       description: description?.toString(),
    //     };

    //     if (files.image) {
    //       // Attempt to delete the old image first
    //       if (oldImageUrl) {
    //         try {
    //           await deletehandler(oldImageUrl.toString());
    //         } catch (deleteError) {
    //           console.error('Error deleting old image:', deleteError);
    //           return res.status(500).json({ message: 'Failed to delete old image. New image not uploaded.' });
    //         }
    //       }

    //       // Only upload the new image if the old image deletion was successful
    //       const imageUrl = await uploadToFirebase(files.image as File);
    //       productUpdates.image = imageUrl;
    //     }

    //     const product = await Product.findByIdAndUpdate(productId, productUpdates, { new: true });

    //     if (!product) {
    //       return res.status(404).json({ message: 'Product not found' });
    //     }

    //     // Remove temporary files if needed
    //     if (files.image && fs.existsSync((files.image as File).filepath)) {
    //       fs.unlinkSync((files.image as File).filepath);
    //     }

    //     return res.status(200).json(product);
    //   } catch (error) {
    //     console.error('Error updating product:', error);
    //     return res.status(500).json({ message: 'Failed to update product', error: (error as Error).message });
    //   }
    case 'PUT':
      try {
        const { fields, files } = await parseForm(req);
        const { name, price, description, oldImageUrl } = fields;
  
        if (typeof productId !== 'string') {
          return res.status(400).json({ message: 'Invalid product ID' });
        }
  
        const productUpdates: { [key: string]: any } = {
          name: name?.toString(),
          price: parseFloat(price?.toString() || '0'),
          description: description?.toString(),
        };
  
        if (files.image) {
          // Delete the old image first, if it exists
          if (oldImageUrl && oldImageUrl.toString().trim() !== '') {
            try {
              await deletehandler(oldImageUrl.toString());
            } catch (deleteError) {
              console.error('Error deleting old image:', deleteError);
              return res.status(500).json({ message: 'Failed to delete old image. New image not uploaded.' });
            }
          }
  
          // Upload the new image
          const newImageUrl = await uploadToFirebase(files.image as File);
          productUpdates.image = newImageUrl;
        }
  
        const product = await Product.findByIdAndUpdate(productId, productUpdates, { new: true });
  
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        // Remove temporary files if needed
        if (files.image && fs.existsSync((files.image as File).filepath)) {
          fs.unlinkSync((files.image as File).filepath);
        }
  
        return res.status(200).json(product);
      } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Failed to update product', error: (error as Error).message });
      }

    case 'DELETE':
      try {
        if (typeof productId !== 'string') {
          return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Find and delete the product by ID
        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the image from Firebase if it exists
        if (product.image) {
          await deletehandler(product.image);
        }

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Failed to delete product', error: (error as Error).message });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
