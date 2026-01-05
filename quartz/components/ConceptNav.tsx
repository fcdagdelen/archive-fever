import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Concept definitions with display names and tag paths
const CONCEPTS = [
  { name: "Knowledge Graphs", tag: "ai-systems/knowledge-graphs" },
  { name: "Memory Systems", tag: "ai-systems/memory-systems" },
  { name: "Small Models", tag: "ai-systems/small-models" },
  { name: "Cognitive Architecture", tag: "ai-systems/cognitive-architecture" },
  { name: "Psyche Interfaces", tag: "human-ai-interaction/psyche-interfaces" },
  { name: "AI Experience Design", tag: "human-ai-interaction/ai-experience-design" },
  { name: "Bidirectional Context", tag: "human-ai-interaction/bidirectional-context" },
  { name: "Neuroscience", tag: "applied/neuroscience" },
  { name: "AI-Native Development", tag: "applied/ai-native-development" },
  { name: "Therapeutics", tag: "applied/therapeutics" },
]

export default (() => {
  const ConceptNav: QuartzComponent = ({
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    // Build a map of tag -> article count
    const tagCounts = new Map<string, number>()

    for (const file of allFiles) {
      const tags = file.frontmatter?.tags ?? []
      for (const tag of tags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
      }
    }

    // Sort concepts by article count (descending)
    const sortedConcepts = [...CONCEPTS].sort((a, b) => {
      const countA = tagCounts.get(a.tag) ?? 0
      const countB = tagCounts.get(b.tag) ?? 0
      return countB - countA
    })

    return (
      <nav class={classNames(displayClass, "concept-nav")}>
        <h3 class="concept-nav-title">Concepts</h3>
        <ul class="concept-list">
          {sortedConcepts.map((concept) => {
            const count = tagCounts.get(concept.tag) ?? 0

            return (
              <li class="concept-item">
                <a href={`./tags/${concept.tag}`} class="concept-link">
                  <span class="concept-name">{concept.name}</span>
                  {count > 0 && <span class="concept-count">{count}</span>}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  ConceptNav.css = `
.concept-nav {
  margin-top: 1rem;
}

.concept-nav-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  margin: 0 0 0.5rem 0;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid var(--lightgray);
}

.concept-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.concept-item {
  position: relative;
  margin: 0 !important;
  padding: 0 !important;
}

.concept-item::before {
  display: none !important;
}

.concept-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.concept-link:hover {
  background-color: var(--lightgray);
}

.concept-name {
  font-size: 0.8125rem;
  color: var(--dark);
  flex-grow: 1;
}

.concept-count {
  font-size: 0.6875rem;
  color: var(--gray);
  background: var(--lightgray);
  padding: 0.0625rem 0.375rem;
  border-radius: 8px;
  min-width: 1.25rem;
  text-align: center;
}

/* Dark mode */
[data-theme="dark"] .concept-link:hover {
  background-color: var(--darkgray);
}

[data-theme="dark"] .concept-count {
  background: var(--darkgray);
}
`

  return ConceptNav
}) satisfies QuartzComponentConstructor
