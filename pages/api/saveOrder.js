import connectDb from "../../lib/dbConnect";
import Order from "../../models/Order";
import BillingDetails from "../../models/BillingDetails";
import ShippingAddress from "../../models/ShippingAddress";
import nodemailer from "nodemailer";
import Subscription from "../../models/UserSubscription";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await connectDb();
      console.log("Connected to MongoDB");

      const { userId, cartItems, email, decrementTests } = req.body;

      // Validate request data
      if (
        !userId ||
        !cartItems ||
        cartItems.length === 0 ||
        !email ||
        decrementTests === undefined
      ) {
        console.error("Missing required fields:", {
          userId,
          cartItems,
          email,
          decrementTests,
        });
        return res.status(400).json({ error: "Missing required fields" });
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

      // Prepare order data
      const orderData = {
        userId,
        orderStatus: "order placed",
        paymentType: "credit card", // You can adjust this field based on your payment type logic
        paymentStatus: "completed", // Update the status as required
        orderKey: `ORDER-${Date.now()}`, // Generate a unique order key
        email: email,
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
      // Decrease the number of tests in the user's subscription
      const subscription = await Subscription.findOne({ userId });
      if (subscription) {
        subscription.numberOfTests += decrementTests;

        if (subscription.numberOfTests < 0) {
          return res
            .status(400)
            .json({ message: "Insufficient tests remaining" });
        }

        await subscription.save();
      } else {
        return res.status(404).json({ message: "Subscription not found" });
      }

      console.log("Order saved successfully");

      // Send confirmation email
      await sendConfirmationEmail(orderData.email, orderData);

      return res
        .status(200)
        .json({ message: "Order placed successfully", order: orderData });
    } catch (error) {
      console.error("Error placing order:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
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
      <p>Thank you for your order! Your order has been placed successfully.</p>
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
