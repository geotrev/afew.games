"use client"

import { useState, useEffect, ReactElement, memo } from "react"
import cn from "classnames"
import propTypes from "prop-types"

import {
  DB_FIELDS_SORTED,
  DB_FIELD_DESCRIPTIONS,
  DatabaseFields,
} from "app/constants"
import { DatabaseVariant } from "types/games"

import { ListToolbar } from "../list-toolbar"
import { COLUMN_WIDTHS } from "./constants"
import { DatabaseListProps } from "./types"
import { Tooltip } from "react-tooltip"

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
          className={cn("bg-base-200 text-xs", {
            "sticky left-0 z-10": field === DatabaseFields.PART_CODE,
          })}
        >
          <span className="flex items-center">
            <span className="uppercase">{field.replaceAll("_", " ")}</span>
            &nbsp;
            <button
              className="btn btn-ghost btn-xs p-0 hover:bg-transparent"
              type="button"
              aria-label={DB_FIELD_DESCRIPTIONS[field]}
              data-tooltip-id="info-tooltip"
              data-tooltip-content={DB_FIELD_DESCRIPTIONS[field]}
              data-tooltip-delay-hide={300}
              data-tooltip-delay-show={300}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 stroke-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </span>
        </th>
      ))}
    </tr>
  </thead>
))

TableHeader.displayName = "TableHeader"

const isEven = (index: number) => index % 2 === 0

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
      <Tooltip
        id="info-tooltip"
        className="z-20 max-w-48 text-wrap !bg-white !text-base-100"
      />
      {opened ? (
        <ul
          className="grid gap-12 overflow-x-auto"
          aria-labelledby={`header-${id}`}
          id={`list-${id}`}
        >
          {games.map((data) => (
            <li key={data.name}>
              <h3 className="sticky left-0 mb-1 flex max-w-fit bg-base-300 px-3 py-1 font-bold text-white">
                {data.name}
              </h3>
              <table className="table table-zebra table-sm w-full">
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
                              "whitespace-normal":
                                field === DatabaseFields.NOTES,
                              "sticky left-0 z-10": fieldIndex === 0,
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
      ) : (
        <div
          className="block h-2 w-full bg-secondary opacity-20"
          role="separator"
        />
      )}
    </div>
  )
}
