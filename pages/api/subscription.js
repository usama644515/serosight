// pages/api/subscription.js
import dbConnect from "../../lib/dbConnect";
import Subscription from "../../models/UserSubscription";

export default async function handler(req, res) {
  await dbConnect();

  // Handle GET requests to fetch the subscription
  if (req.method === "GET") {
    try {
      const subscriptions = await Subscription.find();
      res.status(200).json(subscriptions);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } 
  // Handle POST requests to create a new subscription
  else if (req.method === "POST") {
    const { userId, startDate, endDate, numberOfTests } = req.body;

    if (!userId || !startDate || !endDate || !numberOfTests) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newSubscription = new Subscription({
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        numberOfTests,
      });

      await newSubscription.save();

      res.status(201).json({ message: "Subscription created successfully" });
    } catch (error) {
      console.error("Error saving subscription:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
