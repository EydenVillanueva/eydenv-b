---
name: taste-skill
description: A self-critique pass for this specific site's aesthetic before calling a design change done. Complements frontend-design's general "restraint and self-critique" advice with concrete, project-specific checks. Use after implementing a visual change and before reporting it as finished.
---

# Taste check (eydenv-b)

`frontend-design` tells you how to make deliberate choices. This skill is the narrower check that runs *after*: does this specific change actually fit the site that already exists? Run it before telling the user a design change is done.

## Does it use what's already there?

- Every color traces back to a token in [style.css](../../../src/assets/css/style.css) (`--bg`, `--fg`, `--muted`, `--accent`, `--border`, `--code-bg`). A new hex value is a signal to stop and reconsider, not to add a ninth token unless there's a real reason.
- Every typeface is one of the three already loaded (Geist / Satoshi / JetBrains Mono), used per the role rule in `design-tokens-css`. A fourth font, or an established font used outside its role (Geist in a paragraph, Satoshi in a code sample), doesn't belong here.
- Spacing comes from the `--space-*` scale, not an arbitrary `margin: 18px`.

## Does it match the established feel?

The site's established direction is quiet and editorial: generous whitespace, hairline 1px borders, no shadows, no gradients, no border-radius beyond the pill-shaped contact chips and small `code`/date badges. Before adding anything, ask whether it reinforces that or fights it:

- A drop shadow, a gradient background, or a heavy rounded card breaks the current feel — don't introduce one without first asking whether the direction itself should change (that's a conversation with the user, not a unilateral call).
- Uppercase + letter-spacing + mono font is the site's existing vocabulary for "this is a label, not prose" (nav links, contact chips, dates). Reuse that vocabulary for new labels instead of inventing a second way to signal the same thing.

## The one-thing-removed test

Before reporting a change as finished, look at it and ask what could be cut and have it still work — an extra border, a redundant label, a decorative element that isn't load-bearing. If there's a clear answer, cut it first. This mirrors `frontend-design`'s Chanel line, applied concretely: err toward the version of this site with fewer elements, not more.

## AI-slop patterns to specifically avoid here

Per `frontend-design`'s calibration notes, watch for these landing anyway:

- Cream background + high-contrast serif + terracotta accent.
- Near-black background + a single neon/acid accent color.
- A hero with a big gradient blob or mesh background.
- Numbered markers (01 / 02 / 03) on content that isn't actually an ordered sequence.
- Icon-per-feature grids where the icons don't correspond to anything concrete about this specific person or blog.

## Before calling it done

Take a screenshot (or read the accessibility tree) of the affected page in both light and dark color scheme, and at mobile width, not just the default desktop/light view. A change that only got checked once is not verified.
