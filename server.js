const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PAGES_DIR = path.join(__dirname, 'pages');

// Ensure pages directory exists
if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR);
}

// Serve static files from pages/
app.use('/pages', express.static(PAGES_DIR));

// Auto-generated index listing all HTML files in pages/
app.get('/', (req, res) => {
  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html'));

  const links = files.length
    ? files
        .map(f => `    <li><a href="/pages/${f}">${f.replace('.html', '')}</a></li>`)
        .join('\n')
    : '    <li><em>No pages uploaded yet.</em></li>';

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Static Pages</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 60px auto; padding: 0 20px; color: #222; }
    h1 { font-size: 1.4rem; margin-bottom: 1rem; }
    ul { padding-left: 1.2rem; }
    li { margin: 0.4rem 0; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    em { color: #888; }
  </style>
</head>
<body>
  <h1>Hosted Pages</h1>
  <ul>
${links}
  </ul>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
