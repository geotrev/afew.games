export const EMAIL_REGEXP: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const ERROR_MESSAGE: string =
  "There was an error subscribing to the newsletter. Try again or email contact@afew.games if the error persists."

export type SubscribeFormStates = "error" | "success" | "loading" | "none"

export const SubscribeFormStatuses: {
  ERROR: "error"
  SUCCESS: "success"
  LOADING: "loading"
  NONE: "none"
} = {
  ERROR: "error",
  SUCCESS: "success",
  LOADING: "loading",
  NONE: "none",
}

export const BASE_TITLE = "a few games |"
