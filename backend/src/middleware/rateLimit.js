const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 8;

const hits = new Map();

export function simpleRateLimit(req, res, next) {
  const now = Date.now();
  const key = `${req.ip}:${req.headers['x-device-id'] || 'anon'}`;
  const entry = hits.get(key) || { count: 0, ts: now };
  if (now - entry.ts > WINDOW_MS) {
    entry.count = 0; entry.ts = now;
  }
  entry.count += 1;
  hits.set(key, entry);
  if (entry.count > MAX_PER_WINDOW) {
    return res.status(429).json({ error: 'Too many requests, try later.' });
  }
  return next();
}


