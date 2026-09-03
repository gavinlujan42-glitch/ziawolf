#!/usr/bin/env bash
set -euo pipefail
printf '\nZIAWOLF // FIELD NODE 01 bootstrap\n\n'
sudo apt update
sudo apt install -y git curl wget jq vim nano python3 python3-pip openssh-client nmap dnsutils traceroute net-tools htop tmux
mkdir -p "$HOME/ziawolf"/{bin,projects,notes,logs}
cat > "$HOME/ziawolf/README.txt" <<'EOF'
ZIAWOLF // FIELD NODE 01
ChromeOS + Debian thin-client profile.
Use remote authorized infrastructure for heavy workloads.
Never place passwords, API keys, private SSH keys, or sensitive agency data in public repositories.
EOF
printf '\nFIELD NODE 01 base tools installed.\nWorkspace: %s/ziawolf\n' "$HOME"
