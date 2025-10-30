import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import connectDB from './src/config/db';
import Experience from './src/models/Experience';

async function run() {
  try {
    await connectDB();
    const count = await Experience.countDocuments();
    console.log('Experience count:', count);
    const doc = await Experience.findOne().lean();
    console.log('One doc:', doc);
    process.exit(0);
  } catch (err) {
    console.error('checkDb error', err);
    process.exit(1);
  }
}

run();
