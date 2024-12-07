import crypto from "crypto";
import bcrypt from "bcrypt";
import dbConnect from "../../../../lib/dbConnect"; // Replace with your database connection utility
import User from "../../../../models/User"; // Replace with your User model

// Middleware for rate limiting (optional, add as needed)
const resetPasswordLimiter = async (req, res, next) => {
  // Implement rate limiting logic here (e.g., using libraries like `express-rate-limit`)
  // For now, we simply pass through
  next();
};

export default async function handler(req, res) {
  const { method } = req;
  const { token } = req.query; // Access token from the URL

  if (method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).json({
      message: `Method ${method} is not allowed. Only POST requests are supported.`,
    });
  }

  // Connect to the database
  await dbConnect();

  const { password } = req.body;

  // Check if the password is provided
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Hash the token and find the user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user with the reset token and ensure token hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error); // Log the error for debugging
    res.status(500).json({
      message: "Error resetting password. Please try again later.",
    });
  }
}
