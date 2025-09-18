import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, index: true },
    email: { type: String, index: true },
    displayName: { type: String },
    role: { type: String, enum: ['commuter', 'moderator', 'admin'], default: 'commuter' },
    passwordHash: { type: String },
    savedRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);


