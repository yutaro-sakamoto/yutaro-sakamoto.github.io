---
name: new-post
description: 新しいブログ記事の雛形を作る。記事を追加したい、記事ファイルを作りたい、日本語/英語の記事を書き始めたいときに使う。
argument-hint: <slug> [ja|en|both]
---

# 新しい記事を作る

`src/data/blog/<lang>/<slug>.md` にフロントマター付きの Markdown を作成する。

## 手順

1. 引数から slug と言語を決める。
   - slug は英小文字・数字・ハイフンのみ。指定がなければタイトルから作る。
   - 言語の指定がなければ `ja` のみ作る。`both` なら `ja` と `en` を同じ slug で作る (対訳リンクが自動でつながる)。
2. 同名のファイルが既にないか `ls src/data/blog/<lang>/` で確認する。
3. 次のフロントマターで作成する。`pubDate` は今日の日付。

   ```yaml
   ---
   title: "記事のタイトル"
   description: "一覧ページとOGPに使われる説明文 (1〜2文)"
   pubDate: YYYY-MM-DD
   tags: []
   draft: true
   math: false
   ---
   ```

   - 書き始めは `draft: true` にする (開発サーバでは見えるが本番ビルドから除外される)。
   - 数式を使う場合は `math: true`。付けないと KaTeX の CSS が読み込まれない。
   - スキーマは `src/content.config.ts`。上記以外の項目は書かない。

4. 本文の書き出しは 1 段落だけ書き、残りは見出しの骨組みにする。記法の参考は `src/data/blog/ja/writing-articles.md`。
5. `npm run build` を実行してフロントマターがスキーマを通ることを確認する。
6. 作成したファイルのパスと、公開時に `draft: false` へ変更する必要があることを伝える。
