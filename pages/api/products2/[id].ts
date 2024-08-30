import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db'; // Adjust path as needed
// import Product from '../../../models/Product'; // Adjust path as needed
import Product from '@/app/models/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;
    // Implement PUT method if you want to allow admin updates directly
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
