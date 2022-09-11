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
      setRovingTarget(e.target.previousElementSibling, -1)
    } else if (e.key === "ArrowRight") {
      setRovingTarget(e.target.nextElementSibling, 1)
    } else if (e.key === "Home") {
      setRovingTarget(parentNode.childNodes[0]?.firstElementChild, -rovingIndex)
    } else if (e.key === "End") {
      const lastIdx = items.length - 1
      setRovingTarget(
        parentNode.childNodes[lastIdx]?.firstElementChild,
        lastIdx - rovingIndex
      )
    }
  }

  return (
    <div className={styles.collectionPills}>
      <div aria-label="Select an item to filter games by platform" role="grid">
        <div role="rowgroup">
          <div className={styles.collectionPillsList} role="row">
            {items.map((platform, idx) => {
              return (
                <Button
                  key={platform.value}
                  selected={platform.selected}
                  cornerType="round"
                  data-platform={platform.value}
                  onClick={handleSelect}
                  onKeyDown={handleKeydown}
                  aria-selected={String(platform.selected)}
                  tabIndex={rovingIndex === idx ? "0" : "-1"}
                  role="gridcell"
                >
                  {platform.value}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.collectionPillsOptions}>
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
