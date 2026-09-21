# Claude Code — TalionQA

Follow `AGENTS.md` as the primary project contract.

Use progressive disclosure: load the smallest relevant skill from `.agents/skills/` instead of reading every project document.

Before implementing:
- read `.ai/STATUS.md`;
- identify the active task;
- inspect related code and contracts;
- do not redesign unrelated parts.

When finishing:
- run the relevant verification;
- update task/status truthfully;
- record only durable architectural decisions in `docs/DECISIONS.md`.

If another coding agent already worked on the task, continue from Git state and the handoff files rather than asking the user to re-explain context.
