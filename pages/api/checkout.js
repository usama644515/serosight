import Stripe from "stripe";
import connectDb from "../../lib/dbConnect";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, totalAmount, cartItems } = req.body;

  try {
    // Connect to MongoDB
    const { db } = await connectDb();

    // Check if billing and shipping addresses exist
    const billingDetails = await db
      .collection("billingdetails")
      .findOne({ userId });
    const shippingAddress = await db
      .collection("shippingaddresses")
      .findOne({ userId });

    // If either billing or shipping address is missing, return an error
    if (!billingDetails || !shippingAddress) {
      return res.status(400).json({ error: "Billing or shipping address missing" });
    }

    // Prepare the line items for the Stripe checkout session
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.testName },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity || 1, // Ensure quantity is defined
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: billingDetails.email,
      success_url: `${req.headers.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    // Return the session ID in the response
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error during checkout session creation:", error);
    res.status(500).json({ error: "Failed to create checkout session", details: error.message });
  }
}
