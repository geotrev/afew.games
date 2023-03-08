import { useState, useEffect, ReactElement } from "react"
import propTypes from "prop-types"
import { CollectionListToolbar } from "app/components"
import { DATABASE_FIELDS } from "app/constants"
import { COLUMN_LABELS, COLUMN_WIDTHS } from "./constants"
import { DatabaseGame, DatabaseVariant } from "app/types/games"
import { DatabaseListProps } from "./types"
import {
  StyledDatabaseList,
  StyledDatabaseMinimizeBar,
  StyledGameHeading,
  StyledGameHeadingLabel,
  StyledPlatformHeading,
} from "./styled"

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
        {DATABASE_FIELDS.map((field) => (
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
        {DATABASE_FIELDS.map((field) => (
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
