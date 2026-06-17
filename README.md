# Project (PHP + MySQL version, for Hostinger Premium Web Hosting)

This is the original React/Vite frontend (same look and pages), with
PocketBase removed and replaced by a small PHP + MySQL API in `/api`.
This is built to run on Hostinger Premium Web Hosting (static files +
PHP + MySQL, no Node.js, no VPS).

## Project layout

```
src/            React app source (unchanged look/pages)
public/         Static assets + .htaccess (SPA routing)
api/            PHP API endpoints (login, signup, contact form, uploads)
uploads/        Where uploaded files are stored (created automatically)
sql/schema.sql  Run once to create the MySQL tables
```

After `npm run build`, Vite outputs a `dist/` folder. The final thing you
upload to Hostinger is: the **contents** of `dist/`, plus the `api/`
folder, plus the `uploads/` folder, all placed together inside
`public_html/`.

```
public_html/
├── index.html          <- from dist/
├── assets/              <- from dist/
├── .htaccess            <- from dist/ (came from public/.htaccess)
├── api/                  <- copy as-is
│   ├── config.php        <- you create this, see below
│   ├── ...
└── uploads/              <- copy as-is (empty folder + .htaccess)
```

## 1. Local setup

```bash
npm install
npm run dev
```

This runs the frontend only (Vite dev server on :3000). API calls to
`/api/...` will fail locally unless you also run PHP. Two options:

- **Quick check**: run `php -S localhost:8000 -t api` in a second
  terminal, and temporarily change `API_BASE` in
  `src/lib/apiClient.js` to `http://localhost:8000`. Remember to
  enable Remote MySQL (step 3) so this local PHP can reach your
  Hostinger database, OR install MySQL locally and point `api/config.php`
  at it.
- **Simplest for a beginner**: just build (`npm run build`) and upload
  to Hostinger to test, since that's where PHP actually runs anyway

## 2. Create the database (hPanel)

1. hPanel → **Databases → MySQL Databases** → create a new database
   and a database user. Hostinger will show you the database name,
   username, and host (usually `localhost`).
2. Copy `api/config.example.php` to `api/config.php` and fill in those
   four values.
3. Open **phpMyAdmin** (linked from the same page), select your new
   database, go to the **SQL** tab, and paste in the contents of
   `sql/schema.sql`, then run it. This creates the `users`, `contacts`,
   and `uploads` tables.

## 3. (Optional) Enable Remote MySQL for TablePlus

hPanel → **Databases → Remote MySQL** → add your current IP address.
Then in TablePlus, connect using the same host/database/user/password
from `api/config.php` (the host will be your server's IP or hostname,
not `localhost`, when connecting remotely — hPanel shows you the right
value).

## 4. Build and deploy

```bash
npm run build
```

Upload via hPanel **File Manager** or FTP:

- Everything inside `dist/` → into `public_html/` (so `index.html` sits
  directly in `public_html/`
- The `api/` folder (with your filled-in `config.php`) → `public_html/api/`
- The `uploads/` folder (with its `.htaccess`) → `public_html/uploads/`
  (PHP will create files in here; just make sure the folder exists and
  is writable)

## 5. PHP version & upload limits

hPanel → **Advanced → PHP Configuration**:

- Set PHP version to 8.x
- If the 20MB upload limit causes errors, raise `upload_max_filesize`
  and `post_max_size` to at least `25M`

## How auth works now

- PocketBase's token-based auth is replaced with PHP **sessions**
  (a cookie). `api/login.php` and `api/signup.php` start a session;
  `api/me.php` checks it on page load to restore `currentUser`;
  `api/logout.php` destroys it.
- Passwords are hashed with PHP's built-in `password_hash()` /
  `password_verify()` (bcrypt) — never stored in plain text.

## What changed from the original PocketBase version

| Feature | Before (PocketBase) | Now (PHP + MySQL) |
|---|---|---|
| Login/signup | `pb.collection('users').authWithPassword(...)` | `POST /api/login.php`, `/api/signup.php`, session cookie |
| Contact form | `pb.collection('contacts').create(...)` | `POST /api/contact.php` |
| Upload list | `pb.collection('uploads').getList(...)` | `GET /api/uploads.php` |
| Upload file | `pb.collection('uploads').create(formData)` | `POST /api/uploads.php` (multipart) |
| Delete upload | `pb.collection('uploads').delete(id)` | `DELETE /api/uploads.php?id=...` |
| File URL | `pb.files.getURL(record, record.file)` | `/uploads/<filename>` |

## Removed from the original export

- `apps/pocketbase/` (PocketBase server + SQLite database)
- `apps/web/plugins/` (Hostinger Horizons visual editor + PocketBase
  auth proxy — specific to their builder, not needed here)
- `apps/web/tools/` (Horizons build helpers)
- Root monorepo `package.json` / `package-lock.json` / `.version`
- `src/lib/pocketbaseClient.js`
