import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience';

function dbReady() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState === 1;
}

export async function listExperiences(req: Request, res: Response) {
  try {
    if (!dbReady()) {
      console.error('DB not connected when listing experiences');
      return res.status(503).json({ error: 'Database not connected' });
    }

    const items = await Experience.find().lean();
    res.json(items);
  } catch (err) {
    console.error('Error listing experiences', err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getExperience(req: Request, res: Response) {
  try {
    if (!dbReady()) {
      console.error('DB not connected when fetching experience');
      return res.status(503).json({ error: 'Database not connected' });
    }

    const { id } = req.params;
    const item = await Experience.findById(id).lean();
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error('Error fetching experience', err);
    res.status(500).json({ error: 'Server error' });
  }
}
