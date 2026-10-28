#!/bin/bash
set -e
echo "Verificando sintaxe..."
for f in src/*.js test/*.js; do
  node --check "$f"
  echo "ok  $f"
done
if grep -rn "console.log\|debugger" src/; then
  echo "ERRO: remova console.log/debugger do codigo"
  exit 1
fi
echo "Lint concluido"
