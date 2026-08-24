> **Applicability note (read this first)**
>
> This AGENTS.md was written by the frontend engineering team for **`cortes-webapp`** — the production Pandai Gadai Customer App (Expo + React Native: Expo Router, `StyleSheet.create`, Jotai, React Hook Form + Zod, axios via `src/apis/`).
>
> **This folder (`prototypes/mobile-app`) is a different project**: a Vite + React 19 + React Router + Tailwind CSS design/click-through prototype (static mock data, no backend, no auth, includes a dev-only `InspectOverlay`/`InspectPanel` QA tool). It is not built on Expo/React Native, and is not meant to be shipped — it exists to demo flows and hand off UI/UX to engineering.
>
> Because the stacks differ, only the **stack-agnostic conventions** below were applied here, without changing tooling or visual output:
> - `screens/<Feature>/index.tsx` + `components/` folder organization
> - `I`-prefixed interfaces/type aliases
> - Import grouping (React → third-party → local)
> - One component per file, PascalCase components, `I`-prefixed prop types
>
> **Deliberately NOT applied** (would require a framework migration and/or change visual output, which was explicitly out of scope):
> - Tailwind → `StyleSheet.create` (this is a React Native API; doesn't run in this Vite/web-only setup without `react-native-web`)
> - `react-router-dom` → Expo Router (Expo Router only exists inside an Expo project; this is a plain Vite app)
> - Jotai / React Hook Form + Zod / axios `src/apis/` (no cross-screen global state, real forms, or backend calls exist in this prototype to justify them)
>
> When this design gets implemented in `cortes-webapp` for real, the actual conventions below should be followed as-is.

---

# AGENTS.md - AI Coding Agent Instructions

This document provides context and instructions for AI coding agents working on the **Pandai Gadai Customer App** (internal repo name `cortes-webapp`).

## Project Overview

**Pandai Gadai Customer App** is a customer-facing, cross-platform (iOS, Android, Web) app for a gold-pawn/loan (_gadai_) fintech product, built with Expo and React Native. It handles the end-to-end customer journey: authentication, home dashboard, loan (pawn) simulation and management, PPOB bill payments, PandaiPoint/gold points, payment links, withdrawals, missions/rewards, and NPS surveys. The web build also serves a marketing "reward"/app-download landing page.

Web is statically exported (`expo export -p web`) and served by a small Express server (`server.js`), deployed separately from the native apps.

## Technology Stack

### Core Framework

- **Expo 53** (with **Expo Router** for file-based routing) — used for both native and web
- **React Native 0.79.6**, **React 19**
- **TypeScript** (`strict: true`)

### State Management & Data Fetching

- **Jotai** — the only global/client state library used (no Redux, no Zustand)
- **`@tanstack/react-query` v4** — server state, caching, data fetching (a legacy `react-query` v3 dependency still exists in `package.json`; do not use it for new code)
- **React Hook Form** — form state and validation
- **Zod** — schema validation and type inference for forms/API payloads

### Styling & UI

- **`StyleSheet.create`** — the actual, dominant styling convention (used across 246+ files)
- **NativeWind v4 / Tailwind** — installed and configured (`tailwind.config.js`, `nativewind-env.d.ts`) but **not adopted** — only a single file in the repo uses `className`. Treat this as present-but-unused scaffolding, not the convention to follow.
- Design tokens live in `src/utils/design-token.ts` (see also `src/screens/DesignToken/`) — use these instead of hardcoded colors/spacing/typography.

### Additional Libraries

- **Axios** — HTTP client, wrapped in `src/apis/index.ts` (interceptors, `get/post/put/del` helpers)
- **react-native-mmkv** — local storage
- **Sentry**, **Firebase**, **Mixpanel**, **MoEngage**, **Facebook SDK**, **react-ga4** — monitoring/analytics
- **Jest + jest-expo + react-test-renderer** — configured (`yarn test`), but there are currently **no test files** in the repo

## Project Structure

```
cortes-webapp/
├── src/
│   ├── pages/                   # Expo Router pages (file-based routing)
│   │   ├── _layout.tsx          # Root layout
│   │   ├── (protected)/         # Auth-gated route group
│   │   ├── (tabs)/              # Tab navigator route group
│   │   ├── +not-found.tsx
│   │   └── +html.tsx            # Web HTML shell
│   │
│   ├── screens/                  # Feature modules (business logic + UI)
│   │   ├── Auth/
│   │   │   ├── index.tsx        # Main screen component
│   │   │   ├── components/      # Screen-local sub-components
│   │   │   ├── atom.ts          # Feature-scoped Jotai state
│   │   │   └── types.ts         # Feature-specific types (or type.ts — both spellings exist)
│   │   └── [Feature]/...        # Loan, PPOB, PandaiPoint, Simulasi, Profile, Verification, ...
│   │
│   ├── components/               # Reusable, feature-agnostic UI
│   │   ├── ComponentName.tsx    # Flat form
│   │   └── ComponentName/       # Folder form (has index.tsx + its own components/)
│   │
│   ├── apis/                     # API service layer
│   │   ├── index.ts             # Axios client, interceptors, get/post/put/del helpers
│   │   ├── auth.ts               # Auth API calls
│   │   ├── loan.ts               # Loan API calls
│   │   └── [domain].ts           # One file per backend domain
│   │
│   ├── hooks/                    # Global custom hooks (useX.ts, .web.ts overrides)
│   ├── utils/                     # Utilities + per-integration subfolders
│   │   ├── jotai/atom/           # Global Jotai atoms (session.ts, ui.ts, user.ts)
│   │   ├── design-token.ts
│   │   ├── date-helpers.ts
│   │   └── analytics/ | mixpanel/ | moengage/ | firebase-analytics/
│   ├── constants/                 # App-wide constants
│   ├── env/                       # Env-related config
│   ├── assets/                    # Fonts, icons, images
│   └── scripts/                   # Build/misc scripts (excluded from eslint)
│
├── server.js                     # Express server: serves web export + proxies HMAC-signed endpoints
├── app.json / eas.json            # Expo app config + native build profiles
└── Dockerfile / buildspec.yml     # Web CI/CD (ECR/ECS/CodeDeploy)
```

**Key pattern**: `pages/` is thin and route-only (Expo Router convention); `screens/` holds the actual UI and business logic. A route file should just import and render its corresponding screen — do not put logic directly in `pages/`.

## Development Guidelines

### 1. Code Style & Conventions

#### TypeScript

- **Strict mode is enabled** — no implicit `any`, keep it passing
- Interfaces and type aliases both use the **`I` prefix** (e.g. `IAuthData`, `ITncConfig`) — this is applied by convention, not tied to the `interface`/`type` keyword
- Unused variables must be prefixed with `_` to satisfy ESLint (`no-unused-vars`)

#### Naming Conventions

- **Component files**: PascalCase, flat (`Text.tsx`) or folder-with-`index.tsx` (`Header/index.tsx`) when it has sub-parts
- **Screen folders**: PascalCase per feature, `index.tsx` as the main screen (`screens/Loan/index.tsx`)
- **Hooks**: camelCase `useX.ts` (`useBalance.ts`), with `.web.ts` suffix for web-specific overrides (`useColorScheme.web.ts`)
- **Interfaces/types**: `I` prefix (`IAuthData`, `IBannerRes`)
- **API files**: lowercase, one per backend domain, exporting a `const XxxAPI = { ... }` object (`src/apis/loan.ts` → `LoanAPI`)
- **Feature-local types**: `type.ts` or `types.ts` — both spellings exist in the codebase; match whatever the feature folder already uses
- **Jotai atom files**: `atom.ts` (feature-local) or grouped by domain under `utils/jotai/atom/` (global)
- **Route files**: Expo Router conventions — `_layout.tsx`, `+not-found.tsx`, `[id].tsx`, `(group)/`, `.web.tsx` platform overrides

#### File Organization

- One component per file
- Default export for the primary component
- Group imports: React → third-party → local (`@src/...` alias)

#### Example

```tsx
// src/screens/Loan/components/LoanCard.tsx

// 1. Import order: React → third-party → local
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { LoanAPI } from "@src/apis/loan";
import { ThemedText } from "@src/components/ThemedText";

// 2. `I`-prefixed interface for props/data shapes
interface ILoanCardProps {
  loanId: string;
  isHighlighted?: boolean;
  onPress?: () => void;
}

// 3. PascalCase component, default export
export default function LoanCard({
  loanId,
  isHighlighted = false,
  onPress,
}: ILoanCardProps) {
  // 4. React Query for server state, camelCase queryKey
  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", loanId],
    queryFn: () => LoanAPI.getLoanById(loanId),
  });

  // 5. Early returns for loading/empty states
  if (isLoading) return <ThemedText>Loading...</ThemedText>;
  if (!loan) return null;

  return (
    <Pressable onPress={onPress}>
      {/* 6. StyleSheet, not NativeWind className */}
      <View style={[styles.container, isHighlighted && styles.highlighted]}>
        <ThemedText style={styles.title}>{loan.customerName}</ThemedText>
      </View>
    </Pressable>
  );
}

// 7. Styles at the bottom of the file
const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 8, backgroundColor: "#fff" },
  highlighted: { borderColor: "#2563eb", borderWidth: 1 },
  title: { fontSize: 16, fontWeight: "600" },
});
```

### 2. Styling

**Use `StyleSheet.create`, not Tailwind/NativeWind:**

```tsx
// ✅ Good — matches the existing convention
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
});
<View style={styles.container} />

// ❌ Avoid — NativeWind is installed but not adopted (1 file uses it in the whole repo)
<View className="flex-1 p-4 bg-white" />
```

Use `src/utils/design-token.ts` for colors, spacing, and typography values instead of hardcoding them.

### 3. Forms & Validation

**Use React Hook Form + Zod for all forms.** Reference implementation: `src/screens/Simulasi/Gadai/GadaiBPKB/` (currently the only feature with a zod-validated form — follow its layout for any new form).

**Where schemas live:** a sibling `schema.ts` file next to the screen's `index.tsx` — not inline in the component, and not mixed into `type.ts`/`types.ts` (those stay pure-TS, see below).

**Naming:**

- Schema constants: `camelCase` + `Schema` suffix, scoped to what they validate (`personalDataSchema`, `itemInformationDataSchema`), composed into one top-level form schema (`formBPKBSchema`)
- Inferred types: `z.infer<typeof schema>`, exported with a `Type` suffix for form schemas (`BPKBFormType`); response-shaped schemas (see below) infer to a plain descriptive noun instead (`VehicleList`, `Pagination`)

```ts
// src/screens/<Feature>/schema.ts
import { z } from "zod";

export const personalDataSchema = z.object({
  full_name: z
    .string()
    .min(1, "Nama wajib diisi")
    .regex(/^[A-Za-z\s]+$/, "..."),
  phone_number: z.string().regex(/^08\d{7,}$/, { message: "..." }),
  domicile: z.string().min(1, "Domisili wajib diisi"),
});

export const formBPKBSchema = z.object({
  personal: personalDataSchema,
  item_information: itemInformationDataSchema,
});

export type BPKBFormType = z.infer<typeof formBPKBSchema>;
```

```tsx
// src/screens/<Feature>/index.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { BPKBFormType, formBPKBSchema } from "./schema";

const methods = useForm<BPKBFormType>({
  resolver: zodResolver(formBPKBSchema) as Resolver<BPKBFormType>,
});
```

The `as Resolver<BPKBFormType>` cast is a known workaround used in the existing implementation for a `zodResolver`/`useForm` generic mismatch — carry it over rather than fighting the types differently in new forms, unless you've confirmed a cleaner fix.

There is currently **no shared/reusable zod validator module** (e.g. for phone numbers, NIK, currency) — regexes are defined inline per schema. If the same validation starts repeating across features, extracting one is reasonable, but don't assume one already exists.

### 4. Data Fetching & State Management

**Use `@tanstack/react-query` for server state** (not the legacy `react-query` v3 dependency):

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoanAPI } from "@src/apis/loan";

const { data, isLoading } = useQuery({
  queryKey: ["loans", filters],
  queryFn: () => LoanAPI.getLoans(filters),
});
```

**Use Jotai for client/global state:**

```tsx
import { atom, useAtom } from "jotai";

// src/utils/jotai/atom/user.ts — global atom
export const userAtom = atom<IUser | null>(null);

// screens/Auth/atom.ts — feature-local atom
export const otpStepAtom = atom(0);
```

**State decision guide:**

- Server state (API data) → React Query
- Cross-app state (session, user, ui) → global Jotai atoms in `src/utils/jotai/atom/`
- Feature-only state → local `atom.ts` inside the feature's `screens/<Feature>/` folder
- Form state → React Hook Form
- Purely local component state → `useState`

### 5. API Services

**All API calls live in `src/apis/`, one file per backend domain:**

```tsx
// src/apis/loan.ts
import { get, post } from "./index";

export const LoanAPI = {
  async getLoanById(id: string): Promise<ILoanDetail> {
    return get(`/loans/${id}`);
  },
  async createLoan(payload: ICreateLoanPayload): Promise<ILoan> {
    return post("/loans", payload);
  },
};
```

**Guidelines:**

- Use `async`/`await`, not `.then()`/`.catch()`
- Go through the shared `get/post/put/del` helpers in `src/apis/index.ts` — don't call `axios` directly from screens/components, so interceptors and auth headers stay centralized
- Return typed data (`I`-prefixed interfaces)

**Request/response schemas.** Most of `src/apis/` today is hand-written `interface`s (not zod), consistently `I`-prefixed (`IUserData`, `IWithdrawReq`, `IWithdrawResponse`; a few older names skip the prefix, e.g. `RequestOTPResponse` in `auth.ts` — prefer `I`-prefixed for anything new), with no runtime validation of what the backend actually returns. Every response is wrapped by the shared envelope defined once in `src/apis/index.ts`:

```ts
// src/apis/index.ts
export interface APIResponse<TData> {
  header: {
    server_time_ms: number;
    process_time_ms: number;
    request_id: string;
  };
  data: TData;
  error?: APIError;
}
```

**Prefer defining a zod schema for the response and validating it with `safeParse`**, the way `src/screens/Simulasi/Gadai/GadaiBPKB/schema.ts` already does (`vehicleListResSchema`, `vehicleItemResSchema`, consumed via their inferred types `VehicleList`/`List`). Don't trust the backend contract at compile-time-only anymore for new/touched endpoints:

```ts
// src/apis/loan.ts
import { z } from "zod";
import { get } from "./index";

const loanDetailResSchema = z.object({
  id: z.string(),
  status: z.enum(["active", "paid_off", "overdue"]),
  outstanding_amount: z.number(),
});

export type LoanDetail = z.infer<typeof loanDetailResSchema>;

export const LoanAPI = {
  async getLoanById(id: string): Promise<LoanDetail> {
    const response = await get(`/loans/${id}`);
    const parsed = loanDetailResSchema.safeParse(response.data.data);
    if (!parsed.success) throw parsed.error;
    return parsed.data;
  },
};
```

Existing `src/apis/*.ts` files that still use plain `I`-prefixed interfaces without `safeParse` aren't wrong to reference for style, but don't copy the "no runtime validation" part into new code — that's the gap to close, not the convention to follow.

### 6. Routing & Navigation

**Expo Router, file-based, shared between native and web:**

- `src/pages/loan/index.tsx` → `/loan`
- `src/pages/loan/[id].tsx` → `/loan/:id`
- `src/pages/(protected)/_layout.tsx` → layout/auth-guard wrapper for a route group
- `src/pages/simulasi/index.web.tsx` → web-specific override of a route

A page should be a thin wrapper around its screen:

```tsx
// src/pages/loan/index.tsx
import LoanScreen from "@src/screens/Loan";

export default function Page() {
  return <LoanScreen />;
}
```

### 7. Component Patterns

- Prefer feature-based organization: put feature-specific components in `src/screens/<Feature>/components/`
- Only move a component to `src/components/` if it's genuinely reusable across multiple features
- One component per file, default export for the primary component, `I`-prefixed props interface

### 8. Error Handling & Monitoring

- **Sentry** is configured for error tracking (source maps uploaded via `build:apk`/`build:aab`)
- Route logging/analytics through the existing utilities under `src/utils/` (`analytics/`, `mixpanel/`, `moengage/`, `firebase-analytics/`) rather than ad hoc calls
- `console.*` usage is disallowed by ESLint (`no-console: error`) — don't leave `console.log` in committed code

### 9. Testing

- Jest + `jest-expo` preset + `react-test-renderer` are configured (`"test": "jest --watchAll"`), but the repo currently has **no test files**. If adding tests, follow standard Jest conventions and co-locate `*.test.ts(x)` next to the code under test.

### 10. Platform-Specific Code

```tsx
import { Platform } from "react-native";

if (Platform.OS === "web") {
  // Web-specific code
}
```

Or use file-suffix overrides where the codebase already does (`useColorScheme.web.ts`, `simulasi/index.web.tsx`).

## Common Tasks

### Adding a New Feature

1. Create the screen folder: `src/screens/NewFeature/index.tsx`
2. Add sub-components in `src/screens/NewFeature/components/`
3. Add feature-local state in `src/screens/NewFeature/atom.ts` if needed
4. Add API calls in `src/apis/newFeature.ts`
5. Add the route: `src/pages/new-feature/index.tsx`, rendering the screen

### Adding a New API Endpoint

1. Add the function to the matching domain file in `src/apis/` (or create a new one)
2. Define `I`-prefixed request/response types
3. Consume it via React Query in the screen/component

### Adding Form Validation

1. Define a Zod schema
2. Derive the type with `z.infer<typeof schema>`
3. Wire it up with `useForm` + `zodResolver`

## Important Files

- **`src/pages/_layout.tsx`** — root layout
- **`src/apis/index.ts`** — axios client, interceptors, `get/post/put/del` helpers
- **`src/utils/jotai/atom/{session,ui,user}.ts`** — global app state
- **`src/utils/design-token.ts`** — design tokens (colors, spacing, typography)
- **`.eslintrc.js`** — lint rules (references internal styleguide: `github.com/pintarnya/styleguide`)
- **`tsconfig.json`** — strict TS config, path aliases `@src/*`, `@public/*`, `@lib/*`
- **`server.js`** — Express server for the web build (static hosting + HMAC-signed endpoint proxy)

## Environment & Configuration

- `yarn env-staging` / `yarn env-prod` — generate `.env` via `create-env.js` and update MoEngage Android config
- App identity: name "Pandai Gadai", scheme `pandaigadai`, bundle id `com.pandaigadai`

## Build & Deploy

```bash
yarn start           # expo start (native dev)
yarn dev-web         # expo start --web
yarn android         # expo run:android
yarn ios             # expo run:ios --scheme pandaigadai
yarn build-web       # npx expo export -p web (static web build, used by Docker/server.js)
yarn build:apk       # native Android APK build + Sentry sourcemap upload
yarn build:aab       # native Android AAB build + Sentry sourcemap upload
yarn lint            # expo lint
yarn test            # jest --watchAll
yarn clean:android   # clean Android build
yarn clean:ios       # clean iOS build
```

Note: README.md references `yarn web`, which is stale — the actual script is `dev-web`.

Web and mobile deploy through separate pipelines: web via `buildspec.yml` → Docker → ECR/ECS/CodeDeploy; mobile via `eas.json` profiles (`development`, `preview`, `production`).

## Best Practices Summary

1. ✅ Always use TypeScript with `I`-prefixed types/interfaces
2. ✅ Style with `StyleSheet.create`
3. ✅ Use React Hook Form + Zod for forms
4. ✅ Use `@tanstack/react-query` for server state
5. ✅ Use Jotai for global/client state (global atoms vs. feature-local atoms)
6. ✅ Follow the `pages/` (thin routes) → `screens/` (logic + UI) split
7. ✅ Put all backend calls in `src/apis/`, never call `axios` directly from UI code
8. ✅ Use design tokens from `src/utils/design-token.ts`
9. ✅ Follow branch naming: `<name>/<type>:<description>` (e.g. `aldo/feature:feature-name`)
10. ✅ Prefix intentionally-unused variables with `_`

## What to Avoid

1. ❌ Don't use NativeWind/Tailwind `className` — it's installed but not adopted; use `StyleSheet.create`
2. ❌ Don't call `axios` directly from screens/components — go through `src/apis/`
3. ❌ Don't add a new global state library (Redux, Zustand, Context-based stores) — the project has standardized on Jotai
4. ❌ Don't use the legacy `react-query` v3 dependency for new code — use `@tanstack/react-query`
5. ❌ Don't put business logic directly in `src/pages/*` — keep it in `src/screens/*`
6. ❌ Don't leave `console.log` in committed code — ESLint (`no-console`) will fail the pre-commit hook
7. ❌ Don't assume Next.js conventions apply — `next-env.d.ts` and the `next` TS plugin are vestigial; routing is Expo Router
8. ❌ Don't hardcode colors/spacing/typography — use `src/utils/design-token.ts`

## Notes / Gotchas

- `tsconfig.json` has vestigial Next.js artifacts (`"plugins": [{"name": "next"}]`, `next-env.d.ts`) that are not actually used — routing is Expo Router, not Next.js.
- `server.js` (Express) exists only to (a) serve the static web export and (b) proxy a few endpoints that need a server-side HMAC secret (`payment-verification`, `pricing-engine`, `generate-payment-link`) — it is not the app's backend.
- Prettier does **not** run through ESLint (`prettier/prettier` rule is off) — formatting is enforced via `lint-staged`/Husky pre-commit, not the linter.
- PRs to `main` get a preview/QA deploy link; merging to `main` deploys to prod.
