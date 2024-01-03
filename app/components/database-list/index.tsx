"use client"

import { useState, useEffect, ReactElement, memo } from "react"
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
          className={cn({
            capitalize: field !== "mpn",
            uppercase: field === "mpn",
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
        className="grid gap-16 overflow-x-auto"
        aria-labelledby={`header-${id}`}
        id={`list-${id}`}
      >
        {games.map((data) => (
          <li key={data.name}>
            <h3 className="sticky left-0 mb-1 flex max-w-fit bg-base-300 px-4 py-1 font-bold text-white">
              {data.name}
            </h3>
            <table className="table table-zebra w-full">
              <TableHeader />
              <tbody>
                {data.variants!.map((variant: DatabaseVariant, idx: number) => (
                  <tr key={`row-${idx}`}>
                    {DB_FIELDS_SORTED.map((field, fieldIndex) => (
                      <td
                        key={field}
                        width={COLUMN_WIDTHS[field]}
                        className={cn("z-0", {
                          "whitespace-normal": field === DatabaseFields.NOTES,
                          "sticky left-0 z-10": fieldIndex === 0,
                        })}
                      >
                        {(variant as any)[field]}
                      </td>
                    ))}
                  </tr>
                ))}
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
    <div className="my-16">
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
