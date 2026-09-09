---
name: accessibility-and-perf
description: Accessibility and performance checklist for this static Eleventy site before shipping a design or content change. Use before considering any visual or structural change done.
---

# Accessibility and performance (eydenv-b)

This is a static site (Eleventy → plain HTML/CSS, no client-side JavaScript framework) deployed on GitHub Pages. That's an advantage: the performance budget is generous, so the goal is to not throw it away, and to not let a design change quietly break usability.

## Before shipping any visual change

- **Semantic HTML first.** The layouts already use `header` / `main` / `footer` / `article` / `nav`. Don't wrap new sections in bare `div`s when a semantic element fits — screen readers and outline tools rely on this structure.
- **Contrast.** Check new text/background pairs against `--text-primary`/`--text-muted`/`--bg-canvas`/`--bg-surface` in *both* themes — a combination that passes in light mode can fail in dark, and vice versa. Body text should meet WCAG AA (4.5:1); large headings can go as low as 3:1. Don't trust a color by its name or vibe — compute the actual ratio (relative luminance formula, or any contrast checker) before shipping. This project has already had to correct one of its own accent values after computing it turned out to fail AA at 3.79:1 despite looking "fine."
- **Focus visibility.** Never add `outline: none` (or equivalent) to a link, button, or input without replacing it with an equally visible custom focus style. Tab through any new interactive element before calling it done.
- **Images, if you add any.** Always write real `alt` text (empty `alt=""` only for purely decorative images). Set explicit `width`/`height` (or `aspect-ratio`) so the layout doesn't shift while the image loads. Prefer `.svg` for icons/diagrams and a compressed `.webp` (with a fallback only if you have a concrete reason to need one) for photos.
- **Reduced motion.** If you add any animation or transition beyond simple `:hover` color/border changes, gate it behind `@media (prefers-reduced-motion: reduce)`.

## Fonts

- Every `@font-face` must keep `font-display: swap` — it's already set on all eight faces in `style.css`; don't drop it when adding a new one.
- Only `rel="preload"` the one or two font files actually painted above the fold on the landing page (currently Satoshi Regular and Geist Bold, in [base.njk](../../../src/_includes/base.njk)). Preloading every weight defeats the purpose and delays first paint.
- Keep the total font payload light. Each self-hosted weight is a *latin*-only subset (~13–31 KB); don't pull in a full multi-script family when only Spanish + basic Latin is needed.

## Theme persistence, without a flash

The light/dark toggle stores the explicit choice in `localStorage` and applies it via a tiny synchronous inline `<script>` placed first in `<head>` (before both stylesheet `<link>`s), which sets `data-theme` on `<html>` before first paint. That's the pattern to follow for any future persisted-preference feature that affects initial render: read the stored value and apply it synchronously and inline, before CSS loads — never after `DOMContentLoaded`, and never in an externally-loaded script (the network round trip alone reintroduces the flash you're trying to avoid).

## General performance discipline

- No client-side JavaScript framework or heavy dependency, analytics script, or third-party embed without a real reason. The site does ship a small amount of vanilla JS now (the random-logo picker and the theme toggle, both a few lines with zero dependencies) — that bar is "vanilla, minimal, and justified," not "zero JS at all costs."
- No new external-origin requests (fonts, scripts, iframes) without checking whether the asset can be self-hosted instead — same reasoning as the font-hosting decision already made for this project.
- Run a quick Lighthouse (or the browser's own accessibility tree via `read_page`) pass on both the landing page and an article page after a non-trivial change, at both desktop and mobile widths, in both color schemes.
