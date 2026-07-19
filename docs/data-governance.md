# Data Governance

## Accountability model

A named privacy owner maintains the data inventory, records of processing, DPIAs, vendor register, retention schedule, rights log, incident register, and approvals. Controller/processor roles are determined per feature and contract; a school relationship does not automatically make either party the controller for every purpose.

## Classification

| Class | Examples | Minimum control |
|---|---|---|
| Restricted child data | Profile link, learning evidence, transcript-derived result, school membership | Need-to-know access, tenant isolation, encryption, audit, explicit retention |
| Confidential adult/staff data | Email, role, consent record, support case | Strong authentication, purpose limitation, access audit |
| Internal | Security metrics, synthetic test data, non-public plans | Workforce access control |
| Public | Approved public books, public policies | Publishing approval and rights record |

Raw child audio, precise location, biometric templates, direct messages, advertising profiles, and unnecessary legal names are prohibited data categories.

## Lifecycle controls

1. **Propose:** document field, purpose, lawful basis, user benefit, sensitivity, owner, recipients, region, and alternatives.
2. **Assess:** perform child-safety, DPIA, threat-model, accessibility, and legal review before collection.
3. **Collect:** obtain only approved data through transparent, age-appropriate and adult-facing notices.
4. **Use:** enforce purpose and tenant scope. Secondary use, including AI training or advertising, is prohibited without a new assessment and valid authority.
5. **Retain:** assign a short, event-based period. “Forever,” “for analytics,” and indefinite inactive-account retention are invalid.
6. **Delete:** remove from active systems promptly and expire backups on a documented cycle; propagate deletion to processors and derived indexes.
7. **Verify:** test deletion, export, correction, tenant separation, and restore behavior regularly.

Exact production periods require a legal and operational retention schedule. Until approved, optional child data is not collected.

## Ownership, access, and rights

Parents manage family profiles. Schools control access to their private educational materials and authorised school records under their contract and applicable law; they do not acquire ownership of the child's identity or unrelated family learning. Data created across family and school contexts must be logically separated, with explicit rules for shared reports.

Rights workflows must authenticate the requesting adult, avoid disclosing another person, support access/correction/deletion/restriction/objection/portability where applicable, record deadlines, and explain lawful exceptions. A school detachment revokes future access without silently deleting records another controller must lawfully retain.

## Tenant and staff governance

- Memberships are verified, expiring, and reviewed each term.
- Teacher access is class- and purpose-scoped; school-admin access is tenant-scoped.
- Privileged support access is approved, time-limited, justified, and audited.
- Departed staff and compromised accounts are revoked promptly.
- Exports are limited, watermarked where appropriate, rate-limited, and recorded.

## AI, voice, analytics, and vendors

- Child interactions are never used to train Read2Earn Kids or third-party models.
- Send no direct identifier to an AI provider when a pseudonymous task payload suffices.
- Do not store raw child audio. Document unavoidable transient subprocessors and regions before enabling voice.
- No analytics SDK is allowed by default. A future metric must be necessary, first-party or rigorously reviewed, aggregate where possible, and excluded from advertising/profile enrichment.
- Vendor onboarding requires security/privacy review, data-processing terms, subprocessor and location disclosure, deletion/return duties, breach notice, audit rights, training prohibition, and an exit plan.

## Copyright and content protection

Each item carries a rights owner, license basis, permitted territories/audiences, expiry, source files, contributor warranties, and review history. Uploaders attest to rights; reviewers verify high-risk content. A notice-and-takedown and counter-notice process preserves evidence and prevents repeat abuse.

Private school books require tenant-scoped authorization, signed download URLs, storage rules that block directory listing, and access revocation. Reasonable watermarking and download controls may deter leakage but must never be described as perfect DRM. Do not train models on licensed content unless the license expressly permits it. Accessibility transformations must preserve attribution and comply with the applicable license.

## Breach and continuity governance

Maintain an incident plan with detection, containment, evidence preservation, severity assessment, controller/processor coordination, regulator and user-notification decision logs, recovery, and lessons learned. Run tabletop exercises for cross-tenant exposure, compromised teacher credentials, leaked secrets, and vendor retention failure. Backups are encrypted, access-tested, restored in drills, and governed by deletion expiry.

## Governance records

The release evidence pack includes the data map, RoPA, lawful-basis matrix, DPIA and best-interests assessment, consent design, vendor register, transfer assessment, retention schedule, rights tests, content-rights ledger, penetration-test report, incident drill, and signed launch checklist.
