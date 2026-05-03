# Contributing

Thanks for contributing to `cocktail-app`.

This project keeps changes intentionally small, readable, and visually consistent with the established UI system.

## Workflow

1. Create a branch for your change.
2. Implement your update with focused commits.
3. Self-review using the checklist in this document and `UI_AUDIT_CHECKLIST.md`.
4. Run verification steps.
5. Open a PR with a clear summary and test notes.
6. **Before merging to `main`:** create a **pre-merge snapshot tag** so you can return to today’s `main` tip later (see [Pre-merge snapshot tags](#pre-merge-snapshot-tags)).

## Pre-merge snapshot tags

Right before you merge work into `main` (or right before you merge the PR on GitHub), tag **`origin/main`** and push the tag. That commit stays reachable under a memorable name (e.g. `v1.0-pre-visual-revamp`, `pre-merge-20260515-5d2baa`).

**Automated helper (recommended):**

```bash
npm run tag:pre-merge
```

- With **no arguments**, the script proposes a tag like **`pre-merge-YYYYMMDD-<short-sha>`** (date + abbreviated commit), explains what it means, and asks you to **press Enter to accept**, **type a different tag name**, or **`n`** to abort—so the name stays understandable months later.
- With a **short slug** (letters/numbers/hyphens), the suggestion becomes **`pre-merge-YYYYMMDD-<slug>`**, e.g. `npm run tag:pre-merge -- visual-revamp`.
- To **skip the prompt** (CI or you’re sure): `npm run tag:pre-merge -- --yes` or `npm run tag:pre-merge -- --yes my-slug`.

Override the ref to tag with **`MAIN_REF`** (default `origin/main`), e.g. `MAIN_REF=origin/develop npm run tag:pre-merge`.

**Working with Cursor:** If you did not pass a tag name, ask the assistant to run `npm run tag:pre-merge` (or to propose a name in the `pre-merge-…` / `v…-pre-…` style), **confirm the suggested tag in chat**, then run the script or `git tag` / `git push` accordingly.

**Recover later:**

```bash
git fetch origin --tags
git checkout -b recover-<short-reason> <tag-name>
```

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Standards

Follow engineering conventions in `.cursor/rules/cocktail-app.mdc` and the visual contract in `design.md`.

Key requirements:

- Use Tailwind utility classes over inline styles where practical.
- Keep UI aligned with `.cursor/rules/cocktail-app.mdc` (defaults, spacing, affordance) and with `design.md` when changing layout, typography, color, cards, modals, or imagery stance.
- Add `cursor-pointer` to clickable UI controls and interactive surfaces.
- Use functional components and hooks; memoize derived collections with `useMemo` where relevant.
- Split components when files grow past roughly 100 lines, especially under `src/components`.
- Preserve responsive behavior and comfortable touch targets on mobile.

## Pull Request Checklist

- [ ] Scope is focused and intentionally small.
- [ ] UI changes follow `.cursor/rules/cocktail-app.mdc` and `design.md` (mark N/A if the PR does not touch UI).
- [ ] `UI_AUDIT_CHECKLIST.md` has been fully reviewed.
- [ ] `npm run build` succeeds locally.
- [ ] Core smoke tests pass:
  - [ ] Spirit filtering works.
  - [ ] Cocktail modal open/close behavior works (including escape/backdrop close).
  - [ ] Add-recipe flow works, including validation.
  - [ ] Recipe JSON export works.
- [ ] PR description includes:
  - [ ] What changed
  - [ ] Why it changed
  - [ ] How it was tested

## Notes

- There is currently no `npm run lint` script configured.
- If you add new quality tooling, update `README.md` and this file in the same PR.
