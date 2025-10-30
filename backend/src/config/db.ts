import mongoose from 'mongoose';

// Suppress upcoming Mongoose strictQuery default change warning for all scripts
mongoose.set('strictQuery', true);

const MONGO_URI = process.env.MONGO_URI || '';

async function connectDB(): Promise<typeof mongoose> {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI not defined in environment');
  }

  try {
    const connection = await mongoose.connect(MONGO_URI, {
      // Add connection options
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });
    
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return connection;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

export default connectDB;
