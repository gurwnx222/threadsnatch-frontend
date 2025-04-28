import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Mongoose connected to MongoDB!");
    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default async function run() {
  try {
    return await connectToDatabase();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Check if this file is being run directly in ES modules
if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(console.error);
}
