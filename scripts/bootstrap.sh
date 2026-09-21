#!/usr/bin/env bash
set -euo pipefail

echo "TalionQA bootstrap"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 22+ is required." >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable
  corepack prepare pnpm@12.5.1 --activate
fi

pnpm install
pnpm --filter @talion/scanner exec playwright install chromium
pnpm check

echo
echo "TalionQA is ready."
echo "Web:     pnpm dev:web"
echo "Scanner: pnpm scan -- https://example.com"
