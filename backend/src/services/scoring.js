import { Report } from '../models/Report.js';
import { Score } from '../models/Score.js';

function toBucket(date = new Date()) {
  const h = date.getHours();
  // 3-hour buckets: 0-2,3-5,...,21-23
  const start = Math.floor(h / 3) * 3;
  return `${start.toString().padStart(2, '0')}:00`;
}

export async function recomputeScoresForLastDay() {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const pipeline = [
    { $match: { createdAt: { $gte: since } } },
    {
      $project: {
        routeId: 1,
        timeBucket: 1,
        waitMinutes: 1,
        crowding: 1,
        incident: 1
      }
    },
    {
      $group: {
        _id: { routeId: '$routeId', timeBucket: '$timeBucket' },
        n: { $sum: 1 },
        avgWait: { $avg: '$waitMinutes' },
        avgCrowding: { $avg: '$crowding' },
        incidentCount: { $sum: { $cond: [{ $ne: ['$incident', 'none'] }, 1, 0] } }
      }
    }
  ];

  const results = await Report.aggregate(pipeline);
  for (const r of results) {
    const n = r.n || 1;
    // Simple heuristics: lower wait and crowding => higher reliability, fewer incidents => higher safety
    const reliability = Math.max(0, Math.min(100, 100 - (r.avgWait || 0) * 2 - (r.avgCrowding || 0) * 8));
    const safety = Math.max(0, Math.min(100, 100 - (r.incidentCount / n) * 100));
    await Score.findOneAndUpdate(
      { routeId: r._id.routeId, timeBucket: r._id.timeBucket || toBucket() },
      { $set: { reliability, safety } },
      { upsert: true }
    );
  }
  return results.length;
}


