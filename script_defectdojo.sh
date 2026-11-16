#!/bin/bash
# Envia um relatorio para o DefectDojo. Uso: bash script_defectdojo.sh "<tipo do scan>" <arquivo>
set -e
if [ -z "$DD_URL" ] || [ -z "$DD_TOKEN" ]; then
  echo "DefectDojo nao configurado, pulando envio"
  exit 0
fi
curl -fsS -X POST "$DD_URL/api/v2/import-scan/" \
  -H "Authorization: Token $DD_TOKEN" \
  -F "scan_type=$1" \
  -F "file=@$2" \
  -F "product_type_name=Pipeline" \
  -F "product_name=pipeline-devops" \
  -F "engagement_name=github-actions" \
  -F "auto_create_context=true" \
  -F "active=true"
echo "Relatorio $2 enviado ao DefectDojo"
