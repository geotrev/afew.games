import { ReactElement } from "react"
import propTypes from "prop-types"
import xss from "xss"
import { EssayFooter } from "components/essays/essay-footer"
import { EssayHeader } from "../essay-header"
import { EssayContentProps } from "./types"
import styles from "./styles.module.scss"

EssayContent.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
}

export function EssayContent({
  title,
  description,
  date,
  content,
}: EssayContentProps): ReactElement {
  return (
    <article>
      <EssayHeader title={title} description={description} date={date} />
      <div className={styles.essayContent}>
        <div
          className={styles.essayBody}
          dangerouslySetInnerHTML={{ __html: xss(content) }}
        />
        <hr />
      </div>
      <EssayFooter />
    </article>
  )
}
