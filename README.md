# Cocktail App

A Vite + React cocktail recipe app for browsing, filtering, and managing cocktail recipes.

## Features

- Browse built-in cocktail recipes.
- Filter cocktails by base spirit.
- Open detailed recipe modals for ingredients and instructions (base spirit is used for filtering and may also appear in the ingredient list).
- Add custom recipes stored in browser local storage.
- Export built-in + custom recipes to JSON.

## Getting Started

### Prerequisites

- Node.js (current LTS recommended)
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/components` - UI components (cards, modals, filters, header)
- `src/data` - static recipe and spirit data
- `src/hooks` - reusable hooks (for example cocktail state management)
- `src/lib` - utility helpers (identity and storage helpers)

## Design System and Conventions

Project UI and engineering conventions are documented in:

- `design.md` — visual direction, typography, palette, and layout constraints
- `design-history.md` — past design pivots and context only (optional reading; `design.md` remains current)
- `.cursor/rules/cocktail-app.mdc` — engineering conventions, accessibility affordance (`cursor-pointer` on clickable surfaces), component/hook guidance, and doc hygiene

Use the Cursor rule for day-to-day implementation defaults; use `design.md` when making intentional visual changes or onboarding designers.

## Quality Checks

There is currently no `lint` npm script in this repository.

Before shipping changes:

- Run `npm run build` to catch compile-time issues.
- Run `npm run docs:check` when code/config behavior may require markdown updates.
- Manually verify key UI flows (filtering, modal open/close, recipe add, export behavior).
- Use `UI_AUDIT_CHECKLIST.md` for consistent UI review.

### Docs Awareness Check

`npm run docs:check` compares the latest change range and fails when high-signal code/config files change without any markdown updates.

Examples of high-signal paths:

- `package.json` and lockfiles
- `index.html` and Vite config
- `src/App.*`, `src/components/**`, `src/data/**`, `src/lib/**`

Use this as a docs drift reminder. If docs intentionally do not change, include a brief rationale in your PR notes.

## Deployment + Rollback

### Netlify Deployment

- Repository: `https://github.com/blackoceam23/cocktail-app.git`
- Build command: `npm run build`
- Publish directory: `dist`
- Netlify should auto-deploy when new commits are pushed to `main`.

### First-Time Git Setup

Run these once from the project root:

```bash
git init
git add .
git commit -m "Initial cocktail app"
git branch -M main
git remote add origin https://github.com/blackoceam23/cocktail-app.git
git push -u origin main
```

### Rollback Quick Guide

- Preferred on shared history: `git revert <commit_sha>`
- Push the revert commit to trigger a Netlify redeploy.
- Avoid `git reset --hard` on shared branches unless you intentionally want to rewrite history.

## UI Decisions

Card and surface choices evolve with the speakeasy editorial direction. Authoritative notes live in **`design.md`** (typography roles, `md:aspect-[5/7]` grid behavior, accent usage for `#BB5143`, and modal information architecture).
