#!/bin/bash
set -e
echo "Compilando o projeto..."
node --check src/imc.js
rm -rf dist
mkdir dist
cp src/index.html src/imc.js dist/
echo "Build gerado em dist/"