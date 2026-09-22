# TalionQA AI Tooling

TalionQA is designed so coding agents share repository state instead of requiring manual prompt relay.

## Project MCP servers

The repository includes:

- **21st.dev MCP** — UI component/theme/template discovery and optional generation.
- **Playwright MCP** — browser interaction and visual/accessibility QA.

### Required local secret

Create a 21st.dev API key, then expose it to your shell as:

```text
API_KEY_21ST
```

Never commit the value.

The project files reference the environment variable by name.

## Locked-down Windows note

Some corporate Windows machines block Corepack from creating global pnpm/yarn shims under `C:\\Program Files\\nodejs`.

TalionQA's bootstrap does not require admin rights. When a global `pnpm` command is unavailable it calls pnpm through Corepack directly and runs workspace verification without nested package-manager scripts.

Use the commands printed by the bootstrap. On a locked-down machine they will normally look like:

```powershell
corepack pnpm --filter @talion/web dev
corepack pnpm --filter @talion/scanner scan -- https://example.com
```

## Claude Code

Claude Code reads the committed root `.mcp.json`.

On first use, review/approve the project MCP servers.

Useful checks:

```bash
claude mcp list
claude mcp get 21st
claude mcp get playwright
```

The committed `.claude/launch.json` lets Claude Code Desktop preview the TalionQA web app through `pnpm dev:web`.

## Codex

Codex reads project-specific MCP configuration from:

```text
.codex/config.toml
```

Project config is loaded only after the repository is trusted.

The 21st API key is forwarded from `API_KEY_21ST`; Playwright runs locally through npx.

## Frontend agent workflow

```text
Task
 ↓
Talion UI / Frontend skill
 ↓
Search existing code
 ↓
21st MCP when useful
 ↓
Implement
 ↓
Playwright MCP
 ├─ accessibility snapshot
 ├─ desktop
 └─ mobile
 ↓
Concrete critique
 ↓
Fix
 ↓
Talion verify
```

## Cost discipline

- Component search/retrieval before hosted generation.
- Deterministic browser/accessibility data before screenshot-heavy loops.
- One visual QA pass by default.
- Second pass only after a failed core-surface review.
- Do not send whole repositories to models when typed contracts, tests or targeted files are enough.
