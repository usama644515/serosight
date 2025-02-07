import mongoose from "mongoose";

const patientDataSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,
  background: String,
  age: Number,
  gender: String,
  smokingStatus: String,
  medications: [String],
  vaxStatus: {
    covid19: Boolean,
    pertussis: Boolean,
    rsv: Boolean,
    varicella: Boolean,
    measles: Boolean,
    mumps: Boolean,
    rubella: Boolean,
    hepA: Boolean,
    hepB: Boolean,
    influenza: Boolean,
  },
  actualInfection: {
    covid19: Boolean,
    influenza: Boolean,
    rsv: Boolean,
    varicella: Boolean,
    measles: Boolean,
    mumps: Boolean,
    rubella: Boolean,
    hepA: Boolean,
    hepB: Boolean,
    mononucleosis: Boolean,
    h1n5Avian: Boolean,
    westNileVirus: Boolean,
    diabetes: Boolean,
  },
  diseaseStatus: {
    rheumatoidArthritis: Boolean,
    psoriaticArthritis: Boolean,
    ankylosingSpondylitis: Boolean,
    lupus: Boolean,
    vasculitis: Boolean,
    sjogrens: Boolean,
    gout: Boolean,
    cadHeartDisease: Boolean,
    cancer: Boolean,
  },
  sampleInfo: {
    slide: String,
    block: Number,
    date: String,
  },
});

export default mongoose.models.PatientData ||
  mongoose.model("PatientData", patientDataSchema);
