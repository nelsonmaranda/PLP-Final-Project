import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    timeBucket: { type: String, index: true },
    reliability: { type: Number, min: 0, max: 100 },
    safety: { type: Number, min: 0, max: 100 }
  },
  { timestamps: true }
);

scoreSchema.index({ routeId: 1, timeBucket: 1 }, { unique: true });

export const Score = mongoose.model('Score', scoreSchema);


