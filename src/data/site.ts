import type { Localized } from "../i18n";

/**
 * === ブログ名を変えたいときはここ ===
 * ヘッダーのロゴ、<title>、OGP、RSS のタイトルがすべてこの値を参照します。
 */
export const site = {
  /** ブログ名。日英で同じ表記を使う。 */
  name: "Parse & Prove",
  /** ブログ名の下に出る一言。 */
  tagline: {
    ja: "言語処理系と数学のあいだ",
    en: "Between compilers and mathematics",
  } satisfies Localized,
  /** トップページの説明文 (meta description / RSS)。 */
  description: {
    ja: "COBOL処理系や構文解析器の開発、クラウド、形式手法、数学について書いている技術ブログです。",
    en: "A technical blog about COBOL toolchains and parsers, cloud infrastructure, formal methods and mathematics.",
  } satisfies Localized,
};
