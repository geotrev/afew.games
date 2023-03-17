"use client"

import { ReactElement } from "react"
import propTypes from "prop-types"
import { EssayHeaderProps } from "./types"
import {
  StyledEssayTitle,
  StyledEssayDescription,
  StyledEssayItemTimePara,
} from "./styled"

EssayHeader.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
}

export function EssayHeader({
  title,
  description,
  date,
}: EssayHeaderProps): ReactElement {
  return (
    <>
      <StyledEssayItemTimePara>
        Published{" "}
        <time aria-labelledby="essay-heading" dateTime={date}>
          {date}
        </time>
      </StyledEssayItemTimePara>
      <StyledEssayTitle id="essay-heading">{title}</StyledEssayTitle>
      {description && (
        <StyledEssayDescription className="text-lg">
          {description}
        </StyledEssayDescription>
      )}
      <h2>{"By George W."}</h2>
    </>
  )
}
