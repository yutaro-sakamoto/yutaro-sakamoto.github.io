---
title: "Writing Articles Here — Markdown, Code and Math"
description: "A sample post showing how articles are authored in Markdown, with build-time syntax highlighting and TeX math."
pubDate: 2026-08-22
tags: ["Astro", "Markdown", "KaTeX"]
math: true
---

The source of this site is on GitHub at [yutaro-sakamoto/yutaro-sakamoto.github.io](https://github.com/yutaro-sakamoto/yutaro-sakamoto.github.io).

Articles are plain Markdown (or MDX) files under [`src/data/blog/en/`](https://github.com/yutaro-sakamoto/yutaro-sakamoto.github.io/tree/main/src/data/blog/en)
([`src/data/blog/ja/`](https://github.com/yutaro-sakamoto/yutaro-sakamoto.github.io/tree/main/src/data/blog/ja) for the Japanese versions). This post doubles as a reference for the available syntax.

## Frontmatter

Every article starts with frontmatter:

```yaml
---
title: "Title of the article"
description: "Used on the index page and for social cards"
pubDate: 2026-08-22
updatedDate: 2026-08-23 # optional
tags: ["Astro", "Markdown"]
draft: false # true keeps it out of production builds
math: true # set for posts containing TeX
---
```

The schema is validated with Zod in [`src/content.config.ts`](https://github.com/yutaro-sakamoto/yutaro-sakamoto.github.io/blob/main/src/content.config.ts), so a missing field fails the build instead of shipping a broken page.

## Code

Code blocks are highlighted at build time by [Shiki](https://shiki.style/) — no client-side JavaScript involved.

```rust
fn main() {
    let cobol_files: Vec<_> = std::env::args()
        .skip(1)
        .filter(|p| p.ends_with(".cbl"))
        .collect();

    for path in &cobol_files {
        println!("parsing {path}");
    }
}
```

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "HELLO, WORLD".
           STOP RUN.
```

## Math

Math is written in TeX and rendered to HTML by [KaTeX](https://katex.org/) during the build.

Inline math goes between `$...$`: the generalized Petersen graph $GP(n, k)$ has $2n$ vertices.

Display math goes between `$$...$$`:

$$
\chi'(G) \le \Delta(G) + 1
$$

Environments work as expected:

$$
\begin{aligned}
  \sum_{v \in V(G)} \deg(v) &= 2\,|E(G)| \\
  \left| \bigcup_{i=1}^{n} A_i \right|
    &= \sum_{\emptyset \ne S \subseteq [n]} (-1)^{|S|+1} \left| \bigcap_{i \in S} A_i \right|
\end{aligned}
$$

$$
f(n) =
\begin{cases}
  1 & (n = 0) \\
  n \cdot f(n-1) & (n \ge 1)
\end{cases}
\qquad
A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}
$$

## Everything else

GitHub Flavored Markdown is enabled, so tables and task lists work too.

| Dish          | Time   | Notes                            |
| ------------- | ------ | -------------------------------- |
| Curry         | 40 min | Even better the next day         |
| Miso soup     | 10 min | Do not boil it after adding miso |
| Fried chicken | 30 min | Fry it twice for a crisp coating |

> Blockquotes are available as well.

- [ ] An open task
- [x] A finished task

## Publishing

Add the Markdown file, push to `main`, and GitHub Actions builds and deploys the site to GitHub Pages.
To preview locally:

```bash
npm install
npm run dev
```
