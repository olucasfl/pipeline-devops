#!/bin/bash
set -e
echo "SAST com Semgrep..."
mkdir -p reports
semgrep scan --config .semgrep/rules.yml --metrics=off --error --json --output reports/semgrep.json src/ || {
  cat reports/semgrep.json
  exit 1
}
echo "SAST concluido"
