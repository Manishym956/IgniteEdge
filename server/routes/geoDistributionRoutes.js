import express from 'express';
import { createGeoDistribution, getGeoDistributions } from '../controllers/geoDistributionController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create a new geo distribution entry
router.post('/', userAuth, createGeoDistribution);

// Get all geo distribution entries for the user
router.get('/', userAuth, getGeoDistributions);

export default router; 