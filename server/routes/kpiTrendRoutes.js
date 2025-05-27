import express from 'express';
import { createKPITrend, getKPITrends } from '../controllers/kpiTrendController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create a new KPI trend entry
router.post('/', userAuth, createKPITrend);

// Get all KPI trend entries for the user
router.get('/', userAuth, getKPITrends);

export default router; 