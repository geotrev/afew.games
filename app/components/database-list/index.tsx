"use client"

import { useState, useEffect, ReactElement, memo, useCallback } from "react"
import cn from "classnames"
import propTypes from "prop-types"

import { DB_FIELDS_SORTED, DatabaseFields } from "app/constants"
import { DatabaseVariant } from "types/games"

import { ListToolbar } from "../list-toolbar"
import { COLUMN_WIDTHS } from "./constants"
import { DatabaseListProps } from "./types"

DatabaseList.propTypes = {
  games: propTypes.arrayOf(propTypes.object),
  label: propTypes.string,
  id: propTypes.string,
}

const TableHeader = memo(() => (
  <thead>
    <tr>
      {DB_FIELDS_SORTED.map((field) => (
        <th
          key={field}
          className={cn("bg-base-200 text-xs uppercase", {
            "sticky left-0 z-50": field === DatabaseFields.PART_CODE,
          })}
        >
          {field.replaceAll("_", " ")}
        </th>
      ))}
    </tr>
  </thead>
))
TableHeader.displayName = "TableHeader"

export function DatabaseList({
  games,
  label,
  id,
}: DatabaseListProps): ReactElement | null {
  const [opened, setOpened] = useState<boolean>(true)
  const length = games.length

  // Re-expand games while searching for visibility
  useEffect(() => {
    setOpened(true)
  }, [games])

  const isEven = useCallback((index: number) => index % 2 === 0, [])

  function renderList() {
    if (!opened)
      return (
        <div
          className="block h-2 w-full bg-secondary opacity-20"
          role="separator"
        />
      )

    return (
      <ul
        className="grid gap-12 overflow-x-auto"
        aria-labelledby={`header-${id}`}
        id={`list-${id}`}
      >
        {games.map((data) => (
          <li key={data.name}>
            <h3 className="sticky left-0 mb-1 flex max-w-fit bg-base-300 px-2 py-1 font-bold text-white">
              {data.name}
            </h3>
            <table className="table-sm table table-zebra w-full">
              <TableHeader />
              <tbody>
                {data.variants!.map(
                  (variant: DatabaseVariant, rowIndex: number) => (
                    <tr key={`row-${rowIndex}`}>
                      {DB_FIELDS_SORTED.map((field, fieldIndex) => (
                        <td
                          key={field}
                          width={COLUMN_WIDTHS[field]}
                          className={cn({
                            "bg-base-100": !isEven(rowIndex),
                            "bg-base-300": isEven(rowIndex),
                            "whitespace-normal": field === DatabaseFields.NOTES,
                            "sticky left-0 z-50": fieldIndex === 0,
                          })}
                        >
                          {(variant as any)[field]}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    )
  }

  if (!games.length) {
    return null
  }

  return (
    <div className="mb-16 mt-12">
      <h2
        className="mb-2 text-xl font-extrabold text-white"
        id={`header-${id}`}
      >
        {label}
      </h2>
      <ListToolbar
        label="game"
        pluralLabel="games"
        itemsLength={length}
        id={id}
        opened={opened}
        setOpened={setOpened}
      />
      {renderList()}
    </div>
  )
}
