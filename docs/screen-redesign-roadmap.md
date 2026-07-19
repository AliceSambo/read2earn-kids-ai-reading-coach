# Screen redesign roadmap

## Purpose and sequencing

This roadmap describes how the current nine-view prototype can evolve into a premium ten-surface experience without changing the proven learning loop. The vocabulary helper remains an embedded reading surface but receives its own redesign specification.

Implementation should proceed in vertical slices: tokens and primitives, onboarding, map and mission, reading support, comprehension and reward, then adult reporting. Each slice must preserve the current deterministic journey and pass child-safety and accessibility checks.

## 1. Welcome

### Current state

A polished hero introduces Living Reading Missions, provides a primary adventure action, offers a grown-up report preview, and shows a decorative Story Forest scene.

### Future state

An inviting storybook threshold that immediately communicates “read, understand, and bring the world to life.” The companion appears as an optional guide rather than the visual subject. Privacy and no-ads reassurance remain visible without crowding the invitation.

### Important interactions

- Begin the adventure.
- Open a grown-up explanation or report preview.
- Open comfort settings before onboarding.

### Animation opportunities

The lantern may brighten once when the page becomes ready, and a path may draw toward the primary action. Motion explains the invitation and does not loop beside the heading.

### Accessibility

Keep a skip link, visible focus, semantic heading order, static reduced-motion art, readable privacy copy, and no audio autoplay.

## 2. Companion creation

### Current state

The child selects one of four emoji appearances, enters a nickname and custom companion name, and receives basic local screening.

### Future state

A small companion studio with illustrated, equally capable character concepts. Selection previews expression and voice preference without suggesting rarity or superiority. Nickname and companion name remain short, private, and grown-up reviewed.

### Important interactions

- Compare appearances.
- Enter a child nickname and custom companion name.
- Preview a voice and narration pace.
- Correct a locally flagged name.

### Animation opportunities

Selected companions acknowledge with one brief expression. Voice preview animates a simple speaking indicator, not continuous lip motion.

### Accessibility

Use a true labelled radio group, text descriptions of appearance, no color-only selection, keyboard selection, quiet-mode support, and an adult-correctable screening message.

## 3. Grown-up confirmation

### Current state

A dedicated prototype gate summarizes nickname and companion, offers three reading levels, quiet mode and narration speed, and requires adult confirmation.

### Future state

A calmer review sheet that separates identity, reading support, voice, privacy, and correction actions. It explains that reading level is a support preference rather than a permanent child label.

### Important interactions

- Review and correct each setup choice.
- Choose Emerging, Growing, or Confident Reader.
- Confirm quiet mode, voice, and narration speed.
- Affirm grown-up review before continuing.

### Animation opportunities

Sections may reveal in a short sequence to clarify reading order. Confirmation changes the border and status icon without a large celebration.

### Accessibility

Preserve explicit labels, full keyboard access, disabled-state explanation, large controls, focus return after correction, and no birth-date collection.

## 4. Learning world map

### Current state

A responsive grid presents Story Forest as available and five future worlds as disabled. The companion provides a mission cue.

### Future state

A navigable illustrated map with places positioned consistently across sessions. Locked or future worlds explain availability rather than teasing scarcity. A list view provides an equivalent low-motion and screen-reader-friendly representation.

### Important interactions

- Enter Story Forest.
- Review a completed mission or grown-up report.
- Switch between map and list presentation.
- Open comfort settings.

### Animation opportunities

Paths illuminate when focus moves to a world. Completed evidence changes one meaningful environmental detail. Ambient motion is subtle, pausable, and absent in reduced-motion mode.

### Accessibility

Provide list equivalence, predictable focus order, text world names and states, large targets, no drag-only navigation, and no audio cues without captions or text.

## 5. Story Forest

### Current state

A mission briefing presents the local story, purpose, approximate duration, voice support, target Gem, and three reading modes.

### Future state

A layered mission clearing where the dark lantern establishes a clear problem and each reading mode is explained by the support it provides. The learning goal remains visible in child-friendly language.

### Important interactions

- Review the mission purpose.
- Choose Read by myself, Read with companion, or Listen and follow.
- Return to the learning world.

### Animation opportunities

The lantern responds to focus and remains dim until understanding is demonstrated. Mode cards preview support with brief, optional micro-motion.

### Accessibility

Use a labelled choice group, plain-language mode descriptions, static illustration alternatives, no automatic narration, and a visible path back.

## 6. Reading screen

### Current state

Four story parts show progress, companion encouragement, vocabulary buttons, optional narration, and a next action.

### Future state

A focused reading canvas with adjustable text, comfortable line length, optional line focus, and a companion that recedes while the child reads. Controls remain in predictable positions across pages.

### Important interactions

- Read or request narration.
- Move between story parts.
- Select a vocabulary word.
- Pause, change comfort settings, or return to reading modes.

### Animation opportunities

Listen-and-follow may highlight the current sentence or phrase when accurately synchronized. Page transitions preserve reading position. Story art changes only at meaningful beats.

### Accessibility

Support text scaling, high contrast, keyboard vocabulary access, visible progress text, narration controls, quiet mode, reduced motion, and no forced time limit.

## 7. Vocabulary helper

### Current state

Selecting a highlighted word reveals the word, syllables, meaning, and a pronunciation button inline.

### Future state

A compact word discovery card anchored to the selected word on large screens and presented as an accessible sheet on small screens. It may later include a sentence example and child-controlled repeat practice.

### Important interactions

- Hear the word when supported.
- Read syllables and the child-friendly meaning.
- Repeat or close the helper.
- Return focus to the exact word.

### Animation opportunities

Syllable groups may highlight sequentially only after a pronunciation action. The helper expands with a short size/opacity transition.

### Accessibility

Spoken pronunciation always has written syllables, unsupported speech produces a visible message, focus is managed, and the card never covers the primary reading action.

## 8. Comprehension mission

### Current state

The child answers by typing or supported speech. Deterministic validation requires character, helping action, and outcome, then provides warm retry or success feedback.

### Future state

A conversational reflection clearing that shows the three ideas as neutral prompts without turning them into a checklist to copy. The companion offers one clue at a time and preserves the child’s answer for revision.

### Important interactions

- Choose typed or voice input.
- Submit a retelling.
- Review warm feedback.
- Improve the same answer or continue after demonstrated understanding.

### Animation opportunities

Evidence markers appear only after validation and connect to story elements. Retry feedback uses a calm companion gesture; success restores one part of the world.

### Accessibility

Maintain typed fallback, explicit recording state, no automatic microphone, labelled textarea, status messages with controlled lifetimes, keyboard focus on retry, and non-shaming language.

## 9. Knowledge Gem reward

### Current state

The restored Story Forest, Comprehension Gem, evidence categories, enjoyment rating, and report action appear on one screen.

### Future state

A short world transformation reveals the named Gem and a plain-language evidence sentence. The enjoyment rating remains clearly separate from comprehension so preference never affects the learning award.

### Important interactions

- Review what the Gem represents.
- Rate story enjoyment with expressive, labelled choices.
- Save the mission and open the grown-up report.

### Animation opportunities

The lantern brightens and the safe path appears once. The Gem settles into a future Learning Passport. Reduced motion uses a before/after dissolve and status text.

### Accessibility

Do not rely on gold or animation alone. Announce the skill and evidence once, label rating choices, avoid confetti loops, and keep the continue action immediately available.

## 10. Parent report

### Current state

A calm report shows nickname, companion, level, completed story, Gem, enjoyment, comprehension, word explored, support mode, and next activity. Data remains on-device.

### Future state

An evidence-first report with clear sections for observed learning, support used, child preference, and a practical next conversation. Future multi-mission views can aggregate skills without ranking children.

### Important interactions

- Review or print evidence.
- Understand how the Gem was earned.
- Try the suggested activity.
- Return to the learning world or restart the demonstration.

### Animation opportunities

Use no ambient motion. A small expand/collapse transition may reveal evidence detail; printing removes all decorative elements.

### Accessibility

Use semantic articles and headings, logical print and screen-reader order, strong contrast, plain-language evidence, 200% text scaling, and no chart that lacks a table or text equivalent.

## Delivery checkpoints

1. **Foundation:** approve tokens, typography, component names, and companion behavior.
2. **Prototype mapping:** inventory current selectors and map them to future components without changing behavior.
3. **Accessible component build:** implement isolated components with keyboard, text-scale, motion, and contrast tests.
4. **Vertical redesign slices:** replace one complete journey section at a time behind reviewable pull requests.
5. **Child and grown-up testing:** observe comprehension, navigation, trust, and fatigue—not only visual preference.
6. **Independent review:** complete literacy, accessibility, safeguarding, privacy, and content-rights review before production expansion.
