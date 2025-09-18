import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoot from './routes/index.js';
import routesApi from './routes/routes.js';
import reportsApi from './routes/reports.js';
import scoresApi from './routes/scores.js';
import cron from 'node-cron';
import { recomputeScoresForLastDay } from './services/scoring.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_matatu_dev';
const PORT = process.env.PORT || 8080;

// Health & version endpoints
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'smart-matatu-backend', version: '0.1.0' });
});

// API routes
app.use('/api', apiRoot);
app.use('/api/routes', routesApi);
app.use('/api/reports', reportsApi);
app.use('/api/scores', scoresApi);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    // recompute scores every 30 minutes
    cron.schedule('*/30 * * * *', async () => {
      try {
        await recomputeScoresForLastDay();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Score recompute failed', e);
      }
    });
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


