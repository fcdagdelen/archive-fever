import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const ViewToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={classNames(displayClass, "view-toggle")}>
        <button class="toggle-btn active" data-view="cards" aria-pressed="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Cards</span>
        </button>
        <button class="toggle-btn" data-view="graph" aria-pressed="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <circle cx="19" cy="5" r="2"></circle>
            <circle cx="5" cy="19" r="2"></circle>
            <circle cx="5" cy="5" r="2"></circle>
            <circle cx="19" cy="19" r="2"></circle>
            <line x1="12" y1="9" x2="12" y2="5"></line>
            <line x1="6.5" y1="6.5" x2="9.5" y2="9.5"></line>
            <line x1="6.5" y1="17.5" x2="9.5" y2="14.5"></line>
            <line x1="14.5" y1="9.5" x2="17.5" y2="6.5"></line>
            <line x1="14.5" y1="14.5" x2="17.5" y2="17.5"></line>
          </svg>
          <span>Graph</span>
        </button>
      </div>
    )
  }

  ViewToggle.css = `
.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  background: transparent;
  color: var(--gray);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  border-color: var(--secondary);
  color: var(--secondary);
}

.toggle-btn.active {
  background: var(--secondary);
  border-color: var(--secondary);
  color: white;
}

.toggle-btn svg {
  flex-shrink: 0;
}

[data-theme="dark"] .toggle-btn {
  border-color: var(--gray);
}

[data-theme="dark"] .toggle-btn.active {
  background: var(--secondary);
  border-color: var(--secondary);
}

@media (max-width: 800px) {
  .view-toggle {
    margin-bottom: 1rem;
  }

  .toggle-btn {
    flex: 1;
    justify-content: center;
    padding: 0.625rem 0.75rem;
  }
}
`

  ViewToggle.afterDOMLoaded = `
const STORAGE_KEY = 'latent-digest-view-preference';
let graphRendered = false;

function initViewToggle() {
  const toggleBtns = document.querySelectorAll('.view-toggle .toggle-btn');
  const cardsContainer = document.querySelector('.article-cards');
  const graphContainer = document.querySelector('.home-graph');

  if (!toggleBtns.length || !cardsContainer) return;

  function setView(view) {
    toggleBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-view') === view;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    if (cardsContainer) {
      cardsContainer.style.setProperty('display', view === 'cards' ? 'block' : 'none', 'important');
    }
    if (graphContainer) {
      graphContainer.style.setProperty('display', view === 'graph' ? 'block' : 'none', 'important');

      // Trigger graph rendering when switching to graph view
      if (view === 'graph' && !graphRendered) {
        const triggerBtn = graphContainer.querySelector('.home-graph-trigger');
        if (triggerBtn) {
          // Small delay to ensure container is visible before rendering
          setTimeout(() => {
            triggerBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            graphRendered = true;
          }, 100);
        }
      }
    }
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      if (view) {
        setView(view);
        localStorage.setItem(STORAGE_KEY, view);
      }
    });
  });

  // Load saved preference
  const savedView = localStorage.getItem(STORAGE_KEY) || 'cards';
  setView(savedView);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initViewToggle);
} else {
  initViewToggle();
}
document.addEventListener('nav', initViewToggle);
`

  return ViewToggle
}) satisfies QuartzComponentConstructor
