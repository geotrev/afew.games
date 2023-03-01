import propTypes from "prop-types"
import { ReactElement } from "react"
import { SearchProps } from "./types"
import styles from "./styles.module.scss"

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
}

export function Search({
  label,
  placeholder,
  value,
  handleChange,
}: SearchProps): ReactElement {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search" className={styles.searchLabel}>
        {label}
      </label>
      <input
        className={styles.searchInput}
        name="collection-search"
        type="search"
        placeholder={placeholder}
        id="collection-search"
        onChange={handleChange}
        value={value || ""}
      />
    </div>
  )
}
