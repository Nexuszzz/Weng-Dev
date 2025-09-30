# Weng Dev - AI Coding Assistant Instructions

## Project Overview
This is a React TypeScript job platform with two main sections:
- **Landing page**: Marketing site with hero, features, testimonials
- **Dashboard**: Authenticated app for job searching, tracking applications, and career tools

## Architecture & Key Patterns

### Core Tech Stack
- **React 18** + **TypeScript** + **Vite** for build
- **React Router DOM v7** for routing with nested layouts
- **Tailwind CSS** + **Radix UI** components for styling
- **Framer Motion** for animations and page transitions
- **Supabase** for backend (authentication, database)

### File Structure Convention
```
src/
├── components/           # Landing page components (Hero, Footer, etc.)
│   └── ui/              # Shadcn/ui components (Button, Card, etc.)
├── dashboard/           # Dashboard-specific code
│   ├── components/      # Dashboard components (SearchBar, JobCard)
│   └── pages/           # Dashboard routes (JobFinder, ApplicationTracker)
├── pages/               # Top-level pages (Login, Register)
├── context/             # React Context (UserContext for auth/settings)
├── lib/                 # Utilities (utils.ts with cn() helper)
└── hooks/               # Custom hooks
```

### Component Patterns

#### UI Components (shadcn/ui)
- Use `cn()` utility from `@/lib/utils` for className merging
- Follow Radix UI + CVA (Class Variance Authority) pattern:
```tsx
const buttonVariants = cva("base-classes", {
  variants: { variant: {...}, size: {...} }
});
```
- Always use `React.forwardRef` for UI components
- Support `asChild` prop with Radix Slot when applicable

#### Page Transitions
Two distinct transition patterns in `App.tsx`:
- **Default pages**: 3D perspective with blur + scale effects
- **Auth pages**: Side slide with rotation + saturation effects
```tsx
// Use Page wrapper for dashboard/landing
<Page direction="right"><Component /></Page>
// Use AuthPage wrapper for login/register  
<AuthPage direction="left"><Component /></AuthPage>
```

#### Dashboard Layout
- All dashboard routes nested under `/dashboard` with `<DashboardLayout>`
- Dashboard components use consistent gray/purple color scheme
- Search and filter components follow established patterns in `SearchBar.tsx`

### Development Workflows

#### Scripts & Commands
```bash
npm run dev          # Development server (Vite)
npm run build        # Production build
npm run lint         # ESLint check
npm run preview      # Preview production build
```

#### Path Aliases
- Use `@/` for `src/` imports (configured in `vite.config.ts`)
- Example: `import { cn } from "@/lib/utils"`

#### Styling Conventions
- Tailwind with custom dark theme colors: `bg-dark`, `surface-dark`
- Consistent spacing: `max-w-7xl mx-auto p-6` for main containers
- Use `rounded-xl` for cards, `rounded-lg` for inputs/buttons

### State Management
- **UserContext** for global user state and settings
- Includes mock login functionality for development
- TypeScript interfaces for `UserProfile` and `UserSettings`

### Integration Points
- **Supabase**: Auth and database (imported but implementation varies by component)
- **Lucide React**: Icon library (consistent across components)
- **React CountUp**: Animated statistics on landing page

## Code Quality Guidelines
- Always use TypeScript interfaces for props and data structures
- Prefer functional components with hooks over class components  
- Use consistent import order: React, third-party, local components, utilities
- Follow Indonesian language in UI text (this is an Indonesian job platform)
- Maintain responsive design patterns established in existing components

## Common Gotchas
- Framer Motion requires `AnimatePresence` wrapper for route transitions
- Dashboard routes must be nested under `/dashboard` path
- Use `useScrollToTop()` hook in `App.tsx` for route-based scrolling
- Lucide icons excluded from Vite optimizeDeps (performance optimization)