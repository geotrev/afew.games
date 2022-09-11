import { useState } from "react"
import { Button } from "components/global"
import styles from "./styles.module.scss"

export function CollectionPlatformPills({
  items,
  handleSelect,
  handleReset,
  handleSelectAll,
}) {
  const [rovingIndex, setRovingIndex] = useState(0)
  const allSelected = items.every((item) => item.selected)
  const noneSelected = items.every((item) => !item.selected)

  function setRovingTarget(target, delta) {
    if (!target) return
    target.focus()
    setRovingIndex(rovingIndex + delta)
  }

  function handleKeydown(e) {
    const parentNode = e.target.parentNode
    if (e.key === "ArrowLeft") {
      setRovingTarget(parentNode.previousElementSibling?.firstElementChild, -1)
    } else if (e.key === "ArrowRight") {
      setRovingTarget(parentNode.nextElementSibling?.firstElementChild, 1)
    }
  }

  return (
    <div className={styles.collectionPills}>
      <ul className={styles.pillList}>
        {items.map((platform, idx) => {
          return (
            <li key={platform.value} className={styles.pillItem}>
              <Button
                selected={platform.selected}
                data-platform={platform.value}
                onClick={handleSelect}
                onKeyDown={handleKeydown}
                aria-selected={platform.selected ? "true" : null}
                tabIndex={rovingIndex === idx ? "0" : "-1"}
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
