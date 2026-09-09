# eydenv-b

Eyden Villanueva's technical blog, built with [Eleventy](https://www.11ty.dev/) on top of Markdown files.

## Structure

```
src/
  _data/site.json          -> contact/profile data used across the site
  _includes/                -> layouts (base.njk, sidebar.njk, post.njk) and shared partials
  posts/                     -> blog articles (.md)
  assets/css/                -> tokens.css (color) and style.css (everything else)
  index.njk                  -> the blog listing (tags, search, posts grouped by year)
  about.njk                  -> /about/
  projects.njk                -> /projects/
eleventy.config.js            -> Eleventy configuration
.github/workflows/deploy.yml  -> automatic GitHub Pages deployment
```

## Local development

```bash
npm install
npm start
```

Starts a local dev server with live reload (defaults to `http://localhost:8080`).

## New article

Create a `.md` file inside `src/posts/` with front matter:

```md
---
title: Article title
description: Short summary shown in the article list.
date: 2026-01-01
tags: [eleventy, javascript]
---

Markdown content...
```

## Production build

```bash
npm run build
```

Generates the static site into `_site/`.

## Deployment (GitHub Pages)

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site and publishes it to GitHub Pages on every push to `main`.

On GitHub, go to **Settings → Pages** and set **Source: GitHub Actions** (only needed once).

The site is served as a project page at `https://EydenVillanueva.github.io/eydenv-b/`, so the build uses `PATH_PREFIX=/eydenv-b/`.
