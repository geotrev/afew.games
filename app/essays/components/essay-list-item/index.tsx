import Link from "next/link"
import { ReactElement } from "react"
import propTypes from "prop-types"
import {
  StyledEssayItem,
  StyledEssayItemHeading,
  StyledEssayItemTime,
  StyledEssayItemTimePara,
} from "./styled"
import { EssayListItemProps } from "./types"

EssayListItem.propTypes = {
  entry: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    metadata: propTypes.shape({
      urlPath: propTypes.string,
      date: propTypes.string,
    }),
  }).isRequired,
}

export function EssayListItem({ entry }: EssayListItemProps): ReactElement {
  const {
    title,
    description,
    metadata: { urlPath, date },
  } = entry
  const id = `${title.split(" ").join("-").slice(0, 16)}`

  return (
    <StyledEssayItem>
      <StyledEssayItemTimePara className="text-xs">
        <StyledEssayItemTime dateTime={date} id={id}>
          {date}
        </StyledEssayItemTime>
      </StyledEssayItemTimePara>
      <StyledEssayItemHeading aria-describedby={id}>
        <Link href={urlPath} legacyBehavior>
          {title}
        </Link>
      </StyledEssayItemHeading>
      <p>{description}</p>
    </StyledEssayItem>
  )
}
