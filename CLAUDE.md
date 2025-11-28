# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BDC Landing - A Next.js 16 landing page and admin dashboard for a motorcycle parts (repuestos) and motocargueros catalog. Built with React 19, Tailwind CSS 4, and shadcn/ui components.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Architecture

### Next.js App Router Structure

```
src/app/
├── layout.tsx           # Root layout with Geist fonts
├── page.tsx             # Landing page (public)
├── globals.css          # Design tokens and animations
└── dashboard/           # Admin section
    ├── page.tsx         # Dashboard overview
    ├── repuestos/       # Spare parts management
    ├── motocargueros/   # Cargo motorcycles management
    └── gallery/         # Image gallery management
```

### Component Organization

- `src/components/ui/` - shadcn/ui primitives (Radix-based)
- `src/components/gallery/` - Landing page components with barrel export (`index.ts`)
- `src/components/` - Dashboard components (AppSidebar, SiteHeader, nav components)

### Key Patterns

**Landing Page** (`src/app/page.tsx`): Static product data defined inline, renders Header → Hero → ProductTabs → Footer + WhatsAppButton

**Dashboard Pages**: Each uses the SidebarProvider/SidebarInset layout pattern:
```tsx
<SidebarProvider>
  <AppSidebar variant="inset" />
  <SidebarInset>
    <SiteHeader />
    {/* page content */}
  </SidebarInset>
</SidebarProvider>
```

### Path Aliases

`@/` resolves to `./src/` (configured in tsconfig.json)

## Styling

- Tailwind CSS 4 with `tw-animate-css` for animations
- CSS custom properties for theming in `globals.css`
- Dark theme by default (blue/white/black color scheme)
- Primary color: `hsl(217 91% 60%)` (blue)
- Use `cn()` from `@/lib/utils` for conditional class merging

### Custom Animation Classes

Available in globals.css: `fade-in`, `fade-in-up`, `fade-in-down`, `fade-in-left`, `fade-in-right`, `slide-up`, `scale-in`, `float-animation`, `pulse-glow`, `hover-lift`, `gradient-text`

Delay utilities: `delay-100` through `delay-600`

## Supabase

### Client Setup

```
src/utils/supabase/
├── client.ts      # Browser client (Client Components)
├── server.ts      # Server client (Server Components, Route Handlers)
└── middleware.ts  # Session refresh logic
```

**Usage in Server Components:**
```tsx
import { createClient } from "@/utils/supabase/server"
const supabase = await createClient()
```

**Usage in Client Components:**
```tsx
import { createClient } from "@/utils/supabase/client"
const supabase = createClient()
```

### Types

Database types are in `src/types/database.types.ts`. Regenerate with:
```bash
npx supabase gen types typescript --project-id rerrvvixmnnsoqksjxti > src/types/database.types.ts
```

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Configuration

- React Compiler enabled (`reactCompiler: true` in next.config.ts)
- TypeScript strict mode enabled
- Geist and Geist Mono fonts via next/font
- Supabase SSR middleware for auth session refresh
