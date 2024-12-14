import mongoose from 'mongoose';

// Define the Cart Schema
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bundleName: { type: String, required: true }, // Store the bundle name
  items: { type: [mongoose.Schema.Types.Mixed], required: true },
  // items: [
  //   {
  //     testName: { type: String, required: true },
  //     price: { type: String, required: true },
  //     // quantity: { type: Number, default: 1 },
  //   },
  // ],
});

// Ensure that the cart is only created once for a user
CartSchema.index({ userId: 1 }, { unique: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
