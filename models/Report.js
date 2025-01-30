import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    reportId: { type: String, required: true },
    userId: { type: String, required: true },
    reportDate: { type: Date, required: true },
    diseaseName: { type: String, required: true },
    reportedBy: { type: String, required: true },
    immunityLevel: { type: Number, required: true }, // Store immunity level as a numeric value (e.g., 1-100)
    immunityResult: { type: String, required: true }, // e.g., "Positive", "Negative"
    age: { type: Number, required: true }, // Add age for grouping or comparison
    gender: { type: String, required: true }, // e.g., "Male", "Female", "Other"
    location: { type: String, required: true }, // Add location for regional analysis
  },
  { collection: "Report" } // Explicitly set collection name
);

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
