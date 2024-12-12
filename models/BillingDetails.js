import mongoose from "mongoose";

// Define the BillingDetails schema
const billingDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Assuming you have a User model
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryMonth: {
    type: String,
    required: true,
  },
  expiryYear: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

// Create the model
const BillingDetails = mongoose.models.BillingDetails || mongoose.model("BillingDetails", billingDetailsSchema);

export default BillingDetails;
