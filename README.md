# Dubbadhu site

Marketing and waitlist site for **Dubbadhu** — an iOS-focused language-learning product from Afaan LLC, starting with **Afaan Oromo** and growing toward more languages of the Horn and beyond.

This repo is a static **Vite + React** front end: hero, about/mission copy, an interactive **East Africa language map** (Oromo, Amharic, Tigrinya), and Supabase-backed **waitlist** signups.

## Requirements

- **Node.js** 18+ (20 LTS recommended)
- **npm** 9+

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set your Supabase values (see below). Vite only reads variables prefixed with `VITE_`.

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Local dev server (with HMR)  |
| `npm run build`| Production build → `dist/`   |
| `npm run preview` | Serve `dist/` locally     |

## Environment variables

Copy `.env.example` to `.env`. Required for waitlist RPC calls in the browser:

- **`VITE_SUPABASE_URL`** — Supabase project URL  
- **`VITE_SUPABASE_ANON_KEY`** — public anon key (safe in client bundles)

Optional:

- **`VITE_WAITLIST_IOS_LANGUAGE`** — value stored as `language` for the main site waitlist (default in code if unset)

Waitlist flows use the **`check_and_join_waitlist`** RPC and **`waitlist_signups`** table; configure the same project you use for the mobile app if you want unified signups.

## Deploying

`npm run build` emits static assets under **`dist/`**. Host on any static host (Netlify, Vercel, Cloudflare Pages, S3+CDN, etc.) and inject **`VITE_*`** env vars **at build time** — Vite inlines them; setting secrets only on the server after build will not fix a broken client bundle.

## License

Private / all rights reserved — **© Afaan LLC** (see site footer).
