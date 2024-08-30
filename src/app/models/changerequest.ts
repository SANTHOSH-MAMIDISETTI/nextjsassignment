import mongoose, { Schema, Document } from 'mongoose';

// Define the ChangeRequest interface
interface IChangeRequest extends Document {
  productId: mongoose.Types.ObjectId;
  suggestedChanges: {
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdBy: mongoose.Types.ObjectId;
}

// Define the ChangeRequest schema
const ChangeRequestSchema: Schema = new Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  suggestedChanges: {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

// Check if the model already exists
const ChangeRequest = mongoose.models.ChangeRequest || mongoose.model<IChangeRequest>('ChangeRequest', ChangeRequestSchema);

export default ChangeRequest;
