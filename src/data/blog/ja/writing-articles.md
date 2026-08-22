---
title: "このサイトでの記事の書き方 — Markdown・コード・数式"
description: "Markdownで記事を書き、シンタックスハイライト付きのコードとTeX記法の数式を埋め込む方法をまとめたサンプル記事です。"
pubDate: 2026-08-22
tags: ["Astro", "Markdown", "KaTeX"]
math: true
---

このサイトの記事は `src/data/blog/ja/` (英語版は `src/data/blog/en/`) に Markdown または MDX ファイルを置くだけで公開されます。
この記事自体が、使える記法のサンプルになっています。

## フロントマター

各記事の先頭には次のフロントマターを書きます。

```yaml
---
title: "記事のタイトル"
description: "一覧ページとOGPに使われる説明文"
pubDate: 2026-08-22
updatedDate: 2026-08-23 # 省略可
tags: ["Astro", "Markdown"]
draft: false # true にすると本番ビルドから除外される
math: true # 数式を使う記事は true
---
```

スキーマは `src/content.config.ts` で Zod により検証されるため、必須項目が抜けているとビルドが失敗します。

## コード

コードブロックは [Shiki](https://shiki.style/) でビルド時にハイライトされます。クライアント側のJavaScriptは不要です。

```rust
fn main() {
    let cobol_files: Vec<_> = std::env::args()
        .skip(1)
        .filter(|p| p.ends_with(".cbl"))
        .collect();

    for path in &cobol_files {
        println!("parsing {path}");
    }
}
```

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "HELLO, WORLD".
           STOP RUN.
```

インラインコードは `` `backtick` `` で囲みます。

## 数式

数式は TeX 記法で書きます。ビルド時に [KaTeX](https://katex.org/) がHTMLへ変換するので、閲覧者の環境でスクリプトが動く必要はありません。

インライン数式は `$...$` で囲みます。たとえば、一般化ペテルセングラフ $GP(n, k)$ は $2n$ 個の頂点を持ちます。

ディスプレイ数式は `$$...$$` で囲みます。

$$
\chi'(G) \le \Delta(G) + 1
$$

環境も使えます。

$$
\begin{aligned}
  \sum_{v \in V(G)} \deg(v) &= 2\,|E(G)| \\
  \left| \bigcup_{i=1}^{n} A_i \right|
    &= \sum_{\emptyset \ne S \subseteq [n]} (-1)^{|S|+1} \left| \bigcap_{i \in S} A_i \right|
\end{aligned}
$$

行列やケース分けも同様です。

$$
f(n) =
\begin{cases}
  1 & (n = 0) \\
  n \cdot f(n-1) & (n \ge 1)
\end{cases}
\qquad
A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}
$$

## その他の記法

GitHub Flavored Markdown が有効なので、表やタスクリストも使えます。

| 言語  | 用途         | 備考                             |
| ----- | ------------ | -------------------------------- |
| COBOL | 業務ロジック | opensource COBOL 4J でJavaへ変換 |
| Rust  | 解析ツール   | tree-sitter との相性が良い       |
| Lean  | 証明         | 数学の形式化                     |

> 引用も使えます。

- [ ] 未完了のタスク
- [x] 完了したタスク

## 記事を公開する

Markdownファイルを追加して `main` ブランチに push すれば、GitHub Actions がビルドしてGitHub Pagesへ公開します。
手元で確認したい場合は次を実行します。

```bash
npm install
npm run dev
```
