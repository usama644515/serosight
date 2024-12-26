import dbConnect from "../../lib/dbConnect"; // Database connection utility
import Subscription from "../../models/Subscription"; // Subscription model

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection

  if (req.method === "GET") {
    try {
      console.log("GET request received");

      // Check if any document exists
      let subscription = await Subscription.findOne();

      // If no document exists, create a new one
      if (!subscription) {
        console.log("No subscription found, creating a new one...");

        // Create a new document (adjust price or other fields as required)
        subscription = new Subscription({
          price: ["100", "200", "300"], // Example prices
        });

        // Save the new document
        await subscription.save();
        console.log("New subscription created:", subscription);
      }

      // Return the subscription data
      res.status(200).json({
        subscriptionId: subscription._id,
        price: subscription.price,
      });
    } catch (error) {
      console.error("Error fetching or creating subscription:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
