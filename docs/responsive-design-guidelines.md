# Responsive design guidelines

## Mobile: 320–480px

- Use a single content column with 8px page gutters at the narrowest supported width and 16px where space allows.
- Keep the primary action after its content; do not use a fixed bar that covers enlarged text.
- Stack dialog actions full-width. Cards fill the container and retain 48px controls.
- Use fluid display sizes; reading text never shrinks below the readable role token.
- Prefer semantic list navigation over spatial maps when landmarks would become too small. No hover-only information.
- Companion art stays outside the reading measure and yields space before text or controls.

## Tablet: 768px reference width

- Use one or two columns according to content purpose, not a fixed card count.
- Map and list modes may sit side by side only when both remain fully keyboard accessible.
- Dialogs remain constrained to a readable width; touch targets stay at child-mode dimensions.
- Reading text retains its measure rather than stretching across the viewport.
- Navigation may move from stacked controls to a compact horizontal region with explicit labels.

## Desktop: 1024px+

- Constrain the laboratory and application shell to approximately 1120px; use surrounding space as calm margin.
- Two-to-four card columns are allowed when each card remains at least 256px wide and reading order remains row-major.
- Adult Evidence mode may use a side navigation; child Adventure mode keeps destinations few and visually stable.
- Pointer hover may enhance a control but never reveal required content or replace focus styling.
- Dialogs remain modal overlays with a maximum readable measure rather than expanding to the window.

## Scaling and reflow rules

- Use CSS grid/flex and `min()`, `max()`, `clamp()`, relative units, and content-based breakpoints.
- Avoid device detection and fixed-height text containers.
- At 200% zoom, layouts reflow into fewer columns without horizontal page scrolling.
- Cards preserve title, explicit status, description, then action order at every width.
- Motion complexity decreases on small or low-power contexts; reduced motion always wins over viewport rules.
- Safe-area insets and on-screen keyboards must not hide the active input or next action.

## Interaction changes by viewport

| Pattern | Mobile | Tablet | Desktop |
|---|---|---|---|
| Child navigation | Short labelled list or bottom region after content | Compact labelled row | Stable map plus equivalent list |
| Cards | One column | One or two columns | Responsive multi-column grid |
| Dialog actions | Stacked | Wrapped row | Right-aligned row |
| Typography | Fluid lower range | Fluid middle range | Capped maximum |
| Companion | Small static/supporting | Adjacent to support text | May occupy a separate rail, never story text |

Every breakpoint needs keyboard, screen-reader, text-scaling, reduced-motion, overflow, and touch-target evidence before a component migrates into the live journey.
