---
name: verify
description: CI と同じチェック (整形・型・ビルド) をローカルで実行する。変更を終えたとき、push や PR の前、CI が落ちた原因を調べたいときに使う。
---

# CI と同じ検証を実行する

`.github/workflows/ci.yml` と同じ順番で実行し、失敗したら直す。

```bash
npm run format:check
npm run check
npm run build
```

## 失敗したとき

- **format:check** が落ちた → `npm run format` を実行して整形し、差分を確認する。
  ドキュメントや JSON も対象なので、Markdown の表や設定ファイルの追加でもよく落ちる。
- **check** が落ちた → `astro check` の出力を読む。`.astro` の frontmatter と `src/data/*.ts` の `Localized` 型 (ja/en 両方が必要) の不足が多い。
- **build** が落ちた → 記事のフロントマターが `src/content.config.ts` の Zod スキーマに合っているか確認する。
  `pubDate` の形式ミスや `title` / `description` の欠落が典型。

## より厳密に確認したいとき

Dev Container 用のスモークテストは、上記に加えて生成物の存在確認とプレビューサーバへの HTTP リクエストまで行う。

```bash
./.devcontainer/smoke-test.sh
```

3 つとも通ったら、実行したコマンドと結果を簡潔に報告する。
