import { useState, useEffect } from "react"
import { CollectionItem } from "../collection-item"
import styles from "./styles.module.scss"

export function CollectionList({ games, label, id }) {
  const [opened, setOpened] = useState(true)
  const length = games.length

  // Re-expand games while searching for visibility
  useEffect(() => {
    setOpened(true)
  }, [games])

  function renderMinimizeText() {
    return (
      <span>
        <span aria-hidden="true">{opened ? "–" : "+"}</span>{" "}
        {opened ? "Hide" : "Show"} Games
      </span>
    )
  }

  function renderListInfoBar() {
    return (
      <div className={styles.collectionListInfo}>
        <p>
          {length} {length === 1 ? "game" : "games"}{" "}
          {opened ? "shown" : "hidden"}
        </p>
        <button
          type="button"
          className={styles.collectionMinimizeBtn}
          onClick={() => setOpened(!opened)}
        >
          {renderMinimizeText()}
        </button>
      </div>
    )
  }

  function renderList() {
    if (!opened) {
      return <hr className={styles.collectionMinimizeBar} />
    }

    return (
      <ul
        aria-labelledby={id}
        className={styles.collectionList}
        aria-label={label}
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
      <h2 id={id}>{label}</h2>
      {renderListInfoBar()}
      {renderList()}
    </>
  )
}
