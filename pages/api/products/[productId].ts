import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Product from '@/app/models/product';
import { uploadToFirebase, deleteFromFirebase } from '../../../utils/firebase';
import formidable, { IncomingForm, File as FormidableFile } from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing to handle form data with formidable
  },
};

// Type guard to check if a value is a Formidable File
const isFormidableFile = (file: any): file is FormidableFile => {
  return file && typeof file === 'object' && 'filepath' in file;
};

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      // Configure the form with options
      uploadDir: path.join(process.cwd(), 'tmp'), // Temporary directory for file uploads
      keepExtensions: true, // Keep file extensions
    });

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

        if (isFormidableFile(files.image)) {
          const file: File = {
            lastModified: Date.now(),
            name: path.basename(files.image.filepath),
            webkitRelativePath: '',
            size: fs.statSync(files.image.filepath).size,
            type: '',
            slice: () => new Blob(),
            arrayBuffer: function (): Promise<ArrayBuffer> {
              throw new Error('Function not implemented.');
            },
            stream: function (): ReadableStream<Uint8Array> {
              throw new Error('Function not implemented.');
            },
            text: function (): Promise<string> {
              throw new Error('Function not implemented.');
            }
          };
          
          const imageUrl = await uploadToFirebase(file, oldImageUrl?.[0] ?? '');
        
          productUpdates.image = imageUrl;
        
          // Optionally delete the old image
          if (oldImageUrl && typeof oldImageUrl === 'string') {
            await deleteFromFirebase(oldImageUrl);
          }
        }

        const product = await Product.findByIdAndUpdate(productId, productUpdates, { new: true });

        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        // Remove temporary files if needed
        if (isFormidableFile(files.image) && fs.existsSync(files.image.filepath)) {
          fs.unlinkSync(files.image.filepath);
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
          await deleteFromFirebase(product.image);
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
