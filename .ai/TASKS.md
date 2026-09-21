# Tasks

## TAL-001 — URL → safe scan → normalized findings
**Status:** IN REVIEW  
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

### Remaining acceptance
- [ ] Run bootstrap on the developer PC.
- [ ] Run one live Chromium scan against an approved public target.
- [ ] Inspect JSON output and confirm evidence quality.

## TAL-002 — Real findings → X-Ray projection
**Status:** READY AFTER TAL-001  
**Priority:** P0

### Current state
A white/purple React Flow X-Ray prototype exists with clearly labeled demo data.

### Goal
Derive `ProjectGraph` from a real `ScanResult`, so Findings appear in spatial project context without hard-coded demo findings.

### Acceptance
- no fake scan metrics;
- graph data comes from shared contracts;
- finding selection resolves real evidence;
- empty/healthy states are designed;
- UI remains responsive and accessible.

## TAL-003 — Repository fingerprint / Project DNA v0
**Status:** BACKLOG

Public GitHub repository → languages/framework/package manager/manifests → initial Project DNA.

## TAL-004 — First external scanner adapter
**Status:** BACKLOG

Wrap one existing dependency/security engine behind the Talion scanner adapter contract.

## TAL-005 — Local worker job bridge
**Status:** BACKLOG

Connect the web control plane to the developer-PC scanner through a durable job boundary. Do not make Vercel execute Chromium directly.
