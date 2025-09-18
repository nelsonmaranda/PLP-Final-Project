import { Router } from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { Route } from '../models/Route.js';

const routesApi = Router();

// List
routesApi.get('/', async (_req, res) => {
  const items = await Route.find().limit(100);
  res.json(items);
});

// Create
routesApi.post('/', authRequired, requireRole('admin', 'moderator'), async (req, res) => {
  const doc = await Route.create(req.body);
  res.status(201).json(doc);
});

// Update
routesApi.put('/:id', authRequired, requireRole('admin', 'moderator'), async (req, res) => {
  const doc = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

// Delete
routesApi.delete('/:id', authRequired, requireRole('admin'), async (req, res) => {
  await Route.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default routesApi;


