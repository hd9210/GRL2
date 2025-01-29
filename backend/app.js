const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer"); // Import multer for file uploads
const path = require("path");
const connectDB = require("./config"); // MongoDB connection configuration

dotenv.config();

// Import routes
const milkRoutes = require("./routes/milkRoutes");
const userRoutes = require("./routes/userRoutes");
const farmerAccountRoutes = require("./routes/farmerAccountRoutes");
const farmerListRoutes = require("./routes/farmerListRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public'))); // Serving from frontend's public folder

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination for uploaded files
    cb(null, path.join(__dirname, '../frontend/public')); // Assuming the frontend folder is at the same level as the backend
  },
  filename: (req, file, cb) => {
    // Use the original filename
    cb(null, file.originalname); // Retain the original file name
  },
});

const upload = multer({ storage });


// MongoDB Connection
connectDB();

// Routes
app.use("/api/milk-collection", milkRoutes);
app.use("/api/user", userRoutes);
app.use("/api/farmer-accounts", farmerAccountRoutes);
app.use("/api/farmer-list", farmerListRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }
  try {
    res.status(200).send({
      message: "File uploaded successfully!",
      fileUrl: `/uploads/${req.file.filename}`, // Serve the file URL from the frontend's public folder
    });
  } catch (err) {
    console.error("Error uploading file: ", err); // Log the error for debugging
    res.status(500).send({ message: "An error occurred during file upload." });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Milk Management System Backend is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
