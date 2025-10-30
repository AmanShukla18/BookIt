import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';
import { isValidEmail } from '../utils/validators';

// Very small promo table for demo purposes.
const PROMOS: Record<string, { type: 'percent' | 'flat'; value: number }> = {
  SAVE10: { type: 'percent', value: 10 },
  FLAT100: { type: 'flat', value: 100 },
};

export async function createBooking(req: Request, res: Response) {
  try {
    const { experienceId, date, time, name, email, qty = 1, promo } = req.body;
    if (!experienceId || !date || !time || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Basic validations
    if (!isValidEmail(String(email))) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    const quantity = Number(qty) || 0;
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

  const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: 'Experience not found' });

    // Find matching date/time slot capacity
    const dateObj = exp.dates.find((d) => d.date === date);
    if (!dateObj) return res.status(400).json({ error: 'Date not available' });

  const slot = dateObj.times.find((t) => t.time === time);
    if (!slot) return res.status(400).json({ error: 'Time slot not available' });

    // Count existing bookings for this experience/date/time
    const existing = await Booking.aggregate([
      { $match: { experience: exp._id, date: date, time: time } },
      { $group: { _id: null, total: { $sum: '$qty' } } },
    ]);
    const bookedCount = existing.length ? existing[0].total : 0;

    if (bookedCount + quantity > slot.capacity) {
      return res.status(400).json({ error: 'Slot is sold out or not enough capacity' });
    }

    // Normalize promo code and check if it's a known promo
    const promoCode = promo ? String(promo).toUpperCase().trim() : undefined;
    const promoDef = promoCode ? PROMOS[promoCode] : undefined;

    const booking = await Booking.create({
      experience: exp._id,
      date,
      time,
      name,
      email,
      qty: quantity,
      promo: promoCode,
    });

    res.status(201).json({
      ok: true,
      bookingId: booking._id,
      promoApplied: promoDef ? { code: promoCode, ...promoDef } : null,
    });
  } catch (err) {
    console.error('Error creating booking', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export function validatePromo(req: Request, res: Response) {
  const { code } = req.body;
  if (!code) return res.status(400).json({ valid: false, message: 'No code provided' });
  const key = String(code).toUpperCase().trim();
  const promo = PROMOS[key];
  if (!promo) return res.status(200).json({ valid: false, message: 'Invalid promo code' });
  return res.status(200).json({ valid: true, code: key, promo, message: 'Promo code valid' });
}
