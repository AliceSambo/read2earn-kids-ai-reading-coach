# Read2Earn Kids — AI Reading Coach

Read2Earn Kids turns every book into a **Living Reading Mission**: children read or listen, explore difficult words, explain a story in their own words, receive encouraging feedback, and earn a Knowledge Gem backed by evidence of learning.

This Build Week prototype demonstrates one complete, privacy-forward journey through **The Lantern in Story Forest**. It is a focused proof of the larger platform vision—not a production service for children.

## Signature experience

- Child-selected companion appearance and custom companion name
- Prototype grown-up confirmation gate with adult correction and privacy-minimising reading levels
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

The validation checks JavaScript syntax, required project files and screens, the grown-up gate, reading-level persistence, speech fallback, secret boundaries, story data, static serving, and the three-category deterministic comprehension fallback.

GitHub Actions runs `npm test` and `git diff --check` with Node.js 20 for every push and pull request targeting `main`. No GitHub Actions secret is required: CI deliberately exercises the deterministic fallback-only demo.

## Deployment preparation

The recommended route is a Render web service using the committed [`render.yaml`](render.yaml):

1. In Render, create a new **Blueprint** from this repository.
2. Review the proposed `read2earn-kids-ai-reading-coach` web service.
3. Deploy it without `OPENAI_API_KEY` first; the complete deterministic demo works without AI credentials.
4. Confirm `GET /health` returns `{ "status": "ok" }` and then complete the smoke checklist below.
5. Optionally add `OPENAI_API_KEY` as a private Render environment variable. Never put its value in GitHub, client JavaScript, `render.yaml`, or `.env.example`.

Runtime variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | Host-provided | Port used by the Node server; defaults to `4173` locally. |
| `HOST` | No | Bind address; defaults to `0.0.0.0` for cloud hosts. |
| `OPENAI_API_KEY` | No | Enables server-side feedback enhancement only. |
| `OPENAI_MODEL` | No | Server-side model ID; defaults to `gpt-5.6`. |

The server never sends the API key to the browser. Missing credentials, timeouts, API errors, or invalid model output fall back to deterministic local feedback. Deployment is intentionally manual and is not triggered by CI.

## Manual smoke-test checklist

- [ ] Choose an avatar, child nickname, and custom companion name.
- [ ] Complete the prototype grown-up gate and choose a reading level.
- [ ] Enter Story Forest and try narration.
- [ ] Open a vocabulary word and verify its meaning and pronunciation action.
- [ ] Submit `The light was safe` and confirm that no Knowledge Gem is awarded.
- [ ] Submit a complete retelling naming Lumi/the firefly, Nia’s helping action, and the safe/bright/restored outcome.
- [ ] Confirm the evidence-backed Knowledge Gem appears.
- [ ] Rate the story and inspect the grown-up learning report.
- [ ] Check a narrow mobile viewport for horizontal overflow.
- [ ] Check `/health` and confirm no client-side secret is present.

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
