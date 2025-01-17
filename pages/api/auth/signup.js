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

  // Function to generate a unique 5-digit user ID
  const generateUniqueUserId = async () => {
    let userId;
    let isUnique = false;

    while (!isUnique) {
      userId = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit number
      const existingUser = await User.findOne({ userId });
      if (!existingUser) {
        isUnique = true;
      }
    }

    return userId;
  };

  try {
    // Generate a unique user ID
    const userId = await generateUniqueUserId();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      userId, // Store the unique user ID
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "user", // Default role assigned
    });

    // Save the user to the database
    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully!",
      userId: savedUser.userId, // Return the generated userId
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key errors (e.g., username, email, or userId already exists)
      return res.status(409).json({
        message: error.keyValue.username
          ? "Username already exists"
          : error.keyValue.email
          ? "Email already exists"
          : "User ID already exists",
      });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}
