const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'firebase-api' }));

exports.api = functions.https.onRequest(app);

