import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";

export default async function handler(req, res) {
  // Establish database connection
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Fetch all products from MongoDB collection
      const products = await Product.find({});
      res.status(200).json(products); // Send products as JSON response
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products", message: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
