---
name: technical-prose-styling
description: Voice, tone, and Markdown conventions for writing blog posts in src/posts/*.md on this technical blog. Use whenever drafting or editing an article, its front matter, or its excerpt.
---

# Technical prose styling (eydenv-b)

This is Eyden Villanueva's personal technical blog: first person, in Spanish, written by a Software Engineer for other engineers. Every post lives at `src/posts/*.md` and inherits `post.njk` via the directory data file `src/posts/posts.json`.

## Voice

- Primera persona ("elegí", "monté", "aprendí"), como si le explicaras algo a un colega, no como copy de marketing ni como documentación corporativa.
- Directo y sin relleno: cada párrafo aporta algo, nada de introducciones genéricas tipo "en el mundo actual de la tecnología...".
- Técnico pero legible: asume que el lector programa, pero no des por sentado que conoce la herramienta específica del post — explica el porqué, no solo el qué.
- Sentence case en encabezados (`## Por qué elegí Eleventy`), no Title Case ni mayúsculas por palabra — así se ve el resto del sitio y así se escribe en español.
- Sin emojis salvo que se pidan explícitamente.

## Front matter

Cada artículo requiere:

```yaml
---
title: Título del artículo
description: Una oración que resume el artículo, usada como <meta description> y como el texto bajo el título en la lista de artículos.
date: YYYY-MM-DD
tags: [eleventy, javascript]
---
```

- `title`: sin punto final, capitalización normal de oración.
- `description`: una sola oración, apunta a menos de ~160 caracteres (aparece tal cual en la lista del blog y en el `<meta name="description">` — ver [base.njk](../../../src/_includes/base.njk)).
- `date`: fecha real de publicación, formato ISO. El filtro `readableDate` en [eleventy.config.js](../../../eleventy.config.js) la formatea en español y en UTC — no dependas de la hora local.
- `tags`: 1-3 palabras clave en minúsculas, en inglés técnico estándar (`javascript`, no `js`; `eleventy`, no `11ty`) — alimentan los chips de filtro y el buscador en la página del blog (`src/index.njk`). No uses el valor `post` como tag propio: ese ya lo agrega `src/posts/posts.json` para la colección y se excluye a propósito de lo que se muestra.

## Nombre de archivo

`src/posts/titulo-en-kebab-case.md`, derivado del título, sin acentos ni caracteres especiales (el slug se vuelve la URL del artículo).

## Estructura del cuerpo

- Un párrafo de apertura que dice qué es el artículo y por qué existe, sin necesidad de un heading "Introducción".
- Secciones con `##`; subsecciones con `###` solo si de verdad hay una jerarquía de tres niveles.
- Bloques de código con el lenguaje indicado (` ```bash `, ` ```js `, etc.) para que el resaltado y la fuente mono se apliquen correctamente.
- Listas para enumerar opciones/pasos reales, no como muletilla de formato — un párrafo normal es mejor si no hay una enumeración genuina.
- Enlaces en Markdown estándar (`[texto](url)`); el estilo visual (color de acento, subrayado en hover) ya está resuelto por `style.css`, no lo repitas inline.
