import express from 'express';
import {
  getProfitLossRecords,
  addProfitLossRecord,
  updateProfitLossRecord,
  deleteProfitLossRecord,
} from '../controllers/profitLossController.js';

const router = express.Router();

router.get('/', getProfitLossRecords);
router.post('/', addProfitLossRecord);
router.put('/:id', updateProfitLossRecord);
router.delete('/:id', deleteProfitLossRecord);

export default router;
