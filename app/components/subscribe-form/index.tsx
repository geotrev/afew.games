"use client"

import { ChangeEventHandler, FormEvent, useCallback, useState } from "react"
import {
  ERROR_MESSAGE,
  EMAIL_REGEXP,
  SubscribeFormStatuses,
} from "utils/constants"
import { SubscribeFormState } from "./types"
import xss from "xss"
import { Field, Input, InputGroup } from "@zendeskgarden/react-forms"
import { Button } from "@zendeskgarden/react-buttons"
import { Dots } from "@zendeskgarden/react-loaders"

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
      if (formState.status === SubscribeFormStatuses.ERROR) {
        setFormState(DEFAULT_FORM_STATE)
      }
      setValue(e.target.value)
    },
    [formState.status]
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
      <Field>
        {!isSuccess && <Field.Label hidden>Provide an email</Field.Label>}
        {!isSuccess && (
          <InputGroup>
            <Input
              validation={
                formState.status === SubscribeFormStatuses.ERROR
                  ? "error"
                  : undefined
              }
              disabled={isLoading}
              type="email"
              readOnly={isLoading ? true : undefined}
              onChange={handleChange}
              value={value}
              placeholder="john.doe@email.com"
              required
            />
            <Button type="submit" isPrimary disabled={isLoading}>
              Subscribe
            </Button>
          </InputGroup>
        )}
        {formState.message && (
          <Field.Message
            validation={
              (
                { error: "error", success: "success" } as Record<
                  string,
                  "success" | "error"
                >
              )[formState.status as "success" | "error"]
            }
          >
            {isLoading && <Dots />} {formState.message}
          </Field.Message>
        )}
      </Field>
    </form>
  )
}
