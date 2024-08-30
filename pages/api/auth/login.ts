import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbconnect from '../../../lib/db';
// import { connectToDatabase } from '@/lib/db'; // Adjust with your actual path
import UserModel from '@/app/models/user';
// import { UserModel } from '@/models/User'; // Adjust with your actual path

interface LoginRequestBody {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password }: LoginRequestBody = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Connect to the database
      const db = await dbconnect ();

      // Find the user by email
      const user = await UserModel.findOne({ email }).exec();

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id.toString(), role: user.role, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      // Return user info and token
      res.status(200).json({
        user: {
          id: user._id.toString(),
          role: user.role,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
