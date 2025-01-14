// pages/api/orders/latest.js
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await dbConnect(); // Ensure the connection is established with MongoDB

  try {
    // Fetch the latest order for a user (assuming you are querying for a logged-in user)
    const latestOrder = await Order.find()
      .sort({ orderDate: -1 })  // Sort orders by the latest order date
      .limit(1); // Limit to one order

    if (!latestOrder) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(latestOrder[0]); // Return the first (latest) order
  } catch (error) {
    console.error("Error fetching latest order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
