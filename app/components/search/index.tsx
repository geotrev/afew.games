import propTypes from "prop-types"
import { ReactElement } from "react"
import { SearchProps } from "./types"
import styles from "./styles.module.scss"

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
}

export function Search({ value, handleChange }: SearchProps): ReactElement {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search" className={styles.searchLabel}>
        Filter games
      </label>
      <input
        className={styles.searchInput}
        name="collection-search"
        type="search"
        placeholder="E.g., Mega Man"
        id="collection-search"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}
