import connectDB from "../../../lib/dbConnect";
import Test from "../../../models/Test"; // Mongoose model

export default async function handler(req, res) {
    const { userId } = req.query;
  if (req.method === "GET") {
    try {
      // Ensure database connection
      await connectDB();
      console.log("Database connected");

      // Fetch all documents from the Test collection
      const tests = await Test.find({ userId }); // Empty filter to get all documents
      console.log("Fetched tests:", tests);

      // Respond with the retrieved documents
      return res.status(200).json(tests);
    } catch (error) {
      console.error("Error fetching tests:", error);
      return res.status(500).json({ message: "Error fetching test data", error });
    }
  } else if (req.method === "POST") {
    try {
      // Ensure database connection
      await connectDB();
      console.log("Database connected");

      // Create a new test document based on the request body
      const { testId, userId, orderId, purchaseDate, itemName, reportStatus, results } = req.body;

      const newTest = new Test({
        testId,
        userId,
        orderId,
        purchaseDate,
        itemName,
        reportStatus,
        results,
      });

      // Save the new test document to the database
      await newTest.save();
      console.log("New test added:", newTest);

      // Respond with the newly created test
      return res.status(201).json(newTest);
    } catch (error) {
      console.error("Error adding test:", error);
      return res.status(500).json({ message: "Error adding test data", error });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
