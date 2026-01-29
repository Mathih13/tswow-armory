# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

tswow-armory is a full-stack TypeScript application built with TanStack Start (React 19 + TanStack Router + Nitro server). It uses file-based routing with SSR support, Prisma ORM with MariaDB, and Tailwind CSS v4 for styling.

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests (Vitest)
npm run lint         # ESLint
npm run format       # Prettier formatting
npm run check        # Format + lint fix

# Database (Prisma with MariaDB)
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio GUI
npm run db:seed      # Seed database (tsx prisma/seed.ts)
```

## Architecture

**Routing**: TanStack Router with file-based routing in `src/routes/`. Route tree is auto-generated to `src/routeTree.gen.ts` — never edit this file manually.

**Server functions**: Defined with `createServerFn()` from `@tanstack/react-start`. These run on the server and can be called directly from client components with full type safety. Input validation via `inputValidator()`.

**API routes**: Files using `.api` suffix or `createFileRoute().server` pattern in `src/routes/`, powered by Nitro.

**Database**: Prisma client singleton in `src/db.ts` using `@prisma/adapter-mariadb`. Schema lives in `prisma/schema.prisma`, generated client outputs to `src/generated/prisma`. Requires `DATABASE_URL` env var (see `.env.local`).

**Path alias**: `@/` maps to `./src/` (configured in both vite.config.ts and tsconfig.json).

## Code Style

- No semicolons, single quotes, trailing commas (Prettier config)
- Strict TypeScript (strict mode + strict lint rules, ES2022 target)
- TanStack ESLint config
- Tailwind CSS utility classes for all styling
- Lucide React for icons
