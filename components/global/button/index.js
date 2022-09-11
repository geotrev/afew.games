import PropTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"

export function Button({ type, bare, selected, children, ...props }) {
  return (
    <button
      className={cn(styles.button, {
        [styles.bare]: bare,
        [styles.selected]: selected,
      })}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  bare: false,
  type: "button",
}

Button.propTypes = {
  bare: PropTypes.bool,
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  selected: PropTypes.bool,
}
