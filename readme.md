# Save to Shiori (Chrome Extension)

A Chrome (MV3) extension that lets you save the current page to your self-hosted **Shiori** instance with optional tags.

This project aims to be a simple “Save” tool first, and a full Shiori companion later (search/browse, tag suggestions, etc.).

This is a presonal project, it is mainly vibe coded. I use Brave as my main browser and i needed a plugin to to access and create 
bookmarks for my local instance of Shiori.

---

## Status

**Working (MVP):**
- Login via Shiori JWT
- Save current tab URL with tags

**In progress / planned:**
- Auto page title extraction
- Tag suggestions / autocomplete
- Dark mode UI
- Browse/search your Shiori bookmarks from the extension

---

## Requirements

- **Shiori**: tested with **v1.8.0**
- A reachable Shiori server URL from the machine running Chrome, e.g.:
  - `http://192.168.0.45:3000`
  - `https://shiori.yourdomain.com`

---

## How it works (API)

The extension uses a hybrid approach that matches what works reliably with Shiori 1.8.x:

### 1) Login (JWT)
- `POST /api/v1/auth/login`
- Stores the returned JWT token locally

### 2) Create bookmark
- `POST /api/bookmarks`
- Sends:
  - `Authorization: Bearer <JWT>`
  - `X-Shiori-Response-Format: json`
  - `Content-Type: application/json`

Tags must be sent as objects:
```json
"tags": [{ "name": "tag1" }, { "name": "tag2" }]
