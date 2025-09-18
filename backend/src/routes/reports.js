import { Router } from 'express';
import { z } from 'zod';
import { Report } from '../models/Report.js';

const reportsApi = Router();

const createReportSchema = z.object({
  routeId: z.string(),
  fare: z.number().optional(),
  waitMinutes: z.number().int().nonnegative().optional(),
  crowding: z.number().int().min(1).max(5).optional(),
  incident: z.enum(['none', 'harassment', 'theft', 'dangerous-driving', 'other']).optional(),
  location: z
    .object({
      type: z.literal('Point').default('Point'),
      coordinates: z.tuple([z.number(), z.number()])
    })
    .optional(),
  timeBucket: z.string().optional()
});

reportsApi.post('/', async (req, res) => {
  try {
    const payload = createReportSchema.parse(req.body);
    const doc = await Report.create(payload);
    res.status(201).json({ id: doc._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default reportsApi;


