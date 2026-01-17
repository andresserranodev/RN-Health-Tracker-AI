#!/bin/bash

# switch-agent.sh - A script to toggle between Claude and Antigravity configurations
# while maintaining a Single Source of Truth (DRY).

AGENT=$1

if [[ "$AGENT" != "claude" && "$AGENT" != "antigravity" && "$AGENT" != "all" ]]; then
  echo "❌ Error: Please specify an agent."
  echo "Usage: ./scripts/switch-agent.sh [claude|antigravity|all]"
  exit 1
fi

echo "🔄 Switching workspace to: $AGENT"

# --- 1. Cleanup current active files/links ---
# We remove the files from the root and the skills links to ensure a clean switch.
rm -f CLAUDE.md ANTIGRAVITY.md
rm -rf .claude/skills .agent/skills

# --- 2. Activate the selected agent(s) ---

activate_claude() {
  # Activate Claude configuration
  # Copy the shared guidelines to CLAUDE.md
  cp .agent-config/PROJECT_GUIDELINES.md CLAUDE.md
  
  # Ensure .claude directory exists and copy the shared skills
  mkdir -p .claude/skills
  cp -r .agent-config/skills/* .claude/skills/
  
  echo "✅ Claude configuration is now active (Physical Copies)."
  echo "   - [COPY] .agent-config/PROJECT_GUIDELINES.md -> CLAUDE.md"
  echo "   - [COPY] .agent-config/skills/ -> .claude/skills/"
}

activate_antigravity() {
  # Activate Antigravity configuration
  # Copy the shared guidelines to ANTIGRAVITY.md
  cp .agent-config/PROJECT_GUIDELINES.md ANTIGRAVITY.md
  
  # Ensure .agent directory exists and copy the shared skills
  mkdir -p .agent/skills
  cp -r .agent-config/skills/* .agent/skills/
  
  echo "✅ Antigravity configuration is now active (Physical Copies)."
  echo "   - [COPY] .agent-config/PROJECT_GUIDELINES.md -> ANTIGRAVITY.md"
  echo "   - [COPY] .agent-config/skills/ -> .agent/skills/"
}

if [[ "$AGENT" == "claude" ]]; then
  activate_claude
elif [[ "$AGENT" == "antigravity" ]]; then
  activate_antigravity
elif [[ "$AGENT" == "all" ]]; then
  activate_claude
  activate_antigravity
fi

echo "🚀 Single Source of Truth maintained in .agent-config/"

