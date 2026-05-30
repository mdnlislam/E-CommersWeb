const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dns = require("dns");

// Connect to MongoDB
connectDB();
dotenv.config();
dns.setServers(["1.1.1.1"]);

// Enable CORS for all routes
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
