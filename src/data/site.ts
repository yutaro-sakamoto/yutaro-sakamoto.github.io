import type { Localized } from "../i18n";

/**
 * === ブログ名を変えたいときはここ ===
 * ヘッダーのロゴ、<title>、OGP、RSS のタイトルがすべてこの値を参照します。
 */
export const site = {
  /** ブログ名。 */
  name: {
    ja: "だいたい動く",
    en: "Mostly Works",
  } satisfies Localized,
  /** ブログ名の下に出る一言。 */
  tagline: {
    ja: "完璧ではないけれど",
    en: "Not perfect, but it runs",
  } satisfies Localized,
  /** トップページの説明文 (meta description / RSS)。 */
  description: {
    ja: "作ったものと、その途中で踏んだものを書いています。",
    en: "Notes on the things I build and the things I trip over on the way.",
  } satisfies Localized,
};
