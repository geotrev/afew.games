import {
  useState,
  useCallback,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react"
import propTypes from "prop-types"
import cn from "classnames"
import { Button } from "components/global"
import { CollectionFilterProps } from "./types"
import styles from "./styles.module.scss"

CollectionFilter.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string,
      selected: propTypes.bool,
    })
  ).isRequired,
  handleClick: propTypes.func,
  handleReset: propTypes.func,
}

export function CollectionFilter({
  items,
  handleClick,
  handleReset,
}: CollectionFilterProps) {
  const [rovingIndex, setRovingIndex] = useState<number>(0)
  const [opened, setOpened] = useState<boolean>(false)
  const noneSelected = items.every((item) => !item.selected)

  const handleKeydown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
    (event) => {
      const { key } = event
      const eventTarget = event.target
      const parentNode = (eventTarget as HTMLButtonElement)
        .parentNode as HTMLDivElement
      let target: HTMLButtonElement | null = null,
        targetIndex: number = -1

      if (key === "ArrowLeft") {
        target = parentNode?.previousElementSibling
          ?.firstElementChild as HTMLButtonElement
        targetIndex = rovingIndex - 1
      } else if (key === "ArrowRight") {
        target = parentNode?.nextElementSibling
          ?.firstElementChild as HTMLButtonElement
        targetIndex = rovingIndex + 1
      } else if (key === "Home") {
        const container = parentNode?.parentNode
          ?.childNodes?.[0] as HTMLDivElement
        target = container?.firstElementChild as HTMLButtonElement
        targetIndex = 0
      } else if (key === "End") {
        const lastIdx = items.length - 1
        const container = parentNode?.parentNode?.childNodes?.[
          lastIdx
        ] as HTMLDivElement
        target = container?.firstElementChild as HTMLButtonElement
        targetIndex = lastIdx
      } else if (key.length === 1 && /[0-9A-Za-z]/.test(key)) {
        targetIndex = items.findIndex((item) =>
          item.value.toLowerCase().startsWith(key)
        )
        const container = parentNode?.parentNode?.childNodes?.[
          targetIndex
        ] as HTMLDivElement
        target = container?.firstElementChild as HTMLButtonElement
      }

      if (target && targetIndex > -1) {
        target.focus()
        setRovingIndex(targetIndex)
      }
    },
    [items, rovingIndex]
  )

  const handleItemClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const index = items.findIndex(
        (item) =>
          item.value === (event.target as HTMLButtonElement).dataset.itemValue
      )
      setRovingIndex(index)
      handleClick(event)
    },
    [handleClick, items]
  )

  const handleToggleClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setOpened(!opened)
  }, [opened])

  return (
    <div className={styles.collectionFilter}>
      <div className={styles.collectionFilterToggle}>
        <Button
          id="filter-toggle"
          bare
          aria-controls="filter-controls"
          aria-expanded={opened}
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
                  <div key={item.value} role="gridcell">
                    <Button
                      tabIndex={rovingIndex === idx ? 0 : -1}
                      selected={item.selected}
                      cornerType="round"
                      data-item-value={item.value}
                      aria-pressed={item.selected}
                      onClick={handleItemClick}
                      onKeyDown={handleKeydown}
                    >
                      {item.value}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles.collectionFilterReset}>
          <Button
            onClick={handleReset}
            aria-disabled={noneSelected ? true : undefined}
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
