import propTypes from "prop-types"
import { ReactElement } from "react"
import { SearchProps } from "./types"
import {
  StyledSearchContainer,
  StyledSearchLabel,
  StyledSearchInput,
} from "./styled"

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
}

export function Search({
  label,
  placeholder,
  value,
  handleChange,
}: SearchProps): ReactElement {
  return (
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
}
