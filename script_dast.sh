#!/bin/bash
set -e
echo "DAST com OWASP ZAP..."
mkdir -p reports
chmod 777 reports
cp .zap/rules.tsv reports/rules.tsv
node scripts/serve.js dist 8080 &
trap 'kill $!' EXIT
sleep 2
docker run --rm --network host -v "$(pwd)/reports:/zap/wrk:rw" ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t http://localhost:8080 -c rules.tsv -I -r zap-report.html
echo "DAST concluido"
