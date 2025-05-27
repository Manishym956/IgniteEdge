import DepartmentPerformance from "../models/DepartmentPerformance.js";
import mongoose from "mongoose";

// Create a new department performance entry
export const createDepartmentPerformance = async (req, res) => {
  try {
    const entry = new DepartmentPerformance({
      ...req.body,
      userId: req.user.id
    });
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all department performance entries for the user
export const getDepartmentPerformances = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await DepartmentPerformance.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 