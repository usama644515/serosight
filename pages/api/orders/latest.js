import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await dbConnect(); // Ensure the connection is established with MongoDB

  const { method, query } = req;

  if (method !== "GET") {
    return res
      .setHeader("Allow", ["GET"])
      .status(405)
      .json({ message: `Method ${method} not allowed` });
  }

  try {
    const { userId, orderId } = query;

    // If `orderId` is provided, fetch the specific order
    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    }

    // If `userId` is provided, fetch the latest order for the specified user
    if (userId) {
      const latestOrder = await Order.find({ userId })
        .sort({ orderDate: -1 }) // Sort orders by the latest order date
        .limit(1); // Limit to one order

      if (!latestOrder || latestOrder.length === 0) {
        return res.status(404).json({ message: "No orders found for the specified user" });
      }

      return res.status(200).json(latestOrder[0]); // Return the first (latest) order
    }

    // If neither `userId` nor `orderId` is provided, return a bad request error
    return res.status(400).json({ message: "Missing userId or orderId parameter" });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
