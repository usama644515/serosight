// models/orderSchema.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["order placed", "kit sent", "kit received", "test completed"],
      default: "order placed",
    },
    orderDate: { type: Date, default: Date.now },
    paymentType: {
      type: String,
      enum: ["credit card", "paypal", "bank transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderKey: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    test: { type: Boolean, default: false },
    cartItems: [
      {
        testName: { type: String, required: true },
      },
    ],
    shippingDetails: {
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
