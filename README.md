# Read2Earn Kids — AI Reading Coach

Read2Earn Kids turns every book into a **Living Reading Mission**: children read or listen, explore difficult words, explain a story in their own words, receive encouraging feedback, and earn a Knowledge Gem backed by evidence of learning.

This Build Week prototype demonstrates one complete, privacy-forward journey through **The Lantern in Story Forest**. It is a focused proof of the larger platform vision—not a production service for children.

## Signature experience

- Child-selected companion appearance and custom companion name
- Interactive learning-world map and reactive Story Forest mission
- Read by myself, read with companion, and listen-and-follow modes
- Browser narration with speed and quiet-mode controls
- Vocabulary meanings, syllables, and spoken pronunciation
- Spoken comprehension where supported, with a typed fallback
- Supportive, meaning-based comprehension feedback
- Evidence-backed Comprehension Gem
- Five expressive enjoyment ratings, mapped internally to 2–10
- Calm grown-up report with evidence and a suggested next activity
- Reduced motion, visible focus, semantic controls, and responsive layouts

## Privacy boundary

The demo has no accounts, analytics, ads, payments, public profiles, messaging, or cloud database. Nicknames and progress stay in the current browser. No API key is exposed to client code. See [safety and privacy](docs/safety-and-privacy.md).

## Run

Requires Node.js 20 or newer. There are no runtime dependencies to install.

```bash
npm start
```

Open `http://127.0.0.1:4173`.

## Validate

```bash
npm test
```

The validation checks JavaScript syntax, required project files and screens, secret boundaries, story data, static serving, and the deterministic comprehension fallback.

## Project references

- [Approved product experience](docs/product-experience.md)
- [Prototype scope and acceptance criteria](docs/prototype-scope.md)
- [Architecture](docs/architecture.md)
- [Safety, privacy, and accessibility boundary](docs/safety-and-privacy.md)
- [Codex implementation rules](AGENTS.md)

## Roadmap

Future phases may add verified parent accounts, public and premium books, school-controlled private libraries, teacher tools, offline learning, multi-subject content, family challenges, and parent-controlled non-transferable educational collectibles. They are intentionally excluded from this prototype until real family testing, safeguarding review, and learning validation support them.

## License

MIT. Sample story content in this prototype is included for demonstration; confirm final content and illustration rights before publication.
