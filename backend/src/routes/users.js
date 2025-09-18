import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { User } from '../models/User.js';

const usersApi = Router();

// Save/unsave routes
usersApi.post('/me/saved-routes', authRequired, async (req, res) => {
  const { routeId } = req.body;
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { savedRoutes: routeId } });
  res.json({ ok: true });
});

usersApi.delete('/me/saved-routes/:routeId', authRequired, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $pull: { savedRoutes: req.params.routeId } });
  res.json({ ok: true });
});

usersApi.get('/me', authRequired, async (req, res) => {
  const u = await User.findById(req.user.id).select('email role savedRoutes');
  res.json(u);
});

export default usersApi;


