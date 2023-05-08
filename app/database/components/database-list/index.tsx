"use client"

import { useState, useEffect, ReactElement } from "react"
import propTypes from "prop-types"

import { DB_FIELDS_SORTED } from "app/constants"

import { ListToolbar } from "../list-toolbar"
import { DatabaseVariant } from "types/games"

import {
  StyledDatabaseList,
  StyledDatabaseMinimizeBar,
  StyledGameHeading,
  StyledGameHeadingLabel,
  StyledPlatformHeading,
} from "./styled"
import { COLUMN_LABELS, COLUMN_WIDTHS } from "./constants"
import { DatabaseListProps } from "./types"

DatabaseList.propTypes = {
  games: propTypes.arrayOf(propTypes.object),
  label: propTypes.string,
  id: propTypes.string,
}

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
    if (!opened) return <StyledDatabaseMinimizeBar />

    return (
      <StyledDatabaseList aria-labelledby={`header-${id}`} id={`list-${id}`}>
        {games.map((data) => (
          <li key={data.name}>
            <StyledGameHeading>
              <StyledGameHeadingLabel>{data.name}</StyledGameHeadingLabel>
            </StyledGameHeading>
            <table>
              <thead>
                <tr>
                  {DB_FIELDS_SORTED.map((field) => (
                    <th key={field}>{COLUMN_LABELS[field]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.variants!.map((variant: DatabaseVariant, idx: number) => (
                  <tr key={`row-${idx}`}>
                    {DB_FIELDS_SORTED.map((field) => (
                      <td key={field} width={COLUMN_WIDTHS[field]}>
                        {(variant as any)[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        ))}
      </StyledDatabaseList>
    )
  }

  if (!games.length) {
    return null
  }

  return (
    <>
      <StyledPlatformHeading id={`header-${id}`}>{label}</StyledPlatformHeading>
      <ListToolbar
        label="game"
        pluralLabel="games"
        itemsLength={length}
        id={id}
        opened={opened}
        setOpened={setOpened}
      />
      {renderList()}
    </>
  )
}
