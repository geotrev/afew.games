import styles from "./styles.module.scss"

export function Search({ value, handleChange }) {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search" className={styles.searchLabel}>
        Filter games
      </label>
      <input
        className={styles.searchInput}
        name="search"
        type="text"
        placeholder="E.g., Mega Man"
        id="search"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}
