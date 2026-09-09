---
name: accessibility-and-perf
description: Accessibility and performance checklist for this static Eleventy site before shipping a design or content change. Use before considering any visual or structural change done.
---

# Accessibility and performance (eydenv-b)

This is a static site (Eleventy → plain HTML/CSS, no client-side JavaScript framework) deployed on GitHub Pages. That's an advantage: the performance budget is generous, so the goal is to not throw it away, and to not let a design change quietly break usability.

## Before shipping any visual change

- **Semantic HTML first.** The layouts already use `header` / `main` / `footer` / `article` / `nav`. Don't wrap new sections in bare `div`s when a semantic element fits — screen readers and outline tools rely on this structure.
- **Contrast.** Check new text/background pairs against `--fg`/`--bg`/`--muted` in *both* color schemes (light and the `prefers-color-scheme: dark` override) — a combination that passes in light mode can fail in dark. Body text should meet WCAG AA (4.5:1); large headings can go as low as 3:1.
- **Focus visibility.** Never add `outline: none` (or equivalent) to a link, button, or input without replacing it with an equally visible custom focus style. Tab through any new interactive element before calling it done.
- **Images, if you add any.** Always write real `alt` text (empty `alt=""` only for purely decorative images). Set explicit `width`/`height` (or `aspect-ratio`) so the layout doesn't shift while the image loads. Prefer `.svg` for icons/diagrams and a compressed `.webp` (with a fallback only if you have a concrete reason to need one) for photos.
- **Reduced motion.** If you add any animation or transition beyond simple `:hover` color/border changes, gate it behind `@media (prefers-reduced-motion: reduce)`.

## Fonts

- Every `@font-face` must keep `font-display: swap` — it's already set on all eight faces in `style.css`; don't drop it when adding a new one.
- Only `rel="preload"` the one or two font files actually painted above the fold on the landing page (currently Satoshi Regular and Geist Bold, in [base.njk](../../../src/_includes/base.njk)). Preloading every weight defeats the purpose and delays first paint.
- Keep the total font payload light. Each self-hosted weight is a *latin*-only subset (~13–31 KB); don't pull in a full multi-script family when only Spanish + basic Latin is needed.

## General performance discipline

- No client-side JavaScript framework, analytics script, or third-party embed without a real reason — every addition is weighed against the fact that this site currently ships zero JS.
- No new external-origin requests (fonts, scripts, iframes) without checking whether the asset can be self-hosted instead — same reasoning as the font-hosting decision already made for this project.
- Run a quick Lighthouse (or the browser's own accessibility tree via `read_page`) pass on both the landing page and an article page after a non-trivial change, at both desktop and mobile widths, in both color schemes.
