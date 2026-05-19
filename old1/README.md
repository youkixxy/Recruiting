# Xi (Shawn) Yang — Resume Suite

Interactive resume library, analysis tools, and AI-powered resume tailoring system.

## Project Structure

```
xi-resume-suite/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── src/
    ├── main.jsx           ← React entry point
    ├── App.jsx            ← Root wrapper
    └── MasterLibrary.jsx  ← Complete resume suite (3 tabs)
```

## Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Vercel

### Option A: Vercel CLI (recommended)
```bash
npm install -g vercel
npm run build
vercel
```

### Option B: GitHub → Vercel
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy

## API Key for AI Features

The "✨ B. AI精调" feature requires an Anthropic API key.

- Click **"⚙ 设置 API Key"** in the top-right corner of the app
- Enter your key (starts with `sk-ant-...`)
- The key is stored only in browser `sessionStorage` — it never leaves your browser
- The **"⚡ A. 本地分析"** feature works without any API key

## Features

- **📚 母版库** — Complete bullet library with 27 bullets, strength scores, and variant management
- **📊 分析** — Dashboard, role index, skill taxonomy, impact metrics, heat matrix
- **✨ Tailor** — Resume tailoring with 13 preset directions, local JD analysis, keyword matching, interview prep
