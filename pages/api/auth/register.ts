
// import type { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import User from '@/app/models/user'; // Ensure this path is correct
// import dbconnect from '../../../lib/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { email, password, role, name, phoneNumber } = req.body;
//   if (!email || !password || !role || !name || !phoneNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     await dbconnect();
//   } catch (error) {
//     console.error('Database connection error:', error);
//     return res.status(500).json({ message: 'Database connection failed' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ email, password: hashedPassword, role, name, phoneNumber });

//   try {
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     res.status(500).json({ message: 'User registration failed' });
//   }
// }
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/app/models/user'; // Ensure this path is correct
import dbconnect from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, role, name, phoneNumber } = req.body;
  
  // Validate required fields
  if (!email || !password || !role || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate password length (6-8 characters)
  if (password.length < 6 || password.length > 9) {
    return res.status(400).json({ message: 'Password must be 6-9 characters long' });
  }

  // Validate phone number length (10 digits)
  if (phoneNumber.length !== 10) {
    return res.status(400).json({ message: 'Phone number must be 10 digits long' });
  }

  try {
    await dbconnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ message: 'Database connection failed' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role, name, phoneNumber });

  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'User registration failed' });
  }
}
