"use client"

import { useState, useEffect, ReactElement, memo } from "react"
import cn from "classnames"
import propTypes from "prop-types"

import { Table } from "@zendeskgarden/react-tables"
import { SM } from "@zendeskgarden/react-typography"
import { IconButton } from "@zendeskgarden/react-buttons"
import { Tooltip } from "@zendeskgarden/react-tooltips"
import { ListToolbar } from "./ListToolbar"

import InfoStroke from "@zendeskgarden/svg-icons/src/16/info-stroke.svg"

import {
  DB_FIELDS_SORTED,
  DB_FIELD_DESCRIPTIONS,
  DatabaseFields,
} from "app/constants"
import { DatabaseGame, DatabaseVariant } from "types/games"

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

const TableHeader = memo(() => (
  <Table.Head>
    <Table.HeaderRow>
      {DB_FIELDS_SORTED.map((field) => (
        <Table.HeaderCell key={field}>
          <SM isBold tag="span" className="flex items-center gap-1">
            <span className="uppercase">{field.replaceAll("_", " ")}</span>
            &nbsp;
            <Tooltip
              size="medium"
              content={DB_FIELD_DESCRIPTIONS[field]}
              style={{ maxWidth: 200, textWrap: "wrap" }}
            >
              <IconButton
                isBasic
                size="small"
                className="!h-5 !min-h-5 !w-5 !min-w-5 !p-0"
                aria-label={DB_FIELD_DESCRIPTIONS[field]}
              >
                <InfoStroke />
              </IconButton>
            </Tooltip>
          </SM>
        </Table.HeaderCell>
      ))}
    </Table.HeaderRow>
  </Table.Head>
))

TableHeader.displayName = "TableHeader"

export const DatabaseList = ({
  games,
  label,
  id,
}: DatabaseListProps): ReactElement | null => {
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
      <ul
        className="grid gap-12 overflow-x-auto"
        aria-labelledby={`header-${id}`}
        id={`list-${id}`}
      >
        {games.map((data) => (
          <li key={data.name}>
            <h3 className="bg-base-300 sticky left-0 mb-1 flex max-w-fit px-3 py-1 font-bold text-white">
              {data.name}
            </h3>
            <Table isReadOnly size="small">
              <TableHeader />
              <Table.Body>
                {data.variants!.map(
                  (variant: DatabaseVariant, rowIndex: number) => (
                    <Table.Row
                      key={`row-${rowIndex}`}
                      isStriped={rowIndex % 2 === 0}
                    >
                      {DB_FIELDS_SORTED.map((field: string, fieldIndex) => (
                        <Table.Cell
                          key={field}
                          width={COLUMN_WIDTHS[field]}
                          className={cn({
                            "bg-base-100": !isEven(rowIndex),
                            "bg-base-300": isEven(rowIndex),
                            "whitespace-normal": field === DatabaseFields.NOTES,
                            "sticky left-0 z-10": fieldIndex === 0,
                          })}
                        >
                          {variant[field]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  )
                )}
              </Table.Body>
            </Table>
          </li>
        ))}
      </ul>
    </div>
  )
}

DatabaseList.propTypes = {
  games: propTypes.arrayOf(propTypes.object),
  label: propTypes.string,
  id: propTypes.string,
}
