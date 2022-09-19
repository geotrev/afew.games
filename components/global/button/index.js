import propTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"

// radius types
const SQUIRCLE = "squircle"
const ROUND = "round"
// sizes
const SM = "sm"
const MD = "md"

export function Button(props) {
  const { type, bare, size, cornerType, selected, children, ...restProps } =
    props
  return (
    <button
      className={cn(styles.button, {
        [styles.bare]: bare,
        [styles.selected]: selected,
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
  size: MD,
  cornerType: SQUIRCLE,
}

Button.propTypes = {
  bare: propTypes.bool,
  size: propTypes.oneOf([SM, MD]),
  children: propTypes.any.isRequired,
  type: propTypes.string,
  selected: propTypes.bool,
  cornerType: propTypes.oneOf([SQUIRCLE, ROUND]),
}
