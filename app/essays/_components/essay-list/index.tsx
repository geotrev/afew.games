import propTypes from "prop-types"
import { forwardRef, Ref } from "react"
import { EssayPageData } from "types/essays"
import { EssayListItem } from "../essay-list-item"

type EssayListProps = Omit<EssayPageData, "totalPages">

export const EssayList = forwardRef<HTMLUListElement, EssayPageData>(
  ({ index, essays }: EssayListProps, ref: Ref<HTMLUListElement>) => (
    <ul ref={ref} aria-label={`Essays, page ${index + 1}`}>
      {essays.map((essay) => (
        <EssayListItem key={essay.slug} {...essay} />
      ))}
    </ul>
  )
)

EssayList.displayName = "EssayList"

EssayList.propTypes = {
  index: propTypes.number.isRequired,
  essays: propTypes.arrayOf(
    propTypes.shape({
      date: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      slug: propTypes.string.isRequired,
      urlPath: propTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}
