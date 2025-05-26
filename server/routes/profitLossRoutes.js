import express from 'express';
import {
  getProfitLossRecords,
  addProfitLossRecord,
  updateProfitLossRecord,
  deleteProfitLossRecord,
} from '../controllers/profitLossController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Add authentication middleware to all routes
router.use(userAuth);

router.get('/', getProfitLossRecords);
router.post('/', addProfitLossRecord);
router.put('/:id', updateProfitLossRecord);
router.delete('/:id', deleteProfitLossRecord);

export default router;
