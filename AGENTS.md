# TalionQA Agent Contract

This repository is the system of record. Do not rely on chat-only context.

## Before work
1. Read `.ai/STATUS.md`.
2. Read the active item in `.ai/TASKS.md`.
3. Read only the relevant docs/skills for the task.
4. Inspect existing code before proposing replacement architecture.

## Core rules
- Prefer proven libraries/tools over custom infrastructure.
- Build custom logic only where TalionQA differentiates: Project DNA, normalization, correlation, scoring/confidence, X-Ray experience and learning from validated outcomes.
- Evidence must exist before a Finding is created.
- Never fabricate scanner results, metrics, vulnerabilities or confidence.
- Keep scanners replaceable behind contracts.
- Keep UI graph-first; avoid generic dashboard-first layouts.
- Do not add infrastructure "for later" without a current requirement.
- No destructive or intrusive active testing against unverified third-party targets.
- Private customer code is not training data by default.

## Skills
Load only when relevant:
- UI/visual work → `.agents/skills/talion-ui/SKILL.md`
- X-Ray/graph work → `.agents/skills/talion-graph/SKILL.md`
- scanner work → `.agents/skills/talion-scanner/SKILL.md`
- data modeling → `.agents/skills/talion-data/SKILL.md`
- security behavior → `.agents/skills/talion-security/SKILL.md`
- API/contracts → `.agents/skills/talion-api/SKILL.md`
- finishing a task → `.agents/skills/talion-verify/SKILL.md`

## Completion
A task is not done because code was written. It is done when its acceptance criteria are verified and `.ai/STATUS.md` / `.ai/TASKS.md` reflect reality.

Keep handoffs short. Write durable decisions to `docs/DECISIONS.md`, not to a giant prompt.
