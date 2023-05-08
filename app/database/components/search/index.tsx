"use client"

import propTypes from "prop-types"
import { SearchProps } from "./types"
import {
  StyledSearchContainer,
  StyledSearchLabel,
  StyledSearchInput,
} from "./styled"

export const Search = ({
  label,
  placeholder,
  value,
  handleChange,
}: SearchProps) => (
  <StyledSearchContainer>
    <StyledSearchLabel htmlFor="search">{label}</StyledSearchLabel>
    <StyledSearchInput
      name="collection-search"
      type="search"
      placeholder={placeholder}
      id="collection-search"
      onChange={handleChange}
      value={value || ""}
    />
  </StyledSearchContainer>
)

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
}
