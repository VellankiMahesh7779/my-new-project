# ResumeMatch — AI Job Matcher

An AI-powered web application that reads your resume and returns curated job matches using the Anthropic Claude API.

---

## Features

- **Resume upload** — drag & drop or browse (PDF, DOC, DOCX, TXT)
- **Smart preferences** — filter by job type, experience level, and industry
- **AI analysis** — Claude extracts your skills and matches you to 6 relevant roles
- **Rich job cards** — compatibility score, matched/missing skills, salary, location
- **Quick actions** — tailor your resume, generate cover letters, identify skill gaps

---

## Project Structure

```
resume-job-matcher/
├── index.html        ← Main HTML page
├── src/
│   ├── styles.css    ← All styling (dark editorial theme)
│   └── app.js        ← All logic: file handling, API calls, rendering
└── README.md
```

---

## Setup

### 1. Get an Anthropic API key

Sign up at [console.anthropic.com](https://console.anthropic.com) and create an API key.

### 2. Add your API key

The app calls the Anthropic API directly from the browser. For **local development**, you need to configure a proxy or inject the key.

**Option A — Local proxy (recommended for security)**

Use a simple Express proxy so your key stays server-side:

```bash
npm install express http-proxy-middleware cors
```

Create `proxy.js`:

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('.'));  // serve your app files

app.use('/api', createProxyMiddleware({
  target: 'https://api.anthropic.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  on: {
    proxyReq: (proxyReq) => {
      proxyReq.setHeader('x-api-key', process.env.ANTHROPIC_API_KEY);
      proxyReq.setHeader('anthropic-version', '2023-06-01');
    }
  }
}));

app.listen(3000, () => console.log('Running at http://localhost:3000'));
```

Then in `src/app.js`, change the fetch URL from:
```js
'https://api.anthropic.com/v1/messages'
```
to:
```js
'/api/v1/messages'
```
(and remove the `x-api-key` header from the fetch call)

Run with:
```bash
ANTHROPIC_API_KEY=sk-ant-... node proxy.js
```

**Option B — Direct key (dev only, never deploy)**

In `src/app.js`, add to the fetch headers:
```js
'x-api-key': 'YOUR_API_KEY_HERE',
'anthropic-version': '2023-06-01',
```

> ⚠️ Never commit or deploy with a hardcoded API key.

### 3. Run locally

With the proxy approach, open `http://localhost:3000`.

Without a proxy, open `index.html` directly in a browser (only works if your API key is set, and a CORS proxy/extension is active).

---

## Customization

| What                        | Where                              |
|-----------------------------|------------------------------------|
| Colors / theme              | CSS variables at top of `styles.css` |
| Number of job matches       | Edit the prompt in `fetchJobMatches()` in `app.js` |
| Claude model                | `model` field in `fetchJobMatches()` |
| Loading messages            | `msgs` array in `runAnalysis()` |
| Preference chip options     | HTML in `index.html` (`.chip-group` blocks) |

---

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no build tools required
- [Anthropic Claude API](https://docs.anthropic.com) (`claude-sonnet-4-20250514`)
- Google Fonts — DM Serif Display + DM Sans

---

## License

MIT
