import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import connectDB from './src/config/db';
import Experience from './src/models/Experience';

async function run() {
  try {
    await connectDB();
    const experiences = [
      {
        title: 'Kayaking at Sunrise',
        shortDesc: 'Curated small-group experience. Certified guide. Safety first with gear included.',
        longDesc: 'A calm sunrise kayaking tour through mangroves and calm waters. Perfect for beginners.',
        location: 'Udupi, Karnataka',
        price: 999,
        images: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
        ],
        dates: [
          {
            date: new Date().toISOString().slice(0, 10),
            times: [
              { time: '06:00', capacity: 6 },
              { time: '08:00', capacity: 6 },
            ],
          },
        ],
      },
      {
        title: 'Mountain Sunrise Hike',
        shortDesc: 'Easy-moderate hike to a beautiful sunrise viewpoint.',
        longDesc: 'Hike with a local guide, light breakfast included.',
        location: 'Coorg, Karnataka',
        price: 1499,
        images: ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80'],
        dates: [
          {
            date: new Date().toISOString().slice(0, 10),
            times: [{ time: '05:00', capacity: 12 }, { time: '05:30', capacity: 10 }],
          },
        ],
      },
    ];

    const result = await Experience.insertMany(experiences);
    console.log('Inserted', result.length, 'documents');
    process.exit(0);
  } catch (err) {
    console.error('addDocs error', err);
    process.exit(1);
  }
}

run();
