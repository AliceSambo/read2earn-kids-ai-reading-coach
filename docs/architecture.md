# Architecture

The prototype intentionally uses no runtime dependencies.

```text
Browser (HTML/CSS/ES modules)
  ├─ local sample story JSON
  ├─ Web Speech synthesis / recognition when available
  ├─ localStorage for prototype preferences and report evidence
  └─ POST /api/comprehension
          └─ Node HTTP server (deterministic feedback fallback)
```

`server.mjs` serves static assets and owns all privileged integration boundaries. When `OPENAI_API_KEY` is configured, the server requests schema-constrained, child-safe comprehension feedback from the configured OpenAI model. Timeouts, API failures, invalid output, and missing credentials all return the deterministic local feedback. `OPENAI_API_KEY` is never delivered to the browser.

The UI is a small state machine. State is persisted only after the child completes a mission. Microphone input is optional, initiated by the user, not recorded by this app, and always paired with a text alternative.
