import type { Localized } from "../i18n";

export type Certification = {
  name: Localized;
  issuer: Localized;
  /** 取得年月 (YYYY-MM)。指定すると表示され、新しい順にソートされます。 */
  issued?: string;
  /** 有効期限 (YYYY-MM)。無期限の資格は省略。 */
  expires?: string;
  /** 認定バッジ (Credly) など、第三者が検証できるURL */
  verifyUrl?: string;
  category: "aws" | "gcp" | "ipa" | "other";
};

/**
 * === 資格を追加・編集する場所 ===
 *
 * 保有している資格をここに1エントリずつ追加してください。
 * category を "aws" にすると AWS のバッジ色で表示されます。
 * issued / expires / verifyUrl は省略可能で、省略した項目は表示されません。
 */
export const certifications: Certification[] = [
  {
    name: {
      ja: "AWS Certified Solutions Architect – Professional (SAP)",
      en: "AWS Certified Solutions Architect – Professional (SAP)",
    },
    issuer: { ja: "Amazon Web Services", en: "Amazon Web Services" },
    // TODO: 取得年月 (例 "2024-06")・有効期限・Credlyのバッジ URL を記入する
    category: "aws",
  },
  {
    name: {
      ja: "AWS Certified DevOps Engineer – Professional (DOP)",
      en: "AWS Certified DevOps Engineer – Professional (DOP)",
    },
    issuer: { ja: "Amazon Web Services", en: "Amazon Web Services" },
    // TODO: 取得年月 (例 "2024-11")・有効期限・Credlyのバッジ URL を記入する
    category: "aws",
  },
];

/** 取得年月の新しい順。年月未記入のものは末尾にまとめる。 */
export const certificationsByDate = [...certifications].sort((a, b) => {
  if (a.issued && b.issued) return b.issued.localeCompare(a.issued);
  if (a.issued) return -1;
  if (b.issued) return 1;
  return 0;
});

export const categoryLabel: Record<Certification["category"], string> = {
  aws: "AWS",
  gcp: "Google Cloud",
  ipa: "IPA",
  other: "Other",
};
