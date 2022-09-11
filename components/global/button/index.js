import PropTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"

const SQUIRCLE = "squircle"
const ROUND = "round"

export function Button(props) {
  const { type, bare, cornerType, selected, children, ...restProps } = props
  return (
    <button
      className={cn(styles.button, {
        [styles.bare]: bare,
        [styles.selected]: selected,
        [styles[cornerType]]: [SQUIRCLE, ROUND].includes(cornerType),
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
  cornerType: SQUIRCLE,
}

Button.propTypes = {
  bare: PropTypes.bool,
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  selected: PropTypes.bool,
  cornerType: PropTypes.oneOf([SQUIRCLE, ROUND]),
}
