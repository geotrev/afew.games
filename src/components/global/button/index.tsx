import propTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"
import { GlobalButtonProps } from "./types"

/**
 * constants
 */
// radius types
const SQUIRCLE = "squircle"
const ROUND = "round"
// sizes
const SM = "sm"
const MD = "md"

/**
 * props
 */

Button.propTypes = {
  bare: propTypes.bool,
  size: propTypes.oneOf([SM, MD]),
  type: propTypes.oneOf(["button", "submit", "reset", undefined]),
  cornerType: propTypes.oneOf([SQUIRCLE, ROUND]),
  selected: propTypes.bool,
}

/**
 * component
 */
export function Button({
  type = "button",
  bare = false,
  size = MD,
  cornerType = SQUIRCLE,
  selected = false,
  children,
  ...restProps
}: GlobalButtonProps) {
  return (
    <button
      className={cn(styles.button, {
        [styles.bare]: bare,
        [styles.selected]: selected,
        [styles[cornerType as string]]: [SQUIRCLE, ROUND].includes(
          cornerType as string
        ),
        [styles[size as string]]: [SM, MD].includes(size as string),
      })}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  )
}
