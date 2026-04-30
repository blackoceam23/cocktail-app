# UI Audit Checklist

Use this quick pass before merging UI changes.

## Interaction Affordance

- [ ] Every clickable `button`, link, and custom interactive surface includes `cursor-pointer`.
- [ ] Icon-only actions apply `cursor-pointer` on the clickable control (not only the icon).
- [ ] Disabled controls preserve non-interactive behavior (for example `disabled:pointer-events-none`).
- [ ] Hover/focus styles are present for clickable controls (`hover:*` and `focus-visible:*`).

## Visual Consistency

- [ ] Page background remains dark (`#0A0E14`) with light text.
- [ ] Titles use `.font-serif-title` (Cormorant Garamond).
- [ ] New cards/surfaces follow existing glassmorphism style (`backdrop-blur`, translucent backgrounds, subtle borders/shadows).
- [ ] Interactive accent colors stay aligned with the rose-tinted system.

## Layout and Responsiveness

- [ ] Spacing follows Tailwind's 8px rhythm (`gap-2`, `p-4`, `gap-6`, etc.).
- [ ] Mobile behavior is verified (`sm:`/`md:` adjustments where needed for readability and tap targets).

## React and Component Hygiene

- [ ] Derived lists are memoized (`useMemo` or equivalent).
- [ ] Components over ~100 lines are split into focused subcomponents under `src/components/`.
- [ ] No avoidable inline styles when Tailwind utilities can express the same styling.
