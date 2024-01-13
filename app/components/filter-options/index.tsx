"use client"

import {
  useState,
  useCallback,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
} from "react"
import cn from "classnames"
import propTypes from "prop-types"
import { getNextUrlState } from "../../utils/set-params"
import { FilterListProps } from "./types"

FilterOptions.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string,
      selected: propTypes.bool,
    })
  ).isRequired,
  handleClick: propTypes.func,
  handleReset: propTypes.func,
}

export function FilterOptions({
  items,
  searchValue,
  filteredPlatforms,
  handleClick,
  handleReset,
}: FilterListProps) {
  const [copied, setCopied] = useState<boolean>(false)
  const [rovingIndex, setRovingIndex] = useState<number>(0)
  const [opened, setOpened] = useState<boolean>(false)

  const noneSelected = items.every((item) => !item.selected)

  useEffect(() => {
    if (copied) {
      const timerId = setTimeout(() => {
        setCopied(false)
      }, 3000)

      return () => clearTimeout(timerId)
    }
  }, [copied])

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

  const handleShareClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    const url = getNextUrlState({ searchValue, filteredPlatforms })

    navigator.clipboard.writeText(url.toString())

    setCopied(true)
  }, [filteredPlatforms, searchValue])

  return (
    <div className="mb-4 rounded-b-lg bg-base-300 p-4">
      <div className={cn("sm:hidden", { "mb-4": opened })}>
        <button
          className="btn btn-ghost btn-sm w-full rounded normal-case"
          id="filter-toggle"
          aria-controls="filter-controls"
          aria-expanded={opened}
          onClick={handleToggleClick}
        >
          <span aria-hidden="true">{opened ? "–" : "+"}</span>&nbsp;
          {opened ? "Hide" : "Show"} Search Options
        </button>
      </div>
      <div
        className={cn("sm:!block", { hidden: !opened })}
        id="filter-controls"
        role="region"
        aria-labelledby="filter-toggle"
      >
        <p id="filter-by" className="mb-4 text-xs font-semibold uppercase">
          Filter by platform
        </p>
        <div
          aria-describedby="filter-by"
          aria-label="Select an item to filter games by platform"
          role="grid"
        >
          <div role="rowgroup">
            <div className="flex flex-row flex-wrap gap-1 sm:gap-2" role="row">
              {items.map((item, idx) => {
                return (
                  <div key={item.value} role="gridcell">
                    <button
                      tabIndex={rovingIndex === idx ? 0 : -1}
                      className={cn("btn btn-sm rounded-full normal-case", {
                        "btn-ghost": !item.selected,
                        "btn-accent btn-active": item.selected,
                      })}
                      data-item-value={item.value}
                      aria-pressed={item.selected}
                      onClick={handleItemClick}
                      onKeyDown={handleKeydown}
                    >
                      {item.value}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="divider my-2" role="separator" />
        <div className="flex justify-between">
          <button
            className="btn btn-ghost btn-sm rounded normal-case"
            onClick={handleReset}
            aria-disabled={noneSelected ? true : undefined}
            disabled={noneSelected}
            type="button"
          >
            <span aria-hidden="true">❌</span> Clear Selection
          </button>
          <button
            className={cn("btn btn-sm rounded normal-case", {
              "btn-ghost": !copied,
            })}
            onClick={handleShareClick}
            type="button"
            disabled={
              !searchValue && !filteredPlatforms.some((p) => p.selected)
            }
          >
            {copied ? "Copied ✔" : "Share URL 🔗"}
          </button>
        </div>
      </div>
    </div>
  )
}
