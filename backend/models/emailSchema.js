import mongoose from "mongoose";

// Define the schema
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
export const Email = mongoose.model("Email", emailSchema);

export { emailSchema };
