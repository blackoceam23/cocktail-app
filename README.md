# Cocktail App

A Vite + React cocktail recipe app with a dark, glassmorphism-inspired UI.

## Features

- Browse built-in cocktail recipes.
- Filter cocktails by base spirit.
- Open detailed recipe modals for ingredients and instructions.
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

- `.cursor/rules/cocktail-app.mdc`

Use this for visual consistency (dark palette, serif title styling, glass surfaces, rose accents), accessibility affordance (`cursor-pointer` on clickable surfaces), and component/hook guidance.

## Quality Checks

There is currently no `lint` npm script in this repository.

Before shipping changes:

- Run `npm run build` to catch compile-time issues.
- Manually verify key UI flows (filtering, modal open/close, recipe add, export behavior).
- Use `UI_AUDIT_CHECKLIST.md` for consistent UI review.

## UI Decisions

Current card design choices (captured for future iterations):

- Recipe cards use a vintage poker-card inspired visual style.
- Card shape uses a tall rectangular playing-card silhouette.
- Grid cards are expected to render at equal row heights.
- No suit symbols are used; style is poker-inspired through frame, proportions, and typography.
- Card palette is intentionally darker tobacco/parchment to stay cohesive with the dark page and modal surfaces.
