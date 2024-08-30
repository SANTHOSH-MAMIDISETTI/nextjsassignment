import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
// import User from '../../../models/User';
import User from '@/app/models/user';
import  dbconnect from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, role, name, phoneNumber  } = req.body;
  if (!email || !password || !role || !name || !phoneNumber) return res.status(400).json({ message: 'All fields are required' });

  await dbconnect();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role, name, phoneNumber });

  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'User registration failed' });
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import User from '@/app/models/user';
// // import { dbconnect} from '../../../lib/db';
// import { connectToDatabase } from '../../../lib/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { email, password, role, name, phoneNumber } = req.body;
//   if (!email || !password || !role || !name || !phoneNumber) return res.status(400).json({ message: 'All fields are required' });

//   await connectToDatabase();

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword, role, name, phoneNumber });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'User registration failed', error: error.message });
//   }
// }
