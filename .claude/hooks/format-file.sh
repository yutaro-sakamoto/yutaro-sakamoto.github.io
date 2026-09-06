#!/usr/bin/env bash
# Edit / Write の直後に、変更されたファイルだけを Prettier で整形する。
# CI (npm run format:check) が整形ズレで落ちるのを防ぐためのフック。
set -uo pipefail

cd "$(dirname "$0")/../.."

# stdin に渡される JSON から対象ファイルのパスを取り出す
file_path=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)

[ -n "$file_path" ] || exit 0
[ -f "$file_path" ] || exit 0
[ -x node_modules/.bin/prettier ] || exit 0

# .prettierignore の対象なら何もしない
if npx --no-install prettier --ignore-path .prettierignore --check "$file_path" >/dev/null 2>&1; then
  exit 0
fi

npx --no-install prettier --ignore-path .prettierignore --write "$file_path" >/dev/null 2>&1 || true
exit 0
