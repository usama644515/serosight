// pages/api/checkout.js
import Stripe from "stripe";
import connectDb from "../../lib/dbConnect";
import BillingDetails from "../../models/BillingDetails";
import ShippingAddress from "../../models/ShippingAddress";
import Order from "../../models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDb(); // Ensure DB connection
      console.log("Database connected");

      const { userId, cartItems, paymentType } = req.body;

      if (!userId || !cartItems || cartItems.length === 0) {
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

      const lineItems = cartItems.map((item) => {
        if (!item.testName || !item.price) {
          throw new Error("Cart item is missing necessary information");
        }

        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.testName },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity || 1,
        };
      });

      console.log("Line items successfully mapped");

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

      // Store the order in the database
      const order = new Order({
        userId,
        orderStatus: "order placed",
        paymentType: 'credit card',
        paymentStatus: "pending",
        orderKey: session.id, // Using Stripe session ID as a unique key
        email: 'test@gamil.com',
        cartItems: cartItems.map((item) => ({
          testName: item.testName,
          price: item.price,
        })),
        shippingDetails: {
          addressLine1: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
      });

      await order.save();

      console.log("Order stored in the database");

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
