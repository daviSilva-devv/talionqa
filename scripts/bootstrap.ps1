$ErrorActionPreference = "Stop"

Write-Host "TalionQA bootstrap" -ForegroundColor Magenta

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js 22+ is required."
}

$useDirectPnpm = [bool](Get-Command pnpm -ErrorAction SilentlyContinue)
$useCorepack = [bool](Get-Command corepack -ErrorAction SilentlyContinue)

function Invoke-TalionPnpm {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)

  if ($script:useDirectPnpm) {
    & pnpm @Args
    if ($LASTEXITCODE -ne 0) { throw "pnpm failed with exit code $LASTEXITCODE" }
    return
  }

  if ($script:useCorepack) {
    & corepack pnpm @Args
    if ($LASTEXITCODE -ne 0) { throw "corepack pnpm failed with exit code $LASTEXITCODE" }
    return
  }

  & npx -y pnpm@12.5.1 @Args
  if ($LASTEXITCODE -ne 0) { throw "npx pnpm failed with exit code $LASTEXITCODE" }
}

if ($useDirectPnpm) {
  Write-Host "Using installed pnpm..."
} elseif ($useCorepack) {
  Write-Host "pnpm shim unavailable; using Corepack directly (no admin/global install required)..."
} else {
  Write-Host "Corepack unavailable; using temporary pnpm through npx..."
}

Write-Host "Installing workspace dependencies..."
Invoke-TalionPnpm install

Write-Host "Installing Chromium for the local scanner..."
Invoke-TalionPnpm --filter @talion/scanner exec playwright install chromium

Write-Host "Running verification..."
Invoke-TalionPnpm check

Write-Host ""
Write-Host "TalionQA is ready." -ForegroundColor Green

if ($useDirectPnpm) {
  Write-Host "Web:     pnpm dev:web"
  Write-Host "Scanner: pnpm scan -- https://example.com"
} elseif ($useCorepack) {
  Write-Host "Web:     corepack pnpm dev:web"
  Write-Host "Scanner: corepack pnpm scan -- https://example.com"
} else {
  Write-Host "Web:     npx -y pnpm@12.5.1 dev:web"
  Write-Host "Scanner: npx -y pnpm@12.5.1 scan -- https://example.com"
}
