export const BASE_TITLE = "a few games |"

export const DatabaseFields = {
  PRODUCT_CODE: "product_code",
  SATELLITE_CODE: "satellite_code",
  COUNTRY: "country",
  MPN: "mpn",
  NOTES: "notes",
}

/**
 * The database collection should probably be updated to set even empty fields as nullish.
 * The order here is important.
 */
export const DB_FIELDS_SORTED: string[] = [
  DatabaseFields.PRODUCT_CODE,
  DatabaseFields.SATELLITE_CODE,
  DatabaseFields.COUNTRY,
  DatabaseFields.MPN,
  DatabaseFields.NOTES,
]

/**
 * Database field descriptions. Used in tooltips & contribution form.
 */
export const DB_FIELD_DESCRIPTIONS: Record<string, string> = {
  [DatabaseFields.PRODUCT_CODE]:
    "The publisher's code to identify the unique print run of the game.",
  [DatabaseFields.SATELLITE_CODE]:
    "A secondary UPC code, often right next to the primary UPC, but with fewer numerical digits.",
  [DatabaseFields.COUNTRY]:
    "The country of manufacture (not the printed language).",
  [DatabaseFields.MPN]:
    "The manufacturers part number. Typically found on the back of a game near the UPC.",
  [DatabaseFields.NOTES]:
    "Extra discerning details such as packaging differences, errors, language, or the like.",
}

export const EMAIL_REGEXP: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const ERROR_MESSAGE: string =
  "There was an error subscribing to the newsletter. Try again or email contact@afew.games if the error persists."

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
