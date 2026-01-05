# Archive Fever - Digital Garden

## What

A digital garden for deep essays exploring AI systems, cognitive architectures, and human-machine interfaces.

## Why

Writing as thinking. A cultivated collection of ideas that grows and interconnects over time.

See: `~/.vibes/claude/concepts/intimacy-gradient.md`

## Stack

- **SSG**: Quartz
- **Content**: Markdown + MDX
- **Plugins**: remark/rehype for citations, math, syntax highlighting
- **Visualization**: D3, Pixi.js

## Commands

```bash
npx quartz build --serve  # Development
npx quartz build          # Production build
npx quartz sync           # Deploy
```

## Structure

```
content/
├── index.md              # Home page
├── essays/               # Long-form pieces
├── concepts/             # Atomic concept notes
├── projects/             # Project documentation
└── references/           # Citation sources

quartz/
├── components/           # Custom Quartz components
├── styles/               # Custom CSS
└── quartz.config.ts      # Configuration
```

## Content Conventions

### Frontmatter
```yaml
---
title: Essay Title
date: 2024-01-15
updated: 2024-03-20
tags: [ai, cognition, interfaces]
status: seed | growing | evergreen
---
```

### Linking
- Wiki-links: `[[other-essay]]`
- Anchors: `[[essay#section]]`
- External: `[Text](url)`

### Status Meanings
- **seed**: Initial capture, rough ideas
- **growing**: Being developed, may change significantly
- **evergreen**: Mature, stable content

## Research Themes

1. AI agent architectures
2. Knowledge graph systems
3. Computational psychology
4. Human-AI interaction
5. Financial technology
[...and more in the site]

## Workflow

1. **Capture**: Quick notes in `concepts/`
2. **Develop**: Expand into `essays/` drafts
3. **Link**: Connect to existing content
4. **Cultivate**: Revisit and update over time

## Current Focus

[Update as you work]
