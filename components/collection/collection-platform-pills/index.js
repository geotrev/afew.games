import { useState, useCallback } from "react"
import PropTypes from "prop-types"
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

  const handleKeydown = useCallback(
    (e) => {
      const parentNode = e.target.parentNode
      let target, targetIndex

      if (e.key === "ArrowLeft") {
        target = e.target.previousElementSibling
        targetIndex = rovingIndex - 1
      } else if (e.key === "ArrowRight") {
        target = e.target.nextElementSibling
        targetIndex = rovingIndex + 1
      } else if (e.key === "Home") {
        target = parentNode.childNodes[0]
        targetIndex = 0
      } else if (e.key === "End") {
        const lastIdx = items.length - 1
        target = parentNode.childNodes[lastIdx]
        targetIndex = lastIdx
      } else if (/[0-9A-Za-z]/.test(e.key)) {
        const key = e.key
        targetIndex = items.findIndex((item) =>
          item.value.toLowerCase().startsWith(key)
        )
        target = parentNode.childNodes[targetIndex]
      }

      if (target && targetIndex > -1) {
        target.focus()
        setRovingIndex(targetIndex)
      }
    },
    [items, rovingIndex]
  )

  function handlePillClick(e) {
    const index = items.findIndex(
      (item) => item.value === e.target.dataset.platform
    )
    setRovingIndex(index)
    handleSelect(e)
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
                  onClick={handlePillClick}
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
          size="sm"
        >
          <span aria-hidden="true">𐌗&nbsp;&nbsp;</span>Clear Filter
        </Button>
        <Button
          onClick={handleSelectAll}
          aria-disabled={allSelected ? "true" : null}
          bare
          size="sm"
        >
          <span aria-hidden="true">✓&nbsp;&nbsp;</span>Select All
        </Button>
      </div>
    </div>
  )
}

CollectionPlatformPills.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      selected: PropTypes.bool,
    })
  ).isRequired,
  handleSelect: PropTypes.func,
  handleReset: PropTypes.func,
  handleSelectAll: PropTypes.func,
}
