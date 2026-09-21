#!/usr/bin/env bash
set -u

echo "TalionQA AI tooling check"
echo

check_command() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "[OK] $1"
    return 0
  fi

  echo "[MISSING] $1"
  return 1
}

check_command node || true
check_command pnpm || true
check_command claude || true
check_command codex || true

if [ -n "${API_KEY_21ST:-}" ]; then
  echo "[OK] API_KEY_21ST is set"
else
  echo "[MISSING] API_KEY_21ST"
  echo "Create a key at 21st.dev/mcp and expose it as API_KEY_21ST."
fi

echo
echo "Claude project MCP config: .mcp.json"
echo "Codex project MCP config:  .codex/config.toml"
echo "Project docs:              docs/AI_TOOLING.md"
