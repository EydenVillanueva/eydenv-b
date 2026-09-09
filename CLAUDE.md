# eydenv-b

Blog técnico personal de Eyden Villanueva (Software Engineer), construido con [Eleventy](https://www.11ty.dev/) sobre archivos Markdown. Contenido en inglés (migrado de español), despliegue automático a GitHub Pages.

## Stack y comandos

- `npm start` — servidor de desarrollo con recarga automática (`eleventy --serve`, puerto 8080).
- `npm run build` — build de producción a `_site/` (gitignored).
- Sin framework de frontend. Sí hay JS vanilla mínimo y sin dependencias (`src/assets/js/`): el logo animado, el toggle de tema, y el filtro/buscador del blog — cualquier adición nueva debe justificarse con ese mismo criterio. El resaltado de sintaxis, en cambio, corre 100% en build-time (ver más abajo) — cero JS de cliente ahí.

## Estructura

- `eleventy.config.js` — configuración: passthrough de `src/assets`, filtro `readableDate` (formatea en `en-US` y **UTC** deliberadamente, para que la fecha del front matter no se corra un día por zona horaria local), `pathPrefix` vía `PATH_PREFIX` env var.
- `src/_data/site.json` — única fuente de verdad para nombre, rol, edad, ubicación, email, teléfono y links (LinkedIn/GitHub). Cualquier página que muestre esta info debe leerla de aquí, no hardcodearla.
- Dos layouts de página, ambos comparten `_includes/partials/head.njk` y `partials/scripts.njk` (el script anti-FOUC y los `<script>` finales viven ahí una sola vez):
  - `_includes/base.njk` — columna única con header/nav arriba. Lo usa solo `_includes/post.njk` (la página de un artículo individual, sin sidebar, para lectura enfocada).
  - `_includes/sidebar.njk` — el shell de dos columnas (`.app-shell`: `<aside>` + `<main>`) con logo, bio corta, nav y redes sociales persistentes. Lo usan `src/index.njk` (Blog), `src/about.njk` (`/about/`) y `src/projects.njk` (`/projects/`).
- `src/index.njk` — la página del blog: título, chips de filtro por tag, buscador, y artículos agrupados por año vía el filtro `groupByYear` y la colección `postTags` (ambos en `eleventy.config.js`). El filtrado/búsqueda es 100% client-side (`src/assets/js/blog-filter.js`), cargado solo en esta página.
- `src/posts/*.md` — artículos del blog. Ver el skill `technical-prose-styling` antes de escribir uno (incluye el campo `tags:` que alimenta los filtros).
- `src/assets/css/tokens.css` — tokens de color (light/dark) y el mecanismo del toggle explícito. `src/assets/css/style.css` — el resto de tokens (tipografía, espaciado) y todos los componentes. Ver el skill `design-tokens-css` antes de tocar cualquiera de los dos.
- `src/assets/fonts/` — Geist, Satoshi y JetBrains Mono, self-hosted (decisión deliberada: mismo origen que el resto del sitio, sin depender de Fontshare/Google Fonts en runtime ni en el build de CI).
- `src/assets/images/` — `favicon.svg` (navegadores modernos) + `favicon.ico`/`apple-touch-icon.png` (fallback) y `og-image.png` (1200×630, usada por los meta tags Open Graph/Twitter Card en `partials/head.njk`). Los tres se generaron con Pillow a partir de los tokens/fuentes reales del sitio, no son assets genéricos — si cambia `--accent` o el wordmark, regenerarlos para que no queden desincronizados.
- `src/sitemap.njk` (`permalink: /sitemap.xml`) y `src/robots.txt` — SEO básico. El sitemap lista las páginas a mano (home/about/projects) más `collections.post`; si se agrega una página de nivel superior nueva, hay que añadirla ahí también, no se autogenera.
- `src/404.njk` (`permalink: /404.html`) — página 404 con el mismo layout `sidebar.njk`. GitHub Pages la sirve automáticamente para cualquier ruta no encontrada dentro de `/eydenv-b/`.
- Resaltado de sintaxis en bloques de código vía `@11ty/eleventy-plugin-syntaxhighlight` (build-time, cero JS de cliente). Los colores de los tokens de Prism reusan los 4 tokens de texto/accent ya existentes — ver el skill `design-tokens-css` antes de tocarlos.

## Gotcha importante: pathPrefix y GitHub Pages

Este repo se sirve como *project page* (`https://eydenvillanueva.github.io/eydenv-b/`), no como `usuario.github.io`, así que todo build de producción corre con `PATH_PREFIX=/eydenv-b/` (ver `.github/workflows/deploy.yml`).

`EleventyHtmlBasePlugin` (registrado en `eleventy.config.js`) ya reescribe automáticamente los atributos `href`/`src` del HTML final para incluir el `pathPrefix`. **Nunca encadenar también el filtro `| url`** en un template sobre esos atributos — ya se hizo ese error una vez y duplicó el prefijo en producción (`/eydenv-b/eydenv-b/...`), rompiendo todos los links y assets. Usar rutas planas root-relative (`/assets/css/style.css`, `/`) en los templates y dejar que el plugin haga el resto.

Por la misma razón, las rutas de fuentes dentro de `style.css` (`@font-face`) son **relativas** (`../fonts/archivo.woff2`), no root-relative — así funcionan sin importar el `pathPrefix`, porque el CSS no pasa por el plugin.

## Despliegue

Push a `main` dispara `.github/workflows/deploy.yml`: build con Eleventy → `actions/deploy-pages`. GitHub Pages ya está configurado con **Source: GitHub Actions** en Settings → Pages del repo (no requiere cambios manuales).

## Skills de diseño y contenido

Antes de tocar CSS, tipografía, accesibilidad/performance, o escribir un artículo, revisar el skill correspondiente en `.claude/skills/`:

- `frontend-design` — skill oficial de Anthropic para decisiones de diseño deliberadas y no genéricas.
- `design-tokens-css` — cómo extender el sistema de tokens de `style.css` sin romper la consistencia.
- `technical-prose-styling` — voz, tono y convenciones de Markdown/front matter para los artículos.
- `accessibility-and-perf` — checklist de accesibilidad y performance antes de dar por terminado un cambio.
- `taste-skill` — autocrítica específica de la estética ya establecida de este sitio, antes de reportar un cambio visual como terminado.
