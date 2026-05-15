# Static-Host

A minimal Express server that hosts static HTML pages with a built-in upload interface.

## What it does

- Serves `.html` files from a `pages/` directory at `/pages/<filename>`
- Displays an auto-generated index at `/` listing all hosted pages
- Provides an upload form on the index page so anyone can add new pages without needing server access

Uploading a file makes it instantly accessible — no restart or configuration needed.

## Usage

```bash
npm install
npm start        # listens on PORT env var, defaults to 3000
```

Visit `http://localhost:3000` to see the page index and upload form.

## Uploading pages

Use the form at the bottom of the index page to upload any `.html` file (5 MB limit). The file is saved to `pages/` and immediately appears in the index. If a file with the same name already exists, the upload is saved with a numeric suffix (e.g. `page-1.html`).

Filenames are sanitized on upload: path separators and special characters are stripped, whitespace becomes `-`.

## Notes

- No authentication — anyone who can reach the server can upload pages
- Uploaded HTML runs as-is in the browser, including any embedded scripts
- Deployed on [Railway](https://railway.app); the `PORT` environment variable is set automatically there
