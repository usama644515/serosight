// pages/api/verify-payment.js

import Stripe from 'stripe';
import connectDb from '../../lib/dbConnect';
import Order from '../../models/Order';
import BillingDetails from '../../models/BillingDetails';
import ShippingAddress from '../../models/ShippingAddress';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectDb();
      console.log('Connected to MongoDB');

      const { sessionId, userId, cartItems } = req.body;

      // Check for missing required fields
      if (!sessionId || !userId || !cartItems || cartItems.length === 0) {
        console.error('Missing required fields:', { sessionId, userId, cartItems });
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log('Retrieved Stripe session:', session);

      // Verify payment status
      if (session.payment_status !== 'paid') {
        console.error('Payment not successful:', session.payment_status);
        return res.status(400).json({ error: 'Payment not successful' });
      }

      // Retrieve billing and shipping details
      const billingDetails = await BillingDetails.findOne({ userId });
      const shippingAddress = await ShippingAddress.findOne({ userId });

      if (!billingDetails || !shippingAddress) {
        console.error('Missing billing or shipping details:', { billingDetails, shippingAddress });
        return res.status(400).json({ error: 'Missing billing or shipping details' });
      }

      // Prepare order data
      const orderData = {
        userId,
        orderStatus: 'order placed',
        paymentType: 'credit card',
        paymentStatus: 'completed', // Payment is successful
        orderKey: session.id, // Unique order key from Stripe session
        email: 'test@gmail.com',
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
      };

      console.log('Prepared order data:', orderData);

      // Save the order to the database
      const order = new Order(orderData);
      await order.save();
      console.log('Order saved successfully in the database');

      // Return success response
      return res.status(200).json({ paymentStatus: 'completed', order: orderData });
    } catch (error) {
      // Log error details
      console.error('Error handling request:', error.message);

      // Determine if the error is from Mongoose
      if (error.name === 'ValidationError' || error.name === 'MongoError') {
        console.error('Database error:', error.message);
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      // Generic error handling
      return res.status(500).json({ error: 'Failed to process the payment', details: error.message });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
