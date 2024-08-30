import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: 'admin' | 'team member';
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'team member'], required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.User || model<IUser>('User', userSchema);
