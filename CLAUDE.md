# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install   # Install dependencies
npm start     # Start server (PORT env var or default 3000)
```

There are no test, lint, or build steps — the project runs plain JavaScript with no compilation.

## Architecture

**Static-Host** is a minimal Express server that serves static HTML pages from a `pages/` directory with an auto-generated index.

**`server.js`** is the entire backend (~55 lines):
- Reads `PORT` from environment (Railway sets this in production)
- Serves files in `pages/` as static assets under `/pages/*`
- GET `/` dynamically scans `pages/` and returns an HTML index of all `.html` files
- Creates `pages/` if it doesn't exist on startup

**`pages/`** holds standalone HTML files — each file is a self-contained page with embedded CSS and JavaScript. Adding a new `.html` file here automatically makes it appear on the index.

The only production dependency is `express`. There is no bundler, transpiler, database, or middleware beyond Express's built-in static file serving.
