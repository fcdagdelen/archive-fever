import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"
import { classNames } from "../util/lang"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
  removeTags: string[]
  showTags: boolean
  focusOnHover?: boolean
  enableRadial?: boolean
}

const defaultConfig: D3Config = {
  drag: true,
  zoom: true,
  depth: -1,
  scale: 0.9,
  repelForce: 0.5,
  centerForce: 0.3,
  linkDistance: 30,
  fontSize: 0.6,
  opacityScale: 1,
  showTags: true,
  removeTags: [],
  focusOnHover: true,
  enableRadial: true,
}

export default ((opts?: Partial<D3Config>) => {
  const HomeGraph: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const config = { ...defaultConfig, ...opts }
    return (
      <div class={classNames(displayClass, "home-graph")}>
        <div class="home-graph-container">
          <div class="global-graph-outer">
            <div class="global-graph-container" data-cfg={JSON.stringify(config)}></div>
          </div>
        </div>
      </div>
    )
  }

  HomeGraph.css = `
.home-graph {
  width: 100%;
  display: none;
}

.home-graph-container {
  width: 100%;
  height: 600px;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  overflow: hidden;
}

.home-graph .global-graph-outer {
  width: 100%;
  height: 100%;
}

.home-graph .global-graph-container {
  width: 100%;
  height: 100%;
}

@media (max-width: 800px) {
  .home-graph-container {
    height: 400px;
  }
}
` + style

  HomeGraph.afterDOMLoaded = script

  return HomeGraph
}) satisfies QuartzComponentConstructor
