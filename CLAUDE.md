# Claude Code — TalionQA

Follow `AGENTS.md` as the primary project contract.

Use progressive disclosure: load the smallest relevant skill from `.agents/skills/` instead of reading every project document.

## Project tooling
- Project MCP servers are declared in `.mcp.json`.
- 21st.dev requires the local `API_KEY_21ST` environment variable.
- Playwright MCP is available for browser interaction and visual QA.
- `.claude/launch.json` defines the TalionQA web preview.

For frontend work, prefer the sequence:

```text
talion-ui
→ talion-frontend
→ 21st MCP when useful
→ implementation
→ talion-visual-qa with Playwright
→ talion-verify
```

Load `talion-motion` only when animation is part of the task.

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
