import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    fare: { type: Number },
    waitMinutes: { type: Number },
    crowding: { type: Number, min: 1, max: 5 },
    incident: { type: String, enum: ['none', 'harassment', 'theft', 'dangerous-driving', 'other'], default: 'none' },
    location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] },
    timeBucket: { type: String, index: true }
  },
  { timestamps: true }
);

reportSchema.index({ location: '2dsphere' });

export const Report = mongoose.model('Report', reportSchema);


