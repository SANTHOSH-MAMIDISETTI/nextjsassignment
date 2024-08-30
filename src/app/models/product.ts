//  default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
// import mongoose, { Document, Schema } from 'mongoose';

// interface IProduct extends Document {
//   name: string;
//   price: number;
//   description: string;
//   // createdBy?: mongoose.Types.ObjectId; // Optional for product creation
// }

// const ProductSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   // createdBy: { type: mongoose.Types.ObjectId, ref: 'User' } // Optional
// });

// const Product = mongoose.model<IProduct>('Product', ProductSchema);

// export default Product;

// src/app/models/product.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  createdBy: mongoose.Types.ObjectId;
  
   // Optional for image URL
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // Optional for image URL
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
  // createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // New field
});

// Check if the model already exists
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

