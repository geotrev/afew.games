import propTypes from "prop-types"
import { forwardRef, Ref } from "react"
import { Essay } from "@/src/app/types"
import { EssayListItem } from "../essay-list-item"

export type EssayListProps = {
  essays: Essay[]
}

export const EssayList = forwardRef<HTMLUListElement, EssayListProps>(
  ({ essays }: EssayListProps, ref: Ref<HTMLUListElement>) => (
    <ul ref={ref} aria-label={`Essays`}>
      {essays.map((essay) => (
        <EssayListItem key={essay.slug} {...essay} />
      ))}
    </ul>
  )
)

EssayList.displayName = "EssayList"

EssayList.propTypes = {
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
