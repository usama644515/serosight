import Stripe from "stripe";
import connectDb from "../../lib/dbConnect";
import Order from "../../models/Order";
import BillingDetails from "../../models/BillingDetails";
import ShippingAddress from "../../models/ShippingAddress";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await connectDb();
      console.log("Connected to MongoDB");

      const { sessionId, userId, cartItems, email } = req.body;

      // Validate request data
      if (
        !sessionId ||
        !userId ||
        !cartItems ||
        cartItems.length === 0 ||
        !email
      ) {
        console.error("Missing required fields:", {
          sessionId,
          userId,
          cartItems,
          email,
        });
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("Retrieved Stripe session:", session);

      // Verify payment status
      if (session.payment_status !== "paid") {
        console.error("Payment not successful:", session.payment_status);
        return res.status(400).json({ error: "Payment not successful" });
      }

      // Retrieve billing and shipping details
      const billingDetails = await BillingDetails.findOne({ userId });
      const shippingAddress = await ShippingAddress.findOne({ userId });

      if (!billingDetails || !shippingAddress) {
        console.error("Missing billing or shipping details:", {
          billingDetails,
          shippingAddress,
        });
        return res
          .status(400)
          .json({ error: "Missing billing or shipping details" });
      }

      // Prepare order data without the price field
      const orderData = {
        userId,
        orderStatus: "order placed",
        paymentType: "credit card",
        paymentStatus: "completed",
        orderKey: `ORDER-${Date.now()}`, // Generate a unique order key
        email: email, // Use the email passed from the frontend
        cartItems: cartItems.map((item) => ({
          testName: item.testName,
        })),
        shippingDetails: {
          addressLine1: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
      };

      console.log("Prepared order data:", orderData);

      // Save the order to the database
      const order = new Order(orderData);
      await order.save();
      console.log("Order saved successfully in the database");

      // Send the email confirmation
      await sendConfirmationEmail(orderData.email, orderData);

      // Return success response
      return res
        .status(200)
        .json({ paymentStatus: "completed", order: orderData });
    } catch (error) {
      // Log error details
      console.error("Error handling request:", error.message);

      // Determine if the error is from Mongoose
      if (error.name === "ValidationError" || error.name === "MongoError") {
        console.error("Database error:", error.message);
        return res
          .status(500)
          .json({ error: "Database error", details: error.message });
      }

      // Generic error handling
      return res
        .status(500)
        .json({
          error: "Failed to process the payment",
          details: error.message,
        });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ error: "Method not allowed" });
  }
}

// Function to send the order confirmation email
async function sendConfirmationEmail(email, orderData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SeroSight - Order Confirmation",
    html: `
      <h1>Order Confirmation</h1>
      <p>Dear Customer,</p>
      <p>Thank you for your purchase! Your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> ${orderData.orderKey}</p>
      <p><strong>Order Status:</strong> ${orderData.orderStatus}</p>
      <p><strong>Payment Status:</strong> ${orderData.paymentStatus}</p>
      <p><strong>Shipping Details:</strong></p>
      <p>Address: ${orderData.shippingDetails.addressLine1}, ${
      orderData.shippingDetails.city
    }, ${orderData.shippingDetails.country}</p>
      <p>Items Ordered:</p>
      <ul>
        ${orderData.cartItems
          .map((item) => `<li>${item.testName}</li>`)
          .join("")}
      </ul>
      <p>We will notify you once your order has been shipped.</p>
      <p>Best regards,</p>
      <p>SeroSight</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}
