import dbConnect from "../../../../lib/dbConnect";
import Order from "../../../../models/Order";

export default async function handler(req, res) {
  const { userId } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      // Find orders by userId
      const orders = await Order.find({ userId });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
