import propTypes from "prop-types"
import { ReactElement } from "react"
import { CollectionSearchProps } from "./types"
import styles from "./styles.module.scss"

CollectionSearch.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
}

export function CollectionSearch({
  value,
  handleChange,
}: CollectionSearchProps): ReactElement {
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
