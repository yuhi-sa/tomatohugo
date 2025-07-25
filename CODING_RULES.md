# TomatoHugo Coding Rules & Design Guidelines

## Hugo Template Coding Standards

### 1. File Organization & Structure

```
layouts/
├── _default/          # Default page layouts
├── partials/          # Reusable template components
│   ├── head/         # HTML head elements
│   ├── ads/          # Advertisement components
│   └── inline/       # Inline template utilities
└── [content-type]/   # Content-specific layouts
```

### 2. Template Naming Conventions

- **Files**: kebab-case (e.g., `article-card.html`, `meta-tags.html`)
- **Partials**: descriptive-names (e.g., `breadcrumbs.html`, `social-sharing.html`)
- **Variables**: camelCase in templates (e.g., `$pageTitle`, `$articleMeta`)
- **CSS Classes**: BEM methodology (e.g., `article-card__title`, `nav-menu--mobile`)

### 3. Template Documentation

All templates must include header comments:

```html
{{/*
  Component Name
  
  Brief description of purpose and functionality
  
  @context {Type} variable Description of context variables
  @param {Type} name Description of parameters (if any)
  @returns {string} Description of output
  @example {{ partial "component.html" . }}
*/}}
```

### 4. Code Structure & Formatting

#### Indentation
- **2 spaces** for all indentation
- **No tabs** - use spaces consistently
- **Align closing tags** with opening tags

#### Template Logic
```html
{{/* Good: Clear structure with proper spacing */}}
{{- if .Params.featured }}
  <div class="featured-content">
    {{ .Content }}
  </div>
{{- else }}
  <div class="regular-content">
    {{ .Summary }}
  </div>
{{- end }}

{{/* Bad: Poor formatting */}}
{{if .Params.featured}}<div class="featured-content">{{.Content}}</div>{{else}}<div class="regular-content">{{.Summary}}</div>{{end}}
```

#### Variable Naming
```html
{{/* Good: Descriptive variable names */}}
{{- $articleTitle := .Title }}
{{- $publishDate := .Date }}
{{- $authorName := .Params.author | default .Site.Params.author }}

{{/* Bad: Unclear abbreviations */}}
{{- $t := .Title }}
{{- $d := .Date }}
{{- $a := .Params.author }}
```

### 5. Error Handling & Validation

#### Safe Data Access
```html
{{/* Good: Safe access with defaults */}}
{{ with .Params.description }}
  <meta name="description" content="{{ . }}">
{{ else }}
  <meta name="description" content="{{ .Site.Params.description }}">
{{ end }}

{{/* Good: Using default function */}}
<meta name="author" content="{{ .Params.author | default .Site.Params.author }}">
```

#### Content Validation
```html
{{/* Good: Check for content existence */}}
{{ if .Content }}
  <div class="article-content">
    {{ .Content }}
  </div>
{{ end }}

{{/* Good: Check for non-empty values */}}
{{ with .Title }}
  <h1>{{ . }}</h1>
{{ end }}
```

### 6. Performance Best Practices

#### Partial Caching
```html
{{/* Cache static partials */}}
{{ partialCached "head/css.html" . }}
{{ partialCached "head/js.html" . }}

{{/* Don't cache dynamic content */}}
{{ partial "article-meta.html" . }}
```

#### Resource Optimization
```html
{{/* Good: Minify resources in production */}}
{{ $css := resources.Get "css/main.css" }}
{{ if eq hugo.Environment "production" }}
  {{ $css = $css | minify | fingerprint }}
{{ end }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

### 7. Accessibility Standards

#### ARIA Labels & Roles
```html
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
  </ul>
</nav>
```

#### Semantic HTML
```html
{{/* Good: Semantic structure */}}
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">{{ .Title }}</h1>
    <time datetime="{{ .Date.Format "2006-01-02" }}" itemprop="datePublished">
      {{ .Date.Format "January 2, 2006" }}
    </time>
  </header>
  <div itemprop="articleBody">
    {{ .Content }}
  </div>
</article>
```

### 8. SEO & Structured Data

#### Schema.org Implementation
```html
{{/* Article structured data */}}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ .Title }}",
  "datePublished": "{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}",
  "author": {
    "@type": "Person",
    "name": "{{ .Params.author | default .Site.Params.author }}"
  }
}
</script>
```

## CSS Design System Rules

### 1. Architecture & Organization

#### CSS Custom Properties (CSS Variables)
```css
:root {
  /* Color System */
  --bg-primary: #ffffff;
  --text-primary: #000000;
  
  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --text-base: 1rem;
  
  /* Spacing */
  --space-4: 1rem;
}
```

#### File Structure
```
assets/css/
├── variables.css      # Design tokens & CSS custom properties
├── main.css          # Core styles & components
└── syntax.css        # Code highlighting styles
```

### 2. Naming Conventions

#### BEM Methodology
```css
/* Block */
.article-card { }

/* Element */
.article-card__title { }
.article-card__meta { }

/* Modifier */
.article-card--featured { }
.article-card--small { }
```

### 3. Design Tokens

#### Color System
- **Primary**: White (#ffffff) / Black (#000000)
- **Secondary**: Grays for hierarchy
- **Text**: High contrast ratios (4.5:1 minimum)

#### Typography Scale
- **Base**: 1rem (16px)
- **Scale**: 1.125 (Major Second)
- **Weights**: 400 (normal), 600 (semibold), 700 (bold)

#### Spacing Scale
- **Base**: 0.25rem (4px)
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px

### 4. Responsive Design

#### Mobile-First Approach
```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop up */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
}
```

### 5. Component Guidelines

#### Reusable Components
```css
/* Card component */
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.card__title {
  margin: 0 0 var(--space-3) 0;
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
}
```

## Maintenance Guidelines

### 1. Code Review Checklist

- [ ] Template documentation present
- [ ] Proper error handling implemented
- [ ] Accessibility attributes added
- [ ] Schema.org structured data included
- [ ] CSS follows BEM naming
- [ ] Responsive design tested
- [ ] Performance optimizations applied

### 2. Testing Requirements

- [ ] Mobile responsive (320px+)
- [ ] Dark mode compatibility
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Page speed (Lighthouse score 90+)

### 3. Version Control

#### Commit Message Format
```
type(scope): description

feat(breadcrumbs): add structured data and accessibility improvements
fix(pagination): resolve mobile layout issue
docs(readme): update installation instructions
refactor(css): consolidate color variables
```

### 4. Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **CSS Bundle Size**: < 50KB
- **JavaScript Bundle Size**: < 30KB

---

*Last updated: {{ now.Format "2006-01-02" }}*
