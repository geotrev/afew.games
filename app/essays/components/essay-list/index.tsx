import propTypes from "prop-types"
import { forwardRef, Ref } from "react"
import { EssayListItem } from "../essay-list-item"
import { StyledEssayList } from "./styled"
import { EssayPageData } from "types/essays"

const EssayListComponent = (
  { index, essays }: EssayPageData,
  ref: Ref<HTMLUListElement>
) => {
  return (
    <StyledEssayList ref={ref} aria-label={`Essays, page ${index + 1}`}>
      {essays.map((essay) => (
        <EssayListItem key={essay.slug} {...essay} />
      ))}
    </StyledEssayList>
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
