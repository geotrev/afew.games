import Link from "next/link"
import propTypes from "prop-types"
import {
  StyledEssayItem,
  StyledEssayItemHeading,
  StyledEssayItemTime,
  StyledEssayItemTimePara,
} from "./styled"
import { Essay } from "types/essays"

export const EssayListItem = ({ title, description, urlPath, date }: Essay) => (
  <StyledEssayItem>
    <StyledEssayItemTimePara className="text-xs">
      <StyledEssayItemTime dateTime={date}>{date}</StyledEssayItemTime>
    </StyledEssayItemTimePara>
    <StyledEssayItemHeading>
      <Link href={urlPath}>{title}</Link>
    </StyledEssayItemHeading>
    <p>{description}</p>
  </StyledEssayItem>
)

EssayListItem.propTypes = {
  date: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  slug: propTypes.string,
  urlPath: propTypes.string,
}
