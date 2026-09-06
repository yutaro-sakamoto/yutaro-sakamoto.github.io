#!/usr/bin/env bash
# Claude Code のセッション開始時に実行されるフック。
# node_modules が無ければ依存関係を入れて、すぐに build / check / format が動く状態にする。
set -euo pipefail

cd "$(dirname "$0")/../.."

if ! command -v npm >/dev/null 2>&1; then
  echo "npm が見つからないため依存関係のインストールをスキップします" >&2
  exit 0
fi

if [ ! -d node_modules ]; then
  echo "node_modules が無いので npm ci を実行します" >&2
  npm ci --no-audit --no-fund >&2
fi

exit 0
