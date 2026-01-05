import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
@font-face {
  font-family: 'Comico';
  src: url('./static/fonts/Comico-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: 'Comico', var(--headerFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
