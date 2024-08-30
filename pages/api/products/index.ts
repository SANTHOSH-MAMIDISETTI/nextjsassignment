

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Product from '@/app/models/product';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the database connection
  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Failed to connect to the database', error: (error as Error).message });
  }

  // Authenticate and authorize the user
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const user = verifyToken(token);

    // Handle requests based on the HTTP method
    switch (req.method) {
      case 'GET':
        try {
          const products = await Product.find({});
          res.status(200).json(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ message: 'Failed to fetch products', error: (error as Error).message });
        }
        break;

      case 'POST':
        try {
          const { name, price, description, imageUrl } = req.body;

          // Validate the incoming data
          if (!name || !price || !description || !imageUrl) {
            return res.status(400).json({ error: 'All fields are required' });
          }

          // Create a new product
          const newProduct = new Product({
            name,
            price,
            description,
            imageUrl,
            createdBy: user.id, // Automatically set the user ID
          });

          await newProduct.save();
          res.status(201).json(newProduct);
        } catch (error) {
          console.error('Error creating product:', error);
          res.status(500).json({ message: 'Failed to create product', error: (error as Error).message });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized access', error: (error as Error).message });
  }
}
