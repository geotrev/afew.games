import { Button } from "../button"
import { CollectionListToolbarProps } from "./types"
import styles from "./styles.module.scss"

export function CollectionListToolbar({
  itemsLength,
  id,
  opened,
  setOpened,
  label,
  pluralLabel,
}: CollectionListToolbarProps) {
  function renderMinimizeText() {
    return (
      <>
        <span aria-hidden="true">{opened ? "–" : "+"}</span> Toggle List
      </>
    )
  }

  return (
    <div className={styles.toolbarInfo}>
      <p>
        {itemsLength} {itemsLength === 1 ? label : pluralLabel}{" "}
        {opened ? "shown" : "hidden"}
      </p>
      <Button
        aria-expanded={opened}
        aria-controls={`list-${id}`}
        bare
        size="sm"
        onClick={() => setOpened(!opened)}
        aria-describedby={`header-${id}`}
      >
        {renderMinimizeText()}
      </Button>
    </div>
  )
}
