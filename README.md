# HumaVolve

> Ongoing internship / training workspace for frontend engineering practice.

HumaVolve is a shared workspace used by the frontend internship team to
complete a series of small, well-scoped training assignments. It is designed
to grow over time: each assignment is added to this same repository without
restructuring the project, so the foundation must stay clean, predictable,
and easy to extend.

---

## Project Overview

This repository is the permanent root of an ongoing internship/training
project. Its role is to provide a single, consistently organized place for
the team to complete frontend assignments and to accumulate a growing, real
codebase.

The first assignment established the initial React and TypeScript workspace
using Vite and organized the source code into clearly defined directories for
components, hooks, API modules, types, state management, pages, constants,
internationalization, assets, schemas, and utilities.

## Assignment History

| Task | Title                   | Status    | Completion date |
| ---- | ----------------------- | --------- | --------------- |
| 01   | React Project Structure | Completed | October 14, 2026 |
| 02   | Reusable Components in React | Completed | October 15, 2026 |

**Task 01 — React Project Structure** was completed on October 14, 2026. The
task established the initial React and TypeScript workspace using Vite and
organized the source code into clearly defined directories for components,
hooks, API modules, types, state management, pages, constants,
internationalization, assets, schemas, and utilities.

Objective: create a clean, scalable foundation for future training
assignments. Implemented scope: Vite + React + TypeScript project
initialization in the workspace root; a documented `src/` folder structure;
small, typed example files in every required folder; removal of the Vite
demo UI and unused starter assets; a minimal accessible UI baseline; and a
production build that passes.

**Assignment 02 — Reusable Components in React** was completed on
October 15, 2026.

Objective: add genuinely reusable, prop-driven Button, Card, and Table
components and demonstrate them on the Home page.

Components (all under `src/components/ui/`):

- `Button.tsx` — props: `text`, `onClick`, `variant`
  (`"primary" | "secondary" | "danger"`), `disabled`, plus optional native
  button attributes. Uses a native `<button type="button">`, forwards clicks,
  and respects `disabled` visually and functionally. `children` remains
  accepted for Assignment 01 backwards compatibility, but `text` is the
  documented API.
- `Card.tsx` — props: `title`, `description`, `image?`, `imageAlt?`,
  `children?`. Renders semantic `<article>` markup, shows the image only when
  provided (with alt fallback `"${title} illustration"`), and renders nested
  JSX through `children`.
- `Table.tsx` — generic `Table<T>` with props `columns: Column<T>[]`,
  `data: T[]`, `striped?`, `emptyMessage?`, `caption?`, `getRowKey?`.
  `Column<T> = { header: string; key: keyof T; render? }`. Renders semantic
  `<table>` / `<thead>` / `<tbody>` / `<th scope="col">` / `<td>`, alternating
  row backgrounds when `striped` is set, a graceful empty state for `data=[]`,
  and stable keys (explicit `getRowKey`, else row `id`, else index fallback).

Demonstration (`src/pages/Home.tsx`, sample data in `src/data/courses.ts`):

- Introduction section with the assignment title and reusability explanation.
- Button showcase: primary, secondary, danger, and disabled Buttons updating a
  visible `role="status"` message (plus reset); no browser alerts.
- Card showcase: two Cards with different data; the first includes an image and
  nested children (metadata paragraph + Button that updates shared demo state);
  the second Card also uses children and reflects that shared state.
- Table showcase: internship course dataset (name, level, lessons, status —
  4 rows) with `striped` enabled and a custom status badge via `render`.
- Learning note on consistency, reuse, maintainability, separation of concerns.
- The Assignment 01 loading/empty-state demo is preserved below.

Verification (run October 16, 2026): `npm run build` passed (`tsc -b` +
Vite build, 27 modules); `npm run lint` passed with no errors.

## Tech Stack

- **React** 19 — UI library
- **TypeScript** — type-safe application code
- **Vite** — development server and production bundler
- **npm** — package manager (`package-lock.json` is committed)
- **ESLint** — linting (provided by the Vite template)

No additional runtime dependencies (no router, UI framework, state-management
library, API client, form library, or i18n library) were added, per the task
scope.

## Project Structure

```text
humaVolve/
├── public/
│   └── .gitkeep
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   └── AppProvider.tsx
│   │   ├── skeleton/
│   │   │   └── LoadingSkeleton.tsx
│   │   └── common/
│   │       └── EmptyState.tsx
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── api/
│   │   └── users.api.ts
│   ├── types/
│   │   └── user.types.ts
│   ├── store/
│   │   └── index.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── constants/
│   │   └── routes.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   └── en.json
│   ├── assets/
│   │   └── .gitkeep
│   ├── schemas/
│   │   └── user.schema.ts
│   ├── utils/
│   │   └── formatDate.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Folder Responsibilities

All application folders live inside `src/`.

- **`components/ui/`** — Generic, reusable UI primitives with no app-specific
  logic (for example `Button.tsx`).
- **`components/layout/`** — Structural, app-wide layout pieces such as the
  `Navbar` and `Footer`.
- **`components/providers/`** — Top-level composition/providers that wrap the
  app (for example `AppProvider.tsx`).
- **`components/skeleton/`** — Loading placeholders with accessible semantics
  (for example `LoadingSkeleton.tsx`).
- **`components/common/`** — Cross-cutting presentational components shared by
  multiple features (for example `EmptyState.tsx`).
- **`hooks/`** — Reusable React hooks (for example `useDebounce.ts`).
- **`api/`** — Typed data-access modules that isolate networking from the UI
  (for example `users.api.ts`).
- **`types/`** — Shared TypeScript types and interfaces (for example
  `user.types.ts`).
- **`store/`** — Reserved location for future shared state management
  (currently a documented placeholder).
- **`pages/`** — Top-level page components (`Home.tsx`, `About.tsx`).
- **`constants/`** — Framework-independent constant values (for example
  `routes.ts`).
- **`i18n/`** — Internationalization resources and configuration (a starter
  point).
- **`assets/`** — Static assets imported by the app; kept in Git with
  `.gitkeep` until real assets are added.
- **`schemas/`** — Explicit, type-safe validation logic (for example
  `user.schema.ts`).
- **`utils/`** — Small reusable helper functions (for example `formatDate.ts`).

## Getting Started

Requires Node.js (developed on Node 24) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The development server prints a local URL (typically `http://localhost:5173`)
— open it in a browser.

## Available Scripts

These scripts are defined in `package.json`:

| Script            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with HMR.          |
| `npm run build`   | Type-check with `tsc -b`, then build for production. |
| `npm run preview` | Locally preview the production build.                |
| `npm run lint`    | Run ESLint across the project.                       |


## Implementation Notes

This section distinguishes **working examples** from **future placeholders**.

Working examples (fully implemented and exercised by the UI):

- **`components/`** — `Button`, `Navbar`, `Footer`, `AppProvider`,
  `LoadingSkeleton`, and `EmptyState` are real, typed components. The Home
  page composes `Button`, `LoadingSkeleton`, and `EmptyState`.
- **`hooks/useDebounce.ts`** — A generic, typed debounce hook with proper
  timer cleanup.
- **`utils/formatDate.ts`** — A typed date formatter that safely handles
  invalid dates.
- **`schemas/user.schema.ts`** — An explicit, type-safe `User` validator.
  Note: TypeScript types are erased at runtime, so this function performs real
  runtime checks; it does not rely on TypeScript alone for validation.

Future placeholders (structure only, not integrated):

- **`store/`** — A documented placeholder for future state management. No
  Redux/Zustand (or any state library) is installed.
- **`constants/routes.ts`** — Framework-independent route path constants. No
  router is installed; `Navbar` uses these constants as plain `href` values.
- **`api/users.api.ts`** — A clean API-module boundary using the native Fetch
  API and shared types, with HTTP error handling. It makes **no** calls at
  startup and is isolated from presentation components, so it is ready but not
  yet wired into a screen.
- **`i18n/`** — A lightweight starting point with a small `en.json` resource
  and a minimal `translate` helper. This is **not** a fully integrated
  internationalization system and no i18n library is installed.

A minor adjustment: the two pages (`Home` and `About`) are not connected by a
router, because installing a routing library was out of scope. `App.tsx`
renders the `Home` page directly; `About.tsx` exists as a ready page for a
future routing assignment.

## Verification

The following checks were run and passed locally:

- `npm install` — dependencies installed; `package-lock.json` generated.
- `npm run build` — `tsc -b` type-checking and the Vite production build both
  completed successfully.
- `npm run lint` — ESLint reported no errors.

Runtime behavior of the UI (for example the simulated loading/empty-state
flow on the Home page) was exercised manually in the development server; the
`api` module's live HTTP behavior is not exercised by the app and was not
tested against the network.

## Future Assignments

Additional training tasks will be documented in **Assignment History** above
as the project evolves. Future work may include routing, state management,
real API integration, and a fully integrated i18n system — each building on
this foundation without restructuring the existing directories.

