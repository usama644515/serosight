// Immunization.js (model)
import mongoose from 'mongoose';

const ImmunizationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  vaccineData: [
    {
      name: { type: String, required: true },
      status: { type: String, required: true },
      date: { type: String, required: true },
    },
  ],
  smokingHistory: {
    doYouSmoke: { type: String, required: true },
    frequency: { type: String, required: false },
  },
  medicationHistory: {
    name: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
  },
});

ImmunizationSchema.index({ userId: 1 });

const Immunization = mongoose.models.Immunization || mongoose.model('Immunization', ImmunizationSchema);

export default Immunization;
