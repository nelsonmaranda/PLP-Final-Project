import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    saccoNames: [{ type: String }],
    geometry: {
      type: { type: String, enum: ['LineString'], default: 'LineString' },
      coordinates: { type: [[Number]], default: [] }
    },
    stops: [
      {
        name: String,
        location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] }
      }
    ]
  },
  { timestamps: true }
);

routeSchema.index({ geometry: '2dsphere' });

export const Route = mongoose.model('Route', routeSchema);


