import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    isVerified: true,
    tokenExpiry: Date.now + 3600000,
    required: true,
    unique: false,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Email = mongoose.model("Email", emailSchema);

export { emailSchema };
