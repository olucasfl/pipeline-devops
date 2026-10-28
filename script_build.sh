#!/bin/bash
set -e
echo "Compilando o projeto..."
VERSION="${GITHUB_SHA:-local}"
VERSION="${VERSION:0:7}"
rm -rf dist
mkdir dist
cp src/index.html src/styles.css src/tasks.js src/storage.js src/app.js dist/
sed -i "s/__VERSION__/$VERSION/" dist/index.html
echo "$VERSION" > dist/version.txt
echo "Build $VERSION gerado em dist/"
ls dist
