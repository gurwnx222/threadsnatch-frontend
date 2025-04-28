import express from "express";
import { Email } from "../models/emailSchema.js"; // Import the model, not just the schema

const router = express.Router();

router.post("/email", async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = new Email({ email });
    console.log("New email object:", newEmail); // Log the new email object
    await newEmail.save();
    res.status(200).json({ message: "Email saved successfully!" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ message: "Error saving email" });
  }
});

export default router;
