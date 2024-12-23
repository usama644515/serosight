import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }

      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Check payment status
      if (session.payment_status === "paid") {
        return res.status(200).json({ paymentStatus: "paid" });
      } else {
        return res.status(400).json({ error: "Payment not successful" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error.message);
      return res.status(500).json({
        error: "Failed to verify payment",
        details: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
