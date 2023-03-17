"use client"

import propTypes from "prop-types"
import { StyledButton } from "./styled"
import { GlobalButtonProps } from "./types"
import * as constants from "./constants"

Button.propTypes = {
  bare: propTypes.bool,
  size: propTypes.oneOf([constants.SM, constants.MD]),
  type: propTypes.oneOf(["button", "submit", "reset", undefined]),
  cornerStyle: propTypes.oneOf([constants.SQUIRCLE, constants.ROUND]),
  selected: propTypes.bool,
}

export function Button({
  type = "button",
  bare = false,
  size = constants.MD,
  cornerStyle = constants.SQUIRCLE,
  selected = false,
  ...restProps
}: GlobalButtonProps) {
  return (
    <StyledButton
      $bare={bare}
      $selected={selected}
      $cornerStyle={cornerStyle}
      $size={size}
      type={type}
      {...restProps}
    />
  )
}
