import express from 'express';
import { createExpense, getExpensesByCategory } from '../controllers/expenseController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create a new expense
router.post('/', userAuth, createExpense);

// Get expenses aggregated by category
router.get('/categories', userAuth, getExpensesByCategory);

export default router; 