# Current Status

**Project:** TalionQA  
**Phase:** V0 implementation  
**Repository:** initialized, linked from profile and CI-enabled  
**Current milestone:** project-aware real findings

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
- Windows/Linux bootstrap scripts, including locked-down Windows fallback through Corepack.
- Agent harness + specialized progressive skills.
- 21st.dev MCP shared for UI discovery/retrieval.
- Playwright MCP shared for browser/accessibility/visual QA.
- Codex project MCP config.
- Claude Code project MCP config + web preview config.
- Frontend, visual-QA and motion skills.

## Completed
**TAL-001 — URL → safe scan → normalized findings** is **DONE**.

Live developer-PC verification completed on 2026-09-22:
- bootstrap completed on locked-down Windows without admin pnpm shim;
- local Next.js app returned HTTP 200;
- Chromium scanner completed a healthy scan against `https://example.com` with zero findings;
- positive scan against `https://example.com/talionqa-test-404` produced HTTP and console Observations, Evidence records and normalized Findings;
- no fabricated findings were produced in the healthy control case.

### Important product signal from the first real positive scan
The same HTTP 404 produced:
- one `http_error` Finding;
- one browser `console_error` Finding.

This is acceptable for TAL-001 because normalization is working, but it demonstrates the need for semantic correlation/grouping so one underlying problem is not presented as multiple user-facing issues.

GitHub issue: #1 closed.

## Active / next task
**TAL-002 — real ScanResult → ProjectGraph → X-Ray.**

The existing X-Ray uses explicit prototype data and must not be presented as a real scan.

TAL-002 should preserve raw Findings but introduce a projection/correlation boundary so multiple signals can later collapse into one project-aware issue without destroying source evidence.

## Local AI tooling still required
On the developer PC:
- Claude Code and/or Codex CLI installed;
- `API_KEY_21ST` set locally if 21st MCP will be used;
- project MCP servers reviewed/trusted.

Use `scripts/check-ai-tooling.cmd` on locked-down Windows.

## Do not start yet
Billing, auth complexity, 24/7 Guard, auto-fix and deploy integrations.
