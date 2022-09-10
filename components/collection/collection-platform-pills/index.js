import cn from "classnames"
import styles from "./styles.module.scss"

export function CollectionPlatformPills({ items, handleSelect, handleReset }) {
  return (
    <div className={styles.collectionPills}>
      <ul className={styles.pillList}>
        {items.map((platform) => {
          return (
            <li key={platform.value} className={styles.pillItem}>
              <button
                type="button"
                className={cn(styles.pillBtn, {
                  [styles.isActive]: platform.selected,
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
      <div>
        <button
          type="button"
          className={styles.pillResetBtn}
          onClick={handleReset}
        >
          𐌗&nbsp;&nbsp;Clear Filter
        </button>
      </div>
    </div>
  )
}
