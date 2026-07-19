# Read2Earn Kids design system foundation

## Purpose

This document defines the visual and interaction foundation for the future premium Read2Earn Kids experience. It does not replace the current prototype UI. It gives future screens and components a shared language so that design decisions remain consistent, accessible, child-safe, and connected to demonstrated learning.

The system supports two related modes:

- **Adventure mode** for children: warm, spacious, responsive, and story-led.
- **Evidence mode** for grown-ups and teachers: calm, structured, transparent, and easy to scan.

Both modes use the same tokens and accessibility rules. They differ in visual intensity, not in product truth.

## Product design philosophy

Read2Earn Kids should feel like an **interactive learning adventure**, a **trusted companion**, and a **magical reading journey**. Education comes first; entertainment makes the learning invitation more welcoming.

The experience should:

- turn each book into a purposeful mission;
- make help feel natural rather than remedial;
- let the story world respond to understanding;
- connect every meaningful reward to evidence;
- create natural pauses instead of endless engagement loops;
- give grown-ups clear explanations of what happened and what to try next.

The experience should avoid:

- noisy or competitive gamification;
- addictive streak pressure, countdowns, or loss framing;
- crowded dashboards and excessive badges;
- motion without meaning;
- celebrations that obscure the learning evidence;
- interfaces that look playful but are difficult to read or navigate.

## Design principles

### 1. Child-first

- Use touch targets of at least 48 by 48 CSS pixels, with generous separation.
- Present one primary decision at a time and no more than three or four peer choices without grouping.
- Pair icons with text until the icon is demonstrably familiar.
- Give immediate, specific feedback in encouraging language.
- Use short instructions and progressive disclosure.
- Never use shame, urgency, loss, or comparison with another child.

### 2. Parent-trusted

- Explain why a child earned a Knowledge Gem.
- Separate observed evidence from recommendations.
- Keep reports calm, readable, and free from decorative distraction.
- State clearly what is stored, where it is stored, and what is not collected.
- Require grown-up confirmation for child identity, companion, voice, and privacy-sensitive choices.

### 3. Teacher-ready

- Use repeatable patterns that can later support subjects, classes, assignments, and evidence categories.
- Design progress as a collection of demonstrated skills, not time spent.
- Keep terminology measurable and suitable for a learning record.
- Preserve a clear hierarchy from learning world to mission to activity to evidence.

### 4. Accessible by default

- Respect operating-system reduced-motion preferences and provide an in-product control.
- Provide quiet mode and narration speed controls.
- Use readable typography, scalable text, visible focus, and keyboard-operable controls.
- Never use color, sound, or animation as the only carrier of meaning.
- Keep a typed alternative wherever voice input exists.
- Maintain strong contrast and test component states, not only default surfaces.

### 5. Purposeful delight

- Animate a response to a child action, a change in story state, or an earned learning outcome.
- Use small ambient motion only when it helps the world feel alive and can be disabled.
- Prefer one memorable transformation over many simultaneous effects.
- Let the companion guide attention without blocking content.

### 6. Evidence before reward

- Knowledge Gems represent a named skill and include a plain-language reason.
- Page completion, elapsed time, or repeated tapping never unlocks a learning reward by itself.
- Celebrations follow evidence; they do not replace it.

## Brand system

### Brand personality

| Trait | Expression | Avoid |
| --- | --- | --- |
| Curious | Questions, discovery language, unfolding paths | Constant novelty or distraction |
| Safe | Predictable navigation, clear gates, warm boundaries | Surveillance or false guarantees |
| Encouraging | Specific effort feedback and retry invitations | Empty praise or pressure |
| Adventurous | Story worlds, missions, gentle transformation | Combat, risk, or fear framing |
| Intelligent | Evidence, clear explanations, thoughtful prompts | Dense academic language |
| Warm | Rounded forms, natural colors, companion presence | Infantile styling for older readers |

### Color architecture

Tokens use role-based names so future themes can change without rewriting components. Exact values are defined in `public/design/tokens.js`.

#### Primary colors

- **Journey Violet (`#5B4BDB`)** — primary actions, selected navigation, and the Read2Earn identity. Violet balances imagination with trust and remains distinct from error and success states.
- **Deep Story Ink (`#24203B`)** — headings and high-priority text. It provides softer warmth than pure black while maintaining strong contrast.

#### Secondary colors

- **Discovery Blue (`#2F79C8`)** — links, informational highlights, and exploration cues. It signals assistance without competing with the primary action.
- **Companion Coral (`#E76F51`)** — small character accents and moments of warmth. It is not used for errors or long text.
- **Canopy Teal (`#25877F`)** — nature, vocabulary discovery, and calm learning support.

#### Background colors

- **Cloud (`#FCFBFF`)** — default page background; nearly white to reduce glare.
- **Lavender Mist (`#F1EFFF`)** — grouped child-facing surfaces and selected states.
- **Warm Parchment (`#FFF8E8`)** — reading and story surfaces, echoing paper without lowering contrast.
- **Adult Canvas (`#F5F7FA`)** — calmer report and administration surfaces.
- **Surface (`#FFFFFF`)** — cards, dialogs, and raised content.

#### State colors

- **Success Green (`#237A52`)** — confirmed progress and completed evidence. Always paired with a check icon and text.
- **Learning Gold (`#D39A16`)** — Knowledge Gems and earned learning evidence. Gold is reserved for demonstrated outcomes, not purchases or generic points.
- **Warning Amber (`#A15F00`)** — grown-up attention, incomplete setup, and recoverable caution. It is dark enough for accessible text on Warm Parchment and never implies child failure.
- **Error Rose (`#B5415A`)** — form errors and unavailable actions. Error copy explains recovery and never blames the child.
- **Info Blue (`#286FAE`)** — neutral guidance and system information.

#### Contrast rules

- Body text and essential icons target WCAG AA contrast of at least 4.5:1.
- Large text and non-text UI boundaries target at least 3:1.
- Gold, coral, and pale tints are accents or backgrounds, not standalone body-text colors.
- Every state includes text or an icon in addition to color.

### Typography

- **Display font: Nunito Sans** — used for world names, mission titles, and concise celebratory headings. Its rounded forms feel welcoming while remaining legible.
- **Reading font: Atkinson Hyperlegible Next** — used for story text, vocabulary meanings, questions, and reports. Distinct letterforms support readers with low vision and reduce ambiguity.
- **UI font: Nunito Sans** — used for buttons, labels, tabs, and navigation to keep controls friendly and compact.
- **System fallback:** `system-ui`, `Segoe UI`, and `sans-serif` keep the app functional before web fonts load.

Typography rules:

- Default child reading text begins at 20px with a line height of at least 1.65.
- Adult report body text begins at 16px with a line height of at least 1.5.
- No essential text is smaller than 14px.
- Line length targets 45–70 characters for story text and 55–80 for adult reports.
- Font size can scale to 200% without clipping, overlap, or loss of action access.
- Italics are limited; emphasis relies on weight and structure.
- Uppercase is reserved for short eyebrow labels and never used for instructions or story paragraphs.

## Layout and spacing

- Use a four-pixel base grid with semantic steps from 4px to 64px.
- Child screens use more breathing room and fewer simultaneous regions.
- Adult screens use denser but still generous 16–24px card spacing.
- Content width is constrained: approximately 720px for reading and 1120px for maps and reports.
- Safe-area insets are respected on mobile devices.
- Primary actions remain visible after content and are never hidden behind fixed navigation.

## Shape, elevation, and iconography

- Child cards use 20–28px radii; adult report cards use 12–20px radii.
- Buttons use 14–18px radii rather than fully pill-shaped controls unless the control represents a compact status.
- Shadows are soft and shallow. Elevation communicates layering, not importance.
- Icons use a consistent rounded, two-dimensional style and always have accessible labels when interactive.
- Emoji may support prototype character expression but are not the long-term icon system.

## Motion system

| Motion role | Typical duration | Purpose |
| --- | ---: | --- |
| Instant state | 80–120ms | Press, focus, toggle response |
| Component transition | 160–220ms | Card reveal, helper expansion |
| Screen transition | 240–320ms | Maintain spatial continuity |
| Story transformation | 500–800ms | Show a meaningful world change |

Motion principles:

- Use ease-out for entrances and ease-in for exits.
- Avoid looping motion near reading text.
- No celebration blocks navigation for more than one second.
- Reduced-motion mode replaces movement with opacity, color, icon, and text changes.
- Audio never autoplays; narration begins only after a clear child or grown-up action.

## Content voice

Child-facing copy is short, concrete, and supportive:

- Prefer: “You found one important part. Who did Nia help?”
- Avoid: “Incorrect. Try again.”

Adult-facing copy distinguishes evidence from interpretation:

- Evidence: “Named the character, helping action, and safe outcome.”
- Next activity: “Ask what patience means in the child’s own words.”

## Governance

- New colors, spacing values, and motion timings must be added as tokens rather than embedded in components.
- Components are named by purpose, not by a single screen.
- Every new component documents keyboard behavior, focus behavior, text scaling, reduced motion, and empty/error states.
- Child-facing changes require review against `AGENTS.md`, `docs/safety-and-privacy.md`, and the evidence-before-reward rule.
- The design token files are architecture only in this phase; the current UI does not import them yet.
