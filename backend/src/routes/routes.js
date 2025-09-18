import { Router } from 'express';

const routesApi = Router();

// Placeholder list endpoint
routesApi.get('/', async (_req, res) => {
  res.json([]);
});

export default routesApi;


