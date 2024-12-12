import mongoose from "mongoose";

const BillingDetailsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  nameOnCard: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  cvv: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.BillingDetails || mongoose.model("BillingDetails", BillingDetailsSchema);
