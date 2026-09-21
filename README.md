# TalionQA

**Project intelligence for websites and repositories.**

TalionQA scans runtime behavior and source code, correlates evidence, builds a living Project DNA, and turns technical findings into a graph-first X-Ray instead of another generic dashboard.

> Status: **Product Discovery / Foundation**

## Product thesis

Paste a website URL or repository. TalionQA should answer three questions:

1. **What is this project made of?**
2. **What is wrong or risky right now?**
3. **Where does that problem live in the project and what evidence proves it?**

Later, paid layers add diagnosis, guided fixes, continuous monitoring and deploy-aware regression detection.

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

## Initial flow

```text
URL / GitHub repository
        ↓
Project Intake
        ↓
Discovery + Project DNA
        ↓
Scanner Engines
        ↓
Evidence Normalizer
        ↓
Finding Correlation
        ↓
Talion X-Ray
```

## Foundation

The repository is intentionally structured for multi-agent development with Claude Code, Codex and other agents sharing the same source of truth.

Start with:
- `AGENTS.md`
- `CLAUDE.md`
- `docs/PRODUCT.md`
- `docs/ARCHITECTURE.md`
- `.ai/STATUS.md`
- `.ai/TASKS.md`
- `.agents/skills/`

## First milestone

**TAL-001:** URL → safe scan → normalized Findings JSON → minimal X-Ray visualization.

No billing, complex auth, autonomous exploitation or 24/7 monitoring until the core finding quality is proven.
