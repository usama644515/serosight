import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true, collection: "Products"} // Adds `createdAt` and `updatedAt` fields
);

// Use singular name `Product` for the model
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
