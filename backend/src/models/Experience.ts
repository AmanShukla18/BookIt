import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeSlot {
  time: string; // e.g. "09:00"
  capacity: number;
}

export interface IExperience extends Document {
  title: string;
  shortDesc: string;
  longDesc?: string;
  location: string;
  price: number;
  images: string[];
  dates: { date: string; times: ITimeSlot[] }[];
}

const TimeSlotSchema = new Schema<ITimeSlot>({
  time: { type: String, required: true },
  capacity: { type: Number, required: true, default: 8 },
});

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  longDesc: { type: String },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  dates: {
    type: [
      {
        date: { type: String, required: true },
        times: { type: [TimeSlotSchema], default: [] },
      },
    ],
    default: [],
  },
});

const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
export default Experience;
