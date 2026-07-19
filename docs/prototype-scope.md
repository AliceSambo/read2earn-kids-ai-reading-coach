# Build Week prototype scope

## In scope

- Responsive web experience with eight views: welcome, companion setup, world map, mission briefing, reading, comprehension, Knowledge Gem, and grown-up report.
- One original sample story, “The Lantern in Story Forest.”
- Three reading modes and browser speech synthesis when supported.
- Three vocabulary words with syllables, meanings, and pronunciation.
- Spoken comprehension input when supported, with typed input always available.
- Server-side comprehension endpoint plus deterministic offline fallback.
- Evidence-backed Comprehension Gem and five-face story rating.
- Quiet mode, reduced motion, narration speed, semantic controls, keyboard access, and strong focus states.
- Local-only progress persistence.

## Explicitly out of scope

Accounts, Firebase, payments, subscriptions, Web3, wallets, NFTs, public sharing, direct messaging, leaderboards, school verification, school libraries, examinations, app-store builds, production voice assessment, and cloud storage.

## Acceptance criteria

The entire journey works without an API key. No child data leaves the browser except the typed comprehension answer sent to the local prototype server. The client contains no secret or API-key reference. Every primary action is keyboard accessible. Reduced motion disables nonessential animation. The report states evidence and a next step.
