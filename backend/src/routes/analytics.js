import { Router } from 'express';
import { Report } from '../models/Report.js';
import { Route } from '../models/Route.js';

const analyticsApi = Router();

analyticsApi.get('/summary', async (_req, res) => {
  const [reports, activeRoutes] = await Promise.all([
    Report.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
    Route.countDocuments()
  ]);
  res.json({ last24hReports: reports, routeCount: activeRoutes });
});

export default analyticsApi;


