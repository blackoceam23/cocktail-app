# Design — Our Little Red Mix Room

This document is the human-readable design contract for the cocktail app UI. Engineering conventions and doc hygiene expectations also live in `.cursor/rules/cocktail-app.mdc`.

**See also:** [`design-history.md`](design-history.md) for dated, superseded, or exploratory directions (not the current spec).

## Direction

- **Mood:** Dark, contemporary — cool-neutral surfaces that feel modern and studio-forward, not vintage or nostalgic. Restraint and sharp typography carry the atmosphere.
- **Restraint:** Avoid ornate decoration (no inner border frames, no warm-glow blobs). Strong typographic moments and a single bold accent provide personality.
- **Cohesion:** New screens or components should feel like the same venue: same cool-dark neutrals, same accent discipline, same type roles.

## Typography

- **Body / UI:** [Inter](https://fonts.google.com/specimen/Inter) — loaded in `index.html`, applied globally in `src/index.css`.
- **Display / hero / card titles / modal titles:** [Syne](https://fonts.google.com/specimen/Syne) (weights 700, 800) via the `.font-display` utility in `src/index.css`. Bold, geometric, contemporary.
- **Hierarchy:** Hero largest (Syne 700 / `font-bold`), card titles readable at a glance (Syne 700), modal titles clearly primary (Syne 700). The main site hero uses `tracking-[-0.02em]`; other Syne headings may use `tracking-[-0.01em]` where a hair less tightness reads better at smaller sizes.

## Color and accent

- **Accent (required occasionally):** `#BB5143` — used for active filter fill, left card border bar, section labels (e.g. "Signature Build"), focus rings, and primary CTA buttons. It **is** the dominant interactive fill in the active state (filter chip, Save button).
- **Hover / secondary red:** `#C86255` — hover companion on primary buttons only; treat as a state color, not a second brand accent.
- **Neutrals (implementation today):** Cool slate — page bg `#0C0C10`, surfaces `#16161C`–`#1C1C24`, borders `#26262F`–`#38383F`, primary text `#EEEDF2`, muted text/labels `#6A6A7A`, body copy inside modals `#A8A8B8`. When adding new surfaces, stay in this cool charcoal-slate family rather than warm browns.
- **Focus:** Visible focus styles should include `#BB5143` at reduced opacity (see filter chips, cards, and modal close controls).

## Layout and spacing

- **Rhythm:** Prefer Tailwind spacing that aligns to an **8px grid** (`gap-2`, `p-4`, `gap-6`, etc.).
- **Responsive:** Adjust padding and type on small viewports so tap targets stay comfortable and lines do not feel cramped; use `sm:` / `md:` breakpoints intentionally.
- **Atmosphere:** A single, minimal `#BB5143`/8 radial glow at the very top of `App.jsx` — low contrast, does not compete with content.

## Recipe cards

- **Silhouette:** Tall portrait cards with `rounded-xl` (not `rounded-2xl` — sharper, more contemporary).
- **Left accent bar:** A 3px `#BB5143` bar pinned to the left edge; opacity 70% at rest, 100% on hover.
- **No inner border frame:** The `absolute inset-2 border` ornamental inner frame is removed. Single outer border only.
- **Name alignment:** Left-aligned (not centered). More editorial, more modern.
- **Aspect ratio:** From the `md` breakpoint upward, cards use `md:aspect-[5/7]` so the grid stays visually even. Below `md`, minimum heights preserve usability on phones.
- **Motion:** Noticeable `-translate-y-2` lift, border tint, red glow shadow, and accent bar width shift on hover at `md+`; no aggressive scaling.

## Header

- **Sticky:** The site title bar is `sticky top-0` with backdrop blur and a cool border.
- **Condense then hide:** After `scrollY` passes ~60px (with ~40px hysteresis when returning), the hero eases into a **slim bar**: less vertical padding, the "House Menu" eyebrow collapses (`max-height` / opacity), and the title steps down in font size (CSS transitions ~500ms, soft cubic-bezier). On viewports **below `sm`**, the title is split into two explicit lines ("Our Little Red" / "Mix Room") using `block sm:inline` spans so the line break does not shift during the font-size transition on phones. At **`sm` and up**, those spans are inline so the title reads as one line again (desktop). The inner wrapper uses `min-w-0` so flex/grid ancestors cannot force horizontal overflow. The full hero never slides off-screen unannounced — only the condensed bar can hide.
- **Hide-on-scroll (condensed only):** Once condensed, scrolling down past ~160px with meaningful downward delta hides the bar (`-translate-y-full`); scrolling up restores it. While still in full hero mode (`scrollY` below the condense threshold), the bar always stays visible. UI logic: `useHeaderState` in [`src/hooks/useScrollDirection.js`](src/hooks/useScrollDirection.js) (legacy `useHeaderVisibility` remains exported for any one-off use).
- **Layout gap:** A negative `margin-bottom` equal to the measured header height (via `ResizeObserver`) when hidden collapses document flow so transform does not leave a dead strip.

## Empty states

- When a spirit filter yields no recipes, show **one** dashed-border panel: accent eyebrow ("Empty Glass"), Syne headline, and muted supporting copy in Inter — not a single anonymous paragraph.
- **Add affordance when empty:** Inside that same panel, use a **compact inset row** (small-caps line + Syne title, full-height left accent in `#BB5143`, plus icon and chevron) that opens the add-recipe modal. Do **not** reuse the tall portrait **`AddRecipeCard`** here; that component stays in the **non-empty** grid only (trailing tile after recipe cards). One surface avoids nested card chrome and keeps empty vs filled layouts visually distinct.

## Filters and chips

- Filter controls are compact pills (`rounded-full`), uppercase tracked labels.
- **Active state:** Full `bg-[#BB5143]` fill, white text — confident, no ambiguity.
- **Inactive state:** Cool dark bg (`#16161C`), cool gray border (`#26262F`), muted gray text; hover lifts border and text toward primary.

## Modals and forms

- **Backdrop:** Full-screen overlay uses a semi-transparent black (`rgba(0,0,0,0.74)`) with Tailwind `backdrop-blur-sm` so the page behind is dimmed but still readable — recipe and add-recipe modals match.
- **Panels:** Cool-slate panels (`#1C1C24` → `#131318` gradient) with single `#26262F` border and `rounded-xl` corners.
- **Section eyebrow labels:** `#BB5143` for the opening label ("Signature Build", "New House Entry"); cool gray `#6A6A7A` for field labels (Ingredients, Instructions, Notes).
- **Information architecture:** **Base spirit** drives **filtering** and may appear in ingredients; the recipe detail modal does **not** repeat a separate "base spirits" block.
- **Forms:** Inputs use cool-dark fields (`#16161C`), cool gray borders; focus states echo the accent. Primary CTA is full `#BB5143` fill; secondary stays cool neutral outline.
- **Base spirit checkboxes in form:** Match the filter chip active state — full `#BB5143` fill when selected.

## Imagery

- **No hero or card photography** in the current direction. If images are introduced later, they should be optional, performance-conscious, and subordinate to type — not full-bleed lifestyle shots unless the whole system is revised.

## Implementation notes

- Styling is **Tailwind-first**; prefer utilities over inline styles.
- **Pointer affordance:** Interactive elements should include `cursor-pointer` (see workspace rule).
- After UI or UX changes, update this doc or `README.md` when behavior or visual intent shifts meaningfully.
- Major visual or information-architecture direction changes: update this file and append a dated entry to `design-history.md`.
