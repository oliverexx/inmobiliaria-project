# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Root (Turborepo)
```bash
npm run dev          # Start all apps in dev mode
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run type-check   # Type-check all apps
npm run format       # Format all TS/TSX/MD with Prettier
```

### Web App (`apps/web`)
```bash
# Run from root or apps/web
cd apps/web

npm run dev          # Next.js dev with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript (no emit)

# Database
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Push schema to DB
npm run db:seed      # Seed database (tsx src/db/seed.ts)
```

### Database setup
```bash
docker-compose up -d   # Start local Postgres (port 5433)
```

Create `apps/web/.env.local`:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/calzada_inmobiliaria
JWT_SECRET=your-secret-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Architecture

This is a **Turborepo monorepo** with a single Next.js 16 fullstack application.

### Packages
- `apps/web` — the main Next.js 16 app (React 19, Tailwind CSS 4, Turbopack)
- `packages/config` — shared constants: agency info, WhatsApp helpers, label maps (`OPERATION_LABELS`, `PROPERTY_TYPE_LABELS`, etc.), city list
- `packages/tsconfig` — shared TypeScript configs
- `packages/ui` — (stub, unused)
- `legacy/` — old Django + Vite frontend (ignore)
- `backend/` — old Django REST API skeleton (ignore)

### Database Layer (`apps/web/src/db/`)
- **ORM**: Drizzle ORM with `drizzle-orm/node-postgres`
- **Schema** (`schema.ts`): `users`, `categories`, `tags`, `properties`, `property_tags` (junction), `inquiries`
- **Connection** (`index.ts`): lazy singleton via `getDb()`; exported `db` is a Proxy that throws if `DATABASE_URL` is unset
- **Queries** (`src/lib/queries.ts`): all DB query functions live here — `getProperties()`, `getPropertyBySlug()`, `getFeaturedProperties()`, `getRelatedProperties()`, `incrementViews()`, `getPropertyStats()`, `createInquiry()`

Key schema notes:
- `properties.operation`: `'sale'` | `'rent'`
- `properties.status`: `'draft'` | `'published'` | `'sold'` | `'rented'`
- `properties.rentalPrices`: JSONB with optional `daily/weekly/monthly/longTerm` prices
- `properties.gallery`: JSONB `string[]` of image URLs
- `properties.gpsLocation`: `"lat,lng"` string for map display

### Auth (`src/lib/auth.ts`, `middleware.ts`)
- Custom JWT auth using `jose` (HS256, 7-day expiry), stored in `calzada-session` cookie
- bcryptjs for password hashing
- `middleware.ts` protects `/admin/*` and `/api/admin/*` routes — redirects to `/admin/login` if unauthenticated or role !== `"admin"`
- `getSession()` reads and verifies the JWT from cookies (server-side only)

### App Routes (`src/app/`)
- `/` — homepage with hero, featured properties, testimonials
- `/propiedades` — property listing with filters + pagination (ISR, revalidate: 60s)
- `/propiedad/[slug]` — property detail page (ISR, revalidate: 60s, pre-generates slugs at build)
- `/favoritos` — client-side favorites page (reads IDs from localStorage, fetches from `/api/favorites`)
- `/comparar` — property comparison page (up to 4 properties, state via localStorage)
- `/nosotros` — about page
- `/admin` — admin dashboard (protected by middleware + layout double-check)
- `/admin/propiedades` — property management CRUD
- `/admin/consultas` — inquiry management

### API Routes (`src/app/api/`)
- `GET /api/favorites?ids[]=1&ids[]=2` — fetch full property data for favorited IDs
- `POST /api/inquiries` — submit inquiry form
- `/api/auth/*` — login/logout (creates/clears JWT cookie)

### Client State
- **Favorites**: `useFavorites` hook — IDs in localStorage key `calzada-favorites`; cross-tab sync via `favorites-updated` custom event
- **Compare**: `useCompare` hook — full `PropertyWithTags` objects in localStorage key `calzada_compare_list`; max 4 items; floating badge (`CompareFloatingBadge`) rendered in root layout

### Key Conventions
- All DB queries only return `status = 'published'` AND `isAvailable = true` properties
- `@calzada/config` is imported for all business constants (agency info, label maps, WhatsApp URL builder)
- Path alias `@/` maps to `src/`
- Pages use `async/await` Server Components; client interactivity in separate `*Client.tsx` files or `"use client"` components
- Images: only `images.unsplash.com` is whitelisted in `next.config.ts`
- Leaflet map is loaded lazily (`dynamic(() => import(...), { ssr: false })`) to avoid SSR issues
