import dbConnect from "../../lib/dbConnect";
import Subscription from "../../models/UserSubscription";

export default async function handler(req, res) {
  await dbConnect();

  // Handle GET requests to fetch all subscriptions
  if (req.method === "GET") {
    try {
      const { userId } = req.query;
  
      // Fetch subscription for a specific user if `userId` is provided
      if (userId) {
        const subscription = await Subscription.findOne({ userId });
        if (subscription) {
          res.status(200).json(subscription); // Send the subscription data
        } else {
          res.status(404).json({ message: "Subscription not found" });
        }
      } else {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
      }
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
  } 
  // Handle PUT requests to update an existing subscription
  else if (req.method === "PUT") {
    const { userId, numberOfTests } = req.body;

    if (!userId || !numberOfTests) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const subscription = await Subscription.findOne({ userId });

      if (subscription) {
        subscription.numberOfTests += numberOfTests;
        await subscription.save();
        res.status(200).json({ message: "Subscription updated successfully" });
      } else {
        res.status(404).json({ message: "Subscription not found" });
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } 
  // Handle unsupported HTTP methods
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
