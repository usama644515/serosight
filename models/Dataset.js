import mongoose from "mongoose";

const DatasetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    criteria: {
      type: mongoose.Schema.Types.Mixed, // Allows storing objects and arrays
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Dataset || mongoose.model("Dataset", DatasetSchema);
