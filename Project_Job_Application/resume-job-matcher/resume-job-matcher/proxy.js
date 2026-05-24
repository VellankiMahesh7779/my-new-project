/**
 * proxy.js — Local development server for ResumeMatch
 * Handles CORS and keeps your API key server-side
 *
 * Usage:
 *   1. npm install express node-fetch cors
 *   2. set your API key below (or use env var)
 *   3. node proxy.js
 *   4. open http://localhost:3000
 */

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Serve your app files ──────────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));

// ── Proxy /api/v1/messages → Anthropic ───────────────────────────────────
app.post('/api/v1/messages', async (req, res) => {
  const API_KEY = process.env.ANTHROPIC_API_KEY || 'YOUR_API_KEY_HERE';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: { message: err.message } });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  ResumeMatch running at http://localhost:${PORT}\n`);
});
