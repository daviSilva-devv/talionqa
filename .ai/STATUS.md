# Current Status

**Project:** TalionQA  
**Phase:** V0 implementation  
**Repository:** initialized, linked from profile and CI-enabled  
**Current milestone:** prove useful deterministic findings

## Locked decisions
- Name: TalionQA
- Visual base: white + purple
- Primary surface: graph-first X-Ray
- Inputs: website URL and repository
- Development model: shared repo + Claude/Codex + progressive skills
- Build-vs-buy: reuse commodity tooling
- Frontend agents use component discovery + browser QA instead of prompt-only UI generation

## Implemented baseline
- Next.js product shell with landing + X-Ray prototype.
- React Flow / XYFlow graph with Talion-specific nodes.
- Shared Observation, Evidence, Finding, ScanResult and ProjectGraph contracts.
- Local Playwright scanner CLI.
- Public-target URL validation and initial SSRF boundary.
- Time/request limits.
- Console error, failed-request and HTTP-error collection.
- Observation deduplication and deterministic fingerprints.
- Evidence-first Finding normalization.
- Tests for contracts, target safety and deduplication.
- CI for install → typecheck → tests → build.
- Windows/Linux bootstrap scripts.
- Agent harness + specialized progressive skills.
- 21st.dev MCP shared for UI discovery/retrieval.
- Playwright MCP shared for browser/accessibility/visual QA.
- Codex project MCP config.
- Claude Code project MCP config + web preview config.
- Frontend, visual-QA and motion skills.

## Active task
**TAL-001 — URL → safe scan → normalized findings** is implemented and **IN REVIEW**.

Remaining verification:
- clone/bootstrap on the developer PC;
- install Chromium;
- run at least one live website scan;
- inspect the normalized JSON and confirm scanner-generated blocked requests do not become user findings.

GitHub issue: #1

## Local AI tooling still required
On the developer PC:
- Claude Code and/or Codex CLI installed;
- `API_KEY_21ST` set locally if 21st MCP will be used;
- project MCP servers reviewed/trusted.

Use `scripts/check-ai-tooling.ps1` on Windows.

## Next
After TAL-001 live verification:
**TAL-002 — real scan result → ProjectGraph → X-Ray.**

The existing X-Ray uses explicit prototype data and must not be presented as a real scan.

## Do not start yet
Billing, auth complexity, 24/7 Guard, auto-fix and deploy integrations.
