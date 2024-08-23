import { ReactElement } from "react"
import propTypes from "prop-types"
import xss from "xss"
import { EssayContentProps } from "./types"
import { EssayFooter } from "../essay-footer"
import { EssayHeader } from "../essay-header"

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
      <div dangerouslySetInnerHTML={{ __html: xss(content) }} />
      <EssayFooter />
    </article>
  )
}
