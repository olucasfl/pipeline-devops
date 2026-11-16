#!/bin/bash
set -e
echo "SAST com Semgrep (analise do codigo-fonte)..."
mkdir -p reports
semgrep scan \
  --config p/javascript \
  --config .semgrep/rules.yml \
  --metrics=off \
  --error \
  --json --output reports/semgrep.json \
  src/
echo "SAST concluido: nenhuma vulnerabilidade encontrada"
