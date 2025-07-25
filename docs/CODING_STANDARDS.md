# TomatoHugo Coding Standards

## Hugo Template Development Guidelines

### 1. File Organization & Structure

```
layouts/
├── _default/          # Default page layouts
│   ├── baseof.html   # Base template
│   ├── single.html   # Single content pages
│   ├── list.html     # List pages
│   └── terms.html    # Taxonomy term pages
├── partials/          # Reusable template components
│   ├── head/         # HTML head elements
│   │   ├── css.html  # CSS loading
│   │   └── js.html   # JavaScript loading
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

All templates must include comprehensive header comments:

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

#### Indentation Standards
- **2 spaces** for all indentation
- **No tabs** - use spaces consistently
- **Align closing tags** with opening tags
- **Consistent spacing** around operators and delimiters

#### Template Logic Formatting
```html
{{/* ✅ Good: Clear structure with proper spacing */}}
{{- if .Params.featured }}
  <div class="featured-content">
    {{ .Content }}
  </div>
{{- else }}
  <div class="regular-content">
    {{ .Summary }}
  </div>
{{- end }}

{{/* ❌ Bad: Poor formatting */}}
{{if .Params.featured}}<div class="featured-content">{{.Content}}</div>{{else}}<div class="regular-content">{{.Summary}}</div>{{end}}
```

#### Variable Naming Best Practices
```html
{{/* ✅ Good: Descriptive variable names */}}
{{- $articleTitle := .Title }}
{{- $publishDate := .Date }}
{{- $authorName := .Params.author | default .Site.Params.author }}
{{- $hasContent := .Content }}

{{/* ❌ Bad: Unclear abbreviations */}}
{{- $t := .Title }}
{{- $d := .Date }}
{{- $a := .Params.author }}
```

### 5. Error Handling & Data Validation

#### Safe Data Access Patterns
```html
{{/* ✅ Good: Safe access with defaults */}}
{{ with .Params.description }}
  <meta name="description" content="{{ . }}">
{{ else }}
  <meta name="description" content="{{ .Site.Params.description }}">
{{ end }}

{{/* ✅ Good: Using default function */}}
<meta name="author" content="{{ .Params.author | default .Site.Params.author }}">

{{/* ✅ Good: Multiple fallbacks */}}
{{- $description := .Description | default .Params.description | default .Site.Params.description }}
```

#### Content Existence Validation
```html
{{/* ✅ Good: Check for content existence */}}
{{ if .Content }}
  <div class="article-content">
    {{ .Content }}
  </div>
{{ end }}

{{/* ✅ Good: Check for non-empty values */}}
{{ with .Title }}
  <h1>{{ . }}</h1>
{{ end }}

{{/* ✅ Good: Check array length */}}
{{ if gt (len .Params.tags) 0 }}
  <div class="tags">
    {{ range .Params.tags }}
      <span class="tag">{{ . }}</span>
    {{ end }}
  </div>
{{ end }}
```

### 6. Performance Optimization

#### Partial Caching Strategy
```html
{{/* ✅ Cache static partials that don't change per page */}}
{{ partialCached "head/css.html" . }}
{{ partialCached "head/js.html" . }}

{{/* ✅ Don't cache dynamic content */}}
{{ partial "article-meta.html" . }}
{{ partial "breadcrumbs.html" . }}
```

#### Resource Optimization
```html
{{/* ✅ Good: Conditional minification and fingerprinting */}}
{{ $css := resources.Get "css/main.css" }}
{{ if eq hugo.Environment "production" }}
  {{ $css = $css | minify | fingerprint }}
{{ end }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}"
      {{- if eq hugo.Environment "production" }} 
      integrity="{{ $css.Data.Integrity }}" 
      crossorigin="anonymous"
      {{- end }}>

{{/* ✅ Good: Conditional script loading */}}
{{- if or .Params.math (in .Content "$$") }}
  <script src="/js/mathjax.js" defer></script>
{{- end }}
```

### 7. Accessibility Requirements

#### ARIA Labels & Semantic Roles
```html
{{/* ✅ Good: Proper ARIA implementation */}}
<nav role="navigation" aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/" role="menuitem" aria-current="page">Home</a>
    </li>
    <li role="none">
      <a href="/posts" role="menuitem">Posts</a>
    </li>
  </ul>
</nav>

{{/* ✅ Good: Skip links for keyboard navigation */}}
<a href="#main-content" class="skip-link sr-only sr-only-focusable">
  Skip to main content
</a>
```

#### Semantic HTML Structure
```html
{{/* ✅ Good: Semantic article structure */}}
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
  <footer>
    {{ partial "article-meta.html" . }}
  </footer>
</article>
```

### 8. SEO & Structured Data

#### Schema.org Implementation
```html
{{/* ✅ Comprehensive article structured data */}}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{{ if eq .Section "posts" }}BlogPosting{{ else }}Article{{ end }}",
  "headline": "{{ .Title }}",
  "datePublished": "{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}",
  {{- if .Lastmod }}
  "dateModified": "{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}",
  {{- end }}
  "author": {
    "@type": "Person",
    "name": "{{ .Params.author | default .Site.Params.author }}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ .Site.Title }}"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ .Permalink }}"
  }
}
</script>
```

### 9. Internationalization (i18n)

#### Multi-language Support
```html
{{/* ✅ Good: i18n implementation */}}
{{- $menuName := .Name }}
{{- with .Identifier }}
  {{- with T . }}
    {{- $menuName = . }}
  {{- end }}
{{- end }}

{{/* ✅ Good: Language-specific formatting */}}
<time datetime="{{ .Date.Format "2006-01-02" }}">
  {{- if eq .Site.Language.Lang "ja" }}
    {{ .Date.Format "2006年1月2日" }}
  {{- else }}
    {{ .Date.Format "January 2, 2006" }}
  {{- end }}
</time>
```

## Code Review Checklist

### Template Quality
- [ ] Template documentation header present
- [ ] Proper error handling implemented
- [ ] Variables use descriptive names
- [ ] Consistent 2-space indentation
- [ ] No hardcoded values (use site config)

### Accessibility & SEO
- [ ] ARIA labels and roles added where appropriate
- [ ] Semantic HTML structure used
- [ ] Schema.org structured data included
- [ ] Skip links for keyboard navigation
- [ ] Alt text for images

### Performance
- [ ] Appropriate use of `partialCached`
- [ ] Conditional resource loading
- [ ] Minification and fingerprinting in production
- [ ] No unnecessary template processing

### Best Practices
- [ ] Follows BEM naming conventions
- [ ] Responsive design implemented
- [ ] Dark mode compatibility
- [ ] Cross-browser compatibility tested

## Testing Requirements

### Functionality Testing
- [ ] Template renders without errors
- [ ] All conditional logic paths tested
- [ ] Data validation works correctly
- [ ] Fallbacks function properly

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast ratios meet WCAG standards
- [ ] Focus indicators visible

### Performance Testing
- [ ] Page load times < 2 seconds
- [ ] Lighthouse score > 90
- [ ] Mobile performance optimized
- [ ] Resource loading optimized

---

*Last updated: 2025年7月25日*
