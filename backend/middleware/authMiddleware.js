const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add the decoded token data to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied: Admins Only" });
  next();
};

// Check if the user is a farmer
const isFarmer = (req, res, next) => {
  if (req.user.role !== "farmer") return res.status(403).json({ message: "Access Denied: Farmers Only" });
  next();
};

// Check if the user is a society member
const isSociety = (req, res, next) => {
  if (req.user.role !== "society") return res.status(403).json({ message: "Access Denied: Society Members Only" });
  next();
};

module.exports = { verifyToken, isAdmin, isFarmer, isSociety };
