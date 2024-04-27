"use client"

import propTypes from "prop-types"
import { ChangeEventHandler, FormEventHandler } from "react"

interface SearchProps {
  value?: string
  label: string
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
}

export const Search = ({
  label,
  value,
  handleChange,
  handleSubmit,
}: SearchProps) => (
  <form className="form-control mb-8" onSubmit={handleSubmit}>
    <label htmlFor="search" className="label font-semibold uppercase">
      <span className="label-text">{label}</span>
    </label>
    <div className="flex w-full flex-col md:flex-row">
      <input
        type="text"
        className="input input-lg input-bordered input-primary mb-1 w-full md:input-md focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 md:mb-0 md:w-3/4 md:rounded-e-none"
        name="collection-search"
        placeholder="Pokemon Red, etc..."
        id="collection-search"
        onChange={handleChange}
        value={value || ""}
      />
      <button className="btn btn-primary btn-md w-full rounded-md text-base focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-base-100 focus:ring-offset-1 focus:ring-offset-primary md:w-1/4 md:rounded-s-none">
        Search
      </button>
    </div>
  </form>
)

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string.isRequired,
}
