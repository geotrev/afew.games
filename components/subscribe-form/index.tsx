"use client"

import { ChangeEventHandler, FormEvent, useCallback, useState } from "react"
import { hideVisually } from "polished"
import { Button } from "../button"
import {
  ERROR_MESSAGE,
  EMAIL_REGEXP,
  SubscribeFormStatuses,
} from "utils/constants"
import { SubscribeFormState } from "../subscribe-form/types"
import {
  StyledFieldset,
  StyledInput,
  StyledMessage,
  StyledSpinner,
} from "./styled"
import xss from "xss"

const DEFAULT_FORM_STATE = {
  status: SubscribeFormStatuses.NONE,
  message: "",
}

const method = "POST"
const headers = { "Content-Type": "application/json" }

export function SubscribeForm() {
  const [value, setValue] = useState("")
  const [formState, setFormState] =
    useState<SubscribeFormState>(DEFAULT_FORM_STATE)
  const isLoading = formState.status === SubscribeFormStatuses.LOADING
  const isSuccess = formState.status === SubscribeFormStatuses.SUCCESS

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value)
    },
    []
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLoading) return

    if (!EMAIL_REGEXP.test(value)) {
      return setFormState({
        status: SubscribeFormStatuses.ERROR,
        message: "Email should match this format: name@domain.ext",
      })
    }

    setFormState({
      status: SubscribeFormStatuses.LOADING,
      message: "Just a moment...",
    })

    try {
      const res = await fetch("/api/subscribe", {
        method,
        headers,
        cache: "no-store",
        body: JSON.stringify({ email: xss(value.trim()) }),
      })

      const nextFormState = await res.json()
      setFormState(nextFormState)
      setValue("")
    } catch (e) {
      setFormState({
        status: SubscribeFormStatuses.ERROR,
        message: ERROR_MESSAGE,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledFieldset>
        {!isSuccess && (
          <label style={hideVisually()} htmlFor="subscribe-email">
            Email:
          </label>
        )}
        {!isSuccess && (
          <StyledInput
            $status={formState.status}
            type="email"
            id="subscribe-input"
            name="subscribe-email"
            readOnly={isLoading ? true : undefined}
            onChange={handleChange}
            value={value}
            placeholder="john.doe@email.com"
            required
            aria-required="true"
            aria-describedby={
              formState.message ? "subscribe-message" : undefined
            }
          />
        )}
        {!isSuccess && (
          <Button type="submit" size="sm" disabled={isLoading}>
            <StyledSpinner $status={formState.status}>
              {isLoading ? "▽" : "Subscribe"}
            </StyledSpinner>
          </Button>
        )}
        {formState.message && (
          <StyledMessage id="subscribe-message" $status={formState.status}>
            {formState.message}
          </StyledMessage>
        )}
      </StyledFieldset>
    </form>
  )
}
