import dbConnect from "../../lib/dbConnect";
import PatientData from "../../models/PatientData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();
    
    const patients = await PatientData.find();

    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
