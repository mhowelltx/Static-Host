const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const PAGES_DIR = path.join(__dirname, 'pages');

// Ensure pages directory exists
if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR);
}

// Multer configuration
const upload = multer({
  dest: PAGES_DIR,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.toLowerCase().endsWith('.html')) {
      return cb(new Error('Only .html files are allowed'));
    }
    cb(null, true);
  },
});

// Sanitize uploaded filename
function sanitizeFilename(name) {
  return name
    .replace(/[/\\]/g, '')       // strip path separators
    .replace(/\s+/g, '-')        // replace whitespace with -
    .replace(/[^a-zA-Z0-9\-_.]/g, ''); // remove disallowed chars
}

// Auto-rename on collision: foo.html → foo-1.html, foo-2.html, …
function resolveFilename(base) {
  const stem = base.replace(/\.html$/, '');
  let candidate = base;
  let i = 1;
  while (fs.existsSync(path.join(PAGES_DIR, candidate))) {
    candidate = `${stem}-${i}.html`;
    i++;
  }
  return candidate;
}

// Serve static files from pages/
app.use('/pages', express.static(PAGES_DIR));

// Auto-generated index listing all HTML files in pages/
app.get('/', (req, res) => {
  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html'));
  const error = req.query.error || '';

  const links = files.length
    ? files
        .map(f => `    <li><a href="/pages/${f}">${f.replace('.html', '')}</a></li>`)
        .join('\n')
    : '    <li><em>No pages uploaded yet.</em></li>';

  const errorHtml = error
    ? `  <p class="error">${error.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`
    : '';

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
    .error { color: #cc0000; font-size: 0.9rem; margin: 0.5rem 0; }
    .upload-section { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #ddd; }
    .upload-section h2 { font-size: 1rem; margin-bottom: 0.75rem; color: #444; }
    .upload-form { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .upload-form input[type="file"] { font-size: 0.9rem; color: #333; }
    .upload-form button {
      padding: 0.35rem 0.9rem;
      font-size: 0.9rem;
      font-family: system-ui, sans-serif;
      background: #0066cc;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .upload-form button:hover { background: #0052a3; }
  </style>
</head>
<body>
  <h1>Hosted Pages</h1>
  <ul>
${links}
  </ul>
${errorHtml}
  <div class="upload-section">
    <h2>Upload a page</h2>
    <form class="upload-form" action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="htmlfile" accept=".html">
      <button type="submit">Upload</button>
    </form>
  </div>
</body>
</html>`);
});

// Upload endpoint
app.post('/upload', (req, res) => {
  upload.single('htmlfile')(req, res, (err) => {
    if (err) {
      return res.redirect(`/?error=${encodeURIComponent(err.message)}`);
    }

    if (!req.file) {
      return res.redirect('/?error=No+file+received');
    }

    const tempPath = req.file.path;

    // Sanitize filename
    let name = sanitizeFilename(req.file.originalname);

    // Ensure it ends in .html
    if (!name.endsWith('.html')) {
      name = name + '.html';
    }

    // Reject empty or bare ".html" names
    const stem = name.replace(/\.html$/, '');
    if (!stem) {
      fs.unlink(tempPath, () => {});
      return res.redirect('/?error=Invalid+filename');
    }

    const finalName = resolveFilename(name);
    const finalPath = path.join(PAGES_DIR, finalName);

    fs.rename(tempPath, finalPath, (renameErr) => {
      if (renameErr) {
        fs.unlink(tempPath, () => {});
        return res.redirect(`/?error=${encodeURIComponent('Failed to save file')}`);
      }
      res.redirect('/');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
