import express from 'express';
import { listExperiences, getExperience } from '../controllers/experiencesController';

const router = express.Router();

router.get('/', listExperiences);
router.get('/:id', getExperience);

export default router;
