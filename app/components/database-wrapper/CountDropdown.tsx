"use client"

import styled from "styled-components"
import { Field, Select } from "@zendeskgarden/react-forms"
import { getColor } from "@zendeskgarden/react-theming"
import { ChangeEventHandler } from "react"

interface CountDropdownProps {
  totalGameCount: number
  isLoading: boolean
  selectedCount: string
  handleCountSelect: ChangeEventHandler<HTMLSelectElement>
}

const StyledOption = styled.option`
  color: ${(p) => getColor({ hue: "neutralHue", shade: 1100, theme: p.theme })};
`

export const CountDropdown = ({
  totalGameCount,
  isLoading,
  selectedCount,
  handleCountSelect,
}: CountDropdownProps) => {
  if (totalGameCount <= 0 || isLoading) return null

  return (
    <Field className="flex items-center justify-end">
      <Field.Label className="label pe-4">Games shown</Field.Label>
      <div className="max-w-24">
        <Select
          isCompact
          value={selectedCount}
          name="quantity"
          onChange={handleCountSelect}
        >
          <StyledOption value="10">10</StyledOption>
          <StyledOption value="25">25</StyledOption>
          <StyledOption value="50">50</StyledOption>
          <StyledOption value="100">100</StyledOption>
        </Select>
      </div>
    </Field>
  )
}
