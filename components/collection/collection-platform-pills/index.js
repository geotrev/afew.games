import { Button } from "components/global"
import styles from "./styles.module.scss"

export function CollectionPlatformPills({
  items,
  handleSelect,
  handleReset,
  handleSelectAll,
}) {
  const allSelected = items.every((item) => item.selected)
  const noneSelected = items.every((item) => !item.selected)
  return (
    <div className={styles.collectionPills}>
      <ul className={styles.pillList}>
        {items.map((platform) => {
          return (
            <li key={platform.value} className={styles.pillItem}>
              <Button
                selected={platform.selected}
                data-platform={platform.value}
                onClick={handleSelect}
              >
                {platform.value}
              </Button>
            </li>
          )
        })}
      </ul>
      <div className={styles.pillOptions}>
        <Button
          onClick={handleReset}
          aria-disabled={noneSelected ? "true" : null}
          bare
        >
          <span aria-hidden="true">𐌗&nbsp;&nbsp;</span>Clear Filter
        </Button>
        <Button
          onClick={handleSelectAll}
          aria-disabled={allSelected ? "true" : null}
          bare
        >
          <span aria-hidden="true">✓&nbsp;&nbsp;</span>Select All
        </Button>
      </div>
    </div>
  )
}
