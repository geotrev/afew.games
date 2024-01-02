"use client"

import { ListToolbarProps } from "./types"

export function ListToolbar({
  itemsLength,
  id,
  opened,
  setOpened,
  label,
  pluralLabel,
}: ListToolbarProps) {
  function renderMinimizeText() {
    return (
      <>
        <span aria-hidden="true">{opened ? "–" : "+"}</span>&nbsp;
        {opened ? "Hide" : "Show"} List
      </>
    )
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm">
        {itemsLength} {itemsLength === 1 ? label : pluralLabel}{" "}
        {opened ? "shown" : "hidden"}
      </p>
      <button
        className="btn btn-xs normal-case"
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-describedby={`header-${id}`}
        aria-controls={`list-${id}`}
      >
        {renderMinimizeText()}
      </button>
    </div>
  )
}
