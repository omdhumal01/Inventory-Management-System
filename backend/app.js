const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const reorderRoutes = require("./routes/reorderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Management API is Running 🚀",
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/reorders", reorderRoutes);

module.exports = app;