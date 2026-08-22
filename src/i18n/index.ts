export const languages = {
  ja: "日本語",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "ja";

/** 言語ごとに切り替わる文字列。データ層とUI層の両方で使う。 */
export type Localized = { readonly [K in Lang]: string };

export const ui = {
  ja: {
    "nav.home": "ホーム",
    "nav.about": "自己紹介",
    "nav.projects": "OSS活動",
    "nav.certifications": "資格",
    "nav.publications": "論文",
    "nav.blog": "技術記事",
    "site.title": "Yutaro Sakamoto",
    "site.description":
      "坂本優太郎のポートフォリオと技術記事。COBOL処理系・言語処理系の開発、クラウド、形式手法、数学について書いています。",
    "home.tagline": "ソフトウェアエンジニア / OSS開発者",
    "home.recentPosts": "最近の記事",
    "home.viewAll": "記事をすべて見る",
    "blog.title": "技術記事",
    "blog.description": "技術・数学に関する記事の一覧です。",
    "blog.empty": "まだ記事がありません。",
    "blog.backToList": "記事一覧に戻る",
    "blog.toc": "目次",
    "blog.updated": "更新",
    "blog.readingTime": "分で読めます",
    "about.title": "自己紹介",
    "projects.title": "OSS活動・開発実績",
    "projects.role": "担当",
    "certifications.title": "保有資格",
    "certifications.issued": "取得",
    "certifications.verify": "認定を確認",
    "publications.title": "論文・発表",
    "publications.pdf": "本文",
    "career.title": "経歴",
    "education.title": "学歴",
    "awards.title": "受賞",
    "interests.title": "興味・関心",
    "links.title": "リンク",
    "footer.builtWith":
      "Astro で構築し、GitHub Actions で GitHub Pages に公開しています。",
    "lang.switch": "English",
    "404.title": "ページが見つかりません",
    "404.body": "お探しのページは移動または削除された可能性があります。",
    "404.home": "ホームへ戻る",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Open Source",
    "nav.certifications": "Certifications",
    "nav.publications": "Publications",
    "nav.blog": "Articles",
    "site.title": "Yutaro Sakamoto",
    "site.description":
      "Portfolio and technical writing by Yutaro Sakamoto — COBOL/language toolchains, cloud infrastructure, formal methods and mathematics.",
    "home.tagline": "Software Engineer / Open Source Developer",
    "home.recentPosts": "Recent posts",
    "home.viewAll": "View all articles",
    "blog.title": "Articles",
    "blog.description": "Writing about software engineering and mathematics.",
    "blog.empty": "No articles yet.",
    "blog.backToList": "Back to all articles",
    "blog.toc": "Contents",
    "blog.updated": "Updated",
    "blog.readingTime": "min read",
    "about.title": "About",
    "projects.title": "Open Source Work",
    "projects.role": "Role",
    "certifications.title": "Certifications",
    "certifications.issued": "Issued",
    "certifications.verify": "Verify",
    "publications.title": "Publications",
    "publications.pdf": "Full text",
    "career.title": "Experience",
    "education.title": "Education",
    "awards.title": "Awards",
    "interests.title": "Interests",
    "links.title": "Links",
    "footer.builtWith":
      "Built with Astro, deployed to GitHub Pages by GitHub Actions.",
    "lang.switch": "日本語",
    "404.title": "Page not found",
    "404.body": "The page you are looking for may have been moved or removed.",
    "404.home": "Back to home",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["ja"];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key];
  };
}

/** "/blog" のような言語非依存のパスを、その言語の実際のURLに変換する。 */
export function localePath(lang: Lang, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return lang === defaultLang ? clean || "/" : `/en${clean}`;
}

/** URL から言語を判定する。 */
export function langFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/en") ? "en" : defaultLang;
}

/** 現在のパスを、もう一方の言語の対応するパスに変換する。 */
export function alternatePath(lang: Lang, pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return lang === "ja"
    ? localePath("en", stripped)
    : localePath("ja", stripped);
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: lang === "ja" ? "long" : "short",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(date);
}
