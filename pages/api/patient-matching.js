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

      // Check medications status
      if (criteria.medications && criteria.medications !== "None") {
        if (Array.isArray(criteria.medications) && criteria.medications.length > 0) {
          const medicationsConditions = criteria.medications.map((medication) => ({
            [`medications.${medication}`]: true,
          }));
          conditions.push({ $and: medicationsConditions });
        }
      }

      // Check vaccine status
      if (criteria.vaccine && criteria.vaccine !== "None") {
        const vaccineConditions = Array.isArray(criteria.vaccine)
          ? criteria.vaccine.map((vaccine) => ({
              [`vaxStatus.${vaccine}`]: true,
            }))
          : [{ [`vaxStatus.${criteria.vaccine}`]: true }];
        conditions.push({ $and: vaccineConditions });
      }

      // Check actual infection status
      if (criteria.actualinfection && criteria.actualinfection !== "None") {
        if (Array.isArray(criteria.actualinfection) && criteria.actualinfection.length > 0) {
          const actualinfectionConditions = criteria.actualinfection.map((infection) => ({
            [`actualInfection.${infection}`]: true,
          }));
          conditions.push({ $and: actualinfectionConditions });
        }
      }

      // Check disease status
      if (criteria.disease && criteria.disease !== "None") {
        if (Array.isArray(criteria.disease) && criteria.disease.length > 0) {
          const diseaseConditions = criteria.disease.map((disease) => ({
            [`diseasestatus.${disease}`]: true,
          }));
          conditions.push({ $and: diseaseConditions });
        }
      }

      // Check smoking status
      if (criteria.smoking && criteria.smoking !== "None") {
        if (Array.isArray(criteria.smoking)) {
          const smokingConditions = [];
          if (criteria.smoking.includes("Yes")) smokingConditions.push(true);
          if (criteria.smoking.includes("No")) smokingConditions.push(false);
          if (smokingConditions.length > 0) {
            conditions.push({ smokingStatus: { $in: smokingConditions } });
          }
        } else {
          conditions.push({ smokingStatus: criteria.smoking === "Yes" });
        }
      }

      // If conditions were added, combine them with $and
      if (conditions.length > 0) {
        query.$and = conditions;
      }

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