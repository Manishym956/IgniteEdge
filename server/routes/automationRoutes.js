import express from 'express';
import {
  createAutomation,
  getAutomations,
  updateAutomation,
  deleteAutomation
} from '../controllers/automationController.js';

const router = express.Router();

router.post('/', createAutomation);
router.get('/', getAutomations);
router.put('/:id', updateAutomation);
router.delete('/:id', deleteAutomation);

export default router; 