import { Router } from 'express';
import { Score } from '../models/Score.js';

const scoresApi = Router();

scoresApi.get('/', async (req, res) => {
  const { routeId } = req.query;
  const q = routeId ? { routeId } : {};
  const scores = await Score.find(q).sort({ updatedAt: -1 }).limit(100);
  res.json(scores);
});

export default scoresApi;


