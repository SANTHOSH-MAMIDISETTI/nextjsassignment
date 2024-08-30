import type { NextApiRequest, NextApiResponse } from 'next';
import { sign, verify } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dbConnect from '../../../lib/db';
// import User from '../../../models/User';
import User from '@/app/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Secret for JWT

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expiry time
      );

      // Send email with reset link (use a real SMTP service)
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Reset link sent' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
