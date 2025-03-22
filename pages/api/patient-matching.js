import connectDb from "../../lib/dbConnect";
import PatientData from "../../models/PatientData";

// Define the options for each category
const medicationsOptions = [
  "Plaquanil",
  "Methotrexate",
  "Otezla",
  "Arava",
  "tnf_alpha",
  "jak_kinase_inh",
  "il_23_inh",
  "il_6_inh",
  "il_17_inh",
  "orencia",
  "Imuran",
  "cellcept",
  "cytoxan",
  "prednisone",
  "benlysta",
  "rituxan",
];
const vaccineOptions = [
  "covid19",
  "pertussis",
  "rsv",
  "varicella",
  "measles",
  "mumps",
  "rubella",
  "hepA",
  "hepB",
  "influenza",
];
const actualInfectionOptions = [
  "covid19",
  "influenza",
  "rsv",
  "varicella",
  "measles",
  "mumps",
  "rubella",
  "hepA",
  "hepB",
  "mononucleosis",
  "h1n5Avian",
  "westNileVirus",
  "diabetes",
];
const diseaseOptions = [
  "rheumatoidArthritis",
  "psoriaticArthritis",
  "ankylosingSpondylitis",
  "lupus",
  "vasculitis",
  "sjogrens",
  "gout",
  "cadHeartDisease",
  "cancer",
];

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "POST") {
    try {
      const { criteria } = req.body;

      if (!criteria) {
        return res.status(400).json({ error: "Criteria is required" });
      }

      // Build query based on criteria
      const andConditions = [];

      // Function to handle filtering logic for a given criteria
      const buildConditions = (criteriaKey, fieldName, options) => {
        if (!criteria[criteriaKey] || criteria[criteriaKey].length === 0) {
          // If the criteria array is null or empty, skip filtering for this category
          return;
        }

        const items = criteria[criteriaKey];
        const noneIndex = items.indexOf("None");

        if (noneIndex !== -1) {
          // If "None" is selected, ensure all options in this category are false
          const noneConditions = options.map((key) => ({
            [`${fieldName}.${key}`]: false,
          }));
          andConditions.push({ $and: noneConditions });

          // If "None" is present along with other items, ensure the present items are true
          const otherItems = items.filter((item) => item !== "None");
          if (otherItems.length > 0) {
            const otherConditions = otherItems.map((item) => ({
              [`${fieldName}.${item}`]: true,
            }));
            andConditions.push({ $or: otherConditions });
          }
        } else {
          // If "None" is not present, only ensure the selected items are true
          const otherConditions = items.map((item) => ({
            [`${fieldName}.${item}`]: true,
          }));
          andConditions.push({ $or: otherConditions });
        }
      };

      // Apply filtering to each category
      buildConditions("medications", "medications", medicationsOptions);
      buildConditions("vaccine", "vaxStatus", vaccineOptions);
      buildConditions(
        "actualInfection",
        "actualInfection",
        actualInfectionOptions
      );
      buildConditions("disease", "diseaseStatus", diseaseOptions);

      // Handle smoking status separately
      if (criteria.smoking && criteria.smoking.length > 0) {
        const smokingConditions = [];

        if (criteria.smoking.includes("None")) {
          // If "None" is present, filter patients where smokingStatus is false
          smokingConditions.push({ smokingStatus: false });
        }

        // For other items (excluding "None"), filter patients based on smoking status
        const otherSmokingItems = criteria.smoking.filter(
          (item) => item !== "None"
        );
        if (otherSmokingItems.length > 0) {
          const smokingStatusConditions = [];
          if (otherSmokingItems.includes("Yes"))
            smokingStatusConditions.push(true);
          if (otherSmokingItems.includes("No"))
            smokingStatusConditions.push(false);
          if (smokingStatusConditions.length > 0) {
            smokingConditions.push({
              smokingStatus: { $in: smokingStatusConditions },
            });
          }
        }

        if (smokingConditions.length > 0) {
          andConditions.push({ $or: smokingConditions });
        }
      }

      // Handle serium status separately (nested under sampleInfo)
      if (criteria.serium && criteria.serium.length > 0) {
        const seriumConditions = [];

        if (criteria.serium.includes("None")) {
          // If "None" is present, filter patients where sampleInfo.serium is false
          seriumConditions.push({ "sampleInfo.serium": false });
        }

        // For other items (excluding "None"), filter patients based on serium status
        const otherSeriumItems = criteria.serium.filter(
          (item) => item !== "None"
        );
        if (otherSeriumItems.length > 0) {
          const seriumStatusConditions = [];
          if (otherSeriumItems.includes("Yes"))
            seriumStatusConditions.push(true);
          if (otherSeriumItems.includes("No"))
            seriumStatusConditions.push(false);
          if (seriumStatusConditions.length > 0) {
            seriumConditions.push({
              "sampleInfo.serium": { $in: seriumStatusConditions },
            });
          }
        }

        if (seriumConditions.length > 0) {
          andConditions.push({ $or: seriumConditions });
        }
      }

      // Handle biorepsitiory status separately (nested under sampleInfo)
      if (criteria.biorepsitiory && criteria.biorepsitiory.length > 0) {
        const biorepsitioryConditions = [];

        if (criteria.biorepsitiory.includes("None")) {
          // If "None" is present, filter patients where sampleInfo.Bio_repositiory is false
          biorepsitioryConditions.push({ "sampleInfo.Bio_repositiory": false });
        }

        // For other items (excluding "None"), filter patients based on biorepsitiory status
        const otherBiorepsitioryItems = criteria.biorepsitiory.filter(
          (item) => item !== "None"
        );
        if (otherBiorepsitioryItems.length > 0) {
          const biorepsitioryStatusConditions = [];
          if (otherBiorepsitioryItems.includes("Yes"))
            biorepsitioryStatusConditions.push(true);
          if (otherBiorepsitioryItems.includes("No"))
            biorepsitioryStatusConditions.push(false);
          if (biorepsitioryStatusConditions.length > 0) {
            biorepsitioryConditions.push({
              "sampleInfo.Bio_repositiory": { $in: biorepsitioryStatusConditions },
            });
          }
        }

        if (biorepsitioryConditions.length > 0) {
          andConditions.push({ $or: biorepsitioryConditions });
        }
      }

      // Combine all conditions with $and
      const finalQuery =
        andConditions.length > 0 ? { $and: andConditions } : {};
      console.log(JSON.stringify(finalQuery, null, 2));

      // Fetch patient data based on query
      const patients = await PatientData.find(finalQuery);

      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}