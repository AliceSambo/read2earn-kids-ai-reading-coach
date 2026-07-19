# Accessibility UI guidelines

## Standard and testing approach

The design-system laboratory uses WCAG 2.2 AA as its implementation target while recognising that automated tests cannot prove conformance. Every component needs keyboard, screen-reader, zoom/reflow, contrast, motion, cognition, touch, and representative-user review before production use.

## Shared requirements

- Use native HTML controls and landmarks before ARIA. Every control has a visible label and a programmatic name.
- Preserve logical DOM, reading, and focus order. Keyboard access must not depend on pointer, drag, hover, voice, sound, colour, or motion.
- Interactive targets are at least 48 by 48 CSS pixels in child mode, with visible `:focus-visible` treatment and adequate separation.
- Text scales to 200% without clipping, overlap, horizontal page scrolling, or lost actions. Story text starts near 20px with generous line height and a readable measure.
- Body text targets at least 4.5:1 contrast; large text and meaningful UI boundaries target at least 3:1. Status always includes words or symbols, never colour alone.
- `prefers-reduced-motion` replaces transformations with immediate, static state changes. No animation carries essential meaning or blocks navigation.
- Quiet mode prevents optional audio. Narration is initiated explicitly, exposes speed controls, and always has text. Voice input always has a typed alternative.
- Errors identify the field, explain recovery warmly, and do not repeatedly interrupt a screen reader.

## Component evidence

| Component | Keyboard and focus | Screen reader | Motion and sensory access |
|---|---|---|---|
| Buttons | Native `button`; Enter/Space activation; 48px target; visible focus | Visible label is the accessible name; disabled state is native | Hover lift is optional and removed under reduced motion |
| Cards | Semantic `article` and heading; interactive action remains a separate native control | Card label, heading, description, and explicit status follow DOM order | State is text, not colour or animation |
| Dialogs | Focus moves inside on open, cycles within, Escape closes, and returns to opener | `role=dialog`, `aria-modal=true`, and labelled heading | Overlay and state remain understandable without transitions |
| Companion avatar | Noninteractive; never inserted into focus order | Concise state label when informative | Emotion has text; reduced motion removes movement |
| Speech bubble | Plain landmark and readable text | Companion name labels the region | Spoken content must duplicate this text, never replace it |

## Dialog focus contract

Only true modals trap focus. The first safe action receives focus, Tab and Shift+Tab wrap, Escape closes, and the trigger regains focus. Closing or destroying a dialog removes its document listener. Background content must become inert when a production screen adopts the primitive; the laboratory itself demonstrates focus behavior without changing the live prototype.

## Review matrix

Test at 320px, 375px, 480px, 768px, and 1024px or wider; at 200% text zoom; with keyboard only; with reduced motion; and with at least one desktop and one mobile screen reader. Test forced-colour/high-contrast settings separately. Record failures and evidence rather than asserting accessibility from source inspection alone.
