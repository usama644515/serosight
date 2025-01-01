import dbConnect from "../../../lib/dbConnect";
import Dataset from "../../../models/Dataset";

export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  const { id } = req.query; // For operations requiring a dataset ID

  if (req.method === "GET") {
    // Handle GET requests
    try {
      const datasets = await Dataset.find();
      res.status(200).json(datasets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch datasets" });
    }
  }else if (req.method === "POST") {
    try {
      const { name, criteria } = req.body;
      console.log("Received criteria:", criteria);  // Log the incoming criteria
      const newDataset = new Dataset({ name, criteria });
      await newDataset.save();
      res.status(201).json(newDataset);
    } catch (error) {
      res.status(500).json({ error: "Failed to save dataset", details: error.message });
    }
  }
  else if (req.method === "DELETE") {
    // Handle DELETE requests
    try {
      if (!id) {
        return res.status(400).json({ error: "Dataset ID is required for deletion" });
      }
      await Dataset.findByIdAndDelete(id);
      res.status(200).json({ message: "Dataset deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete dataset" });
    }
  } else if (req.method === "PUT") {
    // Handle PUT requests to update only the dataset name
    try {
      if (!id) {
        return res.status(400).json({ error: "Dataset ID is required for updating" });
      }
  
      const { name } = req.body; // Only expect the name from the body
      const updatedDataset = await Dataset.findByIdAndUpdate(
        id,
        { name }, // Only update the name field
        { new: true } // Return the updated dataset
      );
  
      if (!updatedDataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
  
      res.status(200).json(updatedDataset);
    } catch (error) {
      res.status(500).json({ error: "Failed to update dataset" });
    }
  }
   else {
    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
