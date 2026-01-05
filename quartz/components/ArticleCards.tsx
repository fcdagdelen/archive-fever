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

// Color palettes for each concept - [primary, secondary, accent]
const TAG_GRADIENTS: Record<string, [string, string, string]> = {
  "knowledge-graphs": ["#6366f1", "#8b5cf6", "#a78bfa"],      // Indigo-violet
  "memory-systems": ["#0ea5e9", "#06b6d4", "#22d3ee"],        // Sky-cyan
  "small-models": ["#f59e0b", "#f97316", "#fb923c"],          // Amber-orange
  "cognitive-architecture": ["#ec4899", "#f43f5e", "#fb7185"], // Pink-rose
  "psyche-interfaces": ["#8b5cf6", "#a855f7", "#c084fc"],     // Violet-purple
  "ai-experience-design": ["#14b8a6", "#10b981", "#34d399"],  // Teal-emerald
  "bidirectional-context": ["#3b82f6", "#6366f1", "#818cf8"], // Blue-indigo
  "neuroscience": ["#ef4444", "#f43f5e", "#fb7185"],          // Red-rose
  "ai-native-development": ["#22c55e", "#10b981", "#34d399"], // Green-emerald
  "therapeutics": ["#06b6d4", "#0ea5e9", "#38bdf8"],          // Cyan-sky
}

const DEFAULT_GRADIENT: [string, string, string] = ["#64748b", "#475569", "#334155"] // Slate

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

    // Get tag key for gradient lookup
    const getTagKey = (tags: string[] | undefined): string => {
      if (!tags || tags.length === 0) return ""
      const tag = tags[0]
      const parts = tag.split("/")
      return parts[parts.length - 1]
    }

    // Generate gradient style based on tag (pale/subtle)
    const getGradientStyle = (tags: string[] | undefined): string => {
      const tagKey = getTagKey(tags)
      const colors = TAG_GRADIENTS[tagKey] || DEFAULT_GRADIENT
      // Create a subtle gradient with low opacity (0x11 = ~7%, 0x18 = ~9%)
      return `linear-gradient(135deg, ${colors[0]}11 0%, ${colors[1]}18 50%, ${colors[2]}11 100%)`
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
            const gradientStyle = getGradientStyle(tags)
            const tagKey = getTagKey(tags)
            const accentColor = (TAG_GRADIENTS[tagKey] || DEFAULT_GRADIENT)[0]

            return (
              <a
                href={resolveRelative(fileData.slug!, page.slug!)}
                class="card-link internal"
              >
                <article class="article-card">
                  <div class="card-accent" style={`background: ${accentColor};`}></div>
                  {primaryTag && (
                    <span class="card-tag" style={`color: ${accentColor};`}>{primaryTag}</span>
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
  grid-auto-rows: 1fr !important;
  gap: 1.5rem !important;
  align-items: stretch !important;
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
  display: flex;
  height: 100%;
}

.article-card {
  position: relative;
  border: 1px solid var(--lightgray);
  border-radius: 12px;
  padding: 1.25rem;
  padding-top: 1.5rem;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 12px 12px 0 0;
}

.article-card:hover {
  border-color: transparent;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.card-tag {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: var(--dark);
}

.card-summary {
  font-size: 0.85rem;
  color: var(--darkgray);
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

[data-theme="dark"] .article-card {
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .article-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

[data-theme="dark"] .card-title {
  color: var(--light);
}

[data-theme="dark"] .card-summary {
  color: var(--lightgray);
}
`
  return ArticleCards
}) satisfies QuartzComponentConstructor
