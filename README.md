# Sevmeta

Sevmeta is the portfolio of SEV (Simon Emenike), showcasing digital products,
Web3 and AI projects, and services for businesses and builders.

**Live site:** [sevmeta.xyz](https://sevmeta.xyz)

## What’s inside

- Portfolio sections for projects, skills, communities, and the creator
- Website-as-a-service information and inquiry page
- Product and community links, blog, and profile pages
- English and French translations
- Light and dark themes
- Responsive layouts for desktop and mobile

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints a local URL in the terminal when the development server is ready.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Check the code with ESLint |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Integrations

Some features use Supabase and Formspree. Configure the project credentials and
provider settings for your own deployment before enabling those features.
Never commit private credentials; use public client-side keys only where the
provider explicitly supports them.

## Project structure

- `src/components/` — page sections and reusable interface components
- `src/lib/` — shared utilities and internationalization
- `src/App.jsx` — application routes and page composition
- `src/main.jsx` — application entry point
