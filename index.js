import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import houseRoute from "./router/house.route.js";
import contactRouter from "./router/contact.route.js";
import cors from "cors";
import userRouter from "./router/user.route.js";
import wishListRouter from "./router/wishList.route.js";
import fileUpload from "express-fileupload";
import path from "path";

// Get the current directory using import.meta.url (for ES modules)
const __dirname = path.resolve(path.dirname(""));

// Initialize express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    methods: ["DELETE", "POST", "GET"],
  })
);

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

// Parse JSON payloads
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from environment variables
const port = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB", error);
}

// Define routes for API endpoints
app.use("/house", houseRoute);
app.use("/contact", contactRouter);
app.use("/user", userRouter);
app.use("/wishList", wishListRouter);

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));

// If no API routes are matched, serve the 'index.html' from the 'dist' folder
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
