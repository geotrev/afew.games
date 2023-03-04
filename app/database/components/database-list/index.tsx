import { useState, useEffect, ReactElement } from "react"
import propTypes from "prop-types"
import { CollectionListToolbar } from "app/components"
import { DATABASE_FIELDS } from "app/constants"
import { COLUMN_LABELS, COLUMN_WIDTHS } from "./constants"
import { DatabaseGame, DatabaseVariant } from "app/types/games"
import { DatabaseListProps } from "./types"
import styles from "./styles.module.scss"

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
        <h3 className={styles.gameHeading}>
          <span className={styles.gameHeadingLabel}>{data.name}</span>
        </h3>
        <table>
          <thead>{renderVariantHeaderRow()}</thead>
          <tbody>{data.variants!.map(renderVariantRow)}</tbody>
        </table>
      </li>
    )
  }

  function renderList() {
    if (!opened) {
      return <hr className={styles.databaseMinimizeBar} />
    }

    return (
      <ul
        aria-labelledby={`header-${id}`}
        id={`list-${id}`}
        className={styles.databaseList}
      >
        {games.map(renderVariants)}
      </ul>
    )
  }

  if (!games.length) {
    return null
  }

  return (
    <>
      <h2 id={`header-${id}`} className={styles.platformHeading}>
        {label}
      </h2>
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
