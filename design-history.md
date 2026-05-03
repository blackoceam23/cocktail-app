# Design history

**Current UI contract:** [`design.md`](design.md) is the source of truth for typography, palette, layout, and information architecture.

This file is **historical context only**: past pivots, superseded ideas, and why something looks or behaves a certain way today. Append a short dated entry when a **major** visual or UX direction changes—not for every small tweak.

Entries are **newest first**.

---

## 2026-05-02 — Filtered-empty: one dashed shell + inset add row

- **Summary:** Refined the filtered-empty UI in `App.jsx`: a single dashed outer card holds copy plus a dedicated **inset CTA strip** (small caps + Syne title, full-height left accent echoing recipe cards, plus and chevron) that opens the add-recipe modal, instead of nesting the portrait `AddRecipeCard` inside the shell. The grid still uses `AddRecipeCard` as the trailing tile when at least one cocktail matches the filter. Follow-up passes adjusted outer-shell contrast, removed a divider above the CTA, constrained strip width (`max-w-md` / `sm:max-w-lg`), and tuned icon vs label sizing.
- **Supersedes / related:** Extends the 2026-05-01 "Main list: scroll header, empty state…" entry, which established dashed surface + eyebrow + Syne copy but not this split between empty-state strip vs grid add card.
- **Notes:** The empty-branch CTA is implemented inline in `App.jsx` to keep the pattern local.

## 2026-05-01 — Header: condense-then-hide (Twist-style, less jarring)

- **Summary:** Replaced hide-only sticky header with a two-phase scroll model: hero title **condenses** into a slim sticky bar after a small scroll threshold (hysteresis on the way back), then the slim bar may **hide** on further scroll-down and reappear on scroll-up. Implemented as `useHeaderState` in `src/hooks/useScrollDirection.js`; `Header.jsx` transitions padding, eyebrow, and title size.
- **Supersedes / related:** Prior "hide full hero on scroll" behavior documented in the entry below.
- **Notes:** Deliberately did not switch to `position: fixed` yet; can follow if a closer match to reference sites is still needed. Minor follow-up: main hero `h1` letter-spacing went from `tracking-[-0.015em]` to `tracking-[-0.02em]` in `Header.jsx` (see `design.md` typography hierarchy).

## 2026-05-01 — Main list: scroll header, empty state, no pour-list divider

- **Summary:** Removed the "Tonight's Pour List" divider above the grid. The sticky header now hides on scroll-down and reappears on scroll-up (rAF-throttled listener, `useHeaderVisibility` in `src/hooks/useScrollDirection.js`), with transform + margin collapse so content does not leave a dead gap. Filtered-empty state uses the same eyebrow + Syne + dashed-surface language as the rest of the UI.
- **Supersedes / related:** Prior static sticky header and plain empty-state sentence.
- **Notes:** Reference feel similar to premium event sites (e.g. [Twist Events](https://www.twist.events/) nav hide-on-scroll).

## 2026-05-01 — Contemporary dark studio (cool-neutral, Syne, bold accent)

- **Summary:** Replaced the warm speakeasy palette with a cool-neutral dark aesthetic. Swapped Cormorant Garamond for Syne (geometric sans, weights 700/800) to modernize the display type immediately. Shifted all surfaces from warm tobacco-brown (`#120f0e`, `#3A302B`) to cool slate (`#0C0C10`, `#26262F`). Removed ornate inner border frames from cards. Cards now left-align the cocktail name with a solid `#BB5143` left-edge accent bar. Filter active state is now a full `#BB5143` fill (previously a faint hairline border). Primary CTAs in the form also moved to full accent fill.
- **Supersedes / related:** "Modern moody speakeasy" entry below.
- **Notes:**
  - All layout, grid, and UX behavior is unchanged — only visual language updated.
  - `#BB5143` now appears with more weight (filled chips, filled buttons, left-bar accent) rather than only as hairline borders.
  - The `.font-serif-title` CSS utility was renamed to `.font-display` and now references Syne.

## 2026-05 — Modern moody speakeasy (editorial, no photos)

- **Summary:** Dark cocktail-bar editorial direction: atmospheric background layers, warm charcoal–tobacco neutrals, Inter for UI/body and Cormorant Garamond for display titles, occasional accent `#BB5143`, no reliance on photography for atmosphere.
- **Supersedes / related:** Earlier “Dark Cocktail Lab” and “Speakeasy Editorial” passes; README/UI copy that described poker-card styling.
- **Notes:**
  - Card grid uses portrait menu-style tiles with `md:aspect-[5/7]` and consistent row rhythm.
  - Filter chips and modals follow the same warm dark surfaces and accent discipline documented in `design.md`.

## 2026-05 — Recipe modal: no separate “Base spirits” block

- **Summary:** The recipe detail modal no longer duplicates base spirit as its own section or tag row; base spirit remains the filter dimension and may still appear in the ingredient list.
- **Supersedes / related:** Prior modal layout that surfaced bases as a dedicated UI block alongside ingredients.
- **Notes:** Reduces duplication between list metadata and modal content; see `design.md` (Modals and forms).

## Earlier exploration — Poker-card–inspired framing (superseded)

- **Summary:** Recipe cards and docs briefly emphasized a vintage playing-card silhouette and “poker-inspired” framing (proportions, borders, typography)—without suit symbols.
- **Supersedes / related:** Superseded by the editorial speakeasy card treatment; **card aspect ratio and equal grid heights were kept** where still applicable.
- **Notes:** Historical only; do not treat old README bullets as the active spec.
