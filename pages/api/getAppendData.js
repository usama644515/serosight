import dbConnect from "../../lib/dbConnect";
import Append from "../../models/Append"; // Assuming you have the Append model

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { slide, block } = req.query;

  // Ensure both slide and block are provided and are strings
  if (!slide || !block || typeof slide !== "string" || typeof block !== "string") {
    return res.status(400).json({ message: "Both Slide and Block are required and must be strings" });
  }

  try {
    await dbConnect();

    // Query the Append collection for data where slide and block match (both are strings)
    const appendData = await Append.find({
      Slide: slide,
      Block: block,
    //   Name: 'Antigen1'
    });
    console.log(appendData.length);

    if (appendData.length === 0) {
      return res.status(404).json({ message: "No matching data found" });
    }

    return res.status(200).json(appendData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
