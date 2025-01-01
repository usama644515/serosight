import dbConnect from "../../../lib/dbConnect";
import Dataset from "../../../models/Dataset";

// Handle requests for a specific dataset based on the id
export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  const { id } = req.query; // For operations requiring a dataset ID

  if (req.method === "GET") {
    // Handle GET requests (fetch a single dataset by ID)
    try {
      const dataset = await Dataset.findById(id);
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      res.status(200).json(dataset);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dataset" });
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
  } else if (req.method === "DELETE") {
    // Handle DELETE requests to remove a dataset by ID
    try {
      if (!id) {
        return res.status(400).json({ error: "Dataset ID is required for deletion" });
      }
      const deletedDataset = await Dataset.findByIdAndDelete(id);
      if (!deletedDataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      res.status(200).json({ message: "Dataset deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete dataset" });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
