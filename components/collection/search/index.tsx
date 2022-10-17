import propTypes from "prop-types"
import { ChangeEventHandler, ReactElement } from "react"
import styles from "./styles.module.scss"

type SearchProps = {
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}

export function Search({ value, handleChange }: SearchProps): ReactElement {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search" className={styles.searchLabel}>
        Filter games
      </label>
      <input
        className={styles.searchInput}
        name="search"
        type="search"
        placeholder="E.g., Mega Man"
        id="search"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
}
