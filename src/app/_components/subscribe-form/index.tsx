"use client"

import { ChangeEventHandler, FormEvent, useCallback, useState } from "react"
import { hideVisually } from "polished"
import cn from "classnames"
import {
  ERROR_MESSAGE,
  EMAIL_REGEXP,
  SubscribeFormStatuses,
} from "@/src/app/constants"
import { SubscribeFormState } from "./types"
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
      // eslint-disable-next-line no-console
      console.log("Error:", e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-wrap items-stretch">
        {!isSuccess && (
          <label style={hideVisually()} htmlFor="subscribe-email">
            Email:
          </label>
        )}
        {!isSuccess && (
          <input
            className={cn(
              "input input-md input-bordered input-secondary me-2 rounded-md",
              {
                "input-error": formState.status === SubscribeFormStatuses.ERROR,
              }
            )}
            disabled={isLoading}
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
          <button
            type="submit"
            className={cn("btn btn-secondary btn-md rounded-md", {
              loading: isLoading,
            })}
            disabled={isLoading}
          >
            {isLoading ? "" : "Subscribe"}
          </button>
        )}
        {formState.message && (
          <p
            id="subscribe-message"
            className={cn("m-0 flex w-full items-center text-xs", {
              "pt-4": formState.status !== SubscribeFormStatuses.SUCCESS,
              "text-success":
                formState.status === SubscribeFormStatuses.SUCCESS,
              "text-error": formState.status === SubscribeFormStatuses.ERROR,
            })}
          >
            {formState.message}
          </p>
        )}
      </fieldset>
    </form>
  )
}
