# Privacy, Security, and Trust Review Checklist

Use this as an evidence gate, not a box-ticking exercise. Each item needs an owner, date, evidence link, result, and remediation. `N/A` requires a written rationale. Any launch-blocker failure stops release.

## Product review

- [ ] Child benefit and best interests are documented for every data-using feature.
- [ ] A child can use the core experience without a public profile, messaging, location, advertising, or unnecessary PII.
- [ ] Adult-owned profile and grown-up confirmation flows have been usability- and bypass-tested.
- [ ] Reading level uses Emerging/Growing/Confident Reader; no birth date is collected by default.
- [ ] Privacy defaults are highest; no addictive mechanic, dark pattern, shame, or disclosure nudge exists.
- [ ] Child and adult notices are short, accurate, age-appropriate, and match actual behavior.
- [ ] Accessibility, quiet mode, reduced motion, narration control, and typed alternatives pass review.
- [ ] Knowledge Gems remain deterministic and evidence-backed; AI cannot award or override them.
- [ ] Parent correction, export, school detachment, consent withdrawal, and deletion journeys are complete.

## Engineering review

- [ ] Data inventory, classification, purpose, lawful-basis assessment, retention, and deletion owner are approved.
- [ ] Authorization tests cover every family, school, class, role, object, and export boundary.
- [ ] Tenant scope is derived server-side and enforced at API and database layers.
- [ ] Adult/staff authentication, MFA, reauthentication, recovery, sessions, and revocation meet the approved threat model.
- [ ] No keys, tokens, privileged endpoints, or service credentials appear in client bundles, logs, fixtures, screenshots, or Git history.
- [ ] API validation, payload limits, CSRF, CORS, CSP/security headers, rate limits, timeouts, and safe errors are verified.
- [ ] Encryption, key management, backup security, restore, and production-data separation are tested.
- [ ] Logs are content-minimised; privileged events are tamper-resistant and monitored.
- [ ] Dependency/SBOM, secret, static, dynamic, and penetration-test findings are resolved or formally accepted.
- [ ] Rights, full deletion, processor deletion, and backup-expiry drills pass.

## AI and voice review

- [ ] Each AI feature has a bounded purpose, approved input/output schema, safety policy, timeout, rate limit, and deterministic fallback.
- [ ] Direct identifiers are removed; prompts and outputs are excluded from routine logs.
- [ ] Provider terms/configuration prohibit training on child interactions and document retention, regions, subprocessors, deletion, and incidents.
- [ ] Prompt-injection, data-exfiltration, harmful-content, bias/dialect, false-guidance, and dependency-manipulation evaluations pass.
- [ ] AI cannot diagnose, discipline, message, make high-stakes decisions, or modify authoritative learning evidence.
- [ ] Microphone use is explicit, adult-approved where required, never automatic, and always has a typed alternative.
- [ ] Network/storage tests show Read2Earn Kids stores no raw child audio or voiceprint.
- [ ] Browser/vendor speech behavior is accurately disclosed; voice is disabled where transient handling cannot be guaranteed.

## School review

- [ ] Controller/processor roles, instructions, security duties, rights handling, breach notice, deletion, and exit terms are contracted.
- [ ] School, admin, teacher, class, student, and parent-link verification processes are documented and tested.
- [ ] Staff access is least-privilege, reviewed each term, promptly revoked, and MFA-protected for privileged roles.
- [ ] No teacher-child direct messaging or public cross-school leaderboard is available.
- [ ] Private books are tenant-scoped; licenses, upload provenance, moderation, expiry, takedown, and export controls are recorded.
- [ ] Parent visibility/authority and school educational authority are mapped for each data flow; conflicts have an escalation path.
- [ ] School offboarding returns/deletes data according to contract and law without exposing another tenant.

## Launch review

- [ ] Applicable-jurisdiction memo covers COPPA, GDPR child provisions, UK Children's Code, Nigeria Data Protection Act, and store/platform rules.
- [ ] DPIA, best-interests assessment, RoPA, lawful-basis matrix, consent design, notices, retention schedule, and transfer assessment are signed off.
- [ ] Privacy, safeguarding, accessibility, literacy, content-rights, and security specialists approve the release.
- [ ] Vendor DPAs, subprocessor list, security evidence, deletion commitments, and exit plans are complete.
- [ ] Incident/breach and child-safety runbooks have named on-call owners and successful tabletop exercises.
- [ ] Monitoring detects tenant violations, privilege abuse, unusual exports, secret exposure, and repeated safety failures without profiling children.
- [ ] Critical/high security findings and all threat-model launch blockers are closed.
- [ ] Production configuration matches reviewed configuration; rollback and kill switches are tested.
- [ ] Public contact paths support privacy rights, safety reports, security reports, and copyright takedowns.
- [ ] Executive release owner accepts documented residual risks; approval has an expiry/review date.

## Decision record

| Field | Value |
|---|---|
| Release / feature | |
| Review date | |
| Privacy owner | |
| Safeguarding owner | |
| Security owner | |
| Legal reviewer | |
| Evidence pack | |
| Open blockers | |
| Decision and expiry | |
