import propTypes from "prop-types"
import { forwardRef, Ref } from "react"
import { EssayPageData } from "types/essays"
import { EssayListItem } from "../essay-list-item"

const EssayListComponent = (
  { index, essays }: EssayPageData,
  ref: Ref<HTMLUListElement>
) => {
  return (
    <ul ref={ref} aria-label={`Essays, page ${index + 1}`}>
      {essays.map((essay) => (
        <EssayListItem key={essay.slug} {...essay} />
      ))}
    </ul>
  )
}

export const EssayList = forwardRef<HTMLUListElement, EssayPageData>(
  EssayListComponent
)

EssayList.propTypes = {
  index: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
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
