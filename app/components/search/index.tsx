"use client"

import propTypes from "prop-types"
import { SearchProps } from "./types"

export const Search = ({
  label,
  placeholder,
  value,
  handleChange,
}: SearchProps) => (
  <div className="form-control">
    <label htmlFor="search" className="label font-semibold uppercase">
      <span className="label-text">{label}</span>
    </label>
    <input
      type="text"
      className="input input-bordered input-accent rounded-b-none"
      name="collection-search"
      placeholder={placeholder}
      id="collection-search"
      onChange={handleChange}
      value={value || ""}
    />
  </div>
)

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
}
