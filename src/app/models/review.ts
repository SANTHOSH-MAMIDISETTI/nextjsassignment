
// import mongoose, { Schema, Document } from 'mongoose';

// interface IReview extends Document {
//   productId: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   status: string;
// }

// const ReviewSchema: Schema = new Schema({
//   productId: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: false },
//   price: { type: Number, required: false },
//   imageUrl: { type: String, required: false },
//   status: { type: String, required: true },
// });

// export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Review schema
interface IReview extends Document {
  productId: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  status: string;

}

// Create the Review schema
const ReviewSchema: Schema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: false },
  imageUrl: { type: String, required: false },
  status: { type: String, required: true },
});

// Export the Review model, creating it if it doesn't already exist
export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
