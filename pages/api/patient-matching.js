import connectDb from "../../lib/dbConnect";
import PatientData from "../../models/PatientData";

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "POST") {
    try {
      const { criteria } = req.body;

      if (!criteria) {
        return res.status(400).json({ error: "Criteria is required" });
      }

      // Build query based on criteria
      const query = {};
      const conditions = [];

      // Check vaccine status (medication Status)
      if (criteria.medications && Array.isArray(criteria.medications)) {
        const medicationsConditions = criteria.medications.map(
          (medications) => ({
            [`medications.${medications}`]: true,
          })
        );
        conditions.push({ $and: medicationsConditions });
      }

      // Check vaccine status (vaxStatus)
      if (criteria.vaccine && Array.isArray(criteria.vaccine)) {
        const vaccineConditions = criteria.vaccine.map((vaccine) => ({
          [`vaxStatus.${vaccine}`]: true,
        }));
        conditions.push({ $and: vaccineConditions });
      }
      // Check actual infection (actual infection)
      if (criteria.actualinfection && Array.isArray(criteria.actualinfection)) {
        const actualinfectionConditions = criteria.actualinfection.map(
          (actualinfection) => ({
            [`actualInfection.${actualinfection}`]: true,
          })
        );
        conditions.push({ $and: actualinfectionConditions });
      }
      // Check Disease status (disease status)
      if (criteria.disease && Array.isArray(criteria.disease)) {
        const diseaseConditions = criteria.disease.map((disease) => ({
          [`diseasestatus.${disease}`]: true,
        }));
        conditions.push({ $and: diseaseConditions });
      }

      // Check smoking status (now handled like vaccine with multiple selections)
      if (criteria.smoking && Array.isArray(criteria.smoking)) {
        const smokingConditions = [];

        if (criteria.smoking.includes("Yes")) {
          smokingConditions.push(true);
        }
        if (criteria.smoking.includes("No")) {
          smokingConditions.push(false);
        }

        if (smokingConditions.length > 0) {
          conditions.push({ smokingStatus: { $in: smokingConditions } });
        }
      }

      // If no conditions were added, return all patients
      if (conditions.length === 0) {
        return res.status(400).json({ error: "No valid criteria provided" });
      }

      // Combine the conditions with $and to ensure all must be true
      query.$and = conditions;

      // Fetch patient data based on query
      const patients = await PatientData.find(query);

      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
