import Immunization from '../../models/Immunization';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect(); // Ensure DB connection is established before handling the request

  if (req.method === 'PUT') {
    try {
      const { userId, vaccineData, smokingHistory, medicationHistory } = req.body;

      // Validate inputs
      if (!userId || !Array.isArray(vaccineData)) {
        return res.status(400).json({ error: 'Invalid input data. userId and vaccineData are required.' });
      }

      // Validate vaccineData format
      const isValidVaccineData = vaccineData.every(item => 
        item.name && typeof item.name === 'string' && 
        item.status && typeof item.status === 'string' &&
        typeof item.date === 'string'
      );

      if (!isValidVaccineData) {
        return res.status(400).json({ error: 'Invalid vaccine data format. Each vaccine entry must have a name, status, and date.' });
      }

      // Update or create new immunization data for the user
      const updatedImmunizationData = await Immunization.findOneAndUpdate(
        { userId },
        { vaccineData, smokingHistory, medicationHistory },
        { new: true, upsert: true } // upsert: true creates a new record if it doesn't exist
      );

      res.status(200).json(updatedImmunizationData);
    } catch (error) {
      console.error('Error saving immunization data:', error);
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  } else if (req.method === 'GET') {
    // Retrieve userId from query params
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId query parameter is required.' });
    }

    try {
      // Find immunization record for the given userId
      const immunizationData = await Immunization.findOne({ userId });

      // Check if no data is found
      if (!immunizationData) {
        return res.status(404).json({ message: 'No immunization records found for the provided userId.' });
      }

      // Send the data back in the response
      res.status(200).json(immunizationData);
    } catch (error) {
      // Handle any errors that occurred while querying the database
      console.error('Error retrieving immunization data:', error);
      res.status(500).json({ message: 'Error retrieving data. Please try again later.', error: error.message });
    }
  } else {
    // Method not allowed if the HTTP method is not PUT or GET
    res.status(405).json({ error: 'Method Not Allowed. Only PUT and GET methods are allowed.' });
  }
}
