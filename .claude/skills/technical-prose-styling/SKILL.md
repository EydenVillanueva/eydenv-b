---
name: technical-prose-styling
description: Voice, tone, and Markdown conventions for writing blog posts in src/posts/*.md on this technical blog. Use whenever drafting or editing an article, its front matter, or its excerpt.
---

# Technical prose styling (eydenv-b)

This is Eyden Villanueva's personal technical blog: first person, in English, written by a Software Engineer for other engineers. The site migrated from Spanish content to English — every post, page, and UI label should be in English going forward; don't reintroduce Spanish copy without being asked. Every post lives at `src/posts/*.md` and inherits `post.njk` via the directory data file `src/posts/posts.json`.

## Voice

- First person ("I chose", "I built", "I learned"), like explaining something to a colleague, not marketing copy or corporate documentation.
- Direct, no filler: every paragraph earns its place, no generic openers like "In today's fast-paced tech world...".
- Technical but readable: assume the reader can program, but don't assume they know the specific tool the post is about — explain the why, not just the what.
- Sentence case in headings (`## Why I chose Eleventy`), not Title Case — matches the rest of the site.
- No emoji unless explicitly requested.

## Front matter

Every article needs:

```yaml
---
title: Article title
description: One sentence summarizing the article, used as the <meta description> and as the text under the title in the article list.
date: YYYY-MM-DD
tags: [eleventy, javascript]
---
```

- `title`: no trailing period, normal sentence capitalization.
- `description`: a single sentence, aim for under ~160 characters (shown as-is in the blog list and in `<meta name="description">` — see [base.njk](../../../src/_includes/base.njk)).
- `date`: the real publish date, ISO format. The `readableDate` filter in [eleventy.config.js](../../../eleventy.config.js) formats it in English and in UTC — don't rely on local time.
- `tags`: 1-3 lowercase keywords (`javascript`, not `js`; `eleventy`, not `11ty`) — feed the filter chips and search on the blog page (`src/index.njk`). Don't use `post` as a tag yourself: `src/posts/posts.json` already adds it for the collection, and it's deliberately excluded from what's displayed.

## File name

`src/posts/title-in-kebab-case.md`, derived from the title (the slug becomes the article's URL).

## Body structure

- An opening paragraph that says what the post is and why it exists — no "Introduction" heading needed.
- Sections with `##`; subsections with `###` only if there's a genuine three-level hierarchy.
- Code blocks with the language tagged (` ```bash `, ` ```js `, etc.) so highlighting and the mono font apply correctly.
- Lists for enumerating real options/steps, not as a formatting crutch — a plain paragraph is better when there's no genuine enumeration.
- Standard Markdown links (`[text](url)`); the visual style (accent color, underline on hover) is already handled by `style.css` — don't repeat it inline.
