import dbConnect from "../../lib/dbConnect";
import Billing from "../../models/BillingDetails";

export default async function handler(req, res) {
  await dbConnect();
  const { userId } = req.query;

  try {
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    if (req.method === "GET") {
      const billingInfo = await Billing.findOne({ userId });
      if (!billingInfo) return res.status(404).json({ error: "Billing info not found" });
      return res.status(200).json({ billingInfo });
    }

    if (req.method === "POST") {
      const { paymentInfo } = req.body;
      if (!paymentInfo) return res.status(400).json({ error: "Missing paymentInfo" });

      const existingBilling = await Billing.findOne({ userId });
      if (existingBilling) {
        Object.assign(existingBilling, paymentInfo);
        await existingBilling.save();
        return res.status(200).json({ message: "Billing info updated" });
      }

      const newBilling = new Billing({ userId, ...paymentInfo });
      await newBilling.save();
      return res.status(201).json({ message: "Billing info created" });
    }

    if (req.method === "DELETE") {
      const billingInfo = await Billing.findOneAndDelete({ userId });
      if (!billingInfo) return res.status(404).json({ error: "Billing info not found" });
      return res.status(200).json({ message: "Billing info deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
