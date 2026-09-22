# Tasks

## TAL-001 — URL → safe scan → normalized findings
**Status:** DONE  
**Priority:** P0

### Implemented
- HTTP(S) target normalization.
- Initial public-network / SSRF guard.
- Explicit time and request limits.
- Playwright console-error capture.
- Failed-request and HTTP 4xx/5xx capture.
- Observation / Evidence / Finding separation.
- Stable SHA-256-based fingerprints and IDs.
- Deduplication tests.
- No LLM dependency for Finding creation.
- Scanner-caused request aborts excluded from request-failure findings.
- CI verification.
- Locked-down Windows bootstrap path without requiring a global pnpm shim.

### Acceptance
- [x] Run bootstrap on the developer PC.
- [x] Run live Chromium scan against an approved public target.
- [x] Inspect normalized JSON and confirm evidence quality.
- [x] Run a healthy control target and produce zero false findings.
- [x] Run a positive HTTP 404 target and produce real Observation → Evidence → Finding output.

### Verification note — 2026-09-22
Healthy control:
- `https://example.com`
- 1 request
- 0 observations
- 0 evidence
- 0 findings

Positive control:
- `https://example.com/talionqa-test-404`
- 1 request
- 2 observations
- 2 evidence records
- 2 findings

The 404 generated both an HTTP-error signal and a browser console-error signal. Keep both raw findings/evidence, but do not assume they should remain two user-facing issues.

## TAL-002 — Real findings → X-Ray projection
**Status:** READY  
**Priority:** P0

### Current state
A white/purple React Flow X-Ray prototype exists with clearly labeled demo data.

### Goal
Derive `ProjectGraph` from a real `ScanResult`, so Findings appear in spatial project context without hard-coded demo findings.

### Architecture note
Raw scanner Findings remain evidence-preserving source records.

The X-Ray projection should introduce a boundary where related signals can be grouped/correlated for presentation. The first live 404 test proved that one underlying problem can create multiple technical Findings.

Do not delete source evidence to achieve deduplication.

### Acceptance
- no fake scan metrics;
- graph data comes from shared contracts;
- finding selection resolves real evidence;
- empty/healthy states are designed;
- related signals can be represented without forcing duplicate user-facing issue cards;
- UI remains responsive and accessible;
- visual QA runs through the committed browser workflow.

## TAL-003 — Repository fingerprint / Project DNA v0
**Status:** BACKLOG

Public GitHub repository → languages/framework/package manager/manifests → initial Project DNA.

## TAL-004 — First external scanner adapter
**Status:** BACKLOG

Wrap one existing dependency/security engine behind the Talion scanner adapter contract.

## TAL-005 — Local worker job bridge
**Status:** BACKLOG

Connect the web control plane to the developer-PC scanner through a durable job boundary. Do not make Vercel execute Chromium directly.
