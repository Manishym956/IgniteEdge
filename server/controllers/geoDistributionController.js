import GeoDistribution from "../models/GeoDistribution.js";
import mongoose from "mongoose";

// Create a new geo distribution entry
export const createGeoDistribution = async (req, res) => {
  try {
    const entry = new GeoDistribution({
      ...req.body,
      userId: req.user.id
    });
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all geo distribution entries for the user
export const getGeoDistributions = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await GeoDistribution.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 