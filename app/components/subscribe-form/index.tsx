"use client"

import { ChangeEventHandler, FormEvent, useCallback, useState } from "react"
import cn from "classnames"
import { Button } from "../button"
import {
  ERROR_MESSAGE,
  EMAIL_REGEXP,
  SubscribeFormStatuses,
} from "lib/constants"
import { SubscribeFormState } from "../subscribe-form/types"
import styles from "./styles.module.scss"

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
      const res = await fetch(
        `/api/subscribe?email=${encodeURIComponent(value.trim())}`,
        {
          method,
          headers,
          cache: "no-store",
        }
      )

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
    <form
      onSubmit={handleSubmit}
      className={cn(styles.subscribeForm, {
        [styles[formState.status || ""]]: formState.status,
      })}
    >
      <fieldset>
        {!isSuccess && (
          <label
            className={cn(styles.subscribeLabel, "visually-hidden")}
            htmlFor="subscribe-email"
          >
            Email:
          </label>
        )}
        {!isSuccess && (
          <input
            type="email"
            id="subscribe-input"
            name="subscribe-email"
            className={cn(styles.subscribeInput, {
              [styles[formState.status || ""]]: formState.status,
            })}
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
        {formState.message && (
          <p id="subscribe-message" className={styles.subscribeMessage}>
            {formState.message}
          </p>
        )}
        {!isSuccess && (
          <Button type="submit" size="sm" disabled={isLoading}>
            <span className={styles.spinner}>
              {isLoading ? "▽" : "Subscribe"}
            </span>
          </Button>
        )}
      </fieldset>
    </form>
  )
}
