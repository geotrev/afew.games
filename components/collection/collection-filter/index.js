import { useState, useCallback } from "react"
import propTypes from "prop-types"
import cn from "classnames"
import { Button } from "components/global"
import styles from "./styles.module.scss"

export function CollectionFilter({ items, handleSelect, handleReset }) {
  const [rovingIndex, setRovingIndex] = useState(0)
  const [opened, setOpened] = useState(false)
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

  function handleItemClick(e) {
    const index = items.findIndex(
      (item) => item.value === e.target.dataset.itemValue
    )
    setRovingIndex(index)
    handleSelect(e)
  }

  function handleToggleClick() {
    setOpened(!opened)
  }

  return (
    <div className={styles.collectionFilter}>
      <div className={styles.collectionFilterToggle}>
        <Button
          id="filter-toggle"
          aria-controls="filter-controls"
          aria-expanded={String(opened)}
          bare
          onClick={handleToggleClick}
        >
          <span aria-hidden="true">{opened ? "–" : "+"}</span> Filter Options
        </Button>
      </div>
      <div
        className={cn({ [styles.hidden]: !opened })}
        id="filter-controls"
        role="region"
        aria-labelledby="filter-toggle"
      >
        <div
          aria-label="Select an item to filter games by platform"
          role="grid"
        >
          <div role="rowgroup">
            <div className={styles.collectionFilterList} role="row">
              {items.map((item, idx) => {
                return (
                  <Button
                    key={item.value}
                    selected={item.selected}
                    cornerType="round"
                    data-item-value={item.value}
                    onClick={handleItemClick}
                    onKeyDown={handleKeydown}
                    aria-pressed={String(item.selected)}
                    tabIndex={rovingIndex === idx ? "0" : "-1"}
                  >
                    {item.value}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles.collectionFilterReset}>
          <Button
            onClick={handleReset}
            aria-disabled={noneSelected ? "true" : null}
            bare
            size="sm"
          >
            <span aria-hidden="true">𐌗&nbsp;&nbsp;</span>Reset Filter
          </Button>
        </div>
      </div>
    </div>
  )
}

CollectionFilter.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string,
      selected: propTypes.bool,
    })
  ).isRequired,
  handleSelect: propTypes.func,
  handleReset: propTypes.func,
}
