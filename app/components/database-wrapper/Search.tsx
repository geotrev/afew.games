"use client"

import { Button } from "@zendeskgarden/react-buttons"
import { Field, Input, InputGroup } from "@zendeskgarden/react-forms"
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
    <Field>
      <Field.Label>{label}</Field.Label>
      <InputGroup>
        <Input
          placeholder="Pokemon Red, etc..."
          onChange={handleChange}
          value={value || ""}
        />
        <Button isPrimary focusInset>
          Search
        </Button>
      </InputGroup>
    </Field>
  </form>
)

Search.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
}
