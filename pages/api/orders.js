// pages/api/orders.js
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const { userId } = req.query; // Get userId from query params
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
      }
      
      const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // Fetch orders
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ success: false, message: `Method ${method} not allowed.` });
  }
}
