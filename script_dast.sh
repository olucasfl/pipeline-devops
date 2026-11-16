#!/bin/bash
set -e
echo "DAST com OWASP ZAP (ataque na aplicacao rodando)..."
mkdir -p reports
chmod 777 reports
cp .zap/rules.tsv reports/rules.tsv

node scripts/serve.js dist 8080 &
SERVER_PID=$!
trap 'kill $SERVER_PID' EXIT
sleep 2
curl -fsS http://localhost:8080/ > /dev/null
echo "Aplicacao no ar em http://localhost:8080"

docker run --rm --network host \
  -v "$(pwd)/reports:/zap/wrk:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t http://localhost:8080 \
  -c rules.tsv -I \
  -r zap-report.html -x zap-report.xml
echo "DAST concluido: nenhum alerta FAIL"
