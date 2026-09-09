---
name: design-tokens-css
description: Rules for extending the CSS design-token system in this project (colors, spacing, type scale, font stacks) in src/assets/css/style.css. Use whenever adding or changing visual styles so the site stays consistent instead of accumulating one-off values.
---

# Design tokens (eydenv-b)

This project has one stylesheet, [src/assets/css/style.css](../../../src/assets/css/style.css), built around CSS custom properties defined on `:root`. Never hardcode a color, spacing value, or font stack directly in a rule — add or reuse a token instead. A one-off `#2454ff` or `1.5rem` sprinkled into a selector is the thing this skill exists to prevent.

## Token inventory

- **Color**: `--bg`, `--fg`, `--muted`, `--accent`, `--border`, `--code-bg`. Light values live on bare `:root`; dark values are redefined once under `@media (prefers-color-scheme: dark)`. This site has no manual light/dark toggle — it follows the OS setting only.
- **Type**: `--font-heading` (Geist), `--font-body` (Satoshi), `--font-mono` (JetBrains Mono). Each has a real fallback stack (`ui-sans-serif, system-ui, ...` or `ui-monospace, SFMono-Regular, ...`) — never reference a `@font-face` family alone.
- **Spacing**: `--space-1` through `--space-16` on a loose 4/8px-ish scale. Reach for the nearest existing step before inventing `--space-5` or a raw `rem` value.
- **Layout**: `--max-width` (720px) bounds `.site-header`, `main`, and `.site-footer`. Keep new sections inside that column unless there's a specific reason to break out of it.

## Font-role rule

This is the one rule that must never be broken, because it's the whole point of having three families:

- **Geist** — headings only (`h1`–`h4`). Set once on the heading selector; don't repeat `font-family: var(--font-heading)` on every heading class.
- **Satoshi** — body copy, paragraphs, bio text. This is `body`'s default `font-family`; most elements should inherit it for free.
- **JetBrains Mono** — anything that reads as data or UI chrome, not prose: nav links, the contact chips, post dates/meta pills, inline `code` and `pre` blocks. If you're tempted to put a sentence of prose in mono, it belongs in Satoshi instead.

## Adding a new font weight

Fonts are self-hosted (see the project's git history for why: same-origin, no third-party CDN dependency, reproducible CI builds). To add a weight:

1. Download the `.woff2` (Google Fonts for Geist/JetBrains Mono, Fontshare's CSS API for Satoshi — use the *latin*-only subset, which already covers Spanish accents and `ñ`/`ü`).
2. Save it to `src/assets/fonts/` with a `family-weight.woff2` name matching the existing files.
3. Add a `@font-face` block at the top of `style.css`. **Use a relative path** (`url("../fonts/whatever.woff2")`), never a root-relative one (`/assets/fonts/...`) — the site deploys as a GitHub Pages *project* page under a `pathPrefix`, and only relative paths inside the CSS survive that unchanged.
4. Only add `rel="preload"` in [base.njk](../../../src/_includes/base.njk) for a weight that's genuinely used above the fold on first paint — see `accessibility-and-perf` for the budget.

## Dark mode

There is exactly one dark-mode block in the file, keyed off `prefers-color-scheme`. If a new component needs dark-specific treatment beyond swapping token values (e.g. an image that needs a different asset in dark mode), add it inside that same media block, don't scatter new `@media` queries through the file.
