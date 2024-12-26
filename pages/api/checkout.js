import Stripe from "stripe";
import connectDb from "../../lib/dbConnect";
import BillingDetails from "../../models/BillingDetails";
import ShippingAddress from "../../models/ShippingAddress";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDb(); // Ensure DB connection
      console.log("Database connected");

      const { userId, cartItems, totalAmount } = req.body;

      if (!userId || !cartItems || cartItems.length === 0 || !totalAmount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const billingDetails = await BillingDetails.findOne({ userId });
      const shippingAddress = await ShippingAddress.findOne({ userId });

      if (!billingDetails || !shippingAddress) {
        return res.status(400).json({
          error: "Missing billing or shipping address",
          redirectTo: "/profile", // Provide the redirection path
        });
      }

      console.log("Billing and Shipping address retrieved");

      // Generate line items based on cartItems, using the totalAmount as the total cost
      const lineItems = cartItems.map((item) => {
        if (!item.testName) {
          throw new Error("Cart item is missing necessary information");
        }

        // Stripe needs prices in cents, so you can calculate it as a fraction of the totalAmount
        const itemAmount = Math.round((totalAmount / cartItems.length) * 100); // Assuming equal division of total amount

        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.testName },
            unit_amount: itemAmount, // Set each item to its proportional share of the totalAmount
          },
          quantity: item.quantity || 1,
        };
      });

      console.log("Line items successfully mapped");

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        customer_email: billingDetails.email,
        success_url: `${req.headers.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
      });

      console.log("Stripe session created successfully");

      return res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error("Error during checkout session creation:", error.message);
      return res.status(500).json({
        error: "Failed to create checkout session",
        details: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
