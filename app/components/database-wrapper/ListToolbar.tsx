"use client"

import { Button } from "@zendeskgarden/react-buttons"
import { SM } from "@zendeskgarden/react-typography"
import { Dispatch, SetStateAction } from "react"

export type ListToolbarProps = {
  label: string
  pluralLabel: string
  itemsLength: number
  id: string
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

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
      <SM tag="p">
        {itemsLength} {itemsLength === 1 ? label : pluralLabel}{" "}
        {opened ? "shown" : "hidden"}
      </SM>
      <Button
        size="small"
        isBasic
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-describedby={`header-${id}`}
        aria-controls={`list-${id}`}
      >
        {renderMinimizeText()}
      </Button>
    </div>
  )
}
