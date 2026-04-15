const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/contact", contactRoutes);

module.exports = app;
