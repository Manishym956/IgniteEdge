import express from 'express';
import { createReminder, getReminders, markReminderNotified } from '../controllers/reminderController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create a new reminder
router.post('/', userAuth, createReminder);

// Get reminders (optionally by date)
router.get('/', userAuth, getReminders);

// Mark a reminder as notified/done
router.patch('/:id', userAuth, markReminderNotified);

export default router; 