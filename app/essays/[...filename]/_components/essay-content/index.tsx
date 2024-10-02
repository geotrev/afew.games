import { ReactElement } from "react"
import propTypes from "prop-types"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { EssayQuery } from "@/tina/__generated__/types"
import { EssayFooter } from "../essay-footer"
import { EssayHeader } from "../essay-header"

export function EssayContent({
  title,
  description,
  publish_date,
  body,
}: EssayQuery["essay"]): ReactElement {
  return (
    <article>
      <EssayHeader
        title={title}
        description={description}
        date={publish_date}
      />
      <div className="prose prose-zinc max-w-full lg:prose-lg">
        <TinaMarkdown content={body} />
      </div>
      <div role="separator" className="divider" />
      <EssayFooter />
    </article>
  )
}

EssayContent.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  publish_date: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
}
