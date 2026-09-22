$ErrorActionPreference = "Stop"

Write-Host "TalionQA AI tooling check" -ForegroundColor Magenta
Write-Host ""

function Has-Command([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Print-CommandStatus([string]$Name) {
  if (Has-Command $Name) {
    Write-Host "[OK] $Name" -ForegroundColor Green
    return $true
  }

  Write-Host "[MISSING] $Name" -ForegroundColor Yellow
  return $false
}

$hasNode = Print-CommandStatus "node"
$hasPnpm = Has-Command "pnpm"
$hasCorepack = Has-Command "corepack"

if ($hasPnpm) {
  Write-Host "[OK] pnpm" -ForegroundColor Green
} elseif ($hasCorepack) {
  Write-Host "[OK] pnpm via corepack (no global shim required)" -ForegroundColor Green
} else {
  Write-Host "[MISSING] pnpm/corepack" -ForegroundColor Yellow
}

$hasClaude = Print-CommandStatus "claude"
$hasCodex = Print-CommandStatus "codex"

if ($env:API_KEY_21ST) {
  Write-Host "[OK] API_KEY_21ST is set" -ForegroundColor Green
} else {
  Write-Host "[MISSING] API_KEY_21ST" -ForegroundColor Yellow
  Write-Host "Create a key at 21st.dev/mcp and expose it as API_KEY_21ST."
}

Write-Host ""

if ($hasClaude) {
  Write-Host "Claude project MCP config: .mcp.json"
  Write-Host "Run: claude mcp list"
}

if ($hasCodex) {
  Write-Host "Codex project MCP config: .codex/config.toml"
  Write-Host "Trust this repository when Codex asks so project config can load."
}

if (-not $hasNode) {
  Write-Host ""
  Write-Host "Node.js 22+ is required for TalionQA and Playwright MCP." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Project docs: docs/AI_TOOLING.md"
