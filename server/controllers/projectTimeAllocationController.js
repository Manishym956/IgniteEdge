import ProjectTimeAllocation from "../models/ProjectTimeAllocation.js";
import mongoose from "mongoose";

// Create a new project time allocation entry
export const createProjectTimeAllocation = async (req, res) => {
  try {
    const entry = new ProjectTimeAllocation({
      ...req.body,
      userId: req.user.id
    });
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all project time allocation entries for the user
export const getProjectTimeAllocations = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await ProjectTimeAllocation.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ startDate: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 