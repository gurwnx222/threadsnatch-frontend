import express from "express";
import router from "./routes/emailDb.js";
import { connectToDatabase } from "./dbConfig.js";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB first, then start the server
async function startServer() {
  try {
    // Connect to MongoDB using mongoose
    await connectToDatabase();
    console.log("MongoDB connection established");

    // Set up routes
    app.get("/", (req, res) => {
      res.send("Welcome to the Express app!");
    });

    app.use("/api", router);

    // Start the Express server after DB connection is established
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();
