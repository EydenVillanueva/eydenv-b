---
title: How I built this blog with Eleventy
description: A quick rundown of how this site is put together and why I chose Eleventy for writing about technical topics.
date: 2026-09-08
tags: [eleventy, javascript]
---

This is the first post on the blog. The idea is simple: write about what I'm learning as a Software Engineer, from quick notes to longer guides, using Markdown files as the single source of content.

## Why Eleventy?

I chose [Eleventy](https://www.11ty.dev/) because:

- It doesn't need a frontend framework to work.
- It generates static HTML, fast to serve and easy to deploy.
- Each article is just a `.md` file with a bit of front matter:

```yaml
---
title: Article title
description: One sentence summarizing the article.
date: 2026-01-01
tags: [eleventy, javascript]
---
```

## Project structure

- `src/_includes/`: base and article layouts.
- `src/_data/`: global data, like the site's contact info.
- `src/posts/`: the blog's articles in Markdown.
- `src/assets/`: CSS and static files.
- `src/index.njk`: the blog listing page.

## Next steps

With the scaffolding in place, the plan is to keep adding articles as I run into interesting problems to solve or learn something worth documenting.
