# Premium UI redesign implementation roadmap

## Purpose

This roadmap explains how the current Read2Earn Kids prototype can become the premium visual experience defined in the Visual Product Bible without replacing the proven learning journey all at once.

The redesign must remain a sequence of small, reviewable vertical slices. Each phase preserves runtime behavior until its own acceptance criteria and regression tests are satisfied.

## Current baseline

The current prototype already proves:

- child nickname and custom companion naming;
- grown-up confirmation of identity, reading level, and narration preferences;
- a learning-world map and Story Forest mission;
- three reading modes;
- vocabulary and pronunciation support;
- typed and supported voice comprehension;
- deterministic character/action/outcome evidence;
- warm retry guidance;
- an evidence-backed Knowledge Gem;
- enjoyment rating and grown-up report;
- local-only settings and progress;
- server-side secret handling and a complete no-key fallback;
- keyboard, focus, quiet-mode, narration-speed, and reduced-motion support.

The premium redesign may change presentation and component architecture, but it cannot silently alter these product truths.

## Non-negotiable guardrails

Every implementation phase preserves:

- child safety and warm, non-shaming language;
- privacy-minimising nickname and reading-level choices;
- the grown-up confirmation gate;
- child-selected and child-named companions;
- deterministic learning evidence as the authority for Knowledge Gems;
- local-only prototype storage;
- server-side keys and privileged calls;
- typed fallback for voice;
- quiet mode, reduced motion, narration control, keyboard access, visible focus, text scaling, and contrast;
- no addictive mechanics, streak pressure, public ranks, or scarcity;
- no public child profiles, feeds, direct messaging, location, advertising, analytics, payments, tradable rewards, or cloud child-data storage.

## Architecture approach

### 1. Separate semantics from presentation

Keep the current state machine and evidence logic stable while introducing:

- semantic design tokens;
- reusable presentational components;
- explicit child and adult visual modes;
- an asset registry with fallback illustrations;
- motion adapters that honor reduced motion.

The existing prototype must remain usable at every intermediate commit.

### 2. Replace vertical slices, not isolated colors

A slice includes the complete behavior around a user outcome: structure, component styling, keyboard flow, motion, responsive layout, fallback, tests, and documentation. Avoid partially reskinning every screen at once.

### 3. Make rollback inexpensive

- Keep pull requests small and screen-scoped.
- Do not mix visual migration with comprehension, storage, server, payment, account, or AI behavior changes.
- Preserve known selectors or update tests in the same reviewed change.
- Retain static and reduced-motion fallbacks before adding advanced animation.

## Phase 0 — Foundation approval

### Scope

- Approve `docs/design-system.md` and the semantic token roles.
- Approve companion concepts and emotional boundaries.
- Approve the Visual Product Bible and asset production plan.
- Resolve naming differences between the prototype map and future world architecture.
- Confirm font licensing, illustration ownership, and production tooling.

### Deliverables

- signed-off token inventory;
- component naming map;
- companion silhouette and expression tests;
- world-map information architecture;
- asset provenance template;
- accessibility and literacy review checklist.

### Exit criteria

- No unresolved conflict with `AGENTS.md`.
- Critical color pairs meet contrast targets.
- Companion concepts work at 48px and in monochrome.
- Every proposed world has a documented learning purpose.
- No runtime files have changed.

## Phase 1 — Token adapter and component laboratory

### Scope

- Convert JavaScript token architecture into the implementation format chosen for the existing app.
- Create isolated primary, secondary, reward, and navigation buttons.
- Create choice tiles, cards, progress, dialog, field message, status toast, and focus primitives.
- Create child Adventure and adult Evidence theme examples.

### Constraints

- Components are demonstrated in an isolated laboratory or non-production route.
- No prototype screen imports the new system until the components pass review.
- No new dependencies without performance, licensing, maintenance, and security review.

### Tests

- keyboard and focus states;
- 48px touch targets;
- 200% text scaling;
- contrast for every state;
- reduced-motion and no-motion modes;
- screen reader name, role, state, and value;
- mobile through desktop layout;
- no client secret or data behavior.

### Exit criteria

All primitives pass the component acceptance checklist in `docs/ui-components.md`.

## Phase 2 — Welcome and companion onboarding slice

### Scope

- Redesign Welcome.
- Replace emoji-only companion selection with reviewed placeholder or final companion art.
- Apply the new choice tile, field, button, and privacy-message components.
- Preserve local name normalization, basic screening, and adult correction.
- Preserve the existing grown-up confirmation as the mandatory next step.

### Behavioral invariants

- The child chooses appearance and custom name.
- The app requests a nickname, not a full legal name.
- No voice or audio autoplays.
- The map cannot open before grown-up confirmation.
- Settings remain usable before entry.

### Exit criteria

- End-to-end onboarding tests pass unchanged or with reviewed selector updates.
- Name-screening and grown-up-gate negative tests pass.
- Mobile and 200% text layouts expose every primary action.
- Child and grown-up usability sessions show the choice sequence is understood.

## Phase 3 — Learning World Map and Story Forest slice

### Scope

- Implement the stable six-world information architecture.
- Provide equivalent illustrated-map and semantic-list views.
- Redesign the Story Forest mission briefing.
- Add static environment assets before advanced motion.
- Document and migrate any world-name changes.

### Behavioral invariants

- Story Forest remains the clear available first mission.
- Future worlds communicate honest availability.
- Disabled areas do not create scarcity or pressure.
- The grown-up report boundary remains accessible.
- No drag-only or pointer-only navigation.

### Exit criteria

- Map and list expose identical destinations and states.
- Keyboard and screen-reader journeys reach Story Forest predictably.
- Reduced motion removes ambient movement.
- Current mission and report navigation tests pass.

## Phase 4 — Reading canvas and help slice

### Scope

- Redesign the story page around readable measure and stable controls.
- Introduce reviewed story-beat art.
- Implement the vocabulary helper as an anchored card and mobile sheet.
- Refine narration, quiet-mode, speed, pronunciation, and unsupported-browser feedback.
- Keep the companion outside the primary reading measure.

### Behavioral invariants

- Read by myself, Read with companion, and Listen and follow remain available.
- Story text is never covered by companion motion or help surfaces.
- Pronunciation is child initiated.
- Vocabulary retains written syllables and meaning.
- Voice and narration failures never block reading.
- Progress means “Part X of Y,” not speed or performance.

### Exit criteria

- All three reading modes pass at phone, tablet, and desktop sizes.
- Text scales to 200% without hidden navigation.
- Helpers restore focus to the originating word.
- Quiet, unsupported speech, and reduced-motion fallbacks pass automated and manual checks.

## Phase 5 — Comprehension and evidence slice

### Scope

- Redesign the comprehension mission as a calm reflection clearing.
- Present typed and supported voice input through shared components.
- Improve evidence presentation without changing validation authority.
- Add bounded AI-enhanced wording only in a separately approved server change, with the local fallback remaining complete.

### Behavioral invariants

- Character, action, and outcome remain three distinct required categories.
- “The light was safe” remains insufficient.
- Meaningful retellings can use varied wording.
- Retry language is warm and preserves the editable answer.
- AI cannot award a Knowledge Gem or weaken deterministic validation.
- Voice is optional and no child audio is stored by this prototype.

### Exit criteria

- Deterministic weak and complete answer tests pass.
- Repeated status and toast messages have correct live-region lifecycles.
- Typed fallback works when speech APIs are absent.
- Server errors and missing credentials return safe local feedback.
- No secrets appear in browser assets or responses.

## Phase 6 — Knowledge Gem and Parent Report slice

### Scope

- Implement the evidence-backed world transformation.
- Replace placeholder Gem art with reviewed skill assets.
- Keep enjoyment rating separate from evidence.
- Redesign the grown-up report in calm Evidence mode.
- Add print-specific presentation.

### Behavioral invariants

- A Gem requires demonstrated evidence.
- Page completion, time, rating, and taps do not affect the award.
- The report includes nickname, companion, level, mode, words, evidence, Gem, enjoyment, and next activity.
- Reports do not rank children or imply diagnosis.
- Prototype data remains on-device.

### Exit criteria

- Weak answers cannot reach the reward state.
- Complete evidence produces the correct story transformation and Gem explanation.
- Report screen and print output preserve logical reading order.
- Reduced motion communicates the same before/after state.
- Mobile report has no hidden content or horizontal overflow.

## Phase 7 — Asset integration and performance

### Scope

- Integrate optimized companion, world, icon, Gem, and story-beat assets.
- Add state-driven motion only after static states pass.
- Establish budgets for initial load, image memory, animation CPU, and low-bandwidth behavior.
- Add robust fallback images and font loading behavior.

### Performance principles

- The first useful screen should not wait for nonessential world art.
- Story text and primary actions render before decorative assets.
- Assets are responsive and cached without exposing child data.
- Reduced-data and low-bandwidth modes prefer static, compressed art.
- A missing asset never removes a label or action.

### Exit criteria

- No layout shift hides or moves a primary action unexpectedly.
- Slow-network smoke tests complete the full journey.
- Asset failures preserve text and navigation.
- Animation remains smooth on representative low- and mid-range devices.

## Phase 8 — Validation with children and grown-ups

### Scope

Conduct moderated, consented testing with representative children and grown-ups, supported by literacy, accessibility, and safeguarding professionals.

Measure:

- whether children understand the primary action;
- whether support feels helpful rather than corrective;
- whether children distinguish effort, enjoyment, and demonstrated evidence;
- whether grown-ups understand the report and privacy boundary;
- whether motion, sound, text, and density cause fatigue;
- whether reading-level variants support rather than label.

Do not optimize for session length, return pressure, taps, or content consumption.

### Exit criteria

- Critical comprehension and navigation problems are resolved.
- Safeguarding, literacy, privacy, and accessibility reviews document residual risks.
- No dark pattern, manipulative engagement, or misleading reward interpretation remains.

## Pull-request sequencing

Recommended PR sequence:

1. token adapter and component laboratory;
2. button, choice, focus, and feedback primitives;
3. Welcome and companion onboarding;
4. grown-up confirmation styling;
5. map/list and Story Forest briefing;
6. reading canvas and vocabulary helper;
7. comprehension presentation;
8. reward and parent report;
9. asset and motion optimization;
10. final cross-journey accessibility and performance hardening.

Each PR should:

- state which invariant it preserves;
- include before/after screenshots at 320px, 375px, 768px, and desktop where visual behavior changes;
- include keyboard and reduced-motion evidence;
- run `npm test`, the visual smoke test, and `git diff --check`;
- scan client output for secrets;
- avoid unrelated server, storage, account, payment, analytics, or social changes;
- remain independently reviewable and reversible.

## Definition of premium-ready

The redesigned prototype is premium-ready only when:

- the full current journey still works without an API key;
- the Golden Path feels visually coherent across all five flagship screens;
- the six-world map has accessible map and list architectures;
- the companion is child-selected, child-named, grown-up-confirmed, and emotionally bounded;
- Knowledge Gems remain evidence-backed;
- child and adult modes share a consistent design system;
- all primary actions work by keyboard and at 200% text scale;
- reduced motion, quiet mode, narration controls, typed fallback, and safe speech fallbacks work;
- no public profile, direct messaging, addictive mechanic, advertising, analytics, payment, tradable reward, or cloud child-data storage has been introduced;
- independent child-safety, literacy, privacy, accessibility, rights, and performance reviews are complete.

Until then, the current prototype remains the behavioral reference and every redesign step remains reversible.
