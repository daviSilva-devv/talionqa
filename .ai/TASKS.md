# Tasks

## TAL-001 — URL → findings contract
**Status:** READY  
**Priority:** P0

### Goal
Accept one public HTTP(S) URL, run a bounded safe browser scan and emit normalized JSON objects that can later feed X-Ray.

### Acceptance
- URL is normalized and unsafe protocols rejected.
- Scan has explicit timeout and page/request limits.
- Browser captures console errors and failed network requests.
- Raw observations are kept separate from normalized findings.
- Findings have stable IDs/fingerprints.
- At least one fixture/site test proves deduplication.
- No AI/LLM is required to create a finding.
- Verification passes.

## TAL-002 — Minimal X-Ray
**Status:** BLOCKED by TAL-001

Render a project node plus affected areas/findings using graph data derived from normalized contracts.

## TAL-003 — Repository fingerprint
**Status:** BACKLOG

Public GitHub repository → languages/framework/package manager/manifests → Project DNA.

## TAL-004 — First external scanner adapter
**Status:** BACKLOG

Wrap one existing dependency/security engine behind the Talion scanner adapter contract.
