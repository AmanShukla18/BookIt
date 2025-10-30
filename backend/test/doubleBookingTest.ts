/**
 * Test script to demonstrate double-booking prevention.
 * NOTE: This script expects the backend API to be running on http://localhost:5000
 * Run: `npm run test:double-book` from the backend folder (after installing deps and running the server).
 */
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import connectDB from '../src/config/db';
import Experience from '../src/models/Experience';

async function run() {
  await connectDB();
  console.log('DB connected');

  // Create a small experience with capacity 2 for a specific date/time
  const date = new Date().toISOString().slice(0, 10);
  const exp = await Experience.create({
    title: 'Double-book test experience',
    shortDesc: 'Used by test script',
    location: 'Testland',
    price: 100,
    images: [],
    dates: [{ date, times: [{ time: '09:00', capacity: 2 }] }],
  });

  console.log('Created experience', exp._id.toString());

  const url = 'http://localhost:5000/bookings';

  // Make two bookings of qty 1 (should succeed), then one more that should fail
  try {
    const a = await axios.post(url, { experienceId: exp._id, date, time: '09:00', name: 'A', email: 'a@example.com', qty: 1 });
    console.log('Booking A response:', a.data);
    const b = await axios.post(url, { experienceId: exp._id, date, time: '09:00', name: 'B', email: 'b@example.com', qty: 1 });
    console.log('Booking B response:', b.data);

    // This one should fail because capacity=2
    const c = await axios.post(url, { experienceId: exp._id, date, time: '09:00', name: 'C', email: 'c@example.com', qty: 1 });
    console.log('Booking C response (unexpected success):', c.data);
  } catch (err: any) {
    console.error('Expected failure for C (slot full):', err?.response?.data || err.message);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error('Test error', err);
  process.exit(1);
});
