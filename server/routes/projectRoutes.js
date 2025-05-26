import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  inviteMember,
  getCustomStatuses
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/invite', inviteMember);
router.get('/:id/statuses', getCustomStatuses);

export default router; 