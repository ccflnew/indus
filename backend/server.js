import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRoutes from "./routes/cardRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";



import connectDB from "./config/db.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/otp", otpRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});