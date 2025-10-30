import express from 'express';
import { validatePromo } from '../controllers/bookingsController';

const router = express.Router();

// POST /promo/validate
router.post('/validate', validatePromo);

export default router;
