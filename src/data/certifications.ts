import type { Localized } from "../i18n";

export type Certification = {
  name: Localized;
  issuer: Localized;
  /** 取得年月 (YYYY-MM)。新しい順に自動でソートされます。 */
  issued: string;
  /** 有効期限 (YYYY-MM)。無期限の資格は省略。 */
  expires?: string;
  /** 認定バッジ / 登録簿など、第三者が検証できるURL */
  verifyUrl?: string;
  category: "aws" | "gcp" | "ipa" | "other";
};

/**
 * === 資格を追加・編集する場所 ===
 *
 * 保有している資格をここに1エントリずつ追加してください。
 * category を "aws" にすると AWS のバッジ色で表示されます。
 * 取得年月は必ず実際の値に置き換えてください (下のAWSの行はテンプレートです)。
 */
export const certifications: Certification[] = [
  {
    name: {
      ja: "情報処理安全確保支援士 (登録セキスペ)",
      en: "Registered Information Security Specialist (RISS)",
    },
    issuer: {
      ja: "情報処理推進機構 (IPA)",
      en: "Information-technology Promotion Agency, Japan",
    },
    issued: "2019-04",
    verifyUrl: "https://riss.ipa.go.jp/r?r=017139",
    category: "ipa",
  },

  // --- ここから下は取得済みの資格に合わせて編集してください -------------------
  // {
  //   name: {
  //     ja: "AWS Certified Solutions Architect – Professional",
  //     en: "AWS Certified Solutions Architect – Professional",
  //   },
  //   issuer: { ja: "Amazon Web Services", en: "Amazon Web Services" },
  //   issued: "2024-06",
  //   expires: "2027-06",
  //   verifyUrl: "https://www.credly.com/badges/xxxxxxxx",
  //   category: "aws",
  // },
  // {
  //   name: {
  //     ja: "AWS Certified Solutions Architect – Associate",
  //     en: "AWS Certified Solutions Architect – Associate",
  //   },
  //   issuer: { ja: "Amazon Web Services", en: "Amazon Web Services" },
  //   issued: "2023-05",
  //   expires: "2026-05",
  //   category: "aws",
  // },
];

export const certificationsByDate = [...certifications].sort((a, b) =>
  b.issued.localeCompare(a.issued),
);

export const categoryLabel: Record<Certification["category"], string> = {
  aws: "AWS",
  gcp: "Google Cloud",
  ipa: "IPA",
  other: "Other",
};
