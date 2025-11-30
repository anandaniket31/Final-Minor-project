import express from "express";
import Prediction from "../models/Prediction.js";

const router = express.Router();


import axios from "axios";

router.post("/", async (req, res) => {
  try {
    // Call the running ML Service
    const mlResponse = await axios.post("http://localhost:5001/predict", req.body);

    if (mlResponse.data.success) {
      const predictedCrop = mlResponse.data.recommended_crop;

      // 💾 Save to MongoDB (Optional)
      try {
        const saved = new Prediction({ ...req.body, predicted_crop: predictedCrop });
        await saved.save();
      } catch (dbError) {
        console.warn("Database save failed (non-fatal):", dbError.message);
      }

      res.json({ predicted_crop: predictedCrop });
    } else {
      res.status(400).json({ error: mlResponse.data.error || "Prediction failed" });
    }
  } catch (error) {
    console.error("ML Service error:", error.message);
    res.status(500).json({ error: "Failed to communicate with ML service" });
  }
});

export default router;
