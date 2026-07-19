# Privacy, Security, and Trust Framework

**Status:** production-readiness architecture, not a certification

**Last reviewed:** 2026-07-19

**Applies to:** family, school, content, voice, and AI features

This framework defines what Read2Earn Kids must prove before processing children's data in production. The current prototype remains local-first: it has no registration, cloud database, analytics, advertising, payments, or stored audio. Legal counsel and a qualified privacy lead must validate the applicable launch jurisdictions, roles, notices, consent method, contracts, and retention periods.

## Non-negotiable trust rules

- No public child profiles, direct child messaging, location tracking, behavioural advertising, or unnecessary personal information.
- An authenticated adult owns every child profile. A child profile is not an independent account.
- Use a nickname and `Emerging Reader`, `Growing Reader`, or `Confident Reader`; do not request a birth date unless a documented legal assessment later proves it necessary.
- Privacy settings default to their most protective state. No dark patterns, addictive streaks, or pressure to disclose data.
- Child audio is processed transiently after an explicit action and is not stored by Read2Earn Kids.
- AI providers may not train on child interactions. Privileged credentials and AI calls stay server-side.
- Deterministic comprehension validation is authoritative. AI may explain or encourage, but cannot award a Knowledge Gem or override the evidence gate.

## Data minimisation

| Data | Permitted purpose | Default handling | Prohibited handling |
|---|---|---|---|
| Adult account identifier | Authentication, notices, recovery | Encrypted in transit and at rest; retained while account is active | Marketing without separate choice |
| Child nickname | Identify a profile within its family or authorised class | Pseudonymous; private by default | Full legal name, public directory, contact handle |
| Reading level | Adapt presentation and learning support | One of three broad bands | Inferring exact age or disability |
| Companion choices | Personalise the experience | Parent-reviewable | Advertising or sensitive profiling |
| Learning evidence | Reports, assignments, and Knowledge Gems | Purpose-limited and tenant-scoped | Public ranking, advertising, or AI training |
| Voice input | Transcription for a child-initiated answer | Memory-only pipeline; discard audio after response | Recording library, biometric voiceprint, human review by default |
| Security events | Detect abuse and investigate incidents | Minimise content; pseudonymise identifiers; short retention | Logging raw answers, audio, tokens, or secrets |

Every new field requires an owner, purpose, lawful-basis assessment, retention rule, access list, deletion path, and DPIA review before implementation.

## Parent-owned child profiles

1. The adult authenticates first and creates or accepts responsibility for a child profile.
2. The grown-up gate confirms nickname, companion, reading level, and narration preferences.
3. The parent can view, correct, export, detach from a school, and request deletion of the profile, subject to documented school/legal retention duties.
4. Child mode cannot change consent, privacy, identity, payments, school membership, sharing, or account recovery.
5. Sensitive transitions require recent adult reauthentication, not a child-visible PIN alone.

## School tenant isolation and permissions

Every school is a separate tenant. Tenant identity is derived from the authenticated server-side membership, never trusted from a client-supplied `schoolId`.

| Role | Allowed | Never allowed |
|---|---|---|
| Parent | Manage owned child profiles; approve school link; see authorised reports | See unrelated children or another school's private content |
| Child | Use assigned/private content through an approved profile | Search users, message, publish, pay, administer, or export rosters |
| Teacher | See and assign only authorised classes and subjects | Approve own privilege, browse whole-school data, or change consent |
| School admin | Manage verified school memberships, classes, and school content | Access other tenants or platform secrets; silently assume parent rights |
| Platform security admin | Time-bound support/security access with audit and approval | Routine browsing of learning content or silent impersonation |

Permissions must be deny-by-default, relationship-scoped, server-enforced, and tested for horizontal and vertical privilege escalation. High-risk school actions require MFA, immutable audit events, and separation of duties where practical.

## Authentication and session strategy

- Authenticate adults and staff only; child mode is a constrained profile session under an adult or school-authorised session.
- Prefer passkeys or reputable OIDC providers. Require phishing-resistant MFA for school and platform administrators and offer it to parents.
- Hash passwords with a current memory-hard password hashing function if passwords are supported; never store plaintext or reversible passwords.
- Use secure, `HttpOnly`, `SameSite` cookies; rotate session identifiers after authentication and privilege changes; apply idle and absolute expiry.
- Rate-limit authentication and recovery. Recovery must not reveal whether a child exists and must invalidate compromised authenticators and sessions.
- Reauthenticate adults for consent, exports, deletion, school linking, purchases, and permission changes.

## API and database security

- Enforce authentication, authorization, object ownership, tenant scope, input schemas, content-length limits, rate limits, and safe error responses at every endpoint.
- Protect state-changing browser requests against CSRF; use an explicit CORS allowlist; set CSP and other security headers.
- Generate opaque identifiers. Never treat an unguessable ID as authorization.
- Store secrets in a managed secret store; rotate them; never ship them to clients, logs, fixtures, screenshots, or Git history.
- Apply row-level or equivalent policy using both tenant and relationship keys. Separate public content, family records, school records, and operational logs.
- Encrypt traffic and managed storage; use least-privilege service identities, private backups, tested restore procedures, and key rotation.
- Never copy production child data into development. Use synthetic fixtures.
- Log access decisions and privileged changes without logging raw child content, access tokens, prompts, or audio.

## AI safety and data handling

AI requests pass through a server policy layer that removes unnecessary identifiers, bounds the task, constrains output to a schema, applies timeouts and rate limits, and falls back safely. Provider contracts and settings must prohibit training on submitted child data and document any provider retention, subprocessors, regions, deletion, and incident terms.

The AI may provide vocabulary help, friendly explanations, or a suggested adult summary. It must not diagnose, counsel, independently moderate emergencies, make high-stakes education decisions, expose system prompts, contact a child, or turn free-form output into an authoritative achievement. Prompt-injection instructions inside books or child input are untrusted data.

## Voice privacy

- Do not activate a microphone automatically. Explain the action in child-friendly language and provide a typed alternative.
- Obtain verified adult permission before any production cloud speech processing.
- Stream only the minimum segment needed; do not persist raw audio, create voiceprints, or use audio for model improvement.
- Disclose browser, operating-system, and vendor processing that Read2Earn Kids cannot control.
- Suppress raw audio and transcripts from analytics and logs; retain only the minimum derived learning evidence after review.
- If transient processing or deletion cannot be contractually and technically guaranteed, voice remains disabled.

## Regulatory readiness map

“GDPR-K” is used here only as shorthand for children's protections under the GDPR; it is not a separate law.

| Framework | Readiness requirement | Evidence before launch |
|---|---|---|
| US COPPA | Parent control, clear notice, verifiable parental consent before covered collection, reasonable security, minimised retention, parent access/deletion | Applicability memo, approved VPC flow, notices, vendor review, deletion test |
| EU GDPR, including Article 8 | Lawful basis for each purpose, child-appropriate transparency, data protection by design/default, rights handling, processor terms, DPIA where high risk; verify each Member State's digital-consent age | RoPA, DPIA, lawful-basis matrix, notices, DPA/SCC analysis, rights tests |
| UK GDPR and Children's Code | Best interests primary; high privacy by default; age-appropriate transparency; data minimisation; geolocation off; safe parental controls; no detrimental nudges | Best-interests assessment, DPIA, code self-assessment, UX evidence |
| Nigeria Data Protection Act 2023 | Confirm controller/processor duties, lawful basis, child-consent/age rules, security, data-subject rights, DPIA, breach, DPO/registration, and cross-border obligations with Nigerian counsel/NDPC guidance | Nigeria launch memo, DPIA, rights and breach drills, processor/cross-border records |

Primary references: [FTC COPPA guidance](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions), [EU GDPR text](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [ICO Children's Code standards](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/code-standards/), [Nigeria Data Protection Commission](https://ndpc.gov.ng/), [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/), and [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html).

## Release gates

Production launch is blocked until the threat model, DPIA/best-interests assessment, permission tests, deletion/export tests, vendor contracts, incident plan, content-rights evidence, penetration test, dependency review, privacy notices, consent evidence, and the checklist in `privacy-review-checklist.md` are approved by named owners.
