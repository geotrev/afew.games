import { useState, useEffect, ReactElement } from "react"
import propTypes from "prop-types"

import { CollectionListToolbar } from "components"
import { DatabaseGame, DatabaseVariant } from "types/games"

import { DB_FIELDS_SORTED } from "app/constants"

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

  function renderVariantRow(variant: DatabaseVariant, idx: number) {
    return (
      <tr key={`row-${idx}`}>
        {DB_FIELDS_SORTED.map((field) => (
          <td key={field} width={COLUMN_WIDTHS[field]}>
            {(variant as any)[field]}
          </td>
        ))}
      </tr>
    )
  }

  function renderVariantHeaderRow() {
    return (
      <tr>
        {DB_FIELDS_SORTED.map((field) => (
          <th key={field}>{COLUMN_LABELS[field]}</th>
        ))}
      </tr>
    )
  }

  function renderVariants(data: DatabaseGame) {
    return (
      <li key={data.name}>
        <StyledGameHeading>
          <StyledGameHeadingLabel>{data.name}</StyledGameHeadingLabel>
        </StyledGameHeading>
        <table>
          <thead>{renderVariantHeaderRow()}</thead>
          <tbody>{data.variants!.map(renderVariantRow)}</tbody>
        </table>
      </li>
    )
  }

  function renderList() {
    if (!opened) {
      return <StyledDatabaseMinimizeBar />
    }

    return (
      <StyledDatabaseList aria-labelledby={`header-${id}`} id={`list-${id}`}>
        {games.map(renderVariants)}
      </StyledDatabaseList>
    )
  }

  if (!games.length) {
    return null
  }

  return (
    <>
      <StyledPlatformHeading id={`header-${id}`}>{label}</StyledPlatformHeading>
      <CollectionListToolbar
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
