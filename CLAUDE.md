# eydenv-b

Blog técnico personal de Eyden Villanueva (Software Engineer), construido con [Eleventy](https://www.11ty.dev/) sobre archivos Markdown. Contenido en español, despliegue automático a GitHub Pages.

## Stack y comandos

- `npm start` — servidor de desarrollo con recarga automática (`eleventy --serve`, puerto 8080).
- `npm run build` — build de producción a `_site/` (gitignored).
- Sin framework de frontend ni JavaScript del lado del cliente: HTML/CSS estático únicamente.

## Estructura

- `eleventy.config.js` — configuración: passthrough de `src/assets`, filtro `readableDate` (formatea en `es-MX` y **UTC** deliberadamente, para que la fecha del front matter no se corra un día por zona horaria local), `pathPrefix` vía `PATH_PREFIX` env var.
- `src/_data/site.json` — única fuente de verdad para nombre, rol, edad, ubicación, email, teléfono y links (LinkedIn/GitHub). La landing page y cualquier otro lugar que muestre esta info debe leerla de aquí, no hardcodearla.
- `src/_includes/base.njk`, `post.njk` — layouts Nunjucks.
- `src/posts/*.md` — artículos del blog. Ver el skill `technical-prose-styling` antes de escribir uno.
- `src/assets/css/style.css` — único stylesheet, con el sistema de design tokens. Ver el skill `design-tokens-css` antes de tocarlo.
- `src/assets/fonts/` — Geist, Satoshi y JetBrains Mono, self-hosted (decisión deliberada: mismo origen que el resto del sitio, sin depender de Fontshare/Google Fonts en runtime ni en el build de CI).

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
