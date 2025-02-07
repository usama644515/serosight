import connectDb from "../../lib/dbConnect";
import PatientData from "../../models/PatientData";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDb();

      const {
        patientId,
        patientName,
        background,
        age,
        gender,
        smokingStatus,
        medications,
        vaxStatus,
        actualInfection,
        diseaseStatus,
        sampleInfo,
      } = req.body;

      const newPatientData = new PatientData({
        patientId,
        patientName,
        background,
        age,
        gender,
        smokingStatus,
        medications,
        vaxStatus,
        actualInfection,
        diseaseStatus,
        sampleInfo,
      });

      const savedPatientData = await newPatientData.save();

      res.status(201).json(savedPatientData);
    } catch (error) {
      res.status(500).json({ error: "Failed to save patient data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
