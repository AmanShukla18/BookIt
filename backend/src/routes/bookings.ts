import express from 'express';
import { createBooking, validatePromo } from '../controllers/bookingsController';

const router = express.Router();

router.post('/', createBooking);
router.post('/promo/validate', validatePromo);

export default router;
