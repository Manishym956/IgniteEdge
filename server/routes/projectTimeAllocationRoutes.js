import express from 'express';
import { createProjectTimeAllocation, getProjectTimeAllocations } from '../controllers/projectTimeAllocationController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create a new project time allocation entry
router.post('/', userAuth, createProjectTimeAllocation);

// Get all project time allocation entries for the user
router.get('/', userAuth, getProjectTimeAllocations);

export default router; 