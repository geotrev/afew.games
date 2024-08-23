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
import { FilterItem } from "types/games"
import { Well } from "@zendeskgarden/react-notifications"
import { Button, ToggleButton } from "@zendeskgarden/react-buttons"
import XFill from "@zendeskgarden/svg-icons/src/12/x-fill.svg"
import LinkFill from "@zendeskgarden/svg-icons/src/12/link-fill.svg"
import CheckFill from "@zendeskgarden/svg-icons/src/12/check-lg-fill.svg"
import { SM } from "@zendeskgarden/react-typography"

export type FilterOptionsProps = {
  totalGameCount: number
  isLoading: boolean
  searchValue: string
  filteredPlatforms: FilterItem[]
  handleClick: MouseEventHandler<HTMLButtonElement>
  handleReset: MouseEventHandler<HTMLButtonElement>
}

export const FilterOptions = ({
  totalGameCount,
  isLoading,
  searchValue,
  filteredPlatforms,
  handleClick,
  handleReset,
}: FilterOptionsProps) => {
  const [copied, setCopied] = useState<boolean>(false)
  const [rovingIndex, setRovingIndex] = useState<number>(0)
  const [opened, setOpened] = useState<boolean>(false)

  const noneSelected = filteredPlatforms.every((item) => !item.selected)

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
        const lastIdx = filteredPlatforms.length - 1
        const container = parentNode?.parentNode?.childNodes?.[
          lastIdx
        ] as HTMLDivElement
        target = container?.firstElementChild as HTMLButtonElement
        targetIndex = lastIdx
      } else if (key.length === 1 && /[0-9A-Za-z]/.test(key)) {
        targetIndex = filteredPlatforms.findIndex((item) =>
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
    [filteredPlatforms, rovingIndex]
  )

  const handleItemClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const index = filteredPlatforms.findIndex(
        (item) =>
          item.value === (event.target as HTMLButtonElement).dataset.itemValue
      )
      setRovingIndex(index)
      handleClick(event)
    },
    [handleClick, filteredPlatforms]
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

  if (totalGameCount <= 0 || isLoading) return null

  return (
    <Well className="my-6" isRecessed>
      <div className={cn("sm:hidden", { "mb-4": opened })}>
        <ToggleButton
          isStretched
          size="small"
          id="filter-toggle"
          aria-controls="filter-controls"
          aria-expanded={opened}
          isPressed={opened}
          onClick={handleToggleClick}
        >
          <span aria-hidden="true">{opened ? "–" : "+"}</span>&nbsp;
          {opened ? "Hide" : "Show"} Filter Options
        </ToggleButton>
      </div>
      <div
        className={cn("sm:!block", { hidden: !opened })}
        id="filter-controls"
        role="region"
        aria-labelledby="filter-toggle"
      >
        <SM id="filter-by" tag="p" isBold className="mb-4 uppercase">
          Filter by platform
        </SM>
        <div
          className="mb-6"
          aria-describedby="filter-by"
          aria-label="Select an item to filter games by platform"
          role="grid"
        >
          <div role="rowgroup">
            <div className="flex flex-row flex-wrap gap-1 sm:gap-2" role="row">
              {filteredPlatforms.map((item, idx) => {
                return (
                  <div key={item.value} role="gridcell">
                    <Button
                      isPill
                      isNeutral
                      size="small"
                      tabIndex={rovingIndex === idx ? 0 : -1}
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
        <div className="flex justify-between">
          <Button
            size="small"
            isDanger
            onClick={handleReset}
            aria-disabled={noneSelected ? true : undefined}
            disabled={noneSelected}
          >
            <Button.StartIcon>
              <XFill />
            </Button.StartIcon>
            Clear Selection
          </Button>
          <Button
            size="small"
            isNeutral
            isBasic={copied}
            onClick={handleShareClick}
            disabled={
              !searchValue && !filteredPlatforms.some((p) => p.selected)
            }
          >
            {copied ? "Copied" : "Share URL"} &nbsp;
            {copied ? <CheckFill /> : <LinkFill />}
          </Button>
        </div>
      </div>
    </Well>
  )
}

FilterOptions.propTypes = {
  totalGameCount: propTypes.number,
  isLoading: propTypes.bool,
  searchValue: propTypes.string,
  filteredPlatforms: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string,
      selected: propTypes.bool,
    })
  ).isRequired,
  handleClick: propTypes.func,
  handleReset: propTypes.func,
}
