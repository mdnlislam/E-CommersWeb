const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
// 1. Env config shurutei kora valo
dotenv.config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

// Connect to MongoDB
connectDB();
dns.setServers(["1.1.1.1"]);

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Middleware to parse JSON bodies

// Sample route
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
