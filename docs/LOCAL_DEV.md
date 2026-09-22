# Local development

## Requirements
- Node.js 22+
- Git
- Windows PowerShell or a POSIX shell

## Fast bootstrap

### Windows
```powershell
.\scripts\bootstrap.ps1
```

### Linux / macOS / WSL
```bash
bash scripts/bootstrap.sh
```

The bootstrap installs dependencies, installs Playwright Chromium and runs the project verification suite.

## Manual install
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

The X-Ray route currently uses **explicit prototype data**. It is a visual foundation, not a fake scan.

## Scanner
```bash
pnpm scan https://example.com
```

The scanner runs locally and prints a normalized JSON report containing:
- target and scan metadata;
- raw Observations;
- Evidence;
- normalized Findings;
- warnings and resource counts.

## Quality
```bash
pnpm check
```

Equivalent to typecheck + tests + build.

## Architecture note
The web app does **not** run Chromium directly in a Vercel request. Scanner execution belongs in the worker/service boundary. During the first local phase, the developer PC is that worker.

A later task will connect the hosted control plane to the local worker through a durable job queue/protocol.
