"use client"

import { Button } from "../button"
import { CollectionListToolbarProps } from "./types"
import { StyledToolbarInfo } from "./styled"

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
    <StyledToolbarInfo>
      <p>
        {itemsLength} {itemsLength === 1 ? label : pluralLabel}{" "}
        {opened ? "shown" : "hidden"}
      </p>
      <Button
        bare
        size="sm"
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-describedby={`header-${id}`}
        aria-controls={`list-${id}`}
      >
        {renderMinimizeText()}
      </Button>
    </StyledToolbarInfo>
  )
}
