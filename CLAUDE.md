# CLAUDE.md

このリポジトリで Claude Code が作業するときのガイドです。
サイト全体の説明や記事の書き方は [README.md](README.md) にあるので、ここでは作業上の約束事と落とし穴をまとめます。

## プロジェクト概要

- 坂本優太郎の個人サイト兼技術ブログ「だいたい動く (Mostly Works)」。
- [Astro](https://astro.build/) v7 の静的サイト。`main` への push で GitHub Actions が GitHub Pages に公開する。
- 日英バイリンガル。日本語が既定言語で `/`、英語は `/en/` 配下。
- 記事は Markdown / MDX。コードは Shiki、数式は remark-math + rehype-katex でビルド時に処理する (クライアント JS なし)。

## よく使うコマンド

```bash
npm ci                # 依存関係のインストール (lockfile 固定)
npm run dev           # 開発サーバ http://localhost:4321
npm run build         # dist/ に静的サイトを生成
npm run preview       # ビルド結果を確認
npm run check         # 型チェック (astro check)
npm run format        # Prettier で整形
npm run format:check  # 整形チェック (CI と同じ)
./.devcontainer/smoke-test.sh  # 整形 → 型 → ビルド → 生成物確認 → プレビュー HTTP 確認
```

## 変更を終える前に必ず実行すること

CI (`.github/workflows/ci.yml`) は次の 3 つを順に実行する。push 前にローカルで同じものを通すこと。

```bash
npm run format:check && npm run check && npm run build
```

- Prettier は `.md` / `.json` / `.yml` / `.astro` / `.ts` など、リポジトリ内のほぼ全ファイルを対象にする (除外は `.prettierignore`)。
  **ドキュメントや設定ファイルを追加・編集したときも `npm run format` を通す。** 整形ズレだけで CI が落ちる。
- 型チェックは `astro check`。`.astro` ファイルの frontmatter も対象。
- Astro の Content Collections は `src/content.config.ts` の Zod スキーマで検証される。フロントマターの項目名を間違えるとビルドで落ちる。

## ディレクトリの要点

```
src/
├── content.config.ts   記事コレクションのスキーマ (Zod)。項目を増やすならここ
├── data/blog/{ja,en}/  記事本体。ディレクトリ名 = 言語。ファイル名 = slug
├── data/*.ts           プロフィール・OSS・資格・論文などのデータ。ja/en 両方を書く
├── i18n/index.ts       UI 文言 (ui オブジェクト) と localePath / useTranslations
├── components/         部品。components/pages/ は各ページの本体で ja/en から共有
├── layouts/            BaseLayout (head/header/footer) と PostLayout (記事)
├── pages/              ルーティング。pages/en/ は日本語側と同じ構成のミラー
├── styles/global.css   デザイントークン (CSS 変数) と全体スタイル
└── utils/posts.ts      記事の取得・並び替え・パス生成・読了時間
public/                 そのまま配信 (favicon, mine-sweeper デモ)。mine-sweeper は Prettier 対象外
```

## コーディング規約・設計方針

- **言語対応は必ず両方。** データ (`src/data/*.ts`) は `Localized` 型 (`{ ja, en }`) で書く。UI 文言は `src/i18n/index.ts` の `ui.ja` と `ui.en` に同じキーを追加する。片方だけ追加すると型エラーになる。
- **ページは ja/en で二重に置かない。** ページの実装は `src/components/pages/*.astro` に書き、`src/pages/` と `src/pages/en/` からは `lang` を渡して呼び出すだけにする。
- **記事の対訳は同じ slug。** `src/data/blog/ja/foo.md` と `src/data/blog/en/foo.md` が対応する。PostLayout が slug の一致で言語切り替えリンクを張る。
- **クライアント JS は最小限。** テーマ切り替え以外は基本的に静的 HTML。数式・ハイライトはビルド時に済ませる。
- **スタイルは CSS 変数経由。** 色やサイズは `src/styles/global.css` のトークンを使い、コンポーネント内で直値を増やさない。
- コメントは日本語で書かれている。既存ファイルに合わせる。
- インデント 2 スペース、LF、末尾改行あり (`.editorconfig`)。Prettier の設定は `.prettierrc.json`。

## 落とし穴

- **TypeScript は 6 系に固定。** `astro check` が TypeScript 7 のネイティブコンパイラ未対応のため。`package.json` の `typescript` を 7 に上げない。
- **Markdown プロセッサは unified に戻している。** Astro v7 の既定 (Sätteri) では TeX が扱えないので、`astro.config.mjs` で `unified()` を明示している。MDX 側にも同じ processor を渡す必要がある。
- `draft: true` の記事は開発サーバでは表示され、本番ビルドでは除外される (`src/utils/posts.ts`)。
- `math: true` を付けた記事だけ KaTeX の CSS を読み込む。数式を使うなら忘れずに付ける。
- `package-lock.json` は Prettier 対象外。手で触らず `npm install` に任せる。
- `*.pdf` は `.gitignore` 済み (個人ファイルの誤コミット防止)。

## 記事を追加するとき

1. `src/data/blog/ja/<slug>.md` (英語版は `en/`) を作る。slug は英小文字とハイフン。
2. フロントマターは `title` / `description` / `pubDate` が必須。`tags` / `draft` / `math` / `updatedDate` は任意。
3. 記法のサンプルは `src/data/blog/ja/writing-articles.md`。
4. `npm run build` でスキーマ検証を通す。

`/new-post` スキルを使うとフロントマター付きの雛形を作れる。

## Git / PR

- コミットメッセージは日本語・英語どちらでもよい (履歴に両方ある)。内容が分かる一文にする。
- `main` に直接 push しない。ブランチを切って PR を出す。CI と Dev Container のスモークテストが走る。
- Dependabot が依存関係の PR を出す。Astro 関連はグループ化されている。
