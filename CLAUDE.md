# MoneyStopwatch — Project Guidelines

## Advertising
- Do **not** add ad placeholder divs (`<div class="ad-slot">`, `<!-- ad -->`, "Advertisement" text, etc.) to any page.
- Do not add AdSense `<ins>` tags or any ad unit markup unless explicitly instructed for a specific deployment.

## Stack
- Static HTML site, no build step, no framework.
- Shared nav/footer injected via `js/components.js` (IIFE).
- CSS custom properties in `css/style.css`.
- Pages in subdirectories (`/paycheck-calculator/`, `/feed/`) use `../` prefix for assets — handled by `resolveHref()` in `components.js`.

## Patterns
- New pages in a subdirectory: link CSS as `../css/style.css`, JS as `../js/components.js`.
- Add `<div id="site-header-slot"></div>` and `<div id="site-footer-slot"></div>` to every page.
- Include Google Analytics tag (`G-RT5SXH6N7D`) in every page `<head>`.
- Add new pages to `sitemap.xml` with current `<lastmod>` date.
