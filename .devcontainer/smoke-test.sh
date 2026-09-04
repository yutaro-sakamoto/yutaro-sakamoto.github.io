#!/usr/bin/env bash
# Dev Container 内で動くスモークテスト。
# 「コンテナを作れば開発とビルドがひと通りできる」ことだけを手早く確認する。
set -euo pipefail

cd "$(dirname "$0")/.."

PREVIEW_HOST=127.0.0.1
PREVIEW_PORT=4321
preview_started=""

cleanup() {
  if [ -n "$preview_started" ]; then
    npx astro preview stop >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

step() {
  echo ""
  echo "=== $* ==="
}

step "ツールのバージョン"
node --version
npm --version

step "依存関係"
if [ -d node_modules ]; then
  echo "node_modules は作成済み (postCreateCommand の npm ci)"
else
  npm ci
fi

step "整形チェック (npm run format:check)"
npm run format:check

step "型チェック (npm run check)"
npm run check

step "ビルド (npm run build)"
npm run build

step "生成物の確認"
for f in dist/index.html dist/en/index.html dist/about/index.html dist/rss.xml dist/sitemap-index.xml; do
  if [ ! -s "$f" ]; then
    echo "生成されているはずの $f がない (または空)" >&2
    exit 1
  fi
  echo "ok: $f"
done

step "プレビューサーバの起動確認"
# astro preview はバックグラウンド起動して即座に戻る (停止は astro preview stop)。
npm run preview -- --background --host "$PREVIEW_HOST" --port "$PREVIEW_PORT"
preview_started=1

for _ in $(seq 1 60); do
  if curl -fsS -o /dev/null "http://$PREVIEW_HOST:$PREVIEW_PORT/" 2>/dev/null; then
    break
  fi
  sleep 1
done

for path in / /en /about; do
  status=$(curl -fsS -o /dev/null -w '%{http_code}' "http://$PREVIEW_HOST:$PREVIEW_PORT$path")
  echo "ok: $path -> $status"
done

echo ""
echo "スモークテスト成功"
