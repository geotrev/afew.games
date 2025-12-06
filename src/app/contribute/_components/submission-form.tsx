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
import { Components, TinaMarkdown } from "tinacms/dist/rich-text"
import { ContentBlocksContribute } from "@/tina/__generated__/types"

const method = "POST"
const headers = { "Content-Type": "application/json" }

type MarkdownComponents =
  | Components<object>
  | Components<{ [x: string]: (props: object) => JSX.Element }>
  | undefined

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

export function SubmissionForm({ ...contentBlock }: ContentBlocksContribute) {
  const formHeader = contentBlock.formHeader
  const formSuccessMessage = contentBlock.formSuccessMessage
  const textFields = contentBlock.formFields!
  const consentFields = contentBlock.consentFields!

  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  )
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [consentChecked, setConsentChecked] = useState<Record<string, boolean>>(
    consentFields.reduce<Record<string, boolean>>(
      (acc, checkbox) => ({ ...acc, [checkbox!.id]: false }),
      {}
    )
  )
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(
    textFields.reduce<Record<string, string>>(
      (acc, field) => ({ ...acc, [field!.id!]: "" }),
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
        <TinaMarkdown
          content={formSuccessMessage}
          components={
            {
              p: (props) => <p className="mb-4 text-success" {...props} />,
            } as MarkdownComponents
          }
        />
        <button className="btn btn-outline btn-sm" onClick={handleRefreshClick}>
          Submit Another Game ↻
        </button>
      </div>
    )
  }

  return (
    <form className="my-12" onSubmit={handleSubmit}>
      <div className="rounded-md border-2 border-solid border-slate-800 p-5">
        <TinaMarkdown
          content={formHeader}
          components={
            {
              h2: (props) => (
                <h2 className="mb-4 text-2xl font-bold" {...props} />
              ),
              p: (props) => <p className="mb-4" {...props} />,
              ul: (props) => <ul className="list-disc ps-4" {...props} />,
              hr: (props) => (
                <div className="divider" role="separator" {...props} />
              ),
            } as MarkdownComponents
          }
        />

        {textFields?.map((field) => {
          return (
            <div className="form-control" key={field!.id}>
              <label
                className="label flex justify-start px-0 pb-1 pt-0 text-sm font-bold uppercase text-white"
                htmlFor={field!.id}
              >
                {field!.label}
                {field!.required && (
                  <span>
                    <span aria-hidden="true">&nbsp;*</span>
                    <span className="sr-only">&nbsp;required</span>
                  </span>
                )}
              </label>
              <p
                id={`${field!.id}-hint`}
                className="mb-4 text-sm italic opacity-75"
              >
                {field!.hint}
              </p>
              <Field
                isTextarea={field!.type === "textarea"}
                required={field!.required as boolean}
                className={cn({
                  "textarea textarea-bordered textarea-info textarea-md mb-8 w-full max-w-full":
                    field!.type === "textarea",
                  "input input-md input-bordered input-info mb-8 w-full max-w-full":
                    field!.type === "input",
                })}
                value={fieldValues[field!.id]}
                onChange={handleFieldChange}
                aria-describedby={`${field!.id}-hint`}
                type="text"
                id={field!.id}
                name={field!.id}
              />
            </div>
          )
        })}

        <div className="divider" role="separator" />

        <p className="mb-2 text-sm font-bold">By submitting this form...</p>

        {consentFields?.map((consent, index) => (
          <p
            className={cn("form-control", {
              "mb-8": index === consentFields.length - 1,
            })}
            key={consent?.id}
          >
            <label
              className="label flex cursor-pointer items-start justify-start"
              htmlFor={consent?.id}
            >
              <input
                required
                className="checkbox-info checkbox checkbox-sm me-3"
                type="checkbox"
                id={consent?.id}
                name={consent?.id}
                aria-invalid={!consentChecked[consent!.id]}
                checked={consentChecked[consent!.id]}
                onChange={(event) => {
                  setConsentChecked({
                    ...consentChecked,
                    [consent!.id]: event.target.checked,
                  })
                }}
              />
              <span className="label-text">
                {consent?.label}{" "}
                {consent?.externalLink && consent?.externalLinkLabel && (
                  <a
                    className="link"
                    href={consent.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {consent.externalLinkLabel}
                  </a>
                )}
              </span>
            </label>
          </p>
        ))}

        <div
          className={cn("flex justify-center", {
            "mb-4": serverErrorMessage || isSubmitting,
          })}
        >
          <button
            disabled={isSubmitting}
            className={cn(
              "btn btn-primary btn-lg !min-h-0 rounded-md py-3 md:btn-md",
              {
                "btn-ghost loading": isSubmitting,
                "w-full": !isSubmitting,
              }
            )}
          >
            Submit
          </button>
        </div>

        {isSubmitting && (
          <p className="text-center">
            ✋ Hold tight, this might take a second...
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
