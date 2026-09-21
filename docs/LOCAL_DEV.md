# Local development

## Requirements
- Node.js 22+
- pnpm 12+
- Git

## Install
```bash
corepack enable
pnpm install
pnpm --filter @talion/scanner exec playwright install chromium
```

## Web
```bash
pnpm dev:web
```

Open http://localhost:3000.

## Scanner
```bash
pnpm scan -- https://example.com
```

The scanner runs locally and prints a normalized JSON report.

## Quality
```bash
pnpm typecheck
pnpm test
pnpm build
```

## Architecture note
The web app does **not** run Chromium directly in a Vercel request. Scanner execution belongs in the worker/service boundary. During the first local phase, the developer PC is that worker.
