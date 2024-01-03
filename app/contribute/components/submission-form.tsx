"use client"

import cn from "classnames"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import {
  ChangeEventHandler,
  FormEventHandler,
  HTMLProps,
  useCallback,
  useState,
} from "react"
import { CONSENT_DATA, FIELD_DATA } from "./constants"

const method = "POST"
const headers = { "Content-Type": "application/json" }

const Field = ({
  isTextarea,
  ...fieldProps
}: HTMLProps<HTMLInputElement | HTMLTextAreaElement> & {
  isTextarea?: boolean
}) =>
  isTextarea ? (
    <textarea {...(fieldProps as HTMLProps<HTMLTextAreaElement>)} />
  ) : (
    <input {...(fieldProps as HTMLProps<HTMLInputElement>)} />
  )

export function SubmissionForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  )
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [consentChecked, setConsentChecked] = useState<Record<string, boolean>>(
    CONSENT_DATA.reduce<Record<string, boolean>>(
      (acc, box) => ({ ...acc, [box.id]: false }),
      {}
    )
  )
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(
    FIELD_DATA.reduce<Record<string, string>>(
      (acc, field) => ({ ...acc, [field.input.id]: "" }),
      {}
    )
  )

  const handleFieldChange = useCallback<
    ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >((event) => {
    setFieldValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }, [])

  const verifyRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) return false

    const token = await executeRecaptcha("afg_db_submit")

    return token
  }, [executeRecaptcha])

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault()

      if (isSubmitting) return false

      setServerErrorMessage(null)
      setIsSubmitting(true)

      const gRecaptchaToken = await verifyRecaptcha()

      const formData = new FormData(event.target as HTMLFormElement)
      const body = JSON.stringify({
        gRecaptchaToken,
        ...Object.fromEntries(formData.entries()),
      })

      fetch("/api/contribute", {
        method,
        headers,
        cache: "no-store",
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSubmitting(false)

          if (data.status === "success") {
            setIsSuccess(true)
          } else {
            setServerErrorMessage(data.message)
          }
        })
        .catch((e) => {
          setServerErrorMessage(e.message)
        })
    },
    [isSubmitting, verifyRecaptcha]
  )

  const handleRefreshClick = useCallback(() => {
    window.location.reload()
  }, [])

  if (isSuccess) {
    return (
      <div className="my-12 rounded-md border-2 border-solid border-slate-800 p-5">
        <p className="mb-2 text-success">
          Submitted successfully – thanks for contributing to the database!
        </p>
        <p className="mb-4">
          You can track your submission on A Few Games&apos; GitHub issue
          tracker, linked above.
        </p>
        <p>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleRefreshClick}
          >
            Submit Another Game ↻
          </button>
        </p>
      </div>
    )
  }

  return (
    <form className="my-12" onSubmit={handleSubmit}>
      <div className="rounded-md border-2 border-solid border-slate-800 p-5">
        <h2 className="mb-4 text-2xl font-bold">Database Submission Form</h2>

        <p className="mb-2">First of all, thank you for your contribution!</p>

        <p className="mb-2">
          The data you submit will need to be cross-referenced. Please review
          this checklist before submitting:
        </p>
        <ul className="list-disc ps-4">
          <li>Proof read your submission for inaccuracies, such as typos</li>
          <li>
            Links to official sources (e.g., press releases, publisher
            documentation) are encouraged
          </li>
          <li>Links to eBay listings are encouraged</li>
          <li>
            If the game has so little documentation and so few listings that it
            can&apos;t be easily referenced, say so in the notes
          </li>
        </ul>

        <div className="divider" role="separator" />

        <p className="mb-4">
          <span className="text-white">*</span>{" "}
          <span className="italic opacity-75">indicates a required field</span>
        </p>

        {FIELD_DATA.map((field) => {
          return (
            <div className="form-control" key={field.input.id}>
              <label
                className="label flex justify-start px-0 pb-1 pt-0 text-sm font-bold uppercase text-white"
                htmlFor={field.input.id}
              >
                {field.label}
                {field.input.required && (
                  <span>
                    <span aria-hidden="true">&nbsp;*</span>
                    <span className="sr-only">&nbsp;required</span>
                  </span>
                )}
              </label>
              <p
                id={`${field.input.id}-hint`}
                className="mb-4 text-sm italic opacity-75"
              >
                {field.hint}
              </p>
              <Field
                isTextarea={field.input.is === "textarea"}
                required={field.input.required}
                className={cn({
                  "textarea textarea-bordered textarea-md mb-3 w-full max-w-full":
                    field.input.is,
                  "input input-bordered input-md mb-3 w-full max-w-full":
                    !field.input.is,
                })}
                value={fieldValues[field.input.id]}
                onChange={handleFieldChange}
                aria-describedby={`${field.input.id}-hint`}
                type="text"
                id={field.input.id}
                name={field.input.id}
              />
            </div>
          )
        })}

        <div className="divider" role="separator" />

        <p className="mb-2 text-sm font-bold">By submitting this form...</p>

        {CONSENT_DATA.map((consent, index) => (
          <p
            className={cn("form-control", {
              "mb-8": index === CONSENT_DATA.length - 1,
            })}
            key={consent.id}
          >
            <label
              className="label flex cursor-pointer items-start justify-start"
              htmlFor={consent.id}
            >
              <input
                required
                className="checkbox checkbox-primary checkbox-sm me-3"
                type="checkbox"
                id={consent.id}
                name={consent.id}
                aria-invalid={!consentChecked[consent.id]}
                checked={consentChecked[consent.id]}
                onChange={(event) => {
                  setConsentChecked({
                    ...consentChecked,
                    [consent.id]: event.target.checked,
                  })
                }}
              />
              <span className="label-text">
                {consent.label}{" "}
                {consent.id === "terms" && (
                  <a
                    className="link"
                    href="https://github.com/geotrev/afew.games/blob/main/CODE_OF_CONDUCT.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code of Conduct ↗
                  </a>
                )}
              </span>
            </label>
          </p>
        ))}

        <div className={cn({ "mb-4": serverErrorMessage || isSubmitting })}>
          <button
            className={cn(
              "btn btn-primary btn-lg !min-h-0 w-full rounded-md py-3 md:btn-md",
              { "loading btn-ghost": isSubmitting }
            )}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {isSubmitting && (
          <p className="text-center">
            ✋ Hold tight, this will take a second...
          </p>
        )}

        {serverErrorMessage && (
          <p className="text-error">
            Uh-oh... {serverErrorMessage}. Try again or message{" "}
            <a className="link" href="mailto:contact@afew.games">
              contact@afew.games
            </a>{" "}
            if the error persists.
          </p>
        )}
      </div>
    </form>
  )
}
