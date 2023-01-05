import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEvent,
  ReactElement,
  useCallback,
  useState,
} from "react"
import cn from "classnames"
import { Button } from "../button"
import {
  ERROR_MESSAGE,
  EMAIL_REGEXP,
  SubscribeFormStatuses,
} from "lib/constants"
import styles from "./styles.module.scss"

type SubscribeFormState = {
  status: string
  message: string
}

const DEFAULT_FORM_STATE: SubscribeFormState = {
  status: SubscribeFormStatuses.NONE,
  message: "",
}

export function SiteFooter(): ReactElement {
  const [value, setValue] = useState("")
  const [formState, setFormState] =
    useState<SubscribeFormState>(DEFAULT_FORM_STATE)

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value)
    },
    []
  )

  const resetFormState = useCallback<
    FocusEventHandler<HTMLInputElement>
  >(() => {
    if (formState.status === SubscribeFormStatuses.LOADING) return
    setFormState(DEFAULT_FORM_STATE)
  }, [formState.status])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formState.status === SubscribeFormStatuses.LOADING) return

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
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
    <div className={styles.pageFooter}>
      <h2 className={styles.subscribeHeader}>Subscribe to A Few Games!</h2>
      <p className={styles.subscribeDescription}>
        Get weekly emails with the newest essays. Unsubscribe at any time.
      </p>
      <form
        onSubmit={handleSubmit}
        className={cn(styles.subscribeForm, {
          [styles.isLoading]:
            formState.status === SubscribeFormStatuses.LOADING,
        })}
      >
        <fieldset>
          <label
            className={cn(styles.subscribeLabel, "visually-hidden")}
            htmlFor="subscribe-email"
          >
            Email:
          </label>
          <input
            type="email"
            id="subscribe-input"
            name="subscribe-email"
            className={cn(styles.subscribeInput, {
              [styles[formState.status || ""]]: formState.status,
            })}
            readOnly={
              formState.status === SubscribeFormStatuses.LOADING
                ? true
                : undefined
            }
            onChange={handleChange}
            onFocus={resetFormState}
            onInput={resetFormState}
            value={value}
            placeholder="john.doe@email.com"
            required
            aria-required="true"
            aria-describedby={
              formState.message ? "subscribe-message" : undefined
            }
          />
          {formState.message && (
            <p id="subscribe-message" className={styles.subscribeMessage}>
              {formState.message}
            </p>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={formState.status === SubscribeFormStatuses.LOADING}
          >
            <span className={styles.spinner}>
              {formState.status === SubscribeFormStatuses.LOADING
                ? "▽"
                : "Subscribe"}
            </span>
          </Button>
        </fieldset>
      </form>
    </div>
  )
}
