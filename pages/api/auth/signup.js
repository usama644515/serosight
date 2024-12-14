import bcrypt from "bcrypt";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Generate a username
  const username = `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "");

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key errors (e.g., username or email already exists)
      return res.status(409).json({
        message:
          error.keyValue.username
            ? "Username already exists"
            : "Email already exists",
      });
    }
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
}
