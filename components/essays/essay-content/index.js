import xss from "xss"
import styles from "./styles.module.scss"
import { EssayFooter } from "components/essays/essay-footer"
import { EssayHeader } from "../essay-header"

export function EssayContent({ title, description, date, content }) {
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
