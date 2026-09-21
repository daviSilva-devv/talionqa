$ErrorActionPreference = "Stop"

Write-Host "TalionQA bootstrap" -ForegroundColor Magenta

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js 22+ is required."
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Host "pnpm not found. Enabling Corepack..."
  corepack enable
  corepack prepare pnpm@12.5.1 --activate
}

Write-Host "Installing workspace dependencies..."
pnpm install

Write-Host "Installing Chromium for the local scanner..."
pnpm --filter @talion/scanner exec playwright install chromium

Write-Host "Running verification..."
pnpm check

Write-Host ""
Write-Host "TalionQA is ready." -ForegroundColor Green
Write-Host "Web:     pnpm dev:web"
Write-Host "Scanner: pnpm scan -- https://example.com"
