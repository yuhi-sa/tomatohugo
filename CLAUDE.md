# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TomatoHugo is a minimal Hugo theme with a black & white design and warm tomato red accent. It emphasizes performance, accessibility (WCAG 2.1), and SEO (Schema.org structured data).

## Commands

### Development

```bash
# Run Hugo dev server (from the parent blog.com directory)
cd /Users/yuhi-sa/Hobby/blog.com && hugo server

# Dev server with debug/template metrics
cd /Users/yuhi-sa/Hobby/blog.com && hugo server --debug --templateMetrics --templateMetricsHints
```

### Build

```bash
# Production build
cd /Users/yuhi-sa/Hobby/blog.com && hugo --gc --minify --cleanDestinationDir
```

### Formatting

```bash
# Check formatting (what pre-commit hook runs)
npx prettier --check assets/**/*.css assets/**/*.js

# Auto-fix formatting
npx prettier --write layouts/**/*.html assets/**/*.css assets/**/*.js
```

### Troubleshooting

```bash
hugo mod clean          # Clear Hugo cache
hugo --verbose --debug  # Verbose build output
```

## Architecture

### Template Inheritance

Three parallel `baseof.html` files define the document shell (identical structure: head, skip link, header, `{{ block "main" }}`, footer, JS, Schema.org JSON-LD):

- `layouts/baseof.html` — default base
- `layouts/posts/baseof.html` — posts section base
- `layouts/pages/baseof.html` — pages section base

Content-type templates (`single.html`, `list.html`, `home.html`, `taxonomy.html`, `terms.html`) override the `"main"` block. The `posts/` and `pages/` directories each have their own full set of these templates.

### Partials

- `head.html` → includes `head/css.html` (CSS pipeline with prod minification/fingerprinting) and meta tags
- `head/js.html` → JS loading (dark-mode.js, conditional MathJax)
- `header.html` / `footer.html` — site chrome
- `menu.html` + `inline/menu/walk.html` — recursive menu walker
- `schema.html` — Schema.org structured data for articles
- `article-card.html` — reusable article listing component
- `breadcrumbs.html` — breadcrumb navigation
- `ads/` — Google AdSense placements (top_banner, sidebar, in_content)
- `google.html` — Analytics/AdSense script tags

### Asset Pipeline

CSS files in `assets/css/` are processed through Hugo Pipes:

- `variables.css` — design tokens (colors, typography, spacing) with light/dark theme via CSS custom properties
- `main.css` — component styles using BEM naming
- `syntax.css` — code highlighting

In production (`hugo.Environment == "production"`), assets are minified and fingerprinted with integrity hashes.

### Dark Mode

Controlled via `data-theme` attribute on `<html>`. `assets/js/dark-mode.js` manages the toggle with localStorage persistence and `prefers-color-scheme` system detection. All colors use CSS custom properties from `variables.css`.

### SEO / Structured Data

Every page gets WebPage JSON-LD from `baseof.html`. Article pages get additional BlogPosting/Article schema from `partials/schema.html`. Open Graph and Twitter Card meta tags are in `head.html`.

## Conventions

- **Commit messages**: conventional commits — `type(scope): description`
- **File naming**: kebab-case for all files
- **CSS classes**: BEM methodology (`block__element--modifier`)
- **Template variables**: camelCase (`$pageTitle`, `$articleMeta`)
- **Indentation**: 2 spaces, no tabs
- **Template docs**: JSDoc-style header comments with `@context`, `@param`, `@returns`
- **Performance**: use `partialCached` for static partials; only `partial` for dynamic content
- **Formatting**: Prettier enforced on CSS/JS via Lefthook pre-commit hook (HTML templates are excluded)

## Site Configuration

The theme is configured from the parent site's `config.toml`. Key params:

- `params.googleAnalyticsID` — GA4 measurement ID
- `params.googleAdClientID` — AdSense client ID
- `params.defaultTheme` — initial theme ("light" default)
- `menu.main` — navigation menu items with `name`, `url`, `weight`
