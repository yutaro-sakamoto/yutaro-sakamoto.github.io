import type { Localized } from "../i18n";

export type Link = {
  label: string;
  href: string;
  /** ヘッダー/フッターのアイコン識別子 (src/components/Icon.astro を参照) */
  icon?: "github" | "mail" | "rss" | "scholar";
};

export type TimelineEntry = {
  period: Localized;
  title: Localized;
  organization: Localized;
  organizationUrl?: string;
  description?: Localized;
};

export const profile = {
  name: { ja: "坂本 優太郎", en: "Yutaro Sakamoto" } satisfies Localized,
  nameSub: {
    ja: "さかもと ゆうたろう",
    en: "Sakamoto Yutaro",
  } satisfies Localized,
  headline: {
    ja: "COBOL処理系・言語処理系の開発者。レガシーシステムのモダナイゼーションとクラウド基盤づくりが専門です。",
    en: "Compiler and language-tooling developer, focused on legacy system modernization and the cloud platforms around it.",
  } satisfies Localized,
  bio: {
    ja: `COBOLをJavaへ変換するOSSコンパイラ **opensource COBOL 4J** の主要開発者であり、
COBOL向けの構文解析器 **tree-sitter-cobol** も開発しています。
大学・大学院ではグラフ理論を研究していました。
関数型プログラミング、定理証明支援系、形式手法にも関心があります。`,
    en: `I am the lead developer of **opensource COBOL 4J**, an open source compiler that translates COBOL into Java,
and the author of **tree-sitter-cobol**, an incremental parser for COBOL.
I studied graph theory at university.
I am also interested in functional programming, proof assistants and formal methods.`,
  } satisfies Localized,
  location: { ja: "東京, 日本", en: "Tokyo, Japan" } satisfies Localized,
  email: "yutaro-sakamoto(at)yutaro-sakamoto.com",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/yutaro-sakamoto",
      icon: "github",
    },
  ] satisfies Link[],
  interests: {
    ja: [
      "コンパイラ・言語処理系",
      "COBOL / レガシーモダナイゼーション",
      "関数型言語 (Haskell, PureScript, Elm, Idris)",
      "定理証明支援系 (Lean, F*) と形式手法 (TLA+)",
      "AWS / インフラ自動化",
      "グラフ理論・離散数学",
    ],
    en: [
      "Compilers and language tooling",
      "COBOL / legacy modernization",
      "Functional languages (Haskell, PureScript, Elm, Idris)",
      "Proof assistants (Lean, F*) and formal methods (TLA+)",
      "AWS and infrastructure automation",
      "Graph theory and discrete mathematics",
    ],
  },
};

export const education: TimelineEntry[] = [
  {
    period: { ja: "2017年4月 – 2019年3月", en: "Apr 2017 – Mar 2019" },
    title: {
      ja: "修士 (工学) 情報理工学研究科 情報学専攻",
      en: "M.E., Graduate School of Informatics and Engineering",
    },
    organization: {
      ja: "電気通信大学",
      en: "The University of Electro-Communications",
    },
    organizationUrl: "https://www.uec.ac.jp/",
    description: { ja: "グラフ理論を研究。", en: "Studied graph theory." },
  },
  {
    period: { ja: "2013年4月 – 2017年3月", en: "Apr 2013 – Mar 2017" },
    title: {
      ja: "学士 (工学) 情報理工学部 総合情報学科",
      en: "B.E., School of Informatics and Engineering",
    },
    organization: {
      ja: "電気通信大学",
      en: "The University of Electro-Communications",
    },
    organizationUrl: "https://www.uec.ac.jp/",
  },
];

export const awards: TimelineEntry[] = [
  {
    period: { ja: "2019年3月", en: "Mar 2019" },
    title: { ja: "平成30年度 目黒会賞", en: "Meguro-kai Award (FY2018)" },
    organization: { ja: "電気通信大学 目黒会", en: "UEC Meguro-kai" },
    organizationUrl: "https://megurokai.jp/web_magazine/commendation190326/",
  },
  {
    period: { ja: "2017年3月", en: "Mar 2017" },
    title: { ja: "平成28年度 目黒会賞", en: "Meguro-kai Award (FY2016)" },
    organization: { ja: "電気通信大学 目黒会", en: "UEC Meguro-kai" },
    organizationUrl: "https://megurokai.jp/web_magazine/commendation170327/",
  },
];
