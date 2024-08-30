import mongoose from 'mongoose';
import { IUser } from '@/app/models/user'
// import User from './models/User';
import User from '@/app/models/user';
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Use global variable to cache the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // Return cached connection if it exists
    return cached.conn;
  }


if (!cached.promise) {
  const opts = {
    bufferCommands: false,
  };

  cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    return mongoose;
  });
}
cached.conn = await cached.promise;
return cached.conn;
}
export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    // Ensure to use `findById` or `findOne` with proper casting
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

export default dbConnect;
