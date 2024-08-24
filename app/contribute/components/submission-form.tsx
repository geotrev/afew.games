"use client"

import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import {
  ChangeEventHandler,
  FormEventHandler,
  HTMLProps,
  useCallback,
  useState,
} from "react"
import { CONSENT_DATA, FIELD_DATA } from "./constants"
import { Well } from "@zendeskgarden/react-notifications"
import { Anchor, Button } from "@zendeskgarden/react-buttons"
import { Paragraph, UnorderedList, XL } from "@zendeskgarden/react-typography"
import {
  Checkbox,
  Field,
  Fieldset,
  Input,
  Textarea,
} from "@zendeskgarden/react-forms"
import { Dots } from "@zendeskgarden/react-loaders"

import ReloadFill from "@zendeskgarden/svg-icons/src/12/reload-fill.svg"
import AsteriskStroke from "@zendeskgarden/svg-icons/src/12/asterisk-stroke.svg"

const method = "POST"
const headers = { "Content-Type": "application/json" }

const FormField = ({
  isTextarea,
  ...fieldProps
}: HTMLProps<HTMLInputElement | HTMLTextAreaElement> & {
  isTextarea?: boolean
}) =>
  isTextarea ? (
    <Textarea {...(fieldProps as HTMLProps<HTMLTextAreaElement>)} />
  ) : (
    <Input {...(fieldProps as HTMLProps<HTMLInputElement>)} />
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
      <Well className="mt-6">
        <Well.Title>
          Submitted successfully – thanks for contributing to the database!
        </Well.Title>
        <Well.Paragraph>
          You can track your submission on A Few Games&apos; GitHub issue
          tracker, linked above.
        </Well.Paragraph>
        <Well.Paragraph>
          <Button
            size="small"
            className="btn btn-outline btn-sm"
            onClick={handleRefreshClick}
          >
            Submit Another Game{" "}
            <Button.EndIcon>
              <ReloadFill />
            </Button.EndIcon>
          </Button>
        </Well.Paragraph>
      </Well>
    )
  }

  return (
    <Well className="mt-6">
      <form onSubmit={handleSubmit}>
        <Well.Title>
          <XL tag="h2" isBold>
            Database Submission Form
          </XL>
        </Well.Title>

        <Well.Paragraph>
          First of all, thank you for your contribution!
        </Well.Paragraph>

        <Well.Paragraph>
          The data you submit will need to be cross-referenced. Please review
          this checklist before submitting:
        </Well.Paragraph>

        <UnorderedList className="!mb-6">
          <UnorderedList.Item>
            Proof read your submission for inaccuracies, such as typos
          </UnorderedList.Item>
          <UnorderedList.Item>
            UnorderedList.Itemnks to official sources (e.g., press releases,
            pubUnorderedList.Itemsher documentation) are encouraged
          </UnorderedList.Item>
          <UnorderedList.Item>
            UnorderedList.Itemnks to eBay listings are encouraged
          </UnorderedList.Item>
          <UnorderedList.Item>
            If the game has so little documentation and so few
            UnorderedList.Itemstings that it can&apos;t be easily referenced,
            say so in the notes
          </UnorderedList.Item>
        </UnorderedList>

        <Well.Paragraph className="!mb-4">
          <span className="text-white">
            <AsteriskStroke />
          </span>{" "}
          <span className="opacity-75 italic">indicates a required field</span>
        </Well.Paragraph>

        {FIELD_DATA.map((field) => {
          return (
            <Field key={field.input.id} className="!mb-4">
              <Field.Label
                htmlFor={field.input.id}
                id={`${field.input.id}-label`}
              >
                {field.label} {field.input.required && <AsteriskStroke />}
              </Field.Label>
              <Field.Hint id={`${field.input.id}-hint`}>
                {field.hint}
              </Field.Hint>
              <FormField
                isTextarea={field.input.is === "textarea"}
                required={field.input.required}
                value={fieldValues[field.input.id]}
                onChange={handleFieldChange}
                id={field.input.id}
                name={field.input.id}
                aria-labelledby={`${field.input.id}-label`}
                aria-describedby={`${field.input.id}-hint`}
              />
            </Field>
          )
        })}

        <Fieldset className="!mb-6">
          <Fieldset.Legend>
            You must agree to these terms to submit this form
          </Fieldset.Legend>
          {CONSENT_DATA.map((consent) => (
            <Field key={consent.id} className="mb-4">
              <Checkbox
                required
                checked={consentChecked[consent.id]}
                onChange={(event) => {
                  setConsentChecked({
                    ...consentChecked,
                    [consent.id]: event.target.checked,
                  })
                }}
                aria-labelledby={`${consent.id}-label`}
                id={consent.id}
                name={consent.id}
              >
                <Field.Label htmlFor={consent.id} id={`${consent.id}-label`}>
                  {consent.label}{" "}
                  {consent.id === "terms" && (
                    <Anchor
                      href="https://github.com/geotrev/afew.games/blob/main/CODE_OF_CONDUCT.md"
                      isExternal
                      externalIconLabel="(opens in new tab)"
                    >
                      Code of Conduct
                    </Anchor>
                  )}
                </Field.Label>
              </Checkbox>
            </Field>
          ))}
        </Fieldset>

        <Paragraph>
          <Button type="submit" isStretched disabled={isSubmitting}>
            Submit
          </Button>
        </Paragraph>

        {isSubmitting && (
          <Paragraph className="flex items-center justify-center gap-4">
            <Dots /> Hold tight, this might take a second...
          </Paragraph>
        )}

        {serverErrorMessage && (
          <Paragraph className="text-error">
            Uh-oh... {serverErrorMessage}. Try again or email{" "}
            <Anchor href="mailto:contact@afew.games">contact@afew.games</Anchor>{" "}
            if the error persists.
          </Paragraph>
        )}
      </form>
    </Well>
  )
}
