"use client"

import { Button, ToggleButton } from "@zendeskgarden/react-buttons"
import { SM } from "@zendeskgarden/react-typography"
import { Dispatch, SetStateAction } from "react"
import DashFill from "@zendeskgarden/svg-icons/src/12/dash-fill.svg"
import PlusFill from "@zendeskgarden/svg-icons/src/12/plus-fill.svg"

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
        <Button.StartIcon>
          {opened ? <DashFill /> : <PlusFill />}
        </Button.StartIcon>
        &nbsp;
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
      <ToggleButton
        size="small"
        isBasic
        isPressed={!opened}
        onClick={() => setOpened(!opened)}
        aria-expanded={opened}
        aria-describedby={`header-${id}`}
        aria-controls={`list-${id}`}
      >
        {renderMinimizeText()}
      </ToggleButton>
    </div>
  )
}
