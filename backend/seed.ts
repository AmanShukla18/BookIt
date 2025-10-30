/**
 * Seed script for BookIt demo data.
 * Run: `npm run seed` (from backend folder) after installing dependencies and
 * setting MONGO_URI in your local .env
 */
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/config/db';
import Experience from './src/models/Experience';

async function seed() {
  await connectDB();
  console.log('Connected');

  const existing = await Experience.countDocuments();
  if (existing > 0) {
    console.log('Experience collection already has data — skipping seed.');
    process.exit(0);
  }

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
        {
          date: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 10),
          times: [{ time: '06:00', capacity: 6 }, { time: '08:00', capacity: 6 }],
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

  await Experience.insertMany(experiences);
  console.log('Seeded experiences');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error', err);
  process.exit(1);
});
