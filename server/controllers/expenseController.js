import Expense from "../models/Expense.js";
import mongoose from "mongoose";

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.id
    });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get aggregated expenses by category for the logged-in user
export const getExpensesByCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 