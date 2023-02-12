import propTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"
import { IGlobalButtonProps } from "./types"

/**
 * constants
 */
// radius types
const SQUIRCLE = "squircle"
const ROUND = "round"
// sizes
const SM = "sm"
const MD = "md"
// variants
const PRIMARY = "primary"
const SECONDARY = "secondary"

/**
 * props
 */
Button.defaultProps = {
  bare: false,
  variant: "secondary",
  selected: false,
  type: "button",
  size: MD,
  cornerType: SQUIRCLE,
}

Button.propTypes = {
  bare: propTypes.bool,
  variant: propTypes.oneOf([PRIMARY, SECONDARY]),
  size: propTypes.oneOf([SM, MD]),
  type: propTypes.oneOf(["button", "submit", "reset", undefined]),
  cornerType: propTypes.oneOf([SQUIRCLE, ROUND]),
  selected: propTypes.bool,
}

/**
 * component
 */
export function Button(props: IGlobalButtonProps) {
  const { type, bare, size, cornerType, selected, children, ...restProps } =
    props
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
