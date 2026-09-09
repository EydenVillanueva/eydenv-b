# eydenv-b

Blog técnico de Eyden Villanueva, construido con [Eleventy](https://www.11ty.dev/) sobre archivos Markdown.

## Estructura

```
src/
  _data/site.json     -> datos de contacto/perfil usados en la landing page
  _includes/           -> layouts (base.njk, post.njk)
  posts/                -> artículos del blog (.md)
  assets/css/style.css  -> estilos
  index.njk             -> landing page
eleventy.config.js       -> configuración de Eleventy
.github/workflows/deploy.yml -> despliegue automático a GitHub Pages
```

## Desarrollo local

```bash
npm install
npm start
```

Esto levanta un servidor local con recarga automática (por defecto en `http://localhost:8080`).

## Nuevo artículo

Crea un archivo `.md` dentro de `src/posts/` con front matter:

```md
---
title: Título del artículo
description: Resumen corto para la lista de artículos.
date: 2026-01-01
---

Contenido en Markdown...
```

## Build de producción

```bash
npm run build
```

Genera el sitio estático en `_site/`.

## Despliegue (GitHub Pages)

El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que construye el sitio y lo publica en GitHub Pages en cada push a `main`.

En GitHub, ve a **Settings → Pages** y configura **Source: GitHub Actions** (solo necesario la primera vez).

El sitio se sirve como página de proyecto en `https://EydenVillanueva.github.io/eydenv-b/`, por lo que el build usa `PATH_PREFIX=/eydenv-b/`.
