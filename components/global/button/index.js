import PropTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"

// radius type
const SQUIRCLE = "squircle"
const ROUND = "round"
// size
const SM = "sm"
const MD = "md"
// visual type
const BARE = "bare"
// interactive type
const SELECTED = "selected"

export function Button(props) {
  const { type, bare, size, cornerType, selected, children, ...restProps } =
    props
  return (
    <button
      className={cn(styles.button, {
        [styles[BARE]]: bare,
        [styles[SELECTED]]: selected,
        [styles[cornerType]]: [SQUIRCLE, ROUND].includes(cornerType),
        [styles[size]]: [SM, MD].includes(size),
      })}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  bare: false,
  type: "button",
  size: "md",
  cornerType: SQUIRCLE,
}

Button.propTypes = {
  bare: PropTypes.bool,
  size: PropTypes.oneOf([SM, MD]),
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  selected: PropTypes.bool,
  cornerType: PropTypes.oneOf([SQUIRCLE, ROUND]),
}
