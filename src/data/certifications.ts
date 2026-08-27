import type { Localized } from "../i18n";

export type Certification = {
  name: Localized;
  issuer: Localized;
  /** 取得年月 (YYYY-MM)。新しい順にソートされます。 */
  issued?: string;
  /** 有効期限 (YYYY-MM)。無期限の資格は省略。 */
  expires?: string;
  /** その資格を説明している公式ページ。資格名のリンク先になります。 */
  officialUrl?: string;
  category: "aws" | "gcp" | "github" | "ipa" | "other";
};

const aws = {
  ja: "Amazon Web Services",
  en: "Amazon Web Services",
} satisfies Localized;
const google = { ja: "Google Cloud", en: "Google Cloud" } satisfies Localized;
const github = { ja: "GitHub", en: "GitHub" } satisfies Localized;

/** 資格名は正式名称のため日英で同じ表記を使う。 */
const asIs = (name: string): Localized => ({ ja: name, en: name });

/**
 * === 資格を追加・編集する場所 ===
 *
 * officialUrl はその資格を説明している公式ページを指定します。
 * 提供終了 (retired) した資格は AWS 側の個別ページが消えているため、
 * 認定バッジの公式ページ (Credly の AWS 公式org) を指定しています。
 */
export const certifications: Certification[] = [
  // --- GitHub ---------------------------------------------------------------
  {
    name: asIs("GitHub Copilot"),
    issuer: github,
    issued: "2026-04",
    officialUrl:
      "https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications#github-copilot-certification",
    category: "github",
  },
  {
    name: asIs("GitHub Administration"),
    issuer: github,
    issued: "2025-10",
    officialUrl:
      "https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications#github-administration-certification",
    category: "github",
  },
  {
    name: asIs("GitHub Actions"),
    issuer: github,
    issued: "2025-09",
    officialUrl:
      "https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications#github-actions-certification",
    category: "github",
  },

  // --- Google Cloud ---------------------------------------------------------
  {
    name: asIs("Professional Cloud Architect"),
    issuer: google,
    issued: "2026-03",
    officialUrl: "https://cloud.google.com/learn/certification/cloud-architect",
    category: "gcp",
  },
  {
    name: asIs("Associate Cloud Engineer"),
    issuer: google,
    issued: "2026-02",
    officialUrl: "https://cloud.google.com/learn/certification/cloud-engineer",
    category: "gcp",
  },

  // --- AWS ------------------------------------------------------------------
  {
    name: asIs("AWS Certified Data Engineer – Associate"),
    issuer: aws,
    issued: "2024-04",
    officialUrl:
      "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Advanced Networking – Specialty"),
    issuer: aws,
    issued: "2024-04",
    officialUrl:
      "https://aws.amazon.com/certification/certified-advanced-networking-specialty/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified SysOps Administrator – Associate"),
    issuer: aws,
    issued: "2024-04",
    officialUrl:
      "https://aws.amazon.com/certification/certified-sysops-admin-associate/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Machine Learning – Specialty"),
    issuer: aws,
    issued: "2024-04",
    officialUrl:
      "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Security – Specialty"),
    issuer: aws,
    issued: "2024-03",
    officialUrl:
      "https://aws.amazon.com/certification/certified-security-specialty/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Database – Specialty"),
    issuer: aws,
    issued: "2024-03",
    // 提供終了。AWS 側の個別ページが無いため公式バッジページを指す。
    officialUrl:
      "https://www.credly.com/org/amazon-web-services/badge/aws-certified-database-specialty",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Data Analytics – Specialty"),
    issuer: aws,
    issued: "2024-03",
    // 提供終了。
    officialUrl:
      "https://www.credly.com/org/amazon-web-services/badge/aws-certified-data-analytics-specialty",
    category: "aws",
  },
  {
    name: asIs("AWS Certified: SAP on AWS – Specialty"),
    issuer: aws,
    issued: "2024-02",
    // 提供終了。
    officialUrl:
      "https://www.credly.com/org/amazon-web-services/badge/aws-certified-sap-on-aws-specialty",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Cloud Practitioner"),
    issuer: aws,
    issued: "2024-02",
    officialUrl:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified DevOps Engineer – Professional"),
    issuer: aws,
    issued: "2024-02",
    officialUrl:
      "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Solutions Architect – Associate"),
    issuer: aws,
    issued: "2024-02",
    officialUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Solutions Architect – Professional"),
    issuer: aws,
    issued: "2024-02",
    officialUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    category: "aws",
  },
  {
    name: asIs("AWS Certified Developer – Associate"),
    issuer: aws,
    issued: "2023-09",
    officialUrl:
      "https://aws.amazon.com/certification/certified-developer-associate/",
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
  github: "GitHub",
  ipa: "IPA",
  other: "Other",
};
