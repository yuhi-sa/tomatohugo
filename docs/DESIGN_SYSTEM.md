# TomatoHugo Design System

## Design Philosophy

TomatoHugo follows a **minimal black & white design philosophy** focused on:

- **Content First**: Clean typography and readability
- **Simplicity**: No unnecessary visual elements
- **Accessibility**: High contrast and clear navigation
- **Performance**: Lightweight and fast loading

## Color System

### Core Color Palette

```css
/* Light Theme (Default) */
:root {
  --bg-primary: #ffffff; /* Pure white background */
  --bg-secondary: #f8f8f8; /* Light gray for cards/sections */
  --text-primary: #000000; /* Pure black for headings */
  --text-secondary: #333333; /* Dark gray for body text */
  --text-muted: #666666; /* Medium gray for meta text */
  --border-light: #e0e0e0; /* Light borders */
  --border-medium: #cccccc; /* Medium borders */
}

/* Dark Theme */
[data-theme="dark"] {
  --bg-primary: #000000; /* Pure black background */
  --bg-secondary: #1a1a1a; /* Dark gray for cards */
  --text-primary: #ffffff; /* Pure white for headings */
  --text-secondary: #cccccc; /* Light gray for body text */
  --text-muted: #888888; /* Medium gray for meta text */
  --border-light: #333333; /* Dark borders */
  --border-medium: #444444; /* Medium dark borders */
}
```

### Color Usage Guidelines

#### Primary Colors

- **White/Black**: Main backgrounds and primary text
- **High Contrast**: Minimum 4.5:1 ratio for accessibility
- **No Gradients**: Simple, flat design approach

#### Secondary Colors

- **Grays**: Create visual hierarchy without color
- **Borders**: Subtle separation between elements
- **Meta Text**: Less important information in muted tones

## Typography System

### Font Families

```css
--font-family-sans:
  -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
--font-family-mono: "SF Mono", Monaco, "Consolas", monospace;
```

### Font Scale

Based on 1rem (16px) with 1.125 ratio (Major Second):

```css
--text-xs: 0.75rem; /* 12px - Small meta text */
--text-sm: 0.875rem; /* 14px - Captions, labels */
--text-base: 1rem; /* 16px - Body text */
--text-lg: 1.125rem; /* 18px - Large body text */
--text-xl: 1.25rem; /* 20px - Small headings */
--text-2xl: 1.5rem; /* 24px - Medium headings */
--text-3xl: 1.875rem; /* 30px - Large headings */
--text-4xl: 2.25rem; /* 36px - Hero headings */
```

### Font Weights

```css
--font-normal: 400; /* Body text */
--font-medium: 500; /* Emphasized text */
--font-semibold: 600; /* Headings */
--font-bold: 700; /* Strong emphasis */
```

### Line Heights

```css
--leading-tight: 1.25; /* Headings */
--leading-normal: 1.5; /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
```

### Typography Usage

#### Headings

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--text-primary);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
}

h1 {
  font-size: var(--text-4xl);
}
h2 {
  font-size: var(--text-3xl);
}
h3 {
  font-size: var(--text-2xl);
}
h4 {
  font-size: var(--text-xl);
}
```

#### Body Text

```css
p,
li {
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  margin-bottom: var(--space-4);
}
```

## Spacing System

### Spacing Scale

Based on 0.25rem (4px) increments:

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
```

### Spacing Usage Guidelines

#### Vertical Rhythm

- **Small gaps**: `var(--space-2)` for tight spacing
- **Standard gaps**: `var(--space-4)` for most elements
- **Section gaps**: `var(--space-8)` between major sections
- **Page gaps**: `var(--space-12)` for large separations

#### Horizontal Spacing

- **Inline elements**: `var(--space-2)` to `var(--space-3)`
- **Card padding**: `var(--space-6)` for comfortable reading
- **Container padding**: `var(--space-4)` on mobile, `var(--space-8)` on desktop

## Component Design

### CSS Naming Convention (BEM)

```css
/* Block */
.article-card {
}

/* Element */
.article-card__title {
}
.article-card__meta {
}
.article-card__content {
}

/* Modifier */
.article-card--featured {
}
.article-card--compact {
}
```

### Component Examples

#### Card Component

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.card__title {
  color: var(--text-primary);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
}

.card__content {
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}
```

#### Navigation Component

```css
.nav {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
}

.nav__list {
  display: flex;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  transition: color var(--transition-fast);
}

.nav__link:hover,
.nav__link--active {
  color: var(--text-primary);
}
```

## Layout System

### Container Sizes

```css
--container-sm: 640px; /* Small content */
--container-md: 768px; /* Main content */
--container-lg: 1024px; /* Wide layouts */
```

### Grid System

Simple CSS Grid approach:

```css
.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .articles-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
  }
}
```

## Visual Effects

### Border Radius

```css
--radius-sm: 0.25rem; /* Small elements */
--radius-md: 0.375rem; /* Cards, buttons */
--radius-lg: 0.5rem; /* Large components */
--radius-xl: 0.75rem; /* Hero elements */
```

### Shadows

Minimal shadows for depth:

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### Transitions

```css
--transition-fast: 150ms ease;
--transition-normal: 250ms ease;
```

## Responsive Design

### Breakpoints

```css
/* Mobile first approach */
/* Base: 0-767px (mobile) */

@media (min-width: 768px) {
  /* Tablet and up */
}

@media (min-width: 1024px) {
  /* Desktop and up */
}
```

### Responsive Typography

```css
/* Mobile */
h1 {
  font-size: var(--text-3xl);
}

/* Desktop */
@media (min-width: 768px) {
  h1 {
    font-size: var(--text-4xl);
  }
}
```

### Responsive Spacing

```css
/* Mobile */
.container {
  padding: 0 var(--space-4);
}

/* Desktop */
@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

## Dark Mode Implementation

### Theme Switching

Dark mode uses CSS custom properties for seamless switching:

```css
/* Automatic based on system preference */
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme variables */
  }
}

/* Manual toggle via data attribute */
[data-theme="dark"] {
  /* Dark theme variables */
}
```

### Dark Mode Best Practices

1. **Maintain contrast ratios** in both themes
2. **Test all components** in dark mode
3. **Use appropriate shadows** (darker in dark mode)
4. **Keep brand consistency** across themes

## Performance Guidelines

### CSS Optimization

- **Use CSS custom properties** for consistent theming
- **Minimize specificity** for better performance
- **Group related properties** together
- **Use shorthand properties** where appropriate

### File Organization

```
assets/css/
├── variables.css    # Design tokens
├── main.css        # Core styles and components
└── syntax.css      # Code highlighting
```

### Bundle Size Targets

- **CSS Bundle**: < 50KB
- **Critical CSS**: < 10KB (inlined)
- **Non-critical CSS**: Loaded asynchronously

---

_Last updated: 2025年7月25日_
