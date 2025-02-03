import dbConnect from "../../../lib/dbConnect";
import Dataset from "../../../models/Dataset";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const {
        SelectedDesease,
        Background,
        Medication,
        VaxStatus,
        ActualInfection,
        DiseaseStatus,
        SampleInfo,
      } = req.body;

      const newDataset = new Dataset({
        SelectedDesease,
        Background,
        Medication,
        VaxStatus,
        ActualInfection,
        DiseaseStatus,
        SampleInfo,
      });

      await newDataset.save();
      res.status(201).json({ message: "Dataset created successfully", data: newDataset });
    } catch (error) {
      res.status(500).json({ error: "Failed to create dataset", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
