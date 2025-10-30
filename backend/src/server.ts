import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import mongoose from 'mongoose';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config(); // Also load .env as fallback

// Configure mongoose
mongoose.set('strictQuery', true); // Address deprecation warning

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
console.log('Attempting MongoDB connection with URI:', MONGO_URI ? '[URI EXISTS]' : '[URI MISSING]');

mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/bookit')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error', err);
    // Don't exit - let the server run even if DB is down
    // process.exit(1);
  });

// Routes
app.use('/experiences', experiencesRouter);
app.use('/bookings', bookingsRouter);
app.use('/promo', promoRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'BookIt API' }));

// Health endpoint to help the frontend and debugging
app.get('/health', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.json({ ok: true, dbConnected: ready, dbState: mongoose.connection.readyState });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
