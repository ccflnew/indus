import express from "express";
import CardDetails from "../models/CardDetails.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const card = await CardDetails.create(req.body);

    console.log("Saved:", card);

    res.status(201).json({
      success: true,
      message: "Card details saved successfully",
      data: card,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const cards = await CardDetails.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      cards,
    });
  } catch (error) {
    console.error("Fetch card details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch card details",
    });
  }
});

export default router;