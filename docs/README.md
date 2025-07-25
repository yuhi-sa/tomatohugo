# TomatoHugo Development Guide

## Quick Start

This directory contains the comprehensive development documentation for TomatoHugo theme.

### Documentation Structure

```
docs/
├── README.md              # This file - overview and quick links
├── CODING_STANDARDS.md    # Hugo template coding guidelines
├── DESIGN_SYSTEM.md       # Design tokens and visual guidelines
└── MAINTENANCE.md         # Maintenance and deployment guide
```

## Core Principles

### Design Philosophy
- **Minimal**: Clean black & white aesthetic
- **Content-First**: Typography and readability focused
- **Accessible**: WCAG compliant with high contrast
- **Performance**: Lightweight and fast loading

### Technical Approach
- **Standards-Based**: Semantic HTML5 and modern CSS
- **Progressive Enhancement**: Works without JavaScript
- **Mobile-First**: Responsive design from the ground up
- **SEO-Optimized**: Comprehensive structured data

## Getting Started

### For Developers
1. Read [CODING_STANDARDS.md](./CODING_STANDARDS.md) for Hugo template guidelines
2. Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for styling and components
3. Follow the code review checklist before submitting changes

### For Designers
1. Understand the minimal design philosophy in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
2. Use the defined color palette and typography scale
3. Maintain accessibility standards with proper contrast ratios

### For Maintainers
1. Follow the guidelines in [MAINTENANCE.md](./MAINTENANCE.md)
2. Use the defined commit message formats
3. Test all changes across different devices and browsers

## Key Features

### Template Features
- Responsive navigation with mobile support
- Comprehensive SEO and structured data
- Accessibility features (skip links, ARIA labels, keyboard navigation)
- Performance optimizations (lazy loading, minification, caching)
- Dark mode support with system preference detection

### Content Features
- Article listings with pagination
- Tag and category taxonomy support
- Breadcrumb navigation
- Search engine optimization
- Social media integration
- Math equation support (MathJax)

### Development Features
- Component-based architecture
- Comprehensive error handling
- Multi-language support (i18n ready)
- Development vs production optimizations
- Extensive documentation and code comments

## File Organization

### Template Structure
```
layouts/
├── default/          # Core page templates
├── partials/          # Reusable components
│   ├── head/         # HTML head management
│   ├── ads/          # Advertisement integration
│   └── inline/       # Utility templates
└── [content-type]/   # Content-specific layouts
```

### Asset Structure
```
assets/
├── css/
│   ├── variables.css  # Design tokens
│   ├── main.css      # Core styles
│   └── syntax.css    # Code highlighting
└── js/
    └── dark-mode.js  # Theme switching
```

## Quality Standards

### Code Quality
- ✅ Comprehensive documentation headers
- ✅ Consistent formatting (2-space indentation)
- ✅ Descriptive variable names
- ✅ Error handling and data validation
- ✅ Performance optimization

### Design Quality
- ✅ Consistent visual hierarchy
- ✅ High contrast ratios (4.5:1 minimum)
- ✅ Responsive design across all devices
- ✅ Clean typography and spacing
- ✅ Minimal, focused interface

### Technical Quality
- ✅ Semantic HTML structure
- ✅ Accessibility compliance (WCAG 2.1)
- ✅ SEO optimization
- ✅ Performance targets met
- ✅ Cross-browser compatibility

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90
- **CSS Bundle**: < 50KB
- **JavaScript Bundle**: < 30KB

## Browser Support

### Modern Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Progressive Enhancement
- Core functionality works without JavaScript
- CSS Grid with flexbox fallbacks
- Modern font loading with system font fallbacks

## Contributing

### Before You Start
1. Read the coding standards and design system documentation
2. Understand the minimal design philosophy
3. Set up your development environment

### Development Workflow
1. Create feature branch from `main`
2. Follow coding standards and naming conventions
3. Test across different devices and browsers
4. Run accessibility checks
5. Submit pull request with proper description

### Commit Guidelines
```
type(scope): description

feat(breadcrumbs): add structured data support
fix(navigation): resolve mobile menu issue
docs(readme): update installation guide
refactor(css): simplify color variables
```

## Resources

### External Documentation
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Schema.org](https://schema.org/) for structured data
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) for accessibility
- [Web.dev](https://web.dev/) for performance optimization

### Tools and Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) for performance
- [axe DevTools](https://www.deque.com/axe/devtools/) for accessibility
- [Wave](https://wave.webaim.org/) for accessibility testing
- [PageSpeed Insights](https://pagespeed.web.dev/) for performance analysis

---

*This documentation is maintained alongside the theme development and updated with each major release.*
