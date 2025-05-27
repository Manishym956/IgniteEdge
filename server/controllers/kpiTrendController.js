import KPITrend from "../models/KPITrend.js";
import mongoose from "mongoose";

// Create a new KPI trend entry
export const createKPITrend = async (req, res) => {
  try {
    const entry = new KPITrend({
      ...req.body,
      userId: req.user.id
    });
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all KPI trend entries for the user
export const getKPITrends = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await KPITrend.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 