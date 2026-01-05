import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import { GlobalConfiguration } from "../cfg"
import { classNames } from "../util/lang"

interface Options {
  limit?: number
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  filter: (f) => f.slug !== "index",
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const ArticleCards: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)

    // Get primary tag (first tag, without hierarchy prefix)
    const getPrimaryTag = (tags: string[] | undefined): string => {
      if (!tags || tags.length === 0) return ""
      const tag = tags[0]
      // Remove hierarchy prefix (e.g., "ai-systems/knowledge-graphs" -> "Knowledge Graphs")
      const parts = tag.split("/")
      const lastPart = parts[parts.length - 1]
      return lastPart.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    }

    // Truncate summary
    const truncateSummary = (summary: string | undefined, maxLength: number = 120): string => {
      if (!summary) return ""
      const clean = summary.replace(/\n/g, " ").trim()
      if (clean.length <= maxLength) return clean
      return clean.slice(0, maxLength).trim() + "..."
    }

    return (
      <div class={classNames(displayClass, "article-cards")}>
        <div class="cards-grid">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? "Untitled"
            const tags = page.frontmatter?.tags ?? []
            const summary = page.frontmatter?.summary ?? page.description ?? ""
            const primaryTag = getPrimaryTag(tags)

            return (
              <a
                href={resolveRelative(fileData.slug!, page.slug!)}
                class="card-link internal"
              >
                <article class="article-card">
                  {primaryTag && (
                    <span class="card-tag">{primaryTag}</span>
                  )}
                  <h3 class="card-title">{title}</h3>
                  <p class="card-summary">{truncateSummary(summary)}</p>
                </article>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  ArticleCards.css = `
.article-cards {
  width: 100% !important;
  display: block !important;
  box-sizing: border-box !important;
}

.cards-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  grid-auto-rows: auto !important;
  gap: 1.5rem !important;
  align-items: start !important;
}

@media (max-width: 1200px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 800px) {
  .cards-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .article-card {
    padding: 1rem;
    min-height: auto;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-summary {
    font-size: 0.8125rem;
  }
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-card {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1.25rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 180px;
  box-sizing: border-box;
}

.article-card:hover {
  border-color: var(--secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-tag {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: var(--dark);
}

.card-summary {
  font-size: 0.875rem;
  color: var(--gray);
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

[data-theme="dark"] .article-card {
  background: var(--darkgray);
}

[data-theme="dark"] .article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
`
  return ArticleCards
}) satisfies QuartzComponentConstructor
