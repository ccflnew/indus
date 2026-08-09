
import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

// ===============================
// ADMIN LOGIN
// POST /api/admin/login
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      username: username.trim(),
    });

    // Admin not found
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    console.log(
      "Admin login successful:",
      admin.username
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Technical error, please try again later",
    });
  }
});

export default router;
