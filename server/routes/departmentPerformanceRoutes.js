import express from 'express';
import { createDepartmentPerformance, getDepartmentPerformances } from '../controllers/departmentPerformanceController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create a new department performance entry
router.post('/', userAuth, createDepartmentPerformance);

// Get all department performance entries for the user
router.get('/', userAuth, getDepartmentPerformances);

export default router; 