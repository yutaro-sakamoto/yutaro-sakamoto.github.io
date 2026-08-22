import type { Localized } from "../i18n";

export type Publication = {
  /** 論文タイトル (原語のまま) */
  title: string;
  /** 著者名の並び。自分の名前は `self: true` で強調表示されます。 */
  authors: { name: string; self?: boolean }[];
  /** 掲載誌名・会議名 */
  venue: string;
  year: number;
  /** 巻号・ページなど */
  detail?: string;
  type: "journal" | "conference" | "thesis" | "talk";
  url?: string;
  doi?: string;
  abstract?: Localized;
};

/**
 * === 論文・発表を追加する場所 ===
 * 新しい順に自動でソートされます。
 */
export const publications: Publication[] = [
  {
    title: "Hamilton cycles in double generalized Petersen graphs",
    authors: [{ name: "Yutaro Sakamoto", self: true }],
    venue: "Discussiones Mathematicae Graph Theory",
    year: 2019,
    detail: "Vol. 39, No. 1, pp. 117–123",
    type: "journal",
    url: "https://www.dmgt.uz.zgora.pl/publish/bbl_view_pdf.php?ID=-1990",
    doi: "10.7151/dmgt.2065",
    abstract: {
      ja: "二重一般化ペテルセングラフ DP(n, k) がハミルトン閉路を持つための条件を調べ、すべての n, k に対してハミルトン閉路が存在することを示した。",
      en: "We study Hamilton cycles in double generalized Petersen graphs DP(n, k) and show that they are Hamiltonian for all n and k.",
    },
  },
];

export const publicationsByYear = [...publications].sort(
  (a, b) => b.year - a.year,
);

export function formatAuthors(pub: Publication): string {
  return pub.authors.map((a) => a.name).join(", ");
}
