---
name: design-tokens-css
description: Rules for extending the color token system (tokens.css) and the light/dark toggle, plus the non-color tokens in style.css (spacing, type scale, font stacks). Use whenever adding or changing visual styles so the site stays consistent instead of accumulating one-off values.
---

# Design tokens (eydenv-b)

Color tokens live in their own file, [src/assets/css/tokens.css](../../../src/assets/css/tokens.css). Everything else (spacing, type scale, font stacks, `--max-width`) stays in the `:root` block at the top of [src/assets/css/style.css](../../../src/assets/css/style.css). Never hardcode a color, spacing value, or font stack directly in a rule — add or reuse a token instead. A one-off `#e63956` or `1.5rem` sprinkled into a selector is the thing this skill exists to prevent.

## Color token inventory

- `--bg-canvas` — the page background.
- `--bg-surface` — quiet contained backgrounds: code blocks, the date/meta pills. Not a card/elevation system — this site doesn't have one.
- `--border-subtle` — 1px hairline dividers only.
- `--text-primary` — headings and body copy.
- `--text-muted` — metadata, dates, tags, secondary copy.
- `--accent` / `--accent-hover` — links, focus, the logo mark, and interactive hover states. `--accent-hover` is deliberately the *livelier* shade in both themes (brighter in light mode, lighter in dark mode) — hover brightens, it doesn't darken.

Every one of these is defined twice per theme, on purpose — see "Theme architecture" below. Never `!important` your way around it; add the value in both places or the toggle and the OS-preference fallback will disagree with each other.

## Theme architecture (three layers, applied in this order)

1. **Base `:root`** in `tokens.css` — the light values. This is the default with no JS and no OS preference match.
2. **`@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`** — the dark values, applied when the OS prefers dark, *unless* the visitor has explicitly chosen light. This branch is what makes the site react live if someone flips their OS theme mid-visit without an explicit in-page choice yet.
3. **`:root[data-theme="dark"]`** — the dark values again, applied when the visitor has explicitly toggled dark, regardless of OS preference.

`color-scheme` follows the same pattern: `light dark` on bare `:root` (let the browser pick native form-control/scrollbar styling from OS preference by default), then pinned to `light` or `dark` under the matching `[data-theme]` selector once there's an explicit choice.

If you add a new color token, add it to all three places. If you only add it to the base `:root`, it'll be wrong for every dark-mode visitor.

## The toggle

- `data-theme="light"|"dark"` on `<html>` is the single source of truth for an *explicit* choice. Its absence means "no explicit choice yet — follow the OS."
- The FOUC-prevention script in `base.njk`'s `<head>` (before both stylesheet `<link>`s) reads `localStorage.getItem("theme")` and sets the attribute synchronously before first paint — only if a value is stored. It deliberately does *not* set the attribute when nothing is stored, so the OS-preference media query in `tokens.css` stays live instead of being permanently overridden by a one-time computed guess.
- [theme-toggle.js](../../../src/assets/js/theme-toggle.js) (loaded at the end of `<body>`, after the toggle button exists) flips the attribute, persists the choice to `localStorage`, and updates the button's `aria-pressed`.
- The sun/moon icon swap in the toggle button is pure CSS (mirrors the same three-layer selector structure), not JS — so the icon is never wrong for a single frame.

## Font-role rule

Unchanged from before, still the one rule that must never be broken:

- **Geist** — headings only (`h1`–`h4`).
- **Satoshi** — body copy, paragraphs, bio text (the default on `body`).
- **JetBrains Mono** — anything that reads as data or UI chrome, not prose: nav links, the theme toggle's neighbors, the contact chips, post dates/meta pills, inline `code` and `pre` blocks.

## Adding a new font weight

Fonts are self-hosted for the same reasons as before: same-origin, no third-party CDN dependency, reproducible CI builds.

1. Download the `.woff2` (Google Fonts for Geist/JetBrains Mono, Fontshare's CSS API for Satoshi — the *latin*-only subset already covers Spanish accents and `ñ`/`ü`).
2. Save it to `src/assets/fonts/` with a `family-weight.woff2` name matching the existing files.
3. Add a `@font-face` block at the top of `style.css`. **Use a relative path** (`url("../fonts/whatever.woff2")`), never a root-relative one — this is a GitHub Pages *project* page under a `pathPrefix`, and only relative paths inside CSS survive that unchanged.
4. Only add `rel="preload"` in `base.njk` for a weight genuinely used above the fold on first paint — see `accessibility-and-perf` for the budget.

## Cache-busting

`style.css` and `tokens.css` (and the JS files) are linked through the `cacheBust` Nunjucks filter (`eleventy.config.js`), which appends `?v=<content hash>`. If you edit any of them, the hash changes automatically — you don't need to do anything, but don't strip the filter off a `href`/`src` when editing `base.njk`.
