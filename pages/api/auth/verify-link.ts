import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
// import User from '../../../models/User';
import User from '@/app/models/user';
import { connectToDatabase } from '../../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as any;
    await connectToDatabase();
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid link' });
    }

    // Here you can generate a session or another JWT for the user to authenticate

    res.status(200).json({ message: 'Link verified', user });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired link' });
  }
}
