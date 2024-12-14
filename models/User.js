const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, default: null },
    phoneNumber: { type: String, default: null },
    mailingAddress: { type: String, default: null },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
    paymentInfo: { type: String, default: null },
    lastLogin: { type: Date, default: null },
    numberOfLogins: { type: Number, default: 0 },
    resetPasswordToken: { type: String, default: null }, // Field for password reset token
    resetPasswordExpires: { type: Date, default: null }, // Field for token expiration time
  },
  { collection: "Customer data table" }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
