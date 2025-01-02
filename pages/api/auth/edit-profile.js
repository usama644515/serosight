import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { userId, firstName, lastName, dob, gender } = req.body;

  // Validate required fields
  if (!userId || !firstName || !lastName || !dob || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        dob,
        gender,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
}
