# Background color consistency fix (pending full CSS)

## Current blocker
- `assets/css/style.css` is not fully readable via the available tool (only ~30 lines are returned). The background rules for sections/wrappers are presumably further down, so edits cannot be applied safely.

## Reference color
- Site/base background reference: `#070B1A` (from `assets/css/variables.css` as `--bg`).

## Intended fix strategy (once full CSS is readable)
1. Find the existing background on the Skills section/container (the “correct” flat dark grey).
2. Locate mismatched backgrounds (especially Services): look for section-level `background`, `background-image`, `linear-gradient`, `radial-gradient`, grid overlays, or wrapper elements affecting the section.
3. Remove/override only the background/pattern layers causing mismatch.
4. Ensure every section and its wrapping/parent containers use exactly `background-color: #070B1A` with no gradients/images/patterns.
5. Verify visually by scrolling through the entire page.

