# だいたい動く — yutaro-sakamoto.github.io

坂本優太郎の技術ブログ **だいたい動く (Mostly Works)** のソースコードです。
トップページが記事一覧で、`/about` に自己紹介ページがあります。
[Astro](https://astro.build/) で静的サイトとしてビルドし、GitHub Actions で GitHub Pages に公開しています。

公開URL: <https://yutaro-sakamoto.github.io/>

## できること

- **日英バイリンガル** — 日本語版は `/`、英語版は `/en/`。ヘッダーのボタンで切り替えられます。
- **技術記事** — Markdown / MDX で執筆。
  - コードブロックは [Shiki](https://shiki.style/) がビルド時にハイライト (ライト/ダークテーマ対応)。
  - 数式は TeX 記法 (`$...$` / `$$...$$`) で書き、[KaTeX](https://katex.org/) がビルド時にHTMLへ変換。
    数式を含むページだけ KaTeX の CSS を読み込みます。
  - フロントマターは Zod で検証されるため、項目の書き間違いはビルドで落ちます。
- **自己紹介ページ (`/about`)** — OSS活動・保有資格・論文・学歴をデータファイルで管理し、日英両方のページに反映。
- RSS (`/rss.xml`, `/en/rss.xml`)、`sitemap-index.xml`、OGPメタタグ、ダークモードを標準で用意。
- 旧 Hugo サイトの `/posts/about` は `/about` へリダイレクトします。

## ディレクトリ構成

```
src/
├── content.config.ts        記事コレクションのスキーマ定義 (Zod)
├── data/
│   ├── blog/ja/*.md         日本語記事
│   ├── blog/en/*.md         英語記事
│   ├── site.ts              ブログ名・タグライン・説明文
│   ├── profile.ts           プロフィール・学歴・受賞
│   ├── projects.ts          OSS活動・開発実績
│   ├── certifications.ts    保有資格
│   └── publications.ts      論文・発表
├── i18n/index.ts            UI文言と言語切り替えのヘルパー
├── components/              再利用する部品 (pages/ 配下は各ページの本体)
├── layouts/                 BaseLayout (head/header/footer) と PostLayout
├── pages/                   ルーティング。/ が日本語、/en/ が英語
│                            / が記事一覧、/about が自己紹介
├── styles/global.css        デザイントークンと全体のスタイル
└── utils/                   記事の取得・整形など
public/                      そのまま配信されるファイル (favicon, mine-sweeper デモ)
```

## 開発

```bash
npm install     # 依存関係のインストール
npm run dev     # http://localhost:4321 で開発サーバを起動
npm run build   # dist/ に静的サイトを生成
npm run preview # ビルド結果をローカルで確認
npm run check   # 型チェック (astro check)
npm run format  # Prettier で整形
```

Node.js 22 以上が必要です。
`astro check` の都合で TypeScript は 6系 に固定しています
([TypeScript 7 のネイティブコンパイラは astro check が使うAPIを未提供のため](https://github.com/withastro/roadmap/discussions/1321))。

## 記事を書く

1. `src/data/blog/ja/<slug>.md` (英語版は `src/data/blog/en/<slug>.md`) を作成する。
2. フロントマターを書く。

   ```yaml
   ---
   title: "記事のタイトル"
   description: "一覧ページとOGPに使われる説明文"
   pubDate: 2026-08-22
   updatedDate: 2026-08-23 # 省略可
   tags: ["Astro", "Markdown"]
   draft: false # true にすると本番ビルドから除外 (開発サーバでは表示される)
   math: true # 数式を使う記事は true
   ---
   ```

3. 本文をMarkdownで書く。記法の一覧は
   [`src/data/blog/ja/writing-articles.md`](src/data/blog/ja/writing-articles.md) がサンプルになっています。
4. `main` ブランチに push すると自動で公開されます。

日本語版と英語版で同じ `<slug>` を使うと、記事ページの言語切り替えが対応する記事同士でつながります。
片方しかない場合は、もう一方の言語の記事一覧に遷移します。

## プロフィールを更新する

| 更新したいもの | 編集するファイル             |
| -------------- | ---------------------------- |
| ブログ名・説明 | `src/data/site.ts`           |
| 自己紹介・SNS  | `src/data/profile.ts`        |
| 学歴・受賞     | `src/data/profile.ts`        |
| OSS活動        | `src/data/projects.ts`       |
| 保有資格       | `src/data/certifications.ts` |
| 論文・発表     | `src/data/publications.ts`   |
| 画面の文言     | `src/i18n/index.ts`          |

いずれも日本語 (`ja`) と英語 (`en`) の両方を書くと、両言語のページに反映されます。

## CI/CD

| ワークフロー                                 | トリガー                        | 内容                                          |
| -------------------------------------------- | ------------------------------- | --------------------------------------------- |
| [`ci.yml`](.github/workflows/ci.yml)         | Pull Request / main以外へのpush | 整形チェック → 型チェック → ビルド            |
| [`deploy.yml`](.github/workflows/deploy.yml) | `main` へのpush / 手動実行      | 型チェック → ビルド → GitHub Pages へデプロイ |

デプロイを有効にするには、GitHubリポジトリの **Settings → Pages → Build and deployment → Source** を
**GitHub Actions** に設定してください。
