$ErrorActionPreference = "Stop"

Write-Host "TalionQA AI tooling check" -ForegroundColor Magenta
Write-Host ""

function Check-Command([string]$Name) {
  $command = Get-Command $Name -ErrorAction SilentlyContinue

  if ($command) {
    Write-Host "[OK] $Name" -ForegroundColor Green
    return $true
  }

  Write-Host "[MISSING] $Name" -ForegroundColor Yellow
  return $false
}

$hasNode = Check-Command "node"
$hasPnpm = Check-Command "pnpm"
$hasClaude = Check-Command "claude"
$hasCodex = Check-Command "codex"

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

if (-not $hasPnpm) {
  Write-Host ""
  Write-Host "Run .\scripts\bootstrap.ps1 after Node.js is installed." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Project docs: docs/AI_TOOLING.md"
