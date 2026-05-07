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

## Active Feature Work

### `pages/emotion-strategies-toggle.html` — Atlas of the Heart Emotion Guide

This is the main interactive page. It displays 87 emotions from Brené Brown's *Atlas of the Heart* as cards; clicking a card opens a detail panel with signal, strategies, pitfall, and support sections.

**Strategy Tools feature (in progress):** Strategy items in the detail panel are tagged by type and made clickable — tapping opens a modal card with an interactive tool. See `docs/strategy-tools-plan.md` for full implementation plan.

**Already implemented (top 3 strategy types):**
- `name it` badge → "Name It" Reflection Tool
- `reframe` badge → Perspective Shift Worksheet
- `act` badge → Next Small Step Planner

**Remaining strategy types to implement:** see `docs/strategy-tools-plan.md`.

**Key implementation pattern** (for adding new tool types):
1. Add the new category key to `categorizeStrategy()` regex block
2. Add its label to `STRAT_LABELS`
3. Add its config entry (typeLabel, typeColor, title, tool) inside `openStrategyCard()`'s `cfgs` object
4. Write `buildXTool()` and `initXTool(overlay)` functions following the same pattern as the existing three
