import PropTypes from "prop-types"
import cn from "classnames"
import styles from "./styles.module.scss"

export function Button(props) {
  return (
    <button
      className={cn(styles.button, {
        [styles.bare]: props.bare,
        [styles.selected]: props.selected,
      })}
      type={props.type}
      {...props}
    >
      {props.children}
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
