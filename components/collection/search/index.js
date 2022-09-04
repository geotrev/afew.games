import styles from "./styles.module.scss"

export function Search({ value, handleChange }) {
  return (
    <div className={styles.container}>
      <label htmlFor="search" className={styles.label}>
        Filter games
      </label>
      <input
        className={styles.input}
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
