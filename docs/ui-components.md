# UI component library specification

## Component model

Components use purpose-based names and semantic tokens. Every interactive component must define default, hover where relevant, focus-visible, pressed, selected, disabled, loading, error, and reduced-motion behavior.

Child-facing components prioritize large targets and simple choices. Adult-facing variants reduce decorative intensity while preserving the same terminology and evidence.

## Buttons

### Primary action button

**Use:** the single preferred action in a step, such as “Enter Story Forest” or “Share with my companion.”

- Journey Violet background with white label.
- Minimum 48px height; 56px preferred on child screens.
- One primary button per decision region.
- Loading preserves width and announces status without removing the label context.
- Focus uses a high-contrast outer ring, not color change alone.

### Secondary action button

**Use:** safe alternatives such as preview, settings, or returning to a previous screen.

- Surface background, Story Ink text, and visible border.
- Equal touch target to the primary button.
- Never visually dominates the primary action.

### Reward action button

**Use:** continue from an evidence-backed reward or open the Learning Passport.

- Learning Gold accent plus a label that explains the destination.
- Available only after evidence is confirmed.
- Never used for purchasing, generic points, or time-spent rewards.

### Navigation button

**Use:** back, next section, home, or close.

- Uses icon plus accessible text where space permits.
- Back actions preserve entered information.
- Close actions return focus to the control that opened the surface.

## Cards

### Book card

**Contents:** cover image, title, content type, reading support level, access state, and optional download state in future phases.

- The whole card may be one semantic link or button; nested competing actions are avoided.
- Free or premium state is explicit text, not a color or lock icon alone.
- Cover imagery has meaningful alternative text only when it adds information.

### Mission card

**Contents:** world, mission title, short learning purpose, expected duration as guidance, support available, and current state.

- States: available, in progress, completed with evidence, and unavailable with explanation.
- Completion reflects learning evidence, not opening the mission.
- The next action is explicit: start, continue, or review.

### Achievement card

**Contents:** skill name, Knowledge Gem, evidence sentence, date or mission context when appropriate, and adult explanation.

- Does not show rarity, trading value, public rank, or scarcity.
- Includes a text equivalent for the Gem illustration.
- Parent-approved sharing is future scope and is not built into the child card.

### Parent report card

**Contents:** evidence label, observed behavior, support used, interpretation, and useful next activity.

- Calm Adult Canvas styling with limited animation.
- Separates facts from recommendations.
- Supports print, text scaling, and screen-reader reading order.

## Dialogs

### Grown-up confirmation dialog or panel

**Use:** confirm nickname, companion appearance and name, reading level, and narration preferences.

- Clearly labelled as a prototype grown-up gate.
- Shows all choices in reviewable text.
- Primary action remains disabled until the adult confirmation control is selected.
- Correction returns to setup without losing unrelated choices.
- Focus is trapped only when implemented as a true modal dialog.

### Help prompt

**Use:** vocabulary support, pronunciation fallback, or a comprehension clue.

- Opens near the relevant content without obscuring the next action.
- Offers one clear explanation or clue at a time.
- Includes a close action and returns focus to the originating word or control.
- Spoken help always has text.

### Reward celebration

**Use:** acknowledge demonstrated understanding and reveal the evidence-backed Gem.

- Shows the skill before decorative celebration.
- Celebration is brief, dismissible, and non-blocking.
- Reduced motion replaces movement with a static world-state transformation.
- Does not include countdowns, confetti loops, upsells, or social pressure.

## Progress components

### Reading progress

- Communicates story parts or pages, not speed or comparison.
- Uses text such as “Part 2 of 4” alongside a visual meter.
- The meter has an accessible name and current/max values.
- Progress does not imply that completion alone earns a Gem.

### Knowledge Gem indicator

- Shows a named skill and evidence state.
- Compact header variants may show a count, but detailed views explain every earned Gem.
- Unfilled states use “Not demonstrated yet,” never loss language.

### Learning Passport

- Future collection of evidence-backed skills across missions and subjects.
- Organizes by skill family rather than rarity.
- Supports child-friendly summaries and adult evidence detail.
- Has no public profile, follower count, tradability, or child-to-child messaging.

## Navigation

### Child navigation

- Uses a small number of destinations represented as places in the learning world.
- Provides a persistent, predictable way home and a grown-up-access boundary.
- Avoids infinite scrolling and hidden gesture-only controls.
- Current location is communicated with text, shape, and color.

### Parent navigation

- Uses conventional labels such as Overview, Reports, Settings, and Privacy.
- Separates child adventure navigation from adult evidence and control surfaces.
- Entry from the child experience should use a grown-up check appropriate to the action’s sensitivity.

## Form and feedback primitives

### Choice tile

Used for companions, reading levels, modes, and ratings. It behaves as a radio or checkbox with a visible label, description, focus state, and selected indicator.

### Field message

Uses a short summary plus a recovery action. Errors are announced once and remain associated with their field. Success messages do not interrupt reading unnecessarily.

### Status toast

Used only for brief, noncritical confirmation. One toast may be active at a time. New messages cancel earlier timers, screen changes clear stale live-region text, and critical information remains visible in the page.

### Loading state

Uses stable layout, plain-language status, and a deterministic fallback. It never implies that an answer is wrong while a service is unavailable.

## Component acceptance checklist

Before a component is production-ready, verify:

- 48px minimum touch target where interactive;
- keyboard order and visible focus;
- semantic role, name, state, and value;
- 200% text scaling;
- strong contrast in every state;
- no color-only meaning;
- reduced-motion behavior;
- quiet-mode and text alternatives where audio is involved;
- warm error and retry language;
- no secret, child-data, analytics, payment, social, or ranking side effects.
