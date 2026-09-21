# Decisions

Durable decisions only. Keep entries short.

## D-001 — Repository is the agent system of record
**Status:** accepted

Claude, Codex and future agents share state through Git, project docs, tasks and skills. Important context must not live only in chats.

## D-002 — Reuse commodity infrastructure
**Status:** accepted

Use proven tooling for browser automation, vulnerability databases, secret scanning, auth, billing, graph primitives and queues. Custom engineering is prioritized for TalionQA differentiation.

## D-003 — Evidence-first Finding model
**Status:** accepted

No normalized Finding without evidence or a clearly identified deterministic observation.

## D-004 — X-Ray is the primary interface
**Status:** accepted

The graph is a core product surface. Tables/cards are supporting views, not the default product metaphor.

## D-005 — Visual direction
**Status:** accepted

TalionQA uses a white / off-white base with a distinctive purple system. Calm, spatial and welcoming rather than cyberpunk/security-dashboard aesthetics.

## D-006 — Safe-by-default third-party scanning
**Status:** accepted

Unverified public assets receive passive/safe analysis only. Intrusive active tests require verified ownership/authorization.

## D-007 — Private code and model training
**Status:** accepted

Private customer source code is not used as model-training data by default.

## D-008 — Agent-assisted frontend workflow
**Status:** accepted

Frontend agents use progressive skills, 21st.dev for component/inspiration discovery and Playwright MCP for rendered browser QA. External components are adapted into TalionQA rather than treated as a design system.

## D-009 — UI dependencies are demand-driven
**Status:** accepted

Base UI, Motion, React Bits, Magic UI or other libraries are evaluated when a concrete interaction needs them. They are not bulk-installed into the product merely because they are popular.
