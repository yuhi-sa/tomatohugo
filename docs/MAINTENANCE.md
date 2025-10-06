# TomatoHugo Maintenance Guide

## Version Control & Release Management

### Commit Message Standards

Follow the conventional commit format for clear release notes:

```
type(scope): description

Examples:
feat(navigation): add responsive mobile menu
fix(pagination): resolve page number display issue
docs(readme): update installation instructions
refactor(css): consolidate design variables
style(templates): improve code formatting
test(accessibility): add keyboard navigation tests
chore(deps): update Hugo version requirement
```

### Release Process

#### 1. Pre-Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Performance targets met
- [ ] Accessibility compliance verified
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness tested

## Theme Architecture & Frontend Development

This theme has been refactored to follow a modern, component-based architecture. The goal is to improve maintainability, scalability, and developer experience.

### SCSS Structure

All theme styles are written in SCSS and located in the `assets/scss/` directory. The structure is organized as follows:

- **`main.scss`**: The main entry point. It imports all other SCSS partials in the correct order. **Do not write styles directly in this file.**
- **`_variables.scss`**: Contains all CSS Custom Properties (variables) for colors, typography, spacing, etc. This is the single source of truth for design tokens, aligned with `docs/DESIGN_SYSTEM.md`.
- **`_syntax.scss`**: Styles for code syntax highlighting.
- **`base/`**: Global styles. Includes resets, base typography for `<body>`, etc.
- **`components/`**: Styles for individual, reusable UI components (e.g., `_article-card.scss`, `_pagination.scss`). Each component has its own file.
- **`layout/`**: Styles for major layout sections of the site, such as the header (`_header.scss`) and article layout (`_article.scss`).
- **`vendors/`**: Styles that override third-party libraries (e.g., `_bootstrap.scss`).

### BEM Naming Convention

Component styles use the **Block, Element, Modifier (BEM)** naming convention to ensure styles are scoped, specific, and self-documenting.

- **Block**: The top-level component (e.g., `.article-card`).
- **Element**: A part of the block (e.g., `.article-card__title`).
- **Modifier**: A variation of the block (e.g., `.article-card--featured`).

For detailed component design guidelines, refer to `docs/DESIGN_SYSTEM.md`.

### Dark Mode Implementation

The dark mode is implemented purely with CSS, providing a clean separation of concerns.

- **Trigger**: The `assets/js/dark-mode.js` script is responsible **only** for toggling the `data-theme="dark"` attribute on the `<html>` element. It listens for user clicks and system theme preferences.
- **Styling**: All dark mode color changes are handled in `assets/scss/_variables.scss` within the `[data-theme="dark"]` selector. It overrides the default light-theme CSS variables.

**To modify theme colors, edit `_variables.scss`. Do not add theme-switching logic to JavaScript.**

### Adding or Modifying Styles

1.  **Identify the Scope**: Is it a new component, a change to an existing layout, or a global style?
2.  **Create/Find the File**:
    - For a new component, create a new file in `assets/scss/components/` (e.g., `_my-component.scss`).
    - For an existing component, open its corresponding file.
3.  **Write the SCSS**: Use BEM and the variables defined in `_variables.scss`.
4.  **Import the File**: If you created a new file, import it into `main.scss` in the appropriate section.
5.  **Update HTML**: Apply the new BEM classes to your Hugo templates in the `layouts/` directory.

#### 2. Version Numbering
Follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

#### 3. Release Notes Template
```markdown
## [Version] - YYYY-MM-DD

### Added
- New features and enhancements

### Changed
- Updates to existing functionality

### Fixed
- Bug fixes and corrections

### Removed
- Deprecated features removed

### Security
- Security-related changes
```

## Testing Procedures

### Manual Testing Checklist

#### Functionality Testing
- [ ] Homepage loads correctly
- [ ] Article pages display properly
- [ ] Navigation works on all pages
- [ ] Search functionality (if implemented)
- [ ] Tag and category pages
- [ ] Pagination controls
- [ ] Dark mode toggle
- [ ] Form submissions (if any)

#### Responsive Testing
Test on multiple screen sizes:
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1400px+)

#### Browser Testing
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

#### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast ratios meet WCAG standards
- [ ] Focus indicators visible
- [ ] Alt text for images
- [ ] Form labels properly associated

#### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Page load time < 2 seconds
- [ ] Core Web Vitals pass
- [ ] CSS bundle size < 50KB
- [ ] JavaScript bundle size < 30KB
- [ ] Images optimized

### Automated Testing

#### Hugo Build Test
```bash
# Test Hugo build
hugo --gc --minify --cleanDestinationDir

# Test with different Hugo versions
hugo version
hugo --gc --minify
```

#### Performance Testing
```bash
# Using Lighthouse CLI
npm install -g @lhci/cli
lhci autorun

# Or use online tools
# - PageSpeed Insights
# - GTmetrix
# - WebPageTest
```

## Deployment Guidelines

### Production Deployment

#### Environment Configuration
```yaml
# config.yaml (production)
baseURL: "https://yourdomain.com"
languageCode: "en-us"
title: "Your Site Title"

params:
  environment: "production"
  googleAnalyticsID: "G-XXXXXXXXXX"
  googleAdClientID: "ca-pub-XXXXXXXXXXXXXXXX"

markup:
  goldmark:
    renderer:
      unsafe: true
  highlight:
    style: "github"
    lineNos: true
```

#### Build Commands
```bash
# Production build
hugo --gc --minify --cleanDestinationDir

# Build with specific environment
hugo --environment production --gc --minify

# Build and deploy (example with Netlify)
hugo --gc --minify && netlify deploy --prod --dir public
```

### Staging Environment

#### Pre-deployment Testing
1. Deploy to staging environment
2. Run full test suite
3. Verify all functionality
4. Check analytics integration
5. Test contact forms
6. Validate SEO meta tags

#### Deployment Checklist
- [ ] Backup current version
- [ ] Update dependencies
- [ ] Run build process
- [ ] Test critical paths
- [ ] Monitor for errors
- [ ] Verify analytics tracking

## Monitoring & Maintenance

### Performance Monitoring

#### Key Metrics to Track
- **Core Web Vitals**
  - Largest Contentful Paint (LCP) < 2.5s
  - First Input Delay (FID) < 100ms
  - Cumulative Layout Shift (CLS) < 0.1

- **Loading Performance**
  - First Contentful Paint < 1.5s
  - Time to Interactive < 3s
  - Total Blocking Time < 300ms

- **Resource Sizes**
  - CSS bundle size
  - JavaScript bundle size
  - Image optimization ratios
  - Total page weight

#### Monitoring Tools
- **Google Analytics**: User behavior and performance
- **Search Console**: SEO performance and errors
- **PageSpeed Insights**: Performance analysis
- **Uptime monitoring**: Site availability

### Security Maintenance

#### Regular Security Tasks
- [ ] Update Hugo to latest version
- [ ] Review and update dependencies
- [ ] Check for security advisories
- [ ] Validate SSL certificate
- [ ] Review analytics configuration
- [ ] Check for broken links

#### Content Security
- [ ] Validate user-generated content
- [ ] Check external link safety
- [ ] Verify image sources
- [ ] Review comment systems (if any)

### SEO Maintenance

#### Monthly SEO Checks
- [ ] Verify structured data markup
- [ ] Check meta descriptions and titles
- [ ] Review sitemap generation
- [ ] Validate canonical URLs
- [ ] Check internal link structure
- [ ] Monitor page load speeds
- [ ] Review mobile usability

#### Search Console Monitoring
- [ ] Check for crawl errors
- [ ] Monitor search performance
- [ ] Review mobile usability issues
- [ ] Check structured data errors
- [ ] Monitor Core Web Vitals

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear Hugo cache
hugo mod clean

# Verbose build output
hugo --verbose --debug

# Check Hugo version compatibility
hugo version
```

#### Performance Issues
1. **Large CSS bundles**: Review and remove unused styles
2. **Slow page loads**: Optimize images and enable caching
3. **Layout shifts**: Set explicit dimensions for images
4. **JavaScript errors**: Check browser console for errors

#### Accessibility Issues
1. **Color contrast**: Use tools like WebAIM's contrast checker
2. **Keyboard navigation**: Test tab order and focus indicators
3. **Screen reader compatibility**: Test with screen reader software
4. **Form accessibility**: Ensure proper labeling and error handling

### Debug Mode

#### Enable Hugo Debug Mode
```bash
# Run Hugo with debug information
hugo server --debug --verbose

# Enable template debugging
hugo server --templateMetrics --templateMetricsHints
```

#### Template Debugging
```html
{{/* Debug template variables */}}
{{ printf "%#v" . }}

{{/* Debug specific values */}}
{{ printf "Title: %s" .Title }}
{{ printf "Type: %s" .Type }}
{{ printf "Section: %s" .Section }}
```

## Backup & Recovery

### Content Backup
- **Source files**: Version controlled in Git
- **Generated site**: Regular snapshots of public directory
- **Configuration**: Backup config files and environment variables
- **Media assets**: Backup images and other media files

### Recovery Procedures
1. **Source recovery**: Restore from Git repository
2. **Content recovery**: Restore from content backup
3. **Configuration recovery**: Restore environment variables
4. **Full site recovery**: Rebuild from source

### Backup Schedule
- **Daily**: Automated Git commits
- **Weekly**: Full site backup
- **Monthly**: Archive old backups
- **Before major updates**: Complete system backup

---

*This maintenance guide should be reviewed and updated quarterly to ensure accuracy and completeness.*
