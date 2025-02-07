import dbConnect from "../../lib/dbConnect";
import Append from "../../models/Append"; // Assuming the Append model is already created

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  try {
    // Parse the request body to get the unique names
    const { uniqueNames } = req.body;

    // Validate the input
    if (!uniqueNames || !Array.isArray(uniqueNames)) {
      return res.status(400).json({ message: "Invalid uniqueNames array" });
    }

    // Connect to the database
    await dbConnect();

    // Query the database to find documents matching the unique names
    const data = await Append.find({ Name: { $in: uniqueNames } });

    // Return the matching documents
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
