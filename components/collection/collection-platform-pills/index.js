import cn from "classnames"
import styles from "./styles.module.scss"

export function CollectionPlatformPills({
  items,
  handleSelect,
  handleReset,
  handleSelectAll,
}) {
  return (
    <div className={styles.collectionPills}>
      <ul className={styles.pillList}>
        {items.map((platform) => {
          return (
            <li key={platform.value} className={styles.pillItem}>
              <button
                type="button"
                className={cn(styles.pillBtn, {
                  [styles.selected]: platform.selected,
                })}
                data-platform={platform.value}
                onClick={handleSelect}
              >
                {platform.value}
              </button>
            </li>
          )
        })}
      </ul>
      <div className={styles.pillOptions}>
        <button type="button" className={styles.pillBtn} onClick={handleReset}>
          <span aria-hidden="true">𐌗&nbsp;&nbsp;</span>Clear Filter
        </button>
        <button
          type="button"
          className={styles.pillBtn}
          onClick={handleSelectAll}
        >
          <span aria-hidden="true">✓&nbsp;&nbsp;</span>Select All
        </button>
      </div>
    </div>
  )
}
