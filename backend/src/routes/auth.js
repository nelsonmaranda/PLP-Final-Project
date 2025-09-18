import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { z } from 'zod';

const authApi = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(1).optional(),
  role: z.enum(['commuter', 'moderator', 'admin']).optional()
});

authApi.post('/signup', async (req, res) => {
  const { email, password, displayName, role } = signupSchema.parse(req.body);
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, displayName, role: role || 'commuter' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

authApi.post('/login', async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash || '');
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});

export default authApi;


