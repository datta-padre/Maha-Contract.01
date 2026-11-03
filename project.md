# Maha Contract — Project Structure

```text
Maha-Contarct/
├── .env
├── package.json
├── package-lock.json
├── server.js
├── src/
│   └── app.js
├── public/
│   ├── css/
│   │   └── client.css
│   └── js/
│       └── app.js
└── views/
    ├── master-admin/
    └── userView/
        ├── Footer.ejs
        ├── index.ejs
        └── Navbar.ejs
```

## What the main folders contain

- **`src/`** — Express application setup and route definitions.
- **`public/`** — Static files served by Express, including stylesheets and browser-side JavaScript.
- **`views/`** — EJS templates rendered by Express.
- **`views/userView/`** — Public landing page and its shared page fragments.
- **`views/master-admin/`** — Reserved for master-admin templates; no files are currently present.

## Key files

- **`server.js`** — Loads environment variables and starts the Express application. The port comes from `PORT`, or defaults to `1000`.
- **`src/app.js`** — Configures EJS, request-body parsing, static-file serving, and the `/` route.
- **`views/userView/index.ejs`** — Public homepage markup, including the responsive hero and dark/light theme toggle. It uses Tailwind CSS from the browser CDN.
- **`views/userView/Navbar.ejs`** — Shared document opening markup and page metadata/stylesheets.
- **`views/userView/Footer.ejs`** — Shared script include and closing document markup.
- **`public/css/client.css`** — Shared stylesheet.
- **`public/js/app.js`** — Browser-side application script.
- **`package.json`** — Project metadata, scripts, and dependencies. Run the server with `npm start`.
- **`.env`** — Local environment configuration. Keep secrets out of documentation and source control.

`node_modules/` and Git internals are omitted from this overview because they are generated or repository metadata rather than application source.
