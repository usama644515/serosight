import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    testId: String,
    userId: String,
    orderId: String,
    purchaseDate: Date,
    itemName: String,
    reportStatus: String,
    results: String,
  },
  { collection: "Test" } // Explicitly set collection name
);

export default mongoose.models.Test || mongoose.model("Test", TestSchema);
