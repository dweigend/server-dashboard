#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

git diff --check
git diff --cached --check
python3 scripts/check-docs.py
uvx ruff@0.15.6 check scripts/check-docs.py
uvx ruff@0.15.6 format --check scripts/check-docs.py
bunx markdownlint-cli2@0.22.0 '**/*.md' '#.local/**' '#node_modules/**'
bunx @redocly/cli@2.0.0 lint contracts/openapi.json
bunx @biomejs/biome@2.3.14 check design/portfolio/gallery.js design/portfolio/app.css
mkdir -p .local
bun build design/portfolio/gallery.js --target browser --outfile .local/gallery-check.js
bash -n scripts/check.sh
