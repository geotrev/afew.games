"use client"

import { useState, useEffect, ReactElement, memo } from "react"
import cn from "classnames"
import propTypes from "prop-types"

import {
  DB_FIELDS_SORTED,
  DB_FIELD_DESCRIPTIONS,
  DatabaseFields,
} from "app/constants"
import { DatabaseGame, DatabaseVariant } from "types/games"

import { ListToolbar } from "./ListToolbar"
import { Tooltip } from "react-tooltip"

export type DatabaseListProps = {
  games: DatabaseGame[]
  label: string
  id: string
}

export const COLUMN_WIDTHS: Record<string, string> = DB_FIELDS_SORTED.reduce(
  (acc, field) => {
    switch (field) {
      case DatabaseFields.NOTES:
        return { ...acc, [field]: "35%" }
      case DatabaseFields.MPN:
        return { ...acc, [field]: "20%" }
      default:
        return { ...acc, [field]: "15%" }
    }
  },
  {}
)

const isEven = (index: number) => index % 2 === 0

const TableHeader = memo<{ tooltipId: string }>(({ tooltipId }) => (
  <thead>
    <tr>
      {DB_FIELDS_SORTED.map((field) => (
        <th
          key={field}
          className={cn("bg-base-200 text-xs", {
            "sticky left-0 z-10": field === DatabaseFields.PRODUCT_CODE,
          })}
        >
          <span className="flex items-center">
            <span className="uppercase">{field.replaceAll("_", " ")}</span>
            &nbsp;
            <button
              className="btn btn-ghost btn-xs p-0 hover:bg-transparent"
              type="button"
              aria-label={DB_FIELD_DESCRIPTIONS[field]}
              data-tooltip-id={tooltipId}
              data-tooltip-content={DB_FIELD_DESCRIPTIONS[field]}
              data-tooltip-delay-hide={300}
              data-tooltip-delay-show={300}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-4 shrink-0 stroke-gray-500"
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

export const DatabaseList = ({
  games,
  label,
  id,
}: DatabaseListProps): ReactElement | null => {
  const [opened, setOpened] = useState<boolean>(true)
  const length = games.length
  const tooltipId = `info-tooltip-${id}`

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
        id={tooltipId}
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
                <TableHeader tooltipId={tooltipId} />
                <tbody>
                  {data.variants!.map(
                    (variant: DatabaseVariant, rowIndex: number) => (
                      <tr key={`row-${rowIndex}`}>
                        {DB_FIELDS_SORTED.map((field: string, fieldIndex) => (
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
                            {variant[field]}
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

DatabaseList.propTypes = {
  games: propTypes.arrayOf(propTypes.object),
  label: propTypes.string,
  id: propTypes.string,
}
