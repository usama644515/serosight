import mongoose from "mongoose";

// Define the schema
const appendSchema = new mongoose.Schema(
  {
    Index: String,
    Block: String,
    Row: String,
    Column: String,
    ID: String,
    Name: String,
    Value: String,
    Background: String,
    Slide: String,
    Column2: String,
    Exposure: String,
  },
  {
    collection: "Append", // Explicitly set the collection name to "Append"
  }
);

// Create the model (use the model if it already exists, otherwise create a new one)
const Append = mongoose.models.Append || mongoose.model("Append", appendSchema);

export default Append;
