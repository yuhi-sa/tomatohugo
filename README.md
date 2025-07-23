![GitHub last commit](https://img.shields.io/github/last-commit/yuhi-sa/tomatohugo)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/yuhi-sa/tomatohugo)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/yuhi-sa/tomatohugo)
![GitHub top language](https://img.shields.io/github/languages/top/yuhi-sa/tomatohugo)
![GitHub language count](https://img.shields.io/github/languages/count/yuhi-sa/tomatohugo)
# tomatohugo

## Features
This is a simple design Hugo theme created using Bootstrap.

## Configuration
```config.toml
# Google Analytics and Adsence Configuration
[params]
  googleAnalyticsID = "G-LN6QP6VVM3"
  googleAdClientID = "ca-pub-9558545098866170"

# Set your Google Analytics Measurement ID to enable tracking on your website.
# Set your Google Ad Client ID to enable Google Adsense on your website.

# Navigation Menu Configuration
[[menu.main]]
  name = "Home"
  url = "/"
  weight = 10

[[menu.main]]
  name = "Posts"
  url = "/posts/"
  weight = 20

[[menu.main]]
  name = "About"
  url = "/about/"
  weight = 30

# Add navigation menu items. If no menu is configured, fallback links will be displayed.

# Robots.txt Configuration
enableRobotsTXT = true

# Enable or disable the robots.txt file. If set to true, Hugo will generate a robots.txt file based on your content.

# Code Highlighting Configuration
pygmentsStyle = "trac"
pygmentsUseClasses = true
pygmentsCodeFences = true
pygmentsCodefencesGuessSyntax = true

# Configure code highlighting settings using Pygments.
# - pygmentsStyle: Choose a Pygments style for code highlighting.
# - pygmentsUseClasses: Enable or disable the use of classes for styling code.
# - pygmentsCodeFences: Enable or disable code highlighting within code fences.
# - pygmentsCodefencesGuessSyntax: Enable or disable automatic syntax guessing for code fences.

# Pagination Configuration
paginate = 5

# Set the number of items to display per page in pagination.
```
- [sample setting](https://github.com/yuhi-sa/blog.com/blob/main/config.toml)

## Image
![sampleImage1](./data/sample1.png)
![sampleImage2](./data/sample2.png)
![sampleImage3](./data/sample3.png)
