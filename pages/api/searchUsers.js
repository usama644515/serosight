import dbConnect from "../../lib/dbConnect";
import PatientData from "../../models/PatientData";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { query } = req.query; // Extract the search query from the request

  try {
    await dbConnect();

    // Search for patients based on the query
    const patients = await PatientData.find({
      $or: [
        { patientId: { $regex: query, $options: "i" } },
        { patientName: { $regex: query, $options: "i" } },
        { background: { $regex: query, $options: "i" } },
        { "sampleInfo.slide": { $regex: query, $options: "i" } }, // Search by slide in sampleInfo
        { "sampleInfo.date": { $regex: query, $options: "i" } },  // Search by date in sampleInfo
      ],
    }).select("patientId patientName background age gender sampleInfo");

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
