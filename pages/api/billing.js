// /pages/api/billing.js
import connectToDatabase from '../../lib/dbConnect';
import BillingDetails from '../../models/BillingDetails';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await connectToDatabase();

      // Extract userId and paymentInfo from the request body
      const { userId, paymentInfo } = req.body;

      // Validate the input data
      if (!userId || !paymentInfo) {
        return res.status(400).json({ error: "User ID and payment info are required." });
      }

      const {
        country,
        address,
        city,
        state,
        zipCode,
        nameOnCard,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      } = paymentInfo;

      if (
        !country ||
        !address ||
        !city ||
        !state ||
        !zipCode ||
        !nameOnCard ||
        !cardNumber ||
        !expiryMonth ||
        !expiryYear ||
        !cvv
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Check if billing details already exist for the given userId
      let existingBillingDetails = await BillingDetails.findOne({ userId });

      if (existingBillingDetails) {
        // If billing details exist, update them
        existingBillingDetails.country = country;
        existingBillingDetails.address = address;
        existingBillingDetails.city = city;
        existingBillingDetails.state = state;
        existingBillingDetails.zipCode = zipCode;
        existingBillingDetails.nameOnCard = nameOnCard;
        existingBillingDetails.cardNumber = cardNumber;
        existingBillingDetails.expiryMonth = expiryMonth;
        existingBillingDetails.expiryYear = expiryYear;
        existingBillingDetails.cvv = cvv;

        await existingBillingDetails.save();

        return res.status(200).json({ message: "Billing details updated successfully." });
      } else {
        // If no billing details exist, create new billing details
        const newBillingDetails = new BillingDetails({
          userId,
          country,
          address,
          city,
          state,
          zipCode,
          nameOnCard,
          cardNumber,
          expiryMonth,
          expiryYear,
          cvv,
        });

        await newBillingDetails.save();

        return res.status(201).json({ message: "Billing details created successfully." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }
  } else {
    // If the method is not POST, return method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  }
}
