import type { Localized } from "../i18n";

export type Project = {
  name: string;
  href: string;
  /** トップページで大きく扱うプロジェクト */
  featured?: boolean;
  role: Localized;
  description: Localized;
  tags: string[];
  /** 表示用のスター数。手動更新 (省略可) */
  stars?: number;
};

export const projects: Project[] = [
  {
    name: "opensource COBOL 4J",
    href: "https://github.com/opensourcecobol/opensourcecobol4j",
    featured: true,
    role: { ja: "主要開発者", en: "Lead developer" },
    description: {
      ja: `COBOLのソースコードをJavaに変換するオープンソースのコンパイラです。
既存のCOBOL資産をJVM上でそのまま動かすことを目的としており、
字句解析・構文解析からJavaコード生成、実行時ライブラリ (libcobj) までを含みます。
私はリポジトリで最も多くのコミットを行っており、
コード生成・組み込み関数・ファイル入出力・テスト基盤の設計と実装を担当しています。`,
      en: `An open source compiler that translates COBOL source code into Java,
so that existing COBOL assets can run on the JVM unchanged.
It covers the whole pipeline: lexing and parsing, Java code generation, and the runtime library (libcobj).
I am the top contributor to the repository, responsible for code generation,
intrinsic functions, file I/O and the test infrastructure.`,
    },
    tags: ["COBOL", "Java", "Compiler", "OSS"],
    stars: 125,
  },
  {
    name: "tree-sitter-cobol",
    href: "https://github.com/yutaro-sakamoto/tree-sitter-cobol",
    featured: true,
    role: { ja: "作者", en: "Author" },
    description: {
      ja: `COBOL向けの [tree-sitter](https://tree-sitter.github.io/) 文法です。
インクリメンタルな構文解析により、エディタのシンタックスハイライト、構造化検索、
静的解析ツールなどからCOBOLの構文木を扱えるようになります。
固定形式・自由形式の両方に対応しています。`,
      en: `A [tree-sitter](https://tree-sitter.github.io/) grammar for COBOL.
It provides incremental parsing so that editors, structural search and static analysis tools
can work with real COBOL syntax trees. Both fixed-format and free-format source are supported.`,
    },
    tags: ["COBOL", "tree-sitter", "Parser", "C"],
    stars: 38,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
