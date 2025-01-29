const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken, isAdmin, isFarmer, isSociety } = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
router.post("/register", async (req, res) => {
  const { name, role, email, number, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = new User({ name, role, email, number, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Protected Route for All Authenticated Users
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the protected route", user: req.user });
});

// Admin-Only Route
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

// Farmer-Only Route
router.get("/farmer", verifyToken, isFarmer, (req, res) => {
  res.status(200).json({ message: "Welcome, Farmer!" });
});

// Society-Only Route
router.get("/society", verifyToken, isSociety, (req, res) => {
  res.status(200).json({ message: "Welcome, Society!" });
});

module.exports = router;
