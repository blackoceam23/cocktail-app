# UI Audit Checklist

Use this quick pass before merging UI changes.

## Interaction Affordance

- [ ] Every clickable `button`, link, and custom interactive surface includes `cursor-pointer`.
- [ ] Icon-only actions apply `cursor-pointer` on the clickable control (not only the icon).
- [ ] Disabled controls preserve non-interactive behavior (for example `disabled:pointer-events-none`).
- [ ] Hover/focus styles are present for clickable controls (`hover:*` and `focus-visible:*`).

## Visual Consistency

- [ ] Visual choices are consistent across screens and components.
- [ ] `#BB5143` appears as an accent in at least some interface elements (it does not need to be the primary color).

## Layout and Responsiveness

- [ ] Spacing follows Tailwind's 8px rhythm (`gap-2`, `p-4`, `gap-6`, etc.).
- [ ] Mobile behavior is verified (`sm:`/`md:` adjustments where needed for readability and tap targets).

## React and Component Hygiene

- [ ] Derived lists are memoized (`useMemo` or equivalent).
- [ ] Components over ~100 lines are split into focused subcomponents under `src/components/`.
- [ ] No avoidable inline styles when Tailwind utilities can express the same styling.
