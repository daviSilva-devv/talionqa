# TalionQA

**Project intelligence for websites and repositories.**

TalionQA scans runtime behavior and source code, correlates evidence, builds a living Project DNA, and turns technical findings into a graph-first X-Ray instead of another generic dashboard.

> Status: **V0 implementation — scanner + X-Ray foundation**

## Product thesis

Paste a website URL or repository. TalionQA should answer three questions:

1. **What is this project made of?**
2. **What is wrong or risky right now?**
3. **Where does that problem live in the project and what evidence proves it?**

Later, paid layers add diagnosis, guided fixes, continuous Guard monitoring and deploy-aware regression detection.

## What already exists

- Next.js product shell with a white/purple TalionQA identity.
- React Flow / XYFlow X-Ray prototype.
- Shared typed contracts for Observation, Evidence, Finding, ScanResult and ProjectGraph.
- Local Playwright scanner CLI.
- Public URL validation and initial SSRF-safe boundary.
- Console, network and HTTP error observations.
- Stable fingerprints + deduplication.
- Evidence-first normalized Findings.
- Tests + GitHub Actions CI.
- Claude/Codex agent harness and progressive project skills.
- One-command Windows/Linux bootstrap.

The X-Ray currently uses **clearly labeled prototype graph data**. Connecting real scanner output to the graph is the next product step.

## Quick start

### Windows

```powershell
git clone https://github.com/daviSilva-devv/talionqa.git
cd talionqa
.\scripts\bootstrap.ps1
```

### Linux / macOS / WSL

```bash
git clone https://github.com/daviSilva-devv/talionqa.git
cd talionqa
bash scripts/bootstrap.sh
```

Then:

```bash
pnpm dev:web
pnpm scan https://example.com
```

See `docs/LOCAL_DEV.md` for details.

## Principles

- Evidence before AI opinion.
- Reuse proven tools; invent only where TalionQA differentiates.
- One normalized Finding model across every scanner.
- Project DNA is the durable internal representation.
- X-Ray is the product surface, not a decoration.
- White + purple, calm, spatial, graph-first UI.
- Passive-safe analysis for unverified third-party assets.
- Private customer code is not used for model training by default.
- The repository is the system of record for humans and coding agents.

## Architecture direction

```text
URL / GitHub repository
        ↓
Project Intake
        ↓
Discovery + Project DNA
        ↓
Scanner Adapters
        ↓
Raw Observations
        ↓
Evidence Normalizer
        ↓
Finding Correlation
        ↓
ProjectGraph
        ↓
Talion X-Ray
```

## Multi-agent development

TalionQA is intentionally structured so Claude Code, Codex and future agents share the same source of truth instead of requiring manual prompt handoffs.

Start with:

- `AGENTS.md`
- `CLAUDE.md`
- `.ai/STATUS.md`
- `.ai/TASKS.md`
- `.agents/skills/`

Specialized project skills cover UI, graph modeling, scanner behavior, data modeling, security boundaries, API contracts and verification.

## Current milestone

**TAL-001:** URL → safe scan → normalized Findings JSON is implemented and awaiting local Chromium verification.

Next:

**TAL-002:** real ScanResult → ProjectGraph → interactive X-Ray.

No billing, complex auth, autonomous exploitation or 24/7 Guard until the core finding quality is proven.
