import Reminder from "../models/Reminder.js";
import mongoose from "mongoose";

// Create a new reminder
export const createReminder = async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      userId: req.user.id
    });
    const saved = await reminder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reminders for user, optionally by date (YYYY-MM-DD)
export const getReminders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;
    let query = { userId: new mongoose.Types.ObjectId(userId) };
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }
    const reminders = await Reminder.find(query).sort({ date: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a reminder as notified/done
export const markReminderNotified = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, userId: new mongoose.Types.ObjectId(userId) },
      { notified: true },
      { new: true }
    );
    if (!reminder) return res.status(404).json({ error: "Reminder not found" });
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 