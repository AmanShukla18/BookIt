import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  experience: mongoose.Types.ObjectId;
  date: string; // ISO date string
  time: string; // e.g. '09:00'
  name: string;
  email: string;
  qty: number;
  promo?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  experience: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  promo: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;
