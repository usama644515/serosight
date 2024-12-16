import dbConnect from "../../lib/dbConnect";
import ShippingAddress from "../../models/ShippingAddress";

export default async function handler(req, res) {
  await dbConnect();
  
  // Check for the request method type
  try {
    if (req.method === "GET") {
      const { userId } = req.query; // Use req.query for GET
      if (!userId) return res.status(400).json({ error: "Missing userId" });

      // Fetch the shipping address from the database
      const shippingAddress = await ShippingAddress.findOne({ userId });
      if (!shippingAddress) return res.status(404).json({ error: "Shipping address not found" });
      return res.status(200).json({ shippingAddress });
    }

    if (req.method === "POST") {
      const { userId, shippingInfo } = req.body; // Use req.body for POST
      if (!userId || !shippingInfo) return res.status(400).json({ error: "Missing userId or shippingInfo" });

      // Check if a shipping address already exists for the user
      const existingShipping = await ShippingAddress.findOne({ userId });
      if (existingShipping) {
        // If it exists, update the shipping address
        Object.assign(existingShipping, shippingInfo);
        await existingShipping.save();
        return res.status(200).json({ message: "Shipping address updated" });
      }

      // If no shipping address exists, create a new one
      const newShippingAddress = new ShippingAddress({ userId, ...shippingInfo });
      await newShippingAddress.save();
      return res.status(201).json({ message: "Shipping address created" });
    }

    if (req.method === "DELETE") {
      const { userId } = req.body; // Use req.body for DELETE
      if (!userId) return res.status(400).json({ error: "Missing userId" });

      const shippingAddress = await ShippingAddress.findOneAndDelete({ userId });
      if (!shippingAddress) return res.status(404).json({ error: "Shipping address not found" });
      return res.status(200).json({ message: "Shipping address deleted" });
    }

    // If the method is not allowed
    return res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
