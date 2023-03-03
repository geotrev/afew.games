import { useState, useEffect, ReactElement } from "react"
import propTypes from "prop-types"
import { CollectionListToolbar } from "app/components"
import { CollectionItem } from "../collection-item"
import { CollectionListProps } from "./types"
import styles from "./styles.module.scss"

CollectionList.propTypes = {
  games: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      variant: propTypes.string,
      grade: propTypes.string,
      grader: propTypes.oneOf(["Wata", "VGA", "CGC", "P1G"]),
    })
  ),
  label: propTypes.string,
  id: propTypes.string,
}

export function CollectionList({
  games,
  label,
  id,
}: CollectionListProps): ReactElement | null {
  const [opened, setOpened] = useState<boolean>(true)
  const length = games.length

  // Re-expand games while searching for visibility
  useEffect(() => {
    setOpened(true)
  }, [games])

  function renderList() {
    if (!opened) {
      return <hr className={styles.collectionMinimizeBar} />
    }

    return (
      <ul
        aria-labelledby={`header-${id}`}
        id={`list-${id}`}
        className={styles.collectionList}
      >
        {games.map((data) => (
          <CollectionItem key={`${data.name}-${data.grade}`} data={data} />
        ))}
      </ul>
    )
  }

  if (!games.length) {
    return null
  }

  return (
    <>
      <h2 id={`header-${id}`}>{label}</h2>
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
