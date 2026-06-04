# Veyra

A React + Supabase fitness app for tracking meals, macros, and training goals.

## Architecture overview

Data flows in one direction:

```
Supabase → React state → UI (derived computations)
```

- **Supabase** is the only persistence layer. All profile and meal data lives in the database.
- **React context** holds in-memory copies of fetched data for the current session. It is not a second database.
- **UI** derives grouped views, totals, and filters on demand — nothing precomputed or cached in localStorage.

There is no sync layer, no localStorage persistence for app data, and no nested "history" documents in frontend state.

## Folder structure

```
src/
├── app/
│   ├── contexts/       # React context definitions + hooks
│   ├── providers/      # Provider components that wire context to the tree
│   └── router/         # Route config, auth gates, profile gate
├── components/         # Shared UI components
├── features/           # Feature-specific UI (e.g. MealForm)
├── hooks/              # Thin hooks wrapping context (useAuth, useProfile, …)
├── lib/
│   ├── supabase.ts     # Supabase client
│   ├── meals/          # Meal row ↔ app model mappers
│   └── profile/        # Profile row ↔ app model mappers + service
├── pages/              # Route-level page components
├── services/           # Supabase CRUD (meals)
├── types/              # Shared TypeScript types
└── utils/              # Pure helpers (dates, macros, totals)
```

### Layer responsibilities

| Layer | Role |
|-------|------|
| `services/` | Supabase queries — get, create, update, delete |
| `lib/*/map*.ts` | Single place for DB row ↔ frontend model mapping |
| `providers/` | Load data on mount, expose via context |
| `hooks/` | Ergonomic access to context in components |
| `pages/` | Compose hooks and render UI |

## Data model

### `profiles` table

One row per user (keyed by auth user id).

| Column | Description |
|--------|-------------|
| `id` | Auth user UUID |
| `goal` | `build_muscle`, `lose_fat`, `increase_strength`, `stay_fit` |
| `activity_level` | Sedentary → very active |
| `training_frequency` | Sessions per week (integer) |
| `split_type` | Derived training split (`Fullbody`, `PPL_2x`, `Upper_Lower`) |
| `height_cm`, `weight_kg`, `gender`, `age` | Body stats for macro calculation |

Frontend type: `UserData` in `src/types/types.ts`.

### `meals` table

Flat list of meals — one row per meal, not grouped by day in the database.

| Column | Description |
|--------|-------------|
| `id` | UUID |
| `user_id` | Owner |
| `date` | `YYYY-MM-DD` calendar date |
| `title` | Meal name |
| `calories`, `protein`, `carbs`, `fats` | Macros |
| `created_at` | Timestamp |

Frontend type: `Meal` in `src/types/macros.types.ts`.

Daily totals and meal lists are **derived at read time** by filtering meals by `date` and summing macros — not stored as separate entities.

## Design principles

1. **No duplicated state** — profile and meals exist in Supabase; context mirrors them for the session only.
2. **No localStorage persistence** — onboarding completion is inferred from whether a profile row exists.
3. **Derived computations only** — daily macro totals, date lists, and split labels are computed, not stored.
4. **Flat data model** — meals are flat rows; grouping by date happens in the UI layer.
5. **Simple services** — each domain exposes plain async functions (`getMeals`, `createMeal`, `getProfile`, `upsertProfile`).

## How data flows

### Auth

1. `AuthProvider` calls `supabase.auth.getSession()` on mount.
2. `onAuthStateChange` keeps `user` in context.
3. `RequireAuth` redirects unauthenticated users to `/login`.
4. `ProfileGate` redirects users without a profile to `/onboarding`.

### Fetching data

1. User signs in → `ProfileProvider` calls `getProfile(userId)`.
2. Row is mapped via `fromProfileDB()` → stored in `ProfileContext`.
3. `MealDataProvider` calls `getMeals(userId)` → rows mapped via `fromMealRow()` → stored in `MealDataContext`.

### Updating data

1. Component calls a context method (e.g. `createMeal`, `setProfile` + `upsertProfile`).
2. Service writes to Supabase.
3. Context state is updated optimistically with the returned row.
4. UI re-renders with fresh data.

### Rendering UI

1. Page reads from hooks: `useProfile()`, `useMealData()`, `useMealDate()`.
2. Derived values computed inline or via context helpers:
   - `getMealsByDate(date)` — filter meals
   - `getTotalsByDate(date)` — sum macros
   - `calculateMacros(profile)` — target macros from body stats
3. Components render — no hidden sync or background persistence.

## Development

```bash
npm install
npm run dev
```

Requires `.env` with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

```bash
npm run build   # typecheck + production build
npm run lint    # ESLint
```
