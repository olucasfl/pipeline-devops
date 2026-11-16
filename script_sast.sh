#!/bin/bash
set -e
echo "SAST com Semgrep..."
mkdir -p reports
semgrep scan --config p/javascript --config .semgrep/rules.yml --metrics=off --error --json --output reports/semgrep.json src/
echo "SAST concluido"
