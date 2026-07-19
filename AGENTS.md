# Read2Earn Kids implementation rules

This repository implements the approved **Living Reading Missions** prototype. Every change must preserve the following invariants.

## Product invariants

- The child chooses an appearance and gives the companion a custom name during first-time setup. Use a child-safe name screen and a neutral fallback; never force a predetermined name.
- A clearly labelled prototype grown-up gate must confirm the nickname, companion appearance and name, reading level, and narration preferences before the learning world opens. Local name screening is basic assistance, not guaranteed moderation, and the adult can correct choices.
- The complete prototype journey includes the world map, a story mission, three reading modes, vocabulary/pronunciation support, spoken or typed comprehension, encouraging feedback, an evidence-backed Knowledge Gem, a five-face enjoyment rating, and an adult learning report.
- Knowledge Gems represent demonstrated skills. Never reward mere page completion or time spent.
- Adult reports explain what the child understood, words explored, help used, and a useful next activity.
- The experience should be responsive, lively, and purposeful—not a static dashboard. Motion must have a reduced-motion equivalent.

## Child safety and privacy

- No open child profiles, direct messaging, public feeds, location, targeted advertising, manipulative streaks, tradable rewards, or child-controlled payments.
- Do not collect a full legal name. Treat the child-entered name as an on-device nickname.
- Use Emerging Reader, Growing Reader, or Confident Reader instead of collecting a birth date.
- Do not place API keys, credentials, or privileged service calls in client code. AI calls must go through the server and have a safe local fallback.
- Never shame, rank, frighten, or pressure a child. Feedback must be warm, specific, and retry-friendly.
- Sharing, school identity, accounts, cloud voice storage, microphones, AI processing, and payments require explicit adult controls and are outside this prototype unless separately approved.

## Accessibility and learning quality

- Maintain keyboard access, visible focus, semantic labels, strong contrast, large touch targets, scalable text, captions/text alternatives, narration-speed control, quiet mode, and reduced-motion support.
- Do not use color alone to convey meaning. Do not autoplay audio.
- Keep instructions short. Provide read-by-myself, read-with-companion, and listen-and-follow modes.
- Vocabulary help includes a child-friendly meaning, syllables, and a pronunciation action.
- Comprehension accepts voice where supported and always provides a typed fallback.

## Engineering and release

- Keep sample content local and deterministic. The app must remain demonstrable without an API key.
- Run `npm test` before proposing publication. Validate JavaScript syntax and verify no client-side secret reference.
- Show the user the proposed diff and test results before committing, pushing, opening a pull request, deploying, or publishing.
- Do not merge or publish without explicit user approval.
