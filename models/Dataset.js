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



// import mongoose from "mongoose";

// const DatasetSchema = new mongoose.Schema(
//   {
//     SelectedDesease: {
//       MMR: { type: String, enum: ["y", "n"], required: true },
//       Influenzas: { type: String, enum: ["y", "n"], required: true },
//       Covid: { type: String, enum: ["y", "n"], required: true },
//       RSA: { type: String, enum: ["y", "n"], required: true },
//     },
//     Background: {
//       Age: { type: Number, required: true },
//       Max: { type: Number, required: true },
//       Min: { type: Number, required: true },
//       Gender: {
//         Male: { type: String, enum: ["y", "n"], required: true },
//         Female: { type: String, enum: ["y", "n"], required: true },
//       },
//       Smoking: { type: String, enum: ["y", "n"], required: true },
//     },
//     Medication: {
//       Plaquanil: { type: String, enum: ["y", "n"], required: true },
//       Methotrexate: { type: String, enum: ["y", "n"], required: true },
//       Arava: { type: String, enum: ["y", "n"], required: true },
//       "tnf-alpha": { type: String, enum: ["y", "n"], required: true },
//       "jak-kinase inh": { type: String, enum: ["y", "n"], required: true },
//       "il-23 inh": { type: String, enum: ["y", "n"], required: true },
//       "il-17 inh": { type: String, enum: ["y", "n"], required: true },
//       cellcept: { type: String, enum: ["y", "n"], required: true },
//       cytoxan: { type: String, enum: ["y", "n"], required: true },
//       prednisone: { type: String, enum: ["y", "n"], required: true },
//       benlysta: { type: String, enum: ["y", "n"], required: true },
//       rituxan: { type: String, enum: ["y", "n"], required: true },
//     },
//     VaxStatus: {
//       Influenza: { type: String, enum: ["y", "n"], required: true },
//       covid19: { type: String, enum: ["y", "n"], required: true },
//       rsv: { type: String, enum: ["y", "n"], required: true },
//       varicella: { type: String, enum: ["y", "n"], required: true },
//       measles: { type: String, enum: ["y", "n"], required: true },
//       mumps: { type: String, enum: ["y", "n"], required: true },
//       rubella: { type: String, enum: ["y", "n"], required: true },
//       "hep a": { type: String, enum: ["y", "n"], required: true },
//       "hep b": { type: String, enum: ["y", "n"], required: true },
//     },
//     ActualInfection: {
//       Influenza: { type: String, enum: ["y", "n"], required: true },
//       covid19: { type: String, enum: ["y", "n"], required: true },
//       rsv: { type: String, enum: ["y", "n"], required: true },
//       varicella: { type: String, enum: ["y", "n"], required: true },
//       measles: { type: String, enum: ["y", "n"], required: true },
//       mumps: { type: String, enum: ["y", "n"], required: true },
//       rubella: { type: String, enum: ["y", "n"], required: true },
//       "hep a": { type: String, enum: ["y", "n"], required: true },
//       "hep b": { type: String, enum: ["y", "n"], required: true },
//       mononucleosis: { type: String, enum: ["y", "n"], required: true },
//       "west nile virus": { type: String, enum: ["y", "n"], required: true },
//     },
//     DiseaseStatus: {
//       Diabetes: { type: String, enum: ["y", "n"], required: true },
//       "Rheumatoid Arthritis": { type: String, enum: ["y", "n"], required: true },
//       "psoniatic arthritis": { type: String, enum: ["y", "n"], required: true },
//       lupus: { type: String, enum: ["y", "n"], required: true },
//       vasculitis: { type: String, enum: ["y", "n"], required: true },
//       sjogreens: { type: String, enum: ["y", "n"], required: true },
//       gout: { type: String, enum: ["y", "n"], required: true },
//       "CAD(heart disease)": { type: String, enum: ["y", "n"], required: true },
//       cancer: { type: String, enum: ["y", "n"], required: true },
//     },
//     SampleInfo: {
//       DateRange: {
//         Min: { type: String, required: true },
//         Max: { type: String, required: true },
//       },
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Dataset || mongoose.model("Dataset", DatasetSchema);
