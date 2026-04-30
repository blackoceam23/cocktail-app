# Contributing

Thanks for contributing to `cocktail-app`.

This project keeps changes intentionally small, readable, and visually consistent with the established UI system.

## Workflow

1. Create a branch for your change.
2. Implement your update with focused commits.
3. Self-review using the checklist in this document and `UI_AUDIT_CHECKLIST.md`.
4. Run verification steps.
5. Open a PR with a clear summary and test notes.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Standards

Follow conventions in `.cursor/rules/cocktail-app.mdc`.

Key requirements:

- Use Tailwind utility classes over inline styles where practical.
- Keep visuals aligned with the app's existing dark + glass + rose style system.
- Add `cursor-pointer` to clickable UI controls and interactive surfaces.
- Use functional components and hooks; memoize derived collections with `useMemo` where relevant.
- Split components when files grow past roughly 100 lines, especially under `src/components`.
- Preserve responsive behavior and comfortable touch targets on mobile.

## Pull Request Checklist

- [ ] Scope is focused and intentionally small.
- [ ] UI follows `.cursor/rules/cocktail-app.mdc`.
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
