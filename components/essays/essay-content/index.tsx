import xss from "xss"
import styles from "./styles.module.scss"
import { EssayFooter } from "components/essays/essay-footer"
import { EssayHeader } from "../essay-header"
import propTypes from "prop-types"
import { ReactElement } from "react"

type EssayContentProps = {
  title: string
  description: string
  date: string
  content: string
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

EssayContent.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
}
