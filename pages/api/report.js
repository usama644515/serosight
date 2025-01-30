import dbConnect from "../../lib/dbConnect";
import Report from "../../models/Report";

export default async function handler(req, res) {
  // Establish database connection
  await dbConnect();

  if (req.method === "POST") {
    try {
      // Extract data from request body
      const {
        reportId,
        userId,
        reportDate,
        diseaseName,
        reportedBy,
        immunityLevel,
        immunityResult,
        age,
        gender,
        location,
      } = req.body;

      // Validate required fields
      if (
        !reportId ||
        !userId ||
        !reportDate ||
        !diseaseName ||
        !reportedBy ||
        immunityLevel === undefined || // Ensure immunityLevel is provided and valid
        !immunityResult ||
        !age ||
        !gender ||
        !location
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Create a new report
      const newReport = new Report({
        reportId,
        userId,
        reportDate,
        diseaseName,
        reportedBy,
        immunityLevel,
        immunityResult,
        age,
        gender,
        location,
      });

      // Save the report to the database
      await newReport.save();

      return res
        .status(201)
        .json({ message: "Report saved successfully.", report: newReport });
    } catch (error) {
      console.error("Error saving report:", error);
      return res
        .status(500)
        .json({ error: "Failed to save report", message: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { patientId } = req.query;  // Changed userId to patientId
  
      // Fetch reports for the selected patient by patientId
      const reports = await Report.find({ userId: patientId }).sort({ reportDate: -1 });
  
      // If no reports are found, return an empty array with 200 status
      if (reports.length === 0) {
        return res.status(200).json([]); // Send empty array instead of 404
      }
  
      res.status(200).json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      return res.status(500).json({ error: "Failed to fetch reports", message: error.message });
    }
  }
   else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
