/**
 * データファイル (profile.ts / projects.ts など) に書いた短いテキストを
 * HTMLに変換するための最小限のMarkdownレンダラ。
 * 対応するのは **強調**、`コード`、[リンク](url)、空行による段落分けのみ。
 * 記事本文には使わない (そちらは Astro の Markdown パイプラインが処理する)。
 */
const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
      (_m, label, href) => {
        const external = href.startsWith("http");
        const attrs = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${href}"${attrs}>${label}</a>`;
      },
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

/** 段落 (<p>) に分割してHTMLを返す。 */
export function renderRichText(text: string): string {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((para) => `<p>${renderInline(para.replace(/\n/g, " "))}</p>`)
    .join("");
}

/** 1行のテキストをインライン記法だけ解釈してHTMLを返す。 */
export { renderInline };
